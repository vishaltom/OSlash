const { body, check, validationResult } = require('express-validator');

exports.tweetValidation = [
  body('text', 'Please enter the tweet').isLength({ min: 1 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).send({ errors: errors, status: false });
    }
    next();
  },
];
