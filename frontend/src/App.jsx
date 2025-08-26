// //add permission to acess editpage, uploadpage, and some functions in StudentTable
// // App.jsx
// import React, { useState, useEffect, createContext, useContext } from 'react';
// import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
// import StudentTable from './pages/StudentTable';
// import UploadPage from './pages/UploadPage';
// import EditPage from './pages/EditPage';
// import logo from './assets/depa.jpg'; // replace with your logo path

// // --------------------
// // Admin Context
// // --------------------
// const AdminContext = createContext();

// export const useAdmin = () => useContext(AdminContext);

// export const AdminProvider = ({ children }) => {
//   const [adminLoggedIn, setAdminLoggedIn] = useState(
//     sessionStorage.getItem('adminLoggedIn') === 'true'
//   );

//   // Keep sessionStorage in sync
//   useEffect(() => {
//     if (adminLoggedIn) {
//       sessionStorage.setItem('adminLoggedIn', 'true');
//     } else {
//       sessionStorage.removeItem('adminLoggedIn');
//     }
//   }, [adminLoggedIn]);

//   return (
//     <AdminContext.Provider value={{ adminLoggedIn, setAdminLoggedIn }}>
//       {children}
//     </AdminContext.Provider>
//   );
// };

// // --------------------
// // ProtectedPage Wrapper
// // --------------------
// function ProtectedPage({ children }) {
//   const { adminLoggedIn, setAdminLoggedIn } = useAdmin();
//   const [input, setInput] = useState('');

//   const correctPassword = 'depa@1234';

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (input === correctPassword) {
//       setAdminLoggedIn(true);
//     } else {
//       alert('Incorrect password!');
//       setInput('');
//     }
//   };

//   if (adminLoggedIn) return children;

//   return (
//     <div style={{ marginTop: '50px' }}>
//       <h2>Admin Access Required 🔒</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="password"
//           value={input}
//           placeholder="Enter password"
//           onChange={(e) => setInput(e.target.value)}
//           style={{ padding: '8px', fontSize: '16px' }}
//         />
//         <button type="submit" style={{ padding: '8px 12px', marginLeft: '10px' }}>
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// }
// // --------------------
// // Main App Component
// // --------------------
// function App() {
//   return (
//     <AdminProvider>
//       <Router>
//         <div
//           style={{
//             minHeight: '100vh',
//             padding: '20px',
//             color: '#000',
//             background: 'linear-gradient(135deg, #fff200, #ffd700)',
//           }}
//         >
//           {/* Header with logo */}
//           <div
//             style={{
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'space-between',
//             }}
//           >
//             <h1 style={{ fontFamily: 'Segoe UI', color: '#000000ff' }}>
//               🎓 Student Management
//             </h1>
//             <img src={logo} alt="Logo" style={{ height: '50px', objectFit: 'contain' }} />
//           </div>

//           {/* Navigation Links */}
//           <nav style={{ marginBottom: '20px' }}>
//             <Link to="/" style={{ marginRight: '15px' }}>
//               📋 View Students
//             </Link>
//             <Link to="/upload" style={{ marginRight: '15px' }}>
//               ⬆️ Upload Excel
//             </Link>
//             <Link to="/edit">✏️ Edit Students</Link>
//           </nav>

//           {/* Routes */}
//           <Routes>
//             <Route path="/" element={<StudentTable />} />
//             <Route
//               path="/upload"
//               element={
//                 <ProtectedPage>
//                   <UploadPage />
//                 </ProtectedPage>
//               }
//             />
//             <Route
//               path="/edit"
//               element={
//                 <ProtectedPage>
//                   <EditPage />
//                 </ProtectedPage>
//               }
//             />
//             {/* Redirect unknown routes */}
//             <Route path="*" element={<Navigate to="/" replace />} />
//           </Routes>
//         </div>
//       </Router>
//     </AdminProvider>
//   );
// }

// export default App;



//move lock screen at the center
// add red text indicator when password field is empty or incorrect input
// App.jsx
// App.jsx
import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import StudentTable from './pages/StudentTable';
import UploadPage from './pages/UploadPage';
import EditPage from './pages/EditPage';
import logo from './assets/depa.jpg'; // replace with your logo path

// --------------------
// Admin Context
// --------------------
const AdminContext = createContext();

export const useAdmin = () => useContext(AdminContext);

export const AdminProvider = ({ children }) => {
  const [adminLoggedIn, setAdminLoggedIn] = useState(
    sessionStorage.getItem('adminLoggedIn') === 'true'
  );

  // Keep sessionStorage in sync
  useEffect(() => {
    if (adminLoggedIn) {
      sessionStorage.setItem('adminLoggedIn', 'true');
    } else {
      sessionStorage.removeItem('adminLoggedIn');
    }
  }, [adminLoggedIn]);

  return (
    <AdminContext.Provider value={{ adminLoggedIn, setAdminLoggedIn }}>
      {children}
    </AdminContext.Provider>
  );
};

// --------------------
// ProtectedPage Wrapper
// --------------------
function ProtectedPage({ children }) {
  const { adminLoggedIn, setAdminLoggedIn } = useAdmin();
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const correctPassword = 'depa@1234';

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!input.trim()) {
      setError('Password required');
      return;
    }

    if (input === correctPassword) {
      setAdminLoggedIn(true);
      setError('');
    } else {
      setError('Incorrect password');
      setInput('');
    }
  };

  if (adminLoggedIn) return children;

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #fff200, #ffd700)',
        padding: '20px',
      }}
    >
      <h2 style={{ fontSize: '28px', marginBottom: '20px' }}>Admin Access Required 🔒</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          background: '#fff',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        }}
      >
        <input
          type="password"
          value={input}
          placeholder="Enter password"
          onChange={(e) => {
            setInput(e.target.value);
            if (error) setError('');
          }}
          style={{
            padding: '12px',
            fontSize: '18px',
            width: '250px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            marginBottom: '10px',
            textAlign: 'center',
          }}
        />
        {error && (
          <div style={{ color: 'red', fontSize: '14px', marginBottom: '10px' }}>{error}</div>
        )}
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            fontSize: '18px',
            borderRadius: '8px',
            border: 'none',
            background: '#ffcc00',
            cursor: 'pointer',
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

// --------------------
// Main App Component
// --------------------
function App() {
  return (
    <AdminProvider>
      <Router>
        <div
          style={{
            minHeight: '100vh',
            padding: '20px',
            color: '#000',
            background: 'linear-gradient(135deg, #fff200, #ffd700)',
          }}
        >
          {/* Header with logo */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <h1 style={{ fontFamily: 'Segoe UI', color: '#000000ff' }}>
              🎓 Student Management
            </h1>
            <img src={logo} alt="Logo" style={{ height: '50px', objectFit: 'contain' }} />
          </div>

          {/* Navigation Links */}
          <nav style={{ marginBottom: '20px' }}>
            <Link to="/" style={{ marginRight: '15px' }}>
              📋 View Students
            </Link>
            <Link to="/upload" style={{ marginRight: '15px' }}>
              ⬆️ Upload Excel
            </Link>
            <Link to="/edit">✏️ Edit Students</Link>
          </nav>

          {/* Routes */}
          <Routes>
            <Route path="/" element={<StudentTable />} />
            <Route
              path="/upload"
              element={
                <ProtectedPage>
                  <UploadPage />
                </ProtectedPage>
              }
            />
            <Route
              path="/edit"
              element={
                <ProtectedPage>
                  <EditPage />
                </ProtectedPage>
              }
            />
            {/* Redirect unknown routes */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AdminProvider>
  );
}

export default App;

