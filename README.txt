========================================
  DATE ROMANTIQUE - README
========================================

CONTENU DU DOSSIER
-------------------
- index.html   : la page du site (à ouvrir dans un navigateur)
- style.css    : le design (rose, blanc, animations, responsive)
- script.js    : toute la logique (bouton NON qui fuit, formulaire, EmailJS)
- README.txt   : ce fichier

COMMENT UTILISER LE SITE
--------------------------
1. Extraire le ZIP.
2. Ouvrir le fichier "index.html" avec un double-clic (ça s'ouvre dans
   ton navigateur : Chrome, Safari, etc.)
3. C'est tout, le site fonctionne directement, aucune installation
   n'est nécessaire.

Pour l'envoyer à ta copine, deux options simples :
- Héberger le dossier sur un service gratuit comme Netlify, Vercel ou
  GitHub Pages (glisser-déposer le dossier suffit sur Netlify Drop :
  https://app.netlify.com/drop), puis lui envoyer le lien.
- Ou lui envoyer directement le fichier index.html (avec style.css et
  script.js à côté) si vous êtes sur le même téléphone/ordinateur.

CONFIGURATION EMAILJS DÉJÀ EN PLACE
-------------------------------------
Le site est déjà configuré avec :
- Public Key   : hT9KB3hjI2a4XS4U
- Service ID   : service_1xzgh5v
- Template ID  : template_4bhs946

Le template EmailJS doit contenir les variables suivantes (déjà
utilisées dans le code) :
{{date}}
{{time}}
{{message}}

FONCTIONNEMENT
----------------
1. Page 1 : "Tu veux sortir avec moi ?" avec un bouton OUI et un
   bouton NON qui s'échappe dès qu'on essaie de le toucher/cliquer
   (fonctionne au doigt sur mobile et à la souris sur ordinateur).
2. Après avoir cliqué sur OUI : un formulaire apparaît pour choisir
   une date, une heure et écrire un message optionnel.
3. Une fois le formulaire validé, EmailJS envoie automatiquement un
   email récapitulatif à syphaxharbane64@gmail.com.
4. Si l'envoi réussit : une page de confirmation romantique s'affiche
   avec le récapitulatif du choix.
5. Si l'envoi échoue (pas de connexion, erreur EmailJS, etc.) : un
   message d'erreur clair s'affiche et on peut réessayer.

PERSONNALISATION
-------------------
- Les textes peuvent être modifiés directement dans index.html.
- Les couleurs peuvent être changées dans style.css (variables tout en
  haut du fichier, section ":root").
- Le nombre de cœurs flottants en arrière-plan est réglable dans
  script.js (variable "count" dans la fonction createFloatingHearts).

DÉPLOYER SUR GITHUB PAGES (recommandé)
------------------------------------------
1. Va sur https://github.com et crée un nouveau repository (public),
   par exemple nommé "date-romantique".
2. Sur la page du repository, clique sur "Add file" > "Upload files".
3. Glisse les 4 fichiers du dossier (index.html, style.css, script.js,
   README.txt) puis clique sur "Commit changes".
4. Va dans "Settings" (en haut du repo) > "Pages" (menu de gauche).
5. Dans "Branch", choisis "main" et le dossier "/ (root)", puis
   clique sur "Save".
6. Après 1-2 minutes, GitHub affiche l'URL de ton site, du type :
   https://ton-pseudo.github.io/date-romantique/
7. Ouvre cette URL : ton site est en ligne, tu peux envoyer ce lien.

SI "L'ENVOI A ÉCHOUÉ" S'AFFICHE
-----------------------------------
Ce message vient d'EmailJS qui refuse la requête. Deux réglages à
vérifier sur https://dashboard.emailjs.com :

1. Account > Security > "API Settings"
   → Décoche "Use Private Key (recommended)" puis clique sur
   "Save Changes". Une Private Key ne doit jamais être utilisée
   depuis un site (frontend) ; seule la Public Key doit l'être.

2. Account > Security > "Domains"
   → Ajoute l'adresse exacte de ton site dans le champ "Domain"
   (ex: https://ton-pseudo.github.io) et appuie sur Entrée, puis
   clique sur "Save Changes".
   → Pour tester rapidement sans te soucier du domaine, tu peux
   temporairement mettre "*" (autorise tous les domaines), puis
   remplacer par ton vrai domaine une fois que ça fonctionne.

Une fois ces deux réglages faits, réessaie d'envoyer le formulaire.
Le message d'erreur affichera aussi un code d'erreur EmailJS entre
parenthèses (ex: "code 403") qui aide à identifier la cause exacte.
Tu peux aussi ouvrir la console du navigateur (F12 sur ordinateur,
ou l'inspecteur sur mobile) pour voir le détail complet de l'erreur.

Bonne chance pour la demande ! ❤️
