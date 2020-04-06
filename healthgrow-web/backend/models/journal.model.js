const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const journalSchema = new Schema({
  title: {
    type: String
  },
  text: {
    type: String
  },
}, {
  timestamps: true,
});

const Journal = mongoose.model('Journal', journalSchema);

module.exports = Journal;