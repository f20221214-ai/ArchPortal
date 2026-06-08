import fs from 'fs';
import { Client } from 'pg';
import path from 'node:path';

const sqlPath = path.resolve('scripts', 'init-schema.sql');
const sql = fs.readFileSync(sqlPath, 'utf8');

const client = new Client({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@127.0.0.1:5434/arc_portal',
});

async function main() {
  await client.connect();
  console.log('Connected to DB. Running schema...');
  await client.query(sql);
  console.log('Schema applied.');
  await client.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
