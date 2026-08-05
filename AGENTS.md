# Constitution du dépôt OCTOPUS Expertise

## Portée

Ces règles s'appliquent à l'ensemble du dépôt. Les fichiers déjà présents à la
racine, notamment les images, la spécification et `exports/`, sont des artefacts
à conserver pour une utilisation ultérieure. Ne jamais les supprimer, déplacer
ou réécrire sans instruction explicite.

## Règle Always_Best

Dans tout le dépôt, vérifier la cohérence de chaque demande et rechercher une
solution sensiblement meilleure avant d'appliquer la première idée. Proposer la
meilleure option ; l'appliquer directement si elle respecte l'objectif, le
périmètre et les risques autorisés. Éviter toute complexité sans bénéfice
démontré. Cette règle s'impose à tout `AGENTS.md` imbriqué.

## Architecture

- `apps/web` contient l'application Next.js.
- `apps/api` contient l'API NestJS.
- PostgreSQL est l'unique base de données locale et s'exécute via Docker Compose.
- Le dépôt utilise npm workspaces depuis la racine.
- Ne pas ajouter de logique métier, d'ORM ou de dépendance sans besoin produit
  démontré.

## Conventions

- TypeScript strict dans les deux applications.
- `AGENTS.md` et les fichiers d'instructions aux agents sont des configurations
  techniques soumises au mode CAVEMAN, jamais des livrables ou de la documentation.
- Les variables d'environnement documentées vivent dans `.env.example`; ne
  jamais versionner de secret ni de fichier `.env` local.
- Toute nouvelle logique doit être couverte par un test écrit et observé en
  échec avant l'implémentation.
- Avant publication, exécuter les tests, le lint et les builds depuis la racine.
- Utiliser TokenSave avant toute exploration de code lorsque son index est
  disponible. Utiliser RTK pour les sorties volumineuses et Headroom pour la
  compression de contexte lorsque nécessaire.

## Outillage et délestage

- En cours de run, déporter le travail du LLM vers un script ou un outil lorsque
  le gain net de fiabilité, de vitesse ou de consommation de contexte est réel.
- Privilégier les solutions existantes, maintenues et éprouvées ; vérifier leur
  provenance, leur sécurité et leur adéquation avant tout téléchargement autorisé.
- À défaut, créer à la volée un outil minimal, ciblé et réutilisable si utile.
- Écarter tout outil dont l'intégration ou l'exécution coûte plus que le travail économisé.

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

## Multi-agent

- Réserver le multi-agent aux tâches indépendantes, précises, ponctuelles et bornées,
  notamment l'indexation sémantique de documents.
- Ne jamais l'utiliser par défaut ni pour une tâche efficace dans le fil principal.

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

When the user types `/graphify`, use the installed graphify skill or instructions before doing anything else.

Rules:

- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- Dirty graphify-out/ files are expected after hooks or incremental updates; dirty graph files are not a reason to skip graphify. Only skip graphify if the task is about stale or incorrect graph output, or the user explicitly says not to use it.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
- Keep `graphify save-result` and `graphify reflect` memory outside the repository and outside the main graph.
- After a full rebuild, preserve the explicit `compose.yaml` provenance node until Graphify supports YAML structurally.
- Do not add `graphify hook-check` to `.codex/hooks.json`; Git hooks and these instructions provide the project integration.
