# 0002 : Les tests décident, la review IA conseille

**Statut** : accepté, 2026-10-13

## Contexte

Une partie croissante du code est écrite par des agents. Sur les PR #2 et #3, la review Claude a trouvé de vrais bugs (crash sur un fichier mal nommé, date décalée d'un jour) mais a aussi affirmé deux choses fausses qu'elle n'avait pas vérifiées (un style « sans effet », un test « qui devrait échouer »).

## Décision

Trois niveaux de garde-fous, du plus rapide au plus fiable :

1. **Hook `Stop`** (`.claude/hooks/check.sh`) : l'agent ne peut pas rendre la main si le lint ou les tests unitaires échouent.
2. **CI bloquante** (`ci.yml`, check `web` obligatoire sur `main`) : lint, tests unitaires, build avec TypeScript, Playwright (parcours, SEO, accessibilité axe).
3. **Review Claude** sur chaque PR : **consultative**. Chaque remarque est vérifiée avant d'être appliquée. Elle ne peut ni approuver ni bloquer une PR.

Un test n'est considéré utile qu'après l'avoir vu échouer sur le bug qu'il doit attraper.

## Conséquences

- La confiance dans le code vient des tests, pas de qui l'a écrit.
- La review IA ne compte pas comme approbation : la décision de merger reste humaine.
