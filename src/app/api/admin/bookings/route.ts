import { NextRequest, NextResponse } from "next/server";
import { addBooking } from "@/lib/admin-store";
import { ADMIN_API_SECURITY_HEADERS } from "@/lib/security-headers";

const NAME_MAX = 120;
const EMAIL_MAX = 254;
const SLOT_PATTERN = /^\d{1,2}h\d{2}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Corps invalide" }, { status: 400, headers: ADMIN_API_SECURITY_HEADERS });
  }

  const data = body as Record<string, unknown>;

  const type = data.type === "entrepreneur" || data.type === "cabinet" ? data.type : null;
  const offerTitle = typeof data.offerTitle === "string" ? data.offerTitle.trim().slice(0, 120) : "";
  const offerPrice = typeof data.offerPrice === "string" ? data.offerPrice.trim().slice(0, 60) : undefined;
  const date = typeof data.date === "string" ? data.date.trim() : "";
  const slot = typeof data.slot === "string" ? data.slot.trim() : "";
  const name = typeof data.name === "string" ? data.name.trim().slice(0, NAME_MAX) : "";
  const email = typeof data.email === "string" ? data.email.trim().slice(0, EMAIL_MAX).toLowerCase() : "";

  if (!type || !date || !SLOT_PATTERN.test(slot) || !name || !EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: "Données manquantes ou invalides" }, { status: 400, headers: ADMIN_API_SECURITY_HEADERS });
  }

  // Validate date is a valid ISO date string and not in the past
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    return NextResponse.json({ error: "Date invalide" }, { status: 400, headers: ADMIN_API_SECURITY_HEADERS });
  }

  const booking = await addBooking({ type, offerTitle, offerPrice, date, slot, name, email });

  return NextResponse.json({ success: true, booking }, { status: 201, headers: ADMIN_API_SECURITY_HEADERS });
}
