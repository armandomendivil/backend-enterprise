const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Documents = new Schema({
  name: {
    type: String,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isActive: {
    type: Boolean,
  },
});

Documents.pre('save', function (next) {
  let document = this;
  document.isActive = true;
  next();
});

module.exports = mongoose.model('Documents', Documents, 'documents');
