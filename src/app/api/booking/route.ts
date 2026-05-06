import { NextRequest, NextResponse } from "next/server";
import { addLead } from "@/lib/admin-store";
import { sendEmail } from "@/lib/mailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      clientType,
      need,
      offerId,
      offerTitle,
      bookingDate,
      bookingTime,
    } = body;

    if (!firstName || !lastName || !email || !phone || !offerId || !bookingDate || !bookingTime) {
      return NextResponse.json(
        { error: "Champs obligatoires manquants" },
        { status: 400 }
      );
    }

    const type = clientType === "cabinet" ? "cabinet" : "entrepreneur";

    await addLead({
      type,
      offerId,
      offerTitle: offerTitle || offerId,
      email,
      phone,
      firstName,
      lastName,
      note: need || undefined,
      bookingDate,
      bookingTime,
    });

    const adminEmail = process.env.ADMIN_NOTIFY_EMAIL ?? "support@worldgestion.fr";
    const rdvDate = new Date(bookingDate).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    await sendEmail({
      to: adminEmail,
      subject: `Nouveau RDV — ${firstName} ${lastName} (${offerTitle || offerId})`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1a1a1a;">
          <h2 style="color:#b8962e;margin-bottom:4px;">Nouveau rendez-vous client</h2>
          <p style="color:#666;margin-top:0;">World Gestion — notification automatique</p>
          <table style="width:100%;border-collapse:collapse;margin-top:16px;">
            <tr><td style="padding:6px 0;color:#666;width:140px;">Nom</td><td style="padding:6px 0;font-weight:600;">${firstName} ${lastName}</td></tr>
            <tr><td style="padding:6px 0;color:#666;">Email</td><td style="padding:6px 0;"><a href="mailto:${email}" style="color:#b8962e;">${email}</a></td></tr>
            <tr><td style="padding:6px 0;color:#666;">Téléphone</td><td style="padding:6px 0;">${phone}</td></tr>
            <tr><td style="padding:6px 0;color:#666;">Type</td><td style="padding:6px 0;">${type === "cabinet" ? "Cabinet" : "Entrepreneur"}</td></tr>
            <tr><td style="padding:6px 0;color:#666;">Offre</td><td style="padding:6px 0;font-weight:600;">${offerTitle || offerId}</td></tr>
            <tr><td style="padding:6px 0;color:#666;">Date RDV</td><td style="padding:6px 0;font-weight:600;color:#b8962e;">${rdvDate} à ${bookingTime}</td></tr>
            ${need ? `<tr><td style="padding:6px 0;color:#666;vertical-align:top;">Besoin</td><td style="padding:6px 0;">${need}</td></tr>` : ""}
          </table>
          <hr style="margin:20px 0;border:none;border-top:1px solid #e5e5e5;" />
          <p style="font-size:12px;color:#999;">Consultez le détail dans l'<a href="https://worldgestion.fr/admin" style="color:#b8962e;">espace admin</a>.</p>
        </div>
      `,
      replyTo: email,
    }).catch((err) => console.error("[booking] Notif email échouée :", err));

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[booking] Erreur interne :", err);
    return NextResponse.json(
      { error: "Erreur interne" },
      { status: 500 }
    );
  }
}
