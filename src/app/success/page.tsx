import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-muted/50 to-white px-6">
      <div className="animate-fade-in-up mx-auto max-w-md rounded-2xl border border-accent/20 bg-white p-12 text-center shadow-lg shadow-accent/[0.06]">
        <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-accent/[0.08]">
          <svg className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Paiement confirmé
        </h1>
        <p className="mt-4 text-lg font-medium text-foreground/70">
          Merci pour votre confiance.
        </p>
        <p className="mt-2 text-foreground/50 leading-relaxed">
          Votre inscription a bien été prise en compte. Nous reviendrons vers
          vous rapidement pour mettre en place votre accompagnement.
        </p>
        <Link
          href="/"
          className="mt-10 inline-block rounded-2xl bg-primary px-8 py-3.5 font-semibold text-white shadow-md shadow-primary/20 hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98] transition-all duration-200"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}
