/** Aktuální URL stránky (volat jen z klientských handlerů) — pro `sourcePath` u leadů a subscriberů. */
export function pageUrl(): string {
  if (typeof window === "undefined") return "";
  return window.location.href;
}
