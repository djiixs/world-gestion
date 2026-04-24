import { NextRequest, NextResponse } from "next/server";
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

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[subscribe] Erreur interne :", err);

    return NextResponse.json(
      { error: "Erreur interne" },
      { status: 500 }
    );
  }
}
