//TODO modèle user -> attendre la BDD
const mongoose = require('mongoose');
const DB = require('../../DB');

const userSchema = new mongoose.Schema({
    mail: { type: 'string', unique: true, required: true },
    password: { type: 'sting', required: true },
    firstname: { type: 'string', required: true },
    lastname: { type: 'string', required: true },
    isAbsent: { type: 'boolean', required: true },
    imageURL: { type: 'string'}
});


module.exports = userSchema;
