const express = require('express');
const WorkoutLog = require('../models/WorkoutLog');
const Goal = require('../models/Goal');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get workout stats by date range
router.get('/date-range', authenticateToken, async (req, res) => {
    console.log('Authenticated User:', req.user); // Check the user object from the token
  
    const { startDate, endDate } = req.query;
    try {
      const logs = await WorkoutLog.find({
        user: req.user.userId, // Ensure the user matches the log
        // date: {
        //   $gte: new Date(new Date(startDate).setHours(0, 0, 0, 0)),
        //   $lte: new Date(new Date(endDate).setHours(23, 59, 59, 999)),
        // },
      });
  
      console.log('Logs found:', logs);
      res.json(logs);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching logs', error: err });
    }
  });
  
  

// Get stats by activity type
router.get('/activity-type', authenticateToken, async (req, res) => {
    console.log('Authenticated User:', req.user.userId);
  
    const { activity } = req.query;
    try {
      const logs = await WorkoutLog.find({
        user: req.user.userId,
        activity: activity,
      });
  
      console.log('Logs found:', logs); // Log the result to debug
      res.json(logs);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching logs', error: err });
    }
  });
  

// Get goal achievement status
router.get('/goals-status', authenticateToken, async (req, res) => {
  try {
    const goals = await Goal.find({ user: req.user.userId });

    const achievedGoals = goals.filter(goal => goal.achieved).length;
    const totalGoals = goals.length;

    res.json({
      totalGoals,
      achievedGoals,
      percentageAchieved: ((achievedGoals / totalGoals) * 100).toFixed(2) + '%',
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching goals status', error: err });
  }
});

// Get total calories burned over time
router.get('/calories-burned', authenticateToken, async (req, res) => {
  try {
    const logs = await WorkoutLog.find({ user: req.user.userId });

    const totalCalories = logs.reduce((total, log) => total + log.caloriesBurned, 0);

    res.json({ totalCalories });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching calorie data', error: err });
  }
});

// Get types of workouts logged by user
router.get('/workout-types', authenticateToken, async (req, res) => {
  try {
    const logs = await WorkoutLog.find({ user: req.user.userId });

    const workoutTypes = logs.reduce((types, log) => {
      types[log.activity] = (types[log.activity] || 0) + 1;
      return types;
    }, {});

    res.json(workoutTypes);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching workout types', error: err });
  }
});

module.exports = router;
