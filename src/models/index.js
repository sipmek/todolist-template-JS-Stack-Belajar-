const sequelize = require('../config/database');
const User = require('./userModel');
const Todo = require('./todoModel');

// Membuat Relasi: Satu User punya Banyak Todo
User.hasMany(Todo, { foreignKey: 'userId', as: 'todos', onDelete: 'CASCADE' });
// Pemilik Todo adalah User
Todo.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = {
  sequelize,
  User,
  Todo
};
