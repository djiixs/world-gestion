import Link from "next/link";

export const metadata = {
  title: "Conditions Générales de Vente — World Gestion",
};

export default function CGVPage() {
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
          Conditions Générales de Vente (CGV)
        </h1>
        <p className="text-sm text-foreground-muted mb-8">
          Dernière mise à jour : 19 avril 2026
        </p>

        <div className="space-y-8 text-sm text-foreground-secondary leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">Article 1 — Objet</h2>
            <p>
              Les présentes Conditions Générales de Vente (ci-après « CGV ») régissent les relations
              contractuelles entre la société World&nbsp;Gestion (ci-après « le Prestataire ») et toute
              personne physique ou morale (ci-après « le Client ») souscrivant à ses services de
              gestion administrative, comptable et de conseil aux entreprises.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">Article 2 — Services proposés</h2>
            <p>Le Prestataire propose les services suivants :</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Gestion comptable et administrative courante</li>
              <li>Déclarations fiscales et sociales (TVA, URSSAF, impôts…)</li>
              <li>Facturation et suivi des paiements clients</li>
              <li>Gestion de la paie et des déclarations sociales</li>
              <li>Conseil en gestion et optimisation financière</li>
              <li>Accompagnement à la création et au développement d&apos;entreprise</li>
            </ul>
            <p className="mt-2">
              Le détail des prestations incluses dans chaque formule (Essentielle, Confort, Premium)
              est décrit sur le site internet du Prestataire.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">Article 3 — Tarifs et modalités de paiement</h2>
            <p>
              Les tarifs sont indiqués en euros TTC sur le site internet. Le Prestataire se réserve
              le droit de modifier ses tarifs à tout moment ; les services en cours restent facturés
              au tarif convenu lors de la souscription.
            </p>
            <p className="mt-2">
              Le paiement s&apos;effectue par prélèvement mensuel automatique via la plateforme de
              paiement sécurisée Stripe. Pour les prestations ponctuelles, le paiement est dû à la
              commande.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">Article 4 — Durée et résiliation</h2>
            <p>
              Les abonnements sont souscrits pour une durée indéterminée avec un engagement minimum
              d&apos;un (1) mois. Le Client peut résilier son abonnement à tout moment avec un préavis
              de trente (30) jours calendaires avant la prochaine date de facturation.
            </p>
            <p className="mt-2">
              La résiliation prend effet à la fin de la période de facturation en cours. Les sommes
              déjà réglées ne sont pas remboursées, sauf dans les cas prévus à l&apos;article 5.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">Article 5 — Droit de rétractation</h2>
            <p>
              Conformément aux articles L.221-18 et suivants du Code de la consommation, le Client
              consommateur dispose d&apos;un délai de quatorze (14) jours à compter de la souscription
              pour exercer son droit de rétractation, sans avoir à justifier de motifs ni à payer de
              pénalités.
            </p>
            <p className="mt-2">
              Pour exercer ce droit, le Client doit adresser sa demande par email à{" "}
              <a href="mailto:support@worldgestion.fr" className="text-gold hover:text-gold-light">
                support@worldgestion.fr
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">Article 6 — Obligations du Prestataire</h2>
            <p>
              Le Prestataire s&apos;engage à fournir les services avec diligence et compétence, dans le
              respect des règles de l&apos;art et de la réglementation en vigueur. Il s&apos;agit d&apos;une
              obligation de moyens.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">Article 7 — Obligations du Client</h2>
            <p>Le Client s&apos;engage à :</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Fournir des informations exactes et à jour</li>
              <li>Transmettre les documents nécessaires dans les délais convenus</li>
              <li>Régler les factures aux échéances prévues</li>
              <li>Informer le Prestataire de tout changement de situation</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">Article 8 — Responsabilité</h2>
            <p>
              La responsabilité du Prestataire ne saurait être engagée en cas de retard ou de
              non-exécution résultant d&apos;informations erronées ou incomplètes fournies par le Client,
              ou en cas de force majeure.
            </p>
            <p className="mt-2">
              En tout état de cause, la responsabilité du Prestataire est limitée au montant des
              sommes effectivement perçues au titre du contrat au cours des douze (12) derniers mois.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">Article 9 — Confidentialité</h2>
            <p>
              Le Prestataire s&apos;engage à traiter de manière strictement confidentielle l&apos;ensemble
              des informations et documents transmis par le Client dans le cadre de l&apos;exécution des
              services.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">Article 10 — Litiges et droit applicable</h2>
            <p>
              Les présentes CGV sont soumises au droit français. En cas de litige, les parties
              s&apos;engagent à rechercher une solution amiable avant toute action en justice. À défaut,
              les tribunaux compétents seront ceux du ressort du siège social du Prestataire.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">Article 11 — Contact</h2>
            <p>
              Pour toute question relative aux présentes CGV, le Client peut contacter le Prestataire :
            </p>
            <ul className="mt-2 space-y-1">
              <li>Email : <a href="mailto:support@worldgestion.fr" className="text-gold hover:text-gold-light">support@worldgestion.fr</a></li>
              <li>Téléphone : <a href="tel:+33756434016" className="text-gold hover:text-gold-light">07 56 43 40 16</a></li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
