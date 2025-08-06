// import { useState } from 'react'
// import StudentTable from './components/StudentTable';

// function App() {
//   return (
//     <div style={{ padding: '20px' }}>
//       <h1 style={{ fontFamily: 'Segoe UI', color: '#4f6ef7' }}>🎓 Student Table</h1>
//       <StudentTable />
//     </div>
//   );
// }

// export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import StudentTable from './components/StudentTable';
import UploadPage from './pages/UploadPage';

function App() {
  return (
    <Router>
      <div style={{ padding: '20px' }}>
        <h1 style={{ fontFamily: 'Segoe UI', color: '#4f6ef7' }}>🎓 Student Management</h1>

        {/* Navigation Links */}
        <nav style={{ marginBottom: '20px' }}>
          <Link to="/" style={{ marginRight: '15px' }}>📋 View Students</Link>
          <Link to="/upload">⬆️ Upload Excel</Link>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<StudentTable />} />
          <Route path="/upload" element={<UploadPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
