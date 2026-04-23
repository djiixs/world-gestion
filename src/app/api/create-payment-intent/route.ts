import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { addPurchase } from "@/lib/admin-store";

// Server-side mapping: offerId → amount in cents + currency
const offerConfig: Record<string, { amount: number; currency: string; recurring: boolean }> = {
  "ent-essentielle": { amount: 15000, currency: "eur", recurring: true },
  "ent-confort":     { amount: 30000, currency: "eur", recurring: true },
  "ent-premium":     { amount: 50000, currency: "eur", recurring: true },
  "ent-ponctuelle":  { amount: 4500,  currency: "eur", recurring: false },
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { offerId, email, name } = body;

    if (!offerId || typeof offerId !== "string") {
      return NextResponse.json({ error: "ID d'offre manquant" }, { status: 400 });
    }

    const config = offerConfig[offerId];
    if (!config) {
      return NextResponse.json({ error: "Offre inconnue" }, { status: 400 });
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: "Stripe n'est pas encore configuré" },
        { status: 503 }
      );
    }

    const stripe = getStripe();

    // Create or retrieve customer
    const customers = await stripe.customers.list({ email, limit: 1 });
    const customer = customers.data[0] ?? await stripe.customers.create({ email, name });

    if (config.recurring) {
      // For subscriptions, use Setup Intent with subscription creation
      const priceEnvMap: Record<string, string> = {
        "ent-essentielle": "STRIPE_PRICE_ESSENTIELLE",
        "ent-confort": "STRIPE_PRICE_CONFORT",
        "ent-premium": "STRIPE_PRICE_PREMIUM",
      };
      const priceId = process.env[priceEnvMap[offerId]!];
      if (!priceId) {
        return NextResponse.json({ error: "Configuration Stripe manquante" }, { status: 500 });
      }

      const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{ price: priceId }],
        payment_behavior: "default_incomplete",
        payment_settings: { save_default_payment_method: "on_subscription" },
        expand: ["latest_invoice.payment_intent"],
      });

      const invoice = subscription.latest_invoice;
      if (!invoice || typeof invoice === "string") {
        return NextResponse.json({ error: "Erreur de facturation" }, { status: 500 });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const paymentIntent = (invoice as any).payment_intent;
      if (!paymentIntent || typeof paymentIntent === "string") {
        return NextResponse.json({ error: "Erreur de paiement" }, { status: 500 });
      }

      return NextResponse.json({
        clientSecret: paymentIntent.client_secret,
        subscriptionId: subscription.id,
      });
    } else {
      // One-time payment
      const paymentIntent = await stripe.paymentIntents.create({
        amount: config.amount,
        currency: config.currency,
        customer: customer.id,
        automatic_payment_methods: { enabled: true },
        metadata: { offerId },
      });

      await addPurchase({
        offerId,
        amount: config.amount,
        currency: config.currency,
        status: "initiated",
        source: "payment_intent",
        email,
        customerName: name,
        stripePaymentIntentId: paymentIntent.id,
      });

      return NextResponse.json({
        clientSecret: paymentIntent.client_secret,
      });
    }
  } catch (err) {
    console.error("Stripe PaymentIntent error:", err);
    return NextResponse.json(
      { error: "Erreur lors de la création du paiement" },
      { status: 500 }
    );
  }
}
