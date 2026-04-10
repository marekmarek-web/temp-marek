import { CONSENT_TEXT_VERSION } from "@/lib/subscribers/domain";
import type { SubscriberBody } from "@/lib/validation/subscriberSchema";

export const validSubscriberBody: SubscriberBody = {
  email: "subscriber@example.com",
  name: "Jan",
  source: "blog_listing",
  interestSegment: "blog_audience",
  sourcePath: "/blog",
  consentMarketing: true,
  consentTextVersion: CONSENT_TEXT_VERSION,
  formOpenedAt: Date.now() - 5_000,
};
