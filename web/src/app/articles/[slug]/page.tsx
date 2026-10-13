import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticle, getArticles } from "@/lib/articles";

export async function generateStaticParams() {
  return (await getArticles()).map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/articles/[slug]">): Promise<Metadata> {
  const article = await getArticle((await params).slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    openGraph: { type: "article", title: article.title, description: article.description, publishedTime: article.date },
  };
}

export default async function ArticlePage({ params }: PageProps<"/articles/[slug]">) {
  const article = await getArticle((await params).slug);
  if (!article) notFound();
  return (
    <article>
      <h1 className="mb-2 text-3xl font-bold">{article.title}</h1>
      <time dateTime={article.date} className="text-sm text-zinc-500">
        {new Date(article.date).toLocaleDateString("fr-FR", { dateStyle: "long" })}
      </time>
      {/* contenu écrit par nous (fichiers du repo) : à assainir quand il viendra de Strapi */}
      <div className="prose mt-6" dangerouslySetInnerHTML={{ __html: article.html }} />
    </article>
  );
}
