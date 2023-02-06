const signupController = require("./signup");
const loginController = require("./login");
const detailJobController = require("./jobDetail");
const listJobController = require("./listJob");

const { ...eventController } = require("./events");

module.exports = {
  signupController,
  loginController,
  detailJobController,
  listJobController,
  eventController,
};
