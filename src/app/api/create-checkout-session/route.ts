import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { addPurchase } from "@/lib/admin-store";

// Server-side mapping: offerId → amount in cents + currency
const offerConfig: Record<string, { amount: number; currency: string; recurring: boolean }> = {
  "cabinet-essentiel": { amount: 9900, currency: "eur", recurring: true },
  "cabinet-confort": { amount: 19900, currency: "eur", recurring: true },
  "cabinet-premium": { amount: 29900, currency: "eur", recurring: true },
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { offerId } = body;

    if (!offerId || typeof offerId !== "string") {
      return NextResponse.json(
        { error: "ID d'offre manquant" },
        { status: 400 }
      );
    }

    const config = offerConfig[offerId];
    if (!config) {
      return NextResponse.json(
        { error: "Offre inconnue" },
        { status: 400 }
      );
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: "Stripe n'est pas encore configuré" },
        { status: 503 }
      );
    }

    const stripe = getStripe();

    const paymentIntent = await stripe.paymentIntents.create({
      amount: config.amount,
      currency: config.currency,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    await addPurchase({
      offerId,
      amount: config.amount,
      currency: config.currency,
      status: "initiated",
      source: "payment_intent",
      stripePaymentIntentId: paymentIntent.id,
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    console.error("Stripe error:", err);
    return NextResponse.json(
      { error: "Erreur lors de la création du payment intent" },
      { status: 500 }
    );
  }
}