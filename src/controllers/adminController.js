const { User } = require('../models');

// Mengambil seluruh data pengguna terdaftar (Jangan kembalikan Password Hash!!!)
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({ 
      attributes: ['id', 'username', 'role', 'status', 'createdAt'],
      order: [['createdAt', 'DESC']]
    });
    res.status(200).json({ status: 'success', data: users });
  } catch (err) {
    next(err);
  }
};

// Modifikasi data user (Bisa digunakan untuk Approve Status atau Naik Pangkat jadi Admin)
const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role, status } = req.body;
    
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ status: 'fail', message: 'Pengguna tidak ditemukan' });
    }

    // Keamanan super ekstra: Jangan sampai seorang admin tidak sengaja membanned dirinya sendiri
    if (user.id === req.user.id && status === 'banned') {
      return res.status(400).json({ status: 'fail', message: 'Anda tidak diizinkan memblokir diri sendiri!' });
    }

    if (role) user.role = role;
    if (status) user.status = status;

    await user.save();
    
    res.status(200).json({ 
      status: 'success', 
      data: { id: user.id, username: user.username, role: user.role, status: user.status }, 
      message: 'Data anggota berhasil diperbarui!' 
    });
  } catch (err) {
    next(err);
  }
};

// Menghapus/Menolak akun palsu/spam seutuhnya
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Keamanan super ekstra lagi
    if (parseInt(id) === req.user.id) {
      return res.status(400).json({ status: 'fail', message: 'Tidak dapat menghapus diri sendiri!' });
    }

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ status: 'fail', message: 'Pengguna tak ditemukan' });

    await user.destroy();
    res.status(200).json({ status: 'success', message: 'Akun pendaftar berhasil dilebur.' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllUsers,
  updateUser,
  deleteUser
};
