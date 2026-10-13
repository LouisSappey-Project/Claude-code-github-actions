import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs/config";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

// Upload des source maps si SENTRY_AUTH_TOKEN, SENTRY_ORG et SENTRY_PROJECT sont définis
// (lus directement dans l'environnement par le plugin Sentry).
export default withSentryConfig(nextConfig, {
  widenClientFileUpload: true,
  silent: !process.env.CI,
});
