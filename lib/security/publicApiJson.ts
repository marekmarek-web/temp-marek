import { NextResponse } from "next/server";
import type { ZodError } from "zod";
import { isProductionRuntime } from "./isProduction";

/** Veřejné API: v produkci nevracet detail Zod issue (informace pro útočníka). */
export function jsonValidationError(zodError: ZodError): NextResponse {
  if (!isProductionRuntime()) {
    return NextResponse.json({ ok: false, error: "validation", issues: zodError.flatten() }, { status: 400 });
  }
  return NextResponse.json({ ok: false, error: "validation" }, { status: 400 });
}
