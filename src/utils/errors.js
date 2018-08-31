const winston = require('winston');
const logError = (err, req, res, next) => {
  winston.error(err.stack);
  next(err);
}

const errorHandler = (err, req, res, next) => {
  res.status(err.status || 400).json({ msg: err.msgToClient || 'Something went wrong'});
}

const handleUncaughtExceptions = (error = {}) => {
  // Should Perform graceful shutdown of server
  if (error.message != null) {
    winston.log(error.message)
  }

  if (error.stack != null) {
    winston.log(error.stack)
  }
}

exports = module.exports = {
  logError,
  errorHandler,
  handleUncaughtExceptions
}