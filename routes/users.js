const express = require('express');
const user = require('../controllers/users');
const jwtToken = require('../controllers/utils/authentication');
const validate = require('../controllers/validator');

const router = express.Router();

router.get('/', jwtToken.generateToken, jwtToken.getTokens);

router.use(jwtToken.setToken, jwtToken.verifyToken);

router.post('/register', validate.register, user.register);
router.get('/:username', validate.getUser, user.getUser);
router.post('/insert', user.addInfo);
router.put('/update', validate.updateUser, user.update);

module.exports = router;
