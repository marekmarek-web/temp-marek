"use client";

import { useEffect, useRef } from "react";
import { AnalyticsEvents } from "@/lib/analytics/events";
import { track } from "@/lib/analytics/track";

type Props =
  | { kind: "listing" }
  | { kind: "article"; slug: string };

export function BlogViewBeacon(props: Props) {
  const fired = useRef(false);
  const kind = props.kind;
  const slug = props.kind === "article" ? props.slug : "";

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    if (kind === "listing") {
      track(AnalyticsEvents.blogListingView);
    } else {
      track(AnalyticsEvents.articleView, { slug: slug.slice(0, 80) });
    }
  }, [kind, slug]);

  return null;
}
