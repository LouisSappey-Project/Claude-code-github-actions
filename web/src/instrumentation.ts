import * as Sentry from "@sentry/nextjs";

// Sentry côté serveur (Node.js et Edge) : erreurs + tracing.
// Sans DSN (dev local, CI), le SDK ne fait rien.
export function register() {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    tracesSampleRate: process.env.NODE_ENV === "development" ? 1.0 : 0.1,
  });
}

export const onRequestError = Sentry.captureRequestError;
