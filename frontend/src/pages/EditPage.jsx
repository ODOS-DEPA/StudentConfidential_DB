// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const EditPage = () => {
//   const [data, setData] = useState([]);
//   const [editedRows, setEditedRows] = useState({});
//   const [editingRowId, setEditingRowId] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [tableType, setTableType] = useState("checkstatus");

//   const rowsPerPage = 50;
//   const domain = import.meta.env.VITE_DOMAIN_NAME?.trim() || "http://0.0.0.0";

//   // Fetch DB data
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const url =
//           tableType === "checkstatus"
//             ? `${domain}/students/all`
//             : `${domain}/citizenID/all`;

//         const res = await axios.get(url);
//         const rows = res.data?.rows || res.data || [];
//         setData(rows);
//       } catch (error) {
//         console.error("Fetch failed:", error);
//         toast.error("❌ Failed to fetch data.");
//       }
//     };
//     fetchData();
//   }, [tableType, domain]);

//   // Handle Edit/Done per row
//   const handleEdit = (id) => {
//     setEditingRowId(id);
//     setEditedRows((prev) => ({ ...prev, [id]: { ...data.find((r) => r.StudentID === id) } }));
//   };

//   const handleChange = (id, key, value) => {
//     setEditedRows((prev) => ({
//       ...prev,
//       [id]: { ...prev[id], [key]: value },
//     }));
//   };

//   const handleDone = (id) => {
//     const newData = data.map((row) =>
//       row.StudentID === id ? editedRows[id] : row
//     );
//     setData(newData);
//     setEditingRowId(null);
//     toast.info("✔ Row saved locally");
//   };

//   const handleSaveAll = async () => {
//     try {
//       const url =
//         tableType === "checkstatus"
//           ? `${domain}/DataUpload/confirmUpload`
//           : `${domain}/citizenID/upload/confirmUpload`;

//       await axios.post(url, Object.values(editedRows));
//       toast.success("✅ All changes saved to DB!");
//       setEditedRows({});
//     } catch (error) {
//       console.error("Save all failed:", error);
//       toast.error("❌ Failed to save changes.");
//     }
//   };

//   // Search filter
//   const filteredData = data.filter((row) => {
//     if (!searchTerm.trim()) return true;
//     const lowerSearch = searchTerm.toLowerCase();
//     return Object.values(row).some((val) =>
//       String(val || "").toLowerCase().includes(lowerSearch)
//     );
//   });

//   // Pagination
//   const totalPages = Math.max(1, Math.ceil(filteredData.length / rowsPerPage));
//   const currentPageSafe = Math.min(currentPage, totalPages);
//   const indexOfLastRow = currentPageSafe * rowsPerPage;
//   const indexOfFirstRow = indexOfLastRow - rowsPerPage;
//   const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

//   const tableColumns = data.length > 0 ? Object.keys(data[0]) : [];

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         backgroundColor: "#001f3f",
//         padding: "2rem",
//         color: "#fff",
//       }}
//     >
//       <h2>Edit Table</h2>

//       <div style={{ marginBottom: "1rem" }}>
//         <label>Table: </label>
//         <select value={tableType} onChange={(e) => setTableType(e.target.value)}>
//           <option value="checkstatus">Check Status</option>
//           <option value="citizenid">Citizen ID</option>
//         </select>
//       </div>

//       <input
//         type="text"
//         placeholder="Search..."
//         value={searchTerm}
//         onChange={(e) => {
//           setSearchTerm(e.target.value);
//           setCurrentPage(1);
//         }}
//         style={{ padding: "6px", width: "250px", marginBottom: "1rem" }}
//       />

