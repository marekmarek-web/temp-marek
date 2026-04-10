"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useConsentOptional } from "@/components/consent/ConsentContext";
import { trackPageview } from "@/lib/analytics/track";

const DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN?.trim();

/**
 * Načte Plausible jen po souhlasu s analytikou. Žádné třetí strany před rozhodnutím.
 */
export function PlausibleAnalytics() {
  const consent = useConsentOptional();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const scriptLoaded = useRef(false);

  useEffect(() => {
    if (!consent?.ready || !consent.analytics || !DOMAIN) return;
    if (scriptLoaded.current) return;
    const s = document.createElement("script");
    s.defer = true;
    s.setAttribute("data-domain", DOMAIN);
    s.src = "https://plausible.io/js/script.js";
    document.head.appendChild(s);
    scriptLoaded.current = true;
  }, [consent?.ready, consent?.analytics]);

  useEffect(() => {
    if (!consent?.ready || !consent.analytics || !DOMAIN) return;
    const path = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");
    const t = window.setTimeout(() => trackPageview(path), 0);
    return () => window.clearTimeout(t);
  }, [consent?.ready, consent?.analytics, pathname, searchParams]);

  return null;
}
