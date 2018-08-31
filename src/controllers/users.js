const User = require('../models/users');
const jwt = require('jsonwebtoken');

const sendToken = (req, res) => {
  jwt.sign({ foo: 'bar' }, process.env.SECRET, { expiresIn: '1200s' }, (err, token) => {
    if(err) {
      res.status(400).json({
        result: 'Could not login'
      });
    }
    res.status(200).json({token});
  });
};

const verifyToken = (req, res, next) => {
  let token = null;
  const bearerHeader = req.headers.authorization;
  // check if bearer is undefined
  if (typeof bearerHeader !== 'undefined') {
    // Split at space
    const bearer = bearerHeader.split(' ');
    // get token from array
    const bearerToken = bearer[1];
    // set the token
    token = bearerToken;
  } else {
    // Forbidden
    res.status(403).json({
      msg: 'forbidden'
    });
  }
  
  jwt.verify(token, process.env.SECRET, (err) => {
    if(err) {
      return res.status(403).json({msg: 'forbidden'});
    }
    next();
  });
};

const login = async(req, res, next) => {
  const username = req.parsed.username;
  let foundUser = null;
  
  try {
    foundUser = await User.findOne({username});    
  } catch (error) {
    return res.status(404).json({
      msg: 'Username or password do not match'
    });
  }

  if(foundUser === null || foundUser.password !== req.parsed.password) {
    return res.status(404).json({
      msg: 'Username or password do not match'
    });
  }
  next();
};

const getUser = async(req, res) => {
  const username = req.params.username;
  try{
    const user = await User.findOne({username});
    if(user === null) {
      return res.status(404).json({
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

  }
  catch(err) {
    err.msgToClient = 'Error in fetching user Info';
    err.status = 404;
    next(err);
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
  const username = req.parsed.username;
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
      msg: 'User successfuly updated',
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

module.exports = {
  login,
  getUser,
  update,
  register,
  sendToken,
  verifyToken
};
