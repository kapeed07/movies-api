const express = require('express');
const router = express.Router();
const Director = require('../models/directorModel');


// create new director
router.post('/', (req, res) => {
  let director = req.body;
  Director.create(director).then((data) => {
    res.send(data.dataValues);
  });
});

// read all directors
router.get('/', (req, res) => {
  Director.findAll().then((director) => {
    res.send(director);
  });
});

// read single director with given id
router.get('/:id', (req, res) => {
  let id = req.params.id;
  Director.findByPk(id).then((director) => {
    res.send(director);
  });
});

// update director with given id
router.put('/:id', (req, res) => {
  let id = req.params.id;
  console.log(id);
  let director = req.body;
  console.log(director);
  Director.update(director, {
    where: {
      'id': id,
    },
  }).then(() => {      
    Director.findByPk(id).then((director) => {
      res.send(director);
    });
  });
});

// delete director with given id
router.delete('/:id', (req, res) => {
  let id = req.params.id;
  let deletedDirector;
  Director.findByPk(id).then((director) => {
    deletedDirector = director;
  }).then(() => {
    Director.destroy({
      where: {
          'id': id
      }
    }).then(() => {
      res.send(deletedDirector.dataValues);
    });
  });
});

module.exports = router;
