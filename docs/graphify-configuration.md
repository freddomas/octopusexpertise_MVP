# Configuration Graphify recommandée

## Statut

Cette page décrit la configuration cible de Graphify pour OCTOPUS Expertise.
Elle constitue une décision d'architecture documentée, mais n'est pas encore
appliquée au dépôt.

Version de référence : Graphify 0.9.32.

## Objectifs

Le graphe principal doit :

- représenter l'application et ses dépendances utiles ;
- rester déterministe et actualisable sans service LLM ;
- éviter que les artefacts conservés dans `exports/` dominent les requêtes ;
- inclure la structure des documents canoniques utiles au projet ;
- limiter les sorties générées, le bruit Git et le risque d'exposition de
  données internes.

L'audit initial a mesuré 2 512 nœuds et 6 318 arêtes, dont 91,32 % des nœuds
provenaient de `exports/`. Le graphe pesait environ 3,99 Mo et son benchmark
atteignait 11,0× de réduction de tokens.

La première simulation à 218 nœuds, 221 arêtes et 25,9× ne couvrait que le code
restant après exclusion de `exports/`. Elle ne représentait pas le corpus cible
complet. La simulation corrigée inclut les documents canoniques et exclut la
mémoire de requête : 26 sources, 359 nœuds, 359 arêtes finales, environ 310 Ko et
19,6× de réduction. Cette valeur proche de 20× est la référence réaliste. Le
benchmark reste un indicateur directionnel et ne remplace pas les tests de
pertinence des requêtes.

Graphify 0.9.32 détecte `compose.yaml`, mais son extracteur structurel ne prend
pas en charge l'extension `.yaml` et ne produit aucun nœud pour cette source.
La simulation à 359 nœuds comptait donc 26 sources détectées, mais seulement 25
sources représentées. La configuration appliquée ajoute un unique nœud de
provenance pour `compose.yaml`, sans inventer d'arête : la cible effective est
de 360 nœuds et 359 arêtes finales.

## Architecture cible

### Graphe principal

Le graphe principal est la source de navigation courante pour Codex. Il
contient :

- le code de `apps/api` et `apps/web` ;
- les manifestes et configurations techniques utiles du monorepo ;
- `AGENTS.md` ;
- `README.md` ;
- `OCTOPUS_EXPERTISE_WEBSITE_BUILD_SPEC_RESTRUCTUREE.md` ;
- `compose.yaml` ;
- `docs/graphify-configuration.md`.

Le code et la structure des documents compatibles sont extraits de manière
déterministe. Aucune extraction sémantique LLM n'est requise pour entretenir ce
graphe.

### Mémoire de travail hors corpus

Avec Graphify 0.9.32, `graphify-out/memory/` est réintroduit volontairement dans
le scan même lorsque `/graphify-out/` figure dans `.graphifyignore`. Les deux
résultats actuellement présents ajouteraient 10 nœuds au graphe cible.

