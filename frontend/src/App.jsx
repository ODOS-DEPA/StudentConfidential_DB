// //fixing background color from static to gradient and adding logo
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import StudentTable from './pages/StudentTable';
import UploadPage from './pages/UploadPage';
import EditPage from './pages/EditPage';
import logo from './assets/depa.jpg'; // replace with your logo path

function App() {
  return (
    <Router>
      <div
        style={{
          minHeight: '100vh',
          padding: '20px',
          color: '#000',
          background: 'linear-gradient(135deg, #fff200, #ffd700)'
        }}
      >
        {/* Header with logo */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <h1 style={{ fontFamily: 'Segoe UI', color: '#000000ff' }}>🎓 Student Management</h1>
          <img src={logo} alt="Logo" style={{ height: '50px', objectFit: 'contain' }} />
        </div>

        {/* Navigation Links */}
        <nav style={{ marginBottom: '20px' }}>
          <Link to="/" style={{ marginRight: '15px' }}>📋 View Students</Link>
          <Link to="/upload" style={{ marginRight: '15px' }}>⬆️ Upload Excel</Link>
          <Link to="/edit">✏️ Edit Students</Link>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<StudentTable />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/edit" element={<EditPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


