const bcrypt = require("bcrypt");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");

const { User } = require("../models");
const { userValidation } = require("../validations");

module.exports = async (req, res, next) => {
  try {
    const { email, password } = await userValidation.validateAsync(req?.body);

    const user = await User.findOne({ email });

    console.log("userrr", user);

    if (!user) {
      return next(createError.BadRequest("Email not registered"));
    }

    const isPasswordMatch = bcrypt.compare(password, user?.password);
    if (!isPasswordMatch) {
      return next(createError.BadRequest("Password not Matching"));
    }

    const token = jwt.sign(
      { _id: user?._id, email: user?.email },
      process.env.SECRET_JWT
    );

    return res.status(200).json({
      statusCode: 200,
      token,
    });
  } catch (error) {
    console.log("error login", error?.message);
    return next(createError(error));
  }
};
