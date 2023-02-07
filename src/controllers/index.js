const signupController = require("./signup");
const loginController = require("./login");

const { ...eventController } = require("./events");

module.exports = {
  signupController,
  loginController,
  eventController,
};
