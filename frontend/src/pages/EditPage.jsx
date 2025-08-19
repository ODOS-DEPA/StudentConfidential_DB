// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const EditPage = () => {
//   const [rows, setRows] = useState([]);
//   const [editingRow, setEditingRow] = useState(null); // store editable row
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [tableType, setTableType] = useState("checkstatus");

//   const domain = import.meta.env.VITE_DOMAIN_NAME?.trim() || "http://0.0.0.0";
//   const idKey = "StudentID"; // adjust for citizenid if needed

//   // Fetch table data
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const url =
//           tableType === "checkstatus"
//             ? `${domain}/students/all`
//             : `${domain}/citizenID/all`;

//         const res = await axios.get(url);
//         setRows(res.data?.rows || res.data || []);
//       } catch (error) {
//         console.error("Fetch failed:", error);
//         toast.error("❌ Failed to fetch rows.");
//       }
//     };
//     fetchData();
//   }, [tableType]);

//   // Start editing
//   const handleEdit = (row) => {
//     setEditingRow({ ...row });
//   };

//   // Add new row
//   const handleAddNew = () => {
//     if (rows.length === 0) return toast.error("No table structure found.");
//     const blankRow = {};
//     Object.keys(rows[0]).forEach((col) => (blankRow[col] = ""));
//     setEditingRow(blankRow);
//   };

//   // Update cell in editingRow
//   const handleChange = (col, value) => {
//     setEditingRow((prev) => ({ ...prev, [col]: value }));
//   };

//   // Ask for confirmation
//   const handleSaveClick = () => {
//     if (!editingRow) return;
//     setShowConfirm(true);
//   };

//   // Confirmed save
//   const handleConfirmSave = async () => {
//     try {
//       const url =
//         tableType === "checkstatus"
//           ? `${domain}/students/${editingRow[idKey]}`
//           : `${domain}/citizenID/${editingRow[idKey]}`;

//       // If no ID yet → insert new
//       if (!editingRow[idKey]) {
//         await axios.post(
//           tableType === "checkstatus"
//             ? `${domain}/students/add`
//             : `${domain}/citizenID/add`,
//           editingRow
//         );
//       } else {
//         await axios.put(url, editingRow);
//       }

//       toast.success("✅ Row saved successfully!");
//       setEditingRow(null);
//       setShowConfirm(false);

//       // Refresh table
//       const refreshed = await axios.get(
//         tableType === "checkstatus"
//           ? `${domain}/students/all`
//           : `${domain}/citizenID/all`
//       );
//       setRows(refreshed.data?.rows || refreshed.data || []);
//     } catch (error) {
//       console.error("Save failed:", error);
//       toast.error("❌ Failed to save row.");
//       setShowConfirm(false);
//     }
//   };

//   return (
//     <div style={{ minHeight: "100vh", background: "#112233", padding: "2rem", color: "#fff" }}>
//       <h2>Edit Table Rows</h2>

//       {/* Table selector */}
//       <div style={{ marginBottom: "1rem" }}>
//         <label>Table: </label>
//         <select value={tableType} onChange={(e) => setTableType(e.target.value)}>
//           <option value="checkstatus">Check Status</option>
//           <option value="citizenid">Citizen ID</option>
//         </select>
//       </div>

//       {/* Buttons */}
//       <button onClick={handleAddNew} style={{ marginBottom: "1rem" }}>
//         ➕ Add New Row
//       </button>

