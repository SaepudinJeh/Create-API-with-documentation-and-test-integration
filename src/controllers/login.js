const sqlite3 = require("sqlite3").verbose();
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const path = require("path");
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  // Validate the username and password
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

  const sql = "SELECT * FROM users WHERE username = ?";
  db.get(sql, [username], async (err, row) => {
    if (err) {
      console.error(err.message);
      return next(createError.InternalServerError());
    }

    if (!row) {
      return next(createError.Unauthorized("Invalid username or password"));
    }

    // Compare the hashed password stored in the database with the plain text password
    const isPasswordValid = bcrypt.compareSync(password, row?.password);
    console.log("pass", row);
    console.log("check pass", isPasswordValid);

    if (!isPasswordValid) {
      return next(createError.Unauthorized("Invalid username or password"));
    }

    // If the username and password are valid, generate a JSON web token and send it back to the client
    const token = jwt.sign({ username }, process.env.SECRET_JWT);
    res.status(200).json({ statusCode: 200, token });
  });

  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
  });
};
