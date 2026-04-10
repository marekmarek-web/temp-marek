import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { PensionFullscreenHero } from "@/components/calculators/portal/pension/PensionFullscreenHero";
import { PensionSectionIntro } from "@/components/calculators/portal/pension/PensionSectionIntro";

const PensionCalculatorPage = dynamic(
  () =>
    import("@/components/calculators/portal/pension/PensionCalculatorPage").then(
      (m) => m.PensionCalculatorPage
    ),
  {
    loading: () => (
      <div className="flex min-h-[50vh] items-center justify-center text-brand-muted">
        Načítám kalkulačku…
      </div>
    ),
  }
);

export const metadata: Metadata = {
  title: "Penzijní kalkulačka",
  description: "Odhad důchodu, mezery k cílové rentě a potřebné spoření.",
};

export default function PenzijniKalkulackaPage() {
  return (
    <main className="main-with-header min-h-screen bg-brand-light pb-16 pt-24">
      <PensionFullscreenHero />
      <section
        id="kalkulacka"
        className="relative scroll-mt-28 overflow-hidden py-16 md:py-24"
      >
        <div
          className="pointer-events-none absolute -right-40 -top-40 h-[800px] w-[800px] rounded-full bg-brand-light opacity-50 blur-3xl"
          aria-hidden
        />
        <div className="relative z-10 mx-auto max-w-[1200px] px-4">
          <PensionSectionIntro />
          <PensionCalculatorPage />
        </div>
      </section>
    </main>
  );
}
