# OCTOPUS Expertise

Socle technique de l'application OCTOPUS Expertise : Next.js, NestJS et
PostgreSQL dans un monorepo npm.

## Prérequis

- Node.js 22
- npm 10 ou supérieur
- Docker avec Docker Compose

## Installation

```bash
cp .env.example .env
npm install
npm run db:up
```

## Développement

```bash
npm run dev
```

- Application web : http://localhost:3000
- API : http://localhost:3001/api
- Santé API/PostgreSQL : http://localhost:3001/api/health
- PostgreSQL : `localhost:5433`

## Commandes

```bash
npm run lint
npm test
npm run build
npm run format:check
npm run db:down
```

## Structure

```text
apps/
├── api/  # API NestJS
└── web/  # Application Next.js
```

Les visuels, la spécification et les exports fournis à la racine sont conservés
comme artefacts pour les étapes produit ultérieures.
