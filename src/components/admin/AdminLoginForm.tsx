"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginForm() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [showCode, setShowCode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code.trim() }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          const retryAfter = response.headers.get("Retry-After");
          setError(
            retryAfter
              ? `Trop de tentatives. Réessaie dans ${retryAfter}s.`
              : "Trop de tentatives. Réessaie dans quelques minutes."
          );
          return;
        }

        let serverError = "";
        try {
          const payload = (await response.json()) as { error?: string };
          serverError = payload.error ?? "";
        } catch {
          serverError = "";
        }

        setError(serverError || "Code admin invalide.");
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Erreur réseau. Réessaie.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="admin-code" className="mb-2 block text-sm text-foreground-secondary">
          Code admin
        </label>
        <div className="relative">
          <input
            id="admin-code"
            type={showCode ? "text" : "password"}
            value={code}
            onChange={(event) => setCode(event.target.value)}
            className="w-full rounded-lg border border-border bg-background px-3 py-2.5 pr-10 text-sm text-foreground outline-none focus:border-gold"
            placeholder="Entrer le code"
            required
          />
          <button
            type="button"
            onClick={() => setShowCode((prev) => !prev)}
            className="absolute inset-y-0 right-0 inline-flex items-center justify-center px-3 text-foreground-muted transition-colors hover:text-gold"
            aria-label={showCode ? "Masquer le code admin" : "Afficher le code admin"}
            title={showCode ? "Masquer" : "Afficher"}
          >
            {showCode ? (
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.58 10.58A2 2 0 0012 14a2 2 0 001.42-.58" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.88 4.24A10.94 10.94 0 0112 4c5 0 9.27 3.11 11 8-1 2.83-3.14 5.1-5.88 6.24M6.23 6.23C3.61 7.83 1.56 10.19 1 12c1.73 4.89 6 8 11 8 1.73 0 3.37-.37 4.84-1.03" />
              </svg>
            ) : (
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.46 12C3.73 7.94 7.52 5 12 5s8.27 2.94 9.54 7c-1.27 4.06-5.06 7-9.54 7S3.73 16.06 2.46 12z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {error ? <p className="text-sm text-red-400">{error}</p> : null}

      <button type="submit" disabled={isLoading} className="btn-gold w-full text-sm disabled:opacity-70">
        {isLoading ? "Connexion..." : "Se connecter"}
      </button>
    </form>
  );
}
