import type { CalculatorLeadBody } from "@/lib/validation/calculatorLeadSchema";

/** Minimální platný lead z kalkulačky (JSON stejný jako POST /api/leads). */
export const validCalculatorLeadBody: CalculatorLeadBody = {
  source: "calculator",
  calculatorType: "pension",
  name: "Test User",
  email: "test@example.com",
  phone: "+420601234567",
  sourcePath: "/penzijnikalkulacka",
  resultSummary: "summary",
  metadata: { foo: "bar" },
  formOpenedAt: Date.now() - 5_000,
};
