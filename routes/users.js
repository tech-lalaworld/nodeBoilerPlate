const express = require('express');
const user = require('../controllers/users');
const jwtToken = require('../controllers/utils/authentication');
const {
  logError,
  errorHandler
} = require('../controllers/utils/errors');

const router = express.Router();

router.get('/', jwtToken.generateToken, jwtToken.getTokens);

// router.use(jwtToken.setToken, jwtToken.verifyToken);

router.get('/show', user.getInfo);
router.post('/insert', user.addInfo);
router.put('/update', user.updateInfo);

router.use(logError);
router.use(errorHandler);
module.exports = router;
