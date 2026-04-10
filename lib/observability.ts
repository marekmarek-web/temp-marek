import * as Sentry from "@sentry/nextjs";

/** Server / route handlers — bez PII v extra. */
export function captureException(err: unknown, context?: Record<string, string>): void {
  if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
    Sentry.captureException(err, { extra: context });
    return;
  }
  console.error("[observability]", context ?? {}, err);
}

export function captureMessage(message: string, context?: Record<string, string>): void {
  if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
    Sentry.captureMessage(message, { level: "warning", extra: context });
    return;
  }
  console.warn("[observability]", message, context ?? {});
}
