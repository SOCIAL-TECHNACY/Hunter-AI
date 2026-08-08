const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

const configs = [
  {
    host: 'aws-0-eu-west-1.pooler.supabase.com',
    port: 6543,
    user: 'postgres.ygpwmanoosdmxybxvjsv',
    password: 'HunterAi@2026@1',
    database: 'postgres'
  },
  {
    host: 'aws-0-eu-west-1.pooler.supabase.com',
    port: 5432,
    user: 'postgres.ygpwmanoosdmxybxvjsv',
    password: 'HunterAi@2026@1',
    database: 'postgres'
  },
  {
    host: 'aws-0-eu-west-1.pooler.supabase.com',
    port: 6543,
    user: 'postgres',
    password: 'HunterAi@2026@1',
    database: 'postgres'
  }
];

async function run() {
  for (const cfg of configs) {
    console.log(`Trying ${cfg.host}:${cfg.port} with user ${cfg.user}...`);
    const client = new Client({
      ...cfg,
      ssl: { rejectUnauthorized: false }
    });

    try {
      await client.connect();
      console.log(`SUCCESS! Connected via ${cfg.host}:${cfg.port}`);
      
      const sqlPath = path.join(__dirname, '../supabase/migrations/001_initial_schema.sql');
      const sql = fs.readFileSync(sqlPath, 'utf8');
      console.log('Running migration...');
      await client.query(sql);
      console.log('Migration executed successfully!');
      await client.end();
      return;
    } catch (err) {
      console.log(`Failed: ${err.message}`);
    }
  }
}

run();
