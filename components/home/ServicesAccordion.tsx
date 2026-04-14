"use client";

import { useCallback, useState } from "react";
import { serviceItems } from "@/components/home/home-data";
import { ServiceCard } from "@/components/home/ServiceCard";

/** Stabilní prefix místo useId() — předejde hydration mismatch SSR vs. klient. */
const SERVICES_ACC_DOM_ID = "home-services-accordion";

export function ServicesAccordion() {
  const baseId = SERVICES_ACC_DOM_ID;
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = useCallback((id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 md:gap-5 lg:gap-6">
      {serviceItems.map((item) => {
        const triggerId = `${baseId}-svc-${item.id}-trigger`;
        const panelId = `${baseId}-svc-${item.id}-panel`;
        const open = openId === item.id;
        return (
          <ServiceCard key={item.id} item={item} open={open} onToggle={() => toggle(item.id)} panelId={panelId} triggerId={triggerId} />
        );
      })}
    </div>
  );
}
