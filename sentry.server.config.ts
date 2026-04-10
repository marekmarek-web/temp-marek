import * as Sentry from "@sentry/nextjs";

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
  dsn: dsn || undefined,
  enabled: Boolean(dsn),
  tracesSampleRate: 0.08,
  environment: process.env.NODE_ENV,
  beforeSend(event) {
    if (event.request?.data && typeof event.request.data === "string") {
      const s = event.request.data;
      if (s.length > 5000) event.request.data = "[truncated]";
    }
    return event;
  },
});
