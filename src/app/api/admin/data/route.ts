import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, isAdminSessionTokenValid } from "@/lib/admin-auth";
import { getAdminDashboardData } from "@/lib/admin-store";
import { ADMIN_API_SECURITY_HEADERS } from "@/lib/security-headers";

export async function GET(req: NextRequest) {
  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!isAdminSessionTokenValid(token)) {
    return NextResponse.json(
      { error: "Non autorisé" },
      {
        status: 401,
        headers: ADMIN_API_SECURITY_HEADERS,
      }
    );
  }

  const data = await getAdminDashboardData();
  return NextResponse.json(data, {
    headers: ADMIN_API_SECURITY_HEADERS,
  });
}
