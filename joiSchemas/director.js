const Joi = require('@hapi/joi');

const all = {
  Name: Joi.string().min(2).max(100).required(),
};

const id = {
  id: Joi.number().min(1).required(),
};

module.exports = {
  all,
  id,
};
