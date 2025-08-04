// routes/students.js
import express from 'express';
import sql from '../utils/db.js';

let studentrouter = express.Router();

studentrouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const [rows] = await sql.query('SELECT * FROM StudentConfidential WHERE StudentID = ?', [id]);

  if (rows.length === 0) {
    return res.status(404).send('Student not found');
  }

  res.json(rows[0]);
});

export default studentrouter ;

