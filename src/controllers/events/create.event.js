const createError = require("http-errors");
const { Event } = require("../../models");
const { eventValidation } = require("../../validations");

module.exports = async (req, res, next) => {
  try {
    const dataEvent = await eventValidation.validateAsync(req?.body);

    const event = new Event(dataEvent);

    event.save();

    return res.status(201).json({
      statusCode: 201,
      message: "Created User Successfully",
    });
  } catch (error) {
    console.log("error login", error?.message);
    return next(createError(error));
  }
};
