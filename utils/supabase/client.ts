"use client";

import { createBrowserClient } from "@supabase/ssr";
import { getPublicSupabaseAnonKey } from "@/lib/supabase/env";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = () => getPublicSupabaseAnonKey();

/**
 * Browser Supabase klient (Supabase docs naming).
 * V aplikaci se používá `@/lib/supabase/client` → `createBrowserSupabaseClient()`.
 */
export const createClient = () => {
  const key = supabaseKey();
  if (!supabaseUrl?.trim() || !key) {
    throw new Error("Supabase is not configured (NEXT_PUBLIC_SUPABASE_URL + ANON_KEY or PUBLISHABLE_KEY).");
  }
  return createBrowserClient(supabaseUrl, key);
};
