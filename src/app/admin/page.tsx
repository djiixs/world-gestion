import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE_NAME, isAdminSessionTokenValid } from "@/lib/admin-auth";
import { getAdminDashboardData } from "@/lib/admin-store";

function formatDate(value: string) {
  return new Date(value).toLocaleString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function AdminPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

  if (!isAdminSessionTokenValid(token)) {
    redirect("/admin/login");
  }

  const { leads, purchases, stats } = await getAdminDashboardData();

  return (
    <main className="min-h-screen bg-background px-4 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <header className="rounded-2xl border border-border-gold bg-background-tertiary p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="font-title text-2xl text-gold">Tableau admin</h1>
              <p className="text-sm text-foreground-secondary">Demandes et achats reçus via le site.</p>
            </div>
            <form action="/api/admin/logout" method="post">
              <button
                type="submit"
                className="rounded-lg border border-border-gold px-4 py-2 text-sm font-semibold text-foreground hover:bg-background-secondary transition-colors"
              >
                Se déconnecter
              </button>
            </form>
          </div>
        </header>

        <section className="grid gap-4 sm:grid-cols-3">
          <article className="rounded-xl border border-border bg-background-tertiary p-4">
            <p className="text-sm text-foreground-muted">Demandes</p>
            <p className="mt-1 text-2xl font-bold text-foreground">{stats.totalLeads}</p>
          </article>
          <article className="rounded-xl border border-border bg-background-tertiary p-4">
            <p className="text-sm text-foreground-muted">Achats enregistrés</p>
            <p className="mt-1 text-2xl font-bold text-foreground">{stats.totalPurchases}</p>
          </article>
          <article className="rounded-xl border border-border bg-background-tertiary p-4">
            <p className="text-sm text-foreground-muted">Achats validés</p>
            <p className="mt-1 text-2xl font-bold text-gold">{stats.succeededPurchases}</p>
          </article>
        </section>

        <section className="rounded-2xl border border-border bg-background-tertiary p-4 sm:p-5">
          <h2 className="font-title text-xl text-gold mb-4">Demandes</h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-2 py-2 text-left font-semibold text-foreground-muted">Date</th>
                  <th className="px-2 py-2 text-left font-semibold text-foreground-muted">Type</th>
                  <th className="px-2 py-2 text-left font-semibold text-foreground-muted">Nom</th>
                  <th className="px-2 py-2 text-left font-semibold text-foreground-muted">Email</th>
                  <th className="px-2 py-2 text-left font-semibold text-foreground-muted">Téléphone</th>
                  <th className="px-2 py-2 text-left font-semibold text-foreground-muted">Offre</th>
                  <th className="px-2 py-2 text-left font-semibold text-foreground-muted">Note</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id} className="border-b border-border/60 align-top">
                    <td className="px-2 py-2 text-foreground-secondary">{formatDate(lead.createdAt)}</td>
                    <td className="px-2 py-2 text-foreground-secondary">{lead.type}</td>
                    <td className="px-2 py-2 text-foreground">
                      {lead.type === "entrepreneur"
                        ? `${lead.firstName ?? ""} ${lead.lastName ?? ""}`.trim()
                        : lead.cabinetName || lead.responsableName || "-"}
                    </td>
                    <td className="px-2 py-2 text-foreground">{lead.email}</td>
                    <td className="px-2 py-2 text-foreground-secondary">{lead.phone}</td>
                    <td className="px-2 py-2 text-foreground-secondary">{lead.offerTitle}</td>
                    <td className="px-2 py-2 text-foreground-secondary">{lead.note || "-"}</td>
                  </tr>
                ))}
                {leads.length === 0 && (
                  <tr>
                    <td className="px-2 py-4 text-foreground-muted" colSpan={7}>
                      Aucune demande enregistrée.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-background-tertiary p-4 sm:p-5">
          <h2 className="font-title text-xl text-gold mb-4">Achats</h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-2 py-2 text-left font-semibold text-foreground-muted">Date</th>
                  <th className="px-2 py-2 text-left font-semibold text-foreground-muted">Offre</th>
                  <th className="px-2 py-2 text-left font-semibold text-foreground-muted">Montant</th>
                  <th className="px-2 py-2 text-left font-semibold text-foreground-muted">Email</th>
                  <th className="px-2 py-2 text-left font-semibold text-foreground-muted">Statut</th>
                  <th className="px-2 py-2 text-left font-semibold text-foreground-muted">Stripe PI</th>
                </tr>
              </thead>
              <tbody>
                {purchases.map((purchase) => (
                  <tr key={purchase.id} className="border-b border-border/60 align-top">
                    <td className="px-2 py-2 text-foreground-secondary">{formatDate(purchase.createdAt)}</td>
                    <td className="px-2 py-2 text-foreground-secondary">{purchase.offerId}</td>
                    <td className="px-2 py-2 text-foreground">
                      {(purchase.amount / 100).toFixed(2)} {purchase.currency.toUpperCase()}
                    </td>
                    <td className="px-2 py-2 text-foreground-secondary">{purchase.email || "-"}</td>
                    <td className="px-2 py-2">
                      <span className="rounded-full border border-border px-2 py-1 text-xs text-foreground-secondary">
                        {purchase.status}
                      </span>
                    </td>
                    <td className="px-2 py-2 text-foreground-muted">{purchase.stripePaymentIntentId || "-"}</td>
                  </tr>
                ))}
                {purchases.length === 0 && (
                  <tr>
                    <td className="px-2 py-4 text-foreground-muted" colSpan={6}>
                      Aucun achat enregistré.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
