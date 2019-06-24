const express = require('express');
const router = express.Router();

module.exports = (Movie) => {
  // create new movie
  router.post('/api/movies', (req, res) => {
      let movie = req.body;
      Movie.create(movie).then(() => {
          res.redirect('/api/movies');
      });
  });

  // read all movies
  router.get('/api/movies', (req, res) => {
    Movie.findAll()
    .then(movies => {
      res.send(movies)
    });
  });

  // read single movie with given id
  router.get('/api/movies/:id', (req, res) => {
    let id = req.params.id;
    Movie.findByPk(id)
    .then(movie => {
      res.send(movie)
    });
  });

  // update movie with given id
  router.put('/api/movies/:id', (req, res) => {
    let id = req.params.id;
    let movie = req.body;

    Movie.update(movie, {
      where: {
        'id': id
      }
    })
    .then(() => {
      res.redirect(`/api/movies/${id}`);
    });
  });

  // delete movie with given id
  router.delete('/api/movies/:id', (req, res) => {
    let id = req.params.id;
    Movie.destroy({
    where: {
        'id': id
    }
    }).then(() => {
      res.redirect('/api/movies');
    });
  });
  return router;
}
