
import 'dotenv/config';

import { Client } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

client.connect();

const db = drizzle(client);

const main = async () => {
  console.log('Migration started...');
  const startTime = Date.now();

  await migrate(db, { migrationsFolder: 'src/config/db/migrations' });

  const endTime = Date.now();
  const elapsedTime = (endTime - startTime) / 1000;

  console.log(`Migration complete! Elapsed time: ${elapsedTime} seconds`);

  await client.end();
  process.exit(0);
};

main().catch(err => {
  console.error(err);
  process.exit(1);
});
