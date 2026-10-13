# Le Média Auto

Site média (conseils pour automobilistes) servant de terrain d'entraînement à un workflow de développement avec agents.

## Structure

- `web/` : le site Next.js 16 + TypeScript. Voir `web/CLAUDE.md` pour ses règles.
- `docs/adr/` : décisions d'architecture. Lis-les avant de remettre en cause un choix.
- `.github/workflows/` : CI (`ci.yml`), review Claude des PR, `@claude` dans les issues/PR.
- `.claude/skills/` : procédures pour les tâches récurrentes (`new-article`, `new-page`).

## Définition de « terminé »

Une tâche n'est terminée que si, depuis `web/`, tout passe :

```bash
npm run lint && npm test && npm run build && npm run e2e
```

Un hook `Stop` relance `lint` et `test` automatiquement : s'il échoue, corrige avant de rendre la main.

## Règles

- Une PR = un sujet. Titre au format Conventional Commits (`feat(web): ...`, `fix(web): ...`).
- Toute nouvelle page ou comportement visible a un test Playwright dans `web/e2e/`.
- Ne jamais pousser sur `main` : tout passe par une PR (la branche est protégée).
- Ne pas ajouter de dépendance sans le justifier dans la description de la PR.
- Code et commentaires : identifiants en anglais, commentaires et textes du site en français.
- En cas de doute sur un choix produit (contenu, design, URL publique), demande plutôt que de deviner.
