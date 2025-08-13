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


//added import statements for toast notifications instead of alert boxes
// import React, { useState } from 'react';
// import axios from 'axios';
// import confetti from 'canvas-confetti';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
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

//     if (file.type !== "text/csv" && !file.name.endsWith(".csv")) {
//         return alert("Only CSV files are allowed.");
//     }

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const res = await axios.post('http://47.129.238.41/DataUpload', formData);
//       setPreviewData(res.data.rows || []);
//       setUploaded(true);
//         toast.success("✅ File Previewed successfully!", {
//         position: "top-center",
//         autoClose: 2000,
//         theme: "colored"
//       });
//     } catch (error) {
//       console.error("Upload failed:", error);
//       toast.error("❌ Failed to upload file.", {
//         position: "top-center",
//         autoClose: 3000,
//         theme: "colored"
//       });
//     }
//   };

//   const handleConfirm = async () => {
//     setConfirming(true);
//     try {
//       await axios.post('http://47.129.238.41/DataUpload/confirmUpload', {
//         confirm: true
//       });
      
//       //alert("Data successfully inserted/updated!");
//       toast.success("✅ Data successfully inserted/updated!", {
//         position: "top-center",
//         autoClose: 3000,
//         theme: "colored"
//       });
//       setFile(null);
//       setPreviewData([]);
//       setUploaded(false);
//     } catch (error) {
//       console.error("Confirm failed:", error);
//       //alert("Failed to confirm upload.");
//       toast.error("❌ Failed to confirm upload.", {
//       position: "top-center",
//       autoClose: 3000,
//       theme: "colored"
//     });
//     } finally {
//       setConfirming(false);
//     }
//   };

//   return (
//     <div style={{ padding: '2rem' }}>
//       <h2>Upload Student Excel/CSV</h2>

//       <input type="file" accept=".csv" onChange={handleFileChange} />
//       <button onClick={handleUpload} style={{ marginLeft: '10px' }}>
//         Upload
//       </button>

//       {uploaded && previewData.length > 0 && (
//         <>
//           <h3 style={{ marginTop: '2rem' }}>Preview:</h3>
//           <div
//             style={{
//               overflowX: 'auto',
//               maxHeight: '400px',
//               marginBottom: '1rem',
//               boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
//               borderRadius: '8px'
//             }}
//           >
//             <table
//               cellPadding="8"
//               style={{
//                 borderCollapse: 'collapse',
//                 width: '100%',
//                 fontFamily: 'Arial, sans-serif',
//                 fontSize: '0.9rem',
//                 color: '#333',
//                 backgroundColor: '#fff',
//                 border: '1px solid #ddd'
//               }}
//             >
//               <thead>
//                 <tr style={{ backgroundColor: '#f4f6f8', fontWeight: 'bold', borderBottom: '2px solid #ddd' }}>
//                   {Object.keys(previewData[0]).map((key, index) => (
//                     <th key={index} style={{ padding: '10px' }}>{key}</th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {previewData.map((row, i) => (
//                   <tr
//                     key={i}
//                     style={{
//                       backgroundColor: i % 2 === 0 ? '#ffffff' : '#f9f9f9',
//                       borderBottom: '1px solid #eee',
//                       transition: 'background 0.3s'
//                     }}
//                     onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e6f7ff')}
//                     onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = i % 2 === 0 ? '#ffffff' : '#f9f9f9')}
//                   >
//                     {Object.entries(row).map(([key, value], j) => (
//                       <td key={j} style={{ padding: '8px', textAlign: 'center' }}>{value ?? '–'}</td>
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
//         <ToastContainer />
//     </div>
//   );
// };

// export default UploadPage;
//add import statements for toast notififications instead of alert boxes and preview data for uploaded file and simulated database merge
//also added _status field to indicate new, updated, or untouched rows, such that
//yellow for updated, green for new, and gray for untouched
// import React, { useState } from 'react';
// import axios from 'axios';
// import confetti from 'canvas-confetti';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const UploadPage = () => {
//   const [file, setFile] = useState(null);
//   const [previewData, setPreviewData] = useState([]);
//   const [mergedPreview, setMergedPreview] = useState([]);
//   const [uploaded, setUploaded] = useState(false);
//   const [confirming, setConfirming] = useState(false);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//     setPreviewData([]);
//     setMergedPreview([]);
//     setUploaded(false);
//   };

