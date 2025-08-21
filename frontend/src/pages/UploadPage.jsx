// 21/8/25 moving some components to their own files
import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Imported components
import DataTable from "../components/DataTable";
import Pagination from "../components/Pagination";
import StatusFilter from "../components/StatusFilter";

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
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    resetState();
  };

  const validateFile = (file) => {
    if (!file) return false;
    const allowedExtensions = ["xlsx", "xlsm", "xlsb", "xltx"];
    const ext = file.name.split(".").pop().toLowerCase();
    return allowedExtensions.includes(ext);
  };

  const handleUpload = async () => {
    if (!file) return toast.error("❌ Please select a file first.");
    if (!validateFile(file)) return toast.error("❌ Only Excel files are allowed.");

    const formData = new FormData();
    formData.append("file", file);

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

      const res = await axios.post(uploadUrl, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const uploadRows = res.data.rows || [];

      const dbRes = await axios.get(dbUrl);
      const dbRows = dbRes.data?.rows || dbRes.data || [];
      const dbMap = new Map(dbRows.map((r) => [r[idKey], r]));

      const dbColumns = dbRows.length > 0 ? Object.keys(dbRows[0]) : [];

      // Merge DB + Upload for preview
      const previewWithStatus = dbRows.map((dbRow) => {
        const uploadRow = uploadRows.find((r) => r[idKey] === dbRow[idKey]);
        const mergedRow = {};

        dbColumns.forEach((col) => {
          mergedRow[col] =
            uploadRow && uploadRow[col] !== undefined ? uploadRow[col] : dbRow[col];
        });

        const comparableCols = dbColumns.filter((col) => col !== idKey);
        const changedFields = comparableCols.filter((col) => {
          let dbVal = dbRow[col];
          let uploadVal = mergedRow[col];

          // Normalize stage columns
          if (col.toLowerCase().startsWith("stage")) {
            const normDb =
              dbVal === 1 ||
              dbVal === "1" ||
              dbVal === true ||
              String(dbVal).toUpperCase() === "TRUE";
            const normUp =
              uploadVal === 1 ||
              uploadVal === "1" ||
              uploadVal === true ||
              String(uploadVal).toUpperCase() === "TRUE";
            return normDb !== normUp;
          }

          // Normalize status column
          if (col.toLowerCase() === "status") {
            const normDb = ["PASS", "FAIL"].includes(String(dbVal).toUpperCase())
              ? String(dbVal).toUpperCase()
              : null;
            const normUp = ["PASS", "FAIL"].includes(String(uploadVal).toUpperCase())
              ? String(uploadVal).toUpperCase()
              : null;
            return normDb !== normUp;
          }

          // Normalize other null/empty/"NULL"
          const normDb =
            dbVal === null ||
            dbVal === undefined ||
            dbVal === "" ||
            String(dbVal).toUpperCase() === "NULL"
              ? null
              : dbVal;
          const normUp =
            uploadVal === null ||
            uploadVal === undefined ||
            uploadVal === "" ||
            String(uploadVal).toUpperCase() === "NULL"
              ? null
              : uploadVal;

          return normDb != normUp;
        });

        return {
          ...mergedRow,
          _status: changedFields.length > 0 ? "updated" : "untouched",
          _changedFields: changedFields.join(", "),
        };
      });

      // Add new rows from upload
      const newRows = uploadRows
        .filter((r) => !dbMap.has(r[idKey]))
        .map((r) => {
          const row = {};
          dbColumns.forEach((col) => (row[col] = r[col] ?? null));
          return { ...row, _status: "new", _changedFields: "" };
        });

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
      const confirmUrl =
        tableType === "checkstatus"
          ? `${domain}/DataUpload/confirmUpload`
          : `${domain}/citizenID/upload/confirmUpload`;

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

  // Filtering
  const filteredData = previewData.filter((row) => {
    if (searchTerm.trim()) {
      const lowerSearch = searchTerm.toLowerCase();
      const matchesSearch = Object.values(row).some((val) => {
        if (val == null) return false;
        const strVal = String(val).toLowerCase().trim();
        if (
          (lowerSearch === "male" || lowerSearch === "female") &&
          strVal === lowerSearch
        )
          return true;
        return strVal.includes(lowerSearch);
      });
      if (!matchesSearch) return false;
    }

    if (statusFilter !== "all" && row._status !== statusFilter) return false;
    return true;
  });

  const tableColumns = previewData.length > 0 ? Object.keys(previewData[0]) : [];

  // Pagination
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

            <StatusFilter
              statusFilter={statusFilter}
              setStatusFilter={(val) => {
                setStatusFilter(val);
                setCurrentPage(1);
              }}
            />
          </div>

          <DataTable
            data={currentRows}
            columns={tableColumns}
            title={`📄 Uploaded File Preview (Page ${currentPageSafe} of ${totalPages})`}
          />

          <Pagination
            currentPage={currentPageSafe}
            totalPages={totalPages}
            onPageChange={(p) =>
              setCurrentPage(Math.max(1, Math.min(totalPages, p)))
            }
          />

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
