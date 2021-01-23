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

router.get('', isAuthenticated, getUserTweets);

router.post('/new', isAuthenticated, addNewUserTweet);

router.get('/id=:id', isAuthenticated, getUserTweetById);

router.post('/id=:id', isAuthenticated, updateUserTweet);

router.delete('/id=:id', isAuthenticated, deleteUserTweet);

module.exports = router;
