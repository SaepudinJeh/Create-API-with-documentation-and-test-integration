const signup = require("./signup");
const login = require("./login");
const eventRoute = require("./event");

module.exports = (app) => {
  app.use(signup);
  app.use(login);
  app.use(eventRoute);
};
