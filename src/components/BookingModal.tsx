"use client";

import { useState, useEffect } from "react";
import { Offer } from "@/types/offers";

type Step = 1 | 2 | 3;

interface BookingData {
  date: Date | null;
  time: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  clientType: "entrepreneur" | "cabinet" | "";
  need: string;
  offerTitle: string;
}

interface Props {
  offer: Offer;
  theme: "dark" | "light";
  onClose: () => void;
}

const TIME_SLOTS = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"];

const MONTH_NAMES = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
];
const DAY_NAMES = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

// Returns 0=Mon … 6=Sun
function getFirstWeekday(year: number, month: number) {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
}

function formatDate(date: Date) {
  return date.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
}

export default function BookingModal({ offer, theme, onClose }: Props) {
  const [step, setStep] = useState<Step>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [viewMonth, setViewMonth] = useState<Date>(() => {
    const d = new Date();
    d.setDate(1);
    d.setHours(0, 0, 0, 0);
    return d;
  });
  const [data, setData] = useState<BookingData>({
    date: null,
    time: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    clientType: "",
    need: "",
    offerTitle: offer.title,
  });

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const dark = theme === "dark";

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const year = viewMonth.getFullYear();
  const month = viewMonth.getMonth();

  const nowYear = today.getFullYear();
  const nowMonth = today.getMonth();
  const canGoPrev = year > nowYear || (year === nowYear && month > nowMonth);

  const daysInMonth = getDaysInMonth(year, month);
  const firstWeekday = getFirstWeekday(year, month);
  const calendarDays: (number | null)[] = [
    ...Array(firstWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (calendarDays.length % 7 !== 0) calendarDays.push(null);

  function isDayDisabled(day: number) {
    const d = new Date(year, month, day);
    d.setHours(0, 0, 0, 0);
    return d < today;
  }

  function isSelected(day: number) {
    if (!data.date) return false;
    return (
      data.date.getFullYear() === year &&
      data.date.getMonth() === month &&
      data.date.getDate() === day
    );
  }

  function prevMonth() {
    setViewMonth((m) => {
      const d = new Date(m);
      d.setMonth(d.getMonth() - 1);
      return d;
    });
  }

  function nextMonth() {
    setViewMonth((m) => {
      const d = new Date(m);
      d.setMonth(d.getMonth() + 1);
      return d;
    });
  }

  function update<K extends keyof BookingData>(field: K, value: BookingData[K]) {
    setData((prev) => ({ ...prev, [field]: value }));
  }

  const step1Valid = data.date !== null && data.time !== "";
  const step2Valid =
    data.firstName.trim() !== "" &&
    data.lastName.trim() !== "" &&
    data.email.trim() !== "" &&
    data.phone.trim() !== "" &&
    data.clientType !== "";

  const STEPS = ["Créneau", "Informations", "Confirmation"];

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Backdrop */}
      <div className={`absolute inset-0 backdrop-blur-sm animate-[fadeIn_200ms_ease-out] ${dark ? "bg-black/80" : "bg-slate-900/40"}`} />

      {/* Modal box */}
      <div
        className={`relative w-full max-w-4xl flex flex-col md:flex-row rounded-[12px] border border-border-gold overflow-hidden max-h-[92vh] animate-[slideUp_300ms_ease-out] ${
          dark
            ? "bg-[#0c1530] shadow-[0_20px_60px_rgba(0,0,0,0.7)]"
            : "bg-white shadow-[0_20px_60px_rgba(15,23,42,0.25)]"
        }`}
      >
        {/* ── Left column ── */}
        <div
          className={`hidden md:flex flex-col w-68 xl:w-72 flex-shrink-0 p-7 border-r ${
            dark ? "border-border-gold bg-[#0b132b]" : "border-[#e8d9b5] bg-[#faf6ed]"
          }`}
        >
          {/* Phone icon */}
          <div className={`w-11 h-11 rounded-full flex items-center justify-center mb-5 ${dark ? "bg-gold/15" : "bg-[#8a6120]/10"}`}>
            <svg className={`h-5 w-5 ${dark ? "text-gold" : "text-[#8a6120]"}`} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
            </svg>
          </div>

          <h3 className={`font-title text-base font-bold leading-snug mb-3 ${dark ? "text-gold" : "text-[#8a6120]"}`}>
            Réservez votre appel découverte gratuit
          </h3>
          <p className={`text-xs leading-relaxed mb-4 ${dark ? "text-foreground-secondary" : "text-[#5a3a10]"}`}>
            Un échange personnalisé pour comprendre vos besoins et vous proposer la solution la plus adaptée.
          </p>

          {/* Offer chip */}
          <div className={`rounded-lg px-3 py-2 mb-5 border text-xs font-semibold ${dark ? "border-gold/30 bg-gold/10 text-gold" : "border-[#8a6120]/25 bg-[#8a6120]/8 text-[#8a6120]"}`}>
            Offre choisie&nbsp;: {offer.title}
          </div>

          {/* Benefits */}
          <ul className="space-y-3 flex-1">
            {[
              { icon: "clock",  text: "Échange 100% gratuit" },
              { icon: "user",   text: "Dédié à votre écoute" },
              { icon: "star",   text: "Des conseils concrets et personnalisés" },
              { icon: "shield", text: "Aucun engagement de votre part" },
            ].map(({ icon, text }) => (
              <li key={text} className={`flex items-start gap-2.5 text-xs ${dark ? "text-foreground-secondary" : "text-[#5a3a10]"}`}>
                <span className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ${dark ? "bg-gold/15 text-gold" : "bg-[#8a6120]/10 text-[#8a6120]"}`}>
                  {icon === "clock"  && <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l3.75 3.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>}
                  {icon === "user"   && <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>}
                  {icon === "star"   && <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" /></svg>}
                  {icon === "shield" && <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" /></svg>}
                </span>
                {text}
              </li>
            ))}
          </ul>

          {/* Testimonial */}
          <div className={`mt-6 rounded-[8px] border p-3 ${dark ? "border-gold/20 bg-gold/5" : "border-[#8a6120]/15 bg-[#8a6120]/5"}`}>
            <p className={`text-[11px] italic leading-relaxed ${dark ? "text-foreground-muted" : "text-[#7a5515]"}`}>
              &ldquo;World Gestion a transformé ma façon de gérer mon administratif. Un vrai gain de temps au quotidien&nbsp;!&rdquo;
            </p>
            <p className={`mt-1.5 text-[10px] font-semibold ${dark ? "text-gold/70" : "text-[#8a6120]"}`}>
              — Sophie M., Entrepreneur
            </p>
          </div>
        </div>

        {/* ── Right column ── */}
        <div className="flex-1 flex flex-col overflow-hidden min-w-0">

          {/* Header */}
          <div className={`flex items-center justify-between px-5 py-4 border-b flex-shrink-0 ${dark ? "border-border-gold" : "border-[#e8d9b5]"}`}>
            <div>
              {step > 1 && step < 3 && (
                <button
                  onClick={() => setStep((s) => (s - 1) as Step)}
                  className={`flex items-center gap-1 text-xs transition-colors ${dark ? "text-foreground-muted hover:text-foreground" : "text-[#8a6120]/70 hover:text-[#8a6120]"}`}
                >
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                  </svg>
                  Retour
                </button>
              )}
            </div>
            <button
              onClick={onClose}
              className={`flex h-8 w-8 items-center justify-center rounded-full border transition-colors ${dark ? "border-border-gold text-foreground-muted hover:text-foreground" : "border-[#e8d9b5] text-[#8a6120]/70 hover:text-[#8a6120]"}`}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Progress bar */}
          <div className={`px-5 pt-4 pb-3 border-b flex-shrink-0 ${dark ? "border-border-gold/40" : "border-[#e8d9b5]/60"}`}>
            <div className="flex items-start">
              {STEPS.map((label, i) => {
                const s = (i + 1) as Step;
                const active = step === s;
                const done = step > s;
                return (
                  <div key={label} className="flex items-center flex-1 last:flex-none last:flex-shrink-0">
                    <div className="flex flex-col items-center gap-1 flex-shrink-0">
                      <div
                        className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold border-2 transition-all ${
                          done
                            ? "border-gold bg-gold text-white"
                            : active
                              ? dark ? "border-gold text-gold" : "border-[#8a6120] text-[#8a6120]"
                              : dark ? "border-border-gold/40 text-foreground-muted" : "border-[#e8d9b5] text-[#c0a060]"
                        }`}
                      >
                        {done ? (
                          <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : s}
                      </div>
                      <span className={`text-[10px] font-medium whitespace-nowrap ${active || done ? (dark ? "text-gold" : "text-[#8a6120]") : dark ? "text-foreground-muted" : "text-[#c0a060]"}`}>
                        {label}
                      </span>
                    </div>
                    {i < STEPS.length - 1 && (
                      <div className={`flex-1 h-px mx-2 mb-3 transition-all ${done ? "bg-gold" : dark ? "bg-border-gold/30" : "bg-[#e8d9b5]"}`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step content */}
          <div className="flex-1 overflow-y-auto p-5">

            {/* ── STEP 1 : Choix du créneau ── */}
            {step === 1 && (
              <div className="space-y-4">
                <h4 className={`font-semibold ${dark ? "text-foreground" : "text-[#2a1a00]"}`}>
                  Choisissez votre créneau
                </h4>

                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Calendar */}
                  <div className={`flex-1 rounded-[10px] border p-3 ${dark ? "border-border-gold/50 bg-background-tertiary" : "border-[#e8d9b5] bg-[#faf6ed]"}`}>
                    {/* Month navigation */}
                    <div className="flex items-center justify-between mb-3">
                      <button
                        onClick={prevMonth}
                        disabled={!canGoPrev}
                        className={`h-7 w-7 rounded-full flex items-center justify-center transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${dark ? "hover:bg-gold/10 text-foreground-muted" : "hover:bg-[#8a6120]/10 text-[#8a6120]"}`}
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>
                      </button>
                      <span className={`text-sm font-semibold capitalize ${dark ? "text-foreground" : "text-[#2a1a00]"}`}>
                        {MONTH_NAMES[month]} {year}
                      </span>
                      <button
                        onClick={nextMonth}
                        className={`h-7 w-7 rounded-full flex items-center justify-center transition-colors ${dark ? "hover:bg-gold/10 text-foreground-muted" : "hover:bg-[#8a6120]/10 text-[#8a6120]"}`}
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                      </button>
                    </div>

                    {/* Day headers */}
                    <div className="grid grid-cols-7 mb-1">
                      {DAY_NAMES.map((d) => (
                        <div key={d} className={`text-center text-[10px] font-semibold py-1 ${dark ? "text-foreground-muted" : "text-[#8a6120]/60"}`}>
                          {d}
                        </div>
                      ))}
                    </div>

                    {/* Days grid */}
                    <div className="grid grid-cols-7 gap-0.5">
                      {calendarDays.map((day, i) => {
                        if (!day) return <div key={`e-${i}`} />;
                        const disabled = isDayDisabled(day);
                        const selected = isSelected(day);
                        return (
                          <button
                            key={day}
                            disabled={disabled}
                            onClick={() => { update("date", new Date(year, month, day)); update("time", ""); }}
                            className={`h-8 w-full rounded-full text-xs font-medium transition-all ${
                              selected
                                ? "bg-gold text-white font-bold shadow-sm"
                                : disabled
                                  ? dark ? "text-foreground-muted/30 cursor-not-allowed" : "text-[#c0a060]/30 cursor-not-allowed"
                                  : dark ? "text-foreground hover:bg-gold/15 hover:text-gold" : "text-[#2a1a00] hover:bg-[#8a6120]/10 hover:text-[#8a6120]"
                            }`}
                          >
                            {day}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Time slots */}
                  <div className="sm:w-36 flex-shrink-0">
                    <p className={`text-xs font-semibold mb-2 capitalize ${dark ? "text-foreground-secondary" : "text-[#5a3a10]"}`}>
                      {data.date ? formatDate(data.date) : "Sélectionnez une date"}
                    </p>
                    {data.date ? (
                      <div className="grid grid-cols-3 sm:grid-cols-2 gap-2">
                        {TIME_SLOTS.map((t) => (
                          <button
                            key={t}
                            onClick={() => update("time", t)}
                            className={`rounded-lg border py-2 text-xs font-semibold text-center transition-all ${
                              data.time === t
                                ? "border-gold bg-gold text-white shadow-sm"
                                : dark
                                  ? "border-border-gold/50 text-foreground-secondary hover:border-gold hover:text-gold"
                                  : "border-[#e8d9b5] text-[#5a3a10] hover:border-[#8a6120] hover:text-[#8a6120]"
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <p className={`text-xs ${dark ? "text-foreground-muted" : "text-[#c0a060]"}`}>
                        Choisissez d&apos;abord une date pour voir les créneaux disponibles.
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => setStep(2)}
                    disabled={!step1Valid}
                    className="btn-gold text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Continuer →
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP 2 : Informations client ── */}
            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <h4 className={`font-semibold ${dark ? "text-foreground" : "text-[#2a1a00]"}`}>
                    Vos informations
                  </h4>
                  <p className={`text-xs mt-0.5 capitalize ${dark ? "text-foreground-muted" : "text-[#8a6120]/70"}`}>
                    Créneau&nbsp;: {data.date ? formatDate(data.date) : ""} à {data.time}
                  </p>
                  <p className={`text-xs mt-0.5 ${dark ? "text-foreground-muted" : "text-[#8a6120]/70"}`}>
                    Offre&nbsp;: <span className={`font-semibold ${dark ? "text-gold" : "text-[#8a6120]"}`}>{data.offerTitle}</span>
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {([
                    { field: "firstName", label: "Prénom",    type: "text" },
                    { field: "lastName",  label: "Nom",       type: "text" },
                    { field: "email",     label: "Email",     type: "email" },
                    { field: "phone",     label: "Téléphone", type: "tel" },
                  ] as { field: keyof BookingData; label: string; type: string }[]).map(({ field, label, type }) => (
                    <div key={field}>
                      <label className={`block text-xs font-medium mb-1 ${dark ? "text-foreground-secondary" : "text-[#5a3a10]"}`}>
                        {label} <span className="text-gold">*</span>
                      </label>
                      <input
                        type={type}
                        value={data[field] as string}
                        onChange={(e) => update(field, e.target.value)}
                        placeholder={label}
                        className={`w-full rounded-lg border px-3 py-2 text-sm outline-none transition-colors ${
                          dark
                            ? "border-border-gold/50 bg-background text-foreground placeholder-foreground-muted focus:border-gold"
                            : "border-[#e8d9b5] bg-white text-[#2a1a00] placeholder-[#c0a060] focus:border-[#8a6120]"
                        }`}
                      />
                    </div>
                  ))}
                </div>

                {/* Client type */}
                <div>
                  <label className={`block text-xs font-medium mb-2 ${dark ? "text-foreground-secondary" : "text-[#5a3a10]"}`}>
                    Vous êtes <span className="text-gold">*</span>
                  </label>
                  <div className="flex gap-3">
                    {[
                      { value: "entrepreneur", label: "Entrepreneur" },
                      { value: "cabinet",      label: "Cabinet comptable" },
                    ].map(({ value, label }) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => update("clientType", value as "entrepreneur" | "cabinet")}
                        className={`flex-1 rounded-lg border py-2 text-xs font-semibold transition-all ${
                          data.clientType === value
                            ? "border-gold bg-gold/15 text-gold"
                            : dark
                              ? "border-border-gold/50 text-foreground-secondary hover:border-gold/60"
                              : "border-[#e8d9b5] text-[#5a3a10] hover:border-[#8a6120]/50"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Need – optional */}
                <div>
                  <label className={`block text-xs font-medium mb-1 ${dark ? "text-foreground-secondary" : "text-[#5a3a10]"}`}>
                    Besoin principal{" "}
                    <span className={dark ? "text-foreground-muted" : "text-[#c0a060]"}>(optionnel)</span>
                  </label>
                  <textarea
                    rows={3}
                    value={data.need}
                    onChange={(e) => update("need", e.target.value)}
                    placeholder="Décrivez brièvement votre besoin..."
                    className={`w-full rounded-lg border px-3 py-2 text-sm resize-none outline-none transition-colors ${
                      dark
                        ? "border-border-gold/50 bg-background text-foreground placeholder-foreground-muted focus:border-gold"
                        : "border-[#e8d9b5] bg-white text-[#2a1a00] placeholder-[#c0a060] focus:border-[#8a6120]"
                    }`}
                  />
                </div>

                <div className="flex flex-col items-end gap-2 pt-1">
                  {submitError && (
                    <p className="text-xs text-red-400">{submitError}</p>
                  )}
                  <button
                    onClick={async () => {
                      setIsSubmitting(true);
                      setSubmitError(null);
                      try {
                        const res = await fetch("/api/booking", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            firstName: data.firstName,
                            lastName: data.lastName,
                            email: data.email,
                            phone: data.phone,
                            clientType: data.clientType,
                            need: data.need,
                            offerId: offer.id,
                            offerTitle: data.offerTitle,
                            bookingDate: data.date?.toISOString(),
                            bookingTime: data.time,
                          }),
                        });
                        if (!res.ok) throw new Error();
                        setStep(3);
                      } catch {
                        setSubmitError("Une erreur est survenue. Veuillez réessayer.");
                      } finally {
                        setIsSubmitting(false);
                      }
                    }}
                    disabled={!step2Valid || isSubmitting}
                    className="btn-gold text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Envoi en cours..." : "Confirmer →"}
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP 3 : Confirmation ── */}
            {step === 3 && (
              <div className="flex flex-col items-center text-center py-6 gap-5">
                {/* Success icon */}
                <div className={`flex h-16 w-16 items-center justify-center rounded-full ${dark ? "bg-gold/15" : "bg-[#8a6120]/10"}`}>
                  <svg className={`h-8 w-8 ${dark ? "text-gold" : "text-[#8a6120]"}`} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </div>

                <div>
                  <h4 className={`text-xl font-bold ${dark ? "text-foreground" : "text-[#2a1a00]"}`}>
                    Votre appel est bien réservé&nbsp;!
                  </h4>
                  <p className={`mt-2 text-sm ${dark ? "text-foreground-secondary" : "text-[#5a3a10]"}`}>
                    Merci {data.firstName}, votre demande a bien été prise en compte.
                  </p>
                </div>

                {/* Summary card */}
                <div className={`w-full max-w-sm rounded-[10px] border p-4 text-left space-y-2.5 ${dark ? "border-gold/30 bg-gold/5" : "border-[#8a6120]/20 bg-[#8a6120]/5"}`}>
                  {[
                    { label: "Date",    value: data.date ? formatDate(data.date) : "" },
                    { label: "Heure",   value: data.time },
                    { label: "Offre",   value: offer.title },
                    { label: "Email",   value: data.email },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between gap-3 text-xs">
                      <span className={dark ? "text-foreground-muted" : "text-[#8a6120]/70"}>{label}</span>
                      <span className={`font-semibold text-right capitalize ${dark ? "text-foreground" : "text-[#2a1a00]"}`}>{value}</span>
                    </div>
                  ))}
                </div>

                <p className={`text-xs max-w-xs ${dark ? "text-foreground-muted" : "text-[#8a6120]/70"}`}>
                  Vous serez contacté par téléphone ou visio à l&apos;heure choisie.<br />Un email de confirmation vous sera envoyé.
                </p>

                <button onClick={onClose} className="btn-gold text-sm">
                  Fermer
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
