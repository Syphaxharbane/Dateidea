# 💕 Notre petit date — configuration

Ton adresse de réception est déjà enregistrée dans `config.js` :
`syphaxharbane64@gmail.com`

## Ce que je ne peux pas faire à ta place

Je ne peux pas créer/connecter ton compte EmailJS ni récupérer tes identifiants privés depuis ton compte. EmailJS nécessite un **Public Key**, un **Service ID** et un **Template ID** pour appeler `emailjs.send()`. La documentation officielle confirme que ces valeurs viennent du tableau de bord EmailJS.

## À faire une seule fois

1. Ouvre EmailJS et crée/connecte ton compte.
2. Ajoute ton service e-mail.
3. Crée un template.
4. Mets comme destinataire du template :
   `syphaxharbane64@gmail.com`
5. Utilise les variables :
   `{{date}}`, `{{time}}`, `{{place}}`, `{{message}}`, `{{submitted_at}}`
6. Copie tes trois identifiants dans `config.js`.

Le reste du site est déjà prêt.
