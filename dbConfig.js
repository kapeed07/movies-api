const Sequelize = require('sequelize');

const sequelize = new Sequelize('OB38fuFnUN', 'OB38fuFnUN', 'GtaClODPhi', {
  host: 'remotemysql.com',
  dialect: 'mysql',
  logging: false,
});

module.exports = sequelize;
