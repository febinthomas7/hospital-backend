const bcrypt = require("bcrypt");
const pool = require("../db-config"); // Your pg Pool instance
const HospitalModel = require("../Models/Hospital");

const registerHospital = async (req, res) => {
  const { name, org_issued_name } = req.body;

  if (!name || !org_issued_name) {
    return res
      .status(400)
      .json({ error: "Hospital name and organization are required" });
  }

  try {
    // Generate unique NPI ID
    const npiId = `NPI-${Math.floor(Math.random() * 90000) + 10000}`;

    // Generate random password
    const plainPassword = Math.random().toString(36).slice(-8);
    const password = await bcrypt.hash(plainPassword, 10);

    // Insert into DB
    const query = `
      INSERT INTO ${HospitalModel.tableName} 
      (${HospitalModel.columns.name}, ${HospitalModel.columns.org_issued_name}, ${HospitalModel.columns.npi_id}, ${HospitalModel.columns.password})
      VALUES ($1, $2, $3, $4)
      RETURNING ${HospitalModel.columns.npi_id};
    `;

    const values = [name, org_issued_name, npiId, password];

    const { rows } = await pool.query(query, values);

    res.status(201).json({ npiId: rows[0].npi_id, status: true });
  } catch (err) {
    console.error("Hospital registration error:", err);
    res.status(500).json({ error: "Server error", status: false });
  }
};

const loginHospital = async (req, res) => {
  const { npi_id, password } = req.body;
  console.log("Login request body:", req.body);

  if (!npi_id || !password) {
    return res.status(400).json({ error: "NPI ID and password are required" });
  }

  try {
    // Find hospital by NPI ID
    const query = `SELECT * FROM ${HospitalModel.tableName} WHERE ${HospitalModel.columns.npi_id} = $1`;
    const { rows } = await pool.query(query, [npi_id]);

    if (rows.length === 0) {
      return res.status(400).json({ error: "Hospital not found" });
    }

    const hospital = rows[0];

    // Compare entered password with hashed password in DB
    const match = await bcrypt.compare(password, hospital.password);
    if (!match) {
      return res
        .status(400)
        .json({ error: "Invalid credentials", status: false });
    }

    // Generate JWT
    const token = jwt.sign(
      { hospital_id: hospital.hospital_id, npi_id: hospital.npi_id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Exclude password before sending hospital data
    const { password: _, ...hospitalData } = hospital;
    console.log(token);
    return res.status(200).json({ token, hospitalData, status: true });
  } catch (err) {
    console.error("Hospital login error:", err);
    return res.status(500).json({ error: "Server error", status: false });
  }
};

module.exports = { registerHospital, loginHospital };
