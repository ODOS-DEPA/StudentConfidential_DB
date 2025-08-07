import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';



const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch student data
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_DOMAIN_NAME || "http://0.0.0.0"}/students/all`)
      .then(res => {
        const data = res.data || [];
        setStudents(data);
        setFilteredStudents(data);
      })
      .catch(err => {
        console.error('Failed to fetch students:', err);
        setStudents([]);
        setFilteredStudents([]);
      })
      .finally(() => setLoading(false));
  }, []);

  // Search filtering
  useEffect(() => {
    const term = searchTerm.toLowerCase().trim();
    const filtered = students.filter(student =>
      Object.values(student).some(value =>
        String(value).toLowerCase().includes(term)
      )
    );
    setFilteredStudents(filtered);
  }, [searchTerm, students]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Style definitions
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
  //was using if statement, but for better readability I switched to using switch case instead.
  // Columns that need interpretation
  const shouldTransform = (key) => {
    const norm = key.trim().toLowerCase();
    return norm.startsWith("stage") || norm === "status";
  };

  const formatValue = (value) => {
    switch (value) {
      case 1: return "Pass";
      case 0: return "Fail";
      case null:
      case undefined: return "–";
      default: return value;
    }
  };

  if (loading) return <p>Loading student data...</p>;
  if (students.length === 0) return <p>No student records found.</p>;

  return (
    <>
      <SearchBar value={searchTerm} onChange={handleSearchChange} />
      <table style={tableStyle}>
        <thead>
          <tr>
            {Object.keys(students[0]).map((key, i) => (
              <th key={i} style={headerStyle}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student, i) => (
            <tr key={i} style={i % 2 === 0 ? rowStyle : altRowStyle}>
              {Object.entries(student).map(([key, value], j) => {
                const displayValue = shouldTransform(key) ? formatValue(value) : (value ?? "–");
                return (
                  <td key={j} style={cellStyle}>{displayValue}</td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default StudentTable;
