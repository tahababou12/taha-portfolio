# Portfolio Project - Adding New Projects and Database Setup

## Setting Up Environment Variables

Before running database operations, make sure you have the necessary environment variables set up in a `.env` file in the root directory:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Running Database Migrations

When you make changes to the database schema (like adding the `project_sections` table), you need to run migrations:

```bash
# Go to the Supabase dashboard and run the SQL migrations manually
# Or use the Supabase CLI if you have it set up:
npx supabase migration up
```

## Adding a New Project

1. Use the `new-project-template.js` file as a reference to create a new project object.
2. Add the new project object to the `projects` array in `scripts/populate-supabase.js`.
3. Run the populate script to add the project to your database:

```bash
# Run the Supabase population script
npm run populate-db
```

## Project Structure

A project in this portfolio consists of:

1. **Basic Information**:
   - Title, description, category, image, links
   - Long description, year, role

2. **Related Data**:
   - Technologies: Technologies used in the project
   - Features: Key features as bullet points
   - Team Members: People who worked on the project
   - Gallery: Image gallery for the project
   - Sections: Detailed content sections for the project

## Project Sections

The project sections feature allows you to divide your project details into structured sections with titles and content. Each section appears as a separate block on the project detail page.

Typical sections might include:
- Problem Statement
- Approach & Methodology
- Technical Implementation
- Challenges & Solutions
- Results & Impact

## Database Schema

The portfolio uses the following database tables:

- `projects`: Main project information
- `project_technologies`: Technologies used in projects
- `project_features`: Key features of projects
- `project_team_members`: Team members of projects
- `project_gallery`: Images for project galleries
- `project_sections`: Detailed content sections for projects

Each table has a foreign key relationship to the main `projects` table using the `project_id` field. 