const createHttpError = require("http-errors");
const request = require("request");

module.exports = async (req, res, next) => {
  const description = req.query.description;
  const location = req.query.location;
  const fullTime = req.query.full_time;
  const page = req.query.page;

  let url = "http://dev3.dansmultipro.co.id/api/recruitment/positions.json";
  if (description || location || fullTime || page) {
    url += "?";
    if (description) {
      url += `description=${description}`;
    }
    if (location) {
      url += `&location=${location}`;
    }
    if (fullTime) {
      url += `&full_time=${fullTime}`;
    }
    if (page) {
      url += `&page=${page}`;
    }
  }

  request.get(url, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      return res.json({
        statusCode: 200,
        data: JSON.parse(body),
      });
    }

    return next(createHttpError.BadRequest());
  });
};
