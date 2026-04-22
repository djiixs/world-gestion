"use client";

import { useState, FormEvent } from "react";
import { Offer } from "@/types/offers";

interface Props {
  offer: Offer;
  onClose: () => void;
}

export default function CabinetLeadForm({ offer, onClose }: Props) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const data = {
      cabinetName: (form.elements.namedItem("cabinetName") as HTMLInputElement).value.trim(),
      responsableName: (form.elements.namedItem("responsableName") as HTMLInputElement).value.trim(),
      email: (form.elements.namedItem("email") as HTMLInputElement).value.trim(),
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value.trim(),
      nbDossiers: (form.elements.namedItem("nbDossiers") as HTMLSelectElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim(),
      offerId: offer.id,
      offerTitle: offer.title,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Erreur serveur");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const ctaLabel = offer.cta || "Être contacté";

  if (status === "success") {
    return (
      <div className="rounded-[10px] border border-gold/30 bg-background-tertiary p-8 sm:p-10 text-center shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
        <div className="w-16 h-16 mx-auto rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mb-6">
          <svg className="h-8 w-8 text-gold" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </div>
        <p className="text-2xl font-bold text-white mb-2">Demande envoyée !</p>
        <p className="mt-3 text-sm text-foreground-secondary leading-relaxed">
          Nous avons bien reçu votre demande pour un <strong className="text-foreground">{offer.title}</strong>.
          <br />Notre équipe vous contactera sous 24 heures pour discuter des modalités de partenariat.
        </p>
        <button onClick={onClose} className="mt-6 px-6 py-2.5 bg-gold text-white font-semibold rounded-lg hover:bg-gold-dark transition-colors duration-200">
          Fermer
        </button>
      </div>
    );
  }

  return (
    <div className="bg-background-tertiary p-6 sm:p-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-7">
        <div>
          <h3 className="text-xl font-bold text-white">{ctaLabel}</h3>
          <p className="mt-2 text-sm text-foreground-secondary">
            Service : <span className="font-semibold text-gold">{offer.title}</span>
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer le formulaire"
          className="text-foreground-muted hover:text-gold transition-colors text-2xl leading-none p-1 flex-shrink-0"
        >
          &times;
        </button>
      </div>

      {/* Ligne séparatrice */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent mb-7" />

      <form onSubmit={handleSubmit} className="space-y-5" noValidate={false}>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="cab-name" className="block text-sm font-semibold text-foreground mb-2">
              Nom du cabinet
            </label>
            <input
              id="cab-name"
              name="cabinetName"
              required
              autoComplete="organization"

              className="w-full rounded-lg border border-border bg-background-secondary px-4 py-3 text-sm text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all duration-200 hover:border-border-gold"
            />
          </div>
          <div>
            <label htmlFor="cab-resp" className="block text-sm font-semibold text-foreground mb-2">
              Responsable
            </label>
            <input
              id="cab-resp"
              name="responsableName"
              required
              autoComplete="name"

              className="w-full rounded-lg border border-border bg-background-secondary px-4 py-3 text-sm text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all duration-200 hover:border-border-gold"
            />
          </div>
          <div>
            <label htmlFor="cab-email" className="block text-sm font-semibold text-foreground mb-2">
              Email professionnel
            </label>
            <input
              id="cab-email"
              name="email"
              type="email"
              required
              autoComplete="email"

              className="w-full rounded-lg border border-border bg-background-secondary px-4 py-3 text-sm text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all duration-200 hover:border-border-gold"
            />
          </div>
          <div>
            <label htmlFor="cab-phone" className="block text-sm font-semibold text-foreground mb-2">
              Téléphone
            </label>
            <input
              id="cab-phone"
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              pattern="[0-9+\s\-().]{7,20}"
              title="Numéro de téléphone valide (7 à 20 caractères)"

              className="w-full rounded-lg border border-border bg-background-secondary px-4 py-3 text-sm text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all duration-200 hover:border-border-gold"
            />
          </div>
        </div>
        <div>
          <label htmlFor="cab-message" className="block text-sm font-semibold text-foreground mb-2">
            Précisions de votre demande
          </label>
          <textarea
            id="cab-message"
            name="message"
            rows={3}
            maxLength={500}
            placeholder="Décrivez votre besoin en externalisation, votre volume de dossiers, vos attentes..."
            className="w-full rounded-lg border border-border bg-background-secondary px-4 py-3 text-sm text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all duration-200 hover:border-border-gold resize-none"
          />
        </div>
        {status === "error" && (
          <div className="text-sm text-red-300 bg-red-500/15 border border-red-500/30 rounded-lg px-4 py-3">
            Une erreur est survenue. Veuillez réessayer.
          </div>
        )}
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full rounded-lg bg-gold py-3.5 font-semibold text-white hover:bg-gold-dark active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-base mt-2"
        >
          {status === "loading" ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              Envoi en cours…
            </span>
          ) : ctaLabel}
        </button>
        <p className="text-xs text-center text-foreground-muted mt-3">
          Vos données sont traitées de manière confidentielle et sécurisée.
        </p>
      </form>
    </div>
  );
}
