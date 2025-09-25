const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function initAdvertisementTable() {
  try {
    await client.connect();

    // Create advertisements table
    await client.query(`
      CREATE TABLE IF NOT EXISTS Advertisements (
        ad_id SERIAL PRIMARY KEY,
        image_url TEXT NOT NULL,             -- ad image
        company_name VARCHAR(200) NOT NULL,
        title VARCHAR(200) NOT NULL,
        rating INT NOT NULL DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),  
        website_url TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);

  } catch (err) {
    console.error("❌ Error creating advertisements table:", err);
  } finally {
    await client.end();
  }
}

module.exports = { initAdvertisementTable };
