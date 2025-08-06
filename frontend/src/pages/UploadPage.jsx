import React, { useState } from 'react';
import axios from 'axios';

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [previewData, setPreviewData] = useState([]);
  const [uploaded, setUploaded] = useState(false);
  const [confirming, setConfirming] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setPreviewData([]);
    setUploaded(false);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file first.");

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('http://47.129.238.41/DataUpload', formData);
      setPreviewData(res.data.rows || []);
      setUploaded(true);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload file.");
    }
  };

  const handleConfirm = async () => {
    setConfirming(true);
    try {
      await axios.post('http://47.129.238.41/DataUpload/confirmUpload', {
        confirm: true
      });
      alert("Data successfully inserted/updated!");
      setFile(null);
      setPreviewData([]);
      setUploaded(false);
    } catch (error) {
      console.error("Confirm failed:", error);
      alert("Failed to confirm upload.");
    } finally {
      setConfirming(false);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Upload Student Excel/CSV</h2>

      <input type="file" accept=".xlsx,.xls,.csv" onChange={handleFileChange} />
      <button onClick={handleUpload} style={{ marginLeft: '10px' }}>
        Upload
      </button>

      {uploaded && previewData.length > 0 && (
        <>
          <h3 style={{ marginTop: '2rem' }}>Preview:</h3>
          <div style={{ overflowX: 'auto', maxHeight: '400px', marginBottom: '1rem' }}>
            <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%' }}>
              <thead>
                <tr>
                  {Object.keys(previewData[0]).map((key, index) => (
                    <th key={index}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {previewData.map((row, i) => (
                  <tr key={i}>
                    {Object.entries(row).map(([key, value], j) => (
                      <td key={j}>{value ?? '–'}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button onClick={handleConfirm} disabled={confirming}>
            {confirming ? "Confirming..." : "Confirm Upload"}
          </button>
        </>
      )}
    </div>
  );
};

export default UploadPage;
