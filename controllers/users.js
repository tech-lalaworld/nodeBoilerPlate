const dummyInfo = require('../models/users');
// const Joi = require('utils/joiTest');

const getInfo = async(req, res) => {
  try{
    const usrInfo = await dummyInfo.find({});
    if(usrInfo === null) {
      res.status(404).json({
        msg: 'no user in the data base',
      });
    }

    res.status(200).json({
      msg: 'info found successfully',
      result: usrInfo,
    });
  } catch(err){
    res.status(400).json({
      msg: 'Error in fetching user Info',
      result: err,
    });
  }
};

const updateInfo = async(req, res) => {
  Joi.validate(req.info, Joi.string().required().min(10));
  try {
    const updatedUsr = dummyInfo.findOne({ email: req.body.email });
    res.status(200).json({
      msg: 'user info updated successfully',
      result: updatedUsr.info,
    });
  } catch(err) {
    res.status(401).json({
      msg: 'Unauthorized access',
      result: err,
    });
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
    res.status(400).json({
      msg: 'error while updating user',
      result: err,
    });
  }
};

module.exports = {
  getInfo,
  addInfo,
  updateInfo,
};
