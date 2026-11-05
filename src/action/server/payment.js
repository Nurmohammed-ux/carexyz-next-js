"use server";

import { getServerSession } from "next-auth";
import { ObjectId } from "mongodb";
import { authOptions } from "@/lib/authOptions";
import { collections, dbConnect } from "@/lib/dbConnect";
import { stripe } from "@/lib/stripe";

export const createCheckoutSession = async (formData) => {
  let paymentId = null;

  try {
    // 1. Verify logged-in user
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return {
        success: false,
        message: "Please login first.",
      };
    }

    // 2. Validate booking information
    const { serviceId, duration, location } = formData || {};

    if (
      !ObjectId.isValid(serviceId) ||
      !Number.isInteger(duration) ||
      duration < 1 ||
      duration > 30 ||
      !location?.division?.trim() ||
      !location?.district?.trim() ||
      !location?.city?.trim() ||
      !location?.address?.trim()
    ) {
      return {
        success: false,
        message: "Invalid booking information.",
      };
    }

    // 3. Connect to MongoDB
    const serviceCollection = await dbConnect(collections.SERVICE);
    const paymentCollection = await dbConnect(collections.PAYMENT);

    // 4. Get service and price from database
    const service = await serviceCollection.findOne({
      _id: new ObjectId(serviceId),
      isActive: true,
    });

    if (!service) {
      return {
        success: false,
        message: "Service not found or unavailable.",
      };
    }

    const unitPrice = Number(service.startingPrice);
    const totalCost = unitPrice * duration;
    const amountInSmallestUnit = Math.round(totalCost * 100);

    if (
      !Number.isFinite(unitPrice) ||
      unitPrice <= 0 ||
      !Number.isSafeInteger(amountInSmallestUnit) ||
      amountInSmallestUnit <= 0
    ) {
      return {
        success: false,
        message: "Invalid service price.",
      };
    }

    // 5. Create pending payment record
    const payment = {
      userEmail: session.user.email.toLowerCase(),
      userName: session.user.name || "",
      serviceId: service._id,
      serviceName: service.name,
      duration,
      priceUnit: service.priceUnit || "hour",
      unitPrice,
      totalCost,
      currency: "bdt",

      location: {
        division: location.division.trim(),
        district: location.district.trim(),
        city: location.city.trim(),
        address: location.address.trim(),
      },

      status: "pending",
      bookingId: null,
      stripeSessionId: null,
      invoiceStatus: "not_sent",
      createdAt: new Date(),
    };

    const { insertedId } = await paymentCollection.insertOne(payment);
    paymentId = insertedId;

    // 6. Create Stripe Checkout Session
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",

      line_items: [
        {
          price_data: {
            currency: "bdt",
            product_data: {
              name: service.name,
            },
            unit_amount: amountInSmallestUnit,
          },
          quantity: 1,
        },
      ],

      customer_email: payment.userEmail,

      // IMPORTANT: Webhook uses this ID to find the MongoDB payment.
      metadata: {
        paymentId: insertedId.toString(),
      },

      client_reference_id: insertedId.toString(),

      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,

      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/cancel`,
    });

    // 7. Save Stripe Session ID in MongoDB
    const updateResult = await paymentCollection.updateOne(
      { _id: insertedId },
      {
        $set: {
          stripeSessionId: checkoutSession.id,
          updatedAt: new Date(),
        },
      },
    );

    if (updateResult.modifiedCount !== 1) {
      throw new Error("Could not save Stripe Checkout Session ID.");
    }

    console.log("Checkout Session created:", checkoutSession.id);
    console.log("Payment ID:", insertedId.toString());

    return {
      success: true,
      url: checkoutSession.url,
    };
  } catch (error) {
    console.error("Checkout creation error:", error);

    // Mark the payment as failed if Checkout Session creation failed.
    if (paymentId) {
      try {
        const paymentCollection = await dbConnect(collections.PAYMENT);

        await paymentCollection.updateOne(
          {
            _id: paymentId,
            stripeSessionId: null,
          },
          {
            $set: {
              status: "failed",
              updatedAt: new Date(),
            },
          },
        );
      } catch (dbError) {
        console.error("Could not update failed payment:", dbError);
      }
    }

    return {
      success: false,
      message: "Unable to initialize payment. Please try again.",
    };
  }
};
