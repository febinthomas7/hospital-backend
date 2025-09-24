// routes/reports.js
const express = require('express');
const { Client } = require('pg');
const router = express.Router();
require('dotenv').config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});
client.connect();

// Route to create a new report
router.post('/reports', async (req, res) => {
  const {
    patient_adhaar, npi_id, doctor_id, date_of_issue,
    title, description, priority, category
  } = req.body;

  try {
    const query = `
      INSERT INTO reports (
        patient_adhaar, npi_id, doctor_id, date_of_issue,
        title, description, priority, category
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING report_id;
    `;
    const values = [
      patient_adhaar, npi_id, doctor_id, date_of_issue,
      title, description, priority, category
    ];

    const result = await client.query(query, values);

    res.status(201).json({
      message: 'Report created successfully!',
      report_id: result.rows[0].report_id
    });
  } catch (err) {
    console.error('Error creating report:', err);
    res.status(500).json({ error: 'Failed to create report.' });
  }
});

module.exports = router;