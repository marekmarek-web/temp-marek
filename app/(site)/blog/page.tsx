import type { Metadata } from "next";
import Link from "next/link";
import { BlogViewBeacon } from "@/components/analytics/BlogViewBeacon";
import { BlogCoverImage } from "@/components/blog/BlogCoverImage";
import { SubscribeInlineForm } from "@/components/forms/SubscribeInlineForm";
import { cta } from "@/config/cta";
import { fetchPublishedPosts, formatPostDate } from "@/lib/posts";
import { pageOg } from "@/lib/seo/page-meta";
import { getHomeBlogIntro } from "@/lib/site-settings";

export const revalidate = 60;

const title = "Blog";
const description =
  "Texty z praxe: investice, hypotéka, pojištění, penze. Po dočtení máte jasný další krok — konzultace nebo kalkulačka.";

export const metadata: Metadata = {
  title,
  description,
  ...pageOg("/blog", title, description),
};

export default async function BlogPage() {
  const [posts, intro] = await Promise.all([fetchPublishedPosts(), getHomeBlogIntro()]);

  return (
    <main className="main-with-header pt-24 pb-20 lg:pb-28">
      <BlogViewBeacon kind="listing" />
      <div className="max-w-content mx-auto px-4 sm:px-6">
        <h1 className="section-title font-bold text-brand-text mb-4">Blog</h1>
        <p className="text-brand-muted mb-12">{intro}</p>

        {!posts.length ? (
          <div
            className="mb-12 rounded-2xl border border-dashed border-brand-border bg-white/80 px-6 py-12 text-center"
            role="status"
          >
            <p className="text-brand-text font-medium">Zatím zde nejsou žádné publikované články.</p>
            <p className="mt-2 text-sm text-brand-muted">
              Nové texty přibývají průběžně. Potřebujete poradit mezitím osobně?{" "}
              <Link href="/kontakt" className="font-semibold text-brand-navy hover:text-brand-cyan">
                Kontakt
              </Link>
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8 mb-10">
            {posts.map((p) => (
              <Link
                key={p.id}
                href={`/blog/${p.slug}`}
                className="group block rounded-2xl border border-brand-border bg-white overflow-hidden shadow-sm transition-shadow hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan/50 focus-visible:ring-offset-2"
              >
                <BlogCoverImage
                  src={p.cover_image_url}
                  alt=""
                  variant="listing"
                  className="transition-transform duration-500 group-hover:scale-105"
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

        <div id="novinky" className="mb-12 max-w-xl scroll-mt-24">
          <SubscribeInlineForm
            source="blog_listing"
            interestSegment="blog_audience"
            headline="Nechte si posílat nové články"
            description="Jednou za čas — shrnutí tématu z blogu. Kdykoliv se odhlásíte. Marketingový souhlas je dobrovolný."
          />
        </div>

        <div className="flex flex-col gap-6 border-t border-brand-border pt-10 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/kontakt" className="lead-cta-btn inline-flex min-h-[48px] items-center justify-center rounded-xl px-6 py-3 text-sm font-bold text-white no-underline">
            {cta.articleConsultTopic}
          </Link>
          <Link href="/" className="text-brand-navy font-semibold hover:text-brand-cyan sm:ml-auto">
            ← Zpět na úvod
          </Link>
        </div>
      </div>
    </main>
  );
}
