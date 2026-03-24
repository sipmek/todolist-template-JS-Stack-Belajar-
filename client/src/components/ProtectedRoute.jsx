import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Mengecek keberadaan "Kartu Akses" di brankas browser
  const token = localStorage.getItem('token');
  
  if (!token) {
    // Jika tidak ada token, tendang ke halaman login!
    return <Navigate to="/login" replace />;
  }
  
  // Jika valid, silakan akses halamannya
  return children;
};

export default ProtectedRoute;
