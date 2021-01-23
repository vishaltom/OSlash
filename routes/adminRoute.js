const express = require('express');
const router = express.Router();
const { getUser } = require('../controller/authController');
const {
  getTweetsOfAllUsers,
  updateUserDetails,
  getTweetById,
  updateTweetById,
  deleteTweetById,
} = require('../controller/adminController');

router.get('/user/id=:id', getUser);

router.patch('/user/id=:id', updateUserDetails);

router.get('/tweets', getTweetsOfAllUsers);

router.get('/tweets/id=:id', getTweetById);

router.post('/tweets/id=:id', updateTweetById);

router.delete('/tweets/id=:id', deleteTweetById);

module.exports = router;
