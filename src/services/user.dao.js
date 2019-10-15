const mongoose = require('mongoose');
const usersSchema = require('./users.model');

usersSchema.statics = {
  create: function(data, cb) {
    const user = new this(data);
    user.save(cb);
  },

  get: function(query, cb) {
    this.find(query, cb);
  },

  getByName: function(query, cb) {
    this.find(query, cb);
  },

  update: function(query, updateData, cb) {
    this.findOneAndUpdate(query, { $set: updateData }, { new: true }, cb);
  },

  delete: function(query, cb) {
    this.findOneAndDelete(query, cb);
  },
};

const usersModel = mongoose.model('Users', usersSchema);
module.exports = usersModel;
