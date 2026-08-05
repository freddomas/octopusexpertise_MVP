# OCTOPUS EXPERTISE — Spécification de construction du site web public

> **Statut :** version restructurée et corrigée à partir du document source fourni.  
> **Périmètre :** site web public uniquement.  
> **Principe :** toute information absente ou non vérifiée doit rester explicitement non spécifiée ; elle ne doit jamais être inventée pendant la conception ou le développement.

---

## 0. Statut et règles d’utilisation du document

### 0.1 Autorité du document

Ce document constitue la source de vérité pour concevoir, rédiger, développer, tester et livrer la partie **publique** du site web d’Octopus Expertise.

Il ne décrit pas le fonctionnement interne complet de la plateforme B2B authentifiée.

### 0.2 Conventions normatives

- **DOIT** : exigence obligatoire.
- **NE DOIT PAS** : interdiction explicite.
- **DEVRAIT** : recommandation forte, à écarter uniquement pour une raison documentée.
- **À spécifier** : information absente de la source ; aucune hypothèse ne doit être transformée en exigence.

### 0.3 Gestion des informations manquantes

Lorsqu’un contenu, un comportement, une règle métier, une donnée légale ou un critère de validation n’est pas défini :

1. ne pas l’inventer ;
2. conserver un marqueur **À spécifier** ;
3. empêcher sa présentation comme une fonctionnalité ou une capacité confirmée ;
4. le faire valider avant mise en production.

Les lacunes identifiées sont regroupées dans la section **8. Éléments à compléter avant implémentation complète**.

---

## 1. Objet, périmètre et résultat attendu

### 1.1 Objet

Le document cadre la conception et la réalisation du site web public d’Octopus Expertise, notamment :

- le positionnement public de la marque ;
- l’architecture de l’information ;
- les pages marketing et éditoriales ;
- les contenus en français et en anglais ;
- la direction artistique ;
- le design system ;
- la section d’ouverture du site et ses animations ;
- les composants publics ;
- les formulaires de contact, de dépôt de besoin et de candidature partenaire ;
- l’internationalisation ;
- le SEO, le GEO et la conversion ;
- l’accessibilité ;
- la performance ;
- la sécurité des surfaces publiques ;
- les tests et les critères de livraison.

Le niveau de définition n’est pas encore uniforme sur l’ensemble de ce périmètre. Les sujets annoncés mais non détaillés sont explicitement listés en section 8.

### 1.2 Résultat attendu

Le site web final DOIT être :

- premium sans être ostentatoire ;
- clairement B2B ;
- crédible auprès des directions générales, des directions des opérations, des directions des achats, des directions techniques et des responsables de projets ;
- adapté au Lualaba, au Haut-Katanga et à la République démocratique du Congo, tout en restant pertinent à l’échelle africaine ;
- immédiatement compréhensible ;
- fortement orienté conversion ;
- original dans son identité ;
- animé avec discipline ;
- utilisable sur smartphone, tablette et ordinateur ;
- accessible ;
- performant ;
- techniquement cohérent avec Next.js, PostgreSQL, GitHub et Vercel.

### 1.3 Anti-modèles et exclusions visuelles

Le site web NE DOIT PAS :

- ressembler à un template SaaS générique ;
- ressembler à un simple annuaire de fournisseurs ;
- ressembler à une brochure institutionnelle statique ;
- présenter un rendu visuel artificiel ou identifiable comme un « look IA » ;
- utiliser la pieuvre, le poulpe, les tentacules ou une représentation littérale d’« octopus » comme concept visuel, en dehors du nom de marque.

---

## 2. Contexte métier, identité et positionnement public

### 2.1 Identité de marque

La marque publique s’écrit toujours :

> **Octopus Expertise**

Les variantes fusionnées, abrégées ou incohérentes sont interdites dans les contenus visibles.

### 2.2 Définition publique

Octopus Expertise est une **passerelle B2B multisectorielle** et un **orchestrateur de capacités professionnelles**.

Elle permet aux entreprises de :

1. centraliser un besoin complexe ;
2. clarifier le résultat attendu ;
3. transformer le besoin en exigences exploitables ;
4. identifier les expertises nécessaires ;
5. mobiliser les entreprises partenaires pertinentes ;
6. structurer une solution cohérente ;
7. coordonner la proposition et les intervenants ;
8. accompagner ou piloter l’exécution ;
9. maintenir la visibilité sur les décisions, les jalons et les livrables.

Octopus Expertise n’est pas un simple annuaire. Elle apporte une couche de :

- qualification ;
- sélection ;
- orchestration ;
- coordination ;
- gouvernance ;
- contrôle ;
- traçabilité.

### 2.3 Formulation canonique

