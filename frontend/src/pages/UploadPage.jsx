// import React, { useState } from 'react';
// import axios from 'axios';

// const UploadPage = () => {
//   const [file, setFile] = useState(null);
//   const [previewData, setPreviewData] = useState([]);
//   const [uploaded, setUploaded] = useState(false);
//   const [confirming, setConfirming] = useState(false);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//     setPreviewData([]);
//     setUploaded(false);
//   };

//   const handleUpload = async () => {
//     if (!file) return alert("Please select a file first.");

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const res = await axios.post('http://47.129.238.41/DataUpload', formData);
//       setPreviewData(res.data.rows || []);
//       setUploaded(true);
//     } catch (error) {
//       console.error("Upload failed:", error);
//       alert("Failed to upload file.");
//     }
//   };

//   const handleConfirm = async () => {
//     setConfirming(true);
//     try {
//       await axios.post('http://47.129.238.41/DataUpload/confirmUpload', {
//         confirm: true
//       });
//       alert("Data successfully inserted/updated!");
//       setFile(null);
//       setPreviewData([]);
//       setUploaded(false);
//     } catch (error) {
//       console.error("Confirm failed:", error);
//       alert("Failed to confirm upload.");
//     } finally {
//       setConfirming(false);
//     }
//   };

//   return (
//     <div style={{ padding: '2rem' }}>
//       <h2>Upload Student Excel/CSV</h2>

//       <input type="file" accept=".xlsx,.xls,.csv" onChange={handleFileChange} />
//       <button onClick={handleUpload} style={{ marginLeft: '10px' }}>
//         Upload
//       </button>

//       {uploaded && previewData.length > 0 && (
//         <>
//           <h3 style={{ marginTop: '2rem' }}>Preview:</h3>
//           <div style={{ overflowX: 'auto', maxHeight: '400px', marginBottom: '1rem' }}>
//             <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%' }}>
//               <thead>
//                 <tr>
//                   {Object.keys(previewData[0]).map((key, index) => (
//                     <th key={index}>{key}</th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {previewData.map((row, i) => (
//                   <tr key={i}>
//                     {Object.entries(row).map(([key, value], j) => (
//                       <td key={j}>{value ?? '–'}</td>
//                     ))}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           <button onClick={handleConfirm} disabled={confirming}>
//             {confirming ? "Confirming..." : "Confirm Upload"}
//           </button>
//         </>
//       )}
//     </div>
//   );
// };

// export default UploadPage;
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
          <div
            style={{
              overflowX: 'auto',
              maxHeight: '400px',
              marginBottom: '1rem',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              borderRadius: '8px'
            }}
          >
            <table
              cellPadding="8"
              style={{
                borderCollapse: 'collapse',
                width: '100%',
                fontFamily: 'Arial, sans-serif',
                fontSize: '0.9rem',
                color: '#333',
                backgroundColor: '#fff',
                border: '1px solid #ddd'
              }}
            >
              <thead>
                <tr style={{ backgroundColor: '#f4f6f8', fontWeight: 'bold', borderBottom: '2px solid #ddd' }}>
                  {Object.keys(previewData[0]).map((key, index) => (
                    <th key={index} style={{ padding: '10px' }}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {previewData.map((row, i) => (
                  <tr
                    key={i}
                    style={{
                      backgroundColor: i % 2 === 0 ? '#ffffff' : '#f9f9f9',
                      borderBottom: '1px solid #eee',
                      transition: 'background 0.3s'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e6f7ff')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = i % 2 === 0 ? '#ffffff' : '#f9f9f9')}
                  >
                    {Object.entries(row).map(([key, value], j) => (
                      <td key={j} style={{ padding: '8px', textAlign: 'center' }}>{value ?? '–'}</td>
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
