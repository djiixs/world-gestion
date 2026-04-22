export default function Hero() {
  return (
    <section className="relative pt-24 pb-12 md:pt-32 md:pb-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.06] via-white to-white" />
      {/* Decorative circles */}
      <div className="absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full bg-primary/[0.04] blur-3xl" />
      <div className="absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full bg-accent/[0.04] blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        {/* Badge */}
        <span className="animate-fade-in-up inline-flex items-center rounded-full border border-primary/20 bg-primary/[0.06] px-5 py-2 text-sm font-medium text-primary mb-5">
          Externalisation administrative &amp; pré-comptabilité
        </span>

        {/* Brand name prominent */}
        <h1 className="animate-fade-in-up text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1]" style={{ animationDelay: "0.1s" }}>
          <span className="text-primary">World&nbsp;Gestion</span>
        </h1>

        <p className="animate-fade-in-up mt-5 text-lg md:text-xl text-foreground/50 max-w-2xl mx-auto leading-relaxed" style={{ animationDelay: "0.2s" }}>
          Nous accompagnons les <strong className="text-foreground/70 font-semibold">entrepreneurs</strong> et les{" "}
          <strong className="text-foreground/70 font-semibold">cabinets comptables</strong> avec
          rigueur, discrétion et efficacité.
        </p>

        <div className="animate-fade-in-up mt-8 flex flex-col sm:flex-row items-center justify-center gap-3" style={{ animationDelay: "0.3s" }}>
          <a
            href="#contact"
            className="group rounded-2xl bg-primary px-7 py-3 text-white font-semibold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:bg-primary-dark active:scale-[0.98] transition-all duration-200 text-sm"
          >
            Nous contacter
          </a>
          <a
            href="tel:+33756434016"
            className="rounded-2xl border border-border px-7 py-3 text-foreground/70 font-semibold hover:border-primary/40 hover:text-primary active:scale-[0.98] transition-all duration-200 text-sm"
          >
            Appeler maintenant
          </a>
          <a
            href="https://wa.me/33756434016"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl border border-border px-7 py-3 text-foreground/70 font-semibold hover:border-accent/40 hover:text-accent active:scale-[0.98] transition-all duration-200 text-sm"
          >
            WhatsApp
          </a>
        </div>

        {/* Trust indicators */}
        <div className="animate-fade-in-up mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-foreground/40" style={{ animationDelay: "0.4s" }}>
          <span className="flex items-center gap-1.5">
            <svg className="h-4 w-4 text-accent" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
            Réponse sous 24h
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="h-4 w-4 text-accent" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
            Sans engagement
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="h-4 w-4 text-accent" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
            Expert dédié
          </span>
        </div>
      </div>
    </section>
  );
}
