import Image from "next/image";
import {
  BLOG_COVER_OBJECT_POSITION_CLASS,
  BLOG_COVER_SIZES_ARTICLE,
  BLOG_COVER_SIZES_BLOG_PAGE,
  BLOG_COVER_SIZES_LISTING,
} from "@/lib/media/blog";
import { BlogCoverPlaceholder } from "@/components/blog/BlogCoverPlaceholder";

type Variant = "listing" | "article" | "home";

type Props = {
  src: string | null;
  /** U detailu článku vždy titulek; u listingu prázdné pokud titulek následuje v odkazu */
  alt: string;
  className?: string;
  variant?: Variant;
  sizes?: string;
  priority?: boolean;
  loading?: "eager" | "lazy";
  /** Tailwind object-position (focal point coveru z CMS) */
  objectPositionClass?: string;
  quality?: number;
};

function sizesForVariant(v: Variant | undefined, override?: string): string {
  if (override) return override;
  if (v === "article") return BLOG_COVER_SIZES_ARTICLE;
  if (v === "home") return BLOG_COVER_SIZES_LISTING;
  return BLOG_COVER_SIZES_BLOG_PAGE;
}

export function BlogCoverImage({
  src,
  alt,
  className = "",
  variant = "listing",
  sizes,
  priority,
  loading,
  objectPositionClass = BLOG_COVER_OBJECT_POSITION_CLASS,
  quality = 78,
}: Props) {
  const resolvedSizes = sizesForVariant(variant, sizes);
  const imgClasses = `object-cover ${objectPositionClass} ${className}`.trim();

  if (!src) {
    return <BlogCoverPlaceholder className={className} />;
  }

  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
      <Image
        src={src}
        alt={alt || " "}
        fill
        className={imgClasses}
        sizes={resolvedSizes}
        priority={priority}
        loading={priority ? undefined : loading ?? "lazy"}
        quality={quality}
      />
    </div>
  );
}
