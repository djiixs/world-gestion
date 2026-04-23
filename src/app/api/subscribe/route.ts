import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/mailer";
import { addLead } from "@/lib/admin-store";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      lastName,
      firstName,
      company,
      email,
      phone,
      additionalNeed,
      offerId,
      offerTitle,
    } = body;

    if (!lastName || !firstName || !email || !phone || !offerId) {
      return NextResponse.json(
        { error: "Champs obligatoires manquants" },
        { status: 400 }
      );
    }

    await addLead({
      type: "entrepreneur",
      offerId,
      offerTitle: offerTitle || offerId,
      email,
      phone,
      firstName,
      lastName,
      company: company || undefined,
      note: additionalNeed || undefined,
    });

    const contactEmail = process.env.CONTACT_EMAIL;
    if (!contactEmail) {
      console.error("CONTACT_EMAIL non configuré dans .env.local");
      return NextResponse.json(
        { error: "Configuration email manquante" },
        { status: 500 }
      );
    }

    const htmlBody = `
      <h2>Nouvelle inscription entrepreneur — ${offerTitle}</h2>
      <table style="border-collapse:collapse;width:100%;max-width:600px;font-family:sans-serif">
        <tr><td style="padding:8px 12px;border:1px solid #e2e8f0;font-weight:600">Nom</td><td style="padding:8px 12px;border:1px solid #e2e8f0">${lastName}</td></tr>
        <tr><td style="padding:8px 12px;border:1px solid #e2e8f0;font-weight:600">Prénom</td><td style="padding:8px 12px;border:1px solid #e2e8f0">${firstName}</td></tr>
        <tr><td style="padding:8px 12px;border:1px solid #e2e8f0;font-weight:600">Entreprise</td><td style="padding:8px 12px;border:1px solid #e2e8f0">${company || "Non renseigné"}</td></tr>
        <tr><td style="padding:8px 12px;border:1px solid #e2e8f0;font-weight:600">Email</td><td style="padding:8px 12px;border:1px solid #e2e8f0"><a href="mailto:${email}">${email}</a></td></tr>
        <tr><td style="padding:8px 12px;border:1px solid #e2e8f0;font-weight:600">Téléphone</td><td style="padding:8px 12px;border:1px solid #e2e8f0"><a href="tel:${phone}">${phone}</a></td></tr>
        <tr><td style="padding:8px 12px;border:1px solid #e2e8f0;font-weight:600">Offre choisie</td><td style="padding:8px 12px;border:1px solid #e2e8f0">${offerTitle} (${offerId})</td></tr>
        ${additionalNeed ? `<tr><td style="padding:8px 12px;border:1px solid #e2e8f0;font-weight:600">Besoin complémentaire</td><td style="padding:8px 12px;border:1px solid #e2e8f0">${additionalNeed}</td></tr>` : ""}
      </table>
      <p style="margin-top:16px;font-size:13px;color:#64748b">Envoyé depuis le site World Gestion le ${new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}</p>
    `;

    try {
      await sendEmail({
        to: contactEmail,
        replyTo: email,
        subject: `Nouvelle inscription — ${offerTitle} — ${firstName} ${lastName}`,
        html: htmlBody,
      });
    } catch (emailError) {
      // Leads are stored in admin dashboard; email notifications are best-effort.
      console.error("[subscribe] Notification email non envoyée:", emailError);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[subscribe] Erreur interne :", err);

    return NextResponse.json(
      { error: "Erreur interne" },
      { status: 500 }
    );
  }
}
