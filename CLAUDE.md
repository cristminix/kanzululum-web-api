# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
# Install dependencies
yarn install

# Run development server (http://localhost:8787)
yarn dev

# Build TypeScript
yarn build

# Deploy to Cloudflare Workers
yarn deploy
```

## Architecture Overview

This is a REST API running on Cloudflare Workers using Hono framework with Cloudflare KV storage.

### Technology Stack
- **Framework**: Hono (lightweight web framework for Cloudflare Workers)
- **Runtime**: Cloudflare Workers
- **Storage**: Cloudflare KV (key-value store)
- **Language**: TypeScript

### Layer Structure

The codebase follows a layered architecture with dependency injection:

```
Routes → Handlers → Controllers → Services → KV Storage
```

1. **Routes** (`src/routes/`) - Define HTTP endpoints and mount handlers
2. **Handlers** (`src/handlers/`) - HTTP request/response handling, validation, error formatting
3. **Controllers** (`src/controllers/`) - Business logic orchestration, delegate to service functions
4. **Services** (`src/services/kvService.ts`) - KV storage operations abstraction
5. **Models** (`src/models/`) - TypeScript interfaces defining data shapes
6. **Utils** (`src/utils/controllerFactory.ts`) - Factory functions for dependency injection

### Key Patterns

- **Factory Pattern**: `controllerFactory.ts` creates controllers with injected `KVService`
- **Service Layer**: `KVService` class wraps all KV operations including entity-specific methods
- **ID Generation**: Uses `Date.now()` for timestamp-based IDs

### Entity Key Scheme

KV keys follow these patterns:
- `berita_keys` - JSON array of all berita IDs
- `berita_{id}` - Individual berita record
- `produk_keys` - JSON array of all produk IDs
- `produk_{id}` - Individual produk record

### Write Endpoints Status

Write operations (POST, PUT, DELETE) for berita and produk are currently **commented out** in the route files. The handlers and controllers exist but routes are disabled.

## Configuration

- `wrangler.toml` - Cloudflare Workers configuration with KV namespace binding
- KV namespace binding is accessed via `c.env.KV` in handlers

## Adding New Entity

To add a new entity (e.g., "artikel"):

1. Create model in `src/models/artikel.ts`
2. Add entity methods to `src/services/kvService.ts`
3. Create controller functions in `src/controllers/artikel/`
4. Create `src/controllers/artikelController.ts` class
5. Create handlers in `src/handlers/artikel/`
6. Create routes in `src/routes/artikelRoutes.ts`
7. Add factory function in `src/utils/controllerFactory.ts`
8. Mount routes in `src/index.ts`