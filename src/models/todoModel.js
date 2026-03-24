const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Mendefinisikan struktur tabel 'todos' (mirip schema.prisma sebelumnya)
const Todo = sequelize.define('Todo', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'todos',
  timestamps: true
});

module.exports = Todo;
