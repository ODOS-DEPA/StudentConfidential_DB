//fix table from overflowing and need permission to access sensitive data like email, phone number, current status, KeyToken
//and also table and column button.
//add horizontal scroll
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import SearchBar from '../components/SearchBar';
// import { useAdmin } from '../App'; // Import admin context

// const sensitiveColumns = ['Email', 'Phone_number', 'currentStatus', 'KeyToken']; // columns hidden by default

// const StudentTable = () => {
//   const { adminLoggedIn } = useAdmin();

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

//   // Fetch data
//   const fetchData = async (type) => {
//     setLoading(true);
//     try {
//       const url = type === 'students' ? `${domain}/students/all` : `${domain}/citizenID/all`;
//       const res = await axios.get(url);
//       const rows = res.data || [];
//       setData(rows);
//       setFilteredData(rows);

//       const cols = Object.keys(rows[0] || {}).filter(
//         col => adminLoggedIn || !sensitiveColumns.includes(col)
//       );
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

//   // Search filter
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
//       prev.includes(key) ? prev.filter(col => col !== key) : [...prev, key]
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
//       <SearchBar value={searchTerm} onChange={handleSearchChange} />

//       <div style={{ marginTop: "1rem", display: "flex", alignItems: "center", gap: "2rem", flexWrap: "wrap" }}>
//         <label>
//           Rows per page:&nbsp;
//           <select value={rowsPerPage} onChange={handleRowsPerPageChange}>
//             {[5, 10, 20, 50].map(n => (<option key={n} value={n}>{n}</option>))}
//           </select>
//         </label>

//         {adminLoggedIn && (
//           <div style={{ position: "relative" }}>
//             <button onClick={() => setShowColumnDropdown(!showColumnDropdown)} style={{ padding: "6px 10px" }}>⚙️ Columns</button>
//             <button onClick={() => setShowTableDropdown(!showTableDropdown)} style={{ padding: "6px 10px", marginLeft: "8px" }}>📋 Tables</button>

