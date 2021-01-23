const express = require('express');
const router = express.Router();
const {
  userSignUp,
  userSignIn,
  getUser,
} = require('../controller/authController');

router.post('/signup', userSignUp);
router.post('/signin', userSignIn);
router.get('/id=:id', getUser);

module.exports = router;
