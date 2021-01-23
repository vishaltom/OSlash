const mongoose = require('mongoose');
const tweetSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    text: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model('Tweet', tweetSchema);