> Octopus Expertise structure les besoins complexes des entreprises, mobilise les expertises les plus pertinentes et coordonne leur exécution dans un cadre unique, visible et maîtrisé.

### 2.4 Positionnement commercial

Le visiteur DOIT comprendre en moins de dix secondes :

- **un seul interlocuteur** ;
- **un réseau multisectoriel qualifié** ;
- **une exécution structurée et suivie**.

Le modèle complet et la prochaine action attendue DOIVENT être compréhensibles en moins de vingt secondes.

La promesse repose sur :

- la qualification ;
- la sélection ;
- la coordination ;
- la traçabilité ;
- le contrôle des livrables ;
- la maîtrise de la relation.

Elle ne repose pas sur des superlatifs, des statistiques non vérifiées ou des déclarations générales d’excellence.

### 2.5 Territoires

Zones prioritaires :

- Lualaba ;
- Haut-Katanga ;
- République démocratique du Congo.

Extension possible :

- reste de la République démocratique du Congo ;
- Afrique ;
- partenaires internationaux utiles aux opérations africaines.

Le site web NE DOIT PAS inventer de bureau, de siège, d’adresse physique ou de présence locale.

### 2.6 Contacts publics

Utiliser exactement :

- **E-mail :** `info@octopusexpertise.com`
- **Téléphone Bruxelles :** `+32 485 36 88 03`
- **Téléphone RDC :** `+243 974 849 528`

Liens normalisés :

```text
mailto:info@octopusexpertise.com
tel:+32485368803
tel:+243974849528
```

Les horaires ne doivent être affichés que s’ils ont été confirmés.

### 2.7 Règles d’intégrité

Le site web NE DOIT PAS inventer :

- des clients ;
- des témoignages ;
- des partenaires ;
- des logos clients ;
- des projets réalisés ;
- des certifications ;
- des agréments ;
- des chiffres d’affaires ;
- des volumes de missions ;
- des taux de réussite ;
- un nombre de pays ;
- des années d’expérience ;
- des délais garantis ;
- des membres d’équipe ;
- des bureaux.

En l’absence de preuve sociale réelle, le site DOIT utiliser des preuves de méthode :

- processus de qualification ;
- points de contrôle qualité ;
- contrôle documentaire ;
- suivi des jalons ;
- gouvernance ;
- journalisation ;
- visibilité client ;
- transparence du workflow.

---

## 3. Objectifs, conversions et mesure

### 3.1 Objectif principal

Transformer un visiteur professionnel qualifié en l’une des actions suivantes :

1. **confier un besoin** ;
2. **rejoindre le réseau de partenaires** ;
3. **parler à Octopus Expertise**.

La consultation approfondie des expertises constitue un objectif de progression dans le parcours, mais pas une conversion finale.

### 3.2 Objectifs prioritaires

1. Expliquer clairement le modèle Octopus Expertise.
2. Transformer un visiteur qualifié en demande commerciale.
3. Attirer des entreprises partenaires sérieuses.
4. Installer la marque comme une structure premium et maîtrisée.
5. Démontrer le niveau d’organisation sans inventer de références.
6. Préparer l’entrée vers les portails authentifiés.
7. Développer la visibilité organique sur les services B2B, le Lualaba et le Haut-Katanga.

### 3.3 Objectifs secondaires

Le site web DOIT :

- réduire la perception de risque ;
- démontrer le sérieux par la méthode ;
- faire comprendre la valeur d’un interlocuteur unique ;
- valoriser l’ancrage au Lualaba et au Haut-Katanga ;
- démontrer la capacité panafricaine sans surpromesse ;
- qualifier les demandes avant contact ;
- filtrer les candidatures partenaires trop faibles ;
- améliorer le référencement naturel ;
- fournir une base éditoriale crédible ;
- créer une identité visuelle mémorable.

### 3.4 Conversions principales

Les trois conversions principales sont :

- **Confier un besoin** ;
- **Rejoindre le réseau** ;
- **Parler à Octopus Expertise**.

La connexion à la plateforme est une action utilitaire et NE DOIT PAS être traitée comme le CTA marketing principal.

### 3.5 Indicateurs à suivre

Mesurer sans collecte excessive de données personnelles :

- le taux de clic du hero vers « Confier un besoin » ;
- le taux de démarrage du formulaire ;
- le taux de complétion ;
- le taux de candidature partenaire ;
- les pages de services les plus consultées ;
- la profondeur de consultation ;
- la langue utilisée ;
- les erreurs de formulaire ;
- la vitesse et les Core Web Vitals ;
- la provenance des conversions lorsqu’elle peut être collectée légalement.

Aucune valeur cible commerciale arbitraire ne doit être fixée sans historique.

