// routes/students.js
import express from 'express';
import sql from '../utils/db.js';

let studentrouter = express.Router();

studentrouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  let rows;

  if (id === "all") {
    // Query all students
    [rows] = await sql.query('SELECT * FROM StudentConfidential');
  } else {
    // Query by specific student ID
    [rows] = await sql.query('SELECT * FROM StudentConfidential WHERE StudentID = ?', [id]);
  }

  if (!rows || rows.length === 0) {
    return res.status(404).send('Student not found');
  }

  // If "all", return all rows; otherwise return the single student object
  if (id === "all") {
    res.json(rows);
  } else {
    res.json(rows[0]);
  }
});

export default studentrouter ;

