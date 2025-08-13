import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [previewData, setPreviewData] = useState([]);
  const [uploaded, setUploaded] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 50; // จำนวน row ต่อหน้า
  const domain = import.meta.env.VITE_DOMAIN_NAME?.trim() || "http://0.0.0.0";

  // Reset state
  const resetState = () => {
    setPreviewData([]);
    setUploaded(false);
    setCurrentPage(1);
  };

  // เลือกไฟล์
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log("Selected file:", selectedFile);
    setFile(selectedFile);
    resetState();
  };

  // ตรวจสอบไฟล์นามสกุล
  const validateFile = (file) => {
    if (!file) return false;
    const allowedExtensions = ['csv','xlsx','xlsm','xlsb','xltx'];
    const ext = file.name.split('.').pop().toLowerCase();
    return allowedExtensions.includes(ext);
  };

  const normalize = (val) => (val === null || val === undefined ? '' : String(val).trim());

  // Merge preview กับ database
  const simulateMerge = (dbRows, previewRows) => {
    const dbMap = new Map(dbRows.map(row => [row.StudentID, row]));
    const previewMap = new Map(previewRows.map(row => [row.StudentID, row]));
    const combined = [];

    for (const previewRow of previewRows) {
      const dbRow = dbMap.get(previewRow.StudentID);
      if (!dbRow) {
        combined.push({ ...previewRow, _source: 'preview', _status: 'new' });
      } else {
        const changedFields = [];
        for (const key of Object.keys(previewRow)) {
          if (key === 'StudentID') continue;
          if (normalize(dbRow[key]) !== normalize(previewRow[key])) changedFields.push(key);
        }
        combined.push({
          ...previewRow,
          _source: 'preview',
          _status: changedFields.length > 0 ? 'updated' : 'untouched',
          _changedFields: changedFields
        });
      }
    }

    for (const dbRow of dbRows) {
      if (!previewMap.has(dbRow.StudentID)) {
        combined.push({ ...dbRow, _source: 'database', _status: 'untouched' });
      }
    }

    return combined;
  };

  // Upload & preview
  const handleUpload = async () => {
    if (!file) return toast.error("❌ Please select a file first.");
    if (!validateFile(file)) return toast.error("❌ Only CSV or Excel files are allowed.");

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post(`${domain}/DataUpload`, formData);
      const preview = res.data.rows || [];

      const dbRes = await axios.get(`${domain}/students/all`);
      const currentDB = dbRes.data?.rows || dbRes.data || [];

      const merged = simulateMerge(currentDB, preview);
      setPreviewData(merged);
      setUploaded(true);

      toast.success("✅ File previewed successfully!", { position: "top-center", autoClose: 2000, theme: "colored" });
    } catch (error) {
      console.error("Upload failed:", error.response?.data || error.message);
      toast.error("❌ Failed to preview the file.", { position: "top-center", autoClose: 3000, theme: "colored" });
    }
  };

  // Confirm upload
  const handleConfirm = async () => {
    setConfirming(true);
    try {
      await axios.post(`${domain}/DataUpload/confirmUpload`, { confirm: true });
      toast.success("✅ Data successfully inserted/updated!", { position: "top-center", autoClose: 3000, theme: "colored" });
      setFile(null);
      resetState();
    } catch (error) {
      console.error("Confirm failed:", error);
      toast.error("❌ Failed to confirm upload.", { position: "top-center", autoClose: 3000, theme: "colored" });
    } finally {
      setConfirming(false);
    }
  };

  // Render table
  const renderTable = (data, title) => (
    <>
      <h3 style={{ marginTop: '2rem' }}>{title}</h3>
      <div style={{ overflowX: 'auto', maxHeight: '400px', marginBottom: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', borderRadius: '8px' }}>
        <table style={{ borderCollapse: 'collapse', width: '100%', fontFamily: 'Arial', fontSize: '0.9rem', color: '#333', backgroundColor: '#fff', border: '1px solid #ddd' }}>
          <thead>
            <tr style={{ backgroundColor: '#f4f6f8', fontWeight: 'bold', borderBottom: '2px solid #ddd' }}>
              {Object.keys(data[0]).map((key, idx) => <th key={idx} style={{ padding: '10px' }}>{key}</th>)}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => {
              const status = row._status;
              const bgColor =
                status === 'new' ? '#e6ffe6' :
                status === 'updated' ? '#fffbe6' :
                status === 'untouched' ? '#f0f0f0' :
                i % 2 === 0 ? '#fff' : '#f9f9f9';

              return (
                <tr key={i} style={{ backgroundColor: bgColor, borderBottom: '1px solid #eee', transition: 'background 0.3s' }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#e6f7ff'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = bgColor}>
                  {Object.entries(row).map(([key, value], j) => {
                    const isChanged = row._status === 'updated' && row._changedFields?.includes(key);
                    const cellStyle = {
                      padding: '8px',
                      textAlign: 'center',
                      backgroundColor: isChanged ? '#fff2cc' : undefined,
                      fontWeight: isChanged ? 'bold' : undefined,
                      border: '1px solid #eee'
                    };
                    return (
                      <td key={j} style={cellStyle}>
                        {key === '_status'
                          ? status === 'new' ? '🆕 New' : status === 'updated' ? '✏️ Updated' : '⚪ Untouched'
                          : typeof value === 'boolean'
                          ? value ? '✔' : '✖'
                          : value ?? '–'}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );

  // Pagination logic
  const totalPages = Math.ceil(previewData.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = previewData.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Upload Student CSV / Excel</h2>
      <input type="file" accept=".csv,.xlsx,.xlsm,.xlsb,.xltx" onChange={handleFileChange} />
      <button onClick={handleUpload} style={{ marginLeft: '10px' }}>Preview</button>

      {uploaded && previewData.length > 0 && (
        <>
          {renderTable(currentRows, `📄 Uploaded File Preview (Page ${currentPage})`)}

          {/* Pagination */}
          <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}>Previous</button>
            <span>Page {currentPage} / {totalPages}</span>
            <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>Next</button>
          </div>

          <button onClick={handleConfirm} disabled={confirming} style={{ marginTop: '1rem' }}>
            {confirming ? "Confirming..." : "Confirm Upload"}
          </button>
        </>
      )}

      <ToastContainer />
    </div>
  );
};

export default UploadPage;