---

## 4. Audiences et parcours

### 4.1 Décideur d’entreprise

Profils :

- direction générale ;
- direction des opérations ;
- direction des achats ;
- direction technique ;
- direction informatique ;
- direction de projet ;
- direction QHSE ;
- direction administrative et financière.

Questions principales :

- Comprennent-ils réellement mon besoin ?
- Peuvent-ils mobiliser plusieurs compétences ?
- Qui reste responsable de la coordination ?
- Comment les partenaires sont-ils sélectionnés ?
- Comment vais-je suivre la mission ?
- Comment mes informations seront-elles protégées ?

Parcours cible :

```text
Accueil → Expertise ou Méthode → Qualité et conformité → Confier un besoin
```

### 4.2 Responsable des achats / procurement

Attentes :

- qualification fournisseur ;
- comparaison structurée ;
- conformité documentaire ;
- traçabilité ;
- diminution du temps de sourcing ;
- maîtrise des échanges.

Parcours cible :

```text
Accueil → Réseau partenaires → Méthode → Confier un besoin
```

### 4.3 Entreprise partenaire

Attentes :

- accès à des opportunités pertinentes ;
- processus clair ;
- confidentialité ;
- critères de qualification ;
- visibilité sur les étapes ;
- protection contre les consultations non sérieuses.

Parcours cible :

```text
Accueil → Réseau partenaires → Devenir partenaire → Candidature
```

### 4.4 Visiteur institutionnel ou de confiance

Attentes :

- comprendre la structure ;
- vérifier le sérieux ;
- consulter les domaines d’intervention ;
- lire les politiques et les contenus ;
- accéder aux coordonnées.

Le parcours détaillé de cette audience reste **à spécifier**.

---

## 5. Règles éditoriales et linguistiques

### 5.1 Ton

Le ton DOIT être :

- précis ;
- calme ;
- premium ;
- direct ;
- institutionnel sans lourdeur ;
- commercial sans exagération ;
- orienté résultat ;
- accessible à un décideur non technique.

### 5.2 Expressions à éviter sans preuve

Ne pas utiliser :

- leader ;
- numéro un ;
- meilleur ;
- révolutionnaire ;
- unique au monde ;
- excellence inégalée ;
- garantie absolue ;
- zéro risque ;
- expertise incomparable ;
- réseau panafricain le plus vaste ;
- milliers de partenaires ;
- solution 360° sans explication ;
- partenaire de confiance comme simple slogan ;
- world-class ;
- cutting-edge.

### 5.3 Formulation des capacités partenaires

Lorsque la ressource ou l’expertise appartient à un partenaire, écrire :

> Capacités mobilisables via le réseau Octopus Expertise.

Ne pas écrire :

> Nos équipes certifiées réalisent…

Cette règle évite d’attribuer à Octopus Expertise des ressources internes, des certifications ou des capacités non démontrées.

### 5.4 Bilinguisme

Le site DOIT fournir :

- une version française complète ;
- une version anglaise complète ;
- aucune clé de traduction visible ;
- des métadonnées traduites ;
- des slugs traduits lorsque cela est pertinent ;
- une correspondance explicite entre les versions linguistiques ;
- une transcréation professionnelle plutôt qu’une traduction littérale.

La table complète de correspondance entre les routes françaises et anglaises reste **à spécifier**.

---

## 6. Architecture de l’information et navigation

### 6.1 Principes

Le site DOIT :

- être disponible en français et en anglais ;
- conserver une logique de navigation identique sur ordinateur, tablette et smartphone ;
- distinguer les pages de découverte, les pages de conversion et les accès utilitaires ;
- éviter de surcharger le menu principal ;
- maintenir « Confier un besoin » comme CTA marketing principal ;
- maintenir « Connexion » comme action utilitaire.

### 6.2 Ordre recommandé du header

#### Navigation principale

1. Expertises
2. Secteurs
3. Méthode
4. Réseau partenaires
5. Qualité et conformité
6. Insights
7. À propos

#### Actions et utilitaires

- **CTA principal :** Confier un besoin
- **Accès contextuel partenaire :** Devenir partenaire
- **Utilitaires :** Contact, Connexion, changement de langue

#### Accès secondaires

- Lualaba et Haut-Katanga : accessibles depuis la section de couverture, les liens contextuels et le footer.
- Plateforme : accessible depuis l’aperçu de la plateforme, les contenus contextuels et l’accès de connexion.
- Confidentialité et Conditions d’utilisation : footer uniquement, sauf contexte légal spécifique.

### 6.3 Arborescence ordonnée

