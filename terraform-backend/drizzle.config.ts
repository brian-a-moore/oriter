import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/config/db/schema.ts',
  out: './src/config/db/migrations',
  driver: 'pg',
  dbCredentials: {
    host: process.env.DB_HOST as string,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME as string,
  },
  verbose: true,
  strict: true,
});
