import Link from "next/link";
import { BlogCoverImage } from "@/components/blog/BlogCoverImage";
import { cta } from "@/config/cta";
import { fetchPublishedPosts, formatPostDate } from "@/lib/posts";
import { getHomeBlogIntro } from "@/lib/site-settings";

/** Statická náhrada při načítání (stejná mřížka jako ostrá sekce). */
export function HomeBlogSectionFallback() {
  return (
    <section id="blog" className="py-20 lg:py-28 bg-white">
      <div className="max-w-content mx-auto px-4 sm:px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="section-title font-bold text-brand-text mb-4">Blog</h2>
          <p className="text-brand-muted max-w-2xl mx-auto text-lg">Načítám články…</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-2xl border border-brand-border bg-brand-background overflow-hidden animate-pulse"
            >
              <div className="aspect-[16/10] bg-slate-200" />
              <div className="p-6 space-y-2">
                <div className="h-3 bg-slate-200 rounded w-1/4" />
                <div className="h-5 bg-slate-200 rounded w-3/4" />
                <div className="h-3 bg-slate-200 rounded w-1/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export async function HomeBlogSection() {
  const [posts, intro] = await Promise.all([fetchPublishedPosts(3), getHomeBlogIntro()]);

  return (
    <section id="blog" className="py-20 lg:py-28 bg-white">
      <div className="max-w-content mx-auto px-4 sm:px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="section-title font-bold text-brand-text mb-4">Blog</h2>
          <p className="text-brand-muted max-w-2xl mx-auto text-lg">{intro}</p>
        </div>
        {!posts.length ? (
          <p className="text-center text-brand-muted">Brzy přidáme nové články.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((p) => (
              <article key={p.id} className="animate-fade-in-up group">
                <Link href={`/blog/${p.slug}`} className="block rounded-2xl overflow-hidden border border-brand-border bg-brand-background">
                  <div className="relative w-full overflow-hidden bg-brand-border/50">
                    <BlogCoverImage
                      src={p.cover_image_url}
                      alt=""
                      variant="home"
                      className="transition-transform duration-500 group-hover:scale-105 blog-img"
                    />
                    <div className="blog-hover pointer-events-none absolute inset-0 z-[1] flex items-end bg-gradient-to-t from-brand-navy/90 via-brand-navy/30 to-transparent p-6 opacity-0 transition-opacity duration-500">
                      <span className="text-white font-semibold">Číst článek</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <span className="text-xs text-brand-cyan font-semibold uppercase">{p.category}</span>
                    <h3 className="text-lg font-bold text-brand-text mt-1 mb-2">{p.title}</h3>
                    <time className="text-sm text-brand-muted">{formatPostDate(p.published_at)}</time>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full border-2 border-brand-navy px-6 py-3 text-sm font-semibold text-brand-navy transition-colors hover:bg-brand-navy hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan/50 focus-visible:ring-offset-2"
          >
            {cta.blogSeeAll}
          </Link>
          <Link
            href="/kontakt"
            className="text-sm font-semibold text-brand-navy underline-offset-4 hover:text-brand-cyan hover:underline"
          >
            Nebo rovnou {cta.articleConsultTopic.toLowerCase()}
          </Link>
        </div>
      </div>
    </section>
  );
}
