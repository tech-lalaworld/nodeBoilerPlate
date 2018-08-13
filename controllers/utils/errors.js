const logError = (err, req, res, next) => {
  console.error(err.stack);
  next(err);
}

const errorHandler = (err, req, res, next) => {
  res.status(err.status || 400).json({ msg: err.msgToClient || 'Something went wrong'});
}

const handleUncaughtExceptions = (error = {}) => {
  if (error.message != null) {
    console.log(error.message)
  }

  if (error.stack != null) {
    console.log(error.stack)
  }
}

exports = module.exports = {
  logError,
  errorHandler,
  handleUncaughtExceptions
}