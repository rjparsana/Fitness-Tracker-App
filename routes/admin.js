const express = require('express');
const User = require('../models/User');
const FitnessProgram = require('../models/FitnessProgram');
const WorkoutLog = require('../models/WorkoutLog');
const { authenticateToken, authorizeRole } = require('../middleware/auth');

const router = express.Router();

// View aggregate statistics across all users
router.get('/aggregate-stats', authenticateToken, authorizeRole(['admin']), async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalWorkouts = await WorkoutLog.countDocuments();
    const totalCaloriesBurned = await WorkoutLog.aggregate([
      { $group: { _id: null, totalCalories: { $sum: '$caloriesBurned' } } },
    ]);

    res.json({
      totalUsers,
      totalWorkouts,
      totalCaloriesBurned: totalCaloriesBurned[0]?.totalCalories || 0,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching aggregate stats', error: err });
  }
});

// Manage user accounts (activate/deactivate users)
router.put('/manage-users/:userId', authenticateToken, authorizeRole(['admin']), async (req, res) => {
  const { userId } = req.params;
  const { active } = req.body;

  try {
    const user = await User.findByIdAndUpdate(userId, { active }, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ message: `User ${active ? 'activated' : 'deactivated'} successfully`, user });
  } catch (err) {
    res.status(500).json({ message: 'Error managing user', error: err });
  }
});

// Create a fitness program
router.post('/fitness-programs', authenticateToken, authorizeRole(['admin']), async (req, res) => {
  try {
    const program = new FitnessProgram(req.body);
    const savedProgram = await program.save();

    res.status(201).json(savedProgram);
  } catch (err) {
    res.status(500).json({ message: 'Error creating fitness program', error: err });
  }
});

// Get all fitness programs
router.get('/fitness-programs', authenticateToken, authorizeRole(['admin']), async (req, res) => {
  try {
    const programs = await FitnessProgram.find();
    res.json(programs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching programs', error: err });
  }
});

// Delete a fitness program
router.delete('/fitness-programs/:programId', authenticateToken, authorizeRole(['admin']), async (req, res) => {
  try {
    const { programId } = req.params;
    const deletedProgram = await FitnessProgram.findByIdAndDelete(programId);

    if (!deletedProgram) return res.status(404).json({ message: 'Program not found' });

    res.json({ message: 'Program deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting program', error: err });
  }
});

module.exports = router;