//             {showColumnDropdown && (
//               <div style={{
//                 position: "absolute",
//                 top: "110%",
//                 left: 0,
//                 backgroundColor: "#fff",
//                 color: "#000",
//                 padding: "10px",
//                 borderRadius: "6px",
//                 zIndex: 20
//               }}>
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
//                 left: 0,
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
//                   style={{ cursor: "pointer", padding: "8px 16px", borderBottom: "1px solid #eee" }}
//                   onClick={() => { setTableType('students'); setShowTableDropdown(false); }}
//                   onMouseEnter={e => e.currentTarget.style.backgroundColor = "#f0f0f0"}
//                   onMouseLeave={e => e.currentTarget.style.backgroundColor = "#fff"}
//                 >
//                   Check Status Table
//                 </div>
//                 <div
//                   style={{ cursor: "pointer", padding: "8px 16px", backgroundColor: "#fff" }}
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
//       <div style={{
//         width: "100%",
//         overflowX: "auto",
//         paddingBottom: "10px",
//         marginTop: "1rem",
//         border: "1px solid #ccc",
//         borderRadius: "8px",
//         backgroundColor: "#fff",
//         scrollbarWidth: "thin",
//         scrollbarColor: "#deedfcff #f0f0f0"
//       }}>
//         <table style={{
//           width: "max-content",
//           minWidth: "100%",
//           borderCollapse: "collapse",
//           fontSize: "14px",
//           tableLayout: "fixed"
//         }}>
//           <thead>
//             <tr>
//               {allColumns.map((key, i) => visibleColumns.includes(key) ? (
//                 <th key={i} style={{
//                   backgroundColor: "#e3f2fd",
//                   textAlign: "left",
//                   padding: "12px",
//                   borderBottom: "2px solid #ccc",
//                   fontWeight: "600",
//                   color: "#000",
//                   overflow: "hidden",
//                   textOverflow: "ellipsis",
//                   whiteSpace: "nowrap"
//                 }}>{key}</th>
//               ) : null)}
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedData.map((row, i) => (
//               <tr key={i} style={{
//                 backgroundColor: i % 2 === 0 ? "#fff" : "#f7fafd",
//                 borderBottom: "1px solid #eee",
//                 color: "#000"
//               }}>
//                 {allColumns.map((key, j) => visibleColumns.includes(key) ? (
//                   <td key={j} style={{
//                     padding: "10px",
//                     color: "#000",
//                     overflow: "hidden",
//                     textOverflow: "ellipsis",
//                     whiteSpace: "nowrap"
//                   }}>
//                     {shouldTransform(key) ? formatValue(key, row[key]) : (row[key] ?? "–")}
//                   </td>
//                 ) : null)}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       <div style={{ marginTop: "1rem", display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
//         <button onClick={handlePrevPage} disabled={currentPage === 1}>← Prev</button>

//         {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
//           <button
//             key={page}
//             onClick={() => setCurrentPage(page)}
//             style={{
//               padding: "6px 12px",
//               backgroundColor: page === currentPage ? "#1976d2" : "#f0f0f0",
//               color: page === currentPage ? "#fff" : "#333",
//               border: "none",
//               borderRadius: "4px",
//               cursor: "pointer",
//               fontWeight: page === currentPage ? "bold" : "normal"
//             }}
//           >
//             {page}
//           </button>
//         ))}

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
import { motion, AnimatePresence } from "framer-motion";

const sensitiveColumns = ['Email', 'Phone_number', 'currentStatus', 'KeyToken']; // columns hidden by default

const StudentTable = () => {
  const { adminLoggedIn } = useAdmin();

  const [tableType, setTableType] = useState('students'); // 'students' | 'citizenID' | 'englishScore' | 'techScore'
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [visibleColumns, setVisibleColumns] = useState([]);
  const [showColumnDropdown, setShowColumnDropdown] = useState(false);
  const [showTableDropdown, setShowTableDropdown] = useState(false);

  const domain = import.meta.env.VITE_DOMAIN_NAME || "http://0.0.0.0";

  // Fetch data
  const fetchData = async (type) => {
    setLoading(true);
    try {
      let url = "";
      switch (type) {
        case "students":
          url = `${domain}/students/all`;
          break;
        case "citizenID":
          url = `${domain}/citizenID/all`;
          break;
        case "englishScore":
          url = `${domain}/EnglishScore/all`;
          break;
        case "techScore":
          url = `${domain}/TechScore/all`;
          break;
        default:
          url = `${domain}/students/all`;
      }

      const res = await axios.get(url);
      const rows = res.data || [];
      setData(rows);
      setFilteredData(rows);

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

        {adminLoggedIn && (
          <div style={{ position: "relative" }}>
            <button onClick={() => setShowColumnDropdown(!showColumnDropdown)} style={{ padding: "6px 10px" }}>⚙️ Columns</button>
            <button onClick={() => setShowTableDropdown(!showTableDropdown)} style={{ padding: "6px 10px", marginLeft: "8px" }}>📋 Tables</button>

            {showColumnDropdown && (
              <div style={{
                position: "absolute",
                top: "110%",
                left: 0,
                backgroundColor: "#fff",
                color: "#000",
                padding: "10px",
                borderRadius: "6px",
                zIndex: 20
              }}>
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
                minWidth: "200px",
                color: "#000"
              }}>
                <div style={{ cursor: "pointer", padding: "8px 16px", borderBottom: "1px solid #eee" }}
                  onClick={() => { setTableType('students'); setShowTableDropdown(false); }}>
                  ✅ Check Status Table
                </div>
                <div style={{ cursor: "pointer", padding: "8px 16px", borderBottom: "1px solid #eee" }}
                  onClick={() => { setTableType('citizenID'); setShowTableDropdown(false); }}>
                  🆔 Citizen ID Table
                </div>
                <div style={{ cursor: "pointer", padding: "8px 16px", borderBottom: "1px solid #eee" }}
                  onClick={() => { setTableType('englishScore'); setShowTableDropdown(false); }}>
                  🔠 English Score Table
                </div>
                <div style={{ cursor: "pointer", padding: "8px 16px" }}
                  onClick={() => { setTableType('techScore'); setShowTableDropdown(false); }}>
                  💻 Tech Score Table
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Animated Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          width: "100%",
          overflowX: "auto",
          paddingBottom: "10px",
          marginTop: "1rem",
          border: "1px solid #ccc",
          borderRadius: "8px",
          backgroundColor: "#fff"
        }}
      >
        <table style={{
          width: "max-content",
          minWidth: "100%",
          borderCollapse: "collapse",
          fontSize: "14px",
          tableLayout: "fixed"
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
            <AnimatePresence>
              {paginatedData.map((row, i) => (
                <motion.tr
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  style={{
                    backgroundColor: i % 2 === 0 ? "#fff" : "#f7fafd",
                    borderBottom: "1px solid #eee",
                    color: "#000"
                  }}
                >
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
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </motion.div>

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
      </div>
    </div>
  );
};

export default StudentTable;

