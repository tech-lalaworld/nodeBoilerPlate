const User = require('../models/users');

const getUser = async(req, res) => {
  const username = req.params.username;
  try{
    const user = await User.findOne({username});
    if(user === null) {
      res.status(404).json({
        msg: 'no user in the data base',
      });
    }

    res.status(200).json({
      msg: 'User found successfully',
      result: {
        username,
        location: user.location
      }
    });
  } catch(err){
    res.status(400).json({
      msg: 'Error in fetching user Info',
      result: err,
    });
  }
};

const register = async (req, res) => {
  const user = new User();
  user.username = req.parsed.username;
  user.password = req.parsed.password;
  user.location = req.parsed.location;
  try {
    await user.save();
    res.status(201).json({
      msg: 'User successfuly registered'
    });
  } catch (error) {
    res.status(406).json({
      msg: 'Could not register user'
    });
  }
};

const update = async(req, res) => {
  const username = req.body.username;
  let user = null;
  try {
    user = await User.findOne({username});
  } catch (error) {
    res.status(400).json({
      msg: 'Some error occurred'
    });
  }
  if(user === null) {
    return res.status(404).json({
      msg: 'User not found'
    });
  }

  user.location = req.body.location;
  try {
    await user.save();
    res.status(200).json({
      msg: 'User successfuly registered',
      user: {
        location: user.location
      }
    });
  } catch (error) {
    res.status(406).json({
      msg: 'Could not update user'
    });
  }
};

const addInfo = async(req, res) => {
  const { info } = req.body;
  const userId = req.decoded;
  Joi.validate(req.info, Joi.string().required().min(10));
  try {
    const newUser = await User.findByIdAndUpdate(userId, { info }, { new: true });
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
  getUser,
  addInfo,
  update,
  register
};
