// //change display format
// //21/8/25 changing the display format for each status condition
// //fix the currentstatus when its null and got skipped in custom displaying phase
// //fix display for null values to use dash instead of hourglass
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import SearchBar from '../components/SearchBar';

// const StudentTable = () => {
//   const [tableType, setTableType] = useState('students'); // 'students' or 'citizenID'
//   const [data, setData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [loading, setLoading] = useState(true);

//   const [currentPage, setCurrentPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   const [visibleColumns, setVisibleColumns] = useState([]);
//   const [showColumnDropdown, setShowColumnDropdown] = useState(false);
//   const [showTableDropdown, setShowTableDropdown] = useState(false);

//   const rowHeight = 42;
//   const tablePadding = 60;

//   const domain = import.meta.env.VITE_DOMAIN_NAME || "http://0.0.0.0";

//   const fetchData = async (type) => {
//     setLoading(true);
//     try {
//       const url = type === 'students' ? `${domain}/students/all` : `${domain}/citizenID/all`;
//       const res = await axios.get(url);
//       const rows = res.data || [];
//       setData(rows);
//       setFilteredData(rows);
//       setVisibleColumns(Object.keys(rows[0] || {}));
//       setCurrentPage(1);
//     } catch (err) {
//       console.error(`Failed to fetch ${type} data:`, err);
//       setData([]);
//       setFilteredData([]);
//       setVisibleColumns([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData(tableType);
//   }, [tableType]);

//   useEffect(() => {
//     const term = searchTerm.toLowerCase().trim();
//     const filtered = data.filter(row =>
//       Object.entries(row).some(([key, value]) => {
//         const val = String(value ?? '').toLowerCase();
//         if (key.toLowerCase() === 'gender') return val === term;
//         return val.includes(term);
//       })
//     );
//     setFilteredData(filtered);
//     setCurrentPage(1);
//   }, [searchTerm, data]);

//   const handleSearchChange = (e) => setSearchTerm(e.target.value);
//   const handleRowsPerPageChange = (e) => {
//     setRowsPerPage(Number(e.target.value));
//     setCurrentPage(1);
//   };

//   const handleToggleColumn = (key) => {
//     setVisibleColumns(prev =>
//       prev.includes(key)
//         ? prev.filter(col => col !== key)
//         : [...prev, key]
//     );
//   };

//   const handleShowAllColumns = () => {
//     if (data.length > 0) setVisibleColumns(Object.keys(data[0]));
//   };
//   const handleHideAllColumns = () => setVisibleColumns([]);

//   const totalPages = Math.ceil(filteredData.length / rowsPerPage);
//   const paginatedData = filteredData.slice(
//     (currentPage - 1) * rowsPerPage,
//     currentPage * rowsPerPage
//   );

//   const handlePrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
//   const handleNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));

//   const shouldTransform = (key) => {
//     const norm = key.trim().toLowerCase();
//     return norm.startsWith("stage") || norm === "currentstatus";
//   };

//   const formatValue = (key, value) => {
//     const normKey = key.trim().toLowerCase();

//     // Handle stage1..stage8
//     if (normKey.startsWith("stage")) {
//       const strVal = String(value ?? "").trim();
//       if (strVal === "1" || strVal === "ผ่าน") return "✅";
//       if (strVal === "0" || strVal === "ไม่ผ่าน") return "❌";
//       if (strVal === "รอดำเนินการ") return "⏳";
//       if (strVal === "ติดเงื่อนไข") return "⚠️";
//       if (strVal === "" || strVal.toLowerCase() === "null") return "-";
//       // if (strVal === null || strVal === undefined) return "–";
//       return "-"; //default for other texts that do not fit into any conditions above, null, and undefined

//     }

//     // Handle currentStatus
//     if (normKey === "currentstatus") {
//       if (value === null || value === undefined || String(value).trim() === "" || String(value).trim().toLowerCase() === "null") {
//         return "-"; // hourglass for empty/null
//       }
//       else if (value === "รอดำเนินการ") return "⏳";
//       return String(value).trim();
//     }

