import { NextRequest } from "next/server";

export function hasTrustedAdminOrigin(req: NextRequest) {
  const origin = req.headers.get("origin");
  const referer = req.headers.get("referer");
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  const protocol = req.headers.get("x-forwarded-proto") ?? "https";

  if (!host) {
    return false;
  }

  const allowedOrigin = `${protocol}://${host}`;

  if (origin) {
    return origin === allowedOrigin;
  }

  if (referer) {
    try {
      return new URL(referer).origin === allowedOrigin;
    } catch {
      return false;
    }
  }

  return false;
}