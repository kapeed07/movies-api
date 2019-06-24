const Sequelize = require('sequelize');
// import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('OB38fuFnUN', 'OB38fuFnUN', 'GtaClODPhi', {
  host: 'remotemysql.com',
  dialect: 'mysql',
});

module.exports = sequelize;
