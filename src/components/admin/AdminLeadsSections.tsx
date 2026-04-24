"use client";

import { useEffect, useMemo, useState } from "react";
import CopyButton from "@/components/admin/CopyButton";
import { entrepreneurOffers } from "@/data/entrepreneurOffers";
import { cabinetOffers } from "@/data/cabinetOffers";
import { Offer } from "@/types/offers";

type LeadState = "inbox" | "pinned" | "draft" | "deleted";
type LeadType = "entrepreneur" | "cabinet";

type LeadRecord = {
  id: string;
  createdAt: string;
  state: LeadState;
  type: LeadType;
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

interface Props {
  leads: LeadRecord[];
}

function formatDate(value: string) {
  return new Date(value).toLocaleString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminLeadsSections({ leads: initialLeads }: Props) {
  const [activeTab, setActiveTab] = useState<"inbox" | "draft">("inbox");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [hoveredOffer, setHoveredOffer] = useState<{
    offer: Offer;
    top: number;
    left: number;
  } | null>(null);
  const [openMenu, setOpenMenu] = useState<{
    leadId: string;
    leadState: LeadState;
    top: number;
    left: number;
  } | null>(null);
  const [leads, setLeads] = useState<LeadRecord[]>(initialLeads);
  const [isActing, setIsActing] = useState<string | null>(null);

  const offerIndex = useMemo(() => {
    const map = new Map<string, Offer>();
    const allOffers = [...entrepreneurOffers, ...cabinetOffers];
    for (const offer of allOffers) {
      map.set(offer.id, offer);
      map.set(offer.title.toLowerCase(), offer);
    }
    return map;
  }, []);

  const getOfferForLead = (lead: LeadRecord): Offer => {
    const byId = offerIndex.get(lead.offerId);
    if (byId) {
      return byId;
    }

    const byTitle = offerIndex.get(lead.offerTitle.toLowerCase());
    if (byTitle) {
      return byTitle;
    }

    return {
      id: lead.offerId,
      title: lead.offerTitle || lead.offerId,
      description: "Détails de cette offre disponibles sur demande.",
      features: ["Offre personnalisée"],
      priceLabel: "Sur devis",
    };
  };

  useEffect(() => {
    setLeads(initialLeads);
  }, [initialLeads]);

  const grouped = useMemo(
    () => {
      const compareByDate = (a: LeadRecord, b: LeadRecord) => {
        const aTime = new Date(a.createdAt).getTime();
        const bTime = new Date(b.createdAt).getTime();
        return sortOrder === "newest" ? bTime - aTime : aTime - bTime;
      };

      const inboxAndPinned = leads.filter((lead) => lead.state === "inbox" || lead.state === "pinned");
      inboxAndPinned.sort((a, b) => {
        if (a.state === "pinned" && b.state !== "pinned") return -1;
        if (a.state !== "pinned" && b.state === "pinned") return 1;
        return compareByDate(a, b);
      });

      const draft = leads.filter((lead) => lead.state === "draft");
      draft.sort(compareByDate);

      return {
        inbox: inboxAndPinned,
        draft,
      };
    },
    [leads, sortOrder]
  );

  const tabLabels = {
    inbox: `Demandes (${grouped.inbox.length})`,
    draft: `Brouillons (${grouped.draft.length})`,
  };

  const pinnedCount = grouped.inbox.filter((l) => l.state === "pinned").length;
  const summaryByTab = {
    inbox: {
      title: "Demandes",
      count: grouped.inbox.length,
      meta: `Épingles: ${pinnedCount} | Brouillons: ${grouped.draft.length}`,
    },
    draft: {
      title: "Brouillons",
      count: grouped.draft.length,
      meta: `Demandes: ${grouped.inbox.length}`,
    },
  };

  const handleLeadAction = async (leadId: string, action: "pin" | "draft" | "restore" | "delete") => {
    setIsActing(leadId);
    setOpenMenu(null);

    const ACTION_TO_STATE: Record<string, LeadState> = {
      pin: "pinned",
      draft: "draft",
      restore: "inbox",
      delete: "deleted",
    };

    const newState = ACTION_TO_STATE[action];

    try {
      const formData = new FormData();
      formData.append("leadId", leadId);
      formData.append("action", action);

      const response = await fetch("/api/admin/leads/action", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'action");
      }

      const payload = (await response.json()) as {
        success?: boolean;
        lead?: LeadRecord;
      };

      if (!payload.success) {
        throw new Error("Action admin invalide");
      }

      setLeads((prevLeads) =>
        (action === "delete"
          ? prevLeads.filter((lead) => lead.id !== leadId)
          : prevLeads.map((lead) =>
              lead.id === leadId
                ? {
                    ...lead,
                    ...(payload.lead ?? { state: newState }),
                  }
                : lead
            ))
      );
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setIsActing(null);
    }
  };

  const renderLeadName = (lead: LeadRecord) =>
    lead.type === "entrepreneur"
      ? `${lead.firstName ?? ""} ${lead.lastName ?? ""}`.trim() || "-"
      : lead.cabinetName || lead.responsableName || "-";

  useEffect(() => {
    if (!openMenu) {
      return;
    }

    const handleClose = () => setOpenMenu(null);
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenMenu(null);
      }
    };

    window.addEventListener("click", handleClose);
    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("click", handleClose);
      window.removeEventListener("keydown", handleEscape);
    };
  }, [openMenu]);

  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedOffer(null);
        setHoveredOffer(null);
      }
    };

    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, []);

  const renderActionMenu = (leadId: string, leadState: LeadState) => (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation();
        const rect = event.currentTarget.getBoundingClientRect();
        const nextLeft = Math.max(12, Math.min(rect.right - 176, window.innerWidth - 188));
        setOpenMenu({
          leadId,
          leadState,
          top: rect.bottom + 8,
          left: nextLeft,
        });
      }}
      className="text-foreground-secondary hover:text-gold transition-colors"
      aria-label="Ouvrir les actions"
      title="Actions"
    >
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="5" r="1.5" />
        <circle cx="12" cy="12" r="1.5" />
        <circle cx="12" cy="19" r="1.5" />
      </svg>
    </button>
  );

  const activeItems = grouped[activeTab];
  const activeSummary = summaryByTab[activeTab];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setActiveTab("inbox")}
          className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors flex items-center gap-2 ${
            activeTab === "inbox" ? "bg-gold text-[#0b132b]" : "border border-border text-foreground-secondary hover:bg-background-secondary"
          }`}
        >
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 5a2 2 0 012-2h3.28a1 1 0 00.948-.684l1.498-4.493a1 1 0 011.502 0l1.498 4.493a1 1 0 00.948.684H19a2 2 0 012 2v2H3V5zm0 5v8a2 2 0 002 2h14a2 2 0 002-2v-8H3z" />
          </svg>
          {tabLabels.inbox}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("draft")}
          className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors flex items-center gap-2 ${
            activeTab === "draft" ? "bg-gold text-[#0b132b]" : "border border-border text-foreground-secondary hover:bg-background-secondary"
          }`}
        >
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 12h6m-6 4h6m2-8H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V10a2 2 0 00-2-2zm-2-4h4a1 1 0 010 2h-4a1 1 0 010-2z" />
          </svg>
          {tabLabels.draft}
        </button>
        <button
          type="button"
          onClick={() => setSortOrder((prev) => (prev === "newest" ? "oldest" : "newest"))}
          className="ml-auto inline-flex items-center gap-1.5 rounded-md border border-border px-2 py-1 text-xs font-semibold text-foreground-secondary transition-colors hover:border-gold/40 hover:text-gold"
          aria-label="Changer le tri par date"
          title="Changer le tri par date"
        >
          {sortOrder === "newest" ? (
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7 4v16" />
              <path d="M4 17l3 3 3-3" />
              <path d="M13 7h7" />
              <path d="M13 12h5" />
              <path d="M13 17h3" />
            </svg>
          ) : (
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7 4v16" />
              <path d="M4 7l3-3 3 3" />
              <path d="M13 7h3" />
              <path d="M13 12h5" />
              <path d="M13 17h7" />
            </svg>
          )}
          {sortOrder === "newest" ? "Plus récent" : "Plus ancien"}
        </button>
      </div>

      <section className="rounded-2xl border border-border bg-background-tertiary p-4 sm:p-5">
        <div key={activeTab} className="animate-[slideSide_280ms_cubic-bezier(0.22,1,0.36,1)]">
          <p className="text-sm text-foreground-muted">{activeSummary.title}</p>
          <p className="mt-1 text-3xl font-bold text-foreground">{activeSummary.count}</p>
          <p className="mt-2 text-xs text-foreground-muted">{activeSummary.meta}</p>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-background-tertiary p-4 sm:p-5">
        <div key={activeTab} className="animate-[slideSide_280ms_cubic-bezier(0.22,1,0.36,1)] overflow-x-auto">
          <table className="w-full min-w-[920px] text-sm">
          <thead>
            <tr className="border-b border-gold/25">
              <th className="px-2 py-2 text-left font-semibold text-foreground-muted">Date</th>
              <th className="px-2 py-2 text-left font-semibold text-foreground-muted">Type</th>
              <th className="px-2 py-2 text-left font-semibold text-foreground-muted">Nom</th>
              <th className="px-2 py-2 text-left font-semibold text-foreground-muted">Email</th>
              <th className="px-2 py-2 text-left font-semibold text-foreground-muted">Telephone</th>
              <th className="px-2 py-2 text-left font-semibold text-foreground-muted">Offre</th>
              <th className="px-2 py-2 text-left font-semibold text-foreground-muted">Note</th>
              <th className="px-2 py-2 text-left font-semibold text-foreground-muted">Actions</th>
            </tr>
          </thead>
          <tbody>
            {activeItems.map((lead) => (
              <tr key={lead.id} className="border-b border-gold/25 align-top">
                <td className="px-2 py-2 text-foreground-secondary">{formatDate(lead.createdAt)}</td>
                <td className="px-2 py-2 text-foreground-secondary">{lead.type}</td>
                <td className="px-2 py-2 text-foreground">
                  <div className="flex items-center gap-2">
                    {lead.state === "pinned" && (
                      <svg className="h-4 w-4 flex-shrink-0 text-gold animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    )}
                    <span className={lead.state === "pinned" ? "transition-opacity duration-300" : ""}>{renderLeadName(lead)}</span>
                    <CopyButton value={renderLeadName(lead)} />
                  </div>
                </td>
                <td className="px-2 py-2">
                  <div className="flex items-center gap-2">
                    <a href={`mailto:${lead.email}`} className="text-gold hover:underline">{lead.email}</a>
                    <CopyButton value={lead.email} />
                  </div>
                </td>
                <td className="px-2 py-2">
                  <div className="flex items-center gap-2">
                    {lead.phone ? <a href={`tel:${lead.phone}`} className="text-gold hover:underline">{lead.phone}</a> : "-"}
                    {lead.phone ? <CopyButton value={lead.phone} /> : null}
                  </div>
                </td>
                <td className="px-2 py-2 text-foreground-secondary">
                  <button
                    type="button"
                    onMouseEnter={(event) => {
                      const offer = getOfferForLead(lead);
                      const rect = event.currentTarget.getBoundingClientRect();
                      setHoveredOffer({
                        offer,
                        top: rect.bottom + 8,
                        left: Math.max(12, Math.min(rect.left, window.innerWidth - 340)),
                      });
                    }}
                    onMouseMove={(event) => {
                      if (!hoveredOffer) {
                        return;
                      }
                      const rect = event.currentTarget.getBoundingClientRect();
                      setHoveredOffer((prev) =>
                        prev
                          ? {
                              ...prev,
                              top: rect.bottom + 8,
                              left: Math.max(12, Math.min(rect.left, window.innerWidth - 340)),
                            }
                          : prev
                      );
                    }}
                    onMouseLeave={() => setHoveredOffer(null)}
                    onClick={() => {
                      setHoveredOffer(null);
                      setSelectedOffer(getOfferForLead(lead));
                    }}
                    className="text-left text-gold hover:underline"
                  >
                    {lead.offerTitle}
                  </button>
                </td>
                <td className="px-2 py-2 text-foreground-secondary">{lead.note || "-"}</td>
                <td className="px-2 py-2">{renderActionMenu(lead.id, lead.state)}</td>
              </tr>
            ))}
            {activeItems.length === 0 && (
              <tr>
                <td className="px-2 py-4 text-foreground-muted" colSpan={8}>
                  Aucune demande dans cette section.
                </td>
              </tr>
            )}
          </tbody>
          </table>
        </div>
      </section>

      {openMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setOpenMenu(null)}
        >
          <div
            className="absolute z-50 w-44 rounded-lg border border-border bg-background-tertiary p-2 shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
            style={{ top: openMenu.top, left: openMenu.left }}
            onClick={(event) => event.stopPropagation()}
          >
            {(openMenu.leadState === "inbox") && (
              <button
                type="button"
                onClick={() => handleLeadAction(openMenu.leadId, "pin")}
                disabled={isActing === openMenu.leadId}
                className="w-full rounded-md px-2 py-1.5 text-left text-xs hover:bg-background-secondary disabled:opacity-50 mb-1 transition-opacity flex items-center gap-2"
              >
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                Épingler
              </button>
            )}
            {openMenu.leadState === "pinned" && (
              <button
                type="button"
                onClick={() => handleLeadAction(openMenu.leadId, "restore")}
                disabled={isActing === openMenu.leadId}
                className="w-full rounded-md px-2 py-1.5 text-left text-xs hover:bg-background-secondary disabled:opacity-50 mb-1 transition-opacity flex items-center gap-2"
              >
                <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                Enlever l épingle
              </button>
            )}
            {(openMenu.leadState === "inbox" || openMenu.leadState === "pinned") && (
              <button
                type="button"
                onClick={() => handleLeadAction(openMenu.leadId, "draft")}
                disabled={isActing === openMenu.leadId}
                className="w-full rounded-md px-2 py-1.5 text-left text-xs hover:bg-background-secondary disabled:opacity-50 mb-1 transition-opacity flex items-center gap-2"
              >
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
                </svg>
                Mettre en brouillon
              </button>
            )}
            {openMenu.leadState === "draft" && (
              <button
                type="button"
                onClick={() => handleLeadAction(openMenu.leadId, "restore")}
                disabled={isActing === openMenu.leadId}
                className="w-full rounded-md px-2 py-1.5 text-left text-xs hover:bg-background-secondary disabled:opacity-50 mb-1 transition-opacity flex items-center gap-2"
              >
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
                Enlever du brouillon
              </button>
            )}
            {openMenu.leadState === "draft" && (
              <button
                type="button"
                onClick={() => handleLeadAction(openMenu.leadId, "delete")}
                disabled={isActing === openMenu.leadId}
                className="w-full rounded-md px-2 py-1.5 text-left text-xs text-red-300 hover:bg-red-500/10 disabled:opacity-50 transition-opacity flex items-center gap-2"
              >
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-9l-1 1H5v2h14V4z" />
                </svg>
                Supprimer
              </button>
            )}
          </div>
        </div>
      )}

      {hoveredOffer && (
        <div
          className="pointer-events-none fixed z-30 w-[320px] rounded-xl border border-gold/35 bg-background-tertiary/98 p-3 shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
          style={{ top: hoveredOffer.top, left: hoveredOffer.left }}
        >
          <p className="text-sm font-semibold text-gold">{hoveredOffer.offer.title}</p>
          <p className="mt-1 text-xs text-foreground-secondary">{hoveredOffer.offer.description}</p>
          <p className="mt-2 text-xs text-foreground-muted">
            {hoveredOffer.offer.priceLabel
              ? `${hoveredOffer.offer.priceLabel}${hoveredOffer.offer.priceUnit ?? ""}`
              : "Sur devis"}
          </p>
          <ul className="mt-2 space-y-1 text-xs text-foreground-secondary">
            {hoveredOffer.offer.features.slice(0, 3).map((feature) => (
              <li key={feature}>• {feature}</li>
            ))}
          </ul>
          <p className="mt-2 text-[11px] text-foreground-muted">Cliquez pour voir le détail complet.</p>
        </div>
      )}

      {selectedOffer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4" onClick={() => setSelectedOffer(null)}>
          <div
            className="w-full max-w-lg rounded-2xl border border-gold/40 bg-background-tertiary p-5 shadow-[0_25px_60px_rgba(0,0,0,0.35)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gold/85">Détail de l'offre</p>
                <h3 className="mt-1 text-xl font-bold text-foreground">{selectedOffer.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedOffer(null)}
                className="rounded-md border border-border px-2 py-1 text-xs text-foreground-secondary hover:text-gold"
              >
                Fermer
              </button>
            </div>

            <p className="mt-3 text-sm text-foreground-secondary">{selectedOffer.description}</p>

            <div className="mt-3 inline-flex items-center rounded-md border border-gold/30 px-2 py-1 text-xs text-gold">
              {selectedOffer.priceLabel ? `${selectedOffer.priceLabel}${selectedOffer.priceUnit ?? ""}` : "Sur devis"}
            </div>

            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-foreground-muted">Ce que l'offre inclut</p>
              <ul className="mt-2 space-y-1.5 text-sm text-foreground-secondary">
                {selectedOffer.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
