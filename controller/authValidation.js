const { body, check, validationResult } = require('express-validator');

exports.loginValidation = [
  body('email', 'Please provide an email').isEmail(),
  body('password', 'Please enter the password').isLength({ min: 1 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).send({ errors: errors, status: false });
    }
    next();
  },
];

exports.registerValidation = [
  body('email', 'Please provide an email').isEmail(),
  body('name', 'Please provide a username').isLength({ min: 1 }),
  body('password', 'Password must of min 8 characters').isLength({ min: 8 }),
  body('phone', 'Phone number should be only contain numbers').isNumeric(),
  body('phone', 'Phone number should be 10-digits').isLength({
    min: 10,
    max: 10,
  }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).send({ errors: errors, status: false });
    }
    next();
  },
];
