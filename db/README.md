# Local Database for Development

This directory contains scripts and data for running your project with a local SQLite database instead of connecting to Supabase in development. This makes development faster and doesn't require an internet connection.

## Setup

To set up the local database:

```bash
npm run db:setup
```

This will:
1. Create the SQLite database schema
2. Export data from Supabase (you'll need to provide your Supabase key)
3. Import the data into the local database

## Usage

### Development Mode

1. Ensure your `.env` file has `VITE_USE_LOCAL_DB=true` to use the local database
2. Run the app with `npm run dev`

### Production Mode

For production, set `VITE_USE_LOCAL_DB=false` in your environment variables to use Supabase.

## Available Scripts

### Setup and Synchronization

- `npm run db:setup` - Initialize the local database with data from Supabase
- `npm run db:sync-from-supabase` - Pull the latest data from Supabase to local
- `npm run db:sync-to-supabase` - Push local database changes to Supabase

### Individual Operations

- `npm run db:export` - Export data from Supabase to JSON files
- `npm run db:import` - Import JSON files into the local database

## Exporting Specific Projects

To export only a specific project (e.g., the bRAG AI project):

```bash
npm run db:export c2593a84-0676-42bf-83fa-4bf21e4af697
```

## Directory Structure

- `/db/local.db` - The SQLite database file (created on setup)
- `/db/exports/` - JSON files exported from Supabase
- `/db/scripts/` - Database management scripts (`.cjs` files)
- `/db/migrations/` - Database migration files (for future use)

## For Developers

The data flow is:

1. **Production:** Uses Supabase directly via `src/lib/supabase.ts`
2. **Development:** Uses local SQLite via the adapter in `src/lib/local-db-browser.ts`

When you make schema changes, be sure to update both:
- The `create-schema.cjs` script for local development
- The Supabase database for production 