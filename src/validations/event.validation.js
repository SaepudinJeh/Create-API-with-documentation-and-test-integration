const Joi = require("joi");

const eventValidation = Joi.object({
  name: Joi.string().required(),
  date: Joi.date().required(),
  startTime: Joi.string().required(),
  endTime: Joi.string().required(),
});

module.exports = eventValidation;
