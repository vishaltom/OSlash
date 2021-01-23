const express = require('express');
const router = express.Router();
const {
  userSignUp,
  userSignIn,
  getUser,
} = require('../controller/authController');
const {
  loginValidation,
  registerValidation,
} = require('../controller/authValidation');

router.post('/signup', registerValidation, userSignUp);
router.post('/signin', loginValidation, userSignIn);
router.get('/id=:id', getUser);

module.exports = router;
