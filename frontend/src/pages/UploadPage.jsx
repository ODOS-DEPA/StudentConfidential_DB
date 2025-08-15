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
//     if (!file.name.endsWith(".xlsx") && !file.name.endsWith(".xlsm") && !file.name.endsWith(".xlsb") && !file.name.endsWith(".xltx")) {
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

//   // *** ONLY CHANGED THIS FUNCTION ***
//   const simulateMerge = (dbRows, previewRows) => {
//     if (dbRows.length === 0) return previewRows.map(row => ({ ...row, _source: 'preview', _status: 'new' }));

//     // Get database columns to compare (all keys from dbRows, except 'StudentID' and keys starting with _)
//     const dbColumns = Object.keys(dbRows[0]).filter(key => key !== 'StudentID' && !key.startsWith('_'));

//     const dbMap = new Map(dbRows.map(row => [row.StudentID, row]));
//     const previewMap = new Map(previewRows.map(row => [row.StudentID, row]));

//     const combined = [];

//     for (const previewRow of previewRows) {
//       const dbRow = dbMap.get(previewRow.StudentID);

//       if (!dbRow) {
//         // New row - include only db columns plus StudentID and other keys from previewRow
//         const filteredRow = { StudentID: previewRow.StudentID };
//         for (const col of dbColumns) {
//           filteredRow[col] = previewRow[col] ?? '';
//         }
//         combined.push({ ...filteredRow, _source: 'preview', _status: 'new' });
//       } else {
//         const changedFields = [];

//         // Compare only dbColumns
//         for (const col of dbColumns) {
//           const dbVal = normalize(dbRow[col]);
//           const previewVal = normalize(previewRow[col]);
//           if (dbVal !== previewVal) {
//             changedFields.push(col);
//           }
//         }

//         // Construct merged row with only dbColumns + StudentID
//         const mergedRow = { StudentID: previewRow.StudentID };
//         for (const col of dbColumns) {
//           mergedRow[col] = previewRow[col] ?? '';
//         }

//         combined.push({
//           ...mergedRow,
//           _source: 'preview',
//           _status: changedFields.length > 0 ? 'updated' : 'untouched',
//           _changedFields: changedFields,
//         });
//       }
//     }

//     // Add untouched rows from database not in preview (only dbColumns + StudentID)
//     for (const dbRow of dbRows) {
//       if (!previewMap.has(dbRow.StudentID)) {
//         const filteredRow = { StudentID: dbRow.StudentID };
//         for (const col of dbColumns) {
//           filteredRow[col] = dbRow[col] ?? '';
//         }
//         combined.push({ ...filteredRow, _source: 'database', _status: 'untouched' });
//       }
//     }

//     return combined;
//   };
//   // *** END OF CHANGED FUNCTION ***

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


///citizenID/upload
///citizenID/upload/confirmUpload
///citizenID/all
//problem with rendering mild sets of data with 30k rows
//fixing phase: remove simulation, integrate functions inside preview instead and with the helps of pagination for rendering run-time optimization 
// import React, { useState } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const UploadPage = () => {
//   const [file, setFile] = useState(null);
//   const [previewData, setPreviewData] = useState([]);
//   const [uploaded, setUploaded] = useState(false);
//   const [confirming, setConfirming] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);

//   const rowsPerPage = 50; // จำนวน row ต่อหน้า
//   const domain = import.meta.env.VITE_DOMAIN_NAME?.trim() || "http://0.0.0.0";

//   // Reset state
//   const resetState = () => {
//     setPreviewData([]);
//     setUploaded(false);
//     setCurrentPage(1);
//   };

//   // เลือกไฟล์
//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     console.log("Selected file:", selectedFile);
//     setFile(selectedFile);
//     resetState();
//   };

//   // ตรวจสอบไฟล์นามสกุล
//   const validateFile = (file) => {
//     if (!file) return false;
//     const allowedExtensions = ['csv','xlsx','xlsm','xlsb','xltx'];
//     const ext = file.name.split('.').pop().toLowerCase();
//     return allowedExtensions.includes(ext);
//   };

//   const normalize = (val) => (val === null || val === undefined ? '' : String(val).trim());

//   // Merge preview กับ database
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
//           if (normalize(dbRow[key]) !== normalize(previewRow[key])) changedFields.push(key);
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

//   // Upload & preview
//   const handleUpload = async () => {
//   if (!file) return toast.error("❌ Please select a file first.");
//   if (!validateFile(file)) return toast.error("❌ Only CSV or Excel files are allowed.");

//   const formData = new FormData();
//   formData.append('file', file);

//   try {
//     // Preview data from Excel
//     const res = await axios.post(`${domain}/DataUpload`, formData);
//     const preview = res.data.rows || [];

//     // Fetch current DB rows
//     const dbRes = await axios.get(`${domain}/students/all`);
//     const currentDB = dbRes.data?.rows || dbRes.data || [];
//     const dbMap = new Map(currentDB.map(r => [r.StudentID, r]));

//     // Compare preview vs DB
//     const previewWithStatus = preview.map(row => {
//       const dbRow = dbMap.get(row.StudentID);
//       if (!dbRow) return { ...row, _status: 'new' }; // New row

//       // Check if any field differs
//       const changedFields = Object.keys(row).filter(
//         key => key !== 'StudentID' && row[key] != dbRow[key]
//       );

//       return {
//         ...row,
//         _status: changedFields.length > 0 ? 'updated' : 'untouched',
//         _changedFields: changedFields
//       };
//     });

//     setPreviewData(previewWithStatus);
//     setUploaded(true);

//     toast.success("✅ File previewed successfully!", { position: "top-center", autoClose: 2000, theme: "colored" });
//   } catch (error) {
//     console.error("Upload failed:", error.response?.data || error.message);
//     toast.error("❌ Failed to preview the file.", { position: "top-center", autoClose: 3000, theme: "colored" });
//   }
// };


