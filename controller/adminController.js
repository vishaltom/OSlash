const User = require('../models/User');
const Tweet = require('../models/Tweet');
const ActionLog = require('../models/ActionLog');

exports.updateUserDetails = (req, res) => {
  User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      dob: req.body.dob,
    },
    (err, user) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: 'Error occured while updating user details',
        });
      }
      return res.status(200).json({
        status: true,
        message: 'User details updated successfully',
      });
    }
  );
};
exports.getTweetsOfAllUsers = async (req, res) => {
  const tweets = await Tweet.find({}).populate('user', 'name');
  if (!tweets) {
    return res
      .status(500)
      .json({ status: false, message: 'Error while fetching tweets' });
  }
  return res.status(200).json({
    status: true,
    message: `Tweets retrieved successfully`,
    tweets: tweets,
  });
};

exports.getTweetById = (req, res) => {
  const id = req.params.id;
  console.log(id);
  Tweet.findById(id, (err, tweet) => {
    if (!tweet) {
      return res
        .status(500)
        .json({ status: false, message: 'Error while fetching tweet' });
    }
    const actionLog = new ActionLog({
      user: 'Admin',
      operation: 'read',
      tweet: id,
    });
    actionLog.save();
    return res.status(200).json({
      status: true,
      message: `Tweet retrieved successfully`,
      tweet: tweet,
    });
  });
};
exports.updateTweetById = (req, res) => {
  const id = req.params.id;
  const actionLog = new ActionLog({
    user: 'Admin',
    operation: 'update',
    tweet: id,
    newText: req.body.text,
  });
  actionLog.save();
  return res.status(200).json({
    status: true,
    message: `Tweet update initialised`,
  });
};
exports.deleteTweetById = (req, res) => {
  const id = req.params.id;
  const actionLog = new ActionLog({
    user: 'Admin',
    operation: 'delete',
    tweet: id,
  });
  actionLog.save();
  return res.status(200).json({
    status: true,
    message: `Tweet delete initialised`,
    tweet: tweet,
  });
};
