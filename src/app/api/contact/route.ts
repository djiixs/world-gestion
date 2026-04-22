import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      cabinetName,
      responsableName,
      email,
      phone,
      nbDossiers,
      message,
      offerId,
      offerTitle,
    } = body;

    if (!cabinetName || !responsableName || !email || !phone || !offerId) {
      return NextResponse.json(
        { error: "Champs obligatoires manquants" },
        { status: 400 }
      );
    }

    const contactEmail = process.env.CONTACT_EMAIL;
    if (!contactEmail) {
      console.error("CONTACT_EMAIL non configuré dans .env.local");
      return NextResponse.json(
        { error: "Configuration email manquante" },
        { status: 500 }
      );
    }

    const htmlBody = `
      <h2>Nouvelle demande cabinet — ${offerTitle}</h2>
      <table style="border-collapse:collapse;width:100%;max-width:600px;font-family:sans-serif">
        <tr><td style="padding:8px 12px;border:1px solid #e2e8f0;font-weight:600">Cabinet</td><td style="padding:8px 12px;border:1px solid #e2e8f0">${cabinetName}</td></tr>
        <tr><td style="padding:8px 12px;border:1px solid #e2e8f0;font-weight:600">Responsable</td><td style="padding:8px 12px;border:1px solid #e2e8f0">${responsableName}</td></tr>
        <tr><td style="padding:8px 12px;border:1px solid #e2e8f0;font-weight:600">Email</td><td style="padding:8px 12px;border:1px solid #e2e8f0"><a href="mailto:${email}">${email}</a></td></tr>
        <tr><td style="padding:8px 12px;border:1px solid #e2e8f0;font-weight:600">Téléphone</td><td style="padding:8px 12px;border:1px solid #e2e8f0"><a href="tel:${phone}">${phone}</a></td></tr>
        <tr><td style="padding:8px 12px;border:1px solid #e2e8f0;font-weight:600">Volume dossiers</td><td style="padding:8px 12px;border:1px solid #e2e8f0">${nbDossiers || "Non précisé"}</td></tr>
        <tr><td style="padding:8px 12px;border:1px solid #e2e8f0;font-weight:600">Service demandé</td><td style="padding:8px 12px;border:1px solid #e2e8f0">${offerTitle} (${offerId})</td></tr>
        ${message ? `<tr><td style="padding:8px 12px;border:1px solid #e2e8f0;font-weight:600">Message</td><td style="padding:8px 12px;border:1px solid #e2e8f0">${message}</td></tr>` : ""}
      </table>
      <p style="margin-top:16px;font-size:13px;color:#64748b">Envoyé depuis le site World Gestion le ${new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}</p>
    `;

    // Si Resend n'est pas configuré, log et retour succès
    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === "re_REPLACE_ME") {
      console.log("[contact] Resend non configuré — demande enregistrée :", { cabinetName, email, offerId });
      return NextResponse.json({ success: true });
    }

    const { error } = await resend.emails.send({
      from: "World Gestion <onboarding@resend.dev>",
      to: [contactEmail],
      replyTo: email,
      subject: `Nouvelle demande cabinet — ${offerTitle} — ${cabinetName}`,
      html: htmlBody,
    });

    if (error) {
      console.error("[contact] Erreur Resend :", JSON.stringify(error));
      // On retourne quand même success : la demande est reçue, l'erreur est dans les logs
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact] Erreur interne :", err);
    return NextResponse.json(
      { error: "Erreur interne" },
      { status: 500 }
    );
  }
}