//       {data.length === 0 ? (
//         <p>No data available</p>
//       ) : (
//         <div
//           style={{
//             overflowX: "auto",
//             maxHeight: "400px",
//             marginBottom: "1rem",
//             boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//             borderRadius: "8px",
//           }}
//         >
//           <table
//             style={{
//               borderCollapse: "collapse",
//               width: "100%",
//               fontFamily: "Arial",
//               fontSize: "0.9rem",
//               color: "#333",
//               backgroundColor: "#fff",
//               border: "1px solid #ddd",
//             }}
//           >
//             <thead>
//               <tr
//                 style={{
//                   backgroundColor: "#f4f6f8",
//                   fontWeight: "bold",
//                   borderBottom: "2px solid #ddd",
//                 }}
//               >
//                 {tableColumns.map((key, idx) => (
//                   <th key={idx} style={{ padding: "10px" }}>
//                     {key}
//                   </th>
//                 ))}
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentRows.map((row, i) => (
//                 <tr
//                   key={i}
//                   style={{
//                     backgroundColor: i % 2 === 0 ? "#fff" : "#f9f9f9",
//                     borderBottom: "1px solid #eee",
//                   }}
//                 >
//                   {tableColumns.map((key, j) => (
//                     <td
//                       key={j}
//                       style={{
//                         padding: "8px",
//                         textAlign: "center",
//                         border: "1px solid #eee",
//                       }}
//                     >
//                       {editingRowId === row.StudentID ? (
//                         <input
//                           value={editedRows[row.StudentID]?.[key] ?? ""}
//                           onChange={(e) =>
//                             handleChange(row.StudentID, key, e.target.value)
//                           }
//                           style={{ padding: "4px", width: "100%" }}
//                         />
//                       ) : (
//                         row[key] ?? "–"
//                       )}
//                     </td>
//                   ))}
//                   <td style={{ padding: "8px" }}>
//                     {editingRowId === row.StudentID ? (
//                       <button onClick={() => handleDone(row.StudentID)}>
//                         Done
//                       </button>
//                     ) : (
//                       <button onClick={() => handleEdit(row.StudentID)}>
//                         Edit
//                       </button>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Pagination */}
//       <div
//         style={{
//           marginTop: "1rem",
//           display: "flex",
//           gap: "0.5rem",
//           alignItems: "center",
//         }}
//       >
//         <button
//           onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
//           disabled={currentPageSafe === 1}
//         >
//           Previous
//         </button>
//         <span>
//           Page {currentPageSafe} / {totalPages}
//         </span>
//         <button
//           onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
//           disabled={currentPageSafe === totalPages}
//         >
//           Next
//         </button>
//       </div>

//       <button
//         onClick={handleSaveAll}
//         style={{ marginTop: "1rem", backgroundColor: "#28a745", color: "white" }}
//         disabled={Object.keys(editedRows).length === 0}
//       >
//         Save All
//       </button>

//       <ToastContainer />
//     </div>
//   );
// };

// export default EditPage;



// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const EditPage = () => {
//   const [data, setData] = useState([]);
//   const [editedRows, setEditedRows] = useState({});
//   const [editingRowId, setEditingRowId] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [tableType, setTableType] = useState("checkstatus");

//   const rowsPerPage = 50;
//   const domain = import.meta.env.VITE_DOMAIN_NAME?.trim() || "http://0.0.0.0";

//   // ---- helpers: normalization back to DB format ----
//   const normalizeForDB = (key, value) => {
//     const k = String(key || "").trim().toLowerCase();

//     // Treat "–" or empty or "null" as null
//     if (
//       value === undefined ||
//       value === null ||
//       (typeof value === "string" && value.trim() === "") ||
//       (typeof value === "string" && value.trim().toLowerCase() === "–") ||
//       (typeof value === "string" && value.trim().toLowerCase() === "null")
//     ) {
//       return null;
//     }

//     // stage1..stage8 are strings "0","1", or null in DB
//     if (k.startsWith("stage")) {
//       const v = String(value).trim().toLowerCase();
//       if (v === "1" || v === "true" || v === "✅" || v === "pass" ) return "1";
//       if (v === "0" || v === "false" || v === "❌" || v === "fail") return "0";
//       return null;
//     }

//     // currentStatus is boolean-like in DB but sent/compared as "1"/"0"/null
//     if (k === "currentstatus") {
//       const v = String(value).trim().toLowerCase();
//       if (["1", "true", "pass"].includes(v)) return "1";
//       if (["0", "false", "fail"].includes(v)) return "0";
//       return null;
//     }

//     // leave everything else as-is
//     return value;
//   };

//   const transformRowForDB = (row) => {
//     const out = {};
//     Object.keys(row || {}).forEach((key) => {
//       out[key] = normalizeForDB(key, row[key]);
//     });
//     return out;
//   };

//   // ---- fetch DB data ----
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const url =
//           tableType === "checkstatus"
//             ? `${domain}/students/all`
//             : `${domain}/citizenID/all`;

//         const res = await axios.get(url);
//         const rows = res.data?.rows || res.data || [];
//         setData(rows);
//       } catch (error) {
//         console.error("Fetch failed:", error);
//         toast.error("❌ Failed to fetch data.");
//       }
//     };
//     fetchData();
//   }, [tableType, domain]);

//   // ---- Edit/Done per row ----
//   const handleEdit = (id) => {
//     setEditingRowId(id);
//     setEditedRows((prev) => ({
//       ...prev,
//       [id]: { ...data.find((r) => r.StudentID === id) },
//     }));
//   };

//   const handleChange = (id, key, value) => {
//     setEditedRows((prev) => ({
//       ...prev,
//       [id]: { ...prev[id], [key]: value },
//     }));
//   };

//   const handleDone = (id) => {
//     const newData = data.map((row) =>
//       row.StudentID === id ? editedRows[id] : row
//     );
//     setData(newData);
//     setEditingRowId(null);
//     toast.info("✔ Row saved locally");
//   };

//   // ---- Save All (same 2-step flow as UploadPage) ----
//   const handleSaveAll = async () => {
//     try {
//       const uploadUrl =
//         tableType === "checkstatus"
//           ? `${domain}/DataUpload`
//           : `${domain}/citizenID/upload`;

//       const confirmUrl =
//         tableType === "checkstatus"
//           ? `${domain}/DataUpload/confirmUpload`
//           : `${domain}/citizenID/upload/confirmUpload`;

//       const rowsToUpload = Object.values(editedRows);
//       if (rowsToUpload.length === 0) {
//         return toast.info("No changes to save.");
//       }

//       // Transform rows back to DB-safe values before upload
//       const payload = rowsToUpload.map(transformRowForDB);

//       // Step 1: stage rows (like UploadPage does with the file)
//       await axios.post(uploadUrl, payload);

//       // Step 2: confirm commit (exactly like UploadPage)
//       await axios.post(confirmUrl, { confirm: true });

//       toast.success("✅ All changes saved to DB!");
//       setEditedRows({});

//       // Optional: refresh latest data from DB
//       try {
//         const url =
//           tableType === "checkstatus"
//             ? `${domain}/students/all`
//             : `${domain}/citizenID/all`;
//         const res = await axios.get(url);
//         const rows = res.data?.rows || res.data || [];
//         setData(rows);
//       } catch {}

//     } catch (error) {
//       console.error("Save all failed:", error.response?.data || error.message);
//       toast.error("❌ Failed to save changes.");
//     }
//   };

//   // ---- Search filter ----
//   const filteredData = data.filter((row) => {
//     if (!searchTerm.trim()) return true;
//     const lowerSearch = searchTerm.toLowerCase();
//     return Object.values(row).some((val) =>
//       String(val ?? "").toLowerCase().includes(lowerSearch)
//     );
//   });

//   // ---- Pagination ----
//   const totalPages = Math.max(1, Math.ceil(filteredData.length / rowsPerPage));
//   const currentPageSafe = Math.min(currentPage, totalPages);
//   const indexOfLastRow = currentPageSafe * rowsPerPage;
//   const indexOfFirstRow = indexOfLastRow - rowsPerPage;
//   const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

//   const tableColumns = data.length > 0 ? Object.keys(data[0]) : [];

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         backgroundColor: "#001f3f",
//         padding: "2rem",
//         color: "#fff",
//       }}
//     >
//       <h2>Edit Table</h2>

//       <div style={{ marginBottom: "1rem" }}>
//         <label>Table: </label>
//         <select value={tableType} onChange={(e) => setTableType(e.target.value)}>
//           <option value="checkstatus">Check Status</option>
//           <option value="citizenid">Citizen ID</option>
//         </select>
//       </div>

//       <input
//         type="text"
//         placeholder="Search..."
//         value={searchTerm}
//         onChange={(e) => {
//           setSearchTerm(e.target.value);
//           setCurrentPage(1);
//         }}
//         style={{ padding: "6px", width: "250px", marginBottom: "1rem" }}
//       />

//       {data.length === 0 ? (
//         <p>No data available</p>
//       ) : (
//         <div
//           style={{
//             overflowX: "auto",
//             maxHeight: "400px",
//             marginBottom: "1rem",
//             boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//             borderRadius: "8px",
//           }}
//         >
//           <table
//             style={{
//               borderCollapse: "collapse",
//               width: "100%",
//               fontFamily: "Arial",
//               fontSize: "0.9rem",
//               color: "#333",
//               backgroundColor: "#fff",
//               border: "1px solid #ddd",
//             }}
//           >
//             <thead>
//               <tr
//                 style={{
//                   backgroundColor: "#f4f6f8",
//                   fontWeight: "bold",
//                   borderBottom: "2px solid #ddd",
//                 }}
//               >
//                 {tableColumns.map((key, idx) => (
//                   <th key={idx} style={{ padding: "10px" }}>
//                     {key}
//                   </th>
//                 ))}
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentRows.map((row, i) => (
//                 <tr
//                   key={i}
//                   style={{
//                     backgroundColor: i % 2 === 0 ? "#fff" : "#f9f9f9",
//                     borderBottom: "1px solid #eee",
//                   }}
//                 >
//                   {tableColumns.map((key, j) => (
//                     <td
//                       key={j}
//                       style={{
//                         padding: "8px",
//                         textAlign: "center",
//                         border: "1px solid #eee",
//                       }}
//                     >
//                       {editingRowId === row.StudentID ? (
//                         <input
//                           value={editedRows[row.StudentID]?.[key] ?? ""}
//                           onChange={(e) =>
//                             handleChange(row.StudentID, key, e.target.value)
//                           }
//                           style={{ padding: "4px", width: "100%" }}
//                         />
//                       ) : (
//                         row[key] ?? "–"
//                       )}
//                     </td>
//                   ))}
//                   <td style={{ padding: "8px" }}>
//                     {editingRowId === row.StudentID ? (
//                       <button onClick={() => handleDone(row.StudentID)}>
//                         Done
//                       </button>
//                     ) : (
//                       <button onClick={() => handleEdit(row.StudentID)}>
//                         Edit
//                       </button>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Pagination */}
//       <div
//         style={{
//           marginTop: "1rem",
//           display: "flex",
//           gap: "0.5rem",
//           alignItems: "center",
//         }}
//       >
//         <button
//           onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
//           disabled={currentPageSafe === 1}
//         >
//           Previous
//         </button>
//         <span>
//           Page {currentPageSafe} / {totalPages}
//         </span>
//         <button
//           onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
//           disabled={currentPageSafe === totalPages}
//         >
//           Next
//         </button>
//       </div>

//       <button
//         onClick={handleSaveAll}
//         style={{ marginTop: "1rem", backgroundColor: "#28a745", color: "white" }}
//         disabled={Object.keys(editedRows).length === 0}
//       >
//         Save All
//       </button>

//       <ToastContainer />
//     </div>
//   );
// };

// export default EditPage;



// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const EditPage = () => {
//   const [data, setData] = useState([]);
//   const [editedRows, setEditedRows] = useState({});
//   const [editingRowId, setEditingRowId] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [tableType, setTableType] = useState("checkstatus");

//   const rowsPerPage = 50;
//   const domain = import.meta.env.VITE_DOMAIN_NAME?.trim() || "http://0.0.0.0";

//   // Fetch DB data
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const url =
//           tableType === "checkstatus"
//             ? `${domain}/students/all`
//             : `${domain}/citizenID/all`;

//         const res = await axios.get(url);
//         const rows = res.data?.rows || res.data || [];
//         setData(rows);
//       } catch (error) {
//         console.error("Fetch failed:", error);
//         toast.error("❌ Failed to fetch data.");
//       }
//     };
//     fetchData();
//   }, [tableType, domain]);

//   // Handle Edit/Done per row
//   const handleEdit = (id) => {
//     setEditingRowId(id);
//     setEditedRows((prev) => ({ ...prev, [id]: { ...data.find((r) => r.StudentID === id) } }));
//   };

//   const handleChange = (id, key, value) => {
//     setEditedRows((prev) => ({
//       ...prev,
//       [id]: { ...prev[id], [key]: value },
//     }));
//   };

//   const handleDone = (id) => {
//     const newData = data.map((row) =>
//       row.StudentID === id ? editedRows[id] : row
//     );
//     setData(newData);
//     setEditingRowId(null);
//     toast.info("✔ Row saved locally");
//   };

//   // Transform row for upload: remove _status/_changedFields
//   const transformRowForDB = (row) => {
//     const copy = { ...row };
//     delete copy._status;
//     delete copy._changedFields;
//     return copy;
//   };

//   const handleSaveAll = async () => {
//     try {
//       if (Object.keys(editedRows).length === 0) return toast.info("No changes.");

//       // Convert edited rows to CSV text
//       const rowsToUpload = Object.values(editedRows).map(transformRowForDB);
//       const columns = Object.keys(rowsToUpload[0] || {});
//       const csvContent = [
//         columns.join(","), // header
//         ...rowsToUpload.map(r => columns.map(c => `"${r[c] ?? ""}"`).join(",")) // rows
//       ].join("\n");

//       const formData = new FormData();
//       const blob = new Blob([csvContent], { type: "text/csv" });
//       formData.append("file", blob, "editedRows.csv");

//       const uploadUrl =
//         tableType === "checkstatus"
//           ? `${domain}/DataUpload`
//           : `${domain}/citizenID/upload`;

//       const confirmUrl =
//         tableType === "checkstatus"
//           ? `${domain}/DataUpload/confirmUpload`
//           : `${domain}/citizenID/upload/confirmUpload`;

//       // Step 1: Upload file
//       await axios.post(uploadUrl, formData);

//       // Step 2: Confirm upload
//       await axios.post(confirmUrl, { confirm: true });

//       toast.success("✅ All changes saved to DB!");
//       setEditedRows({});

//       // Refresh latest data
//       const url =
//         tableType === "checkstatus"
//           ? `${domain}/students/all`
//           : `${domain}/citizenID/all`;
//       const res = await axios.get(url);
//       setData(res.data?.rows || res.data || []);

//     } catch (error) {
//       console.error("Save all failed:", error.response?.data || error.message);
//       toast.error("❌ Failed to save changes.");
//     }
//   };

//   // Search filter
//   const filteredData = data.filter((row) => {
//     if (!searchTerm.trim()) return true;
//     const lowerSearch = searchTerm.toLowerCase();
//     return Object.values(row).some((val) =>
//       String(val || "").toLowerCase().includes(lowerSearch)
//     );
//   });

//   // Pagination
//   const totalPages = Math.max(1, Math.ceil(filteredData.length / rowsPerPage));
//   const currentPageSafe = Math.min(currentPage, totalPages);
//   const indexOfLastRow = currentPageSafe * rowsPerPage;
//   const indexOfFirstRow = indexOfLastRow - rowsPerPage;
//   const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

//   const tableColumns = data.length > 0 ? Object.keys(data[0]) : [];

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         backgroundColor: "#001f3f",
//         padding: "2rem",
//         color: "#fff",
//       }}
//     >
//       <h2>Edit Table</h2>

//       <div style={{ marginBottom: "1rem" }}>
//         <label>Table: </label>
//         <select value={tableType} onChange={(e) => setTableType(e.target.value)}>
//           <option value="checkstatus">Check Status</option>
//           <option value="citizenid">Citizen ID</option>
//         </select>
//       </div>

//       <input
//         type="text"
//         placeholder="Search..."
//         value={searchTerm}
//         onChange={(e) => {
//           setSearchTerm(e.target.value);
//           setCurrentPage(1);
//         }}
//         style={{ padding: "6px", width: "250px", marginBottom: "1rem" }}
//       />

//       {data.length === 0 ? (
//         <p>No data available</p>
//       ) : (
//         <div
//           style={{
//             overflowX: "auto",
//             maxHeight: "400px",
//             marginBottom: "1rem",
//             boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//             borderRadius: "8px",
//           }}
//         >
//           <table
//             style={{
//               borderCollapse: "collapse",
//               width: "100%",
//               fontFamily: "Arial",
//               fontSize: "0.9rem",
//               color: "#333",
//               backgroundColor: "#fff",
//               border: "1px solid #ddd",
//             }}
//           >
//             <thead>
//               <tr
//                 style={{
//                   backgroundColor: "#f4f6f8",
//                   fontWeight: "bold",
//                   borderBottom: "2px solid #ddd",
//                 }}
//               >
//                 {tableColumns.map((key, idx) => (
//                   <th key={idx} style={{ padding: "10px" }}>
//                     {key}
//                   </th>
//                 ))}
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentRows.map((row, i) => (
//                 <tr
//                   key={i}
//                   style={{
//                     backgroundColor: i % 2 === 0 ? "#fff" : "#f9f9f9",
//                     borderBottom: "1px solid #eee",
//                   }}
//                 >
//                   {tableColumns.map((key, j) => (
//                     <td
//                       key={j}
//                       style={{
//                         padding: "8px",
//                         textAlign: "center",
//                         border: "1px solid #eee",
//                       }}
//                     >
//                       {editingRowId === row.StudentID ? (
//                         <input
//                           value={editedRows[row.StudentID]?.[key] ?? ""}
//                           onChange={(e) =>
//                             handleChange(row.StudentID, key, e.target.value)
//                           }
//                           style={{ padding: "4px", width: "100%" }}
//                         />
//                       ) : (
//                         row[key] ?? "–"
//                       )}
//                     </td>
//                   ))}
//                   <td style={{ padding: "8px" }}>
//                     {editingRowId === row.StudentID ? (
//                       <button onClick={() => handleDone(row.StudentID)}>
//                         Done
//                       </button>
//                     ) : (
//                       <button onClick={() => handleEdit(row.StudentID)}>
//                         Edit
//                       </button>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Pagination */}
//       <div
//         style={{
//           marginTop: "1rem",
//           display: "flex",
//           gap: "0.5rem",
//           alignItems: "center",
//         }}
//       >
//         <button
//           onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
//           disabled={currentPageSafe === 1}
//         >
//           Previous
//         </button>
//         <span>
//           Page {currentPageSafe} / {totalPages}
//         </span>
//         <button
//           onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
//           disabled={currentPageSafe === totalPages}
//         >
//           Next
//         </button>
//       </div>

//       <button
//         onClick={handleSaveAll}
//         style={{
//           marginTop: "1rem",
//           backgroundColor: "#28a745",
//           color: "white",
//           padding: "6px 12px",
//           border: "none",
//           borderRadius: "4px",
//           cursor: "pointer"
//         }}
//         disabled={Object.keys(editedRows).length === 0}
//       >
//         Save All
//       </button>

//       <ToastContainer />
//     </div>
//   );
// };

// export default EditPage;


//use xlsx instead of csv since it supports more features and also Thai characters
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import * as XLSX from "xlsx";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const EditPage = () => {
//   const [data, setData] = useState([]);
//   const [editedRows, setEditedRows] = useState({});
//   const [editingRowId, setEditingRowId] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [tableType, setTableType] = useState("checkstatus");

//   const rowsPerPage = 50;
//   const domain = import.meta.env.VITE_DOMAIN_NAME?.trim() || "http://0.0.0.0";

//   // Fetch DB data
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const url =
//           tableType === "checkstatus"
//             ? `${domain}/students/all`
//             : `${domain}/citizenID/all`;

//         const res = await axios.get(url);
//         const rows = res.data?.rows || res.data || [];
//         setData(rows);
//       } catch (error) {
//         console.error("Fetch failed:", error);
//         toast.error("❌ Failed to fetch data.");
//       }
//     };
//     fetchData();
//   }, [tableType, domain]);

//   // Handle Edit/Done per row
//   const handleEdit = (id) => {
//     setEditingRowId(id);
//     setEditedRows((prev) => ({
//       ...prev,
//       [id]: { ...data.find((r) => r.StudentID === id) },
//     }));
//   };

//   const handleChange = (id, key, value) => {
//     setEditedRows((prev) => ({
//       ...prev,
//       [id]: { ...prev[id], [key]: value },
//     }));
//   };

//   const handleDone = (id) => {
//     const newData = data.map((row) =>
//       row.StudentID === id ? editedRows[id] : row
//     );
//     setData(newData);
//     setEditingRowId(null);
//     toast.info("✔ Row saved locally");
//   };

//   // Transform row for upload: remove _status/_changedFields
//   const transformRowForDB = (row) => {
//     const copy = { ...row };
//     delete copy._status;
//     delete copy._changedFields;
//     return copy;
//   };

//   const handleSaveAll = async () => {
//     try {
//       if (Object.keys(editedRows).length === 0) {
//         return toast.info("No changes.");
//       }

//       // Convert rows to Excel sheet
//       const rowsToUpload = Object.values(editedRows).map(transformRowForDB);
//       const worksheet = XLSX.utils.json_to_sheet(rowsToUpload);
//       const workbook = XLSX.utils.book_new();
//       XLSX.utils.book_append_sheet(workbook, worksheet, "EditedRows");

//       // Create Excel file buffer
//       const excelBuffer = XLSX.write(workbook, {
//         bookType: "xlsx",
//         type: "array",
//       });

//       // Convert to Blob
//       const blob = new Blob([excelBuffer], {
//         type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//       });

//       // Upload file
//       const formData = new FormData();
//       formData.append("file", blob, "editedRows.xlsx");

//       const uploadUrl =
//         tableType === "checkstatus"
//           ? `${domain}/DataUpload`
//           : `${domain}/citizenID/upload`;

//       const confirmUrl =
//         tableType === "checkstatus"
//           ? `${domain}/DataUpload/confirmUpload`
//           : `${domain}/citizenID/upload/confirmUpload`;

//       // Step 1: Upload file
//       await axios.post(uploadUrl, formData);

//       // Step 2: Confirm upload
//       await axios.post(confirmUrl, { confirm: true });

//       toast.success("✅ All changes saved to DB!");
//       setEditedRows({});

//       // Refresh latest data
//       const url =
//         tableType === "checkstatus"
//           ? `${domain}/students/all`
//           : `${domain}/citizenID/all`;
//       const res = await axios.get(url);
//       setData(res.data?.rows || res.data || []);

//     } catch (error) {
//       console.error("Save all failed:", error.response?.data || error.message);
//       toast.error("❌ Failed to save changes.");
//     }
//   };

//   // Search filter
//   const filteredData = data.filter((row) => {
//     if (!searchTerm.trim()) return true;
//     const lowerSearch = searchTerm.toLowerCase();
//     return Object.values(row).some((val) =>
//       String(val || "").toLowerCase().includes(lowerSearch)
//     );
//   });

//   // Pagination
//   const totalPages = Math.max(1, Math.ceil(filteredData.length / rowsPerPage));
//   const currentPageSafe = Math.min(currentPage, totalPages);
//   const indexOfLastRow = currentPageSafe * rowsPerPage;
//   const indexOfFirstRow = indexOfLastRow - rowsPerPage;
//   const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

//   const tableColumns = data.length > 0 ? Object.keys(data[0]) : [];

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         backgroundColor: "#001f3f",
//         padding: "2rem",
//         color: "#fff",
//       }}
//     >
//       <h2>Edit Table</h2>

//       <div style={{ marginBottom: "1rem" }}>
//         <label>Table: </label>
//         <select value={tableType} onChange={(e) => setTableType(e.target.value)}>
//           <option value="checkstatus">Check Status</option>
//           <option value="citizenid">Citizen ID</option>
//         </select>
//       </div>

//       <input
//         type="text"
//         placeholder="Search..."
//         value={searchTerm}
//         onChange={(e) => {
//           setSearchTerm(e.target.value);
//           setCurrentPage(1);
//         }}
//         style={{ padding: "6px", width: "250px", marginBottom: "1rem" }}
//       />

//       {data.length === 0 ? (
//         <p>No data available</p>
//       ) : (
//         <div
//           style={{
//             overflowX: "auto",
//             maxHeight: "400px",
//             marginBottom: "1rem",
//             boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//             borderRadius: "8px",
//           }}
//         >
//           <table
//             style={{
//               borderCollapse: "collapse",
//               width: "100%",
//               fontFamily: "Arial",
//               fontSize: "0.9rem",
//               color: "#333",
//               backgroundColor: "#fff",
//               border: "1px solid #ddd",
//             }}
//           >
//             <thead>
//               <tr
//                 style={{
//                   backgroundColor: "#f4f6f8",
//                   fontWeight: "bold",
//                   borderBottom: "2px solid #ddd",
//                 }}
//               >
//                 {tableColumns.map((key, idx) => (
//                   <th key={idx} style={{ padding: "10px" }}>
//                     {key}
//                   </th>
//                 ))}
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentRows.map((row, i) => (
//                 <tr
//                   key={i}
//                   style={{
//                     backgroundColor: i % 2 === 0 ? "#fff" : "#f9f9f9",
//                     borderBottom: "1px solid #eee",
//                   }}
//                 >
//                   {tableColumns.map((key, j) => (
//                     <td
//                       key={j}
//                       style={{
//                         padding: "8px",
//                         textAlign: "center",
//                         border: "1px solid #eee",
//                       }}
//                     >
//                       {editingRowId === row.StudentID ? (
//                         <input
//                           value={editedRows[row.StudentID]?.[key] ?? ""}
//                           onChange={(e) =>
//                             handleChange(row.StudentID, key, e.target.value)
//                           }
//                           style={{ padding: "4px", width: "100%" }}
//                         />
//                       ) : (
//                         row[key] ?? "–"
//                       )}
//                     </td>
//                   ))}
//                   <td style={{ padding: "8px" }}>
//                     {editingRowId === row.StudentID ? (
//                       <button onClick={() => handleDone(row.StudentID)}>
//                         Done
//                       </button>
//                     ) : (
//                       <button onClick={() => handleEdit(row.StudentID)}>
//                         Edit
//                       </button>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Pagination */}
//       <div
//         style={{
//           marginTop: "1rem",
//           display: "flex",
//           gap: "0.5rem",
//           alignItems: "center",
//         }}
//       >
//         <button
//           onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
//           disabled={currentPageSafe === 1}
//         >
//           Previous
//         </button>
//         <span>
//           Page {currentPageSafe} / {totalPages}
//         </span>
//         <button
//           onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
//           disabled={currentPageSafe === totalPages}
//         >
//           Next
//         </button>
//       </div>

//       <button
//         onClick={handleSaveAll}
//         style={{
//           marginTop: "1rem",
//           backgroundColor: "#28a745",
//           color: "white",
//           padding: "6px 12px",
//           border: "none",
//           borderRadius: "4px",
//           cursor: "pointer",
//         }}
//         disabled={Object.keys(editedRows).length === 0}
//       >
//         Save All
//       </button>

//       <ToastContainer />
//     </div>
//   );
// };

// export default EditPage;



//add new button setcurrentstatus
import React, { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditPage = () => {
  const [data, setData] = useState([]);
  const [editedRows, setEditedRows] = useState({});
  const [editingRowId, setEditingRowId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [tableType, setTableType] = useState("checkstatus");

  const rowsPerPage = 50;
  const domain = import.meta.env.VITE_DOMAIN_NAME?.trim() || "http://0.0.0.0";

  // Fetch DB data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url =
          tableType === "checkstatus"
            ? `${domain}/students/all`
            : `${domain}/citizenID/all`;

        const res = await axios.get(url);
        const rows = res.data?.rows || res.data || [];
        setData(rows);
      } catch (error) {
        console.error("Fetch failed:", error);
        toast.error("❌ Failed to fetch data.");
      }
    };
    fetchData();
  }, [tableType, domain]);

  // Handle Edit/Done per row
  const handleEdit = (id) => {
    setEditingRowId(id);
    setEditedRows((prev) => ({
      ...prev,
      [id]: { ...data.find((r) => r.StudentID === id) },
    }));
  };

  const handleChange = (id, key, value) => {
    setEditedRows((prev) => ({
      ...prev,
      [id]: { ...prev[id], [key]: value },
    }));
  };

  const handleDone = (id) => {
    const newData = data.map((row) =>
      row.StudentID === id ? editedRows[id] : row
    );
    setData(newData);
    setEditingRowId(null);
    toast.info("✔ Row saved locally");
  };

  // Transform row for upload: remove _status/_changedFields
  const transformRowForDB = (row) => {
    const copy = { ...row };
    delete copy._status;
    delete copy._changedFields;
    return copy;
  };

  const handleSaveAll = async () => {
    try {
      if (Object.keys(editedRows).length === 0) {
        return toast.info("No changes.");
      }

      // Convert rows to Excel sheet
      const rowsToUpload = Object.values(editedRows).map(transformRowForDB);
      const worksheet = XLSX.utils.json_to_sheet(rowsToUpload);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "EditedRows");

      // Create Excel file buffer
      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      // Convert to Blob
      const blob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      // Upload file
      const formData = new FormData();
      formData.append("file", blob, "editedRows.xlsx");

      const uploadUrl =
        tableType === "checkstatus"
          ? `${domain}/DataUpload`
          : `${domain}/citizenID/upload`;

      const confirmUrl =
        tableType === "checkstatus"
          ? `${domain}/DataUpload/confirmUpload`
          : `${domain}/citizenID/upload/confirmUpload`;

      // Step 1: Upload file
      await axios.post(uploadUrl, formData);

      // Step 2: Confirm upload
      await axios.post(confirmUrl, { confirm: true });

      toast.success("✅ All changes saved to DB!");
      setEditedRows({});

      // Refresh latest data
      const url =
        tableType === "checkstatus"
          ? `${domain}/students/all`
          : `${domain}/citizenID/all`;
      const res = await axios.get(url);
      setData(res.data?.rows || res.data || []);
    } catch (error) {
      console.error("Save all failed:", error.response?.data || error.message);
      toast.error("❌ Failed to save changes.");
    }
  };

  // Set CurrentStatus based on stages
  const handleSetCurrentStatus = () => {
  const updatedData = data.map((row) => {
    for (let i = 1; i <= 8; i++) {
      const stageValue = row[`stage${i}`];
      if (stageValue && (stageValue === "รอดำเนินการ" || stageValue === "ติดเงื่อนไข" || stageValue === "ไม่ผ่าน")) {
        return { ...row, currentStatus: i };
      }
    }
    // If all stages are 'ผ่าน' or null/empty
    return { ...row, currentStatus: 8 };
  });

  setData(updatedData);

  // Mark all rows as edited so Save All works
  const updatedEditedRows = {};
  updatedData.forEach((row) => {
    updatedEditedRows[row.StudentID] = row;
  });
  setEditedRows(updatedEditedRows);

  toast.success("✅ CurrentStatus updated for all students!");
};


  // Search filter
  const filteredData = data.filter((row) => {
    if (!searchTerm.trim()) return true;
    const lowerSearch = searchTerm.toLowerCase();
    return Object.values(row).some((val) =>
      String(val || "").toLowerCase().includes(lowerSearch)
    );
  });

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredData.length / rowsPerPage));
  const currentPageSafe = Math.min(currentPage, totalPages);
  const indexOfLastRow = currentPageSafe * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const tableColumns = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#001f3f",
        padding: "2rem",
        color: "#fff",
      }}
    >
      <h2>Edit Table</h2>

      <div style={{ marginBottom: "1rem" }}>
        <label>Table: </label>
        <select value={tableType} onChange={(e) => setTableType(e.target.value)}>
          <option value="checkstatus">Check Status</option>
          <option value="citizenid">Citizen ID</option>
        </select>
      </div>

      <div style={{ marginBottom: "1rem", display: "flex", gap: "1rem" }}>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          style={{ padding: "6px", width: "250px" }}
        />
        <button
          onClick={handleSetCurrentStatus}
          style={{
            backgroundColor: "#007bff",
            color: "white",
            padding: "6px 12px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Set CurrentStatus
        </button>
      </div>

      {data.length === 0 ? (
        <p>No data available</p>
      ) : (
        <div
          style={{
            overflowX: "auto",
            maxHeight: "400px",
            marginBottom: "1rem",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            borderRadius: "8px",
          }}
        >
          <table
            style={{
              borderCollapse: "collapse",
              width: "100%",
              fontFamily: "Arial",
              fontSize: "0.9rem",
              color: "#333",
              backgroundColor: "#fff",
              border: "1px solid #ddd",
            }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: "#f4f6f8",
                  fontWeight: "bold",
                  borderBottom: "2px solid #ddd",
                }}
              >
                {tableColumns.map((key, idx) => (
                  <th key={idx} style={{ padding: "10px" }}>
                    {key}
                  </th>
                ))}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((row, i) => (
                <tr
                  key={i}
                  style={{
                    backgroundColor: i % 2 === 0 ? "#fff" : "#f9f9f9",
                    borderBottom: "1px solid #eee",
                  }}
                >
                  {tableColumns.map((key, j) => (
                    <td
                      key={j}
                      style={{
                        padding: "8px",
                        textAlign: "center",
                        border: "1px solid #eee",
                      }}
                    >
                      {editingRowId === row.StudentID ? (
                        <input
                          value={editedRows[row.StudentID]?.[key] ?? ""}
                          onChange={(e) =>
                            handleChange(row.StudentID, key, e.target.value)
                          }
                          style={{ padding: "4px", width: "100%" }}
                        />
                      ) : (
                        row[key] ?? "–"
                      )}
                    </td>
                  ))}
                  <td style={{ padding: "8px" }}>
                    {editingRowId === row.StudentID ? (
                      <button onClick={() => handleDone(row.StudentID)}>
                        Done
                      </button>
                    ) : (
                      <button onClick={() => handleEdit(row.StudentID)}>
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div
        style={{
          marginTop: "1rem",
          display: "flex",
          gap: "0.5rem",
          alignItems: "center",
        }}
      >
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPageSafe === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPageSafe} / {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPageSafe === totalPages}
        >
          Next
        </button>
      </div>

      <button
        onClick={handleSaveAll}
        style={{
          marginTop: "1rem",
          backgroundColor: "#28a745",
          color: "white",
          padding: "6px 12px",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
        disabled={Object.keys(editedRows).length === 0}
      >
        Save All
      </button>

      <ToastContainer />
    </div>
  );
};

export default EditPage;
