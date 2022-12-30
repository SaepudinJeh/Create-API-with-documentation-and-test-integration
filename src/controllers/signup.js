const sqlite3 = require("sqlite3").verbose();
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const path = require("path");

module.exports = async (req, res, next) => {
  console.log("body", req.body);

  const { username, password } = req.body;

  if (!username || !password) {
    return next(createError.BadRequest("Username and password are required"));
  }

  // Connect to the database
  const db = new sqlite3.Database(
    path.resolve(__dirname, "../db/users.db"),
    (err) => {
      if (err) {
        console.error(err.message);
        return next(
          createError.InternalServerError("Failed to connect to the database")
        );
      }
    }
  );

  // Check if the username is already taken
  const checkUsernameQuery = `SELECT COUNT(*) as count FROM users WHERE username = ?`;
  db.get(checkUsernameQuery, [username], (err, row) => {
    if (err) {
      console.error(err.message);
      return next(
        createError.InternalServerError(
          "Failed to check if the username is taken"
        )
      );
    }

    if (row.count > 0) {
      return next(createError.BadRequest("Username is already taken"));
    }

    // Insert the new user into the database
    const insertUserQuery = `INSERT INTO users(username, password) VALUES(?, ?)`;

    // hash password
    const hashPassword = bcrypt.hash(password, 10);

    db.run(insertUserQuery, [username, hashPassword], (err) => {
      if (err) {
        console.error(err.message);
        return next(createError.InternalServerError("Failed to create user"));
      }

      res
        .status(201)
        .json({ statusCode: 201, message: "User created successfully" });
    });
  });
};
