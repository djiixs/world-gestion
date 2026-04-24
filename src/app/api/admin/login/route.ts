import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  createAdminSessionToken,
  getAdminCookieOptions,
  isAdminCodeConfigured,
  isAdminCodeValid,
  isSessionSecretConfigured,
} from "@/lib/admin-auth";
import { hasTrustedAdminOrigin } from "@/lib/admin-request";
import { ADMIN_API_SECURITY_HEADERS } from "@/lib/security-headers";

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const BLOCK_DURATION_MS = 15 * 60 * 1000;
const MAX_FAILED_ATTEMPTS = 8;
const MIN_ADMIN_CODE_LENGTH = 6;
const MAX_ADMIN_CODE_LENGTH = 128;

type AttemptEntry = {
  count: number;
  windowStartedAt: number;
  blockedUntil?: number;
};

const attemptsByIp = new Map<string, AttemptEntry>();

function getClientIp(req: NextRequest) {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return req.headers.get("x-real-ip") || "unknown";
}

function isBlocked(ip: string) {
  const entry = attemptsByIp.get(ip);
  if (!entry?.blockedUntil) {
    return false;
  }

  if (entry.blockedUntil <= Date.now()) {
    attemptsByIp.delete(ip);
    return false;
  }

  return true;
}

function getRetryAfterSeconds(ip: string) {
  const entry = attemptsByIp.get(ip);
  if (!entry?.blockedUntil) {
    return 0;
  }

  return Math.max(1, Math.ceil((entry.blockedUntil - Date.now()) / 1000));
}

function trackFailedAttempt(ip: string) {
  const now = Date.now();
  const current = attemptsByIp.get(ip);

  if (!current || now - current.windowStartedAt > RATE_LIMIT_WINDOW_MS) {
    attemptsByIp.set(ip, {
      count: 1,
      windowStartedAt: now,
    });
    return;
  }

  const updatedCount = current.count + 1;
  attemptsByIp.set(ip, {
    ...current,
    count: updatedCount,
    blockedUntil:
      updatedCount >= MAX_FAILED_ATTEMPTS
        ? now + BLOCK_DURATION_MS
        : current.blockedUntil,
  });
}

function clearAttempts(ip: string) {
  attemptsByIp.delete(ip);
}

export async function POST(req: NextRequest) {
  if (!isAdminCodeConfigured() || !isSessionSecretConfigured()) {
    return NextResponse.json(
      { error: "Configuration admin invalide" },
      {
        status: 500,
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

  const ip = getClientIp(req);
  if (isBlocked(ip)) {
    return NextResponse.json(
      { error: "Trop de tentatives. Réessayez plus tard." },
      {
        status: 429,
        headers: {
          ...ADMIN_API_SECURITY_HEADERS,
          "Retry-After": String(getRetryAfterSeconds(ip)),
        },
      }
    );
  }

  let code = "";
  try {
    const body = await req.json();
    code = typeof body?.code === "string" ? body.code.trim() : "";
  } catch {
    return NextResponse.json(
      { error: "Requête invalide" },
      {
        status: 400,
        headers: ADMIN_API_SECURITY_HEADERS,
      }
    );
  }

  if (code.length < MIN_ADMIN_CODE_LENGTH || code.length > MAX_ADMIN_CODE_LENGTH) {
    trackFailedAttempt(ip);
    return NextResponse.json(
      { error: "Code admin invalide" },
      {
        status: 401,
        headers: ADMIN_API_SECURITY_HEADERS,
      }
    );
  }

  if (!isAdminCodeValid(code)) {
    trackFailedAttempt(ip);
    return NextResponse.json(
      { error: "Code admin invalide" },
      {
        status: 401,
        headers: ADMIN_API_SECURITY_HEADERS,
      }
    );
  }

  clearAttempts(ip);

  const token = createAdminSessionToken();
  const response = NextResponse.json(
    { success: true },
    {
      headers: ADMIN_API_SECURITY_HEADERS,
    }
  );
  response.cookies.set(ADMIN_COOKIE_NAME, token, getAdminCookieOptions());
  return response;
}
