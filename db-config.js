const { Client } = require("pg");
const DATABASE_URL = `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}?sslmode=require`;
const client = new Client({
  connectionString: DATABASE_URL, // e.g. postgres://user:password@host:5432/dbname
});

client
  .connect()
  .then(() => console.log("✅ Connected to PostgreSQL"))
  .catch((err) => {
    console.error("❌ PostgreSQL connection error:", err);
  });
const createPatientsTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS patients (
      patient_id SERIAL PRIMARY KEY,
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
  `;

  try {
    await client.query(query);
    console.log("✅ Patients table ready");
  } catch (err) {
    console.error("❌ Error creating Patients table:", err);
  }
};
createPatientsTable();
module.exports = client;
