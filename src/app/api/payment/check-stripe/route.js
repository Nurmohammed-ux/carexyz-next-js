import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export const runtime = "nodejs";

export async function GET() {
  try {
    const account = await stripe.accounts.retrieve();

    console.log("Stripe account:", account.id);

    return NextResponse.json({
      success: true,
      accountId: account.id,
    });
  } catch (error) {
    console.error("Stripe account verification failed:", error);

    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}