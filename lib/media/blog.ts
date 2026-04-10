/**
 * Blog cover — jednotné poměry a sizes pro next/image.
 * Cover z CMS může mít různé zdrojové rozměry; prezentace je vždy 16:10.
 */

export const BLOG_COVER_ASPECT_CLASS = "aspect-[16/10]";

/** Listing: homepage sekce + /blog grid */
export const BLOG_COVER_SIZES_LISTING = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";

/** Listing stránka /blog — širší sloupec */
export const BLOG_COVER_SIZES_BLOG_PAGE = "(max-width: 768px) 100vw, 33vw";

/** Detail článku — max šířka obsahu */
export const BLOG_COVER_SIZES_ARTICLE = "(max-width: 768px) 100vw, 768px";

/** Výchozí focal point pro cover (hlava / motiv často nahoře) */
export const BLOG_COVER_OBJECT_POSITION_CLASS = "object-[center_38%]";
