const Sequelize = require('sequelize');

const sequelize = require('../dbConfig');

const Director = sequelize.define('director', {
  'Name': {
  type: Sequelize.STRING,
  },
});
module.exports = Director;
