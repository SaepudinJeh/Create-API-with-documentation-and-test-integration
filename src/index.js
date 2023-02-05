require("dotenv").config();

const mongoose = require("mongoose");
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

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
  console.log("Mongo connected successfully");
});

app.listen(process.env.PORT, () => {
  console.info(`Server running on port ${process.env.PORT}`);
});
