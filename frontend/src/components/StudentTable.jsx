// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import SearchBar from './SearchBar';



// const StudentTable = () => {
//   const [students, setStudents] = useState([]);
//   const [filteredStudents, setFilteredStudents] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [loading, setLoading] = useState(true);

//   // Fetch student data
//   useEffect(() => {
//     axios.get(`${import.meta.env.VITE_DOMAIN_NAME || "http://0.0.0.0"}/students/all`)
//       .then(res => {
//         const data = res.data || [];
//         setStudents(data);
//         setFilteredStudents(data);
//       })
//       .catch(err => {
//         console.error('Failed to fetch students:', err);
//         setStudents([]);
//         setFilteredStudents([]);
//       })
//       .finally(() => setLoading(false));
//   }, []);

//   // Search filtering
//   useEffect(() => {
//     const term = searchTerm.toLowerCase().trim();
//     const filtered = students.filter(student =>
//       Object.values(student).some(value =>
//         String(value).toLowerCase().includes(term)
//       )
//     );
//     setFilteredStudents(filtered);
//   }, [searchTerm, students]);

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   // Style definitions
//   const tableStyle = {
//     width: "100%",
//     borderCollapse: "collapse",
//     marginTop: "1rem",
//     fontSize: "14px"
//   };

//   const headerStyle = {
//     backgroundColor: "#e3f2fd",
//     textAlign: "left",
//     padding: "12px",
//     borderBottom: "2px solid #ccc",
//     fontWeight: "600",
//     color: "#333"
//   };

//   const rowStyle = {
//     backgroundColor: "#fff",
//     borderBottom: "1px solid #eee"
//   };

//   const altRowStyle = {
//     ...rowStyle,
//     backgroundColor: "#f7fafd"
//   };

//   const cellStyle = {
//     padding: "10px",
//     color: "#444"
//   };
//   //was using if statement, but for better readability I switched to using switch case instead.
//   // Columns that need interpretation
//   const shouldTransform = (key) => {
//     const norm = key.trim().toLowerCase();
//     return norm.startsWith("stage") || norm === "status";
//   };

//   const formatValue = (value) => {
//     switch (value) {
//       case 1: return "Pass";
//       case 0: return "Fail";
//       case null:
//       case undefined: return "–";
//       default: return value;
//     }
//   };

//   if (loading) return <p>Loading student data...</p>;
//   if (students.length === 0) return <p>No student records found.</p>;

//   return (
//     <>
//       <SearchBar value={searchTerm} onChange={handleSearchChange} />
//       <table style={tableStyle}>
//         <thead>
//           <tr>
//             {Object.keys(students[0]).map((key, i) => (
//               <th key={i} style={headerStyle}>{key}</th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {filteredStudents.map((student, i) => (
//             <tr key={i} style={i % 2 === 0 ? rowStyle : altRowStyle}>
//               {Object.entries(student).map(([key, value], j) => {
//                 const displayValue = shouldTransform(key) ? formatValue(value) : (value ?? "–");
//                 return (
//                   <td key={j} style={cellStyle}>{displayValue}</td>
//                 );
//               })}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </>
//   );
// };

// export default StudentTable;



