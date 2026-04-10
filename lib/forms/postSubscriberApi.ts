"use client";

import { getAttributionMetadataStrings } from "@/lib/analytics/attribution";
import { AnalyticsEvents } from "@/lib/analytics/events";
import { track } from "@/lib/analytics/track";
import { isPublicApiOk, publicApiErrorCode } from "@/lib/forms/public-json";
import type { SubscriberBody } from "@/lib/validation/subscriberSchema";

export type PostSubscriberResult =
  | { ok: true; subscriberId?: string | null }
  | { ok: false; error: string };

type ApiJson = { ok?: boolean; subscriberId?: string | null; error?: string };

function mergeAttribution(body: SubscriberBody): SubscriberBody {
  const attr = getAttributionMetadataStrings();
  if (Object.keys(attr).length === 0) return body;
  return {
    ...body,
    metadata: { ...attr, ...(body.metadata ?? {}) },
  };
}

export async function postSubscriberJson(body: SubscriberBody): Promise<PostSubscriberResult> {
  const merged = mergeAttribution(body);
  const res = await fetch("/api/subscribers", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(merged),
  });
  const data = (await res.json().catch(() => ({}))) as ApiJson;

  if (res.ok && isPublicApiOk(data)) {
    track(AnalyticsEvents.subscribeSubmitSuccess, {
      source: String(merged.source).slice(0, 48),
      segment: String(merged.interestSegment ?? "general_updates").slice(0, 32),
    });
    return { ok: true, subscriberId: data.subscriberId ?? null };
  }

  const code = publicApiErrorCode(data);
  track(AnalyticsEvents.subscribeSubmitError, { source: String(merged.source).slice(0, 48), error: code.slice(0, 40) });
  return { ok: false, error: code };
}
