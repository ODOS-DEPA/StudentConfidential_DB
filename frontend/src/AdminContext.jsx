// AdminContext.jsx
import { createContext, useState } from 'react';

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);

  return (
    <AdminContext.Provider value={{ adminLoggedIn, setAdminLoggedIn }}>
      {children}
    </AdminContext.Provider>
  );
};
