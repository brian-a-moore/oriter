import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { Client } from 'pg';

const sql = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

const db = drizzle(sql);

(async () => {
  await sql.connect();
  await migrate(db, { migrationsFolder: './migrations' });
})();
