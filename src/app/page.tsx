"use client";

import { useState, useCallback, useEffect } from "react";
import OfferToggle from "@/components/OfferToggle";
import EntrepreneurOffers from "@/components/EntrepreneurOffers";
import CabinetOffers from "@/components/CabinetOffers";
import SubscriptionForm from "@/components/SubscriptionForm";
import CabinetLeadForm from "@/components/CabinetLeadForm";

import { entrepreneurOffers } from "@/data/entrepreneurOffers";
import { cabinetOffers } from "@/data/cabinetOffers";
import { Offer } from "@/types/offers";

function smoothScrollTo(target: HTMLElement, duration = 600) {
  const start = window.scrollY;
  const end = target.getBoundingClientRect().top + window.scrollY;
  const distance = end - start;
  let startTime: number | null = null;

  function easeInOutCubic(t: number) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function step(currentTime: number) {
    if (!startTime) startTime = currentTime;
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, start + distance * easeInOutCubic(progress));
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

export default function Home() {
  const [isEntrepreneur, setIsEntrepreneur] = useState(true);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [showPartnershipModal, setShowPartnershipModal] = useState(false);
  const scrollTo = useCallback((el: HTMLElement | null) => {
    if (el) smoothScrollTo(el);
  }, []);

  const handleOfferSelect = (offer: Offer) => {
    setSelectedOffer(offer);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* ─── HERO SECTION ─── */}
      <section className="relative px-6 py-10 md:py-14 overflow-hidden" style={{ background: "linear-gradient(135deg, #0b132b, #0f1c3f)" }}>
        {/* Background image overlay with fade edges */}
        <div className="absolute right-0 top-[10%] w-[45%] h-[90%] pointer-events-none" style={{ maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)", WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)" }}>
          <div className="w-full h-full opacity-25 bg-[url('/hero-bg.jpg')] bg-center bg-no-repeat bg-cover" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto md:mx-0 md:ml-[10%]">
          {/* Logo */}
          <div className="flex flex-row items-center gap-3 sm:gap-4 mb-5">
            <img
              src="/logo.png"
              alt="World Gestion"
                className="h-30 sm:h-30 md:h-35 w-auto flex-shrink-0"
            />
            <div>
              <span className="text-gold font-bold text-lg sm:text-2xl md:text-3xl tracking-wide block">World Gestion</span>
              <span className="text-gold text-[11px] sm:text-xs md:text-sm leading-snug">Nous prenons en charge le traitement administratif<br />et votre pré-comptabilité avec expertise et rigueur</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="font-title text-xl sm:text-4xl md:text-5xl font-bold leading-tight text-white">
            Simplifier et optimiser votre<br />
            gestion d&apos;entreprise.
          </h1>

          {/* Subtitle */}


          {/* CTA */}
          <div className="mt-5">
            <a
              href="#offres"
              onClick={(e) => {
                e.preventDefault();
                scrollTo(document.getElementById("offres"));
              }}
              className="btn-gold inline-block text-sm md:text-base"
            >
              Découvrir nos offres →
            </a>
          </div>
        </div>
      </section>

      {/* ─── TOGGLE + SERVICES + OFFRES ─── */}
      <section id="offres" className="flex-1 px-6 py-10 md:py-12 bg-background">
        <div className="mx-auto max-w-6xl">
          {/* Toggle en haut */}
          <OfferToggle
            isEntrepreneur={isEntrepreneur}
            onChange={(v) => {
              setIsEntrepreneur(v);
              setSelectedOffer(null);
            }}
          />

          {/* ─── Services ─── */}
          <div className="mt-8 max-w-5xl mx-auto">
            {isEntrepreneur && (
              <>
                <h2 className="font-title text-2xl md:text-3xl font-bold text-gold mb-2">Nos Services</h2>
                <p className="text-foreground-secondary mb-6 max-w-xl">
                  Des solutions adaptées à vos besoins, avec un accompagnement personnalisé et une qualité de service irréprochable.
                </p>
              </>
            )}

            {isEntrepreneur ? (
              /* Services Entrepreneurs */
              <div className="grid gap-5 grid-cols-1 md:grid-cols-3">
                <div className="card-hover rounded-[10px] border border-border-gold bg-background-tertiary p-6 text-center">
                  <div className="text-3xl text-gold mb-3">
                    <svg className="h-10 w-10 mx-auto" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                    </svg>
                  </div>
                  <h3 className="text-gold font-semibold text-lg mb-1">Support administratif</h3>
                  <p className="text-foreground-muted text-sm">Gestion de vos documents, courriers et formalités administratives au quotidien.</p>
                </div>
                <div className="card-hover rounded-[10px] border border-border-gold bg-background-tertiary p-6 text-center">
                  <div className="text-3xl text-gold mb-3">
                    <svg className="h-10 w-10 mx-auto" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V13.5Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V18Zm2.498-6.75h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V13.5Zm0 2.25h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V18Zm2.504-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V18Zm2.498-6.75h.008v.008h-.008v-.008ZM15.75 13.5h.008v.008h-.008V13.5ZM6 6.75A.75.75 0 0 1 6.75 6h10.5a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-.75.75H6.75A.75.75 0 0 1 6 8.25v-1.5Z" />
                    </svg>
                  </div>
                  <h3 className="text-gold font-semibold text-lg mb-1">Pré-comptabilité</h3>
                  <p className="text-foreground-muted text-sm">Saisie comptable, rapprochements bancaires et préparation de vos bilans.</p>
                </div>
                <div className="card-hover rounded-[10px] border border-border-gold bg-background-tertiary p-6 text-center">
                  <div className="text-3xl text-gold mb-3">
                    <svg className="h-10 w-10 mx-auto" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 7.125 16.875 4.5" />
                    </svg>
                  </div>
                  <h3 className="text-gold font-semibold text-lg mb-1">Services personnalisables</h3>
                  <p className="text-foreground-muted text-sm">Des prestations sur mesure adaptées aux besoins spécifiques de votre activité.</p>
                </div>
              </div>
            ) : (
              /* ═══ Contenu Cabinets Comptables ═══ */
              <div className="space-y-12">

                {/* Hero Cabinet */}
                <div className="text-center md:text-left">
                  <h2 className="font-title text-3xl md:text-4xl font-bold text-[#f6e8d5] uppercase leading-tight mb-4">
                    Externalisation comptable<br />pour cabinets
                  </h2>
                  <p className="text-foreground-secondary text-base md:text-lg max-w-xl">
                    Optimisez votre productivité avec un partenaire fiable et structuré
                  </p>
                </div>

                {/* Ligne séparatrice dorée */}
                <div className="relative">
                  <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-70" />
                  <div className="w-3 h-3 mx-auto -mt-1.5 rounded-full bg-gold shadow-[0_0_20px_rgba(201,168,76,0.7)]" />
                </div>

                {/* 5 Services Cards */}
                <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-3 -mx-6 px-6 md:mx-0 md:px-0 md:grid md:grid-cols-5 md:overflow-visible md:pb-0 md:snap-none">
                  <div className="card-hover rounded-2xl border border-white/[0.12] p-5 text-center min-w-[40vw] md:min-w-0 snap-center min-h-[180px]" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))" }}>
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl border border-gold/20 bg-gold/[0.06] grid place-items-center text-gold"><svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" /></svg></div>
                    <h3 className="font-title text-lg text-[#f3e0c7] mb-1">Saisie comptable</h3>
                    <p className="text-foreground-muted text-sm">Traitement structuré et précis</p>
                  </div>
                  <div className="card-hover rounded-2xl border border-white/[0.12] p-5 text-center min-w-[40vw] md:min-w-0 snap-center min-h-[180px]" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))" }}>
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl border border-gold/20 bg-gold/[0.06] grid place-items-center text-gold"><svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182" /></svg></div>
                    <h3 className="font-title text-lg text-[#f3e0c7] mb-1">Lettrage</h3>
                    <p className="text-foreground-muted text-sm">Suivi clients / fournisseurs</p>
                  </div>
                  <div className="card-hover rounded-2xl border border-white/[0.12] p-5 text-center min-w-[40vw] md:min-w-0 snap-center min-h-[180px]" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))" }}>
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl border border-gold/20 bg-gold/[0.06] grid place-items-center text-gold"><svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21" /></svg></div>
                    <h3 className="font-title text-lg text-[#f3e0c7] mb-1">Rapprochements bancaires</h3>
                    <p className="text-foreground-muted text-sm">Fiabilité et contrôle</p>
                  </div>
                  <div className="card-hover rounded-2xl border border-white/[0.12] p-5 text-center min-w-[40vw] md:min-w-0 snap-center min-h-[180px]" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))" }}>
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl border border-gold/20 bg-gold/[0.06] grid place-items-center text-gold"><svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg></div>
                    <h3 className="font-title text-lg text-[#f3e0c7] mb-1">Préparation TVA</h3>
                    <p className="text-foreground-muted text-sm">Éléments prêts à déclarer</p>
                  </div>
                  <div className="card-hover rounded-2xl border border-white/[0.12] p-5 text-center min-w-[40vw] md:min-w-0 snap-center min-h-[180px]" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))" }}>
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl border border-gold/20 bg-gold/[0.06] grid place-items-center text-gold"><svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" /></svg></div>
                    <h3 className="font-title text-lg text-[#f3e0c7] mb-1">Organisation des dossiers</h3>
                    <p className="text-foreground-muted text-sm">Classement optimisé</p>
                  </div>
                </div>

                {/* Ligne séparatrice dorée */}
                <div className="relative">
                  <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-70" />
                  <div className="w-3 h-3 mx-auto -mt-1.5 rounded-full bg-gold shadow-[0_0_20px_rgba(201,168,76,0.7)]" />
                </div>

                {/* Pourquoi nous faire confiance */}
                <div>
                  <h3 className="font-title text-2xl md:text-3xl text-[#f3dfc0] uppercase text-center mb-8">Pourquoi nous faire confiance</h3>
                  <div className="max-w-lg mx-auto space-y-5">
                    {["Confidentialité totale", "Respect des délais", "Qualité constante", "Collaboration fluide"].map((item) => (
                      <div key={item} className="flex items-center gap-4 text-white text-base md:text-lg">
                        <span className="w-9 h-9 flex-shrink-0 rounded-full border-2 border-gold grid place-items-center text-gold font-bold shadow-[0_0_0_4px_rgba(201,168,76,0.08)]">✓</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ligne séparatrice dorée */}
                <div className="relative">
                  <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-70" />
                  <div className="w-3 h-3 mx-auto -mt-1.5 rounded-full bg-gold shadow-[0_0_20px_rgba(201,168,76,0.7)]" />
                </div>

                {/* Approche haut de gamme */}
                <div className="text-center">
                  <h3 className="font-title text-2xl md:text-3xl text-[#f3dfc0] uppercase mb-6">Une approche haut de gamme</h3>
                  <p className="text-foreground-secondary text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
                    World Gestion accompagne les cabinets comptables dans l&apos;externalisation
                    de leurs tâches administratives et pré-comptables avec rigueur, discrétion
                    et exigence. Chaque mission est pensée pour vous apporter un cadre de travail
                    plus fluide, plus fiable et plus rentable.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* ─── Offres ─── */}
          <div className="mt-10">
            {isEntrepreneur ? (
              <>
                <h2 className="font-title text-2xl md:text-3xl font-bold text-gold text-center mb-2">Nos Offres</h2>
                <p className="text-foreground-secondary text-center mb-6 max-w-lg mx-auto">
                  Choisissez la formule qui correspond à votre profil et vos besoins.
                </p>

                <div className="mt-5">
                  <EntrepreneurOffers
                    offers={entrepreneurOffers}
                    onSelect={handleOfferSelect}
                  />
                </div>

              </>
            ) : (
              <div className="text-center space-y-6">
                {/* Ligne séparatrice dorée */}
                <div className="relative">
                  <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-70" />
                  <div className="w-3 h-3 mx-auto -mt-1.5 rounded-full bg-gold shadow-[0_0_20px_rgba(201,168,76,0.7)]" />
                </div>

                <h2 className="font-title text-2xl md:text-3xl font-bold text-[#f3dfc0] uppercase">
                  Prêt à optimiser votre cabinet ?
                </h2>
                <button
                  onClick={() => setShowPartnershipModal(true)}
                  className="btn-gold inline-block text-sm md:text-base"
                >
                  Demander un partenariat
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ─── Footer minimal ─── */}
      <footer className="border-t border-border bg-background-secondary px-6 py-6 text-center text-xs text-foreground-muted">
        <p>© {new Date().getFullYear()} World&nbsp;Gestion — Tous droits réservés</p>
        <div className="mt-3 flex flex-row flex-wrap items-center justify-center gap-x-5 gap-y-1.5">
          <a href="/cgv" className="hover:text-foreground/60 transition-colors duration-200">Conditions Générales de Vente</a>
          <a href="/mentions-legales" className="hover:text-foreground/60 transition-colors duration-200">Mentions légales</a>
          <a href="/confidentialite" className="hover:text-foreground/60 transition-colors duration-200">Politique de confidentialité</a>
          <span className="inline-flex items-center gap-2 ml-4">
            <a href="https://facebook.com/" target="_blank" rel="noopener" aria-label="Facebook" className="hover:text-gold transition-colors duration-200">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg>
            </a>
            <a href="https://linkedin.com/" target="_blank" rel="noopener" aria-label="LinkedIn" className="hover:text-gold transition-colors duration-200">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.968v5.699h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.838-1.563 3.036 0 3.6 2.001 3.6 4.601v5.595z"/></svg>
            </a>
            <a href="https://instagram.com/" target="_blank" rel="noopener" aria-label="Instagram" className="hover:text-gold transition-colors duration-200">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.242 1.308 3.608.058 1.266.069 1.646.069 4.85s-.011 3.584-.069 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.242 1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.011-4.85-.069c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.242-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.242-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.775.131 4.602.425 3.635 1.392 2.668 2.359 2.374 3.532 2.315 4.809 2.256 6.089 2.243 6.498 2.243 12c0 5.502.013 5.911.072 7.191.059 1.277.353 2.45 1.32 3.417.967.967 2.14 1.261 3.417 1.32C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.277-.059 2.45-.353 3.417-1.32.967-.967 1.261-2.14 1.32-3.417.059-1.28.072-1.689.072-7.191 0-5.502-.013-5.911-.072-7.191-.059-1.277-.353-2.45-1.32-3.417C19.398.425 18.225.131 16.948.072 15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
            </a>
          </span>
        </div>
      </footer>

      {/* ─── MODAL PAIEMENT ─── */}
      {selectedOffer && (
        <SubscriptionModal
          offer={selectedOffer}
          onClose={() => setSelectedOffer(null)}
        />
      )}

      {/* ─── MODAL PARTENARIAT CABINET ─── */}
      {showPartnershipModal && (
        <PartnershipModal onClose={() => setShowPartnershipModal(false)} />
      )}
    </div>
  );
}

function SubscriptionModal({ offer, onClose }: { offer: Offer; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/75 backdrop-blur-md animate-[fadeIn_200ms_ease-out]" />
      {/* Modal content */}
      <div className="relative w-full max-w-2xl rounded-2xl animate-[slideUp_300ms_ease-out]">
        <SubscriptionForm offer={offer} onClose={onClose} />
      </div>
    </div>
  );
}

const partnershipOffer: Offer = {
  id: "partenariat-cabinet",
  title: "Partenariat Cabinet Comptable",
  description: "Demande de partenariat pour externalisation comptable",
  features: [],
  cta: "Envoyer ma demande",
};

function PartnershipModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-[fadeIn_200ms_ease-out]" />
      <div className="relative w-full max-w-xl rounded-[10px] border border-border-gold shadow-[0_10px_40px_rgba(0,0,0,0.5)] animate-[slideUp_300ms_ease-out] max-h-[95vh] overflow-y-auto scroll-smooth">
        <CabinetLeadForm offer={partnershipOffer} onClose={onClose} />
      </div>
    </div>
  );
}
