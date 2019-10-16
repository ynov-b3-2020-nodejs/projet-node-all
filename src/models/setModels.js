const mongoose = require('mongoose');

const userSchema = require('../services/UserDAO');

// #TODO Appeler cette fonction après le mongoose.connect
function setModels() {
    mongoose.model( 'User', userSchema)
}

module.exports = setModels;
