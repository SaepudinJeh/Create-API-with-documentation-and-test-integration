const createError = require("http-errors");

const { User } = require("../models");
const { userValidation } = require("../validations");

module.exports = async (req, res, next) => {
  try {
    const dataUser = await userValidation.validateAsync(req?.body);

    const user = new User(dataUser);

    await user.save();

    return res.status(201).json({
      statusCode: 201,
      message: "Created User Successfully",
    });
  } catch (error) {
    console.log("error signup", error?.message);
    return next(createError(error));
  }
};
