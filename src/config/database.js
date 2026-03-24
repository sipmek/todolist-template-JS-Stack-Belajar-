const { Sequelize } = require('sequelize');

// Menghubungkan ke MySQL XAMPP secara lokal
// Parameter: nama database, username, password, { host, dialect }
const sequelize = new Sequelize('todolist_db', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false // Matikan logging SQL agar terminal tidak penuh
});

module.exports = sequelize;
