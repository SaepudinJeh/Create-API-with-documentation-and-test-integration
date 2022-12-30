const { listJobController } = require("../controllers");
const { jwtValidate } = require("../middlewares");

const router = require("express").Router();

router.get("/jobs", jwtValidate, listJobController);

module.exports = router;
