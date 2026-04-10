import { parsePublicEnv } from "@/lib/env/public";
import { parseServerEnv } from "@/lib/env/server";

/**
 * Validace env při startu (instrumentation). Neukončuje proces — jen loguje varování.
 * Build musí projít i bez volitelných klíčů (Supabase/Resend/Sentry).
 */
export function validateEnvAtStartup(): void {
  try {
    parsePublicEnv();
  } catch (e) {
    console.warn("[env] NEXT_PUBLIC_* validace:", e);
  }
  if (process.env.NEXT_RUNTIME === "nodejs") {
    try {
      parseServerEnv();
    } catch (e) {
      console.warn("[env] server validace:", e);
    }
  }
}
