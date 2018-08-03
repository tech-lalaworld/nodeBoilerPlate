const logError = (err, req, res, next) => {
  console.error(err.stack)
  next(err);
}

const errorHandler = (err, req, res, next) => {
  res.status(err.status || 400).json({ msg: err.msgToClient || 'Something went wrong'});
}

const handleUncaughtExceptions = () => {
  // Graceful Shutdown Server
  console.log('Shutting down server');
}
exports = module.exports = {
  logError,
  errorHandler,
  handleUncaughtExceptions
}