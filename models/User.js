const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    password: {
      type: String,
    },
    phone: {
      type: Number,
    },
    email: {
      type: String,
    },
    dob: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model('User', userSchema);
