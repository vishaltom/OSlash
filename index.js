const express = require('express');
const bodyParser = require('body-parser');
const database = require('./database');
const userRoute = require('./routes/userRoute');
const tweetRoute = require('./routes/tweetRoute');
const adminRoute = require('./routes/adminRoute');
const superAdminRoute = require('./routes/superAdminRoute');
const app = express();
const port = 8000;
database();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/user/tweets', tweetRoute);
app.use('/user', userRoute);
app.use('/admin', adminRoute);
app.use('/superadmin', superAdminRoute);

app.listen(port, () => {
  console.log(`Listening ${port}`);
});
