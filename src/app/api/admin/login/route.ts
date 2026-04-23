import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  createAdminSessionToken,
  getAdminCookieOptions,
  isAdminCodeConfigured,
  isAdminCodeValid,
} from "@/lib/admin-auth";

export async function POST(req: NextRequest) {
  if (!isAdminCodeConfigured()) {
    return NextResponse.json(
      { error: "ADMIN_CODE non configuré" },
      { status: 500 }
    );
  }

  const body = await req.json();
  const code = typeof body?.code === "string" ? body.code.trim() : "";

  if (!isAdminCodeValid(code)) {
    return NextResponse.json(
      { error: "Code admin invalide" },
      { status: 401 }
    );
  }

  const token = createAdminSessionToken();
  const response = NextResponse.json({ success: true });
  response.cookies.set(ADMIN_COOKIE_NAME, token, getAdminCookieOptions());
  return response;
}
