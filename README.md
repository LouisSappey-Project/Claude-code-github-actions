# Claude Code GitHub Actions

Mentionne `@claude` dans une PR ou une issue. Chaque PR reçoit une review automatique.

## Setup

1. Install the Claude GitHub app.
2. Add the `CLAUDE_CODE_OAUTH_TOKEN` secret.
3. Open a pull request.

## Site média (`web/`)

Next.js 16 + TypeScript. Les articles sont des fichiers Markdown dans `web/content/articles/`.

```bash
cd web
npm install
npm run dev   # http://localhost:3000
```

Vérifications (lancées aussi par la CI sur chaque PR) :

```bash
npm run lint
npm test                      # tests unitaires (node:test)
npm run build && npm run e2e  # tests Playwright : parcours, SEO, accessibilité
```

## Travailler avec un agent

- `CLAUDE.md` (racine et `web/`) : conventions et définition de « terminé », lues par Claude Code.
- `.claude/skills/` : procédures `new-article` et `new-page`.
- `.claude/hooks/check.sh` : l'agent ne peut pas terminer si lint ou tests unitaires échouent.
- `docs/adr/` : décisions d'architecture.
- Dans une issue ou une PR, écris `@claude <demande>` : Claude implémente sur une branche dans GitHub Actions.

## Versioning

Automatique avec release-please (`docs/adr/0004-versioning-automatique.md`) : les commits `feat:` / `fix:` / `content:` alimentent une PR de release. La merger crée le tag `vX.Y.Z`, la Release GitHub et met à jour `CHANGELOG.md`.
