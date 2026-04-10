import type { Metadata } from "next";
import dynamic from "next/dynamic";

const LifeCalculatorPage = dynamic(
  () =>
    import("@/components/calculators/portal/life/LifeCalculatorPage").then((m) => m.LifeCalculatorPage),
  {
    loading: () => (
      <div className="flex min-h-[50vh] items-center justify-center text-brand-muted">
        Načítám kalkulačku…
      </div>
    ),
  }
);

export const metadata: Metadata = {
  title: "Kalkulačka životního pojištění",
  description: "Orientační výpočet potřebného krytí podle příjmů a závazků.",
};

export default function ZivotniKalkulackaPage() {
  return (
    <main className="main-with-header pt-24 pb-16 bg-[#f4f6fb] min-h-screen">
      <div className="max-w-[1200px] mx-auto px-4">
        <LifeCalculatorPage />
      </div>
    </main>
  );
}
