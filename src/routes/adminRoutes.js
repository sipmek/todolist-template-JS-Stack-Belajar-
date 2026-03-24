const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const { protect, restrictTo } = require('../middlewares/authMiddleware');

// === ZONA MERAH: PANEL ADMINISTRATOR ===
// Rute ini di depan sudah dijaga oleh `protect` (harus login)
router.use(protect);

// Rute ini ditambah gembok khusus, HANYA ROLE "ADMIN" yang berHak Lewat
router.use(restrictTo('admin')); 

// /api/admin/users
router.get('/users', adminController.getAllUsers);
router.put('/users/:id', adminController.updateUser);
router.delete('/users/:id', adminController.deleteUser);

module.exports = router;
