
const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function initNoticeTable() {
  try {
    await client.connect();

    // Create Notices table
    await client.query(`
      CREATE TABLE IF NOT EXISTS Notices (
        article_id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        url TEXT NOT NULL,
        date DATE NOT NULL,
        image TEXT
      );
    `);
    
  } catch (err) {
    console.error("❌ Error creating articles table:", err);
  } finally {
    await client.end();
  }
}

module.exports = { initNoticeTable };
