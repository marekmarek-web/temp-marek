"use client";

import { useEffect } from "react";
import { captureSessionAttribution } from "@/lib/analytics/attribution";

/** Uloží UTM + landing path do sessionStorage (jednou za session). */
export function AttributionCapture() {
  useEffect(() => {
    captureSessionAttribution();
  }, []);
  return null;
}
