const mongoose = require('mongoose');

module.exports = function () {
  mongoose.connect('mongodb://localhost:27017/test', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
  console.log('* Connection Initiated *');

  mongoose.connection.on('error', () => {
    console.log('* Database Connectivity Error *');
  });
  mongoose.connection.on('connected', () => {
    console.log('* Connected *');
  });
  mongoose.connection.on('disconnected', () => {
    console.log('* Disconnected *');
  });
};
