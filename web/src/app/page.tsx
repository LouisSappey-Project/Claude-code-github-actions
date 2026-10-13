import Link from "next/link";
import { formatDate, getArticles } from "@/lib/articles";

export default async function Home() {
  const articles = await getArticles();
  return (
    <>
      <h1 className="mb-6 text-3xl font-bold">Derniers articles</h1>
      <ul className="space-y-6">
        {articles.map((a) => (
          <li key={a.slug}>
            <Link href={`/articles/${a.slug}`} className="text-xl font-semibold hover:underline">
              {a.title}
            </Link>
            <p className="text-zinc-600 dark:text-zinc-400">{a.description}</p>
            <time dateTime={a.date} className="text-sm text-zinc-500">
              {formatDate(a.date)}
            </time>
          </li>
        ))}
      </ul>
    </>
  );
}
