import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { formatDate, getArticle, getArticles } from "@/lib/articles";
import { SITE_URL } from "@/lib/site";

export async function generateStaticParams() {
  return (await getArticles()).map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/articles/[slug]">): Promise<Metadata> {
  const article = await getArticle((await params).slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/articles/${article.slug}` },
    openGraph: { type: "article", title: article.title, description: article.description, publishedTime: article.date },
  };
}

export default async function ArticlePage({ params }: PageProps<"/articles/[slug]">) {
  const article = await getArticle((await params).slug);
  if (!article) notFound();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    url: `${SITE_URL}/articles/${article.slug}`,
  };
  return (
    <article>
      <script
        type="application/ld+json"
        // "<" échappé pour qu'un titre ne puisse pas fermer la balise <script>
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <h1 className="mb-2 text-3xl font-bold">{article.title}</h1>
      <time dateTime={article.date} className="text-sm text-zinc-500">
        {formatDate(article.date)}
      </time>
      {/* contenu écrit par nous (fichiers du repo) : à assainir quand il viendra de Strapi */}
      <div className="prose mt-6" dangerouslySetInnerHTML={{ __html: article.html }} />
    </article>
  );
}
