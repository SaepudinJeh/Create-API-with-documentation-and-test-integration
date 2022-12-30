const sqlLite3 = require("sqlite3").verbose();
const path = require("path");

// connect database
const db = new sqlLite3.Database(
  path.resolve(__dirname, "../db/users.db"),
  (err) => {
    if (err) return console.error("error", err.message);
  }
);

// create Table
const script = `CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL,
  password TEXT NOT NULL
);`;

db.run(script);
