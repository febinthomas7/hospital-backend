
const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function initHospitalTable() {
  try {
    await client.connect();

    // Create hospitals table
    await client.query(`
      CREATE TABLE IF NOT EXISTS Hospitals (
        hospital_id SERIAL PRIMARY KEY,
        name VARCHAR(200) NOT NULL,
        location TEXT,
        state VARCHAR(100),
        country VARCHAR(100),
        npi_id VARCHAR(50) UNIQUE,
        org_issued_name VARCHAR(100),
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);

  } catch (err) {
    console.error("❌ Error creating hospitals table:", err);
  } finally {
    await client.end();
  }
}

module.exports = { initHospitalTable };
