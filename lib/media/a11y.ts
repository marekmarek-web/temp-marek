/** Dekorativní obrázek — prázdný alt, rodič nese význam (nadpis, odkaz). */
export const ALT_DECORATIVE = "";

/** Krátká šablona pro timeline / ilustrační fotku k roku. */
export function timelinePhotoAlt(title: string, year: string): string {
  return `${title} — fotografie z období ${year}`;
}
