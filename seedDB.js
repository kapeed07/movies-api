const sequelize = require('./dbConfig');
const data = require('./file/movies.json');

// models
const Director = require('./models/directorModel')(sequelize);
const Movie = require('./models/movieModel')(sequelize);

// seed DB
sequelize
  .sync({
      logging: console.log,
      force: true
  })
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .then(() => {
    data.map(movie => {
      let directorName = movie['Director'].trim();
      Director.findOrCreate({
        where: {
          Name: directorName
        }
      })
      .then(data => {
        delete movie['Director'];
        movie['directorId'] = data[0].dataValues.id;
          Movie.create(movie)
      })
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
