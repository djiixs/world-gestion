"use client";

import { useState, FormEvent } from "react";
import { Offer } from "@/types/offers";
import PaymentForm from "@/components/PaymentForm";

interface Props {
  offer: Offer;
  onClose: () => void;
}

interface FormData {
  lastName: string;
  firstName: string;
  company: string;
  email: string;
  phone: string;
  additionalNeed: string;
}

const STRIPE_ENABLED = process.env.NEXT_PUBLIC_STRIPE_ENABLED === "true";

export default function SubscriptionForm({ offer, onClose }: Props) {
  const [step, setStep] = useState<"info" | "payment" | "success">("info");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [clientSecret, setClientSecret] = useState("");
  const [formData, setFormData] = useState<FormData | null>(null);

  const handleInfoSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const data: FormData = {
      lastName: (form.elements.namedItem("lastName") as HTMLInputElement).value.trim(),
      firstName: (form.elements.namedItem("firstName") as HTMLInputElement).value.trim(),
      company: (form.elements.namedItem("company") as HTMLInputElement).value.trim(),
      email: (form.elements.namedItem("email") as HTMLInputElement).value.trim(),
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value.trim(),
      additionalNeed: (form.elements.namedItem("additionalNeed") as HTMLTextAreaElement).value.trim(),
    };
    setFormData(data);

    try {
      // Save subscription info
      const subRes = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, offerId: offer.id, offerTitle: offer.title }),
      });
      if (!subRes.ok) throw new Error("Erreur serveur");

      if (!STRIPE_ENABLED) {
        // Mode sans Stripe : demande envoyée, pas de paiement en ligne
        setStep("success");
        setStatus("idle");
        return;
      }

      // Create PaymentIntent
      const res = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          offerId: offer.id,
          email: data.email,
          name: `${data.firstName} ${data.lastName}`,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Erreur serveur");

      setClientSecret(json.clientSecret);
      setStep("payment");
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  };

  // ─── SUCCESS SCREEN ───
  if (step === "success") {
    return (
      <div className="rounded-2xl border border-gold/25 bg-gradient-to-b from-[#111a35] to-[#0b132b] p-5 sm:p-6 shadow-[0_20px_60px_rgba(0,0,0,0.6),0_0_80px_rgba(201,168,76,0.06)]">
        <div className="text-center py-6">
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gold/10 border border-gold/20 grid place-items-center">
            <svg className="h-7 w-7 text-gold" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gold font-title">
            {STRIPE_ENABLED ? "Paiement confirmé !" : "Demande envoyée !"}
          </h3>
          <p className="mt-2 text-sm text-foreground-secondary max-w-sm mx-auto">
            {STRIPE_ENABLED ? (
              <>Merci pour votre souscription à l&apos;offre <strong className="text-foreground">{offer.title}</strong>. Nous vous envoyons un email de confirmation.</>
            ) : (
              <>Merci pour votre intérêt pour l&apos;offre <strong className="text-foreground">{offer.title}</strong>. Nous vous recontactons très rapidement pour finaliser votre souscription.</>
            )}
          </p>
          <button onClick={onClose} className="mt-5 btn-gold text-sm">
            Fermer
          </button>
        </div>
      </div>
    );
  }

  // ─── PAYMENT STEP ───
  if (step === "payment" && clientSecret) {
    return (
      <div className="rounded-2xl border border-gold/25 bg-gradient-to-b from-[#111a35] to-[#0b132b] p-5 sm:p-6 shadow-[0_20px_60px_rgba(0,0,0,0.6),0_0_80px_rgba(201,168,76,0.06)]">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gold/10 border border-gold/20 grid place-items-center">
              <svg className="w-4.5 h-4.5 text-gold" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground font-title tracking-wide">Paiement</h3>
              <p className="text-xs text-foreground-muted">{formData?.firstName} {formData?.lastName} — {formData?.email}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-200 grid place-items-center text-foreground-muted hover:text-foreground"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Offer badge */}
        <div className="inline-flex items-center gap-2 rounded-lg bg-gold/[0.08] border border-gold/15 px-3 py-1.5 mb-4">
          <span className="text-sm text-foreground-secondary">{offer.title}</span>
          <span className="h-4 w-px bg-gold/25" />
          <span className="text-sm font-bold text-gold">{offer.priceLabel}{offer.priceUnit}</span>
        </div>

        {/* Separator */}
        <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent mb-4" />

        <PaymentForm
          clientSecret={clientSecret}
          offerId={offer.id}
          offerTitle={offer.title}
          priceLabel={offer.priceLabel ?? ""}
          priceUnit={offer.priceUnit ?? ""}
          onSuccess={() => setStep("success")}
          onBack={() => { setStep("info"); setStatus("idle"); }}
        />
      </div>
    );
  }

  // ─── INFO STEP ───
  return (
    <div className="rounded-2xl border border-gold/25 bg-gradient-to-b from-[#111a35] to-[#0b132b] p-5 sm:p-6 shadow-[0_20px_60px_rgba(0,0,0,0.6),0_0_80px_rgba(201,168,76,0.06)]">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gold/10 border border-gold/20 grid place-items-center">
            <svg className="w-4.5 h-4.5 text-gold" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-foreground font-title tracking-wide">Finaliser votre souscription</h3>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer le formulaire"
          className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-200 grid place-items-center text-foreground-muted hover:text-foreground"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Offer summary */}
      <div className="rounded-xl border border-gold/15 bg-gold/[0.04] p-3 mb-4">
        <div className="flex items-center justify-between mb-1.5">
          <div>
            <span className="text-base font-bold text-foreground font-title">{offer.title}</span>
            {offer.badge && (
              <span className="ml-2 rounded-full bg-gold/15 px-2 py-0.5 text-[10px] font-semibold text-gold align-middle">
                {offer.badge}
              </span>
            )}
          </div>
          <span className="text-lg font-extrabold text-gold">{offer.priceLabel}<span className="text-xs font-medium text-foreground-muted">{offer.priceUnit}</span></span>
        </div>
        <p className="text-xs text-foreground-muted mb-2">{offer.description}</p>
        <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
          {offer.features.map((feature, i) => (
            <li key={i} className="flex items-center gap-1.5 text-xs text-foreground-secondary">
              <svg className="w-3 h-3 text-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
      </div>

      {/* Separator */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent mb-4" />

      {/* Steps indicator */}
      {STRIPE_ENABLED && (
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-1.5">
            <span className="w-6 h-6 rounded-full bg-gold text-[#0b132b] text-xs font-bold grid place-items-center">1</span>
            <span className="text-xs font-medium text-gold">Informations</span>
          </div>
          <div className="flex-1 h-px bg-white/[0.08]" />
          <div className="flex items-center gap-1.5">
            <span className="w-6 h-6 rounded-full bg-white/[0.06] border border-white/[0.1] text-foreground-muted text-xs font-bold grid place-items-center">2</span>
            <span className="text-xs text-foreground-muted">Paiement</span>
          </div>
        </div>
      )}

      <form onSubmit={handleInfoSubmit} className="space-y-3" noValidate={false}>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label htmlFor="sub-lastName" className="block text-xs font-semibold uppercase tracking-wider text-foreground-muted mb-1">
              Nom
            </label>
            <input
              id="sub-lastName"
              name="lastName"
              required
              autoComplete="family-name"
              defaultValue={formData?.lastName}
              className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/40 focus:bg-white/[0.05] transition-all duration-200"
            />
          </div>
          <div>
            <label htmlFor="sub-firstName" className="block text-xs font-semibold uppercase tracking-wider text-foreground-muted mb-1">
              Prénom
            </label>
            <input
              id="sub-firstName"
              name="firstName"
              required
              autoComplete="given-name"
              defaultValue={formData?.firstName}
              className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/40 focus:bg-white/[0.05] transition-all duration-200"
            />
          </div>
          <div>
            <label htmlFor="sub-company" className="block text-xs font-semibold uppercase tracking-wider text-foreground-muted mb-1">
              Entreprise <span className="text-foreground-muted/60 normal-case font-normal">(facultatif)</span>
            </label>
            <input
              id="sub-company"
              name="company"
              autoComplete="organization"
              defaultValue={formData?.company}
              className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/40 focus:bg-white/[0.05] transition-all duration-200"
            />
          </div>
          <div>
            <label htmlFor="sub-email" className="block text-xs font-semibold uppercase tracking-wider text-foreground-muted mb-1">
              Email
            </label>
            <input
              id="sub-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              defaultValue={formData?.email}
              className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/40 focus:bg-white/[0.05] transition-all duration-200"
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="sub-phone" className="block text-xs font-semibold uppercase tracking-wider text-foreground-muted mb-1">
              Téléphone
            </label>
            <input
              id="sub-phone"
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              pattern="[0-9+\s\-().]{7,20}"
              title="Numéro de téléphone valide (7 à 20 caractères)"
              defaultValue={formData?.phone}
              className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/40 focus:bg-white/[0.05] transition-all duration-200"
            />
          </div>
        </div>
        <div>
          <label htmlFor="sub-need" className="block text-xs font-semibold uppercase tracking-wider text-foreground-muted mb-1">
            Besoin complémentaire <span className="text-foreground-muted/60 normal-case font-normal">(optionnel)</span>
          </label>
          <textarea
            id="sub-need"
            name="additionalNeed"
            rows={2}
            maxLength={500}
            defaultValue={formData?.additionalNeed}
            className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/40 focus:bg-white/[0.05] transition-all duration-200 resize-none"
          />
        </div>
        <label className="flex items-start gap-2.5 text-sm text-foreground-secondary cursor-pointer">
          <input type="checkbox" name="cgv" required className="mt-0.5 h-4 w-4 accent-gold rounded" />
          <span>
            J&apos;accepte les{" "}
            <a href="#" className="text-gold underline hover:text-gold-dark">
              conditions générales
            </a>{" "}
            et la{" "}
            <a href="#" className="text-gold underline hover:text-gold-dark">
              politique de confidentialité
            </a>{" "}
          </span>
        </label>
        {status === "error" && (
          <p className="text-sm text-red-400 bg-red-400/10 rounded-lg px-4 py-2">
            Une erreur est survenue. Veuillez réessayer.
          </p>
        )}
        <button
          type="submit"
          disabled={status === "loading"}
          className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-gold via-gold-light to-gold py-3 font-bold text-[#0b132b] text-sm tracking-wide hover:shadow-[0_0_30px_rgba(201,168,76,0.35)] transition-all duration-300 disabled:opacity-50"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
          <span className="relative flex items-center justify-center gap-2">
            {status === "loading" ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                Chargement…
              </>
            ) : (
              <>
                {STRIPE_ENABLED ? "Continuer vers le paiement" : "Envoyer ma demande"}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
              </>
            )}
          </span>
        </button>
      </form>
    </div>
  );
}
