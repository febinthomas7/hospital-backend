
const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function initReportTable() {
  try {
    await client.connect();

    // Create reports table
    await client.query(`
      CREATE TABLE IF NOT EXISTS Reports (
        report_id SERIAL PRIMARY KEY,
        patient_adhaar VARCHAR(20) NOT NULL,
        npi_id VARCHAR(50) NOT NULL,
        doctor_id INT NOT NULL,
        date_of_issue DATE NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        priority VARCHAR(50),
        category VARCHAR(100),
        created_at TIMESTAMPTZ DEFAULT NOW(),
        CONSTRAINT fk_doctor FOREIGN KEY (doctor_id) REFERENCES Doctors(doctor_id),
        CONSTRAINT fk_patient FOREIGN KEY (patient_adhaar) REFERENCES Patients(adhaar_no) ON DELETE CASCADE,
        CONSTRAINT fk_hospital FOREIGN KEY (npi_id) REFERENCES Hospitals(npi_id)
      );
    `);

  } catch (err) {
    console.error("❌ Error creating reports table:", err);
  } finally {
    await client.end();
  }
}

module.exports = { initReportTable };
