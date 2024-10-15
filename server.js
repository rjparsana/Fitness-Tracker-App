const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const workoutRoutes = require('./routes/workout');
const goalRoutes = require('./routes/goal');
const statisticsRoutes = require('./routes/statistics');
const adminRoutes = require('./routes/admin');

dotenv.config();
const app = express();
app.use(express.json());

app.use('/api/admin', adminRoutes);

app.use('/api/statistics', statisticsRoutes);

app.use('/api/workouts', workoutRoutes);
app.use('/api/goals', goalRoutes);

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

app.get('/', (req, res) => {
    res.send('Fitness Tracker APP is running...');
});
