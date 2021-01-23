const mongoose = require('mongoose');
const logSchema = require('./Log');

const actionLogSchema = logSchema({
  tweet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tweet',
  },
  newText: {
    type: String,
  },
});

module.exports = new mongoose.model('ActionLog', actionLogSchema);
