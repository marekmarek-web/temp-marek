import Image from "next/image";
import Link from "next/link";
import { fetchPublishedPosts, formatPostDate } from "@/lib/posts";
import { getHomeBlogIntro } from "@/lib/site-settings";

function HomePostThumb({ src, title }: { src: string | null; title: string }) {
  if (!src) {
    return <div className="w-full h-full min-h-[200px] bg-slate-200" aria-hidden />;
  }
  return (
    <Image
      src={src}
      alt={title}
      fill
      className="object-cover transition-transform duration-500 group-hover:scale-105 blog-img"
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
    />
  );
}

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
                  <div className="relative aspect-[16/10] overflow-hidden bg-brand-border/50">
                    <HomePostThumb src={p.cover_image_url} title={p.title} />
                    <div className="blog-hover absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/30 to-transparent opacity-0 transition-opacity duration-500 flex items-end p-6 pointer-events-none">
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
      </div>
    </section>
  );
}
