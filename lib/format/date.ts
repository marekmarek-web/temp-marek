/** České formátování data — bez závislostí na server-only modulech (bezpečné pro client components). */
export function formatPostDate(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("cs-CZ", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
}
