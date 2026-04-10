import * as Sentry from "@sentry/nextjs";
import type { ErrorEvent } from "@sentry/core";

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
  dsn: dsn || undefined,
  enabled: Boolean(dsn),
  tracesSampleRate: 0.08,
  replaysSessionSampleRate: 0,
  replaysOnErrorSampleRate: 0,
  environment: process.env.NODE_ENV,
  beforeSend(event) {
    return scrubSentryEvent(event);
  },
});

function scrubSentryEvent(event: ErrorEvent): ErrorEvent | null {
  if (event.request?.cookies) delete event.request.cookies;
  if (event.user) {
    event.user = { id: event.user.id };
  }
  return event;
}
