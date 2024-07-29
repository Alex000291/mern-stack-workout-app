const mongoose = require('mongoose');

const schemas = mongoose.Schema

const workoutSchema = new schemas({
  title: {
    type: String,
    required: true
  },
  reps: {
    type: Number,
    required: true
  },
  load: {
    type: Number,
    required: true
  },
}, { timestamps: true })

module.exports = mongoose.model('Workout', workoutSchema)