//     // Fallback for other columns
//     if (value === null || value === undefined || String(value).trim().toLowerCase() === "null") {
//       return "–"; // dash for general nulls
//     }

//     return String(value);
//   };

//   if (loading) return <p style={{ color: "white" }}>Loading data...</p>;
//   if (data.length === 0) return <p style={{ color: "white" }}>No records found.</p>;

//   const allColumns = Object.keys(data[0]);

//   return (
//     <div style={{ minHeight: "100vh", backgroundColor: "#0d1b3d", padding: "20px", color: "white" }}>
//       <SearchBar value={searchTerm} onChange={handleSearchChange} />

//       <div style={{ marginTop: "1rem", display: "flex", alignItems: "center", gap: "2rem" }}>
//         <label>
//           Rows per page:&nbsp;
//           <select value={rowsPerPage} onChange={handleRowsPerPageChange}>
//             {[5, 10, 20, 50].map(n => (
//               <option key={n} value={n}>{n}</option>
//             ))}
//           </select>
//         </label>

//         <div style={{ position: "relative" }}>
//           <button
//             onClick={() => setShowColumnDropdown(!showColumnDropdown)}
//             style={{
//               padding: "6px 10px",
//               backgroundColor: "#e3f2fd",
//               border: "1px solid #90caf9",
//               borderRadius: "6px",
//               cursor: "pointer",
//               fontWeight: "500",
//               color: "#000"
//             }}
//           >
//             ⚙️ Columns
//           </button>

//           <button
//             onClick={() => setShowTableDropdown(!showTableDropdown)}
//             style={{
//               padding: "6px 10px",
//               backgroundColor: "#e3f2fd",
//               border: "1px solid #90caf9",
//               borderRadius: "6px",
//               cursor: "pointer",
//               fontWeight: "500",
//               marginLeft: "8px",
//               color: "#000"
//             }}
//           >
//             📋 Tables
//           </button>

//           {showColumnDropdown && (
//             <div style={{
//               position: "absolute",
//               top: "110%",
//               left: 0,
//               backgroundColor: "#fff",
//               border: "1px solid #ccc",
//               boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
//               borderRadius: "6px",
//               padding: "10px",
//               zIndex: 10,
//               maxHeight: "300px",
//               overflowY: "auto",
//               whiteSpace: "nowrap",
//               minWidth: "200px",
//               color: "#000"
//             }}>
//               {allColumns.map((key, i) => (
//                 <div key={i} style={{ display: "flex", alignItems: "center", marginBottom: "6px" }}>
//                   <input
//                     type="checkbox"
//                     checked={visibleColumns.includes(key)}
//                     onChange={() => handleToggleColumn(key)}
//                     id={`col-${key}`}
//                     style={{ marginRight: "6px" }}
//                   />
//                   <label htmlFor={`col-${key}`}>{key}</label>
//                 </div>
//               ))}
//               <hr />
//               <button onClick={handleShowAllColumns} style={{
//                 padding: "4px 8px",
//                 backgroundColor: "#f0f0f0",
//                 border: "1px solid #ccc",
//                 borderRadius: "4px",
//                 cursor: "pointer",
//                 marginTop: "6px",
//                 color: "#000"
//               }}>
//                 Show All
//               </button>
//               <button onClick={handleHideAllColumns} style={{
//                 padding: "4px 8px",
//                 backgroundColor: "#f0f0f0",
//                 border: "1px solid #ccc",
//                 borderRadius: "4px",
//                 cursor: "pointer",
//                 marginTop: "6px",
//                 color: "#000"
//               }}>
//                 Hide All
//               </button>
//             </div>
//           )}

