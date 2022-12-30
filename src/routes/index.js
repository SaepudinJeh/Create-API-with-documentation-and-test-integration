const signup = require("./signup");

module.exports = (app) => {
  app.use(signup);
};
