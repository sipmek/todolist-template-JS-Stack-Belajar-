const todoService = require('../services/todoService');

const getTodos = async (req, res, next) => {
  try {
    // Melemparkan informasi user (termasuk Role-nya) ke Service
    const data = await todoService.getAllTodos(req.user);
    res.status(200).json({ status: 'success', data: data });
  } catch (error) {
    next(error);
  }
};

const createTodo = async (req, res, next) => {
  try {
    const { title } = req.body;
    // Mengoper ID User si Pembuat ke Service
    const newTodo = await todoService.createTodo(title, req.user.id);
    
    res.status(201).json({
      status: 'success',
      data: newTodo,
      message: 'Berhasil membuat tugas baru.'
    });
  } catch (error) {
    next(error);
  }
};

const updateTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;
    
    const updatedTodo = await todoService.updateTodo(id, title, completed, req.user);
    res.status(200).json({
      status: 'success',
      data: updatedTodo,
      message: 'Tugas berhasil diperbarui.'
    });
  } catch (error) {
    // Ubah status HTTP jadi 403 Forbidden jika "Akses Ditolak"
    if(error.message.includes('Akses Ditolak')) return res.status(403).json({status: 'fail', message: error.message});
    next(error);
  }
};

const deleteTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    await todoService.deleteTodo(id, req.user);
    res.status(200).json({
      status: 'success',
      data: null,
      message: 'Tugas berhasil dihapus.'
    });
  } catch (error) {
    if(error.message.includes('Akses Ditolak')) return res.status(403).json({status: 'fail', message: error.message});
    next(error);
  }
};

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo
};
