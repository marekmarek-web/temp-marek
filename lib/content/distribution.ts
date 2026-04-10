/**
 * Operační stav distribuce článku (newsletter / sociální sítě / follow-up).
 * Neprovádí odeslání — jen přehled pro tým v adminu a příprava na budoucí nástroje.
 */

export const POST_DISTRIBUTION_STATUSES = [
  "none",
  "awaiting_distribution",
  "distributed",
  "needs_followup",
] as const;
export type PostDistributionStatus = (typeof POST_DISTRIBUTION_STATUSES)[number];

export const POST_DISTRIBUTION_LABELS: Record<PostDistributionStatus, string> = {
  none: "Nesledováno",
  awaiting_distribution: "Čeká na distribuci",
  distributed: "Distribuováno",
  needs_followup: "Potřebuje follow-up",
};
