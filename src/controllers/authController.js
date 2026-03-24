const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../models');
const { JWT_SECRET } = require('../middlewares/authMiddleware');

const signToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: '60d' }); 
};

const register = async (req, res) => {
  try {
    const { username, password } = req.body; // Pendaftar hanya perlu Username dan Password, role diatur server
    
    // Periksa password 
    if (!password || password.length < 5) {
      return res.status(400).json({ status: 'fail', message: 'Password terlalu pendek, minimal 5 huruf!' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Menyimpan Akun (Otomatis Role = 'user', Status = 'pending' dari Model Sequelize)
    const newUser = await User.create({ 
      username, 
      password: hashedPassword
    });

    // PENTING: Pendaftar TIDAK diberikan Token secara langsung. Ia tertunda oleh Admin.
    res.status(201).json({
      status: 'success',
      data: {
        id: newUser.id,
        username: newUser.username,
        status: newUser.status
      },
      message: 'Registrasi sukses! Mohon tunggu Administrator menyetujui profil akun Anda.'
    });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ status: 'fail', message: 'Username sudah keduluan dipakai orang lain!' });
    }
    res.status(500).json({ status: 'error', message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if(!username || !password) {
      return res.status(400).json({ status: 'fail', message: 'Mohon masukkan username dan password terlebih dahulu!' });
    }

    const user = await User.findOne({ where: { username } });
    
    if(!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ status: 'fail', message: 'Username atau Password salah!' });
    }

    // === PROTEKSI SISTEM PERSETUJUAN ===
    // Kalau User yang mau login bukan Admin, cek dulu statusnya!
    if (user.role !== 'admin') {
      if (user.status === 'pending') {
        return res.status(403).json({ status: 'fail', message: 'Akun Anda sedang dalam antrean persetujuan (Pending). Harap bersabar!' });
      }
      if (user.status === 'banned') {
        return res.status(403).json({ status: 'fail', message: 'Teng Teng! Akun Anda diblokir dari sistem.' });
      }
    }

    const token = signToken(user.id);
    res.status(200).json({
      status: 'success',
      token,
      data: {
        id: user.id,
        username: user.username,
        role: user.role,
        status: user.status
      },
      message: 'Login berhasil, selamat datang di markas!'
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

module.exports = {
  register,
  login
};
