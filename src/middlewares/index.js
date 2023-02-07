const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const jwtValidate = require("./jwtValidate");

module.exports = {
  middlewares: (app) => {
    if (process.env.NODE_ENV !== "test") {
      app.use(morgan("dev"));
    }

    app.use(cors());
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
  },
  jwtValidate,
};
