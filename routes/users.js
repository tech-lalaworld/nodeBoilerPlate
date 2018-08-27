const express = require('express');
const user = require('../controllers/users');
const validate = require('../controllers/validator');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    msg: 'Welcome to Node BoilerPlate'
  });
});

router.get('/:username', validate.getUser, user.getUser);
router.post('/register', validate.register, user.register);

router.post('/login', validate.login, user.login, user.sendToken);
router.put('/update', user.verifyToken, validate.updateUser, user.update);

module.exports = router;
