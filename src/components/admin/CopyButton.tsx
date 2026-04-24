"use client";

import { useState } from "react";

interface Props {
  value: string;
}

export default function CopyButton({ value }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!value) {
      return;
    }

    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Copie" : "Copier"}
      title={copied ? "Copie" : "Copier"}
      className="text-foreground-secondary hover:text-gold transition-colors"
    >
      {copied ? (
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
        </svg>
      ) : (
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125H6.375a1.125 1.125 0 0 1-1.125-1.125V8.625c0-.621.504-1.125 1.125-1.125H9.75" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 15.75V3.375c0-.621.504-1.125 1.125-1.125h8.25c.621 0 1.125.504 1.125 1.125v12.375c0 .621-.504 1.125-1.125 1.125h-8.25A1.125 1.125 0 0 1 9.75 15.75Z" />
        </svg>
      )}
    </button>
  );
}