//   // Confirm upload
//   const handleConfirm = async () => {
//     setConfirming(true);
//     try {
//       await axios.post(`${domain}/DataUpload/confirmUpload`, { confirm: true });
//       toast.success("✅ Data successfully inserted/updated!", { position: "top-center", autoClose: 3000, theme: "colored" });
//       setFile(null);
//       resetState();
//     } catch (error) {
//       console.error("Confirm failed:", error);
//       toast.error("❌ Failed to confirm upload.", { position: "top-center", autoClose: 3000, theme: "colored" });
//     } finally {
//       setConfirming(false);
//     }
//   };

//   // Render table
//   const renderTable = (data, title) => (
//     <>
//       <h3 style={{ marginTop: '2rem' }}>{title}</h3>
//       <div style={{ overflowX: 'auto', maxHeight: '400px', marginBottom: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', borderRadius: '8px' }}>
//         <table style={{ borderCollapse: 'collapse', width: '100%', fontFamily: 'Arial', fontSize: '0.9rem', color: '#333', backgroundColor: '#fff', border: '1px solid #ddd' }}>
//           <thead>
//             <tr style={{ backgroundColor: '#f4f6f8', fontWeight: 'bold', borderBottom: '2px solid #ddd' }}>
//               {Object.keys(data[0]).map((key, idx) => <th key={idx} style={{ padding: '10px' }}>{key}</th>)}
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((row, i) => {
//               const status = row._status;
//               const bgColor =
//                 status === 'new' ? '#e6ffe6' :
//                 status === 'updated' ? '#fffbe6' :
//                 status === 'untouched' ? '#f0f0f0' :
//                 i % 2 === 0 ? '#fff' : '#f9f9f9';

//               return (
//                 <tr key={i} style={{ backgroundColor: bgColor, borderBottom: '1px solid #eee', transition: 'background 0.3s' }}
//                     onMouseEnter={e => e.currentTarget.style.backgroundColor = '#e6f7ff'}
//                     onMouseLeave={e => e.currentTarget.style.backgroundColor = bgColor}>
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
//                           ? status === 'new' ? '🆕 New' : status === 'updated' ? '✏️ Updated' : '⚪ Untouched'
//                           : typeof value === 'boolean'
//                           ? value ? '✔' : '✖'
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

//   // Pagination logic
//   const totalPages = Math.ceil(previewData.length / rowsPerPage);
//   const indexOfLastRow = currentPage * rowsPerPage;
//   const indexOfFirstRow = indexOfLastRow - rowsPerPage;
//   const currentRows = previewData.slice(indexOfFirstRow, indexOfLastRow);

//   return (
//     <div style={{ padding: '2rem' }}>
//       <h2>Upload Student CSV / Excel</h2>
//       <input type="file" accept=".csv,.xlsx,.xlsm,.xlsb,.xltx" onChange={handleFileChange} />
//       <button onClick={handleUpload} style={{ marginLeft: '10px' }}>Preview</button>

//       {uploaded && previewData.length > 0 && (
//         <>
//           {renderTable(currentRows, `📄 Uploaded File Preview (Page ${currentPage})`)}

//           {/* Pagination */}
//           <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
//             <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}>Previous</button>
//             <span>Page {currentPage} / {totalPages}</span>
//             <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>Next</button>
//           </div>

//           <button onClick={handleConfirm} disabled={confirming} style={{ marginTop: '1rem' }}>
//             {confirming ? "Confirming..." : "Confirm Upload"}
//           </button>
//         </>
//       )}

//       <ToastContainer />
//     </div>
//   );
// };

// export default UploadPage;
//create search bar for a more user-friendly experience
// import React, { useState } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const UploadPage = () => {
//   const [file, setFile] = useState(null);
//   const [previewData, setPreviewData] = useState([]);
//   const [uploaded, setUploaded] = useState(false);
//   const [confirming, setConfirming] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState("");

//   const rowsPerPage = 50;
//   const domain = import.meta.env.VITE_DOMAIN_NAME?.trim() || "http://0.0.0.0";

//   const resetState = () => {
//     setPreviewData([]);
//     setUploaded(false);
//     setCurrentPage(1);
//     setSearchTerm("");
//   };

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     console.log("Selected file:", selectedFile);
//     setFile(selectedFile);
//     resetState();
//   };

//   const validateFile = (file) => {
//     if (!file) return false;
//     const allowedExtensions = ['csv','xlsx','xlsm','xlsb','xltx'];
//     const ext = file.name.split('.').pop().toLowerCase();
//     return allowedExtensions.includes(ext);
//   };

//   const normalize = (val) => (val === null || val === undefined ? '' : String(val).trim());

//   const handleUpload = async () => {
//     if (!file) return toast.error("❌ Please select a file first.");
//     if (!validateFile(file)) return toast.error("❌ Only CSV or Excel files are allowed.");

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const res = await axios.post(`${domain}/DataUpload`, formData);
//       const preview = res.data.rows || [];

//       const dbRes = await axios.get(`${domain}/students/all`);
//       const currentDB = dbRes.data?.rows || dbRes.data || [];
//       const dbMap = new Map(currentDB.map(r => [r.StudentID, r]));

//       const previewWithStatus = preview.map(row => {
//         const dbRow = dbMap.get(row.StudentID);
//         if (!dbRow) return { ...row, _status: 'new' };

//         const changedFields = Object.keys(row).filter(
//           key => key !== 'StudentID' && row[key] != dbRow[key]
//         );

//         return {
//           ...row,
//           _status: changedFields.length > 0 ? 'updated' : 'untouched',
//           _changedFields: changedFields
//         };
//       });

//       setPreviewData(previewWithStatus);
//       setUploaded(true);
//       toast.success("✅ File previewed successfully!", { position: "top-center", autoClose: 2000, theme: "colored" });
//     } catch (error) {
//       console.error("Upload failed:", error.response?.data || error.message);
//       toast.error("❌ Failed to preview the file.", { position: "top-center", autoClose: 3000, theme: "colored" });
//     }
//   };

//   const handleConfirm = async () => {
//     setConfirming(true);
//     try {
//       await axios.post(`${domain}/DataUpload/confirmUpload`, { confirm: true });
//       toast.success("✅ Data successfully inserted/updated!", { position: "top-center", autoClose: 3000, theme: "colored" });
//       setFile(null);
//       resetState();
//     } catch (error) {
//       console.error("Confirm failed:", error);
//       toast.error("❌ Failed to confirm upload.", { position: "top-center", autoClose: 3000, theme: "colored" });
//     } finally {
//       setConfirming(false);
//     }
//   };

//   const renderTable = (data, title) => (
//     <>
//       <h3 style={{ marginTop: '2rem' }}>{title}</h3>
//       <div style={{ overflowX: 'auto', maxHeight: '400px', marginBottom: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', borderRadius: '8px' }}>
//         <table style={{ borderCollapse: 'collapse', width: '100%', fontFamily: 'Arial', fontSize: '0.9rem', color: '#333', backgroundColor: '#fff', border: '1px solid #ddd' }}>
//           <thead>
//             <tr style={{ backgroundColor: '#f4f6f8', fontWeight: 'bold', borderBottom: '2px solid #ddd' }}>
//               {Object.keys(data[0]).map((key, idx) => <th key={idx} style={{ padding: '10px' }}>{key}</th>)}
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((row, i) => {
//               const status = row._status;
//               const bgColor =
//                 status === 'new' ? '#e6ffe6' :
//                 status === 'updated' ? '#fffbe6' :
//                 status === 'untouched' ? '#f0f0f0' :
//                 i % 2 === 0 ? '#fff' : '#f9f9f9';

//               return (
//                 <tr key={i} style={{ backgroundColor: bgColor, borderBottom: '1px solid #eee', transition: 'background 0.3s' }}
//                     onMouseEnter={e => e.currentTarget.style.backgroundColor = '#e6f7ff'}
//                     onMouseLeave={e => e.currentTarget.style.backgroundColor = bgColor}>
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
//                           ? status === 'new'
//                             ? '🆕 New'
//                             : status === 'updated'
//                             ? '✏️ Updated'
//                             : '⚪ Untouched'
//                           : key === '_changedFields'
//                           ? (Array.isArray(value) ? value.join(', ') : value ?? '–')
//                           : typeof value === 'boolean'
//                           ? value ? '✔' : '✖'
//                           : value ?? '–'}
//                     </td>
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

//   // Filter logic — exact gender match, otherwise substring match
//   const filteredData = previewData.filter(row => {
//     if (!searchTerm.trim()) return true;
//     const lowerSearch = searchTerm.toLowerCase();

//     return Object.values(row).some(val => {
//       if (val == null) return false;
//       const strVal = String(val).toLowerCase().trim();

//       // Exact match for gender
//       if ((lowerSearch === "male" || lowerSearch === "female") && strVal === lowerSearch) {
//         return true;
//       }

//       // Otherwise normal substring match
//       return strVal.includes(lowerSearch);
//     });
//   });

//   // Pagination after filtering
//   const totalPages = Math.ceil(filteredData.length / rowsPerPage);
//   const indexOfLastRow = currentPage * rowsPerPage;
//   const indexOfFirstRow = indexOfLastRow - rowsPerPage;
//   const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

//   return (
//     <div style={{ padding: '2rem' }}>
//       <h2>Upload Student CSV / Excel</h2>
//       <input type="file" accept=".csv,.xlsx,.xlsm,.xlsb,.xltx" onChange={handleFileChange} />
//       <button onClick={handleUpload} style={{ marginLeft: '10px' }}>Preview</button>

//       {uploaded && previewData.length > 0 && (
//         <>
//           {/* Search Bar */}
//           <div style={{ marginTop: '1rem' }}>
//             <input
//               type="text"
//               placeholder="Search..."
//               value={searchTerm}
//               onChange={e => {
//                 setSearchTerm(e.target.value);
//                 setCurrentPage(1);
//               }}
//               style={{ padding: '6px', width: '250px' }}
//             />
//           </div>

//           {renderTable(currentRows, `📄 Uploaded File Preview (Page ${currentPage})`)}

//           {/* Pagination */}
//           <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
//             <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}>Previous</button>
//             <span>Page {currentPage} / {totalPages}</span>
//             <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>Next</button>
//           </div>

//           <button onClick={handleConfirm} disabled={confirming} style={{ marginTop: '1rem' }}>
//             {confirming ? "Confirming..." : "Confirm Upload"}
//           </button>
//         </>
//       )}

//       <ToastContainer />
//     </div>
//   );
// };

// export default UploadPage;


//hide columns that do not exist in database
// import React, { useState } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const UploadPage = () => {
//   const [file, setFile] = useState(null);
//   const [previewData, setPreviewData] = useState([]);
//   const [uploaded, setUploaded] = useState(false);
//   const [confirming, setConfirming] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState("");

//   const rowsPerPage = 50;
//   const domain = import.meta.env.VITE_DOMAIN_NAME?.trim() || "http://0.0.0.0";

//   const resetState = () => {
//     setPreviewData([]);
//     setUploaded(false);
//     setCurrentPage(1);
//     setSearchTerm("");
//   };

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     console.log("Selected file:", selectedFile);
//     setFile(selectedFile);
//     resetState();
//   };

//   const validateFile = (file) => {
//     if (!file) return false;
//     const allowedExtensions = ['csv','xlsx','xlsm','xlsb','xltx'];
//     const ext = file.name.split('.').pop().toLowerCase();
//     return allowedExtensions.includes(ext);
//   };

//   const normalize = (val) => (val === null || val === undefined ? '' : String(val).trim());

//   const handleUpload = async () => {
//   if (!file) return toast.error("❌ Please select a file first.");
//   if (!validateFile(file)) return toast.error("❌ Only CSV or Excel files are allowed.");

//   const formData = new FormData();
//   formData.append('file', file);

//   try {
//     const res = await axios.post(`${domain}/DataUpload`, formData);
//     const preview = res.data.rows || [];

//     const dbRes = await axios.get(`${domain}/students/all`);
//     const currentDB = dbRes.data?.rows || dbRes.data || [];
//     const dbMap = new Map(currentDB.map(r => [r.StudentID, r]));

//     // ✅ Actual DB columns
//     const dbColumns = currentDB.length > 0 ? Object.keys(currentDB[0]) : [];

//     const previewWithStatus = preview.map(row => {
//       const dbRow = dbMap.get(row.StudentID);

//       // Only compare DB columns except StudentID
//       const comparableCols = dbColumns.filter(col => col !== "StudentID");

//       if (!dbRow) {
//         return {
//           ...row,
//           _status: "new",
//           _changedFields: ""
//         };
//       }

//       const changedFields = comparableCols.filter(
//         col => row[col] != dbRow[col]
//       );

//       return {
//         ...row,
//         _status: changedFields.length > 0 ? "updated" : "untouched",
//         _changedFields: changedFields.join(", ")
//       };
//     });

//     // ✅ Keep only DB columns + _status + _changedFields
//     const filteredPreview = previewWithStatus.map(row => {
//       const filteredRow = {};
//       [...dbColumns, "_status", "_changedFields"].forEach(col => {
//         if (col in row) filteredRow[col] = row[col];
//       });
//       return filteredRow;
//     });

//     setPreviewData(filteredPreview);
//     setUploaded(true);
//     toast.success("✅ File previewed successfully!", { position: "top-center", autoClose: 2000, theme: "colored" });
//   } catch (error) {
//     console.error("Upload failed:", error.response?.data || error.message);
//     toast.error("❌ Failed to preview the file.", { position: "top-center", autoClose: 3000, theme: "colored" });
//   }
// };



//   const handleConfirm = async () => {
//     setConfirming(true);
//     try {
//       await axios.post(`${domain}/DataUpload/confirmUpload`, { confirm: true });
//       toast.success("✅ Data successfully inserted/updated!", { position: "top-center", autoClose: 3000, theme: "colored" });
//       setFile(null);
//       resetState();
//     } catch (error) {
//       console.error("Confirm failed:", error);
//       toast.error("❌ Failed to confirm upload.", { position: "top-center", autoClose: 3000, theme: "colored" });
//     } finally {
//       setConfirming(false);
//     }
//   };

//   const renderTable = (data, title) => (
//     <>
//       <h3 style={{ marginTop: '2rem' }}>{title}</h3>
//       <div style={{ overflowX: 'auto', maxHeight: '400px', marginBottom: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', borderRadius: '8px' }}>
//         <table style={{ borderCollapse: 'collapse', width: '100%', fontFamily: 'Arial', fontSize: '0.9rem', color: '#333', backgroundColor: '#fff', border: '1px solid #ddd' }}>
//           <thead>
//             <tr style={{ backgroundColor: '#f4f6f8', fontWeight: 'bold', borderBottom: '2px solid #ddd' }}>
//               {Object.keys(data[0]).map((key, idx) => <th key={idx} style={{ padding: '10px' }}>{key}</th>)}
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((row, i) => {
//               const status = row._status;
//               const bgColor =
//                 status === 'new' ? '#e6ffe6' :
//                 status === 'updated' ? '#fffbe6' :
//                 status === 'untouched' ? '#f0f0f0' :
//                 i % 2 === 0 ? '#fff' : '#f9f9f9';

//               return (
//                 <tr key={i} style={{ backgroundColor: bgColor, borderBottom: '1px solid #eee', transition: 'background 0.3s' }}
//                     onMouseEnter={e => e.currentTarget.style.backgroundColor = '#e6f7ff'}
//                     onMouseLeave={e => e.currentTarget.style.backgroundColor = bgColor}>
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
//                           ? status === 'new'
//                             ? '🆕 New'
//                             : status === 'updated'
//                             ? '✏️ Updated'
//                             : '⚪ Untouched'
//                           : key === '_changedFields'
//                           ? (Array.isArray(value) ? value.join(', ') : value ?? '–')
//                           : typeof value === 'boolean'
//                           ? value ? '✔' : '✖'
//                           : value ?? '–'}
//                     </td>
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

//   // Filter logic — exact gender match, otherwise substring match
//   const filteredData = previewData.filter(row => {
//     if (!searchTerm.trim()) return true;
//     const lowerSearch = searchTerm.toLowerCase();

//     return Object.values(row).some(val => {
//       if (val == null) return false;
//       const strVal = String(val).toLowerCase().trim();

//       // Exact match for gender
//       if ((lowerSearch === "male" || lowerSearch === "female") && strVal === lowerSearch) {
//         return true;
//       }

//       // Otherwise normal substring match
//       return strVal.includes(lowerSearch);
//     });
//   });

//   // Pagination after filtering
//   const totalPages = Math.ceil(filteredData.length / rowsPerPage);
//   const indexOfLastRow = currentPage * rowsPerPage;
//   const indexOfFirstRow = indexOfLastRow - rowsPerPage;
//   const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

//   return (
//     <div style={{ padding: '2rem' }}>
//       <h2>Upload Student CSV / Excel</h2>
//       <input type="file" accept=".csv,.xlsx,.xlsm,.xlsb,.xltx" onChange={handleFileChange} />
//       <button onClick={handleUpload} style={{ marginLeft: '10px' }}>Preview</button>

//       {uploaded && previewData.length > 0 && (
//         <>
//           {/* Search Bar */}
//           <div style={{ marginTop: '1rem' }}>
//             <input
//               type="text"
//               placeholder="Search..."
//               value={searchTerm}
//               onChange={e => {
//                 setSearchTerm(e.target.value);
//                 setCurrentPage(1);
//               }}
//               style={{ padding: '6px', width: '250px' }}
//             />
//           </div>

//           {renderTable(currentRows, `📄 Uploaded File Preview (Page ${currentPage})`)}

//           {/* Pagination */}
//           <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
//             <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}>Previous</button>
//             <span>Page {currentPage} / {totalPages}</span>
//             <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>Next</button>
//           </div>

//           <button onClick={handleConfirm} disabled={confirming} style={{ marginTop: '1rem' }}>
//             {confirming ? "Confirming..." : "Confirm Upload"}
//           </button>
//         </>
//       )}

//       <ToastContainer />
//     </div>
//   );
// };

// export default UploadPage;

//add table button for user to select which table to upload
// import React, { useState } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const UploadPage = () => {
//   const [file, setFile] = useState(null);
//   const [previewData, setPreviewData] = useState([]);
//   const [uploaded, setUploaded] = useState(false);
//   const [confirming, setConfirming] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [tableType, setTableType] = useState("checkstatus"); // ✅ new state

//   const rowsPerPage = 50;
//   const domain = import.meta.env.VITE_DOMAIN_NAME?.trim() || "http://0.0.0.0";

//   const resetState = () => {
//     setPreviewData([]);
//     setUploaded(false);
//     setCurrentPage(1);
//     setSearchTerm("");
//   };

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     console.log("Selected file:", selectedFile);
//     setFile(selectedFile);
//     resetState();
//   };

//   const validateFile = (file) => {
//     if (!file) return false;
//     const allowedExtensions = ['csv', 'xlsx', 'xlsm', 'xlsb', 'xltx'];
//     const ext = file.name.split('.').pop().toLowerCase();
//     return allowedExtensions.includes(ext);
//   };

//   const handleUpload = async () => {
//     if (!file) return toast.error("❌ Please select a file first.");
//     if (!validateFile(file)) return toast.error("❌ Only CSV or Excel files are allowed.");

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       // ✅ Select API endpoints based on tableType
//       const uploadUrl =
//         tableType === "checkstatus"
//           ? `${domain}/DataUpload`
//           : `${domain}/citizenID/upload`;

//       const dbUrl =
//         tableType === "checkstatus"
//           ? `${domain}/students/all`
//           : `${domain}/citizenID/all`;

//       const idKey = tableType === "checkstatus" ? "StudentID" : "CitizenID";

//       const res = await axios.post(uploadUrl, formData);
//       const preview = res.data.rows || [];

//       const dbRes = await axios.get(dbUrl);
//       const currentDB = dbRes.data?.rows || dbRes.data || [];
//       const dbMap = new Map(currentDB.map(r => [r[idKey], r]));

//       // ✅ Actual DB columns
//       const dbColumns = currentDB.length > 0 ? Object.keys(currentDB[0]) : [];

//       const previewWithStatus = preview.map(row => {
//         const dbRow = dbMap.get(row[idKey]);

//         const comparableCols = dbColumns.filter(col => col !== idKey);

//         if (!dbRow) {
//           return {
//             ...row,
//             _status: "new",
//             _changedFields: ""
//           };
//         }

//         const changedFields = comparableCols.filter(
//           col => row[col] != dbRow[col]
//         );

//         return {
//           ...row,
//           _status: changedFields.length > 0 ? "updated" : "untouched",
//           _changedFields: changedFields.join(", ")
//         };
//       });

//       const filteredPreview = previewWithStatus.map(row => {
//         const filteredRow = {};
//         [...dbColumns, "_status", "_changedFields"].forEach(col => {
//           if (col in row) filteredRow[col] = row[col];
//         });
//         return filteredRow;
//       });

//       setPreviewData(filteredPreview);
//       setUploaded(true);
//       toast.success("✅ File previewed successfully!", { position: "top-center", autoClose: 2000, theme: "colored" });
//     } catch (error) {
//       console.error("Upload failed:", error.response?.data || error.message);
//       toast.error("❌ Failed to preview the file.", { position: "top-center", autoClose: 3000, theme: "colored" });
//     }
//   };

//   const handleConfirm = async () => {
//     setConfirming(true);
//     try {
//       const confirmUrl =
//         tableType === "checkstatus"
//           ? `${domain}/DataUpload/confirmUpload`
//           : `${domain}/citizenID/upload/confirmUpload`;

//       await axios.post(confirmUrl, { confirm: true });
//       toast.success("✅ Data successfully inserted/updated!", { position: "top-center", autoClose: 3000, theme: "colored" });
//       setFile(null);
//       resetState();
//     } catch (error) {
//       console.error("Confirm failed:", error);
//       toast.error("❌ Failed to confirm upload.", { position: "top-center", autoClose: 3000, theme: "colored" });
//     } finally {
//       setConfirming(false);
//     }
//   };

//   const renderTable = (data, title) => (
//     <>
//       <h3 style={{ marginTop: '2rem' }}>{title}</h3>
//       <div style={{ overflowX: 'auto', maxHeight: '400px', marginBottom: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', borderRadius: '8px' }}>
//         <table style={{ borderCollapse: 'collapse', width: '100%', fontFamily: 'Arial', fontSize: '0.9rem', color: '#333', backgroundColor: '#fff', border: '1px solid #ddd' }}>
//           <thead>
//             <tr style={{ backgroundColor: '#f4f6f8', fontWeight: 'bold', borderBottom: '2px solid #ddd' }}>
//               {Object.keys(data[0]).map((key, idx) => <th key={idx} style={{ padding: '10px' }}>{key}</th>)}
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((row, i) => {
//               const status = row._status;
//               const bgColor =
//                 status === 'new' ? '#e6ffe6' :
//                   status === 'updated' ? '#fffbe6' :
//                     status === 'untouched' ? '#f0f0f0' :
//                       i % 2 === 0 ? '#fff' : '#f9f9f9';

//               return (
//                 <tr key={i} style={{ backgroundColor: bgColor, borderBottom: '1px solid #eee', transition: 'background 0.3s' }}
//                   onMouseEnter={e => e.currentTarget.style.backgroundColor = '#e6f7ff'}
//                   onMouseLeave={e => e.currentTarget.style.backgroundColor = bgColor}>
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
//                           ? status === 'new'
//                             ? '🆕 New'
//                             : status === 'updated'
//                               ? '✏️ Updated'
//                               : '⚪ Untouched'
//                           : key === '_changedFields'
//                             ? (Array.isArray(value) ? value.join(', ') : value ?? '–')
//                             : typeof value === 'boolean'
//                               ? value ? '✔' : '✖'
//                               : value ?? '–'}
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

//   const filteredData = previewData.filter(row => {
//     if (!searchTerm.trim()) return true;
//     const lowerSearch = searchTerm.toLowerCase();
//     return Object.values(row).some(val => {
//       if (val == null) return false;
//       const strVal = String(val).toLowerCase().trim();
//       if ((lowerSearch === "male" || lowerSearch === "female") && strVal === lowerSearch) {
//         return true;
//       }
//       return strVal.includes(lowerSearch);
//     });
//   });

//   const totalPages = Math.ceil(filteredData.length / rowsPerPage);
//   const indexOfLastRow = currentPage * rowsPerPage;
//   const indexOfFirstRow = indexOfLastRow - rowsPerPage;
//   const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

//   return (
//     <div style={{ padding: '2rem' }}>
//       <h2>Upload CSV / Excel</h2>

//       {/* ✅ Table type selector */}
//       <div style={{ marginBottom: '1rem' }}>
//         <label>Table: </label>
//         <select value={tableType} onChange={(e) => setTableType(e.target.value)}>
//           <option value="checkstatus">Check Status</option>
//           <option value="citizenid">Citizen ID</option>
//         </select>
//       </div>

//       <input type="file" accept=".csv,.xlsx,.xlsm,.xlsb,.xltx" onChange={handleFileChange} />
//       <button onClick={handleUpload} style={{ marginLeft: '10px' }}>Preview</button>

//       {uploaded && previewData.length > 0 && (
//         <>
//           <div style={{ marginTop: '1rem' }}>
//             <input
//               type="text"
//               placeholder="Search..."
//               value={searchTerm}
//               onChange={e => {
//                 setSearchTerm(e.target.value);
//                 setCurrentPage(1);
//               }}
//               style={{ padding: '6px', width: '250px' }}
//             />
//           </div>

//           {renderTable(currentRows, `📄 Uploaded File Preview (Page ${currentPage})`)}

//           <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
//             <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}>Previous</button>
//             <span>Page {currentPage} / {totalPages}</span>
//             <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>Next</button>
//           </div>

//           <button onClick={handleConfirm} disabled={confirming} style={{ marginTop: '1rem' }}>
//             {confirming ? "Confirming..." : "Confirm Upload"}
//           </button>
//         </>
//       )}

//       <ToastContainer />
//     </div>
//   );
// };

// export default UploadPage;

//fixing citizenid table
// import React, { useState } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const UploadPage = () => {
//   const [file, setFile] = useState(null);
//   const [previewData, setPreviewData] = useState([]);
//   const [uploaded, setUploaded] = useState(false);
//   const [confirming, setConfirming] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [tableType, setTableType] = useState("checkstatus");

//   const rowsPerPage = 50;
//   const domain = import.meta.env.VITE_DOMAIN_NAME?.trim() || "http://0.0.0.0";

//   const resetState = () => {
//     setPreviewData([]);
//     setUploaded(false);
//     setCurrentPage(1);
//     setSearchTerm("");
//   };

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     setFile(selectedFile);
//     resetState();
//   };

//   const validateFile = (file) => {
//     if (!file) return false;
//     const allowedExtensions = ['csv', 'xlsx', 'xlsm', 'xlsb', 'xltx'];
//     const ext = file.name.split('.').pop().toLowerCase();
//     return allowedExtensions.includes(ext);
//   };

//   const handleUpload = async () => {
//     if (!file) return toast.error("❌ Please select a file first.");
//     if (!validateFile(file)) return toast.error("❌ Only CSV or Excel files are allowed.");

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const uploadUrl =
//         tableType === "checkstatus"
//           ? `${domain}/DataUpload`
//           : `${domain}/citizenID/upload`;

//       const dbUrl =
//         tableType === "checkstatus"
//           ? `${domain}/students/all`
//           : `${domain}/citizenID/all`;

//       const idKey = tableType === "checkstatus" ? "StudentID" : "StudentID"; // always StudentID for key

//       const res = await axios.post(uploadUrl, formData);
//       const preview = res.data.rows || [];

//       const dbRes = await axios.get(dbUrl);
//       const currentDB = dbRes.data?.rows || dbRes.data || [];
//       const dbMap = new Map(currentDB.map(r => [r[idKey], r]));

//       // Get DB columns
//       const dbColumns = currentDB.length > 0 ? Object.keys(currentDB[0]) : [];

//       const previewWithStatus = preview.map(row => {
//         const dbRow = dbMap.get(row[idKey]);
//         const comparableCols = dbColumns.filter(col => col !== idKey); // **exclude ID column**

//         if (!dbRow) {
//           return {
//             ...row,
//             _status: "new",
//             _changedFields: ""
//           };
//         }

//         const changedFields = comparableCols.filter(col => row[col] != dbRow[col]);

//         return {
//           ...row,
//           _status: changedFields.length > 0 ? "updated" : "untouched",
//           _changedFields: changedFields.join(", ")
//         };
//       });

//       // Only include DB columns + _status + _changedFields
//       const filteredPreview = previewWithStatus.map(row => {
//         const filteredRow = {};
//         [...dbColumns, "_status", "_changedFields"].forEach(col => {
//           if (col in row) filteredRow[col] = row[col];
//         });
//         return filteredRow;
//       });

//       setPreviewData(filteredPreview);
//       setUploaded(true);
//       toast.success("✅ File previewed successfully!", { position: "top-center", autoClose: 2000, theme: "colored" });

//     } catch (error) {
//       console.error("Upload failed:", error.response?.data || error.message);
//       toast.error("❌ Failed to preview the file.", { position: "top-center", autoClose: 3000, theme: "colored" });
//     }
//   };

//   const handleConfirm = async () => {
//     setConfirming(true);
//     try {
//       const confirmUrl =
//         tableType === "checkstatus"
//           ? `${domain}/DataUpload/confirmUpload`
//           : `${domain}/citizenID/upload/confirmUpload`;

//       await axios.post(confirmUrl, { confirm: true });
//       toast.success("✅ Data successfully inserted/updated!", { position: "top-center", autoClose: 3000, theme: "colored" });
//       setFile(null);
//       resetState();
//     } catch (error) {
//       console.error("Confirm failed:", error);
//       toast.error("❌ Failed to confirm upload.", { position: "top-center", autoClose: 3000, theme: "colored" });
//     } finally {
//       setConfirming(false);
//     }
//   };

//   const renderTable = (data, title) => (
//     <>
//       <h3 style={{ marginTop: '2rem' }}>{title}</h3>
//       <div style={{ overflowX: 'auto', maxHeight: '400px', marginBottom: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', borderRadius: '8px' }}>
//         <table style={{ borderCollapse: 'collapse', width: '100%', fontFamily: 'Arial', fontSize: '0.9rem', color: '#333', backgroundColor: '#fff', border: '1px solid #ddd' }}>
//           <thead>
//             <tr style={{ backgroundColor: '#f4f6f8', fontWeight: 'bold', borderBottom: '2px solid #ddd' }}>
//               {Object.keys(data[0]).map((key, idx) => <th key={idx} style={{ padding: '10px' }}>{key}</th>)}
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((row, i) => {
//               const status = row._status;
//               const bgColor =
//                 status === 'new' ? '#e6ffe6' :
//                   status === 'updated' ? '#fffbe6' :
//                     status === 'untouched' ? '#f0f0f0' :
//                       i % 2 === 0 ? '#fff' : '#f9f9f9';

//               return (
//                 <tr key={i} style={{ backgroundColor: bgColor, borderBottom: '1px solid #eee', transition: 'background 0.3s' }}
//                   onMouseEnter={e => e.currentTarget.style.backgroundColor = '#e6f7ff'}
//                   onMouseLeave={e => e.currentTarget.style.backgroundColor = bgColor}>
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
//                           ? status === 'new'
//                             ? '🆕 New'
//                             : status === 'updated'
//                               ? '✏️ Updated'
//                               : '⚪ Untouched'
//                           : key === '_changedFields'
//                             ? (Array.isArray(value) ? value.join(', ') : value ?? '–')
//                             : value ?? '–'}
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

//   const filteredData = previewData.filter(row => {
//     if (!searchTerm.trim()) return true;
//     const lowerSearch = searchTerm.toLowerCase();
//     return Object.values(row).some(val => {
//       if (val == null) return false;
//       const strVal = String(val).toLowerCase().trim();
//       if ((lowerSearch === "male" || lowerSearch === "female") && strVal === lowerSearch) return true;
//       return strVal.includes(lowerSearch);
//     });
//   });

//   const totalPages = Math.ceil(filteredData.length / rowsPerPage);
//   const indexOfLastRow = currentPage * rowsPerPage;
//   const indexOfFirstRow = indexOfLastRow - rowsPerPage;
//   const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

//   return (
//     <div style={{ padding: '2rem' }}>
//       <h2>Upload CSV / Excel</h2>

//       <div style={{ marginBottom: '1rem' }}>
//         <label>Table: </label>
//         <select value={tableType} onChange={(e) => setTableType(e.target.value)}>
//           <option value="checkstatus">Check Status</option>
//           <option value="citizenid">Citizen ID</option>
//         </select>
//       </div>

//       <input type="file" accept=".csv,.xlsx,.xlsm,.xlsb,.xltx" onChange={handleFileChange} />
//       <button onClick={handleUpload} style={{ marginLeft: '10px' }}>Preview</button>

//       {uploaded && previewData.length > 0 && (
//         <>
//           <div style={{ marginTop: '1rem' }}>
//             <input
//               type="text"
//               placeholder="Search..."
//               value={searchTerm}
//               onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}
//               style={{ padding: '6px', width: '250px' }}
//             />
//           </div>

//           {renderTable(currentRows, `📄 Uploaded File Preview (Page ${currentPage})`)}

//           <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
//             <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}>Previous</button>
//             <span>Page {currentPage} / {totalPages}</span>
//             <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>Next</button>
//           </div>

//           <button onClick={handleConfirm} disabled={confirming} style={{ marginTop: '1rem' }}>
//             {confirming ? "Confirming..." : "Confirm Upload"}
//           </button>
//         </>
//       )}
//       <ToastContainer />
//     </div>
//   );
// };

// export default UploadPage;


//fixing the hidden columns that are being updated unintentionally

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
  const [searchTerm, setSearchTerm] = useState("");
  const [tableType, setTableType] = useState("checkstatus");

  const rowsPerPage = 50;
  const domain = import.meta.env.VITE_DOMAIN_NAME?.trim() || "http://0.0.0.0";

  const resetState = () => {
    setPreviewData([]);
    setUploaded(false);
    setCurrentPage(1);
    setSearchTerm("");
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    resetState();
  };

  const validateFile = (file) => {
    if (!file) return false;
    const allowedExtensions = ['csv', 'xlsx', 'xlsm', 'xlsb', 'xltx'];
    const ext = file.name.split('.').pop().toLowerCase();
    return allowedExtensions.includes(ext);
  };

  const handleUpload = async () => {
    if (!file) return toast.error("❌ Please select a file first.");
    if (!validateFile(file)) return toast.error("❌ Only CSV or Excel files are allowed.");

    const formData = new FormData();
    formData.append('file', file);

    try {
      const uploadUrl =
        tableType === "checkstatus"
          ? `${domain}/DataUpload`
          : `${domain}/citizenID/upload`;

      const dbUrl =
        tableType === "checkstatus"
          ? `${domain}/students/all`
          : `${domain}/citizenID/all`;

      const idKey = "StudentID";

      const res = await axios.post(uploadUrl, formData);
      const uploadRows = res.data.rows || [];

      const dbRes = await axios.get(dbUrl);
      const dbRows = dbRes.data?.rows || dbRes.data || [];
      const dbMap = new Map(dbRows.map(r => [r[idKey], r]));

      const dbColumns = dbRows.length > 0 ? Object.keys(dbRows[0]) : [];

      // Merge DB + Upload for preview
      const previewWithStatus = dbRows.map(dbRow => {
        const uploadRow = uploadRows.find(r => r[idKey] === dbRow[idKey]);
        const mergedRow = {};

        dbColumns.forEach(col => {
          mergedRow[col] = uploadRow && uploadRow[col] !== undefined ? uploadRow[col] : dbRow[col];
        });

        const comparableCols = dbColumns.filter(col => col !== idKey);
        const changedFields = comparableCols.filter(col => {
          let dbVal = dbRow[col];
          let uploadVal = mergedRow[col];

          // Normalize stage columns
          if (col.toLowerCase().startsWith('stage')) {
            const normDb = dbVal === 1 || dbVal === '1' || dbVal === true || String(dbVal).toUpperCase() === 'TRUE';
            const normUp = uploadVal === 1 || uploadVal === '1' || uploadVal === true || String(uploadVal).toUpperCase() === 'TRUE';
            return normDb !== normUp;
          }

          // Normalize status column
          if (col.toLowerCase() === 'status') {
            const normDb = ['PASS','FAIL'].includes(String(dbVal).toUpperCase()) ? String(dbVal).toUpperCase() : null;
            const normUp = ['PASS','FAIL'].includes(String(uploadVal).toUpperCase()) ? String(uploadVal).toUpperCase() : null;
            return normDb !== normUp;
          }

          // Normalize other null/empty/'NULL'
          const normDb = (dbVal === null || dbVal === undefined || dbVal === '' || String(dbVal).toUpperCase() === 'NULL') ? null : dbVal;
          const normUp = (uploadVal === null || uploadVal === undefined || uploadVal === '' || String(uploadVal).toUpperCase() === 'NULL') ? null : uploadVal;

          return normDb != normUp;
        });

        return {
          ...mergedRow,
          _status: changedFields.length > 0 ? "updated" : "untouched",
          _changedFields: changedFields.join(", ")
        };
      });

      // Add new rows that are in upload but not in DB
      const newRows = uploadRows.filter(r => !dbMap.has(r[idKey]))
        .map(r => {
          const row = {};
          dbColumns.forEach(col => row[col] = r[col] ?? null);
          return { ...row, _status: "new", _changedFields: "" };
        });

      setPreviewData([...previewWithStatus, ...newRows]);
      setUploaded(true);
      toast.success("✅ File previewed successfully!", { position: "top-center", autoClose: 2000, theme: "colored" });

    } catch (error) {
      console.error("Upload failed:", error.response?.data || error.message);
      toast.error("❌ Failed to preview the file.", { position: "top-center", autoClose: 3000, theme: "colored" });
    }
  };

  const handleConfirm = async () => {
    setConfirming(true);
    try {
      const confirmUrl =
        tableType === "checkstatus"
          ? `${domain}/DataUpload/confirmUpload`
          : `${domain}/citizenID/upload/confirmUpload`;

      await axios.post(confirmUrl, { confirm: true });
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

                    // Stage columns display
                    const isStageCol = key.toLowerCase().startsWith('stage');
                    let displayVal = value;

                    if (isStageCol) {
                      if (value === null || value === undefined || value === '' || String(value).toLowerCase() === 'null') {
                        displayVal = '–';
                      } else if (value === true || value === 1 || value === '1' || String(value).toUpperCase() === 'TRUE') {
                        displayVal = '✅';
                      } else if (value === false || value === 0 || value === '0' || String(value).toUpperCase() === 'FALSE') {
                        displayVal = '❌';
                      } else {
                        displayVal = '–';
                      }
                    }

                    // Status column display
                    if (key.toLowerCase() === 'status') {
                      const val = value ? String(value).toUpperCase() : null;
                      displayVal = val === 'PASS' ? 'Pass' : val === 'FAIL' ? 'Fail' : '–';
                    }

                    return (
                      <td key={j} style={cellStyle}>
                        {key === '_status'
                          ? status === 'new' ? '🆕 New'
                            : status === 'updated' ? '✏️ Updated'
                            : '⚪ Untouched'
                          : key === '_changedFields'
                            ? (Array.isArray(value) ? value.join(', ') : value ?? '–')
                            : displayVal ?? '–'}
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

  const filteredData = previewData.filter(row => {
    if (!searchTerm.trim()) return true;
    const lowerSearch = searchTerm.toLowerCase();
    return Object.values(row).some(val => {
      if (val == null) return false;
      const strVal = String(val).toLowerCase().trim();
      if ((lowerSearch === "male" || lowerSearch === "female") && strVal === lowerSearch) return true;
      return strVal.includes(lowerSearch);
    });
  });

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Upload CSV / Excel</h2>

      <div style={{ marginBottom: '1rem' }}>
        <label>Table: </label>
        <select value={tableType} onChange={(e) => setTableType(e.target.value)}>
          <option value="checkstatus">Check Status</option>
          <option value="citizenid">Citizen ID</option>
        </select>
      </div>

      <input type="file" accept=".csv,.xlsx,.xlsm,.xlsb,.xltx" onChange={handleFileChange} />
      <button onClick={handleUpload} style={{ marginLeft: '10px' }}>Preview</button>

      {uploaded && previewData.length > 0 && (
        <>
          <div style={{ marginTop: '1rem' }}>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              style={{ padding: '6px', width: '250px' }}
            />
          </div>

          {renderTable(currentRows, `📄 Uploaded File Preview (Page ${currentPage})`)}

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



