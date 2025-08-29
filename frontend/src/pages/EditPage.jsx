

// 22/08/25 add status button for each stages for convinience + hover effect
// 25/08/25 add drop down button for gender and fix table from overflowing
// 26/08/25 fixing duplicate calls on minwidth
// 22/08/25 add status button for each stages for convenience + hover effect
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
        let url = "";
        switch (tableType) {
          case "checkstatus":
            url = `${domain}/students/all`;
            break;
          case "citizenid":
            url = `${domain}/citizenID/all`;
            break;
          case "englishscore":
            url = `${domain}/EnglishScore/all`;
            break;
          case "techscore":
            url = `${domain}/TechScore/all`;
            break;
          default:
            url = `${domain}/students/all`;
        }

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

      const rowsToUpload = Object.values(editedRows).map(transformRowForDB);
      const worksheet = XLSX.utils.json_to_sheet(rowsToUpload);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "EditedRows");

      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      const blob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const formData = new FormData();
      formData.append("file", blob, "editedRows.xlsx");

      let uploadUrl = "";
      let confirmUrl = "";

      switch (tableType) {
        case "checkstatus":
          uploadUrl = `${domain}/DataUpload`;
          confirmUrl = `${domain}/DataUpload/confirmUpload`;
          break;
        case "citizenid":
          uploadUrl = `${domain}/citizenID/upload`;
          confirmUrl = `${domain}/citizenID/upload/confirmUpload`;
          break;
        case "englishscore":
          uploadUrl = `${domain}/EnglishScore/upload`;
          confirmUrl = `${domain}/EnglishScore/upload/confirmUpload`;
          break;
        case "techscore":
          uploadUrl = `${domain}/TechScore/upload`;
          confirmUrl = `${domain}/TechScore/upload/confirmUpload`;
          break;
        default:
          uploadUrl = `${domain}/DataUpload`;
          confirmUrl = `${domain}/DataUpload/confirmUpload`;
      }

      await axios.post(uploadUrl, formData);
      await axios.post(confirmUrl, { confirm: true });

      toast.success("✅ All changes saved to DB!");
      setEditedRows({});

      // Refresh data
      const res = await axios.get(
        tableType === "checkstatus"
          ? `${domain}/students/all`
          : tableType === "citizenid"
          ? `${domain}/citizenID/all`
          : tableType === "englishscore"
          ? `${domain}/EnglishScore/all`
          : `${domain}/TechScore/all`
      );
      setData(res.data?.rows || res.data || []);
    } catch (error) {
      console.error("Save all failed:", error.response?.data || error.message);
      toast.error("❌ Failed to save changes.");
    }
  };

  const filteredData = data.filter((row) => {
    if (!searchTerm.trim()) return true;
    const lowerSearch = searchTerm.toLowerCase();
    return Object.values(row).some((val) =>
      String(val || "").toLowerCase().includes(lowerSearch)
    );
  });

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
        <select
          value={tableType}
          onChange={(e) => setTableType(e.target.value)}
        >
          <option value="checkstatus">Check Status</option>
          <option value="citizenid">Citizen ID</option>
          <option value="englishscore">English Score</option>
          <option value="techscore">Tech Score</option>
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
                  <th
                    key={idx}
                    style={{
                      padding: "10px",
                      minWidth: /^stage[1-8]$/i.test(key)
                        ? "90px"
                        : /^Gender$/i.test(key)
                        ? "50px"
                        : "auto",
                    }}
                  >
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
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#d7f5fcff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      i % 2 === 0 ? "#fff" : "#f9f9f9";
                  }}
                >
                  {tableColumns.map((key, j) => {
                    const isStageColumn = /^stage[1-8]$/i.test(key);
                    const isGenderColumn = /^Gender$/i.test(key);
                    const currentValue =
                      editedRows[row.StudentID]?.[key] ?? row[key] ?? "";

                    return (
                      <td
                        key={j}
                        style={{
                          padding: "8px",
                          textAlign: "center",
                          border: "1px solid #eee",
                          minWidth: isStageColumn
                            ? "90px"
                            : isGenderColumn
                            ? "50px"
                            : "auto",
                        }}
                      >
                        {isStageColumn ? (
                          editingRowId === row.StudentID ? (
                            <select
                              value={currentValue}
                              onChange={(e) =>
                                handleChange(
                                  row.StudentID,
                                  key,
                                  e.target.value || null
                                )
                              }
                              style={{ padding: "4px", width: "100%" }}
                            >
                              <option value="">(empty)</option>
                              <option value="ผ่าน">ผ่าน</option>
                              <option value="ไม่ผ่าน">ไม่ผ่าน</option>
                              <option value="ติดเงื่อนไข">ติดเงื่อนไข</option>
                              <option value="รอดำเนินการ">รอดำเนินการ</option>
                            </select>
                          ) : (
                            currentValue || "–"
                          )
                        ) : isGenderColumn ? (
                          editingRowId === row.StudentID ? (
                            <select
                              value={currentValue}
                              onChange={(e) =>
                                handleChange(
                                  row.StudentID,
                                  key,
                                  e.target.value || null
                                )
                              }
                              style={{ padding: "4px", width: "100%" }}
                            >
                              <option value="">(empty)</option>
                              <option value="ชาย">ชาย</option>
                              <option value="หญิง">หญิง</option>
                            </select>
                          ) : (
                            currentValue || "–"
                          )
                        ) : editingRowId === row.StudentID ? (
                          <input
                            value={currentValue}
                            onChange={(e) =>
                              handleChange(row.StudentID, key, e.target.value)
                            }
                            style={{ padding: "4px", width: "100%" }}
                          />
                        ) : (
                          currentValue || "–"
                        )}
                      </td>
                    );
                  })}
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

      <div style={{ marginTop: "1rem" }}>
        <button
          onClick={handleSaveAll}
          style={{
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
      </div>

      <ToastContainer />
    </div>
  );
};

