const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  goalType: { type: String, enum: ['weekly', 'monthly'], required: true },
  description: { type: String, required: true },
  targetValue: { type: Number, required: true }, // e.g., target distance or time
  achieved: { type: Boolean, default: false },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, required: true },
});

module.exports = mongoose.model('Goal', goalSchema);
