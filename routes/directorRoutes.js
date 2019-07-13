const express = require('express');

const router = express.Router();

const Joi = require('@hapi/joi');
const directorJoi = require('../joiSchemas/director');
const Director = require('../models/directorModel');


// ======> create new director
router.post('/', (req, res) => {
  const director = req.body;
  let result = Joi.validate(director, directorJoi.all);

  // return if fails to validate
  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }

  result = result.value;  
  Director.create(result).then((data) => {
    res.send(data.dataValues);
  });
});

// ======> read all directors
router.get('/', (req, res) => {
  Director.findAll().then((director) => {
    res.send(director);
  });
});

// ======> read single director with given id
router.get('/:id', (req, res) => {
  const { id } = req.params;

  let result = Joi.validate({ id }, directorJoi.id);

  // return if fails to validate
  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }

  result = result.value;
  Director.findByPk(result.id).then((director) => {
    res.send(director);
  });
});

// ======> update director with given id
router.put('/:id', (req, res) => {
  const director = req.body;
  const { id } = req.params;
  const validatedDirector = Joi.validate(director, directorJoi.all);
  const validatedId = Joi.validate({ id }, directorJoi.id);

  // return if fails to validate
  if (validatedDirector.error) {
    return res.status(400).send(validatedDirector.error.details[0].message);
  }
  if (validatedId.error) {
    return res.status(400).send(validatedId.error.details[0].message);
  }

  const result = validatedDirector.value;
  Director.update(result, {
    where: {
      id,
    },
  }).then(() => {
    res.send(result);
  });
});

// ======> delete director with given id
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  let result = Joi.validate({ id }, directorJoi.id);

  // return if fails to validate
  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }

  result = result.value;
  Director.destroy({
    where: {
      id,
    },
  }).then((count) => {
    count === 0 ? res.sendStatus(400) : res.sendStatus(200);
  });
});

module.exports = router;
