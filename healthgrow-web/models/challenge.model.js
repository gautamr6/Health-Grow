var mongoose = require('mongoose');

var Schema = mongoose.Schema;


const challengeSchema = new Schema({
    content: {type: String, required: true }, // what model (e.g. workout, journal) achievement is associated with
    pointValue: {type: Number, required: true }, // what field for the model
    timeBegin: { type: Date, required: true }, // <, <=, >, >=, ==
    timeExpire: { type: Date, required: true },
  }, {
    collection: 'challenges'
  });

const Challenge = mongoose.model('Challenge', challengeSchema);
module.exports = Challenge
