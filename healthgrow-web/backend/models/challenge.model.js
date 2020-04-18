var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// TODO: user email /username to get the associated user?
const challengeSchema = new Schema({
    content: { type: String, required: true }
  }, {
    timestamps: true,
    collection: 'challenges'
  });

const Challenge = mongoose.model('Challenge', challengeSchema);
module.exports = Challenge
