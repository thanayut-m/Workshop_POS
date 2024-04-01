const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('db_workshop_pos', 'sa', '$TnySql001!!', {
    host: '26.211.201.45',
    dialect: 'mssql',
    logging: false
  });

  module.exports = sequelize;

