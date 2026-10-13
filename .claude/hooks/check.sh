#!/usr/bin/env bash
# Hook Stop : empêche l'agent de rendre la main si lint ou tests unitaires échouent (backpressure).
# Build et e2e sont trop lents pour chaque tour : la CI s'en charge.
input=$(cat)
# ponytail: un seul essai de correction par tour, pour éviter une boucle infinie si l'erreur est hors de portée
if grep -Eq '"stop_hook_active" *: *true' <<<"$input"; then exit 0; fi
cd "$(git rev-parse --show-toplevel)/web" || exit 0  # pas de web/ : rien à vérifier

# Rien de modifié dans web/ : rien à vérifier.
if git diff --quiet HEAD -- . && [ -z "$(git ls-files --others --exclude-standard .)" ]; then exit 0; fi
[ -d node_modules ] || { echo "web/node_modules absent : lance npm ci dans web/" >&2; exit 2; }

if ! out=$(npm run lint --silent 2>&1 && npm test --silent 2>&1); then
  echo "Lint ou tests unitaires en échec, corrige avant de terminer :" >&2
  tail -60 <<<"$out" >&2
  exit 2
fi
