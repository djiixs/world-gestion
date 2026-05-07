"use client";

import Image from "next/image";
import { Offer } from "@/types/offers";
import { cn } from "@/lib/utils";
import entrepreneurPortrait from "../../images/43b615a70c7a737beaa28ccedf09e36c.jpg";

interface Props {
  offers: Offer[];
  onSelect: (offer: Offer) => void;
  onReserveCall?: (offer: Offer) => void;
  theme: "dark" | "light";
}

export default function EntrepreneurOffers({ offers, onSelect, onReserveCall, theme }: Props) {
  // Separate subscription offers from one-time offers
  const subscriptionOffers = offers.filter((o) => o.priceUnit !== "/heure");
  const hourlyOffers = offers.filter((o) => o.priceUnit === "/heure");
  const showAboutSection = hourlyOffers.length > 0;

  return (
    <div className="space-y-4">
      {/* Subscription offers — horizontal scroll on mobile, grid on desktop */}
      <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-3 pt-3 -mx-6 px-6 md:mx-0 md:px-0 md:grid md:grid-cols-3 md:overflow-visible md:pb-0 md:pt-0 md:snap-none">
        {subscriptionOffers.map((offer) => (
          <div key={offer.id} className="min-w-[75vw] sm:min-w-[55vw] md:min-w-0 snap-center">
            <OfferCard offer={offer} onSelect={onSelect} onReserveCall={onReserveCall} theme={theme} />
          </div>
        ))}
      </div>

      <p className={`px-1 text-center text-sm ${theme === "dark" ? "text-foreground-muted" : "text-[#666]"}`}>
        <span className="inline-flex items-center gap-2">
          <span className={`grid h-5 w-5 place-items-center rounded-full text-[11px] ${theme === "dark" ? "bg-gold/10 text-gold" : "bg-[#ff7f50]/10 text-[#ff7f50]"}`}>
            i
          </span>
          <span>Chaque offre inclus les service de l&apos;offre precedente.</span>
        </span>
      </p>

      {showAboutSection && (
        <div className="pt-8">
          <section className="mx-auto flex max-w-6xl flex-col-reverse items-center justify-between gap-10 md:flex-row md:gap-14">
            <div className="flex-1 text-center md:text-left">
              <h2 className={`font-title text-2xl md:text-3xl font-bold ${theme === "dark" ? "text-gold" : "text-[#1a2a44]"}`}>
                Pourquoi travailler avec moi ?
              </h2>
              <div className={`mt-3 h-[2px] w-10 rounded-full bg-gold ${theme === "dark" ? "md:ml-0" : "md:ml-0"} mx-auto md:mx-0`} />

              <ul className="mt-8 space-y-4">
                {[
                  "Un interlocuteur unique et dedie",
                  "Une relation humaine et de confiance",
                  "Une grande reactivite",
                  "Une adaptation a votre activite",
                ].map((item) => (
                  <li key={item} className={`flex items-center justify-center gap-4 text-base md:justify-start md:text-[1.05rem] ${theme === "dark" ? "text-foreground" : "text-[#333]"}`}>
                    <span className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border text-xs ${theme === "dark" ? "border-gold/50 text-gold" : "border-[#ff7f50]/70 text-[#ff7f50]"}`}>
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

            </div>

            <div className="flex-1">
              <div
                className="relative mx-auto w-full max-w-[560px] overflow-hidden rounded-[8px]"
                style={{
                  maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
                  WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
                }}
              >
                <Image
                  src={entrepreneurPortrait}
                  alt="Portrait professionnel"
                  className={`block h-auto w-full object-cover ${theme === "dark" ? "opacity-35" : "opacity-45"}`}
                  priority={false}
                />
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

function OfferCard({
  offer,
  onSelect,
  onReserveCall,
  theme,
}: {
  offer: Offer;
  onSelect: (offer: Offer) => void;
  onReserveCall?: (offer: Offer) => void;
  theme: "dark" | "light";
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
      <h3 className="text-lg font-extrabold tracking-tight text-gold drop-shadow-[0_0_8px_rgba(201,168,76,0.35)]">{offer.title}</h3>
      <div className="mt-1 h-[2px] w-8 rounded-full bg-gold/50" />
      <p className="mt-1 text-xs text-foreground-secondary leading-relaxed">
        {offer.description}
      </p>
      <p className="mt-4">
        <span className={`text-2xl font-extrabold ${theme === "dark" ? "text-gold" : "text-[#8a6120]"}`}>
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
            <svg className={`mt-0.5 h-3 w-3 flex-shrink-0 ${theme === "dark" ? "text-gold" : "text-[#8a6120]"}`} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            {f}
          </li>
        ))}
      </ul>
      <button
        onClick={() => onReserveCall ? onReserveCall(offer) : onSelect(offer)}
        className={cn(
          "mt-4 w-full rounded-lg py-2.5 text-xs font-semibold active:scale-[0.98] transition-all duration-200",
          offer.popular
            ? "bg-gold text-white hover:bg-gold-dark shadow-sm"
            : theme === "dark"
              ? "border border-gold/40 text-gold hover:bg-gold hover:text-white"
              : "border border-[#8a6120]/45 text-[#8a6120] hover:bg-[#8a6120] hover:text-white"
        )}
      >
        Je réserve un appel gratuit
      </button>
    </div>
  );
}