//pagination implemetation
//8/8/2025 description and updates: preparing for deployment, modifying project to be compatible with the new .env and vite.config settings
//Fixed how NULL values are displayed both in text and value with pagination for user convenience. 
//next step: accepting excel file rather than just .csv files for data upload in upload page.
// This code is a React component that displays a table of students with search functionality and pagination.
// It fetches student data from an API, allows searching through the data, and implements pagination for better user experience.
// The component also includes a dropdown to toggle the visibility of table columns, enhancing the user interface and usability.
// The code is structured to handle loading states, search filtering, and dynamic rendering of table rows and columns based on user preferences.
// pagination implementation
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [visibleColumns, setVisibleColumns] = useState([]);
  const [showColumnDropdown, setShowColumnDropdown] = useState(false);

  const rowHeight = 42;
  const tablePadding = 60;

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_DOMAIN_NAME || "http://0.0.0.0"}/students/all`)
      .then(res => {
        const data = res.data || [];
        setStudents(data);
        setFilteredStudents(data);
        setVisibleColumns(Object.keys(data[0] || {}));
      })
      .catch(err => {
        console.error('Failed to fetch students:', err);
        setStudents([]);
        setFilteredStudents([]);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const term = searchTerm.toLowerCase().trim();
    const filtered = students.filter(student =>
      Object.entries(student).some(([key, value]) => {
        const val = String(value ?? '').toLowerCase();
        if (key.toLowerCase() === 'gender') {
          return val === term;
        }
        return val.includes(term);
      })
    );
    setFilteredStudents(filtered);
    setCurrentPage(1);
  }, [searchTerm, students]);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleToggleColumn = (key) => {
    setVisibleColumns(prev =>
      prev.includes(key)
        ? prev.filter(col => col !== key)
        : [...prev, key]
    );
  };

  const handleShowAllColumns = () => {
    if (students.length > 0) {
      setVisibleColumns(Object.keys(students[0]));
    }
  };

  const totalPages = Math.ceil(filteredStudents.length / rowsPerPage);
  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const handleNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));

  const shouldTransform = (key) => {
    const norm = key.trim().toLowerCase();
    return norm.startsWith("stage") || norm === "status";
  };

  const formatValue = (value) => {
    if (
      value === null ||
      value === undefined ||
      (typeof value === "string" && value.trim().toLowerCase() === "null")
    ) {
      return "–";
    }
    switch (value) {
      case 1: return "Pass";
      case 0: return "Fail";
      default: return value;
    }
  };

  const displayValue = (value) => {
    if (
      value === null ||
      value === undefined ||
      (typeof value === "string" && value.trim().toLowerCase() === "null")
    ) {
      return "–";
    }
    return value;
  };

  if (loading) return <p>Loading student data...</p>;
  if (students.length === 0) return <p>No student records found.</p>;

  const allColumns = Object.keys(students[0]);

  return (
    <>
      <SearchBar value={searchTerm} onChange={handleSearchChange} />

      <div style={{ marginTop: "1rem", display: "flex", alignItems: "center", gap: "2rem" }}>
        <label>
          Rows per page:&nbsp;
          <select value={rowsPerPage} onChange={handleRowsPerPageChange}>
            {[5, 10, 20, 50].map(n => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </label>

        <div style={{ position: "relative" }}>
          <button
            onClick={() => setShowColumnDropdown(!showColumnDropdown)}
            style={{
              padding: "6px 10px",
              backgroundColor: "#e3f2fd",
              border: "1px solid #90caf9",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "500"
            }}
          >
            ⚙️ Columns
          </button>

          {showColumnDropdown && (
            <div style={{
              position: "absolute",
              top: "110%",
              left: 0,
              backgroundColor: "#fff",
              border: "1px solid #ccc",
              boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
              borderRadius: "6px",
              padding: "10px",
              zIndex: 10,
              maxHeight: "300px",
              overflowY: "auto",
              whiteSpace: "nowrap",
              minWidth: "200px"
            }}>
              {allColumns.map((key, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", marginBottom: "6px" }}>
                  <input
                    type="checkbox"
                    checked={visibleColumns.includes(key)}
                    onChange={() => handleToggleColumn(key)}
                    id={`col-${key}`}
                    style={{ marginRight: "6px" }}
                  />
                  <label htmlFor={`col-${key}`}>{key}</label>
                </div>
              ))}
              <hr />
              <button onClick={handleShowAllColumns} style={{
                padding: "4px 8px",
                backgroundColor: "#f0f0f0",
                border: "1px solid #ccc",
                borderRadius: "4px",
                cursor: "pointer",
                marginTop: "6px"
              }}>
                Show All
              </button>
            </div>
          )}
        </div>
      </div>

      <div style={{ minHeight: `${rowsPerPage * rowHeight + tablePadding}px`, transition: "min-height 0.2s ease" }}>
        <table style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "1rem",
          fontSize: "14px"
        }}>
          <thead>
            <tr>
              {allColumns.map((key, i) =>
                visibleColumns.includes(key) ? (
                  <th key={i} style={{
                    backgroundColor: "#e3f2fd",
                    textAlign: "left",
                    padding: "12px",
                    borderBottom: "2px solid #ccc",
                    fontWeight: "600",
                    color: "#333"
                  }}>{key}</th>
                ) : null
              )}
            </tr>
          </thead>
          <tbody>
            {paginatedStudents.map((student, i) => (
              <tr key={i} style={{
                backgroundColor: i % 2 === 0 ? "#fff" : "#f7fafd",
                borderBottom: "1px solid #eee"
              }}>
                {allColumns.map((key, j) =>
                  visibleColumns.includes(key) ? (
                    <td key={j} style={{ padding: "10px", color: "#444" }}>
                      {shouldTransform(key)
                        ? formatValue(student[key])
                        : displayValue(student[key])}
                    </td>
                  ) : null
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: "1rem", display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem" }}>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>← Prev</button>
        <div style={{ display: "flex", gap: "0.5rem" }}>
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
        </div>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next →</button>
      </div>
    </>
  );
};

export default StudentTable;




