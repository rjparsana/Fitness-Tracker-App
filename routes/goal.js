const express = require('express');
const Goal = require('../models/Goal');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Create a new goal
router.post('/', authenticateToken, async (req, res) => {
  try {
    const newGoal = new Goal({ ...req.body, user: req.user.userId });
    const savedGoal = await newGoal.save();
    res.status(201).json(savedGoal);
  } catch (err) {
    res.status(500).json({ message: 'Error creating goal', error: err });
  }
});

// Get all goals for the authenticated user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const goals = await Goal.find({ user: req.user.userId });
    res.json(goals);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching goals', error: err });
  }
});

// Update a goal
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const updatedGoal = await Goal.findOneAndUpdate(
      { _id: req.params.id, user: req.user.userId },
      req.body,
      { new: true }
    );
    if (!updatedGoal) return res.status(404).json({ message: 'Goal not found' });
    res.json(updatedGoal);
  } catch (err) {
    res.status(500).json({ message: 'Error updating goal', error: err });
  }
});

// Delete a goal
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const deletedGoal = await Goal.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId,
    });
    if (!deletedGoal) return res.status(404).json({ message: 'Goal not found' });
    res.json({ message: 'Goal deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting goal', error: err });
  }
});

module.exports = router;
