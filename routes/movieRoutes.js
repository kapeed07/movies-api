const express = require('express');

const router = express.Router();

const Joi = require('@hapi/joi');
const movieJoi = require('../joiSchemas/movie');
const Movie = require('../models/movieModel');
const Director = require('../models/directorModel');

// ======> create new movie
router.post('/', (req, res) => {
  const movie = req.body;
  let result = Joi.validate(movie, movieJoi.all);

  // return if fails to validate
  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }

  result = result.value;

  Director.findOrCreate({
    where: {
      Name: result.Director,
    },
  }).then((newDirector) => {
    delete result.Director;
    movie.directorId = newDirector[0].dataValues.id;

    Movie.create(movie).then((data) => {
      res.send(data.dataValues);
    });
  }).catch(err => err);
});

// ======> read all movies
router.get('/', (req, res) => {
  Movie.findAll().then((movies) => {
    res.send(movies);
  }).catch(err => err);
});

// ======> read single movie with given id
router.get('/:id', (req, res) => {
  const { id } = req.params;

  let result = Joi.validate({ id }, movieJoi.id);

  // return if fails to validate
  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }

  result = result.value;
  Movie.findByPk(result.id).then((movie) => {
    res.send(movie);
  }).catch(err => err);
});

// ======> update movie with given id
router.put('/:id', (req, res) => {
  const movie = req.body;
  const { id } = req.params;

  const validatedMovie = Joi.validate(movie, movieJoi.all);
  const validatedId = Joi.validate({ id }, movieJoi.id);

  // return if fails to validate
  if (validatedMovie.error) {
    return res.status(400).send(validatedMovie.error.details[0].message);
  }
  if (validatedId.error) {
    return res.status(400).send(validatedId.error.details[0].message);
  }

  const result = validatedMovie.value;

  Director.findOrCreate({
    where: {
      Name: result.Director,
    },
  }).then((newDirector) => {
    delete result.Director;
    result.directorId = newDirector[0].dataValues.id;

    Movie.update(result, {
      where: {
        id,
      },
    }).then((count) => {
      // console.log(count);
      count === 0 ? res.sendStatus(400) : res.sendStatus(200);
    });
  }).catch(err => err);
});

// ======> delete movie with given id
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  let result = Joi.validate({ id }, movieJoi.id);

  // return if fails to validate
  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }

  result = result.value;
  Movie.destroy({
    where: {
      id: result.id,
    },
  }).then((count) => {
    count === 0 ? res.sendStatus(404) : res.sendStatus(200);
  }).catch(err => err);
});

module.exports = router;
