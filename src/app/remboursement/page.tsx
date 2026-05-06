import Link from "next/link";

export const metadata = {
  title: "Politique de remboursement — World Gestion",
};

export default function RemboursementPage() {
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
          Politique de remboursement
        </h1>
        <p className="text-sm text-foreground-muted mb-8">
          Dernière mise à jour : 19 avril 2026
        </p>

        <div className="space-y-8 text-sm text-foreground-secondary leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">1. Principe général</h2>
            <p>
              Chez World&nbsp;Gestion, la satisfaction de nos clients est notre priorité. La présente
              politique de remboursement décrit les conditions dans lesquelles un remboursement peut
              être accordé pour nos services de gestion administrative et comptable.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">2. Droit de rétractation (14 jours)</h2>
            <p>
              Conformément au Code de la consommation (articles L.221-18 et suivants), tout Client
              consommateur bénéficie d&apos;un délai de rétractation de <strong className="text-foreground">quatorze (14) jours
              calendaires</strong> à compter de la date de souscription à un abonnement.
            </p>
            <p className="mt-2">
              Durant ce délai, le Client peut demander l&apos;annulation de son abonnement et obtenir
              un remboursement intégral des sommes versées, sans avoir à justifier de motifs.
            </p>
            <p className="mt-2">
              Si des prestations ont été effectuées pendant cette période à la demande expresse du
              Client, le montant correspondant aux services déjà rendus pourra être déduit du
              remboursement.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">3. Remboursement des abonnements mensuels</h2>
            <p>Au-delà du délai de rétractation :</p>
            <ul className="list-disc list-inside mt-2 space-y-2">
              <li>
                <strong className="text-foreground">Résiliation en cours de mois :</strong> aucun
                remboursement au prorata n&apos;est effectué. Le service reste actif jusqu&apos;à la fin de
                la période de facturation en cours.
              </li>
              <li>
                <strong className="text-foreground">Erreur de facturation :</strong> en cas de
                prélèvement en double ou de montant erroné, un remboursement intégral de la
                différence est effectué sous 7 jours ouvrés.
              </li>
              <li>
                <strong className="text-foreground">Service non fourni :</strong> si le Prestataire
                n&apos;a pas été en mesure de fournir le service souscrit, un remboursement total ou
                partiel est accordé au prorata des prestations non réalisées.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">4. Prestations ponctuelles (tarif horaire)</h2>
            <p>
              Les prestations ponctuelles facturées au tarif horaire ne sont pas remboursables une
              fois la prestation réalisée. En cas d&apos;annulation avant le début de la prestation, un
              remboursement intégral est accordé.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">5. Procédure de demande de remboursement</h2>
            <p>Pour demander un remboursement, le Client doit :</p>
            <ol className="list-decimal list-inside mt-2 space-y-2">
              <li>
                Envoyer un email à{" "}
                <a href="mailto:contact@worldgestion.fr" className="text-gold hover:text-gold-light">
                  contact@worldgestion.fr
                </a>{" "}
                en précisant son nom, la formule concernée et le motif de la demande.
              </li>
              <li>
                Le Prestataire accuse réception de la demande sous 48 heures ouvrées.
              </li>
              <li>
                Après vérification, le remboursement est traité sous 7 à 14 jours ouvrés par le
                même moyen de paiement que celui utilisé lors de la souscription.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">6. Délais de remboursement</h2>
            <p>
              Les remboursements sont effectués dans un délai maximum de <strong className="text-foreground">14 jours
              ouvrés</strong> à compter de l&apos;acceptation de la demande. Le remboursement est crédité sur
              le moyen de paiement initial (carte bancaire, prélèvement SEPA).
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">7. Cas exclus du remboursement</h2>
            <p>Aucun remboursement ne sera accordé dans les cas suivants :</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Résiliation après la période de rétractation pour convenance personnelle</li>
              <li>Non-transmission des documents nécessaires par le Client empêchant la réalisation du service</li>
              <li>Informations erronées fournies par le Client</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">8. Contact</h2>
            <p>Pour toute question relative à un remboursement :</p>
            <ul className="mt-2 space-y-1">
              <li>Email : <a href="mailto:contact@worldgestion.fr" className="text-gold hover:text-gold-light">contact@worldgestion.fr</a></li>
              <li>Téléphone : <a href="tel:+33756434016" className="text-gold hover:text-gold-light">07 56 43 40 16</a></li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
