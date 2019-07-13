const Joi = require('@hapi/joi');

const all = {
  Title: Joi.string().min(2).max(100).required(),
  Description: Joi.string().min(50).max(400).required(),
  Runtime: Joi.number().min(30).max(300).required(),
  Genre: Joi.string().min(2).max(10).required(),
  Rating: Joi.number().min(0).max(10).required(),
  Metascore: Joi.number().min(0).required(),
  Votes: Joi.number().min(0).required(),
  Gross_Earning_in_Mil: Joi.number().min(0).required(),
  Director: Joi.string().min(3).max(50).required(),
  Actor: Joi.string().min(3).max(50).required(),
  Year: Joi.number().min(1800).max(Date.now()).required(),
};

const id = {
  id: Joi.number().min(1).required(),
};


module.exports = {
  all,
  id,
};
