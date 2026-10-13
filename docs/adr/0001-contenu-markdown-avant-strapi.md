# 0001 : Contenu en Markdown avant Strapi

**Statut** : accepté, 2026-10-13

## Contexte

Le site cible utilise Strapi comme CMS. Le monter dès le départ (base de données, admin, hébergement) ralentit la mise en place du socle, des tests et de la CI.

## Décision

Les articles sont des fichiers Markdown dans `web/content/articles/`. Un seul module, `web/src/lib/articles.ts`, lit le contenu et expose `getArticles()` / `getArticle()`.

## Conséquences

- Passer à Strapi ne touche que `articles.ts`, les pages ne changent pas.
- Le HTML généré par `marked` n'est pas assaini : acceptable tant que le contenu vient du repo. **À assainir (DOMPurify ou équivalent) avant de brancher Strapi.**
- Un article mal formé (nom de fichier, frontmatter, date) fait échouer le build plutôt que d'être ignoré en silence.
