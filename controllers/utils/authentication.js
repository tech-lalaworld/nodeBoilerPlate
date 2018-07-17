const jwt = require('jsonwebtoken');

// Middleware to setting jwt token
const setToken = (req, res, next) => {
  const bearerHeader = req.headers.authorization;
  // check if bearer is undefined
  if (typeof bearerHeader !== 'undefined') {
    // Split at space
    const bearer = bearerHeader.split(' ');
    // get token from array
    const bearerToken = bearer[1];
    // set the token
    req.token = bearerToken;
    // next middleware
    next();
  } else {
    // Forbidden
    res.status(403).json({
      msg: 'forbidden',
    });
  }
  return 0;
};

// Middleware to verify jwt token
const verifyToken = (req, res, next) => {
  jwt.verify(req.token, process.env.SECRET, (err) => {
    if(err) {
      res.sendStatus(403);
    } else {
      next();
    }
  });
};

// Middleware to gennerate jwt access token
const generateToken = (req, res, next) => {
  jwt.sign({ foo: 'bar' }, process.env.SECRET, { expiresIn: '1200s' }, (err, token) => {
    if(err) {
      res.status().json({
        result: err
      });
    }
    req.token = token;
    next();
  });
};

// sends csrf and jwt tokens
const getTokens = (req, res) => {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  res.locals.csrftoken = req.csrfToken();
  res.status(200).json({
    msg: 'welcome to node boiler plate',
    csrfToken: req.csrfToken(),
    jwt: req.token,
  });
};

module.exports = {
  verifyToken,
  setToken,
  generateToken,
  getTokens,
};