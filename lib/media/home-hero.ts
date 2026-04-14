/**
 * Homepage hero — jeden zdroj, art direction přes responsive object-position.
 * Vertikálně vždy ukotvit nahoru (y = 0 %), aby při object-cover nezmizela hlava na žádném poměru stran.
 * Horizontálně mírně doprava — portrét je v pravé části snímku.
 *
 * Volitelně lze později přepnout na `<picture>` + heromobile.jpg pro odlišný crop na XS.
 */

export const HOME_HERO = {
  src: "/img/hero3.jpg",
  /** Popisný alt (ne jen jméno) */
  alt: "Marek Příbramský při konzultaci — finanční poradce Premium Brokers",
  /**
   * y: 0 % = horní okraj fotky u horního okraje rámu (priorita hlavy). x: jemný posun pod šířku viewportu.
   */
  imageClassName:
    "hero-img-full object-cover max-sm:object-[58%_0%] sm:object-[60%_0%] md:object-[62%_0%] lg:object-[60%_0%] xl:object-[58%_0%] 2xl:object-[56%_0%]",
  sizes: "100vw",
  /** Hero je LCP */
  quality: 82 as const,
  /** Gradient nesmí „sežrat“ obličej — mírnější než full black */
  overlayClassName:
    "hero-overlay pointer-events-none absolute inset-0 z-[2] bg-gradient-to-b from-black/34 via-black/28 to-black/50",
} as const;
