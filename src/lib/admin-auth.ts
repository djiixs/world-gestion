import crypto from "crypto";

export const ADMIN_COOKIE_NAME = "wg_admin_session";

const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;
const MIN_SESSION_SECRET_LENGTH = 32;

function getAdminCode() {
  return process.env.ADMIN_CODE ?? "";
}

function getSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET ?? "";
}

function sign(payload: string) {
  return crypto.createHmac("sha256", getSessionSecret()).update(payload).digest("hex");
}

function safeEqual(a: string, b: string) {
  const aBuf = Buffer.from(a);
  const bBuf = Buffer.from(b);

  if (aBuf.length !== bBuf.length) {
    return false;
  }

  return crypto.timingSafeEqual(aBuf, bBuf);
}

export function isAdminCodeConfigured() {
  return Boolean(getAdminCode());
}

export function isSessionSecretConfigured() {
  return getSessionSecret().length >= MIN_SESSION_SECRET_LENGTH;
}

export function isAdminCodeValid(code: string) {
  const adminCode = getAdminCode();
  if (!adminCode || !code) {
    return false;
  }

  return safeEqual(code, adminCode);
}

export function createAdminSessionToken() {
  if (!isSessionSecretConfigured()) {
    throw new Error("ADMIN_SESSION_SECRET invalide");
  }

  const issuedAt = Date.now();
  const nonce = crypto.randomBytes(12).toString("hex");
  const payload = `${issuedAt}.${nonce}`;
  const signature = sign(payload);
  return `${payload}.${signature}`;
}

export function isAdminSessionTokenValid(token?: string) {
  if (!token || !isSessionSecretConfigured()) {
    return false;
  }

  const parts = token.split(".");
  if (parts.length !== 3) {
    return false;
  }

  const [issuedAtRaw, nonce, signature] = parts;
  const issuedAt = Number(issuedAtRaw);

  if (!Number.isFinite(issuedAt) || !nonce || !signature) {
    return false;
  }

  const ageMs = Date.now() - issuedAt;
  if (ageMs < 0 || ageMs > SESSION_MAX_AGE_SECONDS * 1000) {
    return false;
  }

  const expected = sign(`${issuedAtRaw}.${nonce}`);
  return safeEqual(signature, expected);
}

export function getAdminCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  };
}
