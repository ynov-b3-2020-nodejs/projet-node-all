require('dotenv').config();
const mongoose = require('mongoose');
const mongoURI = process.env.MONGODB_URI;
const options = {
  keepAlive: true,
  keepAliveInitialDelay: 300000,
  useNewUrlParser: true
};

mongoose.connect(mongoURI, options);

mongoose.connection.on('connected', () => {
  console.log('Mongoose default connection open to ' + mongoURI);
});

mongoose.connection.on('error', (err) => {
  console.log('handle mongo errored connections: ' + err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose default connection disconnected');
});
