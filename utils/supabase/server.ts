import { createServerClient } from "@supabase/ssr";
import type { cookies } from "next/headers";
import { getPublicSupabaseAnonKey } from "@/lib/supabase/env";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = () => getPublicSupabaseAnonKey();

/**
 * Supabase SSR klient pro Server Components / Route Handlers (stejné API jako Supabase docs).
 * Preferuj `@/lib/supabase/server` → `createServerSupabaseClient()` v existujícím kódu.
 */
export const createClient = (cookieStore: Awaited<ReturnType<typeof cookies>>) => {
  const key = supabaseKey();
  if (!supabaseUrl?.trim() || !key) {
    throw new Error("Supabase is not configured (NEXT_PUBLIC_SUPABASE_URL + ANON_KEY or PUBLISHABLE_KEY).");
  }
  return createServerClient(supabaseUrl, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet, headers) {
        void headers;
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          /* setAll from Server Component — middleware obnovuje session */
        }
      },
    },
  });
};
