# 0003 : Dates formatées en UTC

**Statut** : accepté, 2026-10-13

## Contexte

Les dates des articles (`2026-09-15`) sont lues en UTC par `new Date()`. Formatées dans le fuseau de la machine de build, elles reculent d'un jour dans un fuseau en retard sur UTC. Les pages étant générées au build, c'est le fuseau du build qui compte, pas celui du serveur.

## Décision

Toute date affichée passe par `formatDate()` (`web/src/lib/articles.ts`), qui formate avec `timeZone: "UTC"`. La CI fait le build en fuseau `America/Los_Angeles` pour qu'une régression fasse échouer le test Playwright.