//   const handleUpload = async () => {
//     if (!file) return toast.error("❌ Please select a file first.");
//     if (file.type !== "text/csv" && !file.name.endsWith(".csv")) {
//       return toast.error("❌ Only CSV files are allowed.");
//     }

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const res = await axios.post(`${import.meta.env.VITE_DOMAIN_NAME || "http://0.0.0.0"}/DataUpload`, formData);
//       const preview = res.data.rows || [];
//       setPreviewData(preview);

//       const dbRes = await axios.get(`${import.meta.env.VITE_DOMAIN_NAME || "http://0.0.0.0"}/students/all`);
//       const currentDB = dbRes.data || dbRes.data.rows || [];

//       const merged = simulateMerge(currentDB, preview);
//       setMergedPreview(merged);

//       setUploaded(true);
//       toast.success("✅ File previewed successfully!", {
//         position: "top-center",
//         autoClose: 2000,
//         theme: "colored"
//       });
//     } catch (error) {
//       console.error("Upload failed:", error.response?.data || error.message);
//       toast.error("❌ Failed to preview the file.", {
//         position: "top-center",
//         autoClose: 3000,
//         theme: "colored"
//       });
//     }
//   };

//   const normalize = (val) => {
//     if (val === null || val === undefined) return '';
//     return String(val).trim();
//   };

//   const simulateMerge = (dbRows, previewRows) => {
//     const dbMap = new Map(dbRows.map(row => [row.StudentID, row]));
//     const previewMap = new Map(previewRows.map(row => [row.StudentID, row]));

//     const combined = [];

//     // Process preview rows first
//     for (const previewRow of previewRows) {
//       const dbRow = dbMap.get(previewRow.StudentID);

//       if (!dbRow) {
//         combined.push({ ...previewRow, _source: 'preview', _status: 'new' });
//       } else {
//         let isChanged = false;
//         for (const key of Object.keys(previewRow)) {
//           if (key === 'StudentID') continue;
//           const dbVal = normalize(dbRow[key]);
//           const previewVal = normalize(previewRow[key]);
//           if (dbVal !== previewVal) {
//             isChanged = true;
//             break;
//           }
//         }
//         combined.push({
//           ...previewRow,
//           _source: 'preview',
//           _status: isChanged ? 'updated' : 'untouched'
//         });
//       }
//     }

//     // Add database rows not in preview
//     for (const dbRow of dbRows) {
//       if (!previewMap.has(dbRow.StudentID)) {
//         combined.push({ ...dbRow, _source: 'database', _status: 'untouched' });
//       }
//     }

//     return combined;
//   };

//   const handleConfirm = async () => {
//     setConfirming(true);
//     try {
//       await axios.post(`${import.meta.env.VITE_DOMAIN_NAME || "http://0.0.0.0"}/DataUpload/confirmUpload`, {
//         confirm: true
//       });

//       confetti({
//         particleCount: 150,
//         spread: 100,
//         origin: { y: 0.4 }
//       });

//       toast.success("✅ Data successfully inserted/updated!", {
//         position: "top-center",
//         autoClose: 3000,
//         theme: "colored"
//       });

//       setFile(null);
//       setPreviewData([]);
//       setMergedPreview([]);
//       setUploaded(false);
//     } catch (error) {
//       console.error("Confirm failed:", error);
//       toast.error("❌ Failed to confirm upload.", {
//         position: "top-center",
//         autoClose: 3000,
//         theme: "colored"
//       });
//     } finally {
//       setConfirming(false);
//     }
//   };

