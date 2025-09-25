// const { Client } = require('pg');
// require('dotenv').config();

// const client = new Client({
//   connectionString: process.env.DATABASE_URL,
//   ssl: { rejectUnauthorized: false }, // Needed for Neon
// });

// async function initDoctorTable() {
//   try {
//     await client.connect();

//     // Create doctors table if it doesn't exist
//     await client.query(`
//       CREATE TABLE IF NOT EXISTS Doctors (
//         doctor_id SERIAL PRIMARY KEY,
//         name VARCHAR(100) NOT NULL,
//         email VARCHAR(150) UNIQUE NOT NULL,
//         password_hash VARCHAR(255) NOT NULL,
//         phone_no VARCHAR(20),
//         date_of_birth DATE,
//         address TEXT,
//         specialization VARCHAR(100),
//         npi_id VARCHAR(50), -- add this column first
//         created_at TIMESTAMPTZ DEFAULT NOW(),
//         CONSTRAINT fk_hospital
//           FOREIGN KEY (npi_id) REFERENCES Hospitals(npi_id)
//       );
//     `);

//   } catch (err) {
//     console.error("❌ Error creating doctors table:", err);
//   } finally {
//     await client.end();
//   }
// }

// module.exports = { initDoctorTable };

// models/Album.js

const DoctorModel = {
  tableName: "albums",
  columns: {
    id: "SERIAL PRIMARY KEY",
    title: "VARCHAR(255) NOT NULL",
    user_id: "INT NOT NULL REFERENCES users(id) ON DELETE CASCADE",
    created_at: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
    updated_at: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
  },
  relations: {
    memories: "many-to-many with memory via album_memories",
  },
};

module.exports = { DoctorModel };
