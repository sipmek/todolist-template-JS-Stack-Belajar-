const bcrypt = require('bcryptjs');
const { User } = require('../models');

const seedAdmin = async () => {
  try {
    // Mengecek apakah sudah ada user dengan role admin di database
    const adminExists = await User.findOne({ where: { role: 'admin' } });
    
    if (!adminExists) {
      console.log('[INFO] Akun Admin tidak ditemukan! Membuat akun Master Admin otomatis...');
      const hashedPassword = await bcrypt.hash('admin123', 10);
      
      await User.create({
        username: 'master',
        password: hashedPassword,
        role: 'admin',
        status: 'active'
      });
      console.log('[INFO] ✅ Akun Master berhasil dibuat!');
      console.log('       => Username : master');
      console.log('       => Password : admin123');
    }
  } catch (err) {
    console.error('[ERROR] Gagal membuat akun master otomatis:', err);
  }
};

module.exports = seedAdmin;
