const { eventController } = require("../controllers");

const {
  createEventController,
  findEventController,
  updateEventController,
  deleteEventController,
} = eventController;

const router = require("express").Router();

router.post("/event", createEventController);
router.get("/events", findEventController);
router.put("/event/:id", updateEventController);
router.delete("/event/:id", deleteEventController);

module.exports = router;
