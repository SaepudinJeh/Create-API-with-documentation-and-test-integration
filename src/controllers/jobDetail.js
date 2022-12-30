const createHttpError = require("http-errors");
const request = require("request");

module.exports = async (req, res, next) => {
  const jobId = req.params?.id;
  const url = `http://dev3.dansmultipro.co.id/api/recruitment/positions/${jobId}`;

  request.get(url, (error, response, body) => {
    if (error) {
      return next(createHttpError.BadRequest("Failed to get data job detail"));
    } else {
      const data = JSON.parse(body);

      res.json({
        statusCode: 200,
        data,
      });
    }
  });
};
