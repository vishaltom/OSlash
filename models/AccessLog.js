const mongoose = require('mongoose');
const logSchema = require('./Log');

const accessLogSchema = logSchema({});

module.exports = new mongoose.model('AccessLog', accessLogSchema);
