export const ADMIN_API_SECURITY_HEADERS = {
  "Cache-Control": "no-store",
  Pragma: "no-cache",
  Expires: "0",
  "X-Robots-Tag": "noindex, noarchive",
  "Content-Security-Policy": "default-src 'none'; frame-ancestors 'none'; base-uri 'none'",
} as const;
