import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://47.129.238.41/students/all')
      .then(res => {
        setStudents(res.data || []);
      })
      .catch(err => {
        console.error('Failed to fetch students:', err);
        setStudents([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "1rem",
    fontSize: "14px"
  };

  const headerStyle = {
    backgroundColor: "#e3f2fd",
    textAlign: "left",
    padding: "12px",
    borderBottom: "2px solid #ccc",
    fontWeight: "600",
    color: "#333"
  };

  const rowStyle = {
    backgroundColor: "#fff",
    borderBottom: "1px solid #eee"
  };

  const altRowStyle = {
    ...rowStyle,
    backgroundColor: "#f7fafd"
  };

  const cellStyle = {
    padding: "10px",
    color: "#444"
  };

  if (loading) return <p>Loading student data...</p>;

  if (students.length === 0) {
    return <p>No student records found.</p>;
  }

  return (
    <table style={tableStyle}>
      <thead>
        <tr>
          {Object.keys(students[0]).map((key, i) => (
            <th key={i} style={headerStyle}>{key}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {students.map((student, i) => (
          <tr key={i} style={i % 2 === 0 ? rowStyle : altRowStyle}>
            {Object.entries(student).map(([key, value], j) => (
              <td key={j} style={cellStyle}>{value ?? "–"}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StudentTable;
