import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";
import { ADMIN_COOKIE_NAME, isAdminSessionTokenValid } from "@/lib/admin-auth";
import { getAdminDashboardData } from "@/lib/admin-store";
import AdminLogoutButton from "@/components/admin/AdminLogoutButton";
import AdminLeadsSections from "@/components/admin/AdminLeadsSections";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

  if (!isAdminSessionTokenValid(token)) {
    redirect("/admin/login");
  }

  const { leads, stats, bookings } = await getAdminDashboardData();
  return (
    <main className="min-h-screen bg-background px-4 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <section className="overflow-hidden rounded-[30px] border border-gold/15 bg-[linear-gradient(135deg,#0b132b,#102144)] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.22)] sm:p-7">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div className="space-y-4">
                <Image src="/logo.png" alt="World Gestion" width={118} height={38} className="object-contain" priority />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold/80">Admin dashboard</p>
                  <h1 className="mt-2 font-title text-3xl text-white sm:text-[2.4rem]">Pilotage des demandes World Gestion</h1>
                  <p className="mt-3 max-w-2xl text-sm text-foreground-secondary sm:text-base">Suivez les demandes entrantes, priorisez les leads chauds et gardez une lecture claire de l'activite commerciale en cours.</p>
                </div>
              </div>

              <div className="flex justify-start lg:justify-end">
                <AdminLogoutButton />
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-4">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-foreground-muted">Leads actifs</p>
                <p className="mt-3 text-3xl font-bold text-white">{stats.totalLeads}</p>
                <p className="mt-2 text-xs text-foreground-secondary">Toutes les demandes visibles hors suppression</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-foreground-muted">Épinglés</p>
                <p className="mt-3 text-3xl font-bold text-gold">{stats.totalPinnedLeads}</p>
                <p className="mt-2 text-xs text-foreground-secondary">Demandes à traiter en priorité</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-foreground-muted">Brouillons</p>
                <p className="mt-3 text-3xl font-bold text-white">{stats.totalDraftLeads}</p>
                <p className="mt-2 text-xs text-foreground-secondary">Demandes sorties du flux principal</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 md:col-span-3 xl:col-span-1">
                <p className="text-xs uppercase tracking-[0.22em] text-foreground-muted">Réservations d&apos;appel</p>
                <p className="mt-3 text-3xl font-bold text-gold">{stats.totalBookings}</p>
                <p className="mt-2 text-xs text-foreground-secondary">Créneaux d&apos;appel réservés au total</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 md:col-span-3 xl:col-span-1">
                <p className="text-xs uppercase tracking-[0.22em] text-foreground-muted">Conversions</p>
                <p className="mt-3 text-3xl font-bold text-white">{stats.succeededPurchases}/{stats.totalPurchases}</p>
                <p className="mt-2 text-xs text-foreground-secondary">Paiements confirms sur la plateforme</p>
              </div>
            </div>
          </div>
        </section>

        <AdminLeadsSections leads={leads} bookings={bookings} />

        <div className="flex items-center justify-center gap-4 pt-1 text-foreground-muted">
          <a href="https://www.facebook.com/share/1AtxpsRjpU/?mibextid=wwXIfr" target="_blank" rel="noopener" aria-label="Facebook" className="hover:text-gold transition-colors duration-200">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg>
          </a>
          <a href="https://www.linkedin.com/company/world-gestion/" target="_blank" rel="noopener" aria-label="LinkedIn" className="hover:text-gold transition-colors duration-200">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.968v5.699h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.838-1.563 3.036 0 3.6 2.001 3.6 4.601v5.595z"/></svg>
          </a>
          <a href="https://www.instagram.com/world.gestion?igsh=MWZwbTFzczZ3Nm85dQ%3D%3D&utm_source=qr" target="_blank" rel="noopener" aria-label="Instagram" className="hover:text-gold transition-colors duration-200">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.242 1.308 3.608.058 1.266.069 1.646.069 4.85s-.011 3.584-.069 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.242 1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.011-4.85-.069c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.242-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.242-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.775.131 4.602.425 3.635 1.392 2.668 2.359 2.374 3.532 2.315 4.809 2.256 6.089 2.243 6.498 2.243 12c0 5.502.013 5.911.072 7.191.059 1.277.353 2.45 1.32 3.417.967.967 2.14 1.261 3.417 1.32C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.277-.059 2.45-.353 3.417-1.32.967-.967 1.261-2.14 1.32-3.417.059-1.28.072-1.689.072-7.191 0-5.502-.013-5.911-.072-7.191-.059-1.277-.353-2.45-1.32-3.417C19.398.425 18.225.131 16.948.072 15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
          </a>
        </div>
      </div>
    </main>
  );
}
