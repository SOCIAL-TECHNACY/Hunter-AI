const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

async function runMigration() {
  const connectionString = 'postgresql://postgres:HunterAi%402026%401@db.ygpwmanoosdmxybxvjsv.supabase.co:5432/postgres';
  
  console.log('Connecting to Supabase PostgreSQL database...');
  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('Connected successfully!');

    const sqlPath = path.join(__dirname, '../supabase/migrations/001_initial_schema.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');

    console.log('Running migration 001_initial_schema.sql...');
    await client.query(sql);
    console.log('Migration completed successfully! All tables, indexes, RLS policies, and triggers are created.');
  } catch (err) {
    console.error('Migration failed:', err);
  } finally {
    await client.end();
  }
}

runMigration();