//   const renderTable = (data, title, highlightStatus = false) => (
//     <>
//       <h3 style={{ marginTop: '2rem' }}>{title}</h3>
//       <div
//         style={{
//           overflowX: 'auto',
//           maxHeight: '400px',
//           marginBottom: '1rem',
//           boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
//           borderRadius: '8px'
//         }}
//       >
//         <table
//           cellPadding="8"
//           style={{
//             borderCollapse: 'collapse',
//             width: '100%',
//             fontFamily: 'Arial, sans-serif',
//             fontSize: '0.9rem',
//             color: '#333',
//             backgroundColor: '#fff',
//             border: '1px solid #ddd'
//           }}
//         >
//           <thead>
//             <tr style={{ backgroundColor: '#f4f6f8', fontWeight: 'bold', borderBottom: '2px solid #ddd' }}>
//               {Object.keys(data[0]).map((key, index) => (
//                 <th key={index} style={{ padding: '10px' }}>{key}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((row, i) => {
//               const status = row._status;
//               const bgColor =
//                 status === 'new' ? '#e6ffe6' :
//                 status === 'updated' ? '#fffbe6' :
//                 status === 'untouched' ? '#f0f0f0' :
//                 i % 2 === 0 ? '#ffffff' : '#f9f9f9';

//               return (
//                 <tr
//                   key={i}
//                   style={{
//                     backgroundColor: bgColor,
//                     borderBottom: '1px solid #eee',
//                     transition: 'background 0.3s'
//                   }}
//                   onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e6f7ff')}
//                   onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = bgColor)}
//                 >
//                   {Object.entries(row).map(([key, value], j) => (
//                     <td key={j} style={{ padding: '8px', textAlign: 'center' }}>
//                       {key === '_status'
//                         ? value === 'new'
//                           ? '🆕 New'
//                           : value === 'updated'
//                           ? '✏️ Updated'
//                           : value === 'untouched'
//                           ? '⚪ Untouched'
//                           : ''
//                         : value ?? '–'}
//                     </td>
//                   ))}
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );

//   return (
//     <div style={{ padding: '2rem' }}>
//       <h2>Upload Student CSV</h2>

//       <input type="file" accept=".csv" onChange={handleFileChange} />
//       <button onClick={handleUpload} style={{ marginLeft: '10px' }}>
//         Upload
//       </button>

//       {uploaded && previewData.length > 0 && (
//         <>
//           {renderTable(previewData, "📄 Uploaded File Preview")}
//           {mergedPreview.length > 0 && renderTable(mergedPreview, "📊 Simulated Database After Merge", true)}

//           <button onClick={handleConfirm} disabled={confirming}>
//             {confirming ? "Confirming..." : "Confirm Upload"}
//           </button>
//         </>
//       )}

//       <ToastContainer />
//     </div>
//   );
// };

// export default UploadPage;


// import React, { useState } from 'react';
// import axios from 'axios';
// import confetti from 'canvas-confetti';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const UploadPage = () => {
//   const [file, setFile] = useState(null);
//   const [previewData, setPreviewData] = useState([]);
//   const [mergedPreview, setMergedPreview] = useState([]);
//   const [uploaded, setUploaded] = useState(false);
//   const [confirming, setConfirming] = useState(false);
//   const domain = import.meta.env.VITE_DOMAIN_NAME?.trim() || "http://0.0.0.0";
//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//     setPreviewData([]);
//     setMergedPreview([]);
//     setUploaded(false);
//   };

//   const handleUpload = async () => {
//     if (!file) return toast.error("❌ Please select a file first.");
//     if (!file.name.endsWith(".csv") && !file.name.endsWith(".xlsx") && !file.name.endsWith(".xlsm") && !file.name.endsWith(".xlsb") && !file.name.endsWith(".xltx")) {
//       return toast.error("❌ Only Excel files are allowed.");
//     }

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const res = await axios.post(`${domain}/DataUpload`, formData);
//       const preview = res.data.rows || [];
//       setPreviewData(preview);

//       const dbRes = await axios.get(`${domain}/students/all`);
//       const currentDB = dbRes.data || dbRes.data.rows || [];

//       const merged = simulateMerge(currentDB, preview);
//       setMergedPreview(merged);

