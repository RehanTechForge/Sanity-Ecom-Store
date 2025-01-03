import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Received cart details:", body);

    const lineItems = Object.values(body).map((item: any) => ({
      price_data: {
        currency: item.currency,
        product_data: {
          name: item.name,
          images: [item.image],
          metadata: {
            sanityId: item.id,
          },
        },
        unit_amount: item.price * 100, // Convert to cents
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: lineItems,
      success_url: `${req.nextUrl.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.nextUrl.origin}/cart`,
      metadata: {
        orderId: `order_${Date.now()}`, // Add a unique order ID
      },
    });

    return NextResponse.json(session);
  } catch (err: any) {
    console.error("Checkout session error:", err);
    return NextResponse.json(
      { statusCode: 500, message: err.message },
      { status: 500 }
    );
  }
}
