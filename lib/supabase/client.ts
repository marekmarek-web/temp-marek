"use client";

import { createBrowserClient } from "@supabase/ssr";
import { getPublicSupabaseAnonKey, isSupabaseConfigured } from "@/lib/supabase/env";

export function createBrowserSupabaseClient() {
  if (!isSupabaseConfigured()) {
    throw new Error(
      "Supabase is not configured (missing NEXT_PUBLIC_SUPABASE_URL or ANON_KEY / PUBLISHABLE_KEY)."
    );
  }
  return createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, getPublicSupabaseAnonKey()!);
}
