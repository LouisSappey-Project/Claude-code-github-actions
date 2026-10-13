import type { MetadataRoute } from "next";
import { getArticles } from "@/lib/articles";
import { SITE_URL } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getArticles();
  return [
    { url: SITE_URL, lastModified: articles[0]?.date },
    { url: `${SITE_URL}/a-propos` },
    ...articles.map((a) => ({ url: `${SITE_URL}/articles/${a.slug}`, lastModified: a.date })),
  ];
}
