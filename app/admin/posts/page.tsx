import Link from "next/link";
import { DeletePostButton } from "@/components/admin/DeletePostButton";
import { requireEditor } from "@/lib/admin/require-editor";
import { POST_DISTRIBUTION_LABELS } from "@/lib/content/distribution";
import { formatPostDate } from "@/lib/posts";

type Search = { deleted?: string };

export default async function AdminPostsPage({ searchParams }: { searchParams: Promise<Search> }) {
  const sp = await searchParams;
  const { supabase } = await requireEditor();
  const { data: posts, error } = await supabase
    .from("posts")
    .select("id, slug, title, published, published_at, updated_at, category, author_name, distribution_status, newsletter_ready")
    .order("updated_at", { ascending: false });

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-900" role="alert">
        <p className="font-semibold">Články se nepodařilo načíst</p>
        <p className="mt-1 text-red-800/90">
          Zkuste obnovit stránku. Pokud problém přetrvává, jde zřejmě o oprávnění k databázi nebo o rozšíření schématu.
        </p>
        <p className="mt-2 font-mono text-xs opacity-80">{error.message}</p>
      </div>
    );
  }

  return (
    <div>
      {sp.deleted === "1" ? (
        <p
          role="status"
          className="mb-6 text-sm text-green-900 rounded-xl bg-green-50 border border-green-200 px-4 py-3"
        >
          Článek byl odstraněn z webu i z administrace.
        </p>
      ) : null}

      <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-brand-text">Články</h1>
          <p className="text-sm text-brand-muted mt-1">Koncepty, publikované texty a stav distribuce.</p>
        </div>
        <Link
          href="/admin/posts/new"
          className="inline-flex items-center py-3 px-5 rounded-xl bg-brand-navy text-white font-semibold text-sm hover:bg-brand-navy/90 focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:ring-offset-2"
        >
          Nový článek
        </Link>
      </div>
      {!posts?.length ? (
        <div className="rounded-2xl border border-dashed border-brand-border bg-white/60 px-6 py-10 text-center">
          <p className="text-brand-text font-semibold">Zatím tu nejsou žádné články</p>
          <p className="text-sm text-brand-muted mt-2 max-w-md mx-auto">
            Vytvořte první článek tlačítkem výše. Po uložení ho najdete v tomto seznamu a můžete ho publikovat.
          </p>
          <Link
            href="/admin/posts/new"
            className="inline-flex mt-6 items-center py-2.5 px-5 rounded-xl border-2 border-brand-navy text-brand-navy font-semibold text-sm hover:bg-brand-navy/5"
          >
            Vytvořit článek
          </Link>
        </div>
      ) : (
        <ul className="space-y-3">
          {posts.map((p) => (
            <li
              key={p.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-brand-border bg-white p-4 shadow-sm"
            >
              <div className="min-w-0 flex-1">
                <Link
                  href={`/admin/posts/${p.id}/edit`}
                  className="font-semibold text-brand-navy hover:text-brand-cyan"
                >
                  {p.title}
                </Link>
                <p className="text-xs text-brand-muted mt-1">
                  /blog/{p.slug} · {p.category || "—"} ·{" "}
                  {p.published ? <span className="text-green-700">publikováno</span> : <span>koncept</span>}
                  {p.published_at ? ` · publ. ${formatPostDate(p.published_at)}` : null}
                  {p.updated_at ? ` · upr. ${formatPostDate(p.updated_at)}` : null}
                  {p.author_name ? ` · ${p.author_name}` : ""}
                  {p.published && p.distribution_status && p.distribution_status !== "none" ? (
                    <span className="ml-2 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-brand-navy">
                      {POST_DISTRIBUTION_LABELS[(p.distribution_status as keyof typeof POST_DISTRIBUTION_LABELS) ?? "none"]}
                    </span>
                  ) : null}
                  {p.newsletter_ready ? (
                    <span className="ml-2 rounded-full bg-cyan-50 px-2 py-0.5 text-[10px] font-medium text-brand-navy">
                      newsletter
                    </span>
                  ) : null}
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <Link
                  href={`/blog/${p.slug}`}
                  className="text-xs font-semibold text-brand-muted hover:text-brand-cyan rounded px-1 focus:outline-none focus:ring-2 focus:ring-brand-cyan"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Veřejný náhled
                </Link>
                <DeletePostButton postId={p.id} title={p.title} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
