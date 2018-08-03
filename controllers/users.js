const dummyInfo = require('../models/users');
// const Joi = require('./utils/joiTest');

const getInfo = (req, res, next) => {
  dummyInfo.findById('')
  .then(usr => {
    if(!usr) {
      return res.status(404).json({
        msg: 'No such user in the record',
      });
    }

    res.status(200).json({
      msg: 'info found successfully',
      result: usrInfo,
    });

  })
  .catch(err => {
    err.msgToClient = 'Error in fetching user Info';
    err.status = 404;
    next(err);
  });
};

const updateInfo = async(req, res) => {
  Joi.validate(req.info, Joi.string().required().min(10));
  try {
    const updatedUsr = await dummyInfo.findOne({ email: req.body.email });
    res.status(200).json({
      msg: 'user info updated successfully',
      result: updatedUsr.info,
    });
  } catch(err) {
    err.status = 401;
    err.msgToClient = 'Unauthorised Access';
    next(err);
  }
};

const addInfo = async(req, res) => {
  const { info } = req.body;
  const userId = req.decoded;
  Joi.validate(req.info, Joi.string().required().min(10));
  try {
    const newUser = await dummyInfo.findByIdAndUpdate(userId, { info }, { new: true });
    res.status(201).json({
      msg: 'user added successfully',
      result: newUser,
    });
  } catch(err) {
    err.status = 400;
    err.msgToClient = 'Error while updating user';
    next(err);
  }
};

module.exports = {
  getInfo,
  addInfo,
  updateInfo,
};
