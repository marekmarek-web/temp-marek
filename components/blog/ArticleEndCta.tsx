"use client";

import Link from "next/link";
import { cta } from "@/config/cta";
import { AnalyticsEvents } from "@/lib/analytics/events";
import { track } from "@/lib/analytics/track";

type Props = { articleSlug: string };

/** Editorial CTA pod článkem — primary konzultace, secondary nástroje. */
export function ArticleEndCta({ articleSlug }: Props) {
  return (
    <aside className="mt-14 rounded-2xl border border-brand-border bg-gradient-to-br from-brand-background via-white to-brand-background/90 px-6 py-8 sm:px-8">
      <p className="text-xs font-bold uppercase tracking-wider text-brand-cyan">Další krok</p>
      <h2 className="mt-2 text-xl font-bold text-brand-text sm:text-2xl">Chcete to probrat v souvislostech?</h2>
      <p className="mt-3 text-sm leading-relaxed text-brand-muted sm:text-base">
        Článek shrnuje téma — vaše čísla a priority jsou vždy individuální. Ozvěte se na nezávaznou konzultaci, nebo si
        nejdřív udělejte orientaci v kalkulačkách; obojí bez tlaku na konkrétní produkt.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Link
          href="/kontakt"
          className="lead-cta-btn inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl px-6 py-3 text-center text-sm font-bold text-white no-underline transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan/50 focus-visible:ring-offset-2"
          onClick={() =>
            track(AnalyticsEvents.articleCtaClick, { cta_id: "article_end_consult", slug: articleSlug.slice(0, 80) })
          }
        >
          {cta.articleConsultTopic}
        </Link>
        <Link
          href="/kalkulacky"
          className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border-2 border-brand-navy bg-white px-6 py-3 text-center text-sm font-semibold text-brand-navy no-underline transition hover:bg-brand-navy/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan/50 focus-visible:ring-offset-2"
          onClick={() =>
            track(AnalyticsEvents.articleCtaClick, { cta_id: "article_end_calculators", slug: articleSlug.slice(0, 80) })
          }
        >
          {cta.articleSeeCalculators}
        </Link>
      </div>
    </aside>
  );
}
