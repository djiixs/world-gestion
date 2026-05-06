import Link from "next/link";

export const metadata = {
  title: "Mentions légales — World Gestion",
};

export default function MentionsLegalesPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-gold hover:text-gold-light transition-colors mb-8"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Retour à l&apos;accueil
        </Link>

        <h1 className="text-3xl font-bold font-title text-gold mb-8">
          Mentions légales
        </h1>
        <p className="text-sm text-foreground-muted mb-8">
          Dernière mise à jour : 19 avril 2026
        </p>

        <div className="space-y-8 text-sm text-foreground-secondary leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">1. Éditeur du site</h2>
            <ul className="space-y-1">
              <li><strong className="text-foreground">Raison sociale :</strong> World Gestion</li>
              <li><strong className="text-foreground">Forme juridique :</strong> [À compléter — ex. SAS, SARL, auto-entrepreneur]</li>
              <li><strong className="text-foreground">Capital social :</strong> [À compléter]</li>
              <li><strong className="text-foreground">Siège social :</strong> [Adresse à compléter]</li>
              <li><strong className="text-foreground">SIRET :</strong> [À compléter]</li>
              <li><strong className="text-foreground">RCS :</strong> [À compléter]</li>
              <li><strong className="text-foreground">Numéro de TVA intracommunautaire :</strong> [À compléter]</li>
              <li><strong className="text-foreground">Directeur de la publication :</strong> [Nom à compléter]</li>
              <li><strong className="text-foreground">Email :</strong>{" "}
                <a href="mailto:support@worldgestion.fr" className="text-gold hover:text-gold-light">
                  support@worldgestion.fr
                </a>
              </li>
              <li><strong className="text-foreground">Téléphone :</strong>{" "}
                <a href="tel:+33756434016" className="text-gold hover:text-gold-light">07 56 43 40 16</a>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">2. Hébergeur du site</h2>
            <ul className="space-y-1">
              <li><strong className="text-foreground">Raison sociale :</strong> Vercel Inc.</li>
              <li><strong className="text-foreground">Adresse :</strong> 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis</li>
              <li><strong className="text-foreground">Site web :</strong> vercel.com</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">3. Propriété intellectuelle</h2>
            <p>
              L&apos;ensemble du contenu du site worldgestion.com (textes, images, logos, graphismes,
              icônes, mise en page) est la propriété exclusive de World&nbsp;Gestion ou de ses
              partenaires et est protégé par les lois françaises et internationales relatives à la
              propriété intellectuelle.
            </p>
            <p className="mt-2">
              Toute reproduction, représentation, modification, publication, adaptation, totale ou
              partielle, de ces éléments est interdite sans l&apos;autorisation écrite préalable de
              World&nbsp;Gestion.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">4. Données personnelles</h2>
            <p>
              Les données personnelles collectées sur ce site sont traitées conformément au Règlement
              Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés.
              Pour en savoir plus, consultez notre{" "}
              <Link href="/confidentialite" className="text-gold hover:text-gold-light">
                Politique de confidentialité
              </Link>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">5. Cookies</h2>
            <p>
              Le site peut utiliser des cookies techniques nécessaires à son bon fonctionnement.
              Aucun cookie publicitaire ou de traçage n&apos;est utilisé sans le consentement préalable
              de l&apos;utilisateur.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">6. Limitation de responsabilité</h2>
            <p>
              World&nbsp;Gestion s&apos;efforce d&apos;assurer l&apos;exactitude et la mise à jour des informations
              diffusées sur ce site, mais ne saurait garantir l&apos;exactitude, la précision ou
              l&apos;exhaustivité des informations mises à disposition.
            </p>
            <p className="mt-2">
              En conséquence, World&nbsp;Gestion décline toute responsabilité pour tout préjudice
              résultant d&apos;une imprécision ou inexactitude des informations disponibles sur le site,
              ou d&apos;une indisponibilité temporaire du site.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">7. Liens hypertextes</h2>
            <p>
              Le site peut contenir des liens vers des sites tiers. World&nbsp;Gestion n&apos;exerce
              aucun contrôle sur le contenu de ces sites et décline toute responsabilité quant à
              leur contenu.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">8. Droit applicable</h2>
            <p>
              Les présentes mentions légales sont soumises au droit français. En cas de litige, les
              tribunaux français seront seuls compétents.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
