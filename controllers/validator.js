const {
  ValidateRegister,
  ValidateGetUser,
  ValidateUpdateUser
} = require('../config/validatorSchema');

const register = (req, res, next) => {
  const {error, value} = ValidateRegister.validate(req.body);
  if(error) {
    res.status(400).json({
      msg: 'Inputs do not meet format'
    });
  } else {
    req.parsed = value;
    next();
  }
};

const getUser = (req, res, next) => {
  const {error, value} = ValidateGetUser.validate(req.params);
  if(error) {
    res.status(400).json({
      msg: 'Inputs do not meet format'
    });
  } else {
    req.params = value;
    next();
  }
};

const updateUser = (req, res, next) => {
  const {error, value} = ValidateUpdateUser.validate(req.body);
  if(error) {
    res.status(400).json({
      msg: 'Inputs do not meet format'
    });
  } else {
    req.params = value;
    next();
  }
};

exports = module.exports = {
  register,
  getUser,
  updateUser
};