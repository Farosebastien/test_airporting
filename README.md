# Script pour le test technique AIRPORTING 

## Récupération du projet

Cloner à partir de ce [repository GIT](https://github.com/Farosebastien/test_airporting.git)

-----------------

### Installation

1. Dans le terminal, se placer dans le dossier racine du projet.
2. Lancer la commande `npm install`.
3. Créer un fichier `.env` à la racine projet et y entrer les informations de connexion en les complétant:
    * EMAIL=""
    * PASSWORD=""
    * CLIENT_ID=""
    * CLIENT_SECRET=""
    * BRIDGE_VERSION=""

### Exécution

Lancer la commande `npm start`.

Les informations récupérées sont automatiquement stockées dans le fichier `userInfos.json`.

### Tests

Lancer la commande `npm test` pour effectué les tests jest.