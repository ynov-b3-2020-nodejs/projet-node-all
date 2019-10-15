const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_CONNECTION, {useNewUrlParser: true});

const tokenSchema = new mongoose.Schema({
    token_id: Number,
    user_id: Number,
    token: String
});

module.exports = tokenSchema;