# Node.js + TypeScript + PostgreSQL (Hexagonal Architecture)

A clean backend starter following Hexagonal Architecture (Ports & Adapters) with Fastify, Zod for env validation, and a tiny SQL migration runner.

## Stack
- Node.js 18+
- TypeScript
- Fastify
- PostgreSQL (via Prisma ORM)
- Zod (env validation)

## Project Structure
```
src/
  application/            # Use-cases (business actions)
  domain/                 # Entities + Ports (interfaces)
  infrastructure/
    db/                   # Prisma client helpers
    repositories/         # Adapters implementing ports
    web/                  # HTTP server and routes
  config/                 # Env loading and validation
  server.ts               # App bootstrap
prisma/
  schema.prisma          # Prisma data model
```

## Getting Started
1) Install dependencies:

```bash
npm install
```

2) Copy env and adjust as needed:

```bash
cp .env.example .env
```

3) Start Postgres via docker-compose (optional):

```bash
docker compose up -d
```

4) Run migrations (creates/updates prisma migrations directory):

```bash
npm run migrate:dev
```

5) Start dev server:

```bash
npm run dev
```

- Health check: `GET http://localhost:3000/health`

## Environment Variables
- `PORT` (default 3000)
- Discrete Postgres settings: `POSTGRES_HOST`, `POSTGRES_PORT`, `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`
- Or a single `DATABASE_URL` (takes precedence)

## Scripts
- `npm run dev` – start dev server with auto-reload
- `npm run build` – type-check and emit JS to `dist`
- `npm start` – run built server
- `npm run migrate:dev` – apply Prisma migrations in development (creates new migration on schema change)
- `npm run migrate:deploy` – run pending migrations (useful in production CI/CD)
- `npm run prisma:generate` – regenerate Prisma client after schema edits
- `npm run prisma:studio` – open Prisma Studio data explorer

## Notes
- This is intentionally minimal and framework-agnostic at the core. Swap adapters (e.g. replace Postgres with another DB) by implementing the domain ports.

