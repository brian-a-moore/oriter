import 'dotenv/config';

export default {
    dbCredentials: {
        connectionString: process.env.DATABASE_URL,
    },
    driver: 'pg',
    schema: './src/config/db/schema.ts',
    migrationsFolder: './src/config/db/migrations',
}