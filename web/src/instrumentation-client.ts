import * as Sentry from "@sentry/nextjs";

// Sentry côté navigateur : erreurs + tracing (chargements de page, navigations, fetch).
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: process.env.NODE_ENV === "development" ? 1.0 : 0.1,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
