const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return next(createHttpError.Unauthorized());
  console.log("token", token);

  jwt.verify(token, process.env.SECRET_JWT, (err, user) => {
    if (err) return next(createHttpError.Forbidden());
    req.user = user;
    next();
  });
};
