"use client";

import Image from "next/image";
import { useState, useCallback, useEffect } from "react";
import EntrepreneurOffers from "@/components/EntrepreneurOffers";
import SubscriptionForm from "@/components/SubscriptionForm";
import CabinetLeadForm from "@/components/CabinetLeadForm";

import { entrepreneurOffers } from "@/data/entrepreneurOffers";
import { Offer } from "@/types/offers";
import cabinetCtaImage from "../../images/d37a60030ad57419d49021b8940fee46.jpg";

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

type HomepageLeadRecord = {
  id: string;
  createdAt: string;
  type: "entrepreneur" | "cabinet";
  offerId: string;
  offerTitle: string;
  email: string;
  phone: string;
  firstName?: string;
  lastName?: string;
  cabinetName?: string;
  responsableName?: string;
  note?: string;
};

type HomepageAdminDashboard = {
  leads: HomepageLeadRecord[];
  stats: {
    totalLeads: number;
  };
};

export default function Home() {
  const [isEntrepreneur, setIsEntrepreneur] = useState(true);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [showPartnershipModal, setShowPartnershipModal] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const scrollTo = useCallback((el: HTMLElement | null) => {
    if (el) smoothScrollTo(el);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("theme-light", theme === "light");
  }, [theme]);

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal-left, .reveal-right, .reveal-up");
    if (!els.length) return;
    // Reset visibility so elements outside viewport animate again after tab switch
    els.forEach((el) => el.classList.remove("is-visible"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isEntrepreneur]);

  const handleOfferSelect = (offer: Offer) => {
    setSelectedOffer(offer);
  };

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
        className="relative px-6 py-10 md:py-14 overflow-hidden"
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
            <img
              src="/logo.png"
              alt="World Gestion"
                className="h-30 sm:h-30 md:h-35 w-auto flex-shrink-0"
            />
            <div className="min-w-0">
              <span className={`font-bold text-lg sm:text-2xl md:text-3xl tracking-wide block ${theme === "dark" ? "text-gold" : "text-[#8a6120]"}`}>World Gestion</span>
              <span className={`block max-w-[220px] sm:max-w-none text-[11px] sm:text-xs md:text-sm leading-snug text-left ${theme === "dark" ? "text-gold" : "text-[#8a6120]"}`}>
                Je prends en charge le traitement administratif
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
            <span className={theme === "dark" ? "text-white" : "text-black"}>gestion d&apos;entreprise.</span>
          </h1>

          {/* Subtitle */}


        </div>
      </section>

      {/* ─── TOGGLE + SERVICES + OFFRES ─── */}
      <section id="offres" className="flex-1 px-6 py-10 md:py-12 bg-background">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mt-8 max-w-7xl space-y-10">
            <div className={`reveal-up rounded-[12px] border px-6 py-8 md:px-10 md:py-10 ${theme === "dark" ? "border-[rgba(201,168,76,0.08)] bg-[#0e1731]" : "border-[rgba(26,42,68,0.06)] bg-white shadow-[0_18px_60px_rgba(15,23,42,0.08)]"}`}>
              <h2 className={`font-title text-2xl md:text-3xl font-bold text-center ${theme === "dark" ? "text-gold" : "text-[#1a2a44]"}`}>
                Vous êtes :
              </h2>
              <div className="mx-auto mt-3 h-[2px] w-12 rounded-full bg-gold" />

              <div className="mt-8 flex flex-col items-stretch justify-center gap-6 md:flex-row md:items-center md:gap-8">
                <button
                  type="button"
                  onClick={() => {
                    setIsEntrepreneur(true);
                    setSelectedOffer(null);
                  }}
                  className={`flex items-center gap-4 rounded-[10px] border p-4 text-left transition-all duration-200 md:flex-1 ${
                    isEntrepreneur
                      ? theme === "dark"
                        ? "border-white/10 bg-gold/10 shadow-[0_0_0_1px_rgba(201,168,76,0.18)]"
                        : "border-[#f1e1d4] bg-[#fff5f0] shadow-[0_10px_30px_rgba(255,127,80,0.12)]"
                      : theme === "dark"
                        ? "border-white/10 bg-transparent hover:bg-white/[0.02]"
                        : "border-[#f1e1d4] bg-transparent hover:bg-[#fffaf8]"
                  }`}
                  aria-pressed={isEntrepreneur}
                >
                  <div className={`grid h-14 w-14 flex-shrink-0 place-items-center rounded-full text-gold ${isEntrepreneur ? "bg-gold/10" : ""}`}>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.7} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                  </div>
                  <div>
                    <p className={`text-base font-bold ${theme === "dark" ? "text-foreground" : "text-[#1a2a44]"}`}>Entrepreneur / independant</p>
                    <p className={`mt-1 text-sm ${theme === "dark" ? "text-foreground-muted" : "text-[#666]"}`}>
                      Vous gerez votre activite et manquez de temps.
                    </p>
                  </div>
                </button>

                <div className={`hidden h-16 w-px md:block ${theme === "dark" ? "bg-white/10" : "bg-[#eee]"}`} />

                <button
                  type="button"
                  onClick={() => {
                    setIsEntrepreneur(false);
                    setSelectedOffer(null);
                  }}
                  className={`flex items-center gap-4 rounded-[10px] border p-4 text-left transition-all duration-200 md:flex-1 ${
                    !isEntrepreneur
                      ? theme === "dark"
                        ? "border-white/10 bg-gold/10 shadow-[0_0_0_1px_rgba(201,168,76,0.18)]"
                        : "border-[#f1e1d4] bg-[#fff5f0] shadow-[0_10px_30px_rgba(255,127,80,0.12)]"
                      : theme === "dark"
                        ? "border-white/10 bg-transparent hover:bg-white/[0.02]"
                        : "border-[#f1e1d4] bg-transparent hover:bg-[#fffaf8]"
                  }`}
                  aria-pressed={!isEntrepreneur}
                >
                  <div className={`grid h-14 w-14 flex-shrink-0 place-items-center rounded-full text-gold ${!isEntrepreneur ? "bg-gold/10" : ""}`}>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.7} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15a.75.75 0 0 1 .75.75v16.5H3.75V3.75A.75.75 0 0 1 4.5 3Zm3 4.5h2.25v2.25H7.5V7.5Zm0 4.5h2.25v2.25H7.5V12Zm0 4.5h2.25v2.25H7.5V16.5Zm4.5-9h4.5v2.25H12V7.5Zm0 4.5h4.5v2.25H12V12Zm0 4.5h4.5v2.25H12V16.5Z" />
                    </svg>
                  </div>
                  <div>
                    <p className={`text-base font-bold ${theme === "dark" ? "text-foreground" : "text-[#1a2a44]"}`}>Cabinet comptable</p>
                    <p className={`mt-1 text-sm ${theme === "dark" ? "text-foreground-muted" : "text-[#666]"}`}>
                      Vous cherchez un support fiable et reactif.
                    </p>
                  </div>
                </button>
              </div>

              <p className={`mx-auto mt-8 max-w-3xl text-center text-base font-semibold ${theme === "dark" ? "text-foreground" : "text-[#1a2a44]"}`}>
                Vous cherchez une solution fiable pour deleguer votre gestion sans perdre le controle.
              </p>
            </div>

            {isEntrepreneur ? (
              <>
                <div className="reveal-left">
                  <h2 className={`font-title text-2xl md:text-3xl font-bold text-center ${theme === "dark" ? "text-gold" : "text-[#1a2a44]"}`}>
                    Ce que je vous apporte
                  </h2>
                  <div className="mx-auto mt-3 h-[2px] w-12 rounded-full bg-gold" />

                  <div className="mt-8 grid gap-6 md:grid-cols-4">
                    {[
                      {
                        title: "Moins de charge mentale",
                        description: "Je m'occupe des taches chronophages.",
                        icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l3.75 3.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />,
                      },
                      {
                        title: "Un gain de temps concret",
                        description: "Vous restez concentre sur votre coeur de metier.",
                        icon: <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.5 9.75 6.75l4.5 4.5L21 4.5M16.5 4.5H21V9" />,
                      },
                      {
                        title: "Une meilleure organisation",
                        description: "Vos documents sont classes, a jour et accessibles.",
                        icon: <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.5h6.75m-6.75 4.5h6.75m-6.75 4.5h6.75m3-9h9m-9 4.5h9m-9 4.5h9" />,
                      },
                      {
                        title: "Une gestion plus sure",
                        description: "Moins d'erreurs, plus de serenite.",
                        icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />,
                      },
                    ].map((item, index) => (
                      <div
                        key={item.title}
                        className={`px-5 text-center md:px-6 ${index < 3 ? theme === "dark" ? "md:border-r md:border-white/10" : "md:border-r md:border-[#eee]" : ""}`}
                      >
                        <div className="grid place-items-center text-gold">
                          <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.7} stroke="currentColor">
                            {item.icon}
                          </svg>
                        </div>
                        <h3 className={`mt-4 text-base font-bold ${theme === "dark" ? "text-foreground" : "text-[#1a2a44]"}`}>{item.title}</h3>
                        <p className={`mt-2 text-sm ${theme === "dark" ? "text-foreground-muted" : "text-[#666]"}`}>{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`reveal-right rounded-[24px] px-6 py-10 md:px-8 ${theme === "dark" ? "bg-white/[0.03]" : "bg-[#fdf8f6]"}`}>
                  <h2 className={`font-title text-2xl md:text-3xl font-bold text-center ${theme === "dark" ? "text-gold" : "text-[#1a2a44]"}`}>
                    Mes services
                  </h2>
                  <div className="mx-auto mt-3 h-[2px] w-12 rounded-full bg-gold" />

                  <div className="mt-14 grid gap-8 md:grid-cols-3">
                    {[
                      {
                        title: "Support administratif",
                        description: "Je gere vos taches administratives courantes : courriers, classement, relances...",
                        icon: (
                          <>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                          </>
                        ),
                      },
                      {
                        title: "Pre-comptabilite",
                        description: "Je saisis et organise vos documents comptables pour une comptabilite toujours a jour.",
                        icon: <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V13.5Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V18Zm2.498-6.75h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V13.5Zm0 2.25h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V18Zm2.504-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V18Zm2.498-6.75h.008v.008h-.008v-.008ZM15.75 13.5h.008v.008h-.008V13.5ZM6 6.75A.75.75 0 0 1 6.75 6h10.5a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-.75.75H6.75A.75.75 0 0 1 6 8.25v-1.5Z" />,
                      },
                      {
                        title: "Accompagnement sur mesure",
                        description: "Chaque entreprise est differente. J'adapte mes services a vos besoins et a votre organisation.",
                        icon: (
                          <>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                          </>
                        ),
                      },
                    ].map((item) => (
                      <div
                        key={item.title}
                        className={`relative rounded-2xl border px-6 pb-7 pt-12 text-center ${theme === "dark" ? "border-gold/15 bg-background shadow-[0_12px_40px_rgba(0,0,0,0.28)]" : "border-[#eee] bg-white shadow-[0_4px_15px_rgba(0,0,0,0.03)]"}`}
                      >
                        <div className="absolute left-1/2 top-0 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#1a2a44] text-white">
                          <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor">
                            {item.icon}
                          </svg>
                        </div>
                        <h3 className={`text-lg font-bold ${theme === "dark" ? "text-foreground" : "text-[#1a2a44]"}`}>{item.title}</h3>
                        <p className={`mt-3 text-sm leading-relaxed ${theme === "dark" ? "text-foreground-muted" : "text-[#666]"}`}>{item.description}</p>
                      </div>
                    ))}
                  </div>

                  <p className={`mt-8 text-center text-sm font-medium ${theme === "dark" ? "text-foreground-secondary" : "text-[#333]"}`}>
                    Une solution flexible, evolutive et personnalisee.
                  </p>
                </div>
              </>
            ) : (
              <div className="space-y-14">
                <div className={`reveal-left rounded-[18px] border px-6 py-10 md:px-10 md:py-12 ${theme === "dark" ? "border-white/8 bg-[#142038] text-white" : "border-[rgba(26,42,68,0.08)] bg-[#5f7290] text-white"}`}>
                  <h2 className="font-title text-center text-2xl md:text-3xl font-bold text-gold">Les avantages pour votre cabinet</h2>

                  <div className="mt-12 grid gap-0 md:grid-cols-5 md:divide-x md:divide-white/10">
                    {[
                      {
                        title: "Gain de productivite",
                        text: "Vous liberez du temps pour le conseil.",
                        icon: (
                          <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 17.25V9.75m6 7.5V6.75m6 10.5V12m6 5.25V3.75" />
                          </svg>
                        ),
                      },
                      {
                        title: "Flexibilite totale",
                        text: "Adaptez le volume selon vos pics d'activite.",
                        icon: (
                          <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h9m0 0-3-3m3 3-3 3M16.5 16.5h-9m0 0 3-3m-3 3 3 3" />
                          </svg>
                        ),
                      },
                      {
                        title: "Maitrise des couts",
                        text: "Pas de recrutement, pas de charges sociales.",
                        icon: (
                          <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75h9A1.5 1.5 0 0 1 18 5.25v13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 18.75V5.25a1.5 1.5 0 0 1 1.5-1.5Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 7.5h6M9.75 12h.008v.008H9.75V12Zm0 3h.008v.008H9.75V15Zm2.992-3h.008v.008h-.008V12Zm0 3h.008v.008h-.008V15Zm2.992-3h.008v.008h-.008V12Zm0 3h.008v.008h-.008V15Z" />
                          </svg>
                        ),
                      },
                      {
                        title: "Reactivite",
                        text: "Je m'engage a repondre rapidement.",
                        icon: (
                          <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                          </svg>
                        ),
                      },
                      {
                        title: "Confidentialite",
                        text: "Donnees traitees avec rigueur et discretion.",
                        icon: (
                          <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                          </svg>
                        ),
                      },
                    ].map((item) => (
                      <div key={item.title} className="group flex flex-col items-center px-5 py-6 text-center">
                        {/* Gold top accent line */}
                        <div className="mb-5 h-[2px] w-8 rounded-full bg-gold/60 transition-all duration-300 group-hover:w-14 group-hover:bg-gold" />
                        {/* Icon — no background, just the SVG in gold */}
                        <div className="text-gold transition-transform duration-300 group-hover:-translate-y-1">
                          {item.icon}
                        </div>
                        <h3 className="mt-4 text-sm font-bold tracking-wide text-white">{item.title}</h3>
                        <p className="mt-2 text-xs leading-relaxed text-white/55">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <section className="reveal-right mx-auto max-w-6xl px-2 text-center">
                  <h2 className={`font-title text-2xl md:text-3xl font-bold ${theme === "dark" ? "text-[#f3dfc0]" : "text-[#1a2a44]"}`}>
                    Une collaboration simple et efficace
                  </h2>

                  <div className="relative mt-14 grid gap-10 md:grid-cols-4 md:gap-6">
                    <div className={`hidden md:block absolute left-[10%] right-[10%] top-[64px] border-t-2 border-dotted ${theme === "dark" ? "border-white/15" : "border-[#eee]"}`} />
                    {[
                      {
                        number: "1",
                        title: "Prise de contact",
                        text: "Vous m'expliquez vos besoins et attentes.",
                        icon: (
                          <svg className="h-9 w-9" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                          </svg>
                        ),
                      },
                      {
                        number: "2",
                        title: "Analyse et adaptation",
                        text: "Je prends connaissance de votre organisation.",
                        icon: (
                          <svg className="h-9 w-9" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-8.25a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6v12a2.25 2.25 0 0 0 2.25 2.25h5.25" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5h7.5M8.25 11.25h4.5M15.75 18.75l1.5 1.5 3-3" />
                          </svg>
                        ),
                      },
                      {
                        number: "3",
                        title: "Demarrage rapide",
                        text: "Je m'integre a vos process convenus.",
                        icon: (
                          <svg className="h-9 w-9" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0 1 15 0m-15 0a7.5 7.5 0 0 0 15 0m-15 0H3m16.5 0H21" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5v9m4.5-4.5h-9" />
                          </svg>
                        ),
                      },
                      {
                        number: "4",
                        title: "Suivi et ajustement",
                        text: "J'assure un suivi regulier pour optimiser notre collaboration.",
                        icon: (
                          <svg className="h-9 w-9" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                          </svg>
                        ),
                      },
                    ].map((item) => (
                      <div key={item.number} className="relative z-10 text-center">
                        <div className="flex flex-col items-center">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white/70 bg-[#1a2a44] text-[11px] font-semibold text-white shadow-[0_4px_12px_rgba(15,23,42,0.18)] dark:border-[#0f172f]">
                            {item.number}
                          </div>
                          <div className={`mt-2 mb-5 flex h-[72px] w-[72px] items-center justify-center rounded-full border shadow-[0_8px_18px_rgba(0,0,0,0.08)] ${theme === "dark" ? "border-white/10 bg-[#0f172f]" : "border-[#ffece6] bg-white"}`}>
                            <span className={`${theme === "dark" ? "text-gold drop-shadow-[0_0_10px_rgba(201,168,76,0.28)]" : "text-[#c9a84c]"}`}>{item.icon}</span>
                          </div>
                        </div>
                        <h4 className={`text-base font-semibold ${theme === "dark" ? "text-foreground" : "text-[#1a2a44]"}`}>{item.title}</h4>
                        <p className={`mt-2 text-sm ${theme === "dark" ? "text-foreground-muted" : "text-[#666]"}`}>{item.text}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <div className={`reveal-left mx-auto flex max-w-5xl flex-col overflow-hidden rounded-[15px] border md:flex-row ${theme === "dark" ? "border-gold/15 bg-white/[0.03] shadow-[0_12px_36px_rgba(0,0,0,0.28)]" : "border-[#e6dcc3] bg-background-tertiary shadow-[0_8px_24px_rgba(15,23,42,0.08)]"}`}>
                  <div className="flex-1 px-8 py-10 text-left">
                    <h2 className={`font-title text-2xl md:text-3xl font-bold ${theme === "dark" ? "text-gold" : "text-[#1a2a44]"}`}>Besoin d'un renfort fiable pour votre cabinet ?</h2>
                    <p className={`mt-3 text-base font-medium ${theme === "dark" ? "text-foreground" : "text-[#8a6120]"}`}>Discutons de vos besoins.</p>
                    <p className={`mt-3 text-sm leading-relaxed ${theme === "dark" ? "text-foreground-secondary" : "text-foreground-secondary"}`}>Je vous propose une solution sur mesure, simple, flexible et efficace.</p>
                    <button
                      onClick={() => setShowPartnershipModal(true)}
                      className={`mt-7 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold transition-all duration-200 ${theme === "dark" ? "border-gold/30 bg-gold text-[#0b132b] shadow-[0_6px_14px_rgba(201,168,76,0.10)] hover:bg-gold-light hover:shadow-[0_8px_18px_rgba(201,168,76,0.14)]" : "border-[#d5b86d] bg-gold text-[#0b132b] shadow-[0_4px_12px_rgba(201,168,76,0.09)] hover:bg-[#d7b764] hover:shadow-[0_6px_14px_rgba(201,168,76,0.12)]"}`}
                    >
                      <span className={`grid h-6 w-6 place-items-center rounded-full ${theme === "dark" ? "bg-[#0b132b]/10" : "bg-[#0b132b]/8"}`}>
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3.75 8.25h16.5M4.5 5.25h15A.75.75 0 0 1 20.25 6v12.75a.75.75 0 0 1-.75.75h-15a.75.75 0 0 1-.75-.75V6a.75.75 0 0 1 .75-.75Z" />
                        </svg>
                      </span>
                      <span>Echanger sur vos besoins</span>
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                      </svg>
                    </button>
                    <p className={`mt-5 inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1.5 text-sm ${theme === "dark" ? "border-white/10 bg-white/[0.04] text-foreground-secondary" : "border-[#d9e1ec] bg-white text-foreground-secondary"}`}>
                      <span className={`grid h-6 w-6 place-items-center rounded-full ${theme === "dark" ? "bg-gold/12 text-gold" : "bg-gold/15 text-[#8a6120]"}`}>
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                      </span>
                      <span className="font-medium">Reponse sous 24h garantie</span>
                    </p>
                  </div>

                  <div className="relative min-h-[300px] flex-1">
                    <Image
                      src={cabinetCtaImage}
                      alt="Renfort pour cabinet comptable"
                      fill
                      className="object-cover"
                      sizes="(min-width: 768px) 50vw, 100vw"
                    />
                  </div>
                </div>

              </div>
            )}
          </div>

          {/* ─── Offres ─── */}
          <div id="nos-offres" className="reveal-up mt-10">
            {isEntrepreneur ? (
              <>
                <h2 className={`font-title text-2xl md:text-3xl font-bold text-center mb-2 ${theme === "dark" ? "text-gold" : "text-[#8a6120]"}`}>Mes Offres</h2>
                <p className="text-foreground-secondary text-center mb-6 max-w-lg mx-auto">
                  Choisissez la formule qui correspond à votre profil et vos besoins.
                </p>

                <div className="mt-5">
                  <EntrepreneurOffers
                    offers={entrepreneurOffers}
                    onSelect={handleOfferSelect}
                    theme={theme}
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

                <h2 className={`font-title text-2xl md:text-3xl font-bold uppercase ${theme === "dark" ? "text-[#f3dfc0]" : "text-[#8a6120]"}`}>
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
