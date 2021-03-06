const Sequelize = require('sequelize');

const sequelize = require('../dbConfig');

const Movie = sequelize.define('movie', {
  Title: {
    type: Sequelize.STRING,
  },
  Description: {
    type: Sequelize.STRING,
  },
  Runtime: {
    type: Sequelize.INTEGER,
  },
  Genre: {
    type: Sequelize.STRING,
  },
  Rating: {
    type: Sequelize.INTEGER,
  },
  Metascore: {
    type: Sequelize.INTEGER,
  },
  Votes: {
    type: Sequelize.INTEGER,
  },
  Gross_Earning_in_Mil: {
    type: Sequelize.INTEGER,
  },
  directorId: {
    type: Sequelize.INTEGER,
  },
  Actor: {
    type: Sequelize.STRING,
  },
  Year: {
    type: Sequelize.INTEGER,
  },
});
module.exports = Movie;