//       setUploaded(true);
//       toast.success("✅ File previewed successfully!", {
//         position: "top-center",
//         autoClose: 2000,
//         theme: "colored"
//       });
//     } catch (error) {
//       console.error("Upload failed:", error.response?.data || error.message);
//       toast.error("❌ Failed to preview the file.", {
//         position: "top-center",
//         autoClose: 3000,
//         theme: "colored"
//       });
//     }
//   };

//   const normalize = (val) => {
//     if (val === null || val === undefined) return '';
//     return String(val).trim();
//   };

//   const simulateMerge = (dbRows, previewRows) => {
//     const dbMap = new Map(dbRows.map(row => [row.StudentID, row]));
//     const previewMap = new Map(previewRows.map(row => [row.StudentID, row]));

//     const combined = [];

//     for (const previewRow of previewRows) {
//       const dbRow = dbMap.get(previewRow.StudentID);

//       if (!dbRow) {
//         combined.push({ ...previewRow, _source: 'preview', _status: 'new' });
//       } else {
//         const changedFields = [];

//         for (const key of Object.keys(previewRow)) {
//           if (key === 'StudentID') continue;
//           const dbVal = normalize(dbRow[key]);
//           const previewVal = normalize(previewRow[key]);
//           if (dbVal !== previewVal) {
//             changedFields.push(key);
//             changedFields.push(",");
//           }
//         }

//         combined.push({
//           ...previewRow,
//           _source: 'preview',
//           _status: changedFields.length > 0 ? 'updated' : 'untouched',
//           _changedFields: changedFields
//         });
//       }
//     }

//     for (const dbRow of dbRows) {
//       if (!previewMap.has(dbRow.StudentID)) {
//         combined.push({ ...dbRow, _source: 'database', _status: 'untouched' });
//       }
//     }

//     return combined;
//   };

//   const handleConfirm = async () => {
//     setConfirming(true);
//     try {
//       await axios.post(`${domain}/DataUpload/confirmUpload`, {
//         confirm: true
//       });

//       toast.success("✅ Data successfully inserted/updated!", {
//         position: "top-center",
//         autoClose: 3000,
//         theme: "colored"
//       });

//       setFile(null);
//       setPreviewData([]);
//       setMergedPreview([]);
//       setUploaded(false);
//     } catch (error) {
//       console.error("Confirm failed:", error);
//       toast.error("❌ Failed to confirm upload.", {
//         position: "top-center",
//         autoClose: 3000,
//         theme: "colored"
//       });
//     } finally {
//       setConfirming(false);
//     }
//   };

//   const renderTable = (data, title, highlightStatus = false) => (
//     <>
//       <h3 style={{ marginTop: '2rem' }}>{title}</h3>
//       <div
//         style={{
//           overflowX: 'auto',
//           maxHeight: '400px',
//           marginBottom: '1rem',
//           boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
//           borderRadius: '8px'
//         }}
//       >
//         <table
//           cellPadding="8"
//           style={{
//             borderCollapse: 'collapse',
//             width: '100%',
//             fontFamily: 'Arial, sans-serif',
//             fontSize: '0.9rem',
//             color: '#333',
//             backgroundColor: '#fff',
//             border: '1px solid #ddd'
//           }}
//         >
//           <thead>
//             <tr style={{ backgroundColor: '#f4f6f8', fontWeight: 'bold', borderBottom: '2px solid #ddd' }}>
//               {Object.keys(data[0]).map((key, index) => (
//                 <th key={index} style={{ padding: '10px' }}>{key}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((row, i) => {
//               const status = row._status;
//               const bgColor =
//                 status === 'new' ? '#e6ffe6' :
//                 status === 'updated' ? '#fffbe6' :
//                 status === 'untouched' ? '#f0f0f0' :
//                 i % 2 === 0 ? '#ffffff' : '#f9f9f9';