//           {showTableDropdown && (
//             <div style={{
//               position: "absolute",
//               top: "110%",
//               left: "120px",
//               backgroundColor: "#fff",
//               border: "1px solid #ccc",
//               boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
//               borderRadius: "6px",
//               padding: "10px",
//               zIndex: 10,
//               minWidth: "180px",
//               color: "#000"
//             }}>
//               <div style={{ cursor: "pointer", padding: "4px 6px" }}
//                    onClick={() => { setTableType('students'); setShowTableDropdown(false); }}>
//                 Check Status Table
//               </div>
//               <div style={{ cursor: "pointer", padding: "4px 6px" }}
//                    onClick={() => { setTableType('citizenID'); setShowTableDropdown(false); }}>
//                 Citizen ID Table
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       <div style={{ minHeight: `${rowsPerPage * rowHeight + tablePadding}px`, transition: "min-height 0.2s ease" }}>
//         <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1rem", fontSize: "14px", backgroundColor: "#fff", color: "#000" }}>
//           <thead>
//             <tr>
//               {allColumns.map((key, i) =>
//                 visibleColumns.includes(key) ? (
//                   <th key={i} style={{
//                     backgroundColor: "#e3f2fd",
//                     textAlign: "left",
//                     padding: "12px",
//                     borderBottom: "2px solid #ccc",
//                     fontWeight: "600",
//                     color: "#000"
//                   }}>{key}</th>
//                 ) : null
//               )}
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedData.map((row, i) => (
//               <tr key={i} style={{
//                 backgroundColor: i % 2 === 0 ? "#fff" : "#f7fafd",
//                 borderBottom: "1px solid #eee",
//                 color: "#000"
//               }}>
//                 {allColumns.map((key, j) =>
//                   visibleColumns.includes(key) ? (
//                     <td key={j} style={{ padding: "10px", color: "#000" }}>
//                       {shouldTransform(key) ? formatValue(key, row[key]) : (row[key] ?? "–")}
//                     </td>
//                   ) : null
//                 )}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       <div style={{ marginTop: "1rem", display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
//         <button onClick={handlePrevPage} disabled={currentPage === 1}>← Prev</button>

//         {totalPages <= 10
//           ? Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
//               <button
//                 key={page}
//                 onClick={() => setCurrentPage(page)}
//                 style={{
//                   padding: "6px 12px",
//                   backgroundColor: page === currentPage ? "#1976d2" : "#f0f0f0",
//                   color: page === currentPage ? "#fff" : "#333",
//                   border: "none",
//                   borderRadius: "4px",
//                   cursor: "pointer",
//                   fontWeight: page === currentPage ? "bold" : "normal"
//                 }}
//               >
//                 {page}
//               </button>
//             ))
//           : <>
//               <button onClick={() => setCurrentPage(1)} style={{ padding: "6px 12px" }}>1</button>
//               {currentPage > 4 && <span>...</span>}
//               {Array.from({ length: 5 }, (_, i) => currentPage - 2 + i)
//                 .filter(p => p > 1 && p < totalPages)
//                 .map(page => (
//                   <button
//                     key={page}
//                     onClick={() => setCurrentPage(page)}
//                     style={{
//                       padding: "6px 12px",
//                       backgroundColor: page === currentPage ? "#1976d2" : "#f0f0f0",
//                       color: page === currentPage ? "#fff" : "#333",
//                       border: "none",
//                       borderRadius: "4px",
//                       cursor: "pointer",
//                       fontWeight: page === currentPage ? "bold" : "normal"
//                     }}
//                   >{page}</button>
//                 ))
//               }
//               {currentPage < totalPages - 3 && <span>...</span>}
//               <button onClick={() => setCurrentPage(totalPages)} style={{ padding: "6px 12px" }}>{totalPages}</button>
//             </>
//         }

//         <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next →</button>

//         <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
//           <label>Go to page:</label>
//           <input
//             type="number"
//             min={1}
//             max={totalPages}
//             value={currentPage}
//             onChange={(e) => {
//               let page = Number(e.target.value);
//               if (isNaN(page)) return;
//               page = Math.max(1, Math.min(totalPages, page));
//               setCurrentPage(page);
//             }}
//             style={{ width: "60px", padding: "4px 6px", border: "1px solid #ccc", borderRadius: "4px" }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentTable;






//hide some columns as default for security purposes
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import SearchBar from '../components/SearchBar';

// const sensitiveColumns = ['Email', 'Phone_number', 'currentStatus', 'KeyToken'];

// const StudentTable = () => {
//   const [tableType, setTableType] = useState('students'); // 'students' or 'citizenID'
//   const [data, setData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [loading, setLoading] = useState(true);

//   const [currentPage, setCurrentPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   const [visibleColumns, setVisibleColumns] = useState([]);
//   const [showColumnDropdown, setShowColumnDropdown] = useState(false);
//   const [showTableDropdown, setShowTableDropdown] = useState(false);

//   const [adminLoggedIn, setAdminLoggedIn] = useState(false);
//   const [passwordInput, setPasswordInput] = useState('');

//   const rowHeight = 42;
//   const tablePadding = 60;
//   const domain = import.meta.env.VITE_DOMAIN_NAME || "http://0.0.0.0";

//   const fetchData = async (type) => {
//     setLoading(true);
//     try {
//       const url = type === 'students' ? `${domain}/students/all` : `${domain}/citizenID/all`;
//       const res = await axios.get(url);
//       const rows = res.data || [];
//       setData(rows);
//       setFilteredData(rows);

//       // hide sensitive columns if admin not logged in
//       const cols = Object.keys(rows[0] || {}).filter(col => adminLoggedIn || !sensitiveColumns.includes(col));
//       setVisibleColumns(cols);
//       setCurrentPage(1);
//     } catch (err) {
//       console.error(`Failed to fetch ${type} data:`, err);
//       setData([]);
//       setFilteredData([]);
//       setVisibleColumns([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData(tableType);
//   }, [tableType, adminLoggedIn]);

//   const handlePasswordSubmit = () => {
//     if (passwordInput === "depa@1234") { // replace with your password
//       setAdminLoggedIn(true);
//       setVisibleColumns(Object.keys(data[0] || {}));
//     } else {
//       alert("Incorrect password!");
//     }
//     setPasswordInput('');
//   };

//   useEffect(() => {
//     const term = searchTerm.toLowerCase().trim();
//     const filtered = data.filter(row =>
//       Object.entries(row).some(([key, value]) => {
//         const val = String(value ?? '').toLowerCase();
//         if (key.toLowerCase() === 'gender') return val === term;
//         return val.includes(term);
//       })
//     );
//     setFilteredData(filtered);
//     setCurrentPage(1);
//   }, [searchTerm, data]);

//   const handleSearchChange = (e) => setSearchTerm(e.target.value);
//   const handleRowsPerPageChange = (e) => {
//     setRowsPerPage(Number(e.target.value));
//     setCurrentPage(1);
//   };

//   const handleToggleColumn = (key) => {
//     setVisibleColumns(prev =>
//       prev.includes(key)
//         ? prev.filter(col => col !== key)
//         : [...prev, key]
//     );
//   };
//   const handleShowAllColumns = () => { if (data.length > 0) setVisibleColumns(Object.keys(data[0])); };
//   const handleHideAllColumns = () => setVisibleColumns([]);

//   const totalPages = Math.ceil(filteredData.length / rowsPerPage);
//   const paginatedData = filteredData.slice(
//     (currentPage - 1) * rowsPerPage,
//     currentPage * rowsPerPage
//   );

//   const handlePrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
//   const handleNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));

//   const shouldTransform = (key) => {
//     const norm = key.trim().toLowerCase();
//     return norm.startsWith("stage") || norm === "currentstatus";
//   };

//   const formatValue = (key, value) => {
//     const normKey = key.trim().toLowerCase();
//     if (normKey.startsWith("stage")) {
//       const strVal = String(value ?? "").trim();
//       if (strVal === "1" || strVal === "ผ่าน") return "✅";
//       if (strVal === "0" || strVal === "ไม่ผ่าน") return "❌";
//       if (strVal === "รอดำเนินการ") return "⏳";
//       if (strVal === "ติดเงื่อนไข") return "⚠️";
//       if (strVal === "" || strVal.toLowerCase() === "null") return "-";
//       return "-";
//     }
//     if (normKey === "currentstatus") {
//       if (!value || String(value).trim().toLowerCase() === "null") return "-";
//       if (value === "รอดำเนินการ") return "⏳";
//       return String(value).trim();
//     }
//     if (!value || String(value).trim().toLowerCase() === "null") return "–";
//     return String(value);
//   };

//   if (loading) return <p style={{ color: "white" }}>Loading data...</p>;
//   if (data.length === 0) return <p style={{ color: "white" }}>No records found.</p>;

//   const allColumns = Object.keys(data[0]);

//   return (
//     <div style={{ minHeight: "100vh", backgroundColor: "#0d1b3d", padding: "20px", color: "white" }}>
      
//       {/* Password box */}
//       {!adminLoggedIn && (
//         <div style={{ marginBottom: "1rem" }}>
//           <input
//             type="password"
//             placeholder="Enter admin password"
//             value={passwordInput}
//             onChange={(e) => setPasswordInput(e.target.value)}
//             style={{ padding: "6px", borderRadius: "4px", border: "1px solid #ccc" }}
//           />
//           <button onClick={handlePasswordSubmit} style={{ marginLeft: "8px", padding: "6px 10px", borderRadius: "4px" }}>
//             Submit
//           </button>
//         </div>
//       )}

//       <SearchBar value={searchTerm} onChange={handleSearchChange} />

//       <div style={{ marginTop: "1rem", display: "flex", alignItems: "center", gap: "2rem" }}>
//         <label>
//           Rows per page:&nbsp;
//           <select value={rowsPerPage} onChange={handleRowsPerPageChange}>
//             {[5, 10, 20, 50].map(n => (
//               <option key={n} value={n}>{n}</option>
//             ))}
//           </select>
//         </label>

//         {/* Only show columns/tables buttons if admin logged in */}
//         {adminLoggedIn && (
//           <div style={{ position: "relative" }}>
//             <button
//               onClick={() => setShowColumnDropdown(!showColumnDropdown)}
//               style={{ padding: "6px 10px" }}
//             >⚙️ Columns</button>
//             <button
//               onClick={() => setShowTableDropdown(!showTableDropdown)}
//               style={{ padding: "6px 10px", marginLeft: "8px" }}
//             >📋 Tables</button>

//             {showColumnDropdown && (
//               <div style={{ position: "absolute", top: "110%", left: 0, backgroundColor: "#fff", color: "#000", padding: "10px", borderRadius: "6px" }}>
//                 {allColumns.map((key, i) => (
//                   <div key={i}>
//                     <input type="checkbox" checked={visibleColumns.includes(key)} onChange={() => handleToggleColumn(key)} id={`col-${key}`} />
//                     <label htmlFor={`col-${key}`}>{key}</label>
//                   </div>
//                 ))}
//                 <button onClick={handleShowAllColumns}>Show All</button>
//                 <button onClick={handleHideAllColumns}>Hide All</button>
//               </div>
//             )}

//             {showTableDropdown && (
//               <div style={{
//                 position: "absolute",
//                 top: "110%",
//                 left: 0, // align directly under the button
//                 backgroundColor: "#fff",
//                 border: "1px solid #ccc",
//                 boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
//                 borderRadius: "6px",
//                 padding: "0",
//                 zIndex: 10,
//                 minWidth: "180px",
//                 color: "#000"
//               }}>
//                 <div
//                   style={{
//                     cursor: "pointer",
//                     padding: "8px 16px",
//                     borderBottom: "1px solid #eee",
//                     backgroundColor: "#fff"
//                   }}
//                   onClick={() => { setTableType('students'); setShowTableDropdown(false); }}
//                   onMouseEnter={e => e.currentTarget.style.backgroundColor = "#f0f0f0"}
//                   onMouseLeave={e => e.currentTarget.style.backgroundColor = "#fff"}
//                 >
//                   Check Status Table
//                 </div>
//                 <div
//                   style={{
//                     cursor: "pointer",
//                     padding: "8px 16px",
//                     backgroundColor: "#fff"
//                   }}
//                   onClick={() => { setTableType('citizenID'); setShowTableDropdown(false); }}
//                   onMouseEnter={e => e.currentTarget.style.backgroundColor = "#f0f0f0"}
//                   onMouseLeave={e => e.currentTarget.style.backgroundColor = "#fff"}
//                 >
//                   Citizen ID Table
//                 </div>
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Table */}
//       <div style={{ minHeight: `${rowsPerPage * rowHeight + tablePadding}px`, transition: "min-height 0.2s ease" }}>
//         <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1rem", fontSize: "14px", backgroundColor: "#fff", color: "#000" }}>
//           <thead>
//             <tr>
//               {allColumns.map((key, i) =>
//                 visibleColumns.includes(key) ? (
//                   <th key={i} style={{ backgroundColor: "#e3f2fd", textAlign: "left", padding: "12px", borderBottom: "2px solid #ccc", fontWeight: "600", color: "#000" }}>{key}</th>
//                 ) : null
//               )}
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedData.map((row, i) => (
//               <tr key={i} style={{ backgroundColor: i % 2 === 0 ? "#fff" : "#f7fafd", borderBottom: "1px solid #eee", color: "#000" }}>
//                 {allColumns.map((key, j) =>
//                   visibleColumns.includes(key) ? (
//                     <td key={j} style={{ padding: "10px", color: "#000" }}>
//                       {shouldTransform(key) ? formatValue(key, row[key]) : (row[key] ?? "–")}
//                     </td>
//                   ) : null
//                 )}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       <div style={{ marginTop: "1rem", display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
//         <button onClick={handlePrevPage} disabled={currentPage === 1}>← Prev</button>

//         {totalPages <= 10
//           ? Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
//             <button
//               key={page}
//               onClick={() => setCurrentPage(page)}
//               style={{
//                 padding: "6px 12px",
//                 backgroundColor: page === currentPage ? "#1976d2" : "#f0f0f0",
//                 color: page === currentPage ? "#fff" : "#333",
//                 border: "none",
//                 borderRadius: "4px",
//                 cursor: "pointer",
//                 fontWeight: page === currentPage ? "bold" : "normal"
//               }}
//             >
//               {page}
//             </button>
//           ))
//           : <>
//             <button onClick={() => setCurrentPage(1)} style={{ padding: "6px 12px" }}>1</button>
//             {currentPage > 4 && <span>...</span>}
//             {Array.from({ length: 5 }, (_, i) => currentPage - 2 + i)
//               .filter(p => p > 1 && p < totalPages)
//               .map(page => (
//                 <button
//                   key={page}
//                   onClick={() => setCurrentPage(page)}
//                   style={{
//                     padding: "6px 12px",
//                     backgroundColor: page === currentPage ? "#1976d2" : "#f0f0f0",
//                     color: page === currentPage ? "#fff" : "#333",
//                     border: "none",
//                     borderRadius: "4px",
//                     cursor: "pointer",
//                     fontWeight: page === currentPage ? "bold" : "normal"
//                   }}
//                 >{page}</button>
//               ))
//             }
//             {currentPage < totalPages - 3 && <span>...</span>}
//             <button onClick={() => setCurrentPage(totalPages)} style={{ padding: "6px 12px" }}>{totalPages}</button>
//           </>
//         }

//         <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next →</button>

//         <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
//           <label>Go to page:</label>
//           <input
//             type="number"
//             min={1}
//             max={totalPages}
//             value={currentPage}
//             onChange={(e) => {
//               let page = Number(e.target.value);
//               if (isNaN(page)) return;
//               page = Math.max(1, Math.min(totalPages, page));
//               setCurrentPage(page);
//             }}
//             style={{ width: "60px", padding: "4px 6px", border: "1px solid #ccc", borderRadius: "4px" }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentTable;





import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import { useAdmin } from '../App'; // Import admin context

const sensitiveColumns = ['Email', 'Phone_number', 'currentStatus', 'KeyToken'];

const StudentTable = () => {
  const { adminLoggedIn } = useAdmin();

  const [tableType, setTableType] = useState('students'); // 'students' or 'citizenID'
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [visibleColumns, setVisibleColumns] = useState([]);
  const [showColumnDropdown, setShowColumnDropdown] = useState(false);
  const [showTableDropdown, setShowTableDropdown] = useState(false);

  const rowHeight = 42;
  const tablePadding = 60;
  const domain = import.meta.env.VITE_DOMAIN_NAME || "http://0.0.0.0";

  // Fetch data
  const fetchData = async (type) => {
    setLoading(true);
    try {
      const url = type === 'students' ? `${domain}/students/all` : `${domain}/citizenID/all`;
      const res = await axios.get(url);
      const rows = res.data || [];
      setData(rows);
      setFilteredData(rows);

      // Show only non-sensitive columns by default, unless admin
      const cols = Object.keys(rows[0] || {}).filter(
        col => adminLoggedIn || !sensitiveColumns.includes(col)
      );
      setVisibleColumns(cols);

      setCurrentPage(1);
    } catch (err) {
      console.error(`Failed to fetch ${type} data:`, err);
      setData([]);
      setFilteredData([]);
      setVisibleColumns([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(tableType);
  }, [tableType, adminLoggedIn]);

  // Search filter
  useEffect(() => {
    const term = searchTerm.toLowerCase().trim();
    const filtered = data.filter(row =>
      Object.entries(row).some(([key, value]) => {
        const val = String(value ?? '').toLowerCase();
        if (key.toLowerCase() === 'gender') return val === term;
        return val.includes(term);
      })
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  }, [searchTerm, data]);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleToggleColumn = (key) => {
    setVisibleColumns(prev =>
      prev.includes(key) ? prev.filter(col => col !== key) : [...prev, key]
    );
  };
  const handleShowAllColumns = () => { if (data.length > 0) setVisibleColumns(Object.keys(data[0])); };
  const handleHideAllColumns = () => setVisibleColumns([]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const handleNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));

  const shouldTransform = (key) => {
    const norm = key.trim().toLowerCase();
    return norm.startsWith("stage") || norm === "currentstatus";
  };

  const formatValue = (key, value) => {
    const normKey = key.trim().toLowerCase();
    if (normKey.startsWith("stage")) {
      const strVal = String(value ?? "").trim();
      if (strVal === "1" || strVal === "ผ่าน") return "✅";
      if (strVal === "0" || strVal === "ไม่ผ่าน") return "❌";
      if (strVal === "รอดำเนินการ") return "⏳";
      if (strVal === "ติดเงื่อนไข") return "⚠️";
      if (strVal === "" || strVal.toLowerCase() === "null") return "-";
      return "-";
    }
    if (normKey === "currentstatus") {
      if (!value || String(value).trim().toLowerCase() === "null") return "-";
      if (value === "รอดำเนินการ") return "⏳";
      return String(value).trim();
    }
    if (!value || String(value).trim().toLowerCase() === "null") return "–";
    return String(value);
  };

  if (loading) return <p style={{ color: "white" }}>Loading data...</p>;
  if (data.length === 0) return <p style={{ color: "white" }}>No records found.</p>;

  const allColumns = Object.keys(data[0]);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0d1b3d", padding: "20px", color: "white" }}>
      <SearchBar value={searchTerm} onChange={handleSearchChange} />

      <div style={{ marginTop: "1rem", display: "flex", alignItems: "center", gap: "2rem", flexWrap: "wrap" }}>
        <label>
          Rows per page:&nbsp;
          <select value={rowsPerPage} onChange={handleRowsPerPageChange}>
            {[5, 10, 20, 50].map(n => (<option key={n} value={n}>{n}</option>))}
          </select>
        </label>

        {/* Columns & Tables buttons only for admin */}
        {adminLoggedIn && (
          <div style={{ position: "relative" }}>
            <button onClick={() => setShowColumnDropdown(!showColumnDropdown)} style={{ padding: "6px 10px" }}>⚙️ Columns</button>
            <button onClick={() => setShowTableDropdown(!showTableDropdown)} style={{ padding: "6px 10px", marginLeft: "8px" }}>📋 Tables</button>

            {showColumnDropdown && (
              <div style={{ position: "absolute", top: "110%", left: 0, backgroundColor: "#fff", color: "#000", padding: "10px", borderRadius: "6px", zIndex: 20 }}>
                {allColumns.map((key, i) => (
                  <div key={i}>
                    <input type="checkbox" checked={visibleColumns.includes(key)} onChange={() => handleToggleColumn(key)} id={`col-${key}`} />
                    <label htmlFor={`col-${key}`}>{key}</label>
                  </div>
                ))}
                <button onClick={handleShowAllColumns}>Show All</button>
                <button onClick={handleHideAllColumns}>Hide All</button>
              </div>
            )}

            {showTableDropdown && (
              <div style={{
                position: "absolute",
                top: "110%",
                left: 0,
                backgroundColor: "#fff",
                border: "1px solid #ccc",
                boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                borderRadius: "6px",
                padding: "0",
                zIndex: 10,
                minWidth: "180px",
                color: "#000"
              }}>
                <div
                  style={{ cursor: "pointer", padding: "8px 16px", borderBottom: "1px solid #eee", backgroundColor: "#fff" }}
                  onClick={() => { setTableType('students'); setShowTableDropdown(false); }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = "#f0f0f0"}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = "#fff"}
                >
                  Check Status Table
                </div>
                <div
                  style={{ cursor: "pointer", padding: "8px 16px", backgroundColor: "#fff" }}
                  onClick={() => { setTableType('citizenID'); setShowTableDropdown(false); }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = "#f0f0f0"}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = "#fff"}
                >
                  Citizen ID Table
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Table */}
      <div style={{
        minHeight: `${rowsPerPage * rowHeight + tablePadding}px`,
        transition: "min-height 0.2s ease",
        overflowX: "auto",   // horizontal scroll
        maxWidth: "100%"
      }}>
        <table style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "1rem",
          fontSize: "14px",
          backgroundColor: "#fff",
          color: "#000",
          tableLayout: "fixed" // responsive column widths
        }}>
          <thead>
            <tr>
              {allColumns.map((key, i) => visibleColumns.includes(key) ? (
                <th key={i} style={{
                  backgroundColor: "#e3f2fd",
                  textAlign: "left",
                  padding: "12px",
                  borderBottom: "2px solid #ccc",
                  fontWeight: "600",
                  color: "#000",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap"
                }}>{key}</th>
              ) : null)}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, i) => (
              <tr key={i} style={{
                backgroundColor: i % 2 === 0 ? "#fff" : "#f7fafd",
                borderBottom: "1px solid #eee",
                color: "#000"
              }}>
                {allColumns.map((key, j) => visibleColumns.includes(key) ? (
                  <td key={j} style={{
                    padding: "10px",
                    color: "#000",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                  }}>
                    {shouldTransform(key) ? formatValue(key, row[key]) : (row[key] ?? "–")}
                  </td>
                ) : null)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div style={{ marginTop: "1rem", display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>← Prev</button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            style={{
              padding: "6px 12px",
              backgroundColor: page === currentPage ? "#1976d2" : "#f0f0f0",
              color: page === currentPage ? "#fff" : "#333",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: page === currentPage ? "bold" : "normal"
            }}
          >
            {page}
          </button>
        ))}

        <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next →</button>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <label>Go to page:</label>
          <input
            type="number"
            min={1}
            max={totalPages}
            value={currentPage}
            onChange={(e) => {
              let page = Number(e.target.value);
              if (isNaN(page)) return;
              page = Math.max(1, Math.min(totalPages, page));
              setCurrentPage(page);
            }}
            style={{ width: "60px", padding: "4px 6px", border: "1px solid #ccc", borderRadius: "4px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default StudentTable;

