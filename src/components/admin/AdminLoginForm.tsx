"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginForm() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const form = event.currentTarget;
    const code = (form.elements.namedItem("code") as HTMLInputElement).value.trim();

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        throw new Error(payload?.error || "Code invalide");
      }

      router.push("/admin");
      router.refresh();
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Connexion impossible");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate={false}>
      <div>
        <label htmlFor="admin-code" className="block text-sm font-semibold text-foreground mb-2">
          Code administrateur
        </label>
        <input
          id="admin-code"
          name="code"
          type="password"
          required
          autoComplete="current-password"
          className="w-full rounded-lg border border-border bg-background-secondary px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold"
          placeholder="Entrez votre code"
        />
      </div>

      {status === "error" && (
        <p className="rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-lg bg-gold py-3 text-sm font-semibold text-[#0b132b] hover:bg-gold-dark transition-colors disabled:opacity-50"
      >
        {status === "loading" ? "Connexion..." : "Se connecter"}
      </button>
    </form>
  );
}
