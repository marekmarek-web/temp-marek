import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const DEFAULT_FOOTER_TAGLINE =
  "Finanční plánování pro rodiny a firmy — srozumitelně a bez nátlaku na produkt. Premium Brokers, region Ústí a Praha.";

const DEFAULT_HOME_BLOG_INTRO =
  "Krátké texty z praxe: investice, hypotéka, pojištění, penze. Až dočtete, víte, jestli chcete konzultaci nebo jen kalkulačku.";

export type PublicSiteSettingKey = "footer_tagline" | "home_blog_intro";

export async function getPublicSiteSetting(
  key: PublicSiteSettingKey,
  fallback: string
): Promise<string> {
  if (!isSupabaseConfigured()) return fallback;
  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", key)
      .eq("public_readable", true)
      .maybeSingle();
    if (error || !data?.value?.trim()) return fallback;
    return data.value.trim();
  } catch {
    return fallback;
  }
}

export async function getFooterTagline(): Promise<string> {
  return getPublicSiteSetting("footer_tagline", DEFAULT_FOOTER_TAGLINE);
}

export async function getHomeBlogIntro(): Promise<string> {
  return getPublicSiteSetting("home_blog_intro", DEFAULT_HOME_BLOG_INTRO);
}
