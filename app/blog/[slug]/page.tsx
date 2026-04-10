import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogCoverImage } from "@/components/blog/BlogCoverImage";
import { BlogMarkdown } from "@/components/blog/BlogMarkdown";
import { fetchAllPostSlugs, fetchPostBySlug, formatPostDate } from "@/lib/posts";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await fetchAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchPostBySlug(slug);
  if (!post) return { title: "Článek" };
  return {
    title: post.title,
    description: post.excerpt ?? undefined,
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = await fetchPostBySlug(slug);
  if (!post) notFound();

  return (
    <main className="main-with-header pt-24 pb-20 lg:pb-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <p className="text-xs font-semibold text-brand-cyan uppercase tracking-wider mb-2">{post.category}</p>
        <h1 className="section-title font-bold text-brand-text mb-2">{post.title}</h1>
        <time className="text-sm text-brand-muted block mb-8">{formatPostDate(post.published_at)}</time>
        {post.cover_image_url ? (
          <div className="rounded-2xl overflow-hidden border border-brand-border mb-10">
            <BlogCoverImage src={post.cover_image_url} alt="" sizes="(max-width:768px) 100vw, 768px" />
          </div>
        ) : null}
        <BlogMarkdown body={post.body} />
        <p className="mt-12">
          <Link href="/blog" className="text-brand-navy font-semibold hover:text-brand-cyan">
            ← Zpět na blog
          </Link>
        </p>
      </div>
    </main>
  );
}
