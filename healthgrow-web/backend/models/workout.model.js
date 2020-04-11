var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// TODO: user email /username to get the associated user?
const workoutSchema = new Schema({
    workout: { type: String, required: true },
    reps: { type: Number },
    weight: { type: Number },
    img: { data: Buffer, contentType: String },
  }, {
    timestamps: true,
  });

const Workout = mongoose.model('Workout', workoutSchema);
module.exports = Workout