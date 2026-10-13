# 0004 : Versioning automatique avec release-please

**Statut** : accepté, 2026-10-13

## Contexte

Les commits suivent déjà Conventional Commits. `main` est protégée : pas de push direct, tout passe par une PR avec la CI verte.

## Décision

[release-please](https://github.com/googleapis/release-please-action) (`.github/workflows/release.yml`) :

1. À chaque push sur `main`, il ouvre ou met à jour une **PR de release** : nouvelle version, `CHANGELOG.md`, `version.txt`, `version` de `web/package.json`.
2. Quand on merge cette PR, il crée le tag `vX.Y.Z` et la Release GitHub.

| Commit | Avant 1.0.0 | Après 1.0.0 |
|---|---|---|
| `fix:`, `content:` | patch | patch |
| `feat:` | mineure | mineure |
| `feat!:` / `BREAKING CHANGE:` | mineure | majeure |

Écarté : **semantic-release**, qui publie en poussant sur `main`, ce que la protection de branche interdit.

## Conséquences

- Publier une version = merger une PR : la décision reste humaine.
- Un commit mal formaté n'apparaît pas dans le changelog : la règle est rappelée aux agents dans `CLAUDE.md`.
- release-please utilise un token personnel (`RELEASE_PLEASE_TOKEN`) : avec le `GITHUB_TOKEN`, la CI ne se déclencherait pas sur sa PR et le check obligatoire `web` la bloquerait.