```text
/[locale]
├── /expertises
│   └── /expertises/[slug]
├── /secteurs
│   └── /secteurs/[slug]
├── /methode
├── /reseau-partenaires
├── /devenir-partenaire
├── /confier-un-besoin
├── /plateforme
├── /qualite-conformite
├── /a-propos
├── /lualaba
├── /haut-katanga
├── /insights
│   └── /insights/[slug]
├── /contact
├── /connexion
├── /confidentialite
└── /conditions-utilisation
```

Les slugs anglais équivalents restent **à spécifier**.

### 6.4 Carte des pages, objectifs et niveau de définition

| Page | Route française | Objectif principal | CTA primaire | Niveau actuel |
|---|---|---|---|---|
| Accueil | `/[locale]` | Expliquer, crédibiliser et orienter | Confier un besoin | Partiellement spécifiée |
| Expertises | `/[locale]/expertises` | Montrer l’étendue structurée du portefeuille | Décrire un besoin | Partiellement spécifiée |
| Expertise détaillée | `/[locale]/expertises/[slug]` | Présenter un domaine sans surpromesse | Parler d’un besoin lié au domaine | Structure spécifiée |
| Secteurs | `/[locale]/secteurs` | Montrer l’adaptation aux environnements métier | Explorer un secteur | Partiellement spécifiée |
| Secteur détaillé | `/[locale]/secteurs/[slug]` | À spécifier | À spécifier | Non spécifiée |
| Méthode | `/[locale]/methode` | Démontrer l’orchestration et les contrôles | Démarrer un cadrage | Structure spécifiée |
| Réseau partenaires | `/[locale]/reseau-partenaires` | Expliquer la qualification et la gouvernance | Rejoindre le réseau | Partiellement spécifiée |
| Devenir partenaire | `/[locale]/devenir-partenaire` | Convertir une entreprise partenaire | Commencer la candidature | Non spécifiée |
| Confier un besoin | `/[locale]/confier-un-besoin` | Convertir un prospect client | Envoyer la demande | Partiellement spécifiée |
| Plateforme | `/[locale]/plateforme` | Présenter la visibilité offerte par les espaces numériques | Confier un besoin | Partiellement spécifiée |
| Qualité et conformité | `/[locale]/qualite-conformite` | Rassurer sans surpromettre | Échanger avec l’équipe | Structure partielle |
| À propos | `/[locale]/a-propos` | Expliquer la raison d’être et le modèle | Nous contacter | Structure partielle |
| Lualaba | `/[locale]/lualaba` | Ancrage territorial pertinent | Discuter d’un besoin local | Non spécifiée |
| Haut-Katanga | `/[locale]/haut-katanga` | Ancrage territorial pertinent | Discuter d’un besoin local | Non spécifiée |
| Insights | `/[locale]/insights` | Développer l’autorité éditoriale | Lire un article | Non spécifiée |
| Article | `/[locale]/insights/[slug]` | Informer et créer des parcours organiques | À spécifier | Non spécifiée |
| Contact | `/[locale]/contact` | Offrir un accès simple à l’équipe | Envoyer le message | Partiellement spécifiée |
| Connexion | `/[locale]/connexion` | Fournir un accès utilitaire sécurisé | Se connecter | Non spécifiée |
| Confidentialité | `/[locale]/confidentialite` | Présenter les règles de traitement des données | Aucun CTA marketing | Non spécifiée |
| Conditions d’utilisation | `/[locale]/conditions-utilisation` | Présenter les conditions d’usage du site | Aucun CTA marketing | Non spécifiée |

### 6.5 Navigation responsive

La navigation DOIT être optimisée pour ordinateur, tablette et smartphone.

- L’ordre logique des entrées doit rester identique entre les formats.
- Le CTA « Confier un besoin » doit rester identifiable sans dominer tout l’écran.
- « Connexion » doit rester visible comme utilitaire, sans concurrence avec la conversion principale.
- « Devenir partenaire » doit rester accessible depuis le réseau de partenaires et le menu mobile.
- Les pages territoriales et légales ne doivent pas encombrer la navigation principale.

Les seuils de rupture, dimensions, comportements du menu et états interactifs restent **à spécifier** dans le design system.

---

## 7. Spécification détaillée des pages existantes

### 7.1 Accueil — `/[locale]`

#### 7.1.1 Finalité

L’accueil DOIT expliquer le modèle, installer la marque, démontrer la méthode et conduire vers une conversion sans imposer une lecture excessive.

#### 7.1.2 Ordre des sections

1. Header
2. Hero cinématique
3. Bande de preuve opérationnelle
4. Proposition de valeur
5. Visualisation de l’orchestration
6. Portefeuille de capacités
7. Secteurs
8. Méthode en six étapes
9. Réseau partenaires
10. Couverture territoriale
11. Aperçu de la plateforme
12. Qualité, confidentialité et traçabilité
13. Insights
14. CTA final
15. Footer

