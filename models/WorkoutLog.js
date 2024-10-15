const mongoose = require('mongoose');

const workoutLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  activity: { type: String, required: true },
  duration: { type: Number, required: true }, // Duration in minutes
  caloriesBurned: { type: Number, required: true }, // Calories burned during the workout
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('WorkoutLog', workoutLogSchema);
