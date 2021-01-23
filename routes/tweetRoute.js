const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../controller/authController');
const {
  getUserTweets,
  addNewUserTweet,
  getUserTweetById,
  updateUserTweet,
  deleteUserTweet,
} = require('../controller/tweetController');
const { tweetValidation } = require('../controller/tweetValidation');

router.get('', isAuthenticated, getUserTweets);

router.post('/new', isAuthenticated, tweetValidation, addNewUserTweet);

router.get('/id=:id', isAuthenticated, getUserTweetById);

router.post('/id=:id', isAuthenticated, tweetValidation, updateUserTweet);

router.delete('/id=:id', isAuthenticated, deleteUserTweet);

module.exports = router;