#### 7.1.3 Header

Le header applique l’ordre et la hiérarchie définis en section 6.

Le comportement visuel, les états sticky, les menus déroulants et les animations restent **à spécifier**.

#### 7.1.4 Hero cinématique

**Sur-titre**

> Lualaba

**H1**

> Octopus Expertise structure chaque besoin, mobilise les partenaires les plus pertinents et coordonne la mission de bout en bout dans un cadre unique, visible et maîtrisé.

**CTA principal**

> Confier un besoin

**CTA secondaire**

> Rejoindre le réseau

**Ligne de preuve**

> Qualification · Sélection · Coordination · Contrôle

Le concept visuel, l’animation, la durée, les états de réduction de mouvement et le comportement responsive du hero restent **à spécifier**.

#### 7.1.5 Bande de preuve opérationnelle

Afficher quatre principes sous forme de séquence, et non sous forme de statistiques :

- Besoin cadré
- Capacités qualifiées
- Exécution coordonnée
- Livrables contrôlés

#### 7.1.6 Proposition de valeur

**Titre**

> Une seule interface pour des besoins qui dépassent un seul métier.

**Texte**

> Lorsque plusieurs compétences, fournisseurs et contraintes doivent avancer ensemble, la dispersion devient un risque. Octopus Expertise centralise le cadrage, la sélection des capacités, les échanges et le suivi afin que chaque intervenant contribue au même résultat.

**Trois piliers**

1. **Clarifier** — transformer le besoin en exigences, priorités et livrables.
2. **Mobiliser** — identifier les entreprises et experts adaptés à la mission.
3. **Piloter** — organiser les décisions, jalons, documents et validations.

#### 7.1.7 Visualisation de l’orchestration

**Titre**

> Pas un annuaire. Une couche d’orchestration.

**Texte**

> Le réseau n’a de valeur que s’il peut être activé avec méthode. Chaque mission suit un parcours lisible, depuis l’expression du besoin jusqu’à la validation des livrables.

La visualisation DOIT représenter :

```text
BESOIN
  ↓
QUALIFICATION
  ↓
CAPACITÉS REQUISES
  ↓
PARTENAIRES ÉLIGIBLES
  ↓
PROPOSITION
  ↓
MISSION
  ↓
LIVRABLES VALIDÉS
```

Le visiteur doit pouvoir sélectionner une étape pour afficher :

- son objectif ;
- les informations traitées ;
- le contrôle appliqué ;
- le résultat produit.

#### 7.1.8 Portefeuille de capacités

**Titre**

> Un portefeuille multisectoriel. Une même discipline d’exécution.

**Texte**

> Le portefeuille évolue avec les capacités vérifiées du réseau. Chaque domaine est présenté selon les problèmes traités, les livrables attendus et les conditions de mobilisation.

**Domaines initiaux**

1. Technologies et infrastructures numériques
2. Ingénierie, construction et installations techniques
3. Maintenance industrielle et performance des actifs
4. Énergie et continuité opérationnelle
5. Achats, supply chain et logistique
6. Opérations minières et services de site
7. QHSE, qualité et conformité
8. Capital humain, formation et services aux entreprises

#### 7.1.9 Secteurs

**Titre**

> Une méthode commune, adaptée aux réalités de chaque secteur.

**Secteurs initiaux**

- Mines et métaux
- Industrie et production
- Énergie et utilities
- Construction et infrastructures
- Technologies et télécommunications
- Logistique et commerce
- Entreprises, institutions et organisations
- Médecine

Chaque secteur affiche :

- les enjeux fréquents ;
- les expertises mobilisables ;
- les contraintes opérationnelles ;
- un CTA vers sa page.

#### 7.1.10 Méthode

**Titre**

> Vous gardez un interlocuteur unique. Nous coordonnons le reste.

**Étapes**

1. Comprendre
2. Cadrer
3. Mobiliser
4. Structurer
5. Piloter
6. Valider

**Description des étapes**

- **Comprendre** — objectif, environnement, contraintes et urgence.
- **Cadrer** — exigences, critères, livrables et responsabilités.
- **Mobiliser** — capacités, partenaires et ressources éligibles.
- **Structurer** — solution, proposition, engagements et gouvernance.
- **Piloter** — décisions, risques, jalons, documents et communication.
- **Valider** — réception, corrections, approbations et clôture.

#### 7.1.11 Réseau partenaires

**Titre**

> Un réseau construit pour l’exécution, pas pour la vitrine.

**Texte**

