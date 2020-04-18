var mongoose = require('mongoose');

var Schema = mongoose.Schema;

const achievementSchema = new Schema({
    model: {type: String, required: true }, // field for what model (e.g. workout, journal) achievement is associated with
    operator: { type: String, required: true }, // <, <=, >, >=, ==
    condition: { type: Number },
  }, {
    timestamps: true,
  });

const Achievement = mongoose.model('Achievement', achievementSchema);
module.exports = Achievement