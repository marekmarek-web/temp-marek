/**
 * Import článků z content/blog-seed do Supabase (tabulka posts).
 *
 * Požadavky:
 *   - NEXT_PUBLIC_SUPABASE_URL
 *   - SUPABASE_SERVICE_ROLE_KEY (service role — pouze lokálně / CI, necommitovat)
 *
 * Spuštění: node scripts/import-blog-seed.mjs
 *
 * Duplicitní slug: záznam přeskočí (nebo použijte --force k přepsání — zatím neimplementováno).
 */

import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

function readingTimeMin(text) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!url || !key) {
    console.error(
      "Chybí NEXT_PUBLIC_SUPABASE_URL nebo SUPABASE_SERVICE_ROLE_KEY. Nastavte proměnné prostředí a zkuste znovu."
    );
    process.exit(1);
  }

  const manifestPath = path.join(root, "content", "blog-seed", "manifest.json");
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

  const supabase = createClient(url, key, { auth: { persistSession: false } });

  for (const post of manifest.posts) {
    const mdPath = path.join(root, "content", "blog-seed", "posts", post.bodyFile);
    if (!fs.existsSync(mdPath)) {
      console.error(`Chybí soubor: ${post.bodyFile}`);
      process.exit(1);
    }
    const body = fs.readFileSync(mdPath, "utf8");
    const { data: existing } = await supabase.from("posts").select("id").eq("slug", post.slug).maybeSingle();
    if (existing?.id) {
      console.log(`Přeskočeno (slug už existuje): ${post.slug}`);
      continue;
    }

    const row = {
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt ?? null,
      body,
      category: post.category ?? "",
      published: true,
      published_at: post.published_at,
      cover_image_url: post.cover_image_url ?? null,
      seo_title: null,
      seo_description: post.excerpt?.slice(0, 160) ?? null,
      canonical_url: null,
      reading_time: readingTimeMin(body),
      featured: false,
      og_image_url: null,
      content_type: post.content_type ?? "blog",
      author_id: null,
      author_name: post.author_name ?? "Marek Příbramský",
    };

    const { error } = await supabase.from("posts").insert(row);
    if (error) {
      console.error(`Chyba insertu ${post.slug}:`, error.message);
      process.exit(1);
    }
    console.log(`Importováno: ${post.slug}`);
  }

  console.log("Hotovo.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
