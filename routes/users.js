const express = require('express');
const { authenticateToken, authorizeRole } = require('../middleware/auth');

const router = express.Router();

// Route accessible by admin only
router.get('/admin', authenticateToken, authorizeRole(['admin']), (req, res) => {
  res.json({ message: 'Admin access granted' });
});

// Route accessible by regular users
router.get('/user', authenticateToken, authorizeRole(['user', 'admin']), (req, res) => {
  res.json({ message: 'User access granted' });
});

module.exports = router;
