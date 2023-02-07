const createError = require("http-errors");
const { Event } = require("../../models");
const moment = require("moment");

module.exports = async (req, res, next) => {
  try {
    const events = await Event.find({});

    const now = moment();

    const activitiesWithStatus = events.map((event) => {
      const currentDate = moment(event.date).format("YYYY-MM-DD");

      const start = moment(
        currentDate + " " + event.startTime,
        "YYYY-MM-DD HH:mm"
      );
      const end = moment(currentDate + " " + event.endTime, "YYYY-MM-DD HH:mm");

      let status;
      if (now.isBefore(start)) {
        status = "Belum Dilaksanakan";
      } else if (now.isBetween(start, end)) {
        status = "Sedang Dilaksanakan";
      } else if (now.isAfter(end)) {
        status = "Telah Dilaksanakan";
      }

      return {
        ...event.toObject(),
        status,
      };
    });

    res.status(200).json({
      statusCode: 200,
      events: activitiesWithStatus,
    });
  } catch (error) {
    console.log("error login", error?.message);
    return next(createError(error));
  }
};
