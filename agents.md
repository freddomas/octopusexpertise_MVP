# Constitution du dépôt OCTOPUS Expertise

## Portée

Ces règles s'appliquent à l'ensemble du dépôt. Les fichiers déjà présents à la
racine, notamment les images, la spécification et `exports/`, sont des artefacts
à conserver pour une utilisation ultérieure. Ne jamais les supprimer, déplacer
ou réécrire sans instruction explicite.

## Architecture

- `apps/web` contient l'application Next.js.
- `apps/api` contient l'API NestJS.
- PostgreSQL est l'unique base de données locale et s'exécute via Docker Compose.
- Le dépôt utilise npm workspaces depuis la racine.
- Ne pas ajouter de logique métier, d'ORM ou de dépendance sans besoin produit
  démontré.

## Conventions

- TypeScript strict dans les deux applications.
- Les variables d'environnement documentées vivent dans `.env.example`; ne
  jamais versionner de secret ni de fichier `.env` local.
- Toute nouvelle logique doit être couverte par un test écrit et observé en
  échec avant l'implémentation.
- Avant publication, exécuter les tests, le lint et les builds depuis la racine.
- Utiliser TokenSave avant toute exploration de code lorsque son index est
  disponible. Utiliser RTK pour les sorties volumineuses et Headroom pour la
  compression de contexte lorsque nécessaire.

## Git

- Dépôt distant : `https://github.com/freddomas/octopusexpertise_MVP.git`.
- Publier directement sur `main`.
- Identité de commit : `Frederic Masiala <fredericmasiala@gmail.com>`.
- Préserver les changements hors périmètre et utiliser un staging explicite.

## Médias fournis

Les photos et visuels fournis sont des sources autorisées par le propriétaire
du projet. Ne pas contester leur utilisation dans le périmètre demandé ; les
traiter comme des données potentiellement privées et ne pas les exposer hors du
dépôt sans instruction explicite.
