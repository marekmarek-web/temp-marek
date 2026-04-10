/** Vercel / Node — pro bezpečné zjednodušení chyb v produkci. */
export function isProductionRuntime(): boolean {
  return process.env.NODE_ENV === "production";
}
