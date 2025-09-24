// server.js or a dedicated router file
const express = require('express');
const { Client } = require('pg');
const bcrypt = require('bcrypt'); // For password hashing
require('dotenv').config();

const router = express.Router();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

client.connect();

// Route to create a new doctor record
router.post('/doctors', async (req, res) => {
  const { name, email, password, phone_no, date_of_birth, address, npi_id, specialization } = req.body;
  
  try {
    // Hash the password for security
    const password_hash = await bcrypt.hash(password, 10);
    
    const query = `
      INSERT INTO hospital.doctors (name, email, password_hash, phone_no, date_of_birth, address, npi_id, specialization)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING doctor_id;
    `;
    const values = [name, email, password_hash, phone_no, date_of_birth, address, npi_id, specialization];
    
    const result = await client.query(query, values);
    
    res.status(201).json({
      message: 'Doctor record created successfully!',
      doctorId: result.rows[0].doctor_id,
    });

  } catch (error) {
    console.error('Error creating doctor record:', error);
    res.status(500).json({ error: 'Failed to create doctor record.' });
  }
});

module.exports = router;