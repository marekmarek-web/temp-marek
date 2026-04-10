/** Normalizace pro deduplikaci a konzistenci. */

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

/** Čísla jen, včetně country code kde je +420 */
export function normalizePhone(phone: string | undefined | null): string {
  if (!phone?.trim()) return "";
  return phone.replace(/\s+/g, "").replace(/^00/, "+");
}