> Les entreprises partenaires sont évaluées selon leurs capacités, leur couverture, leurs documents, leurs références et leur performance. L’intégration au réseau ne vaut pas validation permanente : les informations critiques doivent rester à jour.

**Axes**

- identité et existence légale ;
- capacités et secteurs ;
- couverture ;
- conformité documentaire ;
- disponibilité ;
- performance ;
- suivi des échéances.

#### 7.1.12 Couverture territoriale

**Titre**

> Ancrés dans les réalités du Lualaba et du Haut-Katanga. Connectés aux capacités utiles en RDC et en Afrique.

Le contenu détaillé, la représentation visuelle et les CTA territoriaux restent **à spécifier**.

#### 7.1.13 Aperçu de la plateforme

**Message disponible**

> Une visibilité continue sur les demandes, décisions et livrables.

Le texte d’accompagnement, le visuel, les fonctionnalités réellement montrables et le CTA restent **à spécifier**.

Aucune interface ou donnée fictive ne doit être présentée comme une fonctionnalité opérationnelle.

#### 7.1.14 Qualité, confidentialité et traçabilité

**Titre**

> La confiance ne se décrète pas. Elle se construit par des contrôles visibles.

**Piliers**

- qualification des intervenants ;
- confidentialité des informations ;
- séparation des accès ;
- historique des décisions ;
- contrôle des documents ;
- validation des livrables.

**CTA**

> Comprendre notre cadre de contrôle

#### 7.1.15 Insights

La section est prévue dans l’ordre de la page, mais son titre, son contenu, son modèle de cartes et sa logique éditoriale restent **à spécifier**.

#### 7.1.16 CTA final

**Titre**

> Transformons votre besoin en mission maîtrisée.

**Texte**

> Décrivez le résultat attendu, les contraintes et le contexte. L’équipe structurera la prochaine étape avec vous.

**Boutons**

- Confier un besoin
- Nous contacter

#### 7.1.17 Footer

Le footer DOIT donner accès :

- aux pages principales ;
- aux pages territoriales ;
- aux contacts publics ;
- au changement de langue ;
- à la connexion ;
- à la politique de confidentialité ;
- aux conditions d’utilisation.

Sa composition détaillée reste **à spécifier**.

---

### 7.2 Expertises — `/[locale]/expertises`

#### 7.2.1 Finalité

Montrer l’étendue du portefeuille sans donner l’impression qu’Octopus Expertise prétend tout réaliser en interne.

#### 7.2.2 Hero

**H1**

> Les capacités nécessaires, réunies autour de votre objectif.

**Texte**

> Explorez les domaines mobilisables par Octopus Expertise. Chaque intervention est structurée selon le besoin, les compétences disponibles et les exigences de contrôle.

#### 7.2.3 Modules

1. Hero compact
2. Filtres par domaine, secteur et zone
3. Liste des huit domaines
4. Services associés
5. Méthode de mobilisation
6. CTA de dépôt de besoin

Les règles de filtrage, les données sources et les états vides restent **à spécifier**.

---

### 7.3 Expertise détaillée — `/[locale]/expertises/[slug]`

Chaque page d’expertise DOIT suivre le même modèle éditorial sans produire de contenu générique dupliqué.

#### 7.3.1 Structure

1. Breadcrumb
2. Hero
3. Problèmes traités
4. Résultats recherchés
5. Périmètres de service
6. Livrables typiques
7. Méthode d’intervention
8. Contrôles et exigences
9. Secteurs associés
10. Expertises complémentaires
11. FAQ
12. CTA

#### 7.3.2 Exemple de CTA

> Parler d’un besoin en infrastructure numérique

#### 7.3.3 Règle de vérité

Écrire :

> Capacités mobilisables via le réseau Octopus Expertise.

Plutôt que :

> Nos équipes certifiées réalisent…

lorsque la ressource appartient à un partenaire.

---

### 7.4 Secteurs — `/[locale]/secteurs`

#### 7.4.1 Hero

**H1**

> Des expertises adaptées aux contraintes réelles de votre secteur.

**Texte**

> Les exigences de sécurité, de continuité, de conformité et de mobilisation diffèrent selon les environnements. Octopus Expertise relie le besoin aux capacités pertinentes et structure leur coordination.

#### 7.4.2 Modules

- secteurs ;
- enjeux par secteur ;
- domaines associés ;
- méthode ;
- couverture ;
- CTA.

Le modèle d’une page de secteur détaillée reste **à spécifier**.

---

### 7.5 Méthode — `/[locale]/methode`

#### 7.5.1 Hero

**H1**

> De l’expression du besoin à la validation du résultat.

**Texte**

