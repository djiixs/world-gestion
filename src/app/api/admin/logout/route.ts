import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, getAdminCookieOptions } from "@/lib/admin-auth";
import { hasTrustedAdminOrigin } from "@/lib/admin-request";
import { ADMIN_API_SECURITY_HEADERS } from "@/lib/security-headers";

export async function POST(req: NextRequest) {
  if (!hasTrustedAdminOrigin(req)) {
    return NextResponse.json(
      { error: "Requete non autorisee" },
      {
        status: 403,
        headers: ADMIN_API_SECURITY_HEADERS,
      }
    );
  }

  const response = NextResponse.json(
    { success: true },
    {
      headers: ADMIN_API_SECURITY_HEADERS,
    }
  );
  response.cookies.set(ADMIN_COOKIE_NAME, "", {
    ...getAdminCookieOptions(),
    maxAge: 0,
  });
  return response;
}
