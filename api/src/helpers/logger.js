const logger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`${timestamp} | ${req.method}: ${decodeURI(req.originalUrl)}`);
  next();
};

module.exports = { logger };
