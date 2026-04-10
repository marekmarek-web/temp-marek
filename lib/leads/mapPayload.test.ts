import { describe, expect, it } from "vitest";
import type { CalculatorLeadBody } from "@/lib/validation/calculatorLeadSchema";
import { inferLeadCategory, mapSourcePayloadToTypes, payloadToLeadRow } from "./mapPayload";

describe("mapSourcePayloadToTypes", () => {
  it("maps calculator source", () => {
    expect(mapSourcePayloadToTypes("calculator")).toEqual({
      sourceType: "calculator",
      rawSource: "calculator",
    });
  });

  it("maps article_cta to article source_type", () => {
    expect(mapSourcePayloadToTypes("article_cta")).toEqual({
      sourceType: "article",
      rawSource: "article_cta",
    });
  });
});

describe("inferLeadCategory", () => {
  it("uses calculatorType when set", () => {
    const body = { source: "calculator" as const, calculatorType: "mortgage" as const };
    expect(inferLeadCategory(body as CalculatorLeadBody)).toBe("mortgage");
  });

  it("infers from topic keywords when not overridden by source", () => {
    const body = {
      source: "homepage_consultation" as const,
      name: "x",
      email: "a@b.cz",
      topic: "Chci investice",
    };
    expect(inferLeadCategory(body as CalculatorLeadBody)).toBe("investment");
  });
});

describe("payloadToLeadRow", () => {
  it("normalizes email and sets lead row fields", () => {
    const body: CalculatorLeadBody = {
      source: "calculator",
      calculatorType: "pension",
      name: "  Jan Novák  ",
      email: "  Jan@Example.com  ",
      phone: "+420 601 234 567",
      resultSummary: "  ok  ",
      metadata: { k: "v" },
      formOpenedAt: Date.now() - 10_000,
    };
    const row = payloadToLeadRow(body, {});
    expect(row.email).toBe("jan@example.com");
    expect(row.name).toBe("Jan Novák");
    expect(row.lead_category).toBe("pension");
    expect(row.source_type).toBe("calculator");
    expect(row.result_summary).toBe("ok");
    expect(row.metadata).toEqual({ k: "v" });
    expect(row.phone_normalized).toMatch(/\d/);
  });
});
