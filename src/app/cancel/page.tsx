import Link from "next/link";

export default function CancelPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-muted/50 to-white px-6">
      <div className="animate-fade-in-up mx-auto max-w-md rounded-2xl border border-border/80 bg-white p-12 text-center shadow-lg shadow-black/[0.04]">
        <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
          <svg className="h-8 w-8 text-red-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Paiement annulé
        </h1>
        <p className="mt-4 text-foreground/50 leading-relaxed">
          Vous pouvez reprendre votre souscription à tout moment. Si vous avez
          des questions, n&apos;hésitez pas à nous contacter.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/#offres"
            className="rounded-2xl bg-primary px-8 py-3.5 font-semibold text-white shadow-md shadow-primary/20 hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98] transition-all duration-200"
          >
            Voir les offres
          </Link>
          <Link
            href="/#contact"
            className="rounded-2xl border border-border px-8 py-3.5 font-semibold text-foreground/70 hover:border-primary/40 hover:text-primary active:scale-[0.98] transition-all duration-200"
          >
            Nous contacter
          </Link>
        </div>
      </div>
    </div>
  );
}