//       {/* Table */}
//       <div style={{ overflowX: "auto", maxHeight: "400px", marginBottom: "1rem" }}>
//         <table style={{ borderCollapse: "collapse", width: "100%", background: "#fff", color: "#000" }}>
//           <thead>
//             <tr>
//               {rows.length > 0 &&
//                 Object.keys(rows[0]).map((col) => (
//                   <th key={col} style={{ border: "1px solid #ddd", padding: "6px" }}>
//                     {col}
//                   </th>
//                 ))}
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {rows.map((row, idx) => (
//               <tr key={idx}>
//                 {Object.keys(row).map((col) => (
//                   <td key={col} style={{ border: "1px solid #ddd", padding: "6px" }}>
//                     {editingRow && editingRow[idKey] === row[idKey] ? (
//                       <input
//                         value={editingRow[col] || ""}
//                         onChange={(e) => handleChange(col, e.target.value)}
//                       />
//                     ) : (
//                       row[col]
//                     )}
//                   </td>
//                 ))}
//                 <td>
//                   {editingRow && editingRow[idKey] === row[idKey] ? (
//                     <button onClick={handleSaveClick}>💾 Save</button>
//                   ) : (
//                     <button onClick={() => handleEdit(row)}>✏️ Edit</button>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Confirmation Modal */}
//       {showConfirm && (
//         <div
//           style={{
//             position: "fixed",
//             top: 0, left: 0,
//             width: "100%", height: "100%",
//             background: "rgba(0,0,0,0.6)",
//             display: "flex", justifyContent: "center", alignItems: "center"
//           }}
//         >
//           <div style={{ background: "#fff", color: "#000", padding: "2rem", borderRadius: "8px" }}>
//             <p>Are you sure you want to save changes?</p>
//             <div style={{ display: "flex", gap: "1rem" }}>
//               <button onClick={handleConfirmSave}>✅ Yes</button>
//               <button onClick={() => setShowConfirm(false)}>❌ No</button>
//             </div>
//           </div>
//         </div>
//       )}

//       <ToastContainer />
//     </div>
//   );
// };

// export default EditPage;


//add pagination and search functionality
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const EditPage = () => {
//   const [rows, setRows] = useState([]);
//   const [editingRow, setEditingRow] = useState(null);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [tableType, setTableType] = useState("checkstatus");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);

//   const rowsPerPage = 50;
//   const domain = import.meta.env.VITE_DOMAIN_NAME?.trim() || "http://0.0.0.0";
//   const idKey = "StudentID"; // adjust if using citizenID

//   // Fetch table data
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const url =
//           tableType === "checkstatus"
//             ? `${domain}/students/all`
//             : `${domain}/citizenID/all`;
//         const res = await axios.get(url);
//         setRows(res.data?.rows || res.data || []);
//         setCurrentPage(1);
//       } catch (error) {
//         console.error("Fetch failed:", error);
//         toast.error("❌ Failed to fetch rows.");
//       }
//     };
//     fetchData();
//   }, [tableType]);

//   const handleEdit = (row) => setEditingRow({ ...row });

//   const handleAddNew = () => {
//     if (!rows.length) return toast.error("No table structure found.");
//     const blankRow = {};
//     Object.keys(rows[0]).forEach((col) => (blankRow[col] = ""));
//     setEditingRow(blankRow);
//   };

//   const handleChange = (col, value) => {
//     setEditingRow((prev) => ({ ...prev, [col]: value }));
//   };

//   const handleSaveClick = () => {
//     if (!editingRow) return;
//     setShowConfirm(true);
//   };

//   const handleConfirmSave = async () => {
//     try {
//       // POST to add/update row
//       const url =
//         tableType === "checkstatus"
//           ? `${domain}/students/add`
//           : `${domain}/citizenID/add`;

//       await axios.post(url, editingRow);
//       toast.success("✅ Row saved successfully!");

//       setEditingRow(null);
//       setShowConfirm(false);

//       // Refresh table
//       const refreshed = await axios.get(
//         tableType === "checkstatus"
//           ? `${domain}/students/all`
//           : `${domain}/citizenID/all`
//       );
//       setRows(refreshed.data?.rows || refreshed.data || []);
//     } catch (error) {
//       console.error("Save failed:", error.response?.data || error.message);
//       toast.error("❌ Failed to save row.");
//       setShowConfirm(false);
//     }
//   };

//   // Search filter
//   const filteredRows = rows.filter((row) =>
//     Object.values(row).some((val) =>
//       String(val || "").toLowerCase().includes(searchTerm.toLowerCase())
//     )
//   );

//   // Pagination
//   const totalPages = Math.max(1, Math.ceil(filteredRows.length / rowsPerPage));
//   const currentPageSafe = Math.min(currentPage, totalPages);
//   const indexOfLastRow = currentPageSafe * rowsPerPage;
//   const indexOfFirstRow = indexOfLastRow - rowsPerPage;
//   const currentRows = filteredRows.slice(indexOfFirstRow, indexOfLastRow);

//   return (
//     <div style={{ minHeight: "100vh", background: "#112233", padding: "2rem", color: "#fff" }}>
//       <h2>Edit Table Rows</h2>

//       {/* Table selector */}
//       <div style={{ marginBottom: "1rem" }}>
//         <label>Table: </label>
//         <select value={tableType} onChange={(e) => setTableType(e.target.value)}>
//           <option value="checkstatus">Check Status</option>
//           <option value="citizenid">Citizen ID</option>
//         </select>
//       </div>

//       {/* Search */}
//       <div style={{ marginBottom: "1rem" }}>
//         <input
//           type="text"
//           placeholder="🔍 Search..."
//           value={searchTerm}
//           onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
//           style={{ padding: "6px", width: "250px" }}
//         />
//       </div>

//       {/* Buttons */}
//       <button onClick={handleAddNew} style={{ marginBottom: "1rem" }}>
//         ➕ Add New Row
//       </button>

//       {/* Table */}
//       <div style={{ overflowX: "auto", maxHeight: "400px", marginBottom: "1rem" }}>
//         <table style={{ borderCollapse: "collapse", width: "100%", background: "#fff", color: "#000" }}>
//           <thead>
//             <tr>
//               {rows.length > 0 &&
//                 Object.keys(rows[0]).map((col) => (
//                   <th key={col} style={{ border: "1px solid #ddd", padding: "6px" }}>{col}</th>
//                 ))}
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentRows.map((row, idx) => (
//               <tr key={idx}>
//                 {Object.keys(row).map((col) => (
//                   <td key={col} style={{ border: "1px solid #ddd", padding: "6px" }}>
//                     {editingRow && editingRow[idKey] === row[idKey] ? (
//                       <input
//                         value={editingRow[col] || ""}
//                         onChange={(e) => handleChange(col, e.target.value)}
//                       />
//                     ) : (
//                       row[col]
//                     )}
//                   </td>
//                 ))}
//                 <td>
//                   {editingRow && editingRow[idKey] === row[idKey] ? (
//                     <button onClick={handleSaveClick}>💾 Save</button>
//                   ) : (
//                     <button onClick={() => handleEdit(row)}>✏️ Edit</button>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination controls */}
//       <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem", alignItems: "center" }}>
//         <button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} disabled={currentPageSafe === 1}>
//           ◀ Previous
//         </button>
//         <span>Page {currentPageSafe} / {totalPages}</span>
//         <button onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))} disabled={currentPageSafe === totalPages}>
//           Next ▶
//         </button>
//       </div>

//       {/* Confirmation Modal */}
//       {showConfirm && (
//         <div style={{
//           position: "fixed", top: 0, left: 0,
//           width: "100%", height: "100%",
//           background: "rgba(0,0,0,0.6)",
//           display: "flex", justifyContent: "center", alignItems: "center"
//         }}>
//           <div style={{ background: "#fff", color: "#000", padding: "2rem", borderRadius: "8px" }}>
//             <p>Are you sure you want to save changes?</p>
//             <div style={{ display: "flex", gap: "1rem" }}>
//               <button onClick={handleConfirmSave}>✅ Yes</button>
//               <button onClick={() => setShowConfirm(false)}>❌ No</button>
//             </div>
//           </div>
//         </div>
//       )}

//       <ToastContainer />
//     </div>
//   );
// };

// export default EditPage;




