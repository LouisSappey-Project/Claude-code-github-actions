# Le Média Auto

Site média (conseils pour automobilistes) servant de terrain d'entraînement à un workflow de développement avec agents.

## Structure

- `web/` : le site Next.js 16 + TypeScript. Voir `web/CLAUDE.md` pour ses règles.
- `docs/adr/` : décisions d'architecture. Lis-les avant de remettre en cause un choix.
- `.github/workflows/` : CI (`ci.yml`), review Claude des PR, `@claude` dans les issues/PR.
- `.claude/skills/` : procédures pour les tâches récurrentes (`new-article`, `new-page`).

## Définition de « terminé »

Une tâche n'est terminée que si ces quatre commandes passent, lancées une par une depuis `web/` :

```bash
npm run lint
npm test
npm run build
npm run e2e
```

Un hook `Stop` relance `lint` et `test` automatiquement : s'il échoue, corrige avant de rendre la main.

Lance chaque commande seule (une par appel, sans `&&`, `;` ni `|`) : une commande composée est refusée en entier si une seule de ses parties n'est pas autorisée. Crée et modifie les fichiers avec tes outils d'édition, pas avec `cat >` ou `sed`.

## Règles

- Une PR = un sujet. **Chaque commit** au format Conventional Commits (`feat(web): ...`, `fix(web): ...`, `content: ...` pour un article) : les PR sont mergées en rebase, donc ce sont les commits qui alimentent le versioning.
- Versioning automatique (release-please) : `feat` → mineure, `fix`/`content`/`perf` → patch, `!` → majeure, `docs`/`ci`/`test`/`chore` → aucun effet. Tableau complet dans `docs/adr/0004-versioning-automatique.md`. Ne modifie jamais `CHANGELOG.md`, `.release-please-manifest.json` ni le champ `version` de `web/package.json` à la main.
- Toute nouvelle page ou comportement visible a un test Playwright dans `web/e2e/`.
- Ne jamais pousser sur `main` : tout passe par une PR (la branche est protégée).
- Dans GitHub Actions (`@claude`), quand la tâche est terminée, ouvre la PR toi-même avec `gh pr create`, avec `Closes #<numéro de l'issue>` dans la description.
- Ne pas ajouter de dépendance sans le justifier dans la description de la PR.
- Code et commentaires : identifiants en anglais, commentaires et textes du site en français.
- En cas de doute sur un choix produit (contenu, design, URL publique), demande plutôt que de deviner.
