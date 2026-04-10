import type { Metadata } from "next";
import Link from "next/link";
import { BlogCoverImage } from "@/components/blog/BlogCoverImage";
import { fetchPublishedPosts, formatPostDate } from "@/lib/posts";
import { getHomeBlogIntro } from "@/lib/site-settings";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog",
  description: "Články o financích, investicích a plánování.",
};

export default async function BlogPage() {
  const [posts, intro] = await Promise.all([fetchPublishedPosts(), getHomeBlogIntro()]);

  return (
    <main className="main-with-header pt-24 pb-20 lg:pb-28">
      <div className="max-w-content mx-auto px-4 sm:px-6">
        <h1 className="section-title font-bold text-brand-text mb-4">Blog</h1>
        <p className="text-brand-muted mb-12">{intro}</p>

        {!posts.length ? (
          <p className="text-brand-muted mb-12">Zatím zde nejsou žádné publikované články.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {posts.map((p) => (
              <Link
                key={p.id}
                href={`/blog/${p.slug}`}
                className="group block rounded-2xl border border-brand-border bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <BlogCoverImage
                  src={p.cover_image_url}
                  alt=""
                  className="transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width:768px) 100vw, 33vw"
                />
                <div className="p-5">
                  <span className="text-xs font-semibold text-brand-cyan uppercase tracking-wider">
                    {p.category}
                  </span>
                  <h2 className="text-lg font-bold text-brand-text mt-1 group-hover:text-brand-navy">{p.title}</h2>
                  <p className="text-sm text-brand-muted mt-2">{formatPostDate(p.published_at)}</p>
                </div>
              </Link>
            ))}
          </div>
        )}

        <Link href="/" className="text-brand-navy font-semibold hover:text-brand-cyan">
          ← Zpět na úvod
        </Link>
      </div>
    </main>
  );
}
