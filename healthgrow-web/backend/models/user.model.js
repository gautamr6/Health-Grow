const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userScehma = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {type: String, required: true },
  name: { type: String },
}, {
  timestamps: true,
});

const User = mongoose.model('User', userScehma);

module.exports = User;