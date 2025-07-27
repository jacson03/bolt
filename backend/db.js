const {Sequelize}=require('sequelize')

const sequelize =new Sequelize(
  'bolt_dev',
  'root',
  '',{
    host: '127.0.0.1',
    dialect: 'mysql',
    logging: false,
  },);
  
  module.exports = sequelize;