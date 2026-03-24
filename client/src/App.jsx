import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import TodoDashboard from './pages/TodoDashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Pintu Masuk Bebas (Login & Register) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Zona Terbatas (Hanya yang punya Kartu Akses JWT) */}
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <TodoDashboard />
            </ProtectedRoute>
          } 
        />

        {/* Zona Super Terbatas (Admin Backoffice) */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />

        {/* Jika user iseng memasukkan URL ngawur, kembalikan ke Beranda */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
