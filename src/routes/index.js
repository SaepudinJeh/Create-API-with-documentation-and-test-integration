const signup = require("./signup");
const login = require("./login");

module.exports = (app) => {
  app.use(signup);
  app.use(login);
};
