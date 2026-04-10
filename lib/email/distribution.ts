/**
 * Připraveno pro budoucí napojení na newsletter / transakční follow-up.
 * Zatím bez odesílání — segmenty a export jdou z DB přes admin.
 */

export type DistributionChannel = "newsletter" | "transactional" | "segment_export";

export function describeDistributionReadiness(): string {
  return "Subscriber data lives in public.subscribers; export CSV from /admin/subscribers. Wire a provider when ready.";
}
