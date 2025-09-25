const { Pool } = require("pg");
const DATABASE_URL = `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}?sslmode=require`;
const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // needed for Render/Heroku
});

pool
  .query("SELECT NOW()")
  .then((res) => console.log("✅ Connected to PostgreSQL at:", res.rows[0].now))
  .catch((err) => console.error("❌ PostgreSQL connection error:", err));
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
    await pool.query(query);
    console.log("✅ Patients table ready");
  } catch (err) {
    console.error("❌ Error creating Patients table:", err);
  }
};

const createHospitalTable = async () => {
  // Create Hospitals table if it doesn't exist
  const query = `
      CREATE TABLE IF NOT EXISTS hospitals (
        hospital_id SERIAL PRIMARY KEY,
        name VARCHAR(200) NOT NULL,
        org_issued_name VARCHAR(100) NOT NULL,
        npi_id VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        location TEXT,
        state VARCHAR(100),
        country VARCHAR(100),
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `;

  try {
    await pool.query(query);
    console.log("✅ Hospital table ready");
  } catch (err) {
    console.error("❌ Error creating Hospital table:", err);
  }
};

const createDoctorTable = async () => {
  const query = `CREATE TABLE IF NOT EXISTS Doctors (
  doctor_id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  phone_no VARCHAR(20),
  date_of_birth DATE,
  address TEXT,
  specialization VARCHAR(100),
  hospital_id INT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT fk_hospital
    FOREIGN KEY (hospital_id)
    REFERENCES Hospitals(hospital_id)
    ON DELETE CASCADE
)`;

  try {
    await pool.query(query);
    console.log("✅ Doctor table ready");
  } catch (err) {
    console.error("❌ Error creating Doctor table:", err);
  }
};
createHospitalTable();
createPatientsTable();
createDoctorTable();
module.exports = pool;
