const jwt = require('jsonwebtoken');
const { User } = require('../models');

// KUNCI RAHASIA JWT (Sebaiknya ditaruh di .env, ini contoh sederhana)
const JWT_SECRET = process.env.JWT_SECRET || 'rahasia_super_kuat_123';

// 1. Middleware Proteksi: Memastikan request memiliki Token JWT yang Valid
const protect = async (req, res, next) => {
  let token;
  
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ status: 'fail', message: 'Anda belum login! Silakan login untuk mendapatkan akses.' });
  }

  try {
    // Membongkar rahasia token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Mengecek apakah user itu masih ada di database
    const currentUser = await User.findByPk(decoded.id);
    if (!currentUser) {
      return res.status(401).json({ status: 'fail', message: 'User pemilik token ini sudah tidak ada / dihapus.' });
    }

    // Melakukan titipan data user ke dalam object `req`
    req.user = currentUser;
    next();
  } catch (error) {
    return res.status(401).json({ status: 'fail', message: 'Token tidak valid atau sudah kadaluarsa!' });
  }
};

// 2. Middleware Otorisasi: Mengecek Role User
const restrictTo = (...roles) => {
  return (req, res, next) => {
    // Jika role req.user tidak termasuk di dalam daftar yang diizinkan (misal ['admin'])
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ status: 'fail', message: 'Anda tidak memiliki akses (Bukan Admin) untuk melakukan aksi ini!' });
    }
    next();
  };
};

module.exports = {
  protect,
  restrictTo,
  JWT_SECRET
};
