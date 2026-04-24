import { NextRequest, NextResponse } from "next/server";
import { addLead } from "@/lib/admin-store";

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

    await addLead({
      type: "cabinet",
      offerId,
      offerTitle: offerTitle || offerId,
      email,
      phone,
      cabinetName,
      responsableName,
      nbDossiers: nbDossiers || undefined,
      note: message || undefined,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact] Erreur interne :", err);

    return NextResponse.json(
      { error: "Erreur interne" },
      { status: 500 }
    );
  }
}
