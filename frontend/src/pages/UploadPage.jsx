


//add duplication handling condition
//add duplication handling condition
//add duplication handling condition
//28/8/25 add new two tables engscore and techscore
// UploadPage.jsx
// UploadPage.jsx
// UploadPage.jsx
// import React, { useState } from "react";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const UploadPage = () => {
//   const [file, setFile] = useState(null);
//   const [previewData, setPreviewData] = useState([]);
//   const [uploaded, setUploaded] = useState(false);
//   const [confirming, setConfirming] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [tableType, setTableType] = useState("checkstatus");
//   const [statusFilter, setStatusFilter] = useState("all");

//   const rowsPerPage = 50;
//   const domain = import.meta.env.VITE_DOMAIN_NAME?.trim() || "http://0.0.0.0";

//   const resetState = () => {
//     setPreviewData([]);
//     setUploaded(false);
//     setCurrentPage(1);
//     setSearchTerm("");
//     setStatusFilter("all");
//   };

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//     resetState();
//   };

//   const validateFile = (file) => {
//     if (!file) return false;
//     const allowedExtensions = ["xlsx", "xlsm", "xlsb", "xltx"];
//     const ext = file.name.split(".").pop().toLowerCase();
//     return allowedExtensions.includes(ext);
//   };

//   const normalizeGeneral = (val) => {
//     if (val === null || val === undefined) return null;
//     if (typeof val === "string") {
//       const t = val.trim();
//       if (t === "" || t.toUpperCase() === "NULL") return null;
//       return t;
//     }
//     return String(val).trim();
//   };

//   const handleUpload = async () => {
//     if (!file) return toast.error("❌ Please select a file first.");
//     if (!validateFile(file)) return toast.error("❌ Only Excel files are allowed.");

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       let uploadUrl = "";
//       let dbUrl = "";
//       let idKey = "StudentID";

//       switch (tableType) {
//         case "checkstatus":
//           uploadUrl = `${domain}/DataUpload`;
//           dbUrl = `${domain}/students/all`;
//           break;
//         case "citizenid":
//           uploadUrl = `${domain}/citizenID/upload`;
//           dbUrl = `${domain}/citizenID/all`;
//           break;
//         case "englishscore":
//           uploadUrl = `${domain}/EnglishScore/upload`;
//           dbUrl = `${domain}/EnglishScore/all`;
//           break;
//         case "techscore":
//           uploadUrl = `${domain}/TechScore/upload`;
//           dbUrl = `${domain}/TechScore/all`;
//           break;
//         default:
//           uploadUrl = `${domain}/DataUpload`;
//           dbUrl = `${domain}/students/all`;
//       }

//       const res = await axios.post(uploadUrl, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       const uploadRows = res.data.rows || [];

//       const dbRes = await axios.get(dbUrl);
//       const dbRows = dbRes.data?.rows || dbRes.data || [];
//       const dbMap = new Map(dbRows.map((r) => [r[idKey], r]));
//       const dbColumns = dbRows.length > 0 ? Object.keys(dbRows[0]) : [];

//       // Preview with status
//       const previewWithStatus = dbRows.map((dbRow) => {
//         const uploadRow = uploadRows.find((r) => r[idKey] === dbRow[idKey]);
//         const mergedRow = {};
//         dbColumns.forEach((col) => {
//           mergedRow[col] = uploadRow?.hasOwnProperty(col) ? uploadRow[col] : dbRow[col];
//         });

//         let _status = "";
//         let _changedFields = "";
//         if (uploadRow) {
//           // Only compare columns that exist in the uploaded row
//           const comparableCols = dbColumns.filter(
//             (col) => col !== idKey && uploadRow.hasOwnProperty(col)
//           );
//           const changedFields = comparableCols.filter((col) => {
//             const dbVal = normalizeGeneral(dbRow[col]);
//             const upVal = normalizeGeneral(uploadRow[col]);
//             return dbVal !== upVal;
//           });
//           _status = changedFields.length > 0 ? "updated" : "untouched";
//           _changedFields = changedFields.join(", ");
//         }
//         return { ...mergedRow, _status, _changedFields };
//       });

