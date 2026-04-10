/**
 * Homepage hero — jeden zdroj, art direction přes responsive object-position.
 * Bezpečná zóna: text je uprostřed / dole; focal směřuje k horní třetině u portrétu.
 *
 * Volitelně lze později přepnout na `<picture>` + heromobile.jpg pro odlišný crop na XS.
 */

export const HOME_HERO = {
  src: "/img/hero3.jpg",
  /** Popisný alt (ne jen jméno) */
  alt: "Marek Příbramský při konzultaci — finanční poradce Premium Brokers",
  /**
   * Mobile: více centrovat obličej; desktop: mírně vlevo od středu kvůli kompozici snímku.
   */
  imageClassName:
    "hero-img-full object-cover object-[52%_26%] max-sm:object-[50%_28%] sm:object-[48%_22%] md:object-[46%_18%] lg:object-[44%_16%] xl:object-[42%_14%] 2xl:object-[40%_13%]",
  sizes: "100vw",
  /** Hero je LCP */
  quality: 82 as const,
  /** Gradient nesmí „sežrat“ obličej — mírnější než full black */
  overlayClassName:
    "hero-overlay pointer-events-none absolute inset-0 z-[2] bg-gradient-to-b from-black/34 via-black/28 to-black/50",
} as const;
