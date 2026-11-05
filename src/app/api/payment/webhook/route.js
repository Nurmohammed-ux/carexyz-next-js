import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

import { stripe } from "@/lib/stripe";
import { collections, dbConnect } from "@/lib/dbConnect";
import { sendBookingInvoice } from "@/lib/mailer";

export const runtime = "nodejs";

export async function POST(request) {

  // 1. Read the raw request body.
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    console.error("Missing Stripe signature or webhook secret.");

    return NextResponse.json(
      { message: "Webhook configuration error." },
      { status: 400 },
    );
  }

  // 2. Verify Stripe signature.
  let event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    console.error("❌ Webhook signature verification failed:", error.message);

    return NextResponse.json(
      { message: "Invalid webhook signature." },
      { status: 400 },
    );
  }

  // 3. Handle only successful Checkout Sessions.
  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true });
  }

  const checkoutSession = event.data.object;

  if (checkoutSession.payment_status !== "paid") {
    return NextResponse.json({ received: true });
  }

  try {
    // 4. Connect to MongoDB.
    const paymentCollection = dbConnect(collections.PAYMENT);
    const bookingCollection = dbConnect(collections.BOOKING);

    // 5. Get payment ID from Stripe metadata.
    const paymentId = checkoutSession.metadata?.paymentId;

    if (!paymentId || !ObjectId.isValid(paymentId)) {
      console.error("Invalid or missing payment ID:", paymentId);

      return NextResponse.json(
        { message: "Invalid payment ID." },
        { status: 400 },
      );
    }

    // 6. Find the matching payment.
    const payment = await paymentCollection.findOne({
      _id: new ObjectId(paymentId),
      stripeSessionId: checkoutSession.id,
    });

    if (!payment) {
      console.error("No matching MongoDB payment found.");

      return NextResponse.json(
        { message: "Matching payment not found." },
        { status: 404 },
      );
    }

    // 7. Verify amount and currency.
    const expectedAmount = Math.round(payment.totalCost * 100);

    if (
      checkoutSession.amount_total !== expectedAmount ||
      checkoutSession.currency?.toLowerCase() !== "bdt"
    ) {
      console.error("Payment amount or currency mismatch.");

      return NextResponse.json(
        { message: "Payment amount or currency mismatch." },
        { status: 400 },
      );
    }

    // 8. Check whether this session already created a booking.
    let booking = await bookingCollection.findOne({
      stripeSessionId: checkoutSession.id,
    });

    if (!booking) {
      const newBooking = {
        serviceId: payment.serviceId,
        serviceName: payment.serviceName,

        userEmail: payment.userEmail,
        userName: payment.userName,

        duration: payment.duration,
        priceUnit: payment.priceUnit,
        unitPrice: payment.unitPrice,
        totalCost: payment.totalCost,
        currency: "BDT",

        location: payment.location,

        status: "pending",
        paymentStatus: "paid",

        stripeSessionId: checkoutSession.id,

        stripePaymentIntentId:
          typeof checkoutSession.payment_intent === "string"
            ? checkoutSession.payment_intent
            : checkoutSession.payment_intent?.id || null,

        createdAt: new Date(),
      };

      try {
        const result = await bookingCollection.insertOne(newBooking);

        booking = {
          ...newBooking,
          _id: result.insertedId,
        };

      } catch (error) {
        // Another webhook request may have created this booking first.
        if (error.code !== 11000) {
          throw error;
        }

        booking = await bookingCollection.findOne({
          stripeSessionId: checkoutSession.id,
        });

        if (!booking) {
          throw error;
        }

        console.log("6. Booking already exists:", booking._id.toString());
      }
    } else {
      console.log("6. Booking already exists:", booking._id.toString());
    }

    // 9. Update payment record.
    await paymentCollection.updateOne(
      { _id: payment._id },
      {
        $set: {
          status: "paid",
          bookingId: booking._id,
          paidAt: new Date(),
          updatedAt: new Date(),
        },
      },
    );

    // 10. Claim invoice sending so duplicate webhooks do not send duplicates.
    const emailClaim = await paymentCollection.updateOne(
      {
        _id: payment._id,
        invoiceStatus: {
          $nin: ["sending", "sent"],
        },
      },
      {
        $set: {
          invoiceStatus: "sending",
          invoiceAttemptedAt: new Date(),
        },
      },
    );

    if (emailClaim.modifiedCount === 1) {
      try {
        await sendBookingInvoice(booking);

        await paymentCollection.updateOne(
          { _id: payment._id },
          {
            $set: {
              invoiceStatus: "sent",
              invoiceSentAt: new Date(),
            },
          },
        );

        console.log("7. Booking invoice sent:", payment.userEmail);
      } catch (emailError) {
        console.error("Invoice email failed:", emailError);

        await paymentCollection.updateOne(
          { _id: payment._id },
          {
            $set: {
              invoiceStatus: "failed",
            },
          },
        );
      }
    }

    return NextResponse.json({
      received: true,
      bookingId: booking._id.toString(),
    });
  } catch (error) {
    console.error("❌ Webhook processing error:", error);

    return NextResponse.json(
      { message: "Webhook processing failed." },
      { status: 500 },
    );
  }
}
