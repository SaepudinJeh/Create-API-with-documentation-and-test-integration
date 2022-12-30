require("dotenv").config();
const createError = require("http-errors");
const express = require("express");

const routes = require("./routes");
const { middlewares } = require("./middlewares");

const app = express();

middlewares(app);
routes(app);

app.use((req, res, next) => {
  const error = createError.NotFound();
  next(error);
});

app.use((error, req, res, next) => {
  res.statusCode = error.statusCode;
  res.json({
    statusCode: error.statusCode,
    message: error.message,
  });
});

app.listen(process.env.PORT, () => {
  console.info(`Server running on port ${process.env.PORT}`);
});
