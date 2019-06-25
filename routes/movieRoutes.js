const express = require('express');
const router = express.Router();

module.exports = (Movie) => {
  // create new movie
  router.post('/', (req, res) => {
      let movie = req.body;
      Movie.create(movie).then((data) => {
        res.send(data.dataValues);
      });
  });

  // read all movies
  router.get('/', (req, res) => {
    Movie.findAll()
    .then(movies => {
      res.send(movies)
    });
  });

  // read single movie with given id
  router.get('/:id', (req, res) => {
    let id = req.params.id;
    Movie.findByPk(id)
    .then(movie => {
      res.send(movie)
    });
  });

  // update movie with given id
  router.put('/:id', (req, res) => {
    let id = req.params.id;
    let movie = req.body;
    Movie.update(movie, {
      where: {
        'id': id
      }
    }).then((id) => {
      Movie.findByPk(id).then(movie => {
        res.send(movie)
      });
    });
  });

  // delete movie with given id
  router.delete('/:id', (req, res) => {
    let id = req.params.id;
    let deletedMovie;
    Movie.findByPk(id).then((movie) => {
      deletedMovie = movie;
    }).then(() => {
      Movie.destroy({
        where: {
            'id': id
        }
      }).then(() => {
        res.send(deletedMovie.dataValues);
      });
    });
  });
  return router;
}
