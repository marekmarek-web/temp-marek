import { createClient } from "@supabase/supabase-js";
import { isServiceRoleConfigured, isSupabaseConfigured } from "@/lib/supabase/env";

/** Server-only: bypasses RLS. Use only for trusted server actions (e.g. job applications). */
export function createAdminSupabaseClient() {
  if (!isSupabaseConfigured() || !isServiceRoleConfigured()) {
    throw new Error("Supabase service role is not configured.");
  }
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
