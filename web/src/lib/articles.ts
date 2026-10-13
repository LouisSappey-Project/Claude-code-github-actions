import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { marked } from "marked";

// Seul module qui connaît la source du contenu : remplacer par des appels Strapi plus tard.
const DIR = path.join(process.cwd(), "content/articles");

export type Article = {
  slug: string;
  title: string;
  description: string;
  date: string;
  html: string;
};

// ponytail: frontmatter "clé: valeur" sur une ligne uniquement, passer à un vrai parser YAML si besoin de listes
export function parse(slug: string, raw: string): Article {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) throw new Error(`Frontmatter manquant : ${slug}`);
  const meta = Object.fromEntries(
    match[1].split("\n").map((line) => {
      const i = line.indexOf(":");
      return [line.slice(0, i).trim(), line.slice(i + 1).trim()];
    }),
  );
  for (const key of ["title", "description", "date"]) {
    if (!meta[key]) throw new Error(`Champ "${key}" manquant : ${slug}`);
  }
  return {
    slug,
    title: meta.title,
    description: meta.description,
    date: meta.date,
    html: marked.parse(match[2], { async: false }),
  };
}

export async function getArticle(slug: string): Promise<Article | null> {
  "use cache";
  // le slug vient de l'URL : on bloque "../" et compagnie
  if (!/^[a-z0-9-]+$/.test(slug)) return null;
  try {
    return parse(slug, await readFile(path.join(DIR, `${slug}.md`), "utf8"));
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw e;
  }
}

export async function getArticles(): Promise<Article[]> {
  "use cache";
  const files = (await readdir(DIR)).filter((f) => f.endsWith(".md"));
  const articles = await Promise.all(files.map((f) => getArticle(f.slice(0, -3))));
  return (articles as Article[]).sort((a, b) => b.date.localeCompare(a.date));
}
