# Symfony/React API

Ce projet a été réalisé par Boutabba AbdelHay, Azzouni Bilele et Ismail Aymane.

- Url du projet Symfony : 

## Démarrage de l'application React

Pour lancer le projet, exécutez la commande suivante :

```bash
npm install

npm start
```

Ensuite, configurez l'URL des requêtes en fonction de l'utilisation d'HTTP ou HTTPS dans le
fichier `./src/function/httpURL.js`. Vous devez simplement ajouter un **`s`** à la constante :

```javascript
export const httpURL = 'https://localhost:8000/api/';
```

# Voir le trigger et la procédure stocker en action

## Trigger
- Crée un utilisateur :  'http://localhost:3000/commandes'
- Créer un produit :  'http://localhost:3000/commandes'
- Créer une commande pour l'utilisateur : 'http://localhost:3000/commandes'
- Créer le detail de la commande : 'http://localhost:3000/detail/commande'

Ensuite aller vérifier que le stock du produit à diminuer de la quantité commandé

## Procédure stocker
Aller sur la vue commande : 'http://localhost:3000/commandes'
Et cliquer sur le bouton **`Voir`**

La réponse provient de l'appelle de notre procédure stocker depuis notr API:

````javascript
// ...
 const response = await fetch(`${url}commande/user/${id}`)
// ...
````
