export interface Offer {
  id: string;
  title: string;
  description: string;
  features: string[];
  price?: number;          // undefined = sur devis (cabinets)
  priceLabel?: string;     // ex: "Sur devis", "À partir de…"
  priceUnit?: string;      // ex: "/mois", "/heure"
  popular?: boolean;
  badge?: string;          // ex: "Populaire", "Recommandé"
  tag?: string;            // ex: "Sans engagement" — secondary badge
  cta?: string;            // custom CTA label
}
