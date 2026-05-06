"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import OfferToggle from "@/components/OfferToggle";
import EntrepreneurOffers from "@/components/EntrepreneurOffers";
import SubscriptionForm from "@/components/SubscriptionForm";
import CabinetLeadForm from "@/components/CabinetLeadForm";
import BookingModal from "@/components/BookingModal";

import { entrepreneurOffers } from "@/data/entrepreneurOffers";
import { Offer } from "@/types/offers";

export default function Home() {
  const [isEntrepreneur, setIsEntrepreneur] = useState(true);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [showPartnershipModal, setShowPartnershipModal] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [showOffersModal, setShowOffersModal] = useState(false);
  const [bookingOffer, setBookingOffer] = useState<Offer | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("theme-light", theme === "light");
  }, [theme]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <button
        type="button"
        onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
        aria-label={theme === "dark" ? "Activer le mode clair" : "Activer le mode sombre"}
        title={theme === "dark" ? "Mode clair" : "Mode sombre"}
        className="fixed top-4 right-4 z-[60] h-9 w-16 rounded-full border border-border-gold bg-background-tertiary/95 p-1 shadow-[var(--shadow)] transition-all duration-300"
      >
        <span className="relative block h-full w-full" aria-hidden="true">
          <span
            className={`pointer-events-none absolute left-[7px] top-1/2 z-20 -translate-y-1/2 transition-colors duration-300 ${
              theme === "dark" ? "text-[#0b132b]" : "text-foreground-muted"
            }`}
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0 1 12 21.75C6.615 21.75 2.25 17.385 2.25 12A9.718 9.718 0 0 1 8.998 2.248a.75.75 0 0 1 .85.973 8.25 8.25 0 0 0 10.932 10.932.75.75 0 0 1 .972.85Z" />
            </svg>
          </span>
          <span
            className={`pointer-events-none absolute right-[7px] top-1/2 z-20 -translate-y-1/2 transition-colors duration-300 ${
              theme === "light" ? "text-[#0b132b]" : "text-gold/80"
            }`}
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25M12 18.75V21M5.636 5.636l1.59 1.59M16.773 16.773l1.591 1.591M3 12h2.25M18.75 12H21M5.636 18.364l1.59-1.59M16.773 7.227l1.591-1.591M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
            </svg>
          </span>

          <span
            className={`absolute top-0 z-10 h-7 w-7 rounded-full border border-border-gold bg-gold text-[#0b132b] shadow-sm transition-transform duration-300 grid place-items-center ${theme === "light" ? "translate-x-7" : "translate-x-0"}`}
          />
        </span>
      </button>

      {/* ─── HERO SECTION ─── */}
      <section
        className="relative min-h-[75vh] flex flex-col justify-center px-6 py-10 md:py-14 overflow-hidden"
        style={{
          background:
            theme === "dark"
              ? "linear-gradient(135deg, #0b132b, #0f1c3f)"
              : "linear-gradient(135deg, #eceff4, #e1e7ef)",
        }}
      >
        {/* Background image overlay with fade edges */}
        <div className="absolute right-0 top-[10%] w-[45%] h-[90%] pointer-events-none" style={{ maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)", WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)" }}>
          <div className={`w-full h-full bg-[url('/hero-bg.jpg')] bg-center bg-no-repeat bg-cover ${theme === "dark" ? "opacity-25" : "opacity-30"}`} />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto md:mx-0 md:ml-[10%]">
          {/* Logo */}
          <div className="flex flex-row items-center gap-3 sm:gap-4 mb-5">
            <Image
              src="/logo.png"
              alt="World Gestion"
              width={140}
              height={140}
              className="h-30 sm:h-30 md:h-35 w-auto flex-shrink-0"
            />
            <div className="min-w-0">
              <span className={`font-bold text-lg sm:text-2xl md:text-3xl tracking-wide block ${theme === "dark" ? "text-gold" : "text-[#8a6120]"}`}>World Gestion</span>
              <span className={`block max-w-[220px] sm:max-w-none text-[11px] sm:text-xs md:text-sm leading-snug text-left ${theme === "dark" ? "text-gold" : "text-[#8a6120]"}`}>
                Je prends en charge votre traitement administratif
                <span className="sm:hidden"> et votre pré-comptabilité avec expertise et rigueur</span>
                <span className="hidden sm:inline">
                  <br />et votre pré-comptabilité avec expertise et rigueur
                </span>
              </span>
            </div>
          </div>

          {/* Title */}
          <h1 className={`font-title text-xl sm:text-4xl md:text-5xl font-bold leading-tight ${theme === "dark" ? "text-white" : "text-black"}`}>
            Simplifiez et optimisez votre<br />
            <span className={theme === "dark" ? "text-white" : "text-black"}>gestion d&apos;entreprise,</span><br />
            <span className="text-gold">en toute sérénité.</span>
          </h1>

          {/* Subtitle */}


          {/* CTA */}
        </div>
      </section>

      {/* ─── TOGGLE + SERVICES + OFFRES ─── */}
      <section id="offres" className="px-6 py-10 md:py-12 bg-background">
        <div className="mx-auto max-w-6xl">
          <OfferToggle
            isEntrepreneur={isEntrepreneur}
            onChange={(v) => {
              setIsEntrepreneur(v);
              setSelectedOffer(null);
            }}
          />

          {/* ─── Services / Cabinet intro ─── */}
          <div key={isEntrepreneur ? "entrepreneur" : "cabinet"} className="animate-fade-in-up">
          <div className="mt-8 max-w-5xl mx-auto">
            {!isEntrepreneur && (
              /* ═══ Contenu Cabinets Comptables ═══ */
              <div className="py-10 md:py-16 max-w-5xl mx-auto space-y-8">
                {/* Bloc en-tête pleine largeur */}
                <div className="space-y-6 text-center">
                  <h2 className={`font-title text-3xl md:text-5xl font-bold leading-tight ${theme === "dark" ? "text-gold" : "text-[#8a6120]"}`}>
                    Pour les cabinets comptables
                  </h2>
                  <p className={`text-sm md:text-base leading-relaxed ${theme === "dark" ? "text-foreground-secondary" : "text-[#4a3010]"}`}>
                    Un support externalisé fiable, flexible et confidentiel, pour absorber votre charge et vous faire gagner du temps.
                  </p>
                  {/* Bénéfices horizontaux */}
                  <div className="flex flex-wrap justify-center gap-x-20 gap-y-6 pt-2">
                    {([
                      {
                        label: "Flexibilité",
                        svg: (
                          <svg className="h-10 w-10 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                          </svg>
                        ),
                      },
                      {
                        label: "Productivité",
                        svg: (
                          <svg className="h-10 w-10 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
                          </svg>
                        ),
                      },
                      {
                        label: "Délégation fiable",
                        svg: (
                          <svg className="h-10 w-10 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                          </svg>
                        ),
                      },
                    ] as { label: string; svg: React.ReactNode }[]).map(({ svg, label }) => (
                      <div key={label} className={`flex flex-col items-center gap-2 text-base md:text-lg font-semibold ${theme === "dark" ? "text-foreground-secondary" : "text-[#4a3010]"}`}>
                        <span className={theme === "dark" ? "text-gold" : "text-[#8a6120]"}>{svg}</span>
                        {label}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Deux colonnes : missions + image */}
                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
                  <div className="flex-1 min-w-0 space-y-6">
                    <div>
                      <p className={`text-lg md:text-xl font-bold mb-5 ${theme === "dark" ? "text-gold" : "text-[#8a6120]"}`}>
                        Mes missions
                      </p>
                      <ul className="space-y-4">
                        {[
                          "Saisie comptable",
                          "Préparation des dossiers",
                          "Organisation des pièces",
                          "Support administratif",
                        ].map((s) => (
                          <li key={s} className={`flex items-center gap-3 text-base md:text-lg font-medium ${theme === "dark" ? "text-foreground-secondary" : "text-[#4a3010]"}`}>
                            <span className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full ${theme === "dark" ? "bg-gold/15" : "bg-[#8a6120]/10"}`}>
                              <svg className={`h-4 w-4 ${theme === "dark" ? "text-gold" : "text-[#8a6120]"}`} fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </span>
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>

                  {/* Colonne droite — image */}
                  <div className="w-full md:w-[52%] flex-shrink-0 relative h-64 md:h-96">
                    <div
                      className={`absolute inset-0 bg-cover bg-center bg-no-repeat ${theme === "dark" ? "opacity-35" : "opacity-50"}`}
                      style={{
                        backgroundImage: "url('/cabinet-photo.jpg')",
                        maskImage: "linear-gradient(to right, transparent, black 40%, black 60%, transparent), linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)",
                        WebkitMaskImage: "linear-gradient(to right, transparent, black 40%, black 60%, transparent), linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)",
                        maskComposite: "intersect",
                        WebkitMaskComposite: "destination-in",
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ─── Offres ─── */}
          <div id="nos-offres" className="mt-10">
            {isEntrepreneur ? (
              <div className="py-10 md:py-16 max-w-5xl mx-auto space-y-8">
                    {/* Bloc en-tête pleine largeur */}
                    <div className="space-y-6 text-center">
                      <h2 className={`font-title text-3xl md:text-5xl font-bold leading-tight ${theme === "dark" ? "text-gold" : "text-[#8a6120]"}`}>
                        Pour les entrepreneurs
                      </h2>
                      <p className={`text-sm md:text-base leading-relaxed ${theme === "dark" ? "text-foreground-secondary" : "text-[#4a3010]"}`}>
                        Vous voulez vous concentrer sur votre activité&nbsp;? Je m&apos;occupe du reste.
                      </p>
                      {/* Bénéfices horizontaux */}
                      <div className="flex flex-wrap justify-center gap-x-20 gap-y-6 pt-2">
                        {([
                          {
                            label: "Gain de temps",
                            svg: (
                                <svg className="h-10 w-10 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l3.75 3.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                              </svg>
                            ),
                          },
                          {
                            label: "Moins de stress",
                            svg: (
                                <svg className="h-10 w-10 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                              </svg>
                            ),
                          },
                          {
                            label: "Gestion claire",
                            svg: (
                                <svg className="h-10 w-10 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
                              </svg>
                            ),
                          },
                        ] as { label: string; svg: React.ReactNode }[]).map(({ svg, label }) => (
                          <div key={label} className={`flex flex-col items-center gap-2 text-base md:text-lg font-semibold ${theme === "dark" ? "text-foreground-secondary" : "text-[#4a3010]"}`}>
                            <span className={theme === "dark" ? "text-gold" : "text-[#8a6120]"}>{svg}</span>
                            {label}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Deux colonnes : services + image */}
                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
                      <div className="flex-1 min-w-0 space-y-6">
                        <div>
                          <p className={`text-lg md:text-xl font-bold mb-5 ${theme === "dark" ? "text-gold" : "text-[#8a6120]"}`}>
                            Mes services
                          </p>
                          <ul className="space-y-4">
                            {[
                              "Support administratif",
                              "Pré-comptabilité",
                              "Accompagnement sur mesure",
                            ].map((s) => (
                              <li key={s} className={`flex items-center gap-3 text-base md:text-lg font-medium ${theme === "dark" ? "text-foreground-secondary" : "text-[#4a3010]"}`}>
                                <span className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full ${theme === "dark" ? "bg-gold/15" : "bg-[#8a6120]/10"}`}>
                                  <svg className={`h-4 w-4 ${theme === "dark" ? "text-gold" : "text-[#8a6120]"}`} fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                </span>
                                {s}
                              </li>
                            ))}
                          </ul>
                        </div>

                      </div>

                      {/* Colonne droite — image */}
                      <div className="w-full md:w-[52%] flex-shrink-0 relative h-64 md:h-96">
                        <div
                          className={`absolute inset-0 bg-cover bg-center bg-no-repeat ${theme === "dark" ? "opacity-35" : "opacity-50"}`}
                          style={{
                            backgroundImage: "url('/entrepreneur-photo.jpg')",
                            maskImage: "linear-gradient(to right, transparent, black 40%, black 60%, transparent), linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)",
                            WebkitMaskImage: "linear-gradient(to right, transparent, black 40%, black 60%, transparent), linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)",
                            maskComposite: "intersect",
                            WebkitMaskComposite: "destination-in",
                          }}
                        />
                      </div>
                    </div>

                    {/* ── Séparateur ── */}
                    <div className="h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

                    {/* ── Pourquoi travailler avec moi ? ── */}
                    <div className="space-y-8">
                      <h2 className={`font-title text-2xl md:text-3xl font-bold text-center ${theme === "dark" ? "text-gold" : "text-[#8a6120]"}`}>
                        Pourquoi travailler avec moi&nbsp;?
                      </h2>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {([
                          {
                            label: "Interlocuteur unique et dédié",
                            svg: <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>,
                          },
                          {
                            label: "Réactivité — réponse sous 24h",
                            svg: <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l3.75 3.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>,
                          },
                          {
                            label: "Rigueur et confidentialité",
                            svg: <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" /></svg>,
                          },
                          {
                            label: "Adaptation à vos outils et méthodes",
                            svg: <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>,
                          },
                          {
                            label: "Zéro engagement — devis gratuit",
                            svg: <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185Z" /></svg>,
                          },
                        ] as { label: string; svg: React.ReactNode }[]).map(({ svg, label }) => (
                          <div
                            key={label}
                            className={`flex flex-col items-center gap-3 rounded-[10px] border border-border-gold p-4 text-center ${theme === "dark" ? "bg-background-tertiary" : "bg-white/60"}`}
                          >
                            <span className={theme === "dark" ? "text-gold" : "text-[#8a6120]"}>{svg}</span>
                            <p className={`text-xs font-medium leading-snug ${theme === "dark" ? "text-foreground-secondary" : "text-[#4a3010]"}`}>{label}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* ── Séparateur ── */}
                    <div className="h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

                    {/* ── Comment ça se passe ? ── */}
                    <div className="space-y-8">
                      <h2 className={`font-title text-2xl md:text-3xl font-bold text-center ${theme === "dark" ? "text-gold" : "text-[#8a6120]"}`}>
                        Comment ça se passe&nbsp;?
                      </h2>
                      <div className="relative">
                        {/* Ligne de connexion desktop */}
                        <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                          {([
                            {
                              num: "1",
                              title: "Prise de contact",
                              desc: "Vous réservez un appel découverte gratuit",
                              svg: <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" /></svg>,
                            },
                            {
                              num: "2",
                              title: "Échange",
                              desc: "J’écoute vos besoins et vos objectifs",
                              svg: <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" /></svg>,
                            },
                            {
                              num: "3",
                              title: "Solution adaptée",
                              desc: "Je vous propose un accompagnement sur mesure",
                              svg: <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg>,
                            },
                            {
                              num: "4",
                              title: "Vous décidez",
                              desc: "Vous choisissez en toute liberté, sans engagement",
                              svg: <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>,
                            },
                          ] as { num: string; title: string; desc: string; svg: React.ReactNode }[]).map(({ num, title, desc, svg }) => (
                            <div key={num} className="flex flex-col items-center text-center gap-3">
                              <div className={`relative z-10 flex h-14 w-14 items-center justify-center rounded-full border-2 ${theme === "dark" ? "border-gold bg-background text-gold" : "border-[#8a6120] bg-white text-[#8a6120]"}`}>
                                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-white">{num}</span>
                                {svg}
                              </div>
                              <p className={`text-sm font-bold ${theme === "dark" ? "text-foreground" : "text-[#2a1a00]"}`}>{title}</p>
                              <p className={`text-xs leading-relaxed ${theme === "dark" ? "text-foreground-muted" : "text-[#6b4c1e]"}`}>{desc}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* ── Bandeau CTA final ── */}
                    <div className={`rounded-[12px] border border-border-gold px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-6 ${theme === "dark" ? "bg-background-tertiary" : "bg-white/70"}`}>
                      <div>
                        <p className={`text-xl md:text-2xl font-bold ${theme === "dark" ? "text-foreground" : "text-[#2a1a00]"}`}>
                          Prêt à simplifier votre gestion&nbsp;?
                        </p>
                        <p className={`mt-1 text-sm ${theme === "dark" ? "text-foreground-muted" : "text-[#6b4c1e]"}`}>
                          Faites le premier pas dès aujourd&apos;hui.
                        </p>
                      </div>
                      <div className="flex flex-col items-center gap-2 flex-shrink-0">
                        <button
                          onClick={() => setShowOffersModal(true)}
                          className="btn-gold text-sm md:text-base whitespace-nowrap"
                        >
                          Découvrir mes offres !
                        </button>
                        <p className={`text-xs ${theme === "dark" ? "text-foreground-muted" : "text-[#6b4c1e]"}`}>
                          Réponse sous 24h garantie
                        </p>
                      </div>
                    </div>

              </div>
            ) : (
              <div className="space-y-6">
                {/* Ligne séparatrice dorée */}
                <div className="relative">
                  <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-70" />
                  <div className="w-3 h-3 mx-auto -mt-1.5 rounded-full bg-gold shadow-[0_0_20px_rgba(201,168,76,0.7)]" />
                </div>

                {/* ── Pourquoi travailler avec nous ? ── */}
                <div className="space-y-8 pt-4">
                  <h2 className={`font-title text-2xl md:text-3xl font-bold text-center ${theme === "dark" ? "text-gold" : "text-[#8a6120]"}`}>
                    Pourquoi me faire confiance&nbsp;?
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {([
                      {
                        label: "Confidentialité totale",
                        svg: <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" /></svg>,
                      },
                      {
                        label: "Respect des délais",
                        svg: <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l3.75 3.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>,
                      },
                      {
                        label: "Qualité constante",
                        svg: <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" /></svg>,
                      },
                      {
                        label: "Collaboration fluide",
                        svg: <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" /></svg>,
                      },
                      {
                        label: "Adaptation à vos outils",
                        svg: <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>,
                      },
                    ] as { label: string; svg: React.ReactNode }[]).map(({ svg, label }) => (
                      <div
                        key={label}
                        className={`flex flex-col items-center gap-3 rounded-[10px] border border-border-gold p-4 text-center ${theme === "dark" ? "bg-background-tertiary" : "bg-white/60"}`}
                      >
                        <span className={theme === "dark" ? "text-gold" : "text-[#8a6120]"}>{svg}</span>
                        <p className={`text-xs font-medium leading-snug ${theme === "dark" ? "text-foreground-secondary" : "text-[#4a3010]"}`}>{label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

                {/* ── Comment ça se passe ? ── */}
                <div className="space-y-8">
                  <h2 className={`font-title text-2xl md:text-3xl font-bold text-center ${theme === "dark" ? "text-gold" : "text-[#8a6120]"}`}>
                    Comment ça se passe&nbsp;?
                  </h2>
                  <div className="relative">
                    <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      {([
                        {
                          num: "1",
                          title: "Prise de contact",
                          desc: "Vous me contactez pour présenter votre cabinet",
                          svg: <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" /></svg>,
                        },
                        {
                          num: "2",
                          title: "Analyse des besoins",
                          desc: "J’échange avec vous sur le volume et les missions à externaliser",
                          svg: <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" /></svg>,
                        },
                        {
                          num: "3",
                          title: "Proposition de partenariat",
                          desc: "Je vous propose les modalités de la mission",
                          svg: <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg>,
                        },
                        {
                          num: "4",
                          title: "Démarrage",
                          desc: "J’intègre vos process et prends en charge vos dossiers",
                          svg: <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>,
                        },
                      ] as { num: string; title: string; desc: string; svg: React.ReactNode }[]).map(({ num, title, desc, svg }) => (
                        <div key={num} className="flex flex-col items-center text-center gap-3">
                          <div className={`relative z-10 flex h-14 w-14 items-center justify-center rounded-full border-2 ${theme === "dark" ? "border-gold bg-background text-gold" : "border-[#8a6120] bg-white text-[#8a6120]"}`}>
                            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-white">{num}</span>
                            {svg}
                          </div>
                          <p className={`text-sm font-bold ${theme === "dark" ? "text-foreground" : "text-[#2a1a00]"}`}>{title}</p>
                          <p className={`text-xs leading-relaxed ${theme === "dark" ? "text-foreground-muted" : "text-[#6b4c1e]"}`}>{desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

                {/* ── Bandeau CTA ── */}
                <div className={`rounded-[12px] border border-border-gold px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-6 ${theme === "dark" ? "bg-background-tertiary" : "bg-white/70"}`}>
                  <div>
                    <p className={`text-xl md:text-2xl font-bold ${theme === "dark" ? "text-foreground" : "text-[#2a1a00]"}`}>
                      Prêt à optimiser votre cabinet&nbsp;?
                    </p>
                    <p className={`mt-1 text-sm ${theme === "dark" ? "text-foreground-muted" : "text-[#6b4c1e]"}`}>
                      Contactez-moi dès aujourd&apos;hui.
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => setShowPartnershipModal(true)}
                      className="btn-gold text-sm md:text-base whitespace-nowrap"
                    >
                      Demander un partenariat
                    </button>
                    <p className={`text-xs ${theme === "dark" ? "text-foreground-muted" : "text-[#6b4c1e]"}`}>
                      Réponse sous 24h garantie
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
          </div>{/* end animated wrapper */}
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
            <a href="https://www.facebook.com/share/1AtxpsRjpU/?mibextid=wwXIfr" target="_blank" rel="noopener" aria-label="Facebook" className="hover:text-gold transition-colors duration-200">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg>
            </a>
            <a href="https://www.linkedin.com/company/world-gestion/" target="_blank" rel="noopener" aria-label="LinkedIn" className="hover:text-gold transition-colors duration-200">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.968v5.699h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.838-1.563 3.036 0 3.6 2.001 3.6 4.601v5.595z"/></svg>
            </a>
            <a href="https://www.instagram.com/world.gestion?igsh=MWZwbTFzczZ3Nm85dQ%3D%3D&utm_source=qr" target="_blank" rel="noopener" aria-label="Instagram" className="hover:text-gold transition-colors duration-200">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.242 1.308 3.608.058 1.266.069 1.646.069 4.85s-.011 3.584-.069 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.242 1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.011-4.85-.069c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.242-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.242-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.775.131 4.602.425 3.635 1.392 2.668 2.359 2.374 3.532 2.315 4.809 2.256 6.089 2.243 6.498 2.243 12c0 5.502.013 5.911.072 7.191.059 1.277.353 2.45 1.32 3.417.967.967 2.14 1.261 3.417 1.32C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.277-.059 2.45-.353 3.417-1.32.967-.967 1.261-2.14 1.32-3.417.059-1.28.072-1.689.072-7.191 0-5.502-.013-5.911-.072-7.191-.059-1.277-.353-2.45-1.32-3.417C19.398.425 18.225.131 16.948.072 15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
            </a>
          </span>
        </div>
      </footer>

      {/* ─── MODAL OFFRES ENTREPRENEUR ─── */}
      {showOffersModal && (
        <OffersModal
          theme={theme}
          onClose={() => setShowOffersModal(false)}
          onSelectOffer={(offer) => {
            setShowOffersModal(false);
            setBookingOffer(offer);
          }}
        />
      )}

      {/* ─── MODAL BOOKING ─── */}
      {bookingOffer && (
        <BookingModal
          offer={bookingOffer}
          theme={theme}
          onClose={() => setBookingOffer(null)}
        />
      )}

      {/* ─── MODAL PAIEMENT ─── */}
      {selectedOffer && (
        <SubscriptionModal
          offer={selectedOffer}
          theme={theme}
          onClose={() => setSelectedOffer(null)}
        />
      )}

      {/* ─── MODAL PARTENARIAT CABINET ─── */}
      {showPartnershipModal && (
        <PartnershipModal theme={theme} onClose={() => setShowPartnershipModal(false)} />
      )}
    </div>
  );
}

function OffersModal({
  theme,
  onClose,
  onSelectOffer,
}: {
  theme: "dark" | "light";
  onClose: () => void;
  onSelectOffer: (offer: Offer) => void;
}) {
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
      {/* Backdrop */}
      <div className={`absolute inset-0 backdrop-blur-sm animate-[fadeIn_200ms_ease-out] ${theme === "dark" ? "bg-black/75" : "bg-slate-900/35"}`} />

      {/* Boîte modale */}
      <div className={`relative w-full max-w-4xl rounded-[12px] border border-border-gold animate-[slideUp_300ms_ease-out] max-h-[90vh] overflow-y-auto ${theme === "dark" ? "bg-[#0b132b] shadow-[0_10px_40px_rgba(0,0,0,0.6)]" : "bg-[#f5f0e8] shadow-[0_12px_36px_rgba(15,23,42,0.22)]"}`}>
        {/* Header */}
        <div className={`sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-border-gold ${theme === "dark" ? "bg-[#0b132b]/95 backdrop-blur" : "bg-[#f5f0e8]/95 backdrop-blur"}`}>
          <h2 className={`font-title text-xl font-bold ${theme === "dark" ? "text-gold" : "text-[#8a6120]"}`}>
            Mes Offres
          </h2>
          <button
            onClick={onClose}
            aria-label="Fermer"
            className={`flex h-9 w-9 items-center justify-center rounded-full border border-border-gold transition-colors ${theme === "dark" ? "text-foreground-muted hover:text-foreground" : "text-[#8a6120] hover:text-[#5a3a0a]"}`}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Contenu */}
        <div className="px-6 py-8">
          <p className="text-foreground-secondary text-center mb-8 max-w-lg mx-auto">
            Choisissez la formule qui correspond à votre profil et vos besoins.
          </p>
          <EntrepreneurOffers
            offers={entrepreneurOffers}
            onSelect={(offer) => {
              onClose();
              onSelectOffer(offer);
            }}
            theme={theme}
          />
        </div>
      </div>
    </div>
  );
}

function SubscriptionModal({ offer, theme, onClose }: { offer: Offer; theme: "dark" | "light"; onClose: () => void }) {
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
      <div className={`absolute inset-0 backdrop-blur-md animate-[fadeIn_200ms_ease-out] ${theme === "dark" ? "bg-black/75" : "bg-slate-900/35"}`} />
      {/* Modal content */}
      <div className="relative w-full max-w-2xl rounded-2xl animate-[slideUp_300ms_ease-out]">
        <SubscriptionForm offer={offer} onClose={onClose} lightMode={theme === "light"} />
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

function PartnershipModal({ theme, onClose }: { theme: "dark" | "light"; onClose: () => void }) {
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
      <div className={`absolute inset-0 backdrop-blur-sm animate-[fadeIn_200ms_ease-out] ${theme === "dark" ? "bg-black/50" : "bg-slate-900/30"}`} />
      <div className={`relative w-full max-w-xl rounded-[10px] border border-border-gold animate-[slideUp_300ms_ease-out] max-h-[95vh] overflow-y-auto scroll-smooth ${theme === "dark" ? "shadow-[0_10px_40px_rgba(0,0,0,0.5)]" : "shadow-[0_12px_36px_rgba(15,23,42,0.22)]"}`}>
        <CabinetLeadForm offer={partnershipOffer} onClose={onClose} lightMode={theme === "light"} />
      </div>
    </div>
  );
}
