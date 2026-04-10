# Media & obrázky — krátká pravidla

## Kde je „source of truth“

- **Hero (úvod)**: `lib/media/home-hero.ts` — `src`, `alt`, responsive `object-position` (Tailwind třídy), overlay.
- **Penzijní fullscreen hero**: `lib/media/pension-hero.ts`.
- **Blog cover (komponenta)**: `lib/media/blog.ts` — poměr **16:10**, výchozí focal `object-[center_38%]`, `sizes` podle varianty (`listing` / `home` / `article`).
- **Alt šablony**: `lib/media/a11y.ts` (`timelinePhotoAlt`).

## Doporučené poměry

| Kontext | Poměr / poznámka |
|--------|-------------------|
| Blog cover (web) | 16:10 (CSS), zdroj může být libovolný — ořez přes `object-cover` |
| Timeline „Moje cesta“ | 16:10 box, focal per foto v `home-data.ts` (`imagePositionClass`) |
| Hero | Plná šířka, výška z layoutu; crop jen přes `object-position` |

## Hero crop

1. Upravuj **`HOME_HERO.imageClassName`** v `lib/media/home-hero.ts` — jeden soubor, ne třídy přímo v komponentě.
2. Cíl: **obličej / horní třetina** ve „safe“ zóně; text v hero je centrovaný — fotka nesmí tlačit obličej pod příliš silný spodní gradient.
3. **`heromobile.jpg`** v `public/` je kandidát na samostatný mobile crop (druhý `<Image>` nebo `<picture>`) — zatím volitelné; dokumentovat v commitu při nasazení.

## Portréty / timeline

- Každý rok má vlastní **`imagePositionClass`** v `components/home/home-data.ts`.
- Po výměně fotky vždy zkontrolovat **mobil i desktop** (useknutí hlavy, skupinové fotky).
- Alt: používej **`timelinePhotoAlt(title, year)`** v sekci timeline (ne jen holý titulek).

## Blog cover

- V administraci ideálně **min. 1600×1000 px** (16:10) nebo větší; menší soubor Next stejně optimalizuje.
- Bez coveru: **`BlogCoverPlaceholder`** (jemný gradient + logo), ne prázdná šedá dlaždice.
- Detail článku: **`alt={název článku}`** — stejný obsah jako `<h1>` je u obrázku OK pro SR.
- Listing: **`alt=""`**, protože název je v nadpisu karty.

## Naming souborů (`public/`)

- Malá písmena, pomlčky: `hero-main.jpg`, `blog/investice-2025.jpg`.
- Roční fotky v timeline: `2019.jpg` apod. — konzistentní s existující sadou.

## Výkon

- **`priority`** jen u above-the-fold (hero, případně cover článku).
- **`sizes`** vždy u `fill` / responzivních obrázků — šablony v `lib/media/blog.ts` nebo odvozené od layoutu.
- **`quality`**: hero 82, timeline/blog 78 — povolené hodnoty v `next.config.ts` → `images.qualities`.

## Co nedělat

- Nemíchat **externí** `<img>` pro brand ikony (Google) — používat **`GoogleMark`** (`components/ui/GoogleMark.tsx`).
- Nepřidávat **další** pozadí přes `background-image` na stejný motiv jako `next/image` bez důvodu (duplicitní stahování).
- Nevkládat do `alt` marketingové slogany — popis toho, co je na snímku.
