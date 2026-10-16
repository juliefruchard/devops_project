# devops_project

# Ma liste de tâches

Petit projet d’apprentissage réalisé avec React et Vite.

## Où écrire le code ?

- `src/App.jsx` : le composant principal. C’est ici que se trouvent l’affichage
  et les actions de la liste (ajouter et supprimer une tâche).
- `src/App.css` : les styles de la liste et de son formulaire.
- `src/index.css` : les styles généraux de la page (police, fond, boutons).
- `src/main.jsx` : démarre React et affiche le composant `App`. Tu n’as
  normalement pas besoin de le modifier pour ajouter une fonctionnalité.
- `index.html` : la page HTML qui accueille l’application.
- `package.json` : les dépendances et les commandes du projet.
- `vite.config.js` : la configuration de Vite.

Les tâches sont gardées en mémoire : elles disparaissent si tu actualises la
page. C’est volontaire pour garder ce point de départ simple.

## Démarrer le projet

```sh
npm install
npm run dev
```

Ouvre ensuite l’adresse indiquée dans le terminal. Pour commencer, modifie le
titre dans `src/App.jsx` ou ajoute une fonctionnalité à la liste.

## Commandes utiles

```sh
npm run build
npm run lint
```