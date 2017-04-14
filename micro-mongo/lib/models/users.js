const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var Users = new Schema({
  email: String,
  password: String,
});

module.exports = mongoose.model('Users', Users, 'users');
