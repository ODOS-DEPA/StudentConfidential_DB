// utils/openExcelFile.js
import XLSX from 'xlsx';

function openExcelFileFromBuffer(fileBuffer) {
  try {
    const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet, { defval: null });
    return data;
  } catch (error) {
    console.error('Error reading Excel buffer:', error);
    throw error;
  }
}

export default openExcelFileFromBuffer;