import express from 'express';
import multer from 'multer';
import openExcelFileFromBuffer from '../utils/excel.js';
import sql from '../utils/db.js';

let header_DB = {
    "Header_1":"StudentID",
    "Header_2":"IdentityID"
}

let DataReader; 
const citizen_identity_DB = express.Router();
const upload = multer({ storage: multer.memoryStorage() }); // เก็บไฟล์ใน RAM (buffer)

citizen_identity_DB.post('/', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const id = req.params.id;

    // อ่านไฟล์ Excel จาก buffer
    const excelData = openExcelFileFromBuffer(req.file.buffer);

    // ทำอะไรกับ id และ excelData ที่อ่านมาได้
    // ตัวอย่าง ส่งกลับเป็น JSON
    DataReader = excelData ;

    return res.json({
      id,
      rows: excelData,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to read Excel file' });
  }
});

// POST รับไฟล์ Excel ผ่าน field 'file'
citizen_identity_DB.post('/confirmUpload', async (req, res) => {
  const Isconfirm = req.body;
  if (Isconfirm.confirm) {
    for (let i in DataReader) {
      const studentId = DataReader[i][header_DB.Header_1];

      // 1. Check if student exists
      const [rows] = await sql.query(
        'SELECT * FROM citizen_identity WHERE StudentID = ?',
        [studentId]
      );

      if (rows.length > 0) {
        //Prepare updates from DataReader only where values exist
        const updates = [];
        const values = [];

        for (let key in header_DB) {
          const columnName = header_DB[key];
          if (columnName === header_DB.Header_1) continue; // Skip StudentID

          const value = DataReader[i][columnName];
          if (value !== undefined) {
            updates.push(`${columnName} = ?`);
            values.push(value);
          }
        }

        if (updates.length > 0) {
          values.push(studentId); // for WHERE
          await sql.query(
            `UPDATE citizen_identity  SET ${updates.join(', ')} WHERE StudentID = ?`,
            values
          );
        }
        console.log(`Updated(CitizenID) for StudentID => ${studentId}`);
      } else {
        //INSERT new row if StudentID not found
        const columns = Object.values(header_DB);
        const values = columns.map(col => DataReader[i][col] ?? null); // fallback to null

        const placeholders = columns.map(() => '?').join(', ');
        await sql.query(
          `INSERT INTO citizen_identity (${columns.join(', ')}) VALUES (${placeholders})`,
          values
        );
        console.log(`Inserted (CitizenID) for StudentID => ${studentId}`);
      }
    }
  }

  res.json({ message: 'Data received successfully' });
});


export default citizen_identity_DB;