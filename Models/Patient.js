
const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function initPatientTable() {
  try {
    await client.connect();

    // Ensure schema exists
    await client.query(`CREATE SCHEMA IF NOT EXISTS hospital;`);

    // Create patients table
    await client.query(`
      CREATE TABLE IF NOT EXISTS Patients (
        name VARCHAR(100) NOT NULL,
        phone_no VARCHAR(20),
        gmail VARCHAR(150) UNIQUE NOT NULL,
        adhaar_no VARCHAR(20) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        date_of_birth DATE,
        gender VARCHAR(20),
        address TEXT,
        blood_group VARCHAR(10),
        emergency_contact_name VARCHAR(100),
        emergency_contact_relation VARCHAR(50),
        emergency_contact_phone VARCHAR(20),
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);

  } catch (err) {
    console.error("❌ Error creating patient table:", err);
  } finally {
    await client.end();
  }
}

module.exports = { initPatientTable };
