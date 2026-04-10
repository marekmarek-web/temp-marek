import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  body: string;
  category: string;
  published: boolean;
  published_at: string | null;
  cover_image_url: string | null;
};

export function formatPostDate(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("cs-CZ", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
}

export async function fetchPublishedPosts(limit?: number): Promise<BlogPost[]> {
  if (!isSupabaseConfigured()) return [];
  try {
    const supabase = await createServerSupabaseClient();
    let q = supabase
      .from("posts")
      .select(
        "id, slug, title, excerpt, body, category, published, published_at, cover_image_url"
      )
      .eq("published", true)
      .order("published_at", { ascending: false });
    if (limit != null) q = q.limit(limit);
    const { data, error } = await q;
    if (error || !data) return [];
    return data as BlogPost[];
  } catch {
    return [];
  }
}

export async function fetchPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!isSupabaseConfigured()) return null;
  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("posts")
      .select(
        "id, slug, title, excerpt, body, category, published, published_at, cover_image_url"
      )
      .eq("slug", slug)
      .eq("published", true)
      .maybeSingle();
    if (error || !data) return null;
    return data as BlogPost;
  } catch {
    return null;
  }
}

export async function fetchAllPostSlugs(): Promise<string[]> {
  if (!isSupabaseConfigured()) return [];
  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("posts")
      .select("slug")
      .eq("published", true);
    if (error || !data) return [];
    return data.map((r) => r.slug as string);
  } catch {
    return [];
  }
}
