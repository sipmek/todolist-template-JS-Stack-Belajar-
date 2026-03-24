const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// Import Middleware Error Handler
const errorHandler = require('./middlewares/errorHandler');

// Import semua file routing di sini
const todoRoutes = require('./routes/todoRoutes');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Inisialisasi aplikasi Express
const app = express();

// --- Kumpulan Middleware Keamanan & Parser ---
// 1. Helmet: Mengamankan struktur HTTP Header untuk mencegah celah keamanan umum
app.use(helmet());

// 2. Rate Limiting: Mencegah serangan DDoS / Brute Force (Maksimal 100 Request / 15 menit per IP)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: { status: 'fail', message: 'Terlalu banyak request dari IP Anda, coba lagi dalam 15 menit.' }
});
app.use('/api', limiter);

// 3. CORS & Body Parser
app.use(cors());
app.use(express.json());

// --- Rute Endpoint Sementara (Health-check) ---
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Server berjalan dengan baik!',
    timestamp: new Date().toISOString()
  });
});

// --- Menyambungkan Routes Utama ---
app.use('/api/todos', todoRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

// --- Global Error Handler (Posisi harus PALING BAWAH) ---
app.use(errorHandler);

// Mengekspor app
module.exports = app;
