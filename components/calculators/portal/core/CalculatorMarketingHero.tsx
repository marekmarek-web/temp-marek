"use client";

import Image from "next/image";
import type { ReactNode } from "react";

export interface CalculatorMarketingHeroProps {
  children: ReactNode;
  /** Right column, e.g. Google review badge */
  badge?: ReactNode;
  /** Match životní kalkulačka HTML (`overflow-visible`) */
  overflow?: "hidden" | "visible";
  /** Plnobarevné logo ve vodoznaku (na světlém pozadí); HTML používá no-bg — obě varianty jsou v public/img/logos */
  watermarkSrc?: string;
  className?: string;
}

export function CalculatorMarketingHero({
  children,
  badge,
  overflow = "hidden",
  watermarkSrc = "/img/logos/pb-logo.png",
  className = "",
}: CalculatorMarketingHeroProps) {
  const overflowCls = overflow === "visible" ? "overflow-visible" : "overflow-hidden";

  return (
    <div
      className={`relative mb-10 rounded-3xl border border-brand-line/60 bg-brand-light p-8 shadow-xl md:p-12 ${overflowCls} ${className}`.trim()}
    >
      <div
        className={`pointer-events-none absolute inset-0 select-none rounded-3xl ${overflow === "visible" ? "overflow-visible" : "overflow-hidden"}`}
        aria-hidden
      >
        <Image
          src={watermarkSrc}
          alt=""
          width={512}
          height={512}
          className="absolute -bottom-24 -right-24 h-auto w-[32rem] max-w-[58%] opacity-20"
          priority={false}
        />
      </div>
      <div className="relative z-10 flex flex-col items-start justify-between gap-8 lg:flex-row">
        <div className="min-w-0 flex-1">{children}</div>
        {badge ? <div className="flex w-full shrink-0 flex-col gap-3 lg:w-auto">{badge}</div> : null}
      </div>
    </div>
  );
}
