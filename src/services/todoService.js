const { Todo } = require('../models');

// =========================================
//  SERVICE LAYER (Mendukung RBAC Keamanan)
// =========================================

// Parameter `user` berupa object => { id: 1, role: 'admin', username: '...' }
const getAllTodos = async (user) => {
  const queryOptions = { 
    order: [['createdAt', 'DESC']]
  };

  // Logika RBAC (Role-Based Access Control)
  // Jika user ini adalah ADMIN, ia dilepaskan batasan & boleh melihat semuanya
  // Jika BUKAN admin, query difilter agar hanya mengambil Miliknya Sendiri
  if (user.role !== 'admin') {
    queryOptions.where = { userId: user.id };
  }

  return await Todo.findAll(queryOptions);
};

const createTodo = async (title, userId) => {
  return await Todo.create({ 
    title: title,
    userId: userId // Data dikunci kepemilikannya dengan ID user
  });
};

const updateTodo = async (id, title, completed, user) => {
  const existingTodo = await Todo.findByPk(parseInt(id));
  if (!existingTodo) {
    throw new Error("To-Do tidak ditemukan.");
  }

  // Pengecekan Keamanan Berlapis (Anti Hekel)
  // Jika dia BUKAN admin DAN Todo ini JUGA BUKAN miliknya:
  if (user.role !== 'admin' && existingTodo.userId !== user.id) {
    throw new Error("Akses Ditolak! Anda bukan pemilik To-Do ini dan bukan Administrator.");
  }

  let dataToUpdate = {};
  if (title !== undefined) dataToUpdate.title = title;
  if (completed !== undefined) dataToUpdate.completed = completed;

  return await existingTodo.update(dataToUpdate);
};

const deleteTodo = async (id, user) => {
  const existingTodo = await Todo.findByPk(parseInt(id));
  if (!existingTodo) {
    throw new Error("To-Do tidak ditemukan.");
  }
  
  // Pengecekan Keamanan Berlapis
  if (user.role !== 'admin' && existingTodo.userId !== user.id) {
    throw new Error("Akses Ditolak! Anda tidak berhak menghapus To-Do orang lain.");
  }

  await existingTodo.destroy();
  return true;
};

module.exports = {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo
};
