require('dotenv').config();
const mongoose = require('mongoose');
const mongoURI = process.env.MONGODB_URI;
const setModel = require('src/models/setModels');
const options = {
  keepAlive: true,
  keepAliveInitialDelay: 300000,
  useNewUrlParser: true
};

mongoose.connect(mongoURI, options);

mongoose.connection.on('connected', () => {
  console.log('Mongoose default connection open to ' + mongoURI);
//TODO : set models ici
});

mongoose.connection.on('error', (err) => {
  console.log('handle mongo errored connections: ' + err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose default connection disconnected');
});
