import React from "react";

const StatusFilter = ({ statusFilter, setStatusFilter }) => {
  const filters = ["all", "new", "updated", "untouched"];

  return (
    <div style={{ marginTop: "0.5rem", display: "flex", gap: "0.5rem" }}>
      {filters.map((type) => (
        <button
          key={type}
          onClick={() => setStatusFilter(type)}
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
            : "⚪ Untouched"}
        </button>
      ))}
    </div>
  );
};

export default StatusFilter;
