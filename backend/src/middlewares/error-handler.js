function notFoundHandler(req, res) {
  res.status(404).json({
    ok: false,
    message: "Route not found.",
  });
}

function errorHandler(err, req, res, next) {
  const statusCode = res.statusCode >= 400 ? res.statusCode : 500;
  const isProduction = process.env.NODE_ENV === "production";

  if (process.env.NODE_ENV !== "test") {
    console.error(err);
  }

  const safeMessage =
    isProduction && statusCode >= 500
      ? "Internal server error."
      : err?.message || "Internal server error.";

  res.status(statusCode).json({
    ok: false,
    message: safeMessage,
  });
}

module.exports = { notFoundHandler, errorHandler };
