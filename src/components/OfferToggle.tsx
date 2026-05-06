"use client";

import { useRef, useEffect, useState } from "react";

interface Props {
  isEntrepreneur: boolean;
  onChange: (isEntrepreneur: boolean) => void;
}

export default function OfferToggle({ isEntrepreneur, onChange }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [pillStyle, setPillStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    const idx = isEntrepreneur ? 0 : 1;
    const btn = btnRefs.current[idx];
    const container = containerRef.current;
    if (btn && container) {
      const cRect = container.getBoundingClientRect();
      const bRect = btn.getBoundingClientRect();
      setPillStyle({
        width: bRect.width,
        transform: `translateX(${bRect.left - cRect.left}px)`,
      });
    }
  }, [isEntrepreneur]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      onChange(!isEntrepreneur);
      const next = isEntrepreneur ? 1 : 0;
      btnRefs.current[next]?.focus();
    }
  };

  return (
    <div className="flex items-center justify-center px-4">
      <div
        ref={containerRef}
        role="tablist"
        aria-label="Type de profil"
        className="relative inline-flex rounded-[10px] bg-background-tertiary border border-border-gold p-1"
        onKeyDown={handleKeyDown}
      >
        {/* Animated pill */}
        <span
          aria-hidden="true"
          className="absolute top-1 left-0 h-[calc(100%-8px)] rounded-md bg-gold shadow-md shadow-gold/20 transition-all duration-300 ease-out"
          style={pillStyle}
        />

        <button
          ref={(el) => { btnRefs.current[0] = el; }}
          role="tab"
          aria-selected={isEntrepreneur}
          tabIndex={isEntrepreneur ? 0 : -1}
          onClick={() => onChange(true)}
          className={`relative z-10 rounded-md px-5 sm:px-6 py-2 text-xs sm:text-sm font-semibold transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background-tertiary ${
            isEntrepreneur
              ? "text-white"
              : "text-foreground-muted hover:text-foreground-secondary"
          }`}
        >
          Entrepreneurs
        </button>
        <button
          ref={(el) => { btnRefs.current[1] = el; }}
          role="tab"
          aria-selected={!isEntrepreneur}
          tabIndex={!isEntrepreneur ? 0 : -1}
          onClick={() => onChange(false)}
          className={`relative z-10 rounded-md px-5 sm:px-6 py-2 text-xs sm:text-sm font-semibold transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background-tertiary ${
            !isEntrepreneur
              ? "text-white"
              : "text-foreground-muted hover:text-foreground-secondary"
          }`}
        >
          Cabinets comptables
        </button>
      </div>
    </div>
  );
}
