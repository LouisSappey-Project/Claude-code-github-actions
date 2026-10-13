---
name: new-article
description: Ajouter un article au site média. Utiliser quand on demande d'écrire, ajouter ou publier un article.
---

# Ajouter un article

1. Choisis un slug : minuscules, chiffres et tirets uniquement (`^[a-z0-9-]+$`). Sinon le build échoue volontairement.
2. Crée `web/content/articles/<slug>.md` :

   ```markdown
   ---
   title: Titre de l'article
   description: Une phrase de 120 à 160 caractères, reprise dans Google et sur la page d'accueil.
   date: AAAA-MM-JJ
   ---

   Paragraphe d'introduction.

   ## Premier intertitre
   ```

3. Contraintes de contenu :
   - Commence au niveau `##` : le `#` est généré à partir du `title`.
   - Pas de HTML brut dans le Markdown.
   - Tutoiement, ton simple. Pas de chiffre ou de règle légale sans source dans le texte.
4. Vérifie depuis `web/` : `npm test && npm run build`. L'article doit apparaître dans la sortie du build (`○ /articles/<slug>`).
5. Ouvre la PR avec le titre `content: <titre de l'article>`.
