const Tweet = require('../models/Tweet');
const ActionLog = require('../models/ActionLog');
const AuditLog = require('../models/AuditLog');

exports.getUserTweets = async (req, res) => {
  const tweets = await Tweet.find({ user: req.user }, 'text');
  if (!tweets) {
    return res
      .status(500)
      .json({ status: false, message: 'Error while fetching user tweets' });
  }
  return res.status(200).json({
    status: true,
    message: `Tweets retrieved successfully`,
    tweets: tweets,
  });
};

exports.addNewUserTweet = (req, res) => {
  const tweet = new Tweet({
    user: req.user,
    text: req.body.text,
  });
  tweet.save((err, tweet) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Error occured while adding tweet',
      });
    }
    const actionLog = new ActionLog({
      user: req.user,
      operation: 'insert',
      tweet: tweet._id,
    });
    actionLog.save();
    return res.status(200).json({
      status: true,
      tweet: tweet,
      message: 'Tweet added successfully',
    });
  });
};

exports.getUserTweetById = (req, res) => {
  const id = req.params.id;
  Tweet.findById(id, 'text', (err, tweet) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Error occured while updating tweet',
      });
    }
    return res.status(200).json({
      status: true,
      tweet: tweet,
      message: 'Tweet retrieved successfully',
    });
  });
};

exports.updateUserTweet = (req, res) => {
  const id = req.params.id;
  Tweet.findByIdAndUpdate(id, { text: req.body.text }, (err, tweet) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Error occured while updating tweet',
      });
    }
    const actionLog = new ActionLog({
      user: req.user,
      operation: 'update',
      tweet: tweet._id,
    });
    actionLog.save();
    return res.status(200).json({
      status: true,
      message: 'Tweet updated successfully',
    });
  });
};

exports.deleteUserTweet = (req, res) => {
  const id = req.params.id;
  Tweet.findByIdAndDelete(id, (err, tweet) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Error occured while deleting tweet',
      });
    }
    const actionLog = new ActionLog({
      user: req.user,
      operation: 'delete',
      tweet: tweet._id,
    });
    actionLog.save((err, log) => {
      const auditLog = new AuditLog({
        action: log._id,
        status: 'Deleted',
        actionBy: req.user,
      });
      auditLog.save();
    });
    return res.status(200).json({
      status: true,
      message: 'Tweet deleted successfully',
    });
  });
};
