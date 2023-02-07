const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const createHttpError = require("http-errors");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      requred: true,
      unique: true,
    },
    password: {
      type: String,
      requred: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) {
    return next();
  }

  bcrypt.hash(
    user?.password,
    parseInt(process.env.HASH_PASSWORD),
    (err, hash) => {
      if (err) {
        return next(createHttpError(err));
      }

      user.password = hash;
      next();
    }
  );
});

const User = mongoose.model("User", userSchema);

module.exports = User;
