import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, isAdminSessionTokenValid } from "@/lib/admin-auth";
import { getAdminDashboardData } from "@/lib/admin-store";

export async function GET(req: NextRequest) {
  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!isAdminSessionTokenValid(token)) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const data = await getAdminDashboardData();
  return NextResponse.json(data);
}
