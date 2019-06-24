const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const Director = sequelize.define('director', {
    'Name': {
    type: Sequelize.STRING,
    },
  });  
  return Director;
}
