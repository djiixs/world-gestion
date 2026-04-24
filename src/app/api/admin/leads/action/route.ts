import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, isAdminSessionTokenValid } from "@/lib/admin-auth";
import { hasTrustedAdminOrigin } from "@/lib/admin-request";
import { updateLeadStateById, type LeadState } from "@/lib/admin-store";
import { ADMIN_API_SECURITY_HEADERS } from "@/lib/security-headers";

const ACTION_TO_STATE: Record<string, LeadState> = {
  pin: "pinned",
  draft: "draft",
  delete: "deleted",
  restore: "inbox",
};

const LEAD_ID_PATTERN = /^lead_[0-9a-f-]{36}$/i;

export async function POST(req: NextRequest) {
  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!isAdminSessionTokenValid(token)) {
    return NextResponse.json(
      { error: "Non autorise" },
      {
        status: 401,
        headers: ADMIN_API_SECURITY_HEADERS,
      }
    );
  }

  if (!hasTrustedAdminOrigin(req)) {
    return NextResponse.json(
      { error: "Requete non autorisee" },
      {
        status: 403,
        headers: ADMIN_API_SECURITY_HEADERS,
      }
    );
  }

  const formData = await req.formData();
  const leadId = String(formData.get("leadId") ?? "").trim();
  const action = String(formData.get("action") ?? "").trim();

  if (!leadId || !LEAD_ID_PATTERN.test(leadId) || !ACTION_TO_STATE[action]) {
    return NextResponse.json(
      { error: "Action invalide" },
      {
        status: 400,
        headers: ADMIN_API_SECURITY_HEADERS,
      }
    );
  }

  const updated = await updateLeadStateById(leadId, ACTION_TO_STATE[action]);
  if (!updated) {
    return NextResponse.json(
      { error: "Demande introuvable" },
      {
        status: 404,
        headers: ADMIN_API_SECURITY_HEADERS,
      }
    );
  }

  return NextResponse.json(
    { success: true, lead: updated },
    {
      headers: ADMIN_API_SECURITY_HEADERS,
    }
  );
}
