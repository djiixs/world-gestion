export default function Footer() {
  return (
    <footer className="border-t border-border/60 bg-muted/60 py-8">
      <div className="mx-auto max-w-6xl px-6 text-center">
        {/* Contact links */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-foreground/50">
          <a href="tel:+33756434016" className="hover:text-primary transition-colors duration-200">
            07 56 43 40 16
          </a>
          <span className="hidden sm:inline text-foreground/20">|</span>
          <a href="mailto:contact@worldgestion.fr" className="hover:text-primary transition-colors duration-200">
            contact@worldgestion.fr
          </a>
          <span className="hidden sm:inline text-foreground/20">|</span>
          <a href="https://wa.me/33756434016" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors duration-200">
            WhatsApp
          </a>
        </div>

        <p className="mt-5 text-sm text-foreground/30">
          © {new Date().getFullYear()} World&nbsp;Gestion — Tous droits
          réservés.
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-foreground/35">
          <a href="#" className="hover:text-foreground/60 transition-colors duration-200">
            Mentions légales
          </a>
          <a href="#" className="hover:text-foreground/60 transition-colors duration-200">
            Politique de confidentialité
          </a>
          <a href="#" className="hover:text-foreground/60 transition-colors duration-200">
            CGV
          </a>
        </div>
      </div>
    </footer>
  );
}