//       // New rows not in DB
//       const newRows = uploadRows
//         .filter((r) => !dbMap.has(r[idKey]))
//         .map((r) => {
//           const row = {};
//           dbColumns.forEach((col) => (row[col] = r[col] ?? null));

//           const email = normalizeGeneral(r.Email);
//           const phone = normalizeGeneral(r.PhoneNumber);
//           const duplicate =
//             email && phone
//               ? dbRows.some(
//                   (db) =>
//                     normalizeGeneral(db.Email) === email &&
//                     normalizeGeneral(db.PhoneNumber) === phone
//                 )
//               : false;

//           return {
//             ...row,
//             _status: duplicate ? "duplication" : "new",
//             _changedFields: "",
//           };
//         });

//       setPreviewData([...previewWithStatus, ...newRows]);
//       setUploaded(true);
//       toast.success("✅ File previewed successfully!", {
//         position: "top-center",
//         autoClose: 2000,
//         theme: "colored",
//       });
//     } catch (error) {
//       console.error("Upload failed:", error.response?.data || error.message);
//       toast.error("❌ Failed to preview the file.", {
//         position: "top-center",
//         autoClose: 3000,
//         theme: "colored",
//       });
//     }
//   };

//   const handleConfirm = async () => {
//     setConfirming(true);
//     try {
//       let confirmUrl = "";
//       switch (tableType) {
//         case "checkstatus":
//           confirmUrl = `${domain}/DataUpload/confirmUpload`;
//           break;
//         case "citizenid":
//           confirmUrl = `${domain}/citizenID/upload/confirmUpload`;
//           break;
//         case "englishscore":
//           confirmUrl = `${domain}/EnglishScore/upload/confirmUpload`;
//           break;
//         case "techscore":
//           confirmUrl = `${domain}/TechScore/upload/confirmUpload`;
//           break;
//         default:
//           confirmUrl = `${domain}/DataUpload/confirmUpload`;
//       }

//       await axios.post(confirmUrl, { confirm: true });
//       toast.success("✅ Data successfully inserted/updated!", {
//         position: "top-center",
//         autoClose: 3000,
//         theme: "colored",
//       });
//       setFile(null);
//       resetState();
//     } catch (error) {
//       console.error("Confirm failed:", error);
//       toast.error("❌ Failed to confirm upload.", {
//         position: "top-center",
//         autoClose: 3000,
//         theme: "colored",
//       });
//     } finally {
//       setConfirming(false);
//     }
//   };

//   // Table render & filtering
//   const renderTable = (data, title, columns) => {
//     if (!Array.isArray(data) || data.length === 0) {
//       return (
//         <>
//           <h3 style={{ marginTop: "2rem" }}>{title}</h3>
//           <div
//             style={{
//               padding: "1rem",
//               border: "1px solid #eee",
//               borderRadius: "8px",
//               background: "#fafafa",
//               color: "#666",
//             }}
//           >
//             No rows match this filter.
//           </div>
//         </>
//       );
//     }

//     return (
//       <>
//         <h3 style={{ marginTop: "2rem" }}>{title}</h3>
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
//                 {columns.map((key, idx) => (
//                   <th key={idx} style={{ padding: "10px" }}>
//                     {key}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {data.map((row, i) => {
//                 const status = row._status;
//                 const bgColor =
//                   status === "new"
//                     ? "#e6ffe6"
//                     : status === "updated"
//                     ? "#fffbe6"
//                     : status === "duplication"
//                     ? "#ff4d4f"
//                     : "#f0f0f0";
//                 const changedFieldsList = String(row._changedFields || "")
//                   .split(",")
//                   .map((s) => s.trim().toLowerCase())
//                   .filter(Boolean);

//                 return (
//                   <tr
//                     key={i}
//                     style={{
//                       backgroundColor: bgColor,
//                       borderBottom: "1px solid #eee",
//                     }}
//                     onMouseEnter={(e) =>
//                       (e.currentTarget.style.backgroundColor = "#e6f7ff")
//                     }
//                     onMouseLeave={(e) =>
//                       (e.currentTarget.style.backgroundColor = bgColor)
//                     }
//                   >
//                     {columns.map((key, j) => {
//                       const isChanged =
//                         status === "updated" &&
//                         changedFieldsList.includes(key.toLowerCase());
//                       const isDuplication =
//                         status === "duplication" && key === "_changedFields";
//                       let value = row[key];
//                       let displayVal = value;

