const User = require('../models/User');
const jwt = require('jsonwebtoken');
const AccessLog = require('../models/AccessLog');

exports.userSignUp = (req, res) => {
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      res.status(500).json({
        status: false,
        message: 'Error occured while registering user',
      });
    }
    const accessLog = new AccessLog({
      user: user._id,
      operation: 'signup',
    });
    accessLog.save();
    res.status(200).json({
      status: true,
      user: { _id: user._id, name: user.name },
      message: 'User registered successfully',
    });
  });
};

exports.getUser = (req, res) => {
  const id = req.params.id;
  User.findById(id, 'name email phone dob', (err, user) => {
    if (!user || err) {
      res.status(500).json({
        status: false,
        message: 'User does not exist',
      });
      return;
    }

    res.status(200).json({
      status: true,
      user: user,
      message: 'User details found!',
    });
  });
};

exports.userSignIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email }, 'email password name');
  if (!user) {
    res.status(500).json({
      status: false,
      message: 'User does not exist',
    });
  }
  if (user.email === email && user.password === password) {
    const token = jwt.sign(String(user._id), 'secret');
    const accessLog = new AccessLog({
      user: user._id,
      operation: 'signin',
    });
    accessLog.save();
    return res
      .status(200)
      .json({ status: true, message: `Welcome ${user.name}`, token });
  }
};

exports.isAuthenticated = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null)
    return res
      .status(401)
      .json({ status: false, message: 'Please provide token !' });

  jwt.verify(token, 'secret', (err, user) => {
    if (err)
      return res
        .status(403)
        .json({ status: false, message: 'Invalid / Expired token !' });
    req.user = user;
    next();
  });
};