//               return (
//                 <tr
//                   key={i}
//                   style={{
//                     backgroundColor: bgColor,
//                     borderBottom: '1px solid #eee',
//                     transition: 'background 0.3s'
//                   }}
//                   onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e6f7ff')}
//                   onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = bgColor)}
//                 >
//                   {Object.entries(row).map(([key, value], j) => {
//                     const isChanged = row._status === 'updated' && row._changedFields?.includes(key);
//                     const cellStyle = {
//                       padding: '8px',
//                       textAlign: 'center',
//                       backgroundColor: isChanged ? '#fff2cc' : undefined,
//                       fontWeight: isChanged ? 'bold' : undefined,
//                       border: '1px solid #eee'
//                     };

//                     return (
//                       <td key={j} style={cellStyle}>
//                         {key === '_status'
//                           ? value === 'new'
//                             ? '🆕 New'
//                             : value === 'updated'
//                             ? '✏️ Updated'
//                             : value === 'untouched'
//                             ? '⚪ Untouched'
//                             : ''
//                           : value ?? '–'}
//                       </td>
//                     );
//                   })}
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );

//   return (
//     <div style={{ padding: '2rem' }}>
//       <h2>Upload Student Excel File</h2>

//       <input type="file" accept=".xlsx,.xlsm,.xlsb,.xltx" onChange={handleFileChange} />
//       <button onClick={handleUpload} style={{ marginLeft: '10px' }}>
//         Preview
//       </button>

//       {uploaded && previewData.length > 0 && (
//         <>
//           {renderTable(previewData, "📄 Uploaded File Preview")}
//           {mergedPreview.length > 0 && renderTable(mergedPreview, "📊 Simulated Database After Merge", true)}

//           <button onClick={handleConfirm} disabled={confirming}>
//             {confirming ? "Confirming..." : "Confirm Upload"}
//           </button>
//         </>
//       )}

//       <ToastContainer />
//     </div>
//   );
// };

// export default UploadPage;

