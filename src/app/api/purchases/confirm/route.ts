import { NextRequest, NextResponse } from "next/server";
import { updatePurchaseStatusByPaymentIntent } from "@/lib/admin-store";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const paymentIntentId = typeof body?.paymentIntentId === "string" ? body.paymentIntentId : "";
  const status = body?.status === "succeeded" ? "succeeded" : body?.status === "failed" ? "failed" : null;

  if (!paymentIntentId || !status) {
    return NextResponse.json({ error: "Payload invalide" }, { status: 400 });
  }

  const updated = await updatePurchaseStatusByPaymentIntent(paymentIntentId, status);
  if (!updated) {
    return NextResponse.json({ error: "Achat introuvable" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