Le graphe principal n'utilise donc pas `graphify save-result` ni `graphify
reflect` avec leur répertoire par défaut. Une éventuelle mémoire de travail doit
être désactivée ou écrite dans un répertoire local situé hors de la racine du
dépôt. Les résultats existants doivent être archivés hors du dépôt avant la
reconstruction ; cette opération ne doit jamais supprimer automatiquement un
historique.

### Couche sémantique facultative

L'enrichissement sémantique de documents n'appartient pas au graphe principal
tant qu'un contrôle de fraîcheur n'est pas automatisé. Il peut être produit à
la demande dans une sortie séparée pour une analyse produit ponctuelle.

Une couche sémantique ne peut devenir permanente que si son processus :

- limite explicitement la liste des documents autorisés ;
- conserve une empreinte de chaque source indexée ;
- détecte toute source modifiée depuis la dernière extraction ;
- refuse de présenter comme actuelle une extraction devenue obsolète.

Les images fournies ne sont pas indexées sémantiquement par défaut.

## Exclusions Graphify

La configuration cible ajoute un fichier `.graphifyignore` à la racine :

```gitignore
/exports/
/.codex/
/docs/superpowers/
/graphify-out/
/logo octopusexpertise.png
/mockup octopus expertise.png
```

Ces règles excluent uniquement les fichiers du corpus Graphify. Elles ne
suppriment, ne déplacent et ne modifient aucun artefact du dépôt.

L'exclusion `/graphify-out/` couvre les sorties ordinaires, mais pas l'exception
interne `graphify-out/memory/` de Graphify 0.9.32. La politique de mémoire hors
corpus reste donc obligatoire.

Tout nouveau répertoire documentaire volumineux doit être évalué avant son
entrée dans le graphe principal. Les documents historiques, les outils
embarqués et les médias restent hors corpus sauf besoin démontré.

## Reconstruction initiale

Après création de `.graphifyignore`, la réduction du graphe est intentionnelle.
La protection contre les diminutions doit donc être contournée une seule fois
avec `--force` :

```bash
graphify update . --force --no-cluster
graphify diagnose multigraph --graph graphify-out/graph.json --undirected
jq 'if any(.nodes[]; .id == "compose_yaml") then . else .nodes += [{"id":"compose_yaml","label":"compose.yaml","file_type":"document","source_file":"compose.yaml","source_location":"L1","confidence":"EXTRACTED"}] end' graphify-out/graph.json > graphify-out/graph.json.tmp
mv graphify-out/graph.json.tmp graphify-out/graph.json
graphify cluster-only . --no-viz --no-label
graphify diagnose multigraph --graph graphify-out/graph.json
graphify benchmark graphify-out/graph.json
graphify hook status
```

Le premier diagnostic s'exécute sur la sortie brute, avant que la construction
du graphe ne puisse écarter des arêtes invalides. La simulation cible a trouvé
23 imports vers des dépendances externes sans nœud destination. Ils doivent
rester inventoriés comme limite connue ; ils ne constituent pas des relations
internes manquantes. Le second diagnostic valide l'artefact final.

L'ajout du nœud `compose.yaml` intervient après le diagnostic brut et avant le
clustering. Il est idempotent, ne contient aucune donnée dérivée du contenu et
doit être repris par le futur bootstrap tant que Graphify ne prend pas en charge
YAML nativement.

`--force` n'est pas une option de maintenance courante. Elle est réservée à une
réduction volontaire et vérifiée du corpus.

Le nommage des communautés intervient seulement après stabilisation du corpus.
Les noms automatiques ne sont pas une condition de validité du graphe.

## Maintenance courante

Après une modification de code ou d'un document structurel inclus :

```bash
graphify update .
```

Les hooks `post-commit` et `post-checkout` constituent une sauvegarde locale,
pas la preuve qu'un graphe est immédiatement à jour. Ils sont installés dans
`.git/hooks` et doivent être réinstallés dans chaque nouveau clone.

Aucun watcher persistant n'est requis. Les reconstructions des hooks sont
lancées en arrière-plan. La réduction du corpus diminue leur coût, mais une
commande manuelle suivie d'un commit peut encore provoquer un second scan sans
changement de topologie.

Le hook Codex `graphify hook-check` ne doit pas être conservé dans
`.codex/hooks.json` avec Graphify 0.9.32. Il est volontairement inactif et ajoute
environ 0,08 à 0,10 seconde à chaque commande Bash. Le routage est déjà assuré
par `AGENTS.md` et le skill local. Une installation générique de Graphify peut
recréer cette entrée ; le bootstrap doit retirer uniquement l'entrée Graphify
sans toucher aux autres hooks Codex.

Une future commande de bootstrap du dépôt devra vérifier au minimum :

- la version de Graphify ;
- la présence du skill local et des instructions dans `AGENTS.md` ;
- l'absence de l'entrée `graphify hook-check` dans `.codex/hooks.json` ;
- `graphify-out/.graphify_python` ;
- `graphify-out/.graphify_root` ;
- l'installation des hooks Git ;
- l'absence de sources interdites dans `graph.json` ;
- l'absence de mémoire de requête dans le corpus principal.

`graphify install --project --platform codex` est réservé à une installation ou
mise à niveau contrôlée. Il ne doit pas être rejoué par défaut à chaque
bootstrap, car il recrée le hook Codex inactif.

## Politique de requête

Les requêtes doivent partir du graphe et rester ciblées :

```bash
graphify query "<question>"
graphify query "<question>" --context call
graphify query "<question>" --context import
graphify affected "<nœud>"
graphify path "<origine>" "<destination>"
graphify explain "<nœud>"
graphify god-nodes
```

- `query` sert à obtenir le contexte proche dans les deux directions ;
- `--context call` limite l'analyse aux appels ;
- `--context import` limite l'analyse aux dépendances ;
- `affected` effectue une traversée inverse d'impact ;
- `path` cherche une relation entre deux concepts ;
- `explain` détaille un nœud précis.

Une requête générale sans contexte n'est utilisée que pour l'orientation. Une
analyse d'appel ou d'impact doit employer le filtre ou la commande spécialisée
correspondante.

Le résultat d'une requête n'est pas réinjecté automatiquement dans le graphe
principal. Si une boucle de retour devient utile, elle doit utiliser un
répertoire de mémoire hors du dépôt et faire l'objet d'un contrôle de fraîcheur
séparé.

## Graphe dirigé

Le graphe principal peut rester non dirigé avec Graphify 0.9.32. Aucun groupe
d'arêtes de mêmes extrémités n'a été effondré dans les mesures courantes. Les 23
arêtes rejetées par la construction cible sont des imports externes sans nœud
destination, pas une conséquence du stockage non dirigé. Les commandes
`affected`, `path` et `explain` exploitent la direction conservée dans les
attributs des arêtes valides.

Un stockage dirigé ne devient nécessaire que si un consommateur externe lit
directement `graph.json` et exige un `DiGraph`. Ce besoin doit être démontré
avant l'ajout d'une reconstruction personnalisée.

## Sorties et politique Git

À versionner :

- `.graphifyignore` ;
- les instructions Graphify dans `AGENTS.md` ;
- le skill Graphify local si le dépôt en assure la distribution ;
- cette documentation ;
- le futur script de bootstrap et ses contrôles.

À conserver hors Git :

- `graphify-out/graph.json` ;
- les rapports et visualisations générés ;
- les caches, historiques de requêtes et réflexions ;
- les sorties sémantiques temporaires.

`graphify-out/` doit donc être ajouté à `.gitignore`. Si `graph.json` n'est pas
versionné, la règle de fusion `graphify-out/graph.json merge=graphify` dans
`.gitattributes` ne doit pas être publiée. L'entrée Graphify inerte de
`.codex/hooks.json` ne doit pas non plus être versionnée.

Les commandes `update` et les hooks peuvent régénérer localement
`GRAPH_REPORT.md` et `graph.html`. Ce coût est acceptable pour le petit graphe
cible, à condition que toutes ces sorties restent ignorées par Git. La
configuration ne supprime pas les anciennes sorties ; leur nettoyage éventuel
reste une action distincte et explicite.

## Critères d'acceptation

La configuration est considérée comme correctement appliquée lorsque :

1. aucun nœud ne provient de `exports/`, `.codex/`, `docs/superpowers/` ou
   `graphify-out/`, y compris `graphify-out/memory/` ;
2. le diagnostic brut est exécuté avant clustering et distingue les imports
   externes connus de toute relation interne manquante ;
3. le diagnostic final ne signale aucune arête orpheline, sans extrémité, en
   boucle ou effondrée ;
4. une requête ciblée sur `HealthService` retrouve ses relations NestJS ;
5. les documents canoniques inclus, dont le nœud de provenance `compose.yaml`,
   sont retrouvables dans le graphe ;
6. `graphify hook status` confirme les hooks Git locaux et aucune entrée Codex
   `graphify hook-check` n'est active ;
7. le benchmark dépasse nettement la référence de 11×, avec une référence
   mesurée de 19,6× et un seuil d'alerte inférieur à 18× ;
8. aucun fichier de `graphify-out/` n'est suivi par Git et aucune règle de fusion
   Graphify n'est publiée dans `.gitattributes` ;
9. aucun watcher persistant ni extraction sémantique LLM n'est nécessaire au
   maintien du graphe principal.

## Limites connues de Graphify 0.9.32

- Le hook Codex `graphify hook-check` est volontairement inactif dans cette
  version ; il doit être omis pour éviter un coût inutile par commande Bash.
- `.graphifyignore` ne peut pas empêcher Graphify de rescanner son répertoire
  par défaut `graphify-out/memory/` ; la mémoire doit être désactivée ou déportée.
- Le diagnostic du `graph.json` final ne révèle pas les arêtes déjà rejetées par
  la construction. Le diagnostic brut doit rester dans la procédure.
- L'extracteur structurel ne prend pas en charge `.yaml` ; le nœud de provenance
  explicite pour `compose.yaml` reste nécessaire après une reconstruction complète.
- La simulation brute a identifié 23 imports externes sans nœud destination. Ce
  comportement n'altère pas les relations internes vérifiées, mais doit rester
  visible jusqu'à correction amont.
- Les hooks Git maintiennent le code et la structure de certains documents,
  mais ne réexécutent pas automatiquement une extraction sémantique LLM.
- Un document déjà enrichi sémantiquement peut devenir obsolète sans signal de
  fraîcheur suffisamment fiable. Cette limite justifie la séparation de la
  couche sémantique.

Après toute mise à niveau de Graphify, ces limites et les commandes de cette
page doivent être revérifiées avant de modifier la configuration cible.

Deux améliorations amont sont souhaitables : un opt-out natif de l'indexation de
`graphify-out/memory/` et un diagnostic pré-construction qui conserve ou classe
les imports externes non résolus. Toute issue publique adressée à Graphify doit
retirer les chemins, extraits de code et données propriétaires ou sensibles.

## Retour arrière

Une exclusion peut être annulée en modifiant `.graphifyignore`, puis en lançant
une reconstruction volontaire avec `--force`. Aucun retour arrière ne doit
supprimer les artefacts sources conservés dans le dépôt.
