"use client";

import { Offer } from "@/types/offers";
import { cn } from "@/lib/utils";

interface Props {
  offers: Offer[];
  onSelect: (offer: Offer) => void;
}

export default function EntrepreneurOffers({ offers, onSelect }: Props) {
  // Separate subscription offers from one-time offers
  const subscriptionOffers = offers.filter((o) => o.priceUnit !== "/heure");
  const hourlyOffers = offers.filter((o) => o.priceUnit === "/heure");

  return (
    <div className="space-y-4">
      {/* Subscription offers — horizontal scroll on mobile, grid on desktop */}
      <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-3 pt-3 -mx-6 px-6 md:mx-0 md:px-0 md:grid md:grid-cols-3 md:overflow-visible md:pb-0 md:pt-0 md:snap-none">
        {subscriptionOffers.map((offer) => (
          <div key={offer.id} className="min-w-[75vw] sm:min-w-[55vw] md:min-w-0 snap-center">
            <OfferCard offer={offer} onSelect={onSelect} />
          </div>
        ))}
      </div>

      {/* Hourly / one-time offer — compact full width */}
      {hourlyOffers.map((offer) => (
        <div key={offer.id} className="space-y-3">
          <div
            className="card-hover rounded-[10px] border border-border-gold bg-background-tertiary px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white">{offer.title}</h3>
                  {offer.tag && (
                    <span className="rounded-full bg-gold/15 px-2 py-0.5 text-[10px] font-semibold text-gold">
                      {offer.tag}
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-xs text-foreground-muted">{offer.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 flex-shrink-0 w-full sm:w-auto justify-between sm:justify-end">
              <p className="text-right">
                <span className="text-xl font-extrabold text-gold">{offer.priceLabel}</span>
                <span className="text-xs font-medium text-foreground-muted">{offer.priceUnit}</span>
              </p>
              <button
                onClick={() => onSelect(offer)}
                className="rounded-lg bg-gold px-5 py-2 text-xs font-semibold text-white hover:bg-gold-dark active:scale-[0.98] transition-all duration-200"
              >
                {offer.cta || "Choisir"}
              </button>
            </div>
          </div>
          <div className="px-1 text-center text-xs text-foreground-muted">
            <p className="font-medium text-foreground-secondary">Sans engagement • Toutes les prestations sont adaptables selon votre activité</p>
            <div className="mt-2 flex items-center justify-center gap-3 text-foreground-muted">
              <p className="text-gold font-semibold">contact@worldgestion.fr</p>
              <span className="text-foreground-muted">•</span>
              <p className="text-gold font-semibold">0756434016</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function OfferCard({
  offer,
  onSelect,
}: {
  offer: Offer;
  onSelect: (offer: Offer) => void;
}) {
  return (
    <div
      className={cn(
        "relative rounded-[10px] border p-5 pt-6 flex flex-col bg-background-tertiary",
        "transition-all duration-300",
        offer.popular
          ? "border-gold shadow-lg shadow-gold/[0.15] ring-1 ring-gold/30"
          : "border-border-gold card-hover"
      )}
    >
      {offer.popular && offer.badge && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold px-3 py-0.5 text-[10px] font-semibold text-white tracking-wide shadow-sm z-10">
          {offer.badge}
        </span>
      )}
      <h3 className="text-base font-bold tracking-tight text-white">{offer.title}</h3>
      <p className="mt-1 text-xs text-foreground-secondary leading-relaxed">
        {offer.description}
      </p>
      <p className="mt-4">
        <span className="text-2xl font-extrabold text-gold">
          {offer.priceLabel}
        </span>
        {offer.priceUnit && (
          <span className="text-xs font-medium text-foreground-muted ml-1">
            {offer.priceUnit}
          </span>
        )}
      </p>
      <ul className="mt-3 flex-1 space-y-1.5">
        {offer.features.slice(0, 4).map((f) => (
          <li key={f} className="flex items-start gap-2 text-xs text-foreground-secondary">
            <svg className="mt-0.5 h-3 w-3 flex-shrink-0 text-gold" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            {f}
          </li>
        ))}
        {offer.features.length > 4 && (
          <li className="text-[10px] text-foreground-muted pl-5">
            +{offer.features.length - 4} inclus
          </li>
        )}
      </ul>
      <button
        onClick={() => onSelect(offer)}
        className={cn(
          "mt-4 w-full rounded-lg py-2.5 text-xs font-semibold active:scale-[0.98] transition-all duration-200",
          offer.popular
            ? "bg-gold text-white hover:bg-gold-dark shadow-sm"
            : "border border-gold/40 text-gold hover:bg-gold hover:text-white"
        )}
      >
        {offer.cta || "Choisir cette offre"}
      </button>
    </div>
  );
}
