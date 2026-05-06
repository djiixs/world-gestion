"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogoutButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");

  const handleLogout = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/logout", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      router.push("/");
      router.refresh();
    } catch {
      setError("Erreur lors de la deconnexion. Reessaie.");
    } finally {
      setIsLoading(false);
      setShowConfirm(false);
    }
  };

  return (
    <>
      <div className="flex flex-col items-end gap-2">
        <button
          type="button"
          onClick={() => setShowConfirm(true)}
          disabled={isLoading}
          className="rounded-lg border border-border-gold px-4 py-2 text-sm font-semibold text-foreground hover:bg-background-secondary transition-colors disabled:opacity-70"
        >
          {isLoading ? "Deconnexion..." : "Se deconnecter"}
        </button>
        {error ? <p className="text-xs text-red-400">{error}</p> : null}
      </div>

      {showConfirm && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowConfirm(false)} />
          <div className="relative w-full max-w-sm rounded-xl border border-border-gold bg-background-tertiary p-5 shadow-[0_12px_40px_rgba(0,0,0,0.45)]">
            <h3 className="font-title text-lg text-gold">Confirmer la deconnexion</h3>
            <p className="mt-2 text-sm text-foreground-secondary">
              Voulez-vous vraiment vous deconnecter de l'espace admin ?
            </p>

            <div className="mt-5 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                className="rounded-lg border border-border px-3 py-2 text-sm font-medium text-foreground-secondary hover:bg-background-secondary transition-colors"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleLogout}
                disabled={isLoading}
                className="rounded-lg bg-gold px-3 py-2 text-sm font-semibold text-[#0b132b] hover:bg-gold-dark transition-colors disabled:opacity-70"
              >
                {isLoading ? "Deconnexion..." : "Oui, deconnecter"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