export default EditPage;





// //for fun
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

//   // Transform row for upload
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

//       const rowsToUpload = Object.values(editedRows).map(transformRowForDB);
//       const worksheet = XLSX.utils.json_to_sheet(rowsToUpload);
//       const workbook = XLSX.utils.book_new();
//       XLSX.utils.book_append_sheet(workbook, worksheet, "EditedRows");

//       const excelBuffer = XLSX.write(workbook, {
//         bookType: "xlsx",
//         type: "array",
//       });

//       const blob = new Blob([excelBuffer], {
//         type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//       });

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

//       await axios.post(uploadUrl, formData);
//       await axios.post(confirmUrl, { confirm: true });

//       toast.success("✅ All changes saved to DB!");
//       setEditedRows({});

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

//       <div style={{ marginBottom: "1rem", display: "flex", gap: "1rem" }}>
//         <input
//           type="text"
//           placeholder="Search..."
//           value={searchTerm}
//           onChange={(e) => {
//             setSearchTerm(e.target.value);
//             setCurrentPage(1);
//           }}
//           style={{ padding: "6px", width: "250px" }}
//         />
//       </div>

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
//                   <th
//                     key={idx}
//                     style={{
//                       padding: "10px",
//                       minWidth: /^stage[1-8]$/i.test(key) ? "80px" : "auto",
//                     }}
//                   >
//                     {key}
//                   </th>
//                 ))}
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentRows.map((row, i) => {
//                 const rainbowColors = [
//                   "#FF0000", // Red
//                   "#FF7F00", // Orange
//                   "#FFFF00", // Yellow
//                   "#00FF00", // Green
//                   "#0000FF", // Blue
//                   "#4B0082", // Indigo
//                   "#8F00FF", // Violet
//                 ];
//                 const rowColor = rainbowColors[i % rainbowColors.length];

//                 return (
//                   <tr
//                     key={i}
//                     style={{
//                       backgroundColor: rowColor,
//                       borderBottom: "1px solid #eee",
//                       cursor: "pointer",
//                     }}
//                     onMouseEnter={(e) => {
//                       e.currentTarget.style.backgroundColor = "#d7f5fcff";
//                     }}
//                     onMouseLeave={(e) => {
//                       e.currentTarget.style.backgroundColor = rowColor;
//                     }}
//                   >
//                     {tableColumns.map((key, j) => {
//                       const isStageColumn = /^stage[1-8]$/i.test(key);
//                       const currentValue =
//                         editedRows[row.StudentID]?.[key] ?? row[key] ?? "";

//                       return (
//                         <td
//                           key={j}
//                           style={{
//                             padding: "8px",
//                             textAlign: "center",
//                             border: "1px solid #eee",
//                             minWidth: isStageColumn ? "80px" : "auto",
//                           }}
//                         >
//                           {isStageColumn ? (
//                             editingRowId === row.StudentID ? (
//                               <select
//                                 value={currentValue}
//                                 onChange={(e) =>
//                                   handleChange(
//                                     row.StudentID,
//                                     key,
//                                     e.target.value || null
//                                   )
//                                 }
//                                 style={{ padding: "4px", width: "100%" }}
//                               >
//                                 <option value="">(empty)</option>
//                                 <option value="ผ่าน">ผ่าน</option>
//                                 <option value="ไม่ผ่าน">ไม่ผ่าน</option>
//                                 <option value="ติดเงื่อนไข">ติดเงื่อนไข</option>
//                                 <option value="รอดำเนินการ">รอดำเนินการ</option>
//                               </select>
//                             ) : (
//                               currentValue || "–"
//                             )
//                           ) : editingRowId === row.StudentID ? (
//                             <input
//                               value={currentValue}
//                               onChange={(e) =>
//                                 handleChange(row.StudentID, key, e.target.value)
//                               }
//                               style={{ padding: "4px", width: "100%" }}
//                             />
//                           ) : (
//                             currentValue || "–"
//                           )}
//                         </td>
//                       );
//                     })}
//                     <td style={{ padding: "8px" }}>
//                       {editingRowId === row.StudentID ? (
//                         <button onClick={() => handleDone(row.StudentID)}>
//                           Done
//                         </button>
//                       ) : (
//                         <button onClick={() => handleEdit(row.StudentID)}>
//                           Edit
//                         </button>
//                       )}
//                     </td>
//                   </tr>
//                 );
//               })}
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

//       <div style={{ marginTop: "1rem" }}>
//         <button
//           onClick={handleSaveAll}
//           style={{
//             backgroundColor: "#28a745",
//             color: "white",
//             padding: "6px 12px",
//             border: "none",
//             borderRadius: "4px",
//             cursor: "pointer",
//           }}
//           disabled={Object.keys(editedRows).length === 0}
//         >
//           Save All
//         </button>
//       </div>

//       <ToastContainer />
//     </div>
//   );
// };

// export default EditPage;

