import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import * as schema from './schema';

const { DATABASE_URL, DB_USER, DB_HOST, DB_NAME, DB_PASSWORD } = process.env;

export const connection = new Client(
  DATABASE_URL
    ? { connectionString: DATABASE_URL }
    : {
        user: DB_USER,
        host: DB_HOST,
        database: DB_NAME,
        password: DB_PASSWORD,
        port: 5432,
      },
);

(async () => {
  await connection.connect();
})();

export const db = drizzle(connection, { schema });
