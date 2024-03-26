const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('db_workshop_pos', 'postgres', '$TnySql001!!', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
  });

  module.exports = sequelize;