//                       const cellStyle = {
//                         padding: "8px",
//                         textAlign: "center",
//                         backgroundColor: isChanged
//                           ? "#fff2cc"
//                           : isDuplication
//                           ? "#ff4d4f"
//                           : undefined,
//                         color: isDuplication ? "#fff" : undefined,
//                         fontWeight: isChanged || isDuplication ? "bold" : undefined,
//                         border: "1px solid #eee",
//                       };

//                       return (
//                         <td key={j} style={cellStyle}>
//                           {key === "_status"
//                             ? status === "new"
//                               ? "🆕 New"
//                               : status === "updated"
//                               ? "✏️ Updated"
//                               : status === "duplication"
//                               ? "❌ Duplication"
//                               : status === "untouched"
//                               ? "⚪ Untouched"
//                               : ""
//                             : key === "_changedFields"
//                             ? row[key] ?? "–"
//                             : displayVal ?? "–"}
//                         </td>
//                       );
//                     })}
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//       </>
//     );
//   };

//   // Filtered & paginated data
//   const filteredData = previewData.filter((row) => {
//     if (searchTerm.trim()) {
//       const lowerSearch = searchTerm.toLowerCase();
//       const matchesSearch = Object.values(row).some((val) => {
//         if (val == null) return false;
//         const strVal = String(val).toLowerCase().trim();
//         return strVal.includes(lowerSearch);
//       });
//       if (!matchesSearch) return false;
//     }
//     if (statusFilter !== "all" && row._status !== statusFilter) return false;
//     return true;
//   });

//   const tableColumns =
//     previewData.length > 0
//       ? Array.from(new Set(previewData.flatMap((r) => Object.keys(r))))
//       : [];
//   const totalPages = Math.max(1, Math.ceil(filteredData.length / rowsPerPage));
//   const currentPageSafe = Math.min(currentPage, totalPages);
//   const indexOfLastRow = currentPageSafe * rowsPerPage;
//   const indexOfFirstRow = indexOfLastRow - rowsPerPage;
//   const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         backgroundColor: "#001f3f",
//         padding: "2rem",
//         color: "#fff",
//       }}
//     >
//       <h2>Upload CSV / Excel</h2>

//       <div style={{ marginBottom: "1rem" }}>
//         <label>Table: </label>
//         <select value={tableType} onChange={(e) => setTableType(e.target.value)}>
//           <option value="checkstatus">Check Status</option>
//           <option value="citizenid">Citizen ID</option>
//           <option value="englishscore">English Score</option>
//           <option value="techscore">Tech Score</option>
//         </select>
//       </div>

//       <input
//         type="file"
//         accept=".csv,.xlsx,.xlsm,.xlsb,.xltx"
//         onChange={handleFileChange}
//       />
//       <button onClick={handleUpload} style={{ marginLeft: "10px" }}>
//         Preview
//       </button>

//       {uploaded && previewData.length > 0 && (
//         <>
//           <div style={{ marginTop: "1rem" }}>
//             <input
//               type="text"
//               placeholder="Search..."
//               value={searchTerm}
//               onChange={(e) => {
//                 setSearchTerm(e.target.value);
//                 setCurrentPage(1);
//               }}
//               style={{ padding: "6px", width: "250px" }}
//             />
//           </div>

//           {/* Status Filter Buttons */}
//           <div style={{ marginTop: "0.5rem", display: "flex", gap: "0.5rem" }}>
//             {["all", "new", "updated", "duplication", "untouched"].map((type) => (
//               <button
//                 key={type}
//                 onClick={() => {
//                   setStatusFilter(type);
//                   setCurrentPage(1);
//                 }}
//                 style={{
//                   padding: "6px 12px",
//                   borderRadius: "6px",
//                   border: "1px solid #ccc",
//                   cursor: "pointer",
//                   background: statusFilter === type ? "#1890ff" : "#f0f0f0",
//                   color: statusFilter === type ? "#fff" : "#000",
//                   fontWeight: statusFilter === type ? "bold" : "normal",
//                 }}
//               >
//                 {type === "all"
//                   ? "📋 All"
//                   : type === "new"
//                   ? "🆕 New"
//                   : type === "updated"
//                   ? "✏️ Updated"
//                   : type === "duplication"
//                   ? "❌ Duplication"
//                   : "⚪ Untouched"}
//               </button>
//             ))}
//           </div>

