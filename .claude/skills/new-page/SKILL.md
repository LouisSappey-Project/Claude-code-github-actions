---
name: new-page
description: Ajouter une nouvelle page ou route au site Next.js (ex. /a-propos, /contact). Utiliser pour toute nouvelle URL du site.
---

# Ajouter une page

1. **Lis d'abord** la doc Next 16 pertinente dans `web/node_modules/next/dist/docs/` (l'API diffère des versions précédentes).
2. Crée `web/src/app/<route>/page.tsx` :
   - Server Component par défaut. N'ajoute `"use client"` que pour de l'interactivité, et seulement sur le plus petit composant possible.
   - Exporte `metadata` (ou `generateMetadata` si la page dépend de données) avec `title` et `description`, plus `alternates: { canonical: "/<route>" }`.
   - Données : via `src/lib/`, avec `"use cache"`.
3. Ajoute la page au sitemap (`web/src/app/sitemap.ts`) si elle doit être indexée.
4. Ajoute un lien vers la page si elle doit être accessible depuis le site (ex. en-tête dans `layout.tsx`).
5. Tests dans `web/e2e/site.spec.ts` :
   - un test qui ouvre la page et vérifie son `h1` et son `<title>` ;
   - ajoute son chemin à la boucle du test d'accessibilité axe.
6. Lance depuis `web/` : `npm run lint && npm test && npm run build && npm run e2e`. Tout doit passer.
7. Dans la PR, liste les fichiers touchés et colle la ligne de la route dans la sortie du build (`○` = statique).
