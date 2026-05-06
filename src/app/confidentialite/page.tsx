import Link from "next/link";

export const metadata = {
  title: "Politique de confidentialité — World Gestion",
};

export default function ConfidentialitePage() {
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
          Politique de confidentialité
        </h1>
        <p className="text-sm text-foreground-muted mb-8">
          Dernière mise à jour : 19 avril 2026
        </p>

        <div className="space-y-8 text-sm text-foreground-secondary leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">1. Introduction</h2>
            <p>
              World&nbsp;Gestion s&apos;engage à protéger la vie privée de ses utilisateurs et clients.
              La présente politique de confidentialité décrit les données personnelles que nous
              collectons, pourquoi nous les collectons, comment nous les utilisons et les droits dont
              vous disposez conformément au Règlement Général sur la Protection des Données (RGPD)
              et à la loi Informatique et Libertés.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">2. Responsable du traitement</h2>
            <ul className="space-y-1">
              <li><strong className="text-foreground">Raison sociale :</strong> World Gestion</li>
              <li><strong className="text-foreground">Adresse :</strong> [Adresse à compléter]</li>
              <li><strong className="text-foreground">Email :</strong>{" "}
                <a href="mailto:contact@worldgestion.fr" className="text-gold hover:text-gold-light">
                  contact@worldgestion.fr
                </a>
              </li>
              <li><strong className="text-foreground">Téléphone :</strong>{" "}
                <a href="tel:+33756434016" className="text-gold hover:text-gold-light">07 56 43 40 16</a>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">3. Données collectées</h2>
            <p>Nous collectons les données suivantes :</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li><strong className="text-foreground">Données d&apos;identification :</strong> nom, prénom, adresse email, numéro de téléphone</li>
              <li><strong className="text-foreground">Données professionnelles :</strong> nom de l&apos;entreprise, secteur d&apos;activité</li>
              <li><strong className="text-foreground">Données de paiement :</strong> traitées directement par Stripe (nous ne stockons pas vos informations bancaires)</li>
              <li><strong className="text-foreground">Données de navigation :</strong> adresse IP, type de navigateur, pages consultées (cookies techniques uniquement)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">4. Finalités du traitement</h2>
            <p>Vos données sont collectées pour les finalités suivantes :</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Gestion de votre compte client et de votre abonnement</li>
              <li>Fourniture des services de gestion administrative et comptable</li>
              <li>Communication relative à votre contrat (factures, notifications)</li>
              <li>Réponse à vos demandes de contact et devis</li>
              <li>Amélioration de nos services et de l&apos;expérience utilisateur</li>
              <li>Respect de nos obligations légales et réglementaires</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">5. Base légale du traitement</h2>
            <p>Le traitement de vos données repose sur :</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li><strong className="text-foreground">L&apos;exécution du contrat :</strong> pour la fourniture de nos services</li>
              <li><strong className="text-foreground">L&apos;intérêt légitime :</strong> pour l&apos;amélioration de nos services</li>
              <li><strong className="text-foreground">Le consentement :</strong> pour l&apos;envoi de communications commerciales</li>
              <li><strong className="text-foreground">L&apos;obligation légale :</strong> pour le respect de nos obligations comptables et fiscales</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">6. Destinataires des données</h2>
            <p>Vos données peuvent être transmises aux destinataires suivants :</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li><strong className="text-foreground">Stripe :</strong> pour le traitement sécurisé des paiements</li>
              <li><strong className="text-foreground">Resend :</strong> pour l&apos;envoi d&apos;emails transactionnels</li>
              <li><strong className="text-foreground">Vercel :</strong> pour l&apos;hébergement du site</li>
            </ul>
            <p className="mt-2">
              Nous ne vendons ni ne louons vos données personnelles à des tiers. Les sous-traitants
              ci-dessus sont liés par des clauses contractuelles conformes au RGPD.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">7. Durée de conservation</h2>
            <ul className="list-disc list-inside space-y-1">
              <li><strong className="text-foreground">Données clients :</strong> conservées pendant la durée de la relation contractuelle, puis 5 ans à des fins comptables</li>
              <li><strong className="text-foreground">Données de contact (prospects) :</strong> conservées 3 ans à compter du dernier contact</li>
              <li><strong className="text-foreground">Données de navigation :</strong> conservées 13 mois maximum</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">8. Vos droits</h2>
            <p>Conformément au RGPD, vous disposez des droits suivants :</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li><strong className="text-foreground">Droit d&apos;accès :</strong> obtenir une copie de vos données personnelles</li>
              <li><strong className="text-foreground">Droit de rectification :</strong> corriger des données inexactes ou incomplètes</li>
              <li><strong className="text-foreground">Droit d&apos;effacement :</strong> demander la suppression de vos données</li>
              <li><strong className="text-foreground">Droit à la portabilité :</strong> recevoir vos données dans un format structuré</li>
              <li><strong className="text-foreground">Droit d&apos;opposition :</strong> vous opposer au traitement de vos données</li>
              <li><strong className="text-foreground">Droit de limitation :</strong> demander la limitation du traitement</li>
            </ul>
            <p className="mt-3">
              Pour exercer vos droits, contactez-nous à{" "}
              <a href="mailto:contact@worldgestion.fr" className="text-gold hover:text-gold-light">
                contact@worldgestion.fr
              </a>. Nous répondrons dans un délai maximum de 30 jours.
            </p>
            <p className="mt-2">
              Vous avez également le droit d&apos;introduire une réclamation auprès de la CNIL
              (Commission Nationale de l&apos;Informatique et des Libertés) :{" "}
              <span className="text-foreground">www.cnil.fr</span>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">9. Sécurité des données</h2>
            <p>
              Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour
              protéger vos données contre tout accès non autorisé, perte, altération ou divulgation :
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Chiffrement SSL/TLS pour toutes les communications</li>
              <li>Hébergement sécurisé avec Vercel (certifié SOC 2)</li>
              <li>Paiements traités par Stripe (certifié PCI DSS Niveau 1)</li>
              <li>Accès aux données limité au personnel autorisé</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">10. Transfert de données hors UE</h2>
            <p>
              Certains de nos sous-traitants (Stripe, Vercel, Resend) sont basés aux États-Unis.
              Les transferts de données sont encadrés par des clauses contractuelles types approuvées
              par la Commission européenne, garantissant un niveau de protection adéquat.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">11. Modification de la politique</h2>
            <p>
              Nous nous réservons le droit de modifier la présente politique de confidentialité à
              tout moment. Toute modification sera publiée sur cette page avec une date de mise à
              jour actualisée. Nous vous encourageons à consulter cette page régulièrement.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">12. Contact</h2>
            <p>Pour toute question relative à la protection de vos données :</p>
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
