const Joi = require("joi");

const updateEventValidation = Joi.object({
  _id: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
  name: Joi.string().optional(),
  date: Joi.date().optional(),
  startTime: Joi.string().optional(),
  endTime: Joi.string().optional(),
});

module.exports = updateEventValidation;
