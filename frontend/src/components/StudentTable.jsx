// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const StudentTable = () => {
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios.get('http://47.129.238.41/students/all')
//       .then(res => {
//         setStudents(res.data || []);
//       })
//       .catch(err => {
//         console.error('Failed to fetch students:', err);
//         setStudents([]);
//       })
//       .finally(() => setLoading(false));
//   }, []);

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

//   if (loading) return <p>Loading student data...</p>;

//   if (students.length === 0) {
//     return <p>No student records found.</p>;
//   }

//   return (
//     <table style={tableStyle}>
//       <thead>
//         <tr>
//           {Object.keys(students[0]).map((key, i) => (
//             <th key={i} style={headerStyle}>{key}</th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         {students.map((student, i) => (
//           <tr key={i} style={i % 2 === 0 ? rowStyle : altRowStyle}>
//             {Object.entries(student).map(([key, value], j) => (
//               <td key={j} style={cellStyle}>{value ?? "–"}</td>
//             ))}
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default StudentTable;

//search button component real-time search
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import SearchBar from './SearchBar';

// const StudentTable = () => {
//   const [students, setStudents] = useState([]);
//   const [filteredStudents, setFilteredStudents] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [loading, setLoading] = useState(true);

//   // Fetch all student data
//   useEffect(() => {
//     axios.get('http://47.129.238.41/students/all')
//       .then(res => {
//         const data = res.data || [];
//         setStudents(data);
//         setFilteredStudents(data); // Show all by default
//       })
//       .catch(err => {
//         console.error('Failed to fetch students:', err);
//         setStudents([]);
//         setFilteredStudents([]);
//       })
//       .finally(() => setLoading(false));
//   }, []);

//   // Real-time filtering based on searchTerm
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

//   if (loading) return <p>Loading student data...</p>;

//   if (students.length === 0) {
//     return <p>No student records found.</p>;
//   }

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
//               {Object.entries(student).map(([key, value], j) => (
//                 <td key={j} style={cellStyle}>{value ?? "–"}</td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </>
//   );
// };

// export default StudentTable;


//search button with dash if null in table stage 1-8
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch student data from backend
  useEffect(() => {
    axios.get('http://47.129.238.41/students/all')
      .then(res => {
        const data = res.data || [];
        setStudents(data);
        setFilteredStudents(data); // initial display
      })
      .catch(err => {
        console.error('Failed to fetch students:', err);
        setStudents([]);
        setFilteredStudents([]);
      })
      .finally(() => setLoading(false));
  }, []);

  // Real-time search filter
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
                const isStageField = key.toLowerCase().startsWith('stage');
                const displayValue = isStageField && (!value || value === 0) ? "–" : value;
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

