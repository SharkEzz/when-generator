import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './app/api/database/schema.ts',
  out: './drizzle',
  dialect: 'sqlite',
  dbCredentials: {
    url: './sqlite.db',
  },
});
