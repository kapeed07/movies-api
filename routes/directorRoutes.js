const express = require('express');
const router = express.Router();

module.exports = (Director) => {
  // create new director
  router.post('/api/directors', (req, res) => {
    let director = req.body;
    Director.create(director).then(() => {
      res.redirect('/api/directors');
    });
  });

  // read all director
  router.get('/api/directors', (req, res) => {
    Director.findAll().then(directors => {
      res.send(directors)
    });
  });

  // read single director with given id
  router.get('/api/directors/:id', (req, res) => {
    let id = req.params.id;
    Director.findByPk(id).then(director => {
      res.send(director)
    });
  });

  // update single director with given id
  router.put('/api/directors/:id', (req, res) => {
    let id = req.params.id;
    let director = req.body;

    Director.update(director, {
      where: {
        'id': id
      }
    })
    .then(() => {
      res.redirect(`/api/directors/${id}`);
    });
  });
  // delete single director with given id
  router.delete('/api/directors/:id', (req, res) => {
    let id = req.params.id;
    Director.destroy({
      where: {
        'id': id
      }
    })
    .then(() => {
      res.redirect('/api/directors');
    });
  });

  return router;
}
