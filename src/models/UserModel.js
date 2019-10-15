const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: 'string', unique: true, required: true },
    password: { type: 'sting', required: true },
    firstName: { type: 'string', required: true },
    lastName: { type: 'string', required: true },
    specialization: { type: 'string', required: true},
    class: { type: 'string', required: true},
    group: { type: 'string', required: true},
    isLate: { type: 'boolean' },
    isAbsent: { type: 'boolean', required: true },
    imageURL: { type: 'string'} //TODO: choisir si on stock l'image dans la BDD ou si on chope une url externe
});

module.exports = userSchema;
