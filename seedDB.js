const sequelize = require('./dbConfig');

const data = require('./file/movies.json');

const Director = require('./models/directorModel');

const Movie = require('./models/movieModel');

Director.hasMany(Movie);

// seed DB
sequelize.sync({
  logging: console.log,
  force: true,
}).then(() => {
  console.log('Connection has been established successfully.');
}).then(() => {
  data.map((movie) => {
    const directorName = movie.Director.trim();
    Director.findOrCreate({
      where: {
        Name: directorName,
      },
    }).then((newDirector) => {
      delete movie.Director;
      movie.directorId = newDirector[0].dataValues.id;
      Movie.create(movie);
    });
  });
}).catch((err) => {
  console.error('Unable to connect to the database:', err);
});
