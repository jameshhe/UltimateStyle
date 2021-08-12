import ErrorResponse from "../utils/errorResponse.js";

export const errorHandler = (err, req, res, next) => {
  var error = err;

  // log to console for dev
  //console.log(err);

  // Mongoose CastError (Cant find resource)
  if (err.name === "CastError") {
    const message = `Resource not found with id of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }
  // Mongoose Validation Error
  else if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  } else if (err.code === 11000) {
    const message = "Duplicate usernames (email addresses) not allowed";
    error = new ErrorResponse(message, 400);
  }
  //Respondign with Handled Error
  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
};