const { detailJobController } = require("../controllers");

const router = require("express").Router();

router.get("/job/:id", detailJobController);

module.exports = router;
