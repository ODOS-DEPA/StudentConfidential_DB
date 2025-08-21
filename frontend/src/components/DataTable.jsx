import React from "react";
const DataTable = ({ data, columns, title }) => {
  const hasRows = Array.isArray(data) && data.length > 0;

  return (
    <div>
      <h3 style={{ marginTop: "2rem" }}>{title}</h3>

      {!hasRows ? (
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
                    : status === "untouched"
                    ? "#f0f0f0"
                    : i % 2 === 0
                    ? "#fff"
                    : "#f9f9f9";

                const changedFieldsList = String(row._changedFields || "")
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean);

                return (
                  <tr
                    key={i}
                    style={{
                      backgroundColor: bgColor,
                      borderBottom: "1px solid #eee",
                      transition: "background 0.3s",
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
                        row._status === "updated" &&
                        changedFieldsList.includes(key);

                      const cellStyle = {
                        padding: "8px",
                        textAlign: "center",
                        backgroundColor: isChanged ? "#fff2cc" : undefined,
                        fontWeight: isChanged ? "bold" : undefined,
                        border: "1px solid #eee",
                      };

                      let value = row[key];
                      let displayVal = value;
                      const keyLower = key.toLowerCase();

                      // Handle currentStatus
                      if (keyLower === "currentstatus") {
                        if (
                          value === null ||
                          value === undefined ||
                          value === "" ||
                          String(value).toLowerCase() === "null"
                        ) {
                          displayVal = "⌛";
                        } else {
                          displayVal = String(value).trim();
                        }
                      }

                      // Handle stages
                      if (keyLower.startsWith("stage") && keyLower !== "currentstatus") {
                        if (
                          value === 1 ||
                          value === "1" ||
                          String(value).trim() === "ผ่าน"
                        ) {
                          displayVal = "✅";
                        } else if (
                          value === 0 ||
                          value === "0" ||
                          String(value).trim() === "ไม่ผ่าน"
                        ) {
                          displayVal = "❌";
                        } else if (String(value).trim() === "ติดเงื่อนไข") {
                          displayVal = "⚠️";
                        } else {
                          displayVal = "⌛";
                        }
                      }

                      return (
                        <td key={j} style={cellStyle}>
                          {key === "_status"
                            ? status === "new"
                              ? "🆕 New"
                              : status === "updated"
                              ? "✏️ Updated"
                              : "⚪ Untouched"
                            : key === "_changedFields"
                            ? Array.isArray(row[key])
                              ? row[key].join(", ")
                              : row[key] ?? "–"
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
      )}
    </div>
  );
};

export default DataTable;
