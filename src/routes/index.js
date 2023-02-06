const signup = require("./signup");
const login = require("./login");
const jobDetail = require("./jobDetail");
const listJob = require("./listJob");
const eventRoute = require("./event");

module.exports = (app) => {
  app.use(signup);
  app.use(login);
  app.use(jobDetail);
  app.use(listJob);
  app.use(eventRoute);
};
