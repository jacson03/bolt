const { Sequelize } = require('sequelize');
const path = require('path');

// Create separate databases for admin and user
const adminSequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../databases/admin.sqlite'),
  logging: false,
});

const userSequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../databases/user.sqlite'),
  logging: false,
});

module.exports = {
  adminSequelize,
  userSequelize
};