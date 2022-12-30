const signup = require("./signup");
const login = require("./login");
const jobDetail = require("./jobDetail");
const listJob = require("./listJob");

module.exports = (app) => {
  app.use(signup);
  app.use(login);
  app.use(jobDetail);
  app.use(listJob);
};