//changing the simulation table to where it only includes the columns that are the same as in the database, anything else get discarded(not included)
//In addition, the _status and changefields will be according to that columns alone
import React, { useState } from 'react';
import axios from 'axios';
import confetti from 'canvas-confetti';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [previewData, setPreviewData] = useState([]);
  const [mergedPreview, setMergedPreview] = useState([]);
  const [uploaded, setUploaded] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const domain = import.meta.env.VITE_DOMAIN_NAME?.trim() || "http://0.0.0.0";

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setPreviewData([]);
    setMergedPreview([]);
    setUploaded(false);
  };

  const handleUpload = async () => {
    if (!file) return toast.error("❌ Please select a file first.");
    if (!file.name.endsWith(".xlsx") && !file.name.endsWith(".xlsm") && !file.name.endsWith(".xlsb") && !file.name.endsWith(".xltx")) {
      return toast.error("❌ Only Excel files are allowed.");
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post(`${domain}/DataUpload`, formData);
      const preview = res.data.rows || [];
      setPreviewData(preview);

      const dbRes = await axios.get(`${domain}/students/all`);
      const currentDB = dbRes.data || dbRes.data.rows || [];

      const merged = simulateMerge(currentDB, preview);
      setMergedPreview(merged);
      setUploaded(true);
      toast.success("✅ File previewed successfully!", {
        position: "top-center",
        autoClose: 2000,
        theme: "colored"
      });
    } catch (error) {
      console.error("Upload failed:", error.response?.data || error.message);
      toast.error("❌ Failed to preview the file.", {
        position: "top-center",
        autoClose: 3000,
        theme: "colored"
      });
    }
  };

  const normalize = (val) => {
    if (val === null || val === undefined) return '';
    return String(val).trim();
  };

  // *** ONLY CHANGED THIS FUNCTION ***
  const simulateMerge = (dbRows, previewRows) => {
    if (dbRows.length === 0) return previewRows.map(row => ({ ...row, _source: 'preview', _status: 'new' }));

    // Get database columns to compare (all keys from dbRows, except 'StudentID' and keys starting with _)
    const dbColumns = Object.keys(dbRows[0]).filter(key => key !== 'StudentID' && !key.startsWith('_'));

    const dbMap = new Map(dbRows.map(row => [row.StudentID, row]));
    const previewMap = new Map(previewRows.map(row => [row.StudentID, row]));

    const combined = [];

    for (const previewRow of previewRows) {
      const dbRow = dbMap.get(previewRow.StudentID);

      if (!dbRow) {
        // New row - include only db columns plus StudentID and other keys from previewRow
        const filteredRow = { StudentID: previewRow.StudentID };
        for (const col of dbColumns) {
          filteredRow[col] = previewRow[col] ?? '';
        }
        combined.push({ ...filteredRow, _source: 'preview', _status: 'new' });
      } else {
        const changedFields = [];

        // Compare only dbColumns
        for (const col of dbColumns) {
          const dbVal = normalize(dbRow[col]);
          const previewVal = normalize(previewRow[col]);
          if (dbVal !== previewVal) {
            changedFields.push(col);
          }
        }

        // Construct merged row with only dbColumns + StudentID
        const mergedRow = { StudentID: previewRow.StudentID };
        for (const col of dbColumns) {
          mergedRow[col] = previewRow[col] ?? '';
        }

        combined.push({
          ...mergedRow,
          _source: 'preview',
          _status: changedFields.length > 0 ? 'updated' : 'untouched',
          _changedFields: changedFields,
        });
      }
    }

    // Add untouched rows from database not in preview (only dbColumns + StudentID)
    for (const dbRow of dbRows) {
      if (!previewMap.has(dbRow.StudentID)) {
        const filteredRow = { StudentID: dbRow.StudentID };
        for (const col of dbColumns) {
          filteredRow[col] = dbRow[col] ?? '';
        }
        combined.push({ ...filteredRow, _source: 'database', _status: 'untouched' });
      }
    }

    return combined;
  };
  // *** END OF CHANGED FUNCTION ***

  const handleConfirm = async () => {
    setConfirming(true);
    try {
      await axios.post(`${domain}/DataUpload/confirmUpload`, {
        confirm: true
      });

      toast.success("✅ Data successfully inserted/updated!", {
        position: "top-center",
        autoClose: 3000,
        theme: "colored"
      });

      setFile(null);
      setPreviewData([]);
      setMergedPreview([]);
      setUploaded(false);
    } catch (error) {
      console.error("Confirm failed:", error);
      toast.error("❌ Failed to confirm upload.", {
        position: "top-center",
        autoClose: 3000,
        theme: "colored"
      });
    } finally {
      setConfirming(false);
    }
  };

  const renderTable = (data, title, highlightStatus = false) => (
    <>
      <h3 style={{ marginTop: '2rem' }}>{title}</h3>
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
              {Object.keys(data[0]).map((key, index) => (
                <th key={index} style={{ padding: '10px' }}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => {
              const status = row._status;
              const bgColor =
                status === 'new' ? '#e6ffe6' :
                status === 'updated' ? '#fffbe6' :
                status === 'untouched' ? '#f0f0f0' :
                i % 2 === 0 ? '#ffffff' : '#f9f9f9';

              return (
                <tr
                  key={i}
                  style={{
                    backgroundColor: bgColor,
                    borderBottom: '1px solid #eee',
                    transition: 'background 0.3s'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e6f7ff')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = bgColor)}
                >

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
                          ? value === 'new'
                            ? '🆕 New'
                            : value === 'updated'
                            ? '✏️ Updated'
                            : value === 'untouched'
                            ? '⚪ Untouched'
                            : ''
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

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Upload Student Excel File</h2>

      <input type="file" accept=".xlsx,.xlsm,.xlsb,.xltx" onChange={handleFileChange} />
      <button onClick={handleUpload} style={{ marginLeft: '10px' }}>
        Preview
      </button>

      {uploaded && previewData.length > 0 && (
        <>
          {renderTable(previewData, "📄 Uploaded File Preview")}
          {mergedPreview.length > 0 && renderTable(mergedPreview, "📊 Simulated Database After Merge", true)}

          <button onClick={handleConfirm} disabled={confirming}>
            {confirming ? "Confirming..." : "Confirm Upload"}
          </button>
        </>
      )}

      <ToastContainer />
    </div>
  );
};

export default UploadPage;


///citizenID/upload
///citizenID/upload/confirmUpload
///citizenID/all