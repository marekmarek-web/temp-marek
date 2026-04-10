/**
 * Ochrana proti open redirectům (callback, ?next=).
 * Povolí jen relativní cesty na stejném originu (začínají jedním `/`).
 */
export function safeInternalPath(raw: string | null | undefined, fallback: string): string {
  if (raw == null || raw === "") return fallback;
  const t = raw.trim();
  if (!t.startsWith("/") || t.startsWith("//") || t.includes("\\")) return fallback;
  if (t.includes("\0")) return fallback;
  return t;
}
