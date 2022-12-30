const { signupController } = require("../controllers");

const router = require("express").Router();

router.post("/signup", signupController);

module.exports = router;