> Une mission multisectorielle exige plus qu’une mise en relation. Elle exige un cadrage, des critères, des responsabilités, des jalons et des preuves de livraison.

#### 7.5.2 Structure

1. Principe d’orchestration
2. Timeline en six étapes
3. Points de contrôle qualité
4. Rôles client / Octopus Expertise / partenaire
5. Gestion des risques
6. Gestion des documents et des décisions
7. FAQ
8. CTA

---

### 7.6 Réseau partenaires — `/[locale]/reseau-partenaires`

#### 7.6.1 Hero

**H1**

> Un réseau qualifié selon les exigences de chaque mission.

**Texte**

> Octopus Expertise identifie, évalue et suit des entreprises capables de contribuer à des missions concrètes. L’accès aux opportunités dépend de la pertinence des capacités et de la validité des informations fournies.

#### 7.6.2 Éléments restant à préciser

- structure complète de la page ;
- critères publics de qualification ;
- étapes d’intégration ;
- règles de mise à jour des informations ;
- articulation avec « Devenir partenaire » ;
- CTA et FAQ détaillés.

---

### 7.7 Confier un besoin — `/[locale]/confier-un-besoin`

#### 7.7.1 Hero

**H1**

> Décrivez le résultat attendu. Nous structurerons la prochaine étape.

**Texte**

> Donnez-nous le contexte, l’objectif, les contraintes et les délais connus. Vous n’avez pas besoin d’avoir déjà rédigé un cahier des charges complet.

#### 7.7.2 Structure

1. Rassurance courte
2. Formulaire progressif
3. Explication du traitement
4. Confidentialité
5. Coordonnées alternatives

#### 7.7.3 Rassurance

- la demande est examinée avant engagement ;
- les informations sont utilisées pour qualifier le besoin ;
- aucune information n’est publiée ;
- aucune information n’est transmise à un partenaire sans étape appropriée ;
- des documents peuvent être joints uniquement lorsque le stockage sécurisé est actif.

Les champs, les étapes, la validation, les messages d’erreur, les limites de fichiers et la politique de conservation restent **à spécifier**.

---

### 7.8 Plateforme — `/[locale]/plateforme`

#### 7.8.1 Finalité

Présenter la valeur numérique de la plateforme sans transformer la page en démonstration fictive.

#### 7.8.2 Hero

**H1**

> Une visibilité continue sur les demandes, décisions et livrables.

#### 7.8.3 Règles

- Ne montrer que des fonctionnalités existantes ou explicitement validées.
- Ne pas utiliser de faux comptes, fausses missions, faux partenaires ou faux indicateurs comme preuve opérationnelle.
- Distinguer clairement la présentation publique de l’espace authentifié.

La structure complète de la page reste **à spécifier**.

---

### 7.9 Qualité et conformité — `/[locale]/qualite-conformite`

#### 7.9.1 Hero

**H1**

> Des contrôles adaptés au niveau de risque de chaque mission.

#### 7.9.2 Sections

1. Qualification entreprise
2. Documents et échéances
3. Capacités et références
4. QHSE et exigences spécifiques
5. Gouvernance des accès
6. Contrôle des livrables
7. Journal des décisions
8. Gestion des écarts
9. FAQ
10. CTA

Le site NE DOIT PAS déclarer une certification ISO, SOC 2, PCI DSS ou toute autre certification si elle n’est pas vérifiée.

---

### 7.10 À propos — `/[locale]/a-propos`

#### 7.10.1 Hero

**H1**

> Construire un accès plus simple aux capacités dont les entreprises ont réellement besoin.

#### 7.10.2 Contenu

- raison d’être ;
- problème de dispersion du marché ;
- modèle d’orchestration ;
- zones prioritaires ;
- principes ;
- gouvernance ;
- vision ;
- coordonnées.

#### 7.10.3 Principes de marque

- clarté ;
- sélection ;
- responsabilité ;
- confidentialité ;
- traçabilité ;
- amélioration continue.

Aucun membre d’équipe, bureau, historique, chiffre ou référence ne doit être ajouté sans validation factuelle.

---

### 7.11 Contact — `/[locale]/contact`

#### 7.11.1 Hero

**H1**

> Parlons de votre besoin.

#### 7.11.2 Modules

- formulaire court ;
- e-mail ;
- téléphones ;
- horaires uniquement s’ils sont confirmés ;
- motif de contact ;
- lien vers le formulaire complet de besoin ;
- lien vers la candidature partenaire.

#### 7.11.3 Champs

- nom ;
- entreprise ;
- e-mail ;
- téléphone facultatif ;
- motif ;
- message ;
- consentement.

Les textes de consentement, règles de validation, traitements anti-spam, messages d’état et durées de conservation restent **à spécifier**.

---

