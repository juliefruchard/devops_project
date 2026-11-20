# Liste de tâches — React, ESLint, Prettier et CI

[![CI](https://github.com/juliefruchard/devops_project/actions/workflows/ci.yml/badge.svg)](https://github.com/juliefruchard/devops_project/actions/workflows/ci.yml)

Application de liste de tâches réalisée avec React et Vite. Le dépôt inclut des
tests automatisés et un workflow GitHub Actions qui vérifie le formatage, la
qualité du code, les tests et la compilation à chaque push ou pull request.

## Fonctionnalités

- Ajouter une tâche (les espaces autour du texte sont supprimés et une tâche
  vide est ignorée).
- Afficher, cocher et supprimer les tâches.
- Voir le nombre de tâches restantes.
- Conserver la liste dans le `localStorage` du navigateur.

## Prérequis et démarrage

Installer Node.js (version 20.19 ou plus récente, ou 22.12+) et npm, puis
exécuter à la racine du projet :

```bash
npm ci
npm run dev
```

Vite affiche l’adresse locale à ouvrir dans le navigateur, généralement
<http://localhost:5173>.

## Processus mis en place

1. **Créer l’application** avec React et Vite.
2. **Installer les dépendances** avec `npm ci`, qui installe les versions
   exactes du `package-lock.json`.
3. **Vérifier le code** avec ESLint (`npm run lint`) : il signale notamment les
   variables inutilisées, les erreurs de syntaxe et certains problèmes de
   logique ou d’utilisation des hooks React.
4. **Uniformiser la présentation** avec Prettier (`npm run format`). La
   configuration partagée se trouve dans `.prettierrc.json`.
5. **Tester l’application** avec Vitest et Testing Library (`npm test`). Les
   tests couvrent l’ajout, le rejet d’une tâche vide, le compteur, le statut
   terminé, la suppression et la persistance.
6. **Automatiser les vérifications** dans
   `.github/workflows/ci.yml`. GitHub Actions récupère le code, installe Node.js
   et les dépendances, puis vérifie le format, lance ESLint et les tests et
   construit l’application.

Le workflow se déclenche automatiquement sur chaque `push` et chaque pull
request. Une étape en échec rend la vérification rouge; toutes les étapes
réussies rendent la vérification verte.

## Commandes importantes

| Commande               | Utilité                                                     |
| ---------------------- | ----------------------------------------------------------- |
| `npm ci`               | Installer les dépendances depuis le fichier de verrouillage |
| `npm run dev`          | Démarrer le serveur de développement Vite                   |
| `npm run lint`         | Vérifier le code avec ESLint                                |
| `npm run format`       | Formater les fichiers avec Prettier                         |
| `npm run format:check` | Vérifier le format sans modifier les fichiers               |
| `npm test`             | Exécuter les tests une fois avec Vitest                     |
| `npm run build`        | Construire la version de production                         |
| `npm run preview`      | Prévisualiser la version construite                         |

Avant de pousser ses modifications, on peut lancer localement les mêmes
vérifications que la CI :

```bash
npm ci
npm run format:check
npm run lint
npm test
npm run build
```

Pour publier le workflow sur une branche dédiée et ouvrir une pull request :

```bash
git switch -c ajout-ci
git add .github/workflows/ci.yml package.json package-lock.json
git commit -m "Ajoute le pipeline CI"
git push -u origin ajout-ci
```

Après le push, consulter l’onglet **Actions** du dépôt ou les checks de la pull
request. Une pull request peut ensuite être fusionnée lorsque la CI est verte.
La règle qui rend la CI obligatoire avant fusion se configure séparément dans
les paramètres de protection de branche GitHub.

## Notions de lint et d’analyse

- **ESLint** est un linter : il analyse le code source et rapporte des erreurs
  ou des problèmes potentiels (par exemple une variable non utilisée ou une
  règle React non respectée). Il ne cherche pas à imposer une mise en page
  unique.
- **Prettier** est un formateur : il réécrit le code selon des règles de style
  partagées (guillemets, points-virgules, indentation, retours à la ligne).
  Contrairement au linter, son rôle principal est la présentation.
- **L’analyse statique** examine le code sans exécuter l’application. Un outil
  comme **SonarQube** agrège des analyses et des métriques pour signaler des
  bugs possibles, des problèmes de maintenabilité et, selon la configuration,
  des vulnérabilités.
- Le champ `scripts` de `package.json` associe un nom à une commande. Ainsi,
  `npm run lint` exécute la commande définie par le script `lint`; cela rend
  les commandes faciles à partager entre les développeurs et la CI.
- Automatiser les contrôles réduit les oublis, applique les mêmes règles à
  toute l’équipe et fournit un résultat reproductible avant la fusion d’une
  pull request. Cela complète la relecture humaine sans la remplacer.

## Structure utile

```text
.github/workflows/ci.yml  Pipeline GitHub Actions
src/App.jsx               Application React
src/App.test.jsx          Tests de la liste de tâches
eslint.config.js          Configuration ESLint
.prettierrc.json          Configuration Prettier
vite.config.js            Configuration Vite et Vitest
```
