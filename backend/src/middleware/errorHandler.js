export function errorHandler(error, _req, res, _next) {
  res.status(500).json({
    code: "INTERNAL_ERROR",
    message: error?.message || "Unexpected server error.",
  });
}
