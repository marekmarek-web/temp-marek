export const SUBSCRIBER_SOURCES = [
  "blog_listing",
  "blog_article",
  "footer",
  "lead_success",
  "homepage",
  "general",
] as const;
export type SubscriberSource = (typeof SUBSCRIBER_SOURCES)[number];

export const INTEREST_SEGMENTS = [
  "blog_audience",
  "calculators",
  "general_updates",
  "content_interest",
] as const;
export type InterestSegment = (typeof INTEREST_SEGMENTS)[number];

export const SUBSCRIBER_STATUSES = ["active", "unsubscribed", "bounced", "pending"] as const;
export type SubscriberStatus = (typeof SUBSCRIBER_STATUSES)[number];

export const SUBSCRIBER_SOURCE_LABELS: Record<SubscriberSource, string> = {
  blog_listing: "Blog — výpis",
  blog_article: "Blog — článek",
  footer: "Patička",
  lead_success: "Po odeslání leadu",
  homepage: "Úvod",
  general: "Obecné",
};

export const INTEREST_SEGMENT_LABELS: Record<InterestSegment, string> = {
  blog_audience: "Blog / články",
  calculators: "Kalkulačky",
  general_updates: "Obecné novinky",
  content_interest: "Obsah / témata",
};

export const SUBSCRIBER_STATUS_LABELS: Record<SubscriberStatus, string> = {
  active: "Aktivní",
  unsubscribed: "Odhlášen",
  bounced: "Neplatný / bounce",
  pending: "Čeká na potvrzení",
};

/** Verze textu souhlasu — při změně GDPR copy zvedněte a zaznamenejte u nových záznamů. */
export const CONSENT_TEXT_VERSION = "2026-04-sub-v1";
