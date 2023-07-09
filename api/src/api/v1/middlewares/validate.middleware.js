const validateMiddleware = (validationSchema) => async (req, res, next) => {
  if (
    (typeof req.files !== "undefined" && req.files?.length !== 0) ||
    typeof req.file !== "undefined"
  ) {
    return next();
  }
  try {
    req = await validationSchema.unknown(true).validateAsync(req, {
      abortEarly: false,
    });
    next();
  } catch (err) {
    return res.status(400).json(err.details);
  }
};

module.exports = { validateMiddleware };
