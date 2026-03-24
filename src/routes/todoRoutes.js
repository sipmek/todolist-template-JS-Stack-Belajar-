const express = require('express');
const router = express.Router();

const todoController = require('../controllers/todoController');

// Import Middleware
const validate = require('../middlewares/validate');
const todoValidation = require('../validations/todoValidation');
const { protect } = require('../middlewares/authMiddleware');

// 🔒 Menerapkan Pengawal Token di semua jalan ini
// Server akan memblokir request jika tidak ada JWT. (Req selanjutnya akan memiliki req.user)
router.use(protect);

router.get('/', todoController.getTodos);

// Endpoint POST dan PUT kini dicegat dulu dan divalidasi dengan JOI
router.post('/', validate(todoValidation.createTodo), todoController.createTodo);
router.put('/:id', validate(todoValidation.updateTodo), todoController.updateTodo);

router.delete('/:id', todoController.deleteTodo);

module.exports = router;
