@AGENTS.md

## Règles du site

- **Contenu** : `content/articles/*.md`. Seul `src/lib/articles.ts` lit le contenu (il sera branché sur Strapi, voir ADR 0001). Les pages passent par `getArticles()` / `getArticle()`, jamais par `fs` directement.
- **Fonctions qui lisent des données** : `"use cache"` obligatoire (Cache Components activé), sinon le build échoue.
- **Dates** : toujours via `formatDate()` (formatage en UTC, voir ADR 0003).
- **SEO** : chaque page exporte `metadata` ou `generateMetadata` avec `title` et `description`. Les URLs absolues passent par `SITE_URL` (`src/lib/site.ts`), jamais en dur.
- **HTML injecté** (`dangerouslySetInnerHTML`) : seulement pour du contenu du repo ou du JSON-LD avec `<` échappé.
- **Accessibilité** : le test axe de `e2e/site.spec.ts` doit couvrir chaque nouvelle page (ajoute son chemin à la boucle).

## Commandes

- `npm run dev` : serveur de dev sur le port 3000
- `npm test` : tests unitaires (`src/**/*.test.mjs`, node:test)
- `npm run build && npm run e2e` : tests Playwright sur le build de production (port 3100)
