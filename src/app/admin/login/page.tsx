import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminLoginForm from "@/components/admin/AdminLoginForm";
import { ADMIN_COOKIE_NAME, isAdminSessionTokenValid } from "@/lib/admin-auth";

export default async function AdminLoginPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

  if (isAdminSessionTokenValid(token)) {
    redirect("/admin");
  }

  return (
    <main className="min-h-screen bg-background px-6 py-14">
      <div className="mx-auto w-full max-w-md rounded-2xl border border-border-gold bg-background-tertiary p-6 sm:p-8">
        <h1 className="font-title text-2xl text-gold mb-2">Espace admin</h1>
        <p className="text-sm text-foreground-secondary mb-6">
          Accès protégé pour consulter les demandes clients et les achats.
        </p>
        <AdminLoginForm />
      </div>
    </main>
  );
}
