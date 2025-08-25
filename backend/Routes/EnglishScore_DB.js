import express from 'express';
import multer from 'multer';
import openExcelFileFromBuffer from '../utils/excel.js';
import sql from '../utils/db.js';

let header_DB = {
    "Header_1":"StudentID",
    "Header_2":"tokenENG",
    "Header_3":"Score",
    "Header_4":"status",
}

let DataReader; 
const EnglishScoreTest_DB = express.Router();
const upload = multer({ storage: multer.memoryStorage() }); // เก็บไฟล์ใน RAM (buffer)

EnglishScoreTest_DB.post('/', upload.single('file'), async (req, res) => {
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
EnglishScoreTest_DB.post('/confirmUpload', async (req, res) => {
  const Isconfirm = req.body;
  if (!Isconfirm.confirm) {
    return res.status(400).json({ error: 'Confirm not true' });
  }

  try {
    if (!DataReader || DataReader.length === 0) {
      return res.status(400).json({ error: 'No data to upload' });
    }

    const columns = Object.values(header_DB);
    const placeholders = columns.map(() => '?').join(',');
    const batchSize = 1000;

    const allStudentIDs = DataReader.map(row => row.StudentID);
    const [existingRows] = await sql.query(
      `SELECT StudentID FROM EnglishScoreTest WHERE StudentID IN (?)`,
      [allStudentIDs]
    );
    const existingIDs = new Set(existingRows.map(r => r.StudentID));

    const insertRows = [];
    const updateRows = [];

    for (let row of DataReader) {
      if (existingIDs.has(row.StudentID)) {
        updateRows.push(row);
      } else {
        insertRows.push(row);
      }
    }

    console.log(`Total insert: ${insertRows.length}, Total update: ${updateRows.length}`);
    console.log('Insert StudentID:', insertRows.map(r => r.StudentID));
    console.log('Update StudentID:', updateRows.map(r => r.StudentID));

    const startTime = Date.now(); // เริ่มจับเวลา

    // Batch insert
    for (let i = 0; i < insertRows.length; i += batchSize) {
      const batchStart = Date.now();
      const batch = insertRows.slice(i, i + batchSize);
      const allValues = batch.map(row => columns.map(col => row[col] ?? null));
      const sqlQuery = `INSERT IGNORE INTO EnglishScoreTest (${columns.join(',')}) VALUES ${allValues.map(() => `(${placeholders})`).join(',')}`;
      await sql.query(sqlQuery, allValues.flat());
      console.log(`Inserted rows ${i + 1} to ${i + batch.length} | Time: ${Date.now() - batchStart} ms`);
    }

    // Batch update
    for (let i = 0; i < updateRows.length; i += batchSize) {
      const batchStart = Date.now();
      const batch = updateRows.slice(i, i + batchSize);

      let updateClauses = {}; // เก็บ {col: "CASE ... END"}
      const studentIDs = batch.map(r => r.StudentID);

      // เตรียม CASE สำหรับแต่ละคอลัมน์
      for (let col of columns) {
        if (col === 'StudentID') continue; // ไม่อัปเดต StudentID

        let caseSQL = `CASE StudentID`;
        let hasUpdate = false;

        for (let row of batch) {
          if (row[col] !== undefined) {
            caseSQL += ` WHEN '${row.StudentID}' THEN ${sql.escape(row[col])}`;
            hasUpdate = true;
          }
        }
        caseSQL += ` ELSE ${col} END`;

        if (hasUpdate) {
          updateClauses[col] = caseSQL;
        }
      }

      if (Object.keys(updateClauses).length > 0) {
        const updateSQL = Object.entries(updateClauses)
          .map(([col, caseSQL]) => `${col} = ${caseSQL}`)
          .join(', ');

        const sqlQuery = `
          UPDATE EnglishScoreTest
          SET ${updateSQL}
          WHERE StudentID IN (${studentIDs.map(id => sql.escape(id)).join(',')})
        `;

        await sql.query(sqlQuery);
        console.log(`✅ Updated ${batch.length} rows (IDs: ${studentIDs.join(', ')}) | Time: ${Date.now() - batchStart} ms`);
      }
    }


    const totalTime = Date.now() - startTime;
    console.log(`Total elapsed time: ${totalTime} ms`);

    res.json({ message: `Inserted ${insertRows.length}, Updated ${updateRows.length}, Total time: ${totalTime} ms` });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to process data' });
  }
});



export default EnglishScoreTest_DB;

