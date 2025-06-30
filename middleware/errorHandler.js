const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case 400:
      res.json({
        title: `Validation Error`,
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    default:
      res.status(statusCode).json({
        title: "Server Error",
        message: err.message,
        stackTrace: err.stack,
      });
  }
};

module.exports = errorHandler;
