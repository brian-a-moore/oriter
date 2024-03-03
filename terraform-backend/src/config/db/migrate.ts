import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { Client } from 'pg';

const { DB_USER, DB_HOST, DB_NAME, DB_PASSWORD } = process.env;

const sql = new Client({
  user: DB_USER,
  host: DB_HOST,
  database: DB_NAME,
  password: DB_PASSWORD,
  port: 5432,
});

const db = drizzle(sql);

(async () => {
  await sql.connect();
  await migrate(db, { migrationsFolder: './migrations' });
})();
