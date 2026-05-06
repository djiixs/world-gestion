"use client";

import { useState, FormEvent } from "react";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { stripePromise } from "@/lib/stripe-client";

interface PaymentFormProps {
  clientSecret: string;
  offerId: string;
  offerTitle: string;
  priceLabel: string;
  priceUnit: string;
  onSuccess: () => void;
  onBack: () => void;
}

function CheckoutForm({ clientSecret, offerTitle: _offerTitle, priceLabel, priceUnit, onSuccess, onBack }: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setStatus("loading");
    setErrorMsg("");

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/success`,
      },
      redirect: "if_required",
    });

    if (error) {
      setErrorMsg(error.message ?? "Une erreur est survenue.");
      setStatus("error");
    } else {
      const intentResult = await stripe.retrievePaymentIntent(clientSecret);
      const paymentIntentId = intentResult.paymentIntent?.id;
      const paymentIntentStatus = intentResult.paymentIntent?.status;

      if (paymentIntentId) {
        const statusToStore = paymentIntentStatus === "succeeded" ? "succeeded" : "failed";
        await fetch("/api/purchases/confirm", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            paymentIntentId,
            status: statusToStore,
          }),
        }).catch(() => {
          // Purchase is already tracked as initiated server-side.
        });
      }

      setStatus("idle");
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
        <PaymentElement
          options={{
            layout: "tabs",
          }}
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-400 bg-red-400/10 rounded-lg px-4 py-2">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={!stripe || status === "loading"}
        className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-gold via-gold-light to-gold py-3 font-bold text-[#0b132b] text-sm tracking-wide hover:shadow-[0_0_30px_rgba(201,168,76,0.35)] transition-all duration-300 disabled:opacity-50"
      >
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
        <span className="relative flex items-center justify-center gap-2">
          {status === "loading" ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
              Paiement en cours…
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>
              Payer — {priceLabel}{priceUnit}
            </>
          )}
        </span>
      </button>

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="text-xs text-foreground-muted hover:text-foreground transition-colors flex items-center gap-1"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" /></svg>
          Retour
        </button>
        <p className="text-xs text-foreground-muted/60 flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" /></svg>
          Paiement sécurisé via Stripe
        </p>
      </div>
    </form>
  );
}

export default function PaymentForm({ clientSecret, ...props }: PaymentFormProps) {
  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: {
          theme: "night",
          variables: {
            colorPrimary: "#c9a84c",
            colorBackground: "#111a35",
            colorText: "#ffffff",
            colorTextSecondary: "#94a3b8",
            colorDanger: "#f87171",
            fontFamily: "Inter, system-ui, sans-serif",
            borderRadius: "12px",
            spacingUnit: "4px",
          },
          rules: {
            ".Input": {
              border: "1px solid rgba(255,255,255,0.08)",
              backgroundColor: "rgba(255,255,255,0.03)",
              boxShadow: "none",
            },
            ".Input:focus": {
              border: "1px solid rgba(201,168,76,0.4)",
              boxShadow: "0 0 0 2px rgba(201,168,76,0.3)",
            },
            ".Tab": {
              border: "1px solid rgba(255,255,255,0.08)",
              backgroundColor: "rgba(255,255,255,0.03)",
            },
            ".Tab--selected": {
              border: "1px solid rgba(201,168,76,0.4)",
              backgroundColor: "rgba(201,168,76,0.08)",
            },
            ".Label": {
              fontSize: "12px",
              fontWeight: "600",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "#94a3b8",
            },
          },
        },
      }}
    >
      <CheckoutForm clientSecret={clientSecret} {...props} />
    </Elements>
  );
}
