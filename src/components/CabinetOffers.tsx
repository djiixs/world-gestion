"use client";

import { Offer } from "@/types/offers";

interface Props {
  offers: Offer[];
  onSelect: (offer: Offer) => void;
}

const trustPoints = [
  "Confidentialité totale",
  "Respect des délais",
  "Qualité constante",
  "Collaboration fluide",
];

export default function CabinetOffers({ offers, onSelect }: Props) {
  const offer = offers[0];
  if (!offer) return null;

  return (
    <div className="rounded-[10px] border border-border-gold bg-background-tertiary overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
      {/* Header */}
      <div className="bg-background-secondary px-6 py-5 text-center border-b border-border-gold">
        <h3 className="text-lg md:text-xl font-bold tracking-tight text-white">
          {offer.title}
        </h3>
        <p className="mt-1 text-xs md:text-sm text-foreground-muted max-w-lg mx-auto">
          {offer.description}
        </p>
      </div>

      <div className="px-6 py-5">
        {/* Services grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {offer.features.map((f) => (
            <div key={f} className="flex items-center gap-2 rounded-lg bg-background-tertiary px-3 py-2.5">
              <svg className="h-3.5 w-3.5 flex-shrink-0 text-gold" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-xs font-medium text-foreground-secondary">{f}</span>
            </div>
          ))}
        </div>

        {/* Trust points */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {trustPoints.map((t) => (
            <span key={t} className="flex items-center gap-1.5 text-xs text-foreground-muted">
              <svg className="h-3 w-3 text-gold/70" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {t}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-5 text-center">
          <button
            onClick={() => onSelect(offer)}
            className="rounded-lg bg-gold px-8 py-2.5 text-sm font-semibold text-white hover:bg-gold-dark active:scale-[0.98] transition-all duration-200"
          >
            {offer.cta || "Demander un partenariat"}
          </button>
        </div>
      </div>
    </div>
  );
}
