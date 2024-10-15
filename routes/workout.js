const express = require('express');
const WorkoutLog = require('../models/WorkoutLog');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Create a workout log
router.post('/', authenticateToken, async (req, res) => {
  try {
    const newLog = new WorkoutLog({ ...req.body, user: req.user.userId });
    const savedLog = await newLog.save();
    res.status(201).json(savedLog);
  } catch (err) {
    res.status(500).json({ message: 'Error creating workout log', error: err });
  }
});

// Get all workout logs for the authenticated user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const logs = await WorkoutLog.find({ user: req.user.userId });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching workout logs', error: err });
  }
});

// Update a workout log
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const updatedLog = await WorkoutLog.findOneAndUpdate(
      { _id: req.params.id, user: req.user.userId },
      req.body,
      { new: true }
    );
    if (!updatedLog) return res.status(404).json({ message: 'Workout log not found' });
    res.json(updatedLog);
  } catch (err) {
    res.status(500).json({ message: 'Error updating workout log', error: err });
  }
});

// Delete a workout log
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const deletedLog = await WorkoutLog.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId,
    });
    if (!deletedLog) return res.status(404).json({ message: 'Workout log not found' });
    res.json({ message: 'Workout log deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting workout log', error: err });
  }
});

module.exports = router;
