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

Bonne chance pour la demande ! ❤️
