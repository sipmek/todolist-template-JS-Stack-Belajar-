// Memuat semua variabel dari file .env (seperti PORT) ke dalam process.env
require('dotenv').config();

// Memanggil konfigurasi express yang telah dibuat di app.js
const app = require('./app');
const { sequelize } = require('./models');
const seedAdmin = require('./seeders/adminSeeder');

// Sinkronisasi model Sequelize ke Database XAMPP
// PERHATIAN: menggunakan 'alter: true' agar menambahkan kolom status tanpa menghapus akun Admin yang sudah ada
sequelize.sync({ alter: true }).then(async () => {
  console.log('[INFO] Skema baru siap! Tabel Database berhasil di-update tanpa kehilangan data.');
  await seedAdmin(); // Panggil sistem pembuat admin otomatis
}).catch((err) => {
  console.log('[ERROR] Database gagal ter-sync:', err.message);
});

// Menentukan Port dari .env atau default ke 5000
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`[INFO] Server berjalan di mode ${process.env.NODE_ENV || 'development'}`);
  console.log(`[INFO] Dapat diakses di http://localhost:${PORT}`);
});

// Error handling global (opsional): Menangkap error "Unhandled Rejection" (seperti gagal connect DB tak terduga)
process.on('unhandledRejection', (err, promise) => {
  console.log(`[FATAL ERROR] Terjadi Unhandled Rejection: ${err.message}`);
  // Mematikan server secara bertahap
  server.close(() => process.exit(1));
});
