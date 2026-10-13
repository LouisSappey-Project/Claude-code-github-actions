# 0004 : Versioning automatique avec release-please

**Statut** : accepté, 2026-10-13

## Contexte

Les commits suivent déjà Conventional Commits. `main` est protégée : pas de push direct, tout passe par une PR avec la CI verte.

## Décision

[release-please](https://github.com/googleapis/release-please-action) (`.github/workflows/release.yml`) :

1. À chaque push sur `main`, il ouvre ou met à jour une **PR de release** : nouvelle version dans `.release-please-manifest.json` et `web/package.json`, `CHANGELOG.md`.
2. Quand on merge cette PR, il crée le tag `vX.Y.Z` et la Release GitHub.

### Règles par type de commit

| Type | Usage | Section du changelog | Version avant 1.0.0 | Version après 1.0.0 |
|---|---|---|---|---|
| `feat:` | nouvelle fonctionnalité | Nouveautés | mineure | mineure |
| `fix:` | correction de bug | Corrections | patch | patch |
| `content:` | article ou contenu éditorial | Contenu | patch | patch |
| `perf:` | amélioration de performance | Performances | patch | patch |
| `revert:` | annulation d'un commit | Retours en arrière | patch | patch |
| `docs:` | documentation (README, ADR, CLAUDE.md) | masqué | aucun effet | aucun effet |
| `ci:` | workflows GitHub Actions | masqué | aucun effet | aucun effet |
| `test:` | tests uniquement | masqué | aucun effet | aucun effet |
| `chore:` | maintenance (dépendances, config) | masqué | aucun effet | aucun effet |
| `<type>!:` ou `BREAKING CHANGE:` | changement cassant (URLs d'articles, page supprimée…) | selon le type | mineure | majeure |

- Une release prend le changement le plus fort de ses commits : 3 `fix` + 1 `feat` → mineure.
- Un type masqué seul n'ouvre pas de PR de release.
- Un commit sans type valide (`wip`, `fix typo`) est ignoré : il n'apparaît nulle part.
- Passer en 1.0.0 est volontaire : commit vide avec `Release-As: 1.0.0` dans le message.
- Source de vérité : `release-please-config.json` (`changelog-sections`, `bump-minor-pre-major`).

Écarté : **semantic-release**, qui publie en poussant sur `main`, ce que la protection de branche interdit.

## Conséquences

- Publier une version = merger une PR : la décision reste humaine.
- Un commit mal formaté n'apparaît pas dans le changelog : la règle est rappelée aux agents dans `CLAUDE.md`.
- release-please utilise un token personnel (`RELEASE_PLEASE_TOKEN`) : avec le `GITHUB_TOKEN`, la CI ne se déclencherait pas sur sa PR et le check obligatoire `web` la bloquerait.
