const errorMiddleware = (err, req, res, next) => {
  return res.status(err.statusCode || 500).json({
    success: false,
    message:
      process.env.NODE_ENV === "production"
        ? "Server error"
        : err.message || "Server error",
  });
};

export default errorMiddleware;
