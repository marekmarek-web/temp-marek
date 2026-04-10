import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { requireEditor } from "@/lib/admin/require-editor";
import type { BlogPost } from "@/lib/posts";

const PostEditor = dynamic(() => import("@/components/admin/PostEditor").then((m) => m.PostEditor), {
  loading: () => (
    <div
      className="animate-pulse space-y-4 rounded-2xl border border-brand-border bg-white p-8"
      aria-busy
      aria-label="Načítám editor článku"
    >
      <div className="h-8 w-48 bg-slate-200 rounded" />
      <div className="h-4 w-full max-w-md bg-slate-100 rounded" />
      <div className="h-40 w-full bg-slate-100 rounded-xl" />
    </div>
  ),
});

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string; created?: string }>;
};

export default async function EditPostPage({ params, searchParams }: Props) {
  const { id } = await params;
  const sp = await searchParams;
  const flash = sp.saved === "1" ? ("saved" as const) : sp.created === "1" ? ("created" as const) : null;

  const { supabase } = await requireEditor();
  const { data, error } = await supabase
    .from("posts")
    .select(
      "id, slug, title, excerpt, body, category, published, published_at, cover_image_url, seo_title, seo_description, canonical_url, author_id, author_name, reading_time, featured, og_image_url, content_type, distribution_status, promoted_at, newsletter_ready",
    )
    .eq("id", id)
    .maybeSingle();

  if (error || !data) notFound();

  return <PostEditor initial={data as BlogPost} flash={flash} />;
}
