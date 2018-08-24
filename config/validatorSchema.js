const Joi = require('joi');

const ValidateRegister = Joi.object().keys({
  username: Joi.string().alphanum().min(3).max(30),
  password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
  location: Joi.string().required()
}).with('username', 'password');

const ValidateGetUser = Joi.object().keys({
  username: Joi.string().alphanum().min(3).max(30).required()
});

const ValidateUpdateUser = Joi.object().keys({
  username: Joi.string().alphanum().min(3).max(30),
  location: Joi.string().required()
});
exports = module.exports = {
  ValidateRegister,
  ValidateGetUser,
  ValidateUpdateUser
};