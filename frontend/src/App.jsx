import { useState } from 'react'
import StudentTable from './components/StudentTable';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ fontFamily: 'Segoe UI', color: '#4f6ef7' }}>🎓 Student Table</h1>
      <StudentTable />
    </div>
  );
}

export default App;
