import express from 'express';
import multer from 'multer';
import openExcelFileFromBuffer from '../utils/excel.js';
import sql from '../utils/db.js';

let header_DB = {
    "Header_1":"StudentID",
    "Header_2":"Gender",
    "Header_3":"Name",
    "Header_4":"Surname",
    "Header_5":"Phone_number",
    "Header_6":"Email",
    "Header_7":"Sub_district",
    "Header_8":"Province",
    "Header_9":"stage1",
    "Header_10":"stage2",
    "Header_11":"stage3",
    "Header_12":"stage4",
    "Header_13":"stage5",
    "Header_14":"stage6",
    "Header_15":"stage7",
    "Header_16":"stage8",
    "Header_17":"Status",
    "Header_18":"KeyToken"
}

let DataReader; 
const DatabaseHandler = express.Router();
const upload = multer({ storage: multer.memoryStorage() }); // เก็บไฟล์ใน RAM (buffer)

// POST รับไฟล์ Excel ผ่าน field 'file'
DatabaseHandler.post('/', upload.single('file'), async (req, res) => {
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

DatabaseHandler.post('/confirmUpload', async (req, res) => {
  const Isconfirm = req.body;  // The posted JSON data
  //console.log('Received data:', receivedData);
  if (Isconfirm.confirm){
    for(let i in DataReader){

        //console.log(DataReader[i][header_DB.Header_1])
        
        let [rows] = await sql.query('SELECT * FROM StudentConfidential WHERE StudentID = ?', [DataReader[i][header_DB.Header_1]]);
        if(rows.length >0 ){
            let index = []; 
            let header_DB_values = Object.values(header_DB) ; let row_header_keys = Object.keys(rows[0]);
            console.log(header_DB_values) ;
            console.log("----");
            console.log(row_header_keys) ;
            // FOR loop check update
            //UPDATE
            console.log("1");
            console.log(index);
        }else{
            //INSERT
            console.log("0");
        }
    }
  }
  // Respond back
  res.json({ message: 'Data received successfully'});
});


export default DatabaseHandler;
