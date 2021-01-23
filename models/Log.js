const mongoose = require('mongoose');

const logSchema = (schemaDef) =>
  new mongoose.Schema(
    {
      user: {
        type: String,
      },
      operation: {
        type: String,
      },
      ...schemaDef,
    },
    { timestamps: true }
  );

module.exports = logSchema;
