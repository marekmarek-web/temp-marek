# Changelog — assety a vizuální konzistence (tento běh)

## Upravené / nové soubory

### Konfigurace (`lib/media/`)

- `home-hero.ts` — hero HP: alt, responsive `object-position`, mírnější overlay, `quality` 82.
- `pension-hero.ts` — penzijní fullscreen: focal point, `quality` 78.
- `blog.ts` — poměr coveru, `sizes` pro listing / blog page / článek, výchozí `object-position`.
- `a11y.ts` — `timelinePhotoAlt`.
- `index.ts` — re-export.

### Komponenty

- `components/blog/BlogCoverImage.tsx` — varianty, `quality`, sdílené `sizes`, placeholder při chybějícím coveru.
- `components/blog/BlogCoverPlaceholder.tsx` — brand náhrada místo šedého boxu.
- `components/ui/GoogleMark.tsx` — sdílené barevné „G“ (HP recenze + kalkulačky).
- `HeroHomeSection.tsx` — čte `HOME_HERO` z `lib/media`.
- `HomeTailSections.tsx` — timeline alt přes `timelinePhotoAlt`, `quality` 78, bento fotky: `sizes`, `quality`, srozumitelnější alt.
- `home-data.ts` — jemná úprava `imagePositionClass` u milníků.
- `HomeBlogSection.tsx` — `BlogCoverImage` místo ručního `Image`.
- `ReviewsMarquee.tsx` — `GoogleMark` místo duplicitního inline SVG.
- `CalculatorGoogleReviewBadge.tsx` — `GoogleMark`, bez Wikimedia `img`.
- `CalculatorMarketingHero.tsx` — `sizes` na vodoznak logo.
- `PensionFullscreenHero.tsx` — konfigurace z `pension-hero.ts`.
- `ServiceCard.tsx` — stroke ikon služeb **2** (soulad s ostatními outline ikonami).
- `app/(site)/blog/[slug]/page.tsx` — cover: `alt={post.title}`, `variant="article"`.
- `app/(site)/blog/page.tsx` — `variant="listing"`, odstranění duplicitního `sizes` (řeší komponenta).

### Konfigurace Next

- `next.config.ts` — `images.qualities: [75, 78, 82]` pro použité `quality` hodnoty.

### Dokumentace

- `docs/asset-visual-audit.md`, `docs/media-guidelines.md`, tento changelog.

## Co je vizuálně lepší

- Stabilnější **hero** (focal + overlay), konzistentnější **blog cover** včetně prázdného stavu.
- **Timeline** a **bento** — lepší cropy na papíře + srozumitelné alt texty.
- Jednotný **Google mark** napříč recenzemi a kalkulačkami.

## Co je technicky optimalizované

- `sizes` u bento a vodoznaku; `quality` u hero, timeline, blog cover; explicitní `qualities` v configu.

## Doporučení na později (profesionální refresh)

- Fotoset **hero** (mobile + desktop art direction) od fotografa.
- Sjednotit **styl** timeline fotek (světlo, pozadí).
- Zvážit **WebP** export u nových uploadů + kontrola váhy souborů v `public/`.
