import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import AdminLoginForm from "@/components/admin/AdminLoginForm";
import { ADMIN_COOKIE_NAME, isAdminSessionTokenValid } from "@/lib/admin-auth";

export default async function AdminLoginPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

  if (isAdminSessionTokenValid(token)) {
    redirect("/admin");
  }

  return (
    <main className="relative min-h-screen bg-background px-6 py-12 sm:py-16 flex items-center justify-center">
      <Link
        href="/"
        className="absolute left-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-md border border-gold/40 text-foreground-secondary transition-colors hover:border-gold hover:text-gold sm:left-6 sm:top-6"
        aria-label="Retour vers le site"
        title="Retour"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
      <div className="w-full max-w-md px-3 sm:px-5">
        <h1 className="mb-10 text-center font-title text-2xl text-gold sm:text-[2rem]">Espace admin</h1>
        <div className="mx-auto w-full max-w-sm">
          <AdminLoginForm />
        </div>
      </div>
    </main>
  );
}
