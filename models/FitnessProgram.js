const mongoose = require('mongoose');

const fitnessProgramSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true }, // Duration in days
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('FitnessProgram', fitnessProgramSchema);
