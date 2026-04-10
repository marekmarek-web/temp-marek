import { z } from "zod";

const optStr = z.preprocess(
  (v) => (v === "" || v == null ? undefined : v),
  z.string().min(1).optional(),
);

/** Server-only proměnné (nikdy do client bundle). */
export const serverEnvSchema = z.object({
  RESEND_API_KEY: optStr,
  RESEND_FROM: optStr,
  LEAD_EMAIL_TO: z.preprocess(
    (v) => (v === "" || v == null ? undefined : v),
    z.string().min(3).optional(),
  ),
  SUPABASE_SERVICE_ROLE_KEY: optStr,
  SENTRY_AUTH_TOKEN: optStr,
  SENTRY_ORG: optStr,
  SENTRY_PROJECT: optStr,
  FORCE_STATIC_RATES: z.enum(["true", "false"]).optional(),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;

export function parseServerEnv(): ServerEnv {
  return serverEnvSchema.parse({
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    RESEND_FROM: process.env.RESEND_FROM,
    LEAD_EMAIL_TO: process.env.LEAD_EMAIL_TO,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN,
    SENTRY_ORG: process.env.SENTRY_ORG,
    SENTRY_PROJECT: process.env.SENTRY_PROJECT,
    FORCE_STATIC_RATES: process.env.FORCE_STATIC_RATES as "true" | "false" | undefined,
  });
}
