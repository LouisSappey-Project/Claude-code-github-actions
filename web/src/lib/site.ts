// URL publique du site, utilisée pour le sitemap, les URLs canoniques et le JSON-LD.
// Ordre : SITE_URL explicite > domaine de production fourni par Vercel > localhost en dev.
export const SITE_URL =
  process.env.SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");
