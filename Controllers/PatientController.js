const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../db-config");
const PatientModel = require("../Models/Patient");

// ---------------- Register Patient ----------------
const registerPatient = async (req, res) => {
  try {
    const {
      name,
      phone_no,
      gmail,
      adhaar_no,
      password,
      date_of_birth,
      gender,
      address,
      blood_group,
      emergency_contact_name,
      emergency_contact_relation,
      emergency_contact_phone,
    } = req.body;

    if (!name || !gmail || !adhaar_no || !password) {
      return res.status(400).json({ error: "Required fields missing" });
    }

    const cols = PatientModel.columns;
    const table = PatientModel.tableName;

    // Check if email exists
    const emailCheck = await pool.query(
      `SELECT * FROM ${table} WHERE ${cols.gmail} = $1`,
      [gmail]
    );
    if (emailCheck.rows.length > 0)
      return res.status(400).json({ error: "Email already registered" });

    // Check if adhaar exists
    const adhaarCheck = await pool.query(
      `SELECT * FROM ${table} WHERE ${cols.adhaar_no} = $1`,
      [adhaar_no]
    );
    if (adhaarCheck.rows.length > 0)
      return res.status(400).json({ error: "Adhaar already registered" });

    // Hash password
    const password_hash = await bcrypt.hash(password, 10);

    // Insert patient
    const insertQuery = `
      INSERT INTO ${table} 
      (${cols.name}, ${cols.phone_no}, ${cols.gmail}, ${cols.adhaar_no}, ${cols.password_hash}, ${cols.date_of_birth}, ${cols.gender}, ${cols.address}, ${cols.blood_group}, ${cols.emergency_contact_name}, ${cols.emergency_contact_relation}, ${cols.emergency_contact_phone})
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
      RETURNING ${cols.patient_id}, ${cols.name}, ${cols.gmail}, ${cols.adhaar_no}, ${cols.date_of_birth}, ${cols.gender}, ${cols.address}, ${cols.blood_group}, ${cols.emergency_contact_name}, ${cols.emergency_contact_relation}, ${cols.emergency_contact_phone}, ${cols.created_at};
    `;

    const values = [
      name,
      phone_no,
      gmail,
      adhaar_no,
      password_hash,
      date_of_birth,
      gender,
      address,
      blood_group,
      emergency_contact_name,
      emergency_contact_relation,
      emergency_contact_phone,
    ];

    const { rows } = await pool.query(insertQuery, values);
    return res.status(201).json({ data: rows[0], status: true });
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ error: "Server error", status: false });
  }
};

// ---------------- Login Patient ----------------
const loginPatient = async (req, res) => {
  console.log("Login request body:", req.body);
  try {
    const { adhaar_no, password } = req.body;

    if (!adhaar_no || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const cols = PatientModel.columns;
    const table = PatientModel.tableName;

    // Fetch patient by email
    const { rows } = await pool.query(
      `SELECT * FROM ${table} WHERE ${cols.adhaar_no} = $1`,
      [adhaar_no]
    );

    const patient = rows[0];
    if (!patient) return res.status(400).json({ error: "Invalid credentials" });

    const role = "patient";
    // Compare password
    const isMatch = await bcrypt.compare(password, patient[cols.password_hash]);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    // Generate JWT
    const token = jwt.sign(
      {
        patient_id: patient[cols.patient_id],
        role: role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Return patient info without password
    const { [cols.password_hash]: _, ...patientData } = patient;
    res.status(200).json({ token, data: patientData, status: true });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Server error", status: false });
  }
};

module.exports = { registerPatient, loginPatient };