//           {renderTable(
//             currentRows,
//             `📄 Uploaded File Preview (Page ${currentPageSafe} of ${totalPages})`,
//             tableColumns
//           )}

//           <div
//             style={{
//               marginTop: "1rem",
//               display: "flex",
//               gap: "0.5rem",
//               alignItems: "center",
//             }}
//           >
//             <button
//               onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
//               disabled={currentPageSafe === 1}
//             >
//               Previous
//             </button>
//             <span>
//               Page {currentPageSafe} / {totalPages}
//             </span>
//             <button
//               onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
//               disabled={currentPageSafe === totalPages}
//             >
//               Next
//             </button>
//           </div>

//           <button
//             onClick={handleConfirm}
//             disabled={confirming}
//             style={{ marginTop: "1rem" }}
//           >
//             {confirming ? "Confirming..." : "Confirm Upload"}
//           </button>
//         </>
//       )}

//       <ToastContainer />
//     </div>
//   );
// };

// export default UploadPage;





// UploadPage.jsx
import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [previewData, setPreviewData] = useState([]);
  const [uploaded, setUploaded] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [tableType, setTableType] = useState("checkstatus");
  const [statusFilter, setStatusFilter] = useState("all");

  const rowsPerPage = 50;
  const domain = import.meta.env.VITE_DOMAIN_NAME?.trim() || "http://0.0.0.0";

  const resetState = () => {
    setPreviewData([]);
    setUploaded(false);
    setCurrentPage(1);
    setSearchTerm("");
    setStatusFilter("all");
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    resetState();
  };

  const validateFile = (file) => {
    if (!file) return false;
    const allowedExtensions = ["xlsx", "xlsm", "xlsb", "xltx"];
    const ext = file.name.split(".").pop().toLowerCase();
    return allowedExtensions.includes(ext);
  };

  const normalizeGeneral = (val) => {
    if (val === null || val === undefined) return null;
    if (typeof val === "string") {
      const t = val.trim();
      if (t === "" || t.toUpperCase() === "NULL") return null;
      return t;
    }
    return String(val).trim();
  };

  const handleUpload = async () => {
    if (!file) return toast.error("❌ Please select a file first.");
    if (!validateFile(file)) return toast.error("❌ Only Excel files are allowed.");

    const formData = new FormData();
    formData.append("file", file);

    try {
      let uploadUrl = "";
      let dbUrl = "";
      let idKey = "StudentID";

      switch (tableType) {
        case "checkstatus":
          uploadUrl = `${domain}/DataUpload`;
          dbUrl = `${domain}/students/all`;
          break;
        case "citizenid":
          uploadUrl = `${domain}/citizenID/upload`;
          dbUrl = `${domain}/citizenID/all`;
          break;
        case "englishscore":
          uploadUrl = `${domain}/EnglishScore/upload`;
          dbUrl = `${domain}/EnglishScore/all`;
          break;
        case "techscore":
          uploadUrl = `${domain}/TechScore/upload`;
          dbUrl = `${domain}/TechScore/all`;
          break;
        default:
          uploadUrl = `${domain}/DataUpload`;
          dbUrl = `${domain}/students/all`;
      }

      const res = await axios.post(uploadUrl, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const uploadRows = res.data.rows || [];

      const dbRes = await axios.get(dbUrl);
      const dbRows = dbRes.data?.rows || dbRes.data || [];
      const dbMap = new Map(dbRows.map((r) => [r[idKey], r]));
      const dbColumns = dbRows.length > 0 ? Object.keys(dbRows[0]) : [];

      // Preview with status
      const previewWithStatus = dbRows.map((dbRow) => {
        const uploadRow = uploadRows.find((r) => r[idKey] === dbRow[idKey]);
        const mergedRow = {};
        dbColumns.forEach((col) => {
          mergedRow[col] = uploadRow?.hasOwnProperty(col) ? uploadRow[col] : dbRow[col];
        });

        let _status = "";
        let _changedFields = "";

        if (uploadRow) {
          // Check duplication first
          const email = normalizeGeneral(uploadRow.Email);
          const phone = normalizeGeneral(uploadRow.Phone_number);
          const duplicate = dbRows.some(
            (db) =>
              db[idKey] !== uploadRow[idKey] &&
              (normalizeGeneral(db.Email) === email || normalizeGeneral(db.Phone_number) === phone)
          );

          if (duplicate) {
            _status = "duplication";
          } else {
            // Only compare columns that exist in the uploaded row
            const comparableCols = dbColumns.filter(
              (col) => col !== idKey && uploadRow.hasOwnProperty(col)
            );
            const changedFields = comparableCols.filter((col) => {
              const dbVal = normalizeGeneral(dbRow[col]);
              const upVal = normalizeGeneral(uploadRow[col]);
              return dbVal !== upVal;
            });
            _status = changedFields.length > 0 ? "updated" : "untouched";
            _changedFields = changedFields.join(", ");
          }
        }

        return { ...mergedRow, _status, _changedFields };
      });

      // New rows not in DB
      const newRows = uploadRows
        .filter((r) => !dbMap.has(r[idKey]))
        .map((r) => {
          const row = {};
          dbColumns.forEach((col) => (row[col] = r[col] ?? null));

          const email = normalizeGeneral(r.Email);
          const phone = normalizeGeneral(r.Phone_number);
          const duplicate = dbRows.some(
            (db) =>
              normalizeGeneral(db.Email) === email || normalizeGeneral(db.Phone_number) === phone
          );

          return {
            ...row,
            _status: duplicate ? "duplication" : "new",
            _changedFields: "",
          };
        });

      // Combine DB rows + new upload rows
      setPreviewData([...previewWithStatus, ...newRows]);
      setUploaded(true);
      toast.success("✅ File previewed successfully!", {
        position: "top-center",
        autoClose: 2000,
        theme: "colored",
      });
    } catch (error) {
      console.error("Upload failed:", error.response?.data || error.message);
      toast.error("❌ Failed to preview the file.", {
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  const handleConfirm = async () => {
    setConfirming(true);
    try {
      let confirmUrl = "";
      switch (tableType) {
        case "checkstatus":
          confirmUrl = `${domain}/DataUpload/confirmUpload`;
          break;
        case "citizenid":
          confirmUrl = `${domain}/citizenID/upload/confirmUpload`;
          break;
        case "englishscore":
          confirmUrl = `${domain}/EnglishScore/upload/confirmUpload`;
          break;
        case "techscore":
          confirmUrl = `${domain}/TechScore/upload/confirmUpload`;
          break;
        default:
          confirmUrl = `${domain}/DataUpload/confirmUpload`;
      }

      await axios.post(confirmUrl, { confirm: true });
      toast.success("✅ Data successfully inserted/updated!", {
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
      });
      setFile(null);
      resetState();
    } catch (error) {
      console.error("Confirm failed:", error);
      toast.error("❌ Failed to confirm upload.", {
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
      });
    } finally {
      setConfirming(false);
    }
  };

  // Table render & filtering
  const renderTable = (data, title, columns) => {
    if (!Array.isArray(data) || data.length === 0) {
      return (
        <>
          <h3 style={{ marginTop: "2rem" }}>{title}</h3>
          <div
            style={{
              padding: "1rem",
              border: "1px solid #eee",
              borderRadius: "8px",
              background: "#fafafa",
              color: "#666",
            }}
          >
            No rows match this filter.
          </div>
        </>
      );
    }

    return (
      <>
        <h3 style={{ marginTop: "2rem" }}>{title}</h3>
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
                {columns.map((key, idx) => (
                  <th key={idx} style={{ padding: "10px" }}>
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => {
                const status = row._status;
                const bgColor =
                  status === "new"
                    ? "#e6ffe6"
                    : status === "updated"
                    ? "#fffbe6"
                    : status === "duplication"
                    ? "#ff4d4f"
                    : "#f0f0f0";
                const changedFieldsList = String(row._changedFields || "")
                  .split(",")
                  .map((s) => s.trim().toLowerCase())
                  .filter(Boolean);

                return (
                  <tr
                    key={i}
                    style={{
                      backgroundColor: bgColor,
                      borderBottom: "1px solid #eee",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#e6f7ff")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = bgColor)
                    }
                  >
                    {columns.map((key, j) => {
                      const isChanged =
                        status === "updated" &&
                        changedFieldsList.includes(key.toLowerCase());
                      const isDuplication =
                        status === "duplication" && key === "_changedFields";
                      let value = row[key];
                      let displayVal = value;

                      const cellStyle = {
                        padding: "8px",
                        textAlign: "center",
                        backgroundColor: isChanged
                          ? "#fff2cc"
                          : isDuplication
                          ? "#ff4d4f"
                          : undefined,
                        color: isDuplication ? "#fff" : undefined,
                        fontWeight: isChanged || isDuplication ? "bold" : undefined,
                        border: "1px solid #eee",
                      };

                      return (
                        <td key={j} style={cellStyle}>
                          {key === "_status"
                            ? status === "new"
                              ? "🆕 New"
                              : status === "updated"
                              ? "✏️ Updated"
                              : status === "duplication"
                              ? "❌ Duplication"
                              : status === "untouched"
                              ? "⚪ Untouched"
                              : ""
                            : key === "_changedFields"
                            ? row[key] ?? "–"
                            : displayVal ?? "–"}
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
  };

  // Filtered & paginated data
  const filteredData = previewData.filter((row) => {
    if (searchTerm.trim()) {
      const lowerSearch = searchTerm.toLowerCase();
      const matchesSearch = Object.values(row).some((val) => {
        if (val == null) return false;
        const strVal = String(val).toLowerCase().trim();
        return strVal.includes(lowerSearch);
      });
      if (!matchesSearch) return false;
    }
    if (statusFilter !== "all" && row._status !== statusFilter) return false;
    return true;
  });

  const tableColumns =
    previewData.length > 0
      ? Array.from(new Set(previewData.flatMap((r) => Object.keys(r))))
      : [];
  const totalPages = Math.max(1, Math.ceil(filteredData.length / rowsPerPage));
  const currentPageSafe = Math.min(currentPage, totalPages);
  const indexOfLastRow = currentPageSafe * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#001f3f",
        padding: "2rem",
        color: "#fff",
      }}
    >
      <h2>Upload CSV / Excel</h2>

      <div style={{ marginBottom: "1rem" }}>
        <label>Table: </label>
        <select value={tableType} onChange={(e) => setTableType(e.target.value)}>
          <option value="checkstatus">Check Status</option>
          <option value="citizenid">Citizen ID</option>
          <option value="englishscore">English Score</option>
          <option value="techscore">Tech Score</option>
        </select>
      </div>

      <input
        type="file"
        accept=".csv,.xlsx,.xlsm,.xlsb,.xltx"
        onChange={handleFileChange}
      />
      <button onClick={handleUpload} style={{ marginLeft: "10px" }}>
        Preview
      </button>

      {uploaded && previewData.length > 0 && (
        <>
          <div style={{ marginTop: "1rem" }}>
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
          </div>

          {/* Status Filter Buttons */}
          <div style={{ marginTop: "0.5rem", display: "flex", gap: "0.5rem" }}>
            {["all", "new", "updated", "duplication", "untouched"].map((type) => (
              <button
                key={type}
                onClick={() => {
                  setStatusFilter(type);
                  setCurrentPage(1);
                }}
                style={{
                  padding: "6px 12px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                  cursor: "pointer",
                  background: statusFilter === type ? "#1890ff" : "#f0f0f0",
                  color: statusFilter === type ? "#fff" : "#000",
                  fontWeight: statusFilter === type ? "bold" : "normal",
                }}
              >
                {type === "all"
                  ? "📋 All"
                  : type === "new"
                  ? "🆕 New"
                  : type === "updated"
                  ? "✏️ Updated"
                  : type === "duplication"
                  ? "❌ Duplication"
                  : "⚪ Untouched"}
              </button>
            ))}
          </div>

          {renderTable(
            currentRows,
            `📄 Uploaded File Preview (Page ${currentPageSafe} of ${totalPages})`,
            tableColumns
          )}

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
            onClick={handleConfirm}
            disabled={confirming}
            style={{ marginTop: "1rem" }}
          >
            {confirming ? "Confirming..." : "Confirm Upload"}
          </button>
        </>
      )}

      <ToastContainer />
    </div>
  );
};

export default UploadPage;


