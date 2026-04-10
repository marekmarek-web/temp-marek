import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";
import { getPublicSupabaseAnonKey } from "@/lib/supabase/env";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = () => getPublicSupabaseAnonKey();

/**
 * Klient pro middleware (Supabase docs pattern).
 * Po `getUser()` vrať `response` z tohoto objektu (getter drží aktuální cookies).
 *
 * Kořenový `middleware.ts` v projektu už auth řeší — toto je pro vlastní rozšíření / copy-paste z docs.
 */
export const createClient = (request: NextRequest) => {
  let supabaseResponse = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const key = supabaseKey();
  if (!supabaseUrl?.trim() || !key) {
    throw new Error("Supabase is not configured (NEXT_PUBLIC_SUPABASE_URL + ANON_KEY or PUBLISHABLE_KEY).");
  }

  const supabase = createServerClient(supabaseUrl, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet, headers) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
        if (headers) {
          Object.entries(headers).forEach(([key, value]) => supabaseResponse.headers.set(key, value));
        }
      },
    },
  });

  return {
    supabase,
    get response() {
      return supabaseResponse;
    },
  };
};
