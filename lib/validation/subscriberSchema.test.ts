import { describe, expect, it } from "vitest";
import { CONSENT_TEXT_VERSION } from "@/lib/subscribers/domain";
import { subscriberBodySchema } from "./subscriberSchema";

describe("subscriberBodySchema", () => {
  it("accepts valid marketing consent payload", () => {
    const out = subscriberBodySchema.safeParse({
      email: "a@b.cz",
      source: "blog_listing",
      interestSegment: "blog_audience",
      consentMarketing: true,
      consentTextVersion: CONSENT_TEXT_VERSION,
      formOpenedAt: Date.now() - 5_000,
    });
    expect(out.success).toBe(true);
  });

  it("rejects without marketing consent", () => {
    const out = subscriberBodySchema.safeParse({
      email: "a@b.cz",
      source: "footer",
      consentMarketing: false,
    });
    expect(out.success).toBe(false);
  });

  it("rejects invalid email", () => {
    const out = subscriberBodySchema.safeParse({
      email: "not-an-email",
      source: "homepage",
      consentMarketing: true,
    });
    expect(out.success).toBe(false);
  });
});