## 8. Éléments à compléter avant implémentation complète

### 8.1 Pages annoncées mais non spécifiées

Les pages suivantes figurent dans l’architecture ou les objectifs, mais ne disposent pas encore d’une spécification détaillée suffisante :

1. Secteur détaillé
2. Devenir partenaire
3. Lualaba
4. Haut-Katanga
5. Insights
6. Article d’insight
7. Connexion
8. Confidentialité
9. Conditions d’utilisation

### 8.2 Sections ou pages seulement partielles

Les éléments suivants disposent d’un début de contenu, mais restent incomplets :

- header ;
- footer ;
- hero cinématique ;
- aperçu de la plateforme sur l’accueil ;
- section Insights sur l’accueil ;
- page Réseau partenaires ;
- formulaire Confier un besoin ;
- page Plateforme ;
- page Qualité et conformité ;
- page À propos ;
- page Contact.

### 8.3 Spécifications transversales absentes

Le document annonce ces domaines, mais ne les définit pas encore de manière opérationnelle :

- direction artistique détaillée ;
- design system ;
- grille, typographie, couleurs, espacements et iconographie ;
- règles d’images et de photographie ;
- animations 2D et 3D ;
- comportements interactifs et micro-interactions ;
- composants publics et leurs états ;
- formulaire complet de candidature partenaire ;
- schéma complet du formulaire de dépôt de besoin ;
- internationalisation technique et table de correspondance des routes ;
- contenus anglais ;
- stratégie SEO ;
- stratégie GEO ;
- données structurées ;
- règles de maillage interne ;
- accessibilité et niveau de conformité visé ;
- budgets de performance ;
- seuils Core Web Vitals ;
- sécurité des formulaires et surfaces publiques ;
- gestion des pièces jointes ;
- politique anti-spam et anti-abus ;
- analytics et nomenclature des événements ;
- tests fonctionnels, visuels, responsive, accessibilité, performance et sécurité ;
- critères d’acceptation et de livraison.

### 8.4 Informations factuelles ou légales à fournir

Avant mise en production, fournir ou valider :

- les informations légales de l’entité éditrice ;
- les textes de confidentialité et de conditions d’utilisation ;
- les bases légales et durées de conservation des formulaires ;
- les horaires, uniquement s’ils doivent être publiés ;
- les certifications, agréments, références ou chiffres éventuellement utilisés ;
- la disponibilité réelle du stockage sécurisé pour les pièces jointes ;
- les fonctionnalités réellement disponibles dans la plateforme ;
- les critères publics de qualification des partenaires.

---

## 9. Critères de validation déjà déductibles

Le site ne peut être considéré conforme à cette version du document que si les points suivants sont vérifiés :

1. La marque visible est toujours écrite **Octopus Expertise**.
2. Le positionnement « un interlocuteur, un réseau qualifié, une exécution structurée » est perceptible en moins de dix secondes.
3. Le modèle et la prochaine action sont compréhensibles en moins de vingt secondes.
4. « Confier un besoin » reste le CTA marketing principal.
5. « Connexion » reste une action utilitaire.
6. Les trois conversions principales sont accessibles : besoin, partenaire, contact.
7. Aucun client, témoignage, partenaire, projet, chiffre, bureau, membre d’équipe ou certification n’est inventé.
8. Les capacités de partenaires ne sont pas présentées comme des ressources internes d’Octopus Expertise.
9. Les contacts publics correspondent exactement aux données de la section 2.6.
10. Le site est entièrement disponible en français et en anglais, sans clé de traduction visible.
11. La navigation fonctionne sur smartphone, tablette et ordinateur.
12. Les pages territoriales et légales n’encombrent pas la navigation principale.
13. Le rendu ne ressemble ni à un template SaaS générique, ni à un annuaire, ni à une brochure statique.
14. L’identité visuelle n’utilise pas de pieuvre, de poulpe ou de tentacules comme concept graphique littéral.
15. La page Plateforme ne présente aucune démonstration fictive comme une capacité réelle.
16. Aucune certification ISO, SOC 2, PCI DSS ou autre n’est déclarée sans vérification.
17. Les pièces jointes ne sont proposées que si le stockage sécurisé est effectivement actif.
18. Toute donnée absente reste marquée **À spécifier** et n’est pas inventée pendant l’implémentation.

---

## 10. Décision de complétude

Cette version est **structurellement cohérente** et peut servir de base de cadrage éditorial et d’architecture de l’information.

Elle n’est toutefois pas encore suffisante, à elle seule, pour garantir une implémentation finale complète sans interprétation. Les éléments de la section 8 doivent être spécifiés avant de traiter le document comme une spécification de construction entièrement exécutable.
