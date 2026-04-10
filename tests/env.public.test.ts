import { describe, expect, it } from "vitest";
import { publicEnvSchema } from "@/lib/env/public";

describe("publicEnvSchema", () => {
  it("accepts empty optional URLs", () => {
    const r = publicEnvSchema.safeParse({
      NEXT_PUBLIC_SITE_URL: "",
      NEXT_PUBLIC_SUPABASE_URL: undefined,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: undefined,
      NEXT_PUBLIC_SENTRY_DSN: undefined,
      NEXT_PUBLIC_PLAUSIBLE_DOMAIN: undefined,
      NEXT_PUBLIC_FORMSUBMIT_URL: undefined,
    });
    expect(r.success).toBe(true);
  });
});
