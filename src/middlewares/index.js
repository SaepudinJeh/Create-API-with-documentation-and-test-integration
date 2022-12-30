const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const createHttpError = require("http-errors");

module.exports = {
  middlewares: (app) => {
    app.use(morgan("dev"));
    app.use(cors());
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    // validate jwt
    // app.use((req, res, next) => {
    //   const authHeader = req.headers["authorization"];
    //   const token = authHeader && authHeader.split(" ")[1];
    //   if (token == null) return next(createHttpError.Unauthorized());

    //   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    //     if (err) return next(createHttpError.Forbidden());
    //     req.user = user;
    //     next();
    //   });
    // });
  },
};
