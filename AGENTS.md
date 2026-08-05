# Constitution du dépôt OCTOPUS Expertise

## Portée

Ces règles s'appliquent à l'ensemble du dépôt. Les fichiers déjà présents à la
racine, notamment les images, la spécification et `exports/`, sont des artefacts
à conserver pour une utilisation ultérieure. Ne jamais les supprimer, déplacer
ou réécrire sans instruction explicite.

## Fiabilité agentique — Always_Best

- Vérifier toute prémisse matérielle dans l’état courant avant d’agir ; mémoire,
  index, graphe et plan ne sont que des pistes.
- Distinguer fait observé, inférence et information non vérifiée ; ne jamais
  baser une mutation sur cette dernière.
- Ne retenter une opération échouée qu’après une preuve nouvelle ou un
  changement pertinent. Après deux échecs identiques, diagnostiquer et changer
  d’approche.
- Ne lancer qu’une validation complète par état du worktree ; la relancer après
  un changement pertinent ou dans un environnement différent.
- Ne déclarer une réussite qu’avec une preuve fraîche et proportionnée.
- Choisir la solution sensiblement meilleure et la plus simple ; outil ou
  sous-agent uniquement avec gain démontré et tâche indépendante. Cette règle
  s’impose à tout `AGENTS.md` imbriqué.

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
- Toute nouvelle frontière HTTP, base de données ou parcours utilisateur doit
  recevoir le test de contrat, d'intégration ou de parcours adapté lorsqu'elle
  apparaît.
- Avant toute publication, exécuter `npm run verify` depuis la racine. Aucun
  contrôle partiel ne remplace ce gate.
- Utiliser TokenSave avant toute exploration de code lorsque son index est
  disponible. Utiliser RTK pour les sorties volumineuses et Headroom pour la
  compression de contexte lorsque nécessaire.

## Routage automatique des skills

- Avant toute tâche non triviale pouvant bénéficier d'une skill, encoder la
  demande exacte en Base64 UTF-8 hors du shell, puis exécuter
  `npm run skills:route -- --task-base64 <base64> --json`.
- Ne jamais interpoler directement le texte utilisateur dans la commande.
- Un skill explicitement demandé par l'utilisateur prime sur l'inférence.
- Pour chaque entrée `resolved` disponible, lire le `SKILL.md` complet en mode
  `full`, ou uniquement le fichier retourné en mode `fragment`, avant d'agir.
- Un fragment ne remplace pas la lecture complète d'une skill déclenchée par
  ailleurs.
- Appliquer la route primaire puis les fragments transversaux, sans checkpoint
  de routine. En confiance basse, comparer les métadonnées exposées et ne
  charger que la correspondance claire.
- Ne jamais installer un skill absent sans demande explicite.

## Git

- Dépôt distant : `https://github.com/freddomas/octopusexpertise_MVP.git`.
- Travailler sur une branche dédiée et publier par pull request vers `main`.
- Fusionner uniquement après réussite du check requis `verify` sur le SHA de la
  pull request.
- Après fusion, vérifier `verify` sur le SHA final de `main`.
- Identité de commit : `Frederic Masiala <fredericmasiala@gmail.com>`.
- Préserver les changements hors périmètre et utiliser un staging explicite.

## Médias fournis

Les photos et visuels fournis sont des sources autorisées par le propriétaire
du projet. Ne pas contester leur utilisation dans le périmètre demandé ; les
traiter comme des données potentiellement privées et ne pas les exposer hors du
dépôt sans instruction explicite.

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
