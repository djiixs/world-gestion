# World Gestion

Plateforme de présentation et de conversion pour **World Gestion** — accompagnement comptable pour entrepreneurs et cabinets comptables.

## Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **Stripe Checkout** (abonnements entrepreneurs)
- Déployable sur **Vercel**

## Démarrage rapide

```bash
npm install
# Remplir les clés Stripe dans .env.local
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Variables d'environnement

| Variable | Description |
|---|---|
| `STRIPE_SECRET_KEY` | Clé secrète Stripe (serveur) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Clé publique Stripe (client) |
| `NEXT_PUBLIC_STRIPE_PRICE_STARTER` | Price ID de l'offre Essentiel |
| `NEXT_PUBLIC_STRIPE_PRICE_PRO` | Price ID de l'offre Professionnel |
| `NEXT_PUBLIC_STRIPE_PRICE_PREMIUM` | Price ID de l'offre Premium |
| `NEXT_PUBLIC_SITE_URL` | URL du site (pour les redirections Stripe) |

## Structure

```
src/
├── app/
│   ├── api/contact/         → Lead cabinets comptables
│   ├── api/subscribe/       → Inscription entrepreneurs
│   ├── api/create-checkout-session/ → Paiement Stripe
│   ├── layout.tsx
│   └── page.tsx             → Single-page app
├── components/              → Tous les composants UI
├── data/                    → Offres entrepreneurs & cabinets
├── lib/                     → Stripe, utilitaires
└── types/                   → Types TypeScript
```

## Fonctionnalités

- **Single-page** avec sections Hero, Services, Offres, Contact
- **Toggle** Entrepreneurs / Cabinets comptables
- **Paiement Stripe** intégré pour les offres entrepreneurs
- **Formulaire de lead** pour les cabinets (demande de devis)
- **Mobile-first**, responsive, rapide
- API routes prêtes pour brancher un service d'email (Resend, EmailJS, etc.)

