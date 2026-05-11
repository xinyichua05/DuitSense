const express = require('express');
const router = express.Router();
const { mockAuth } = require('../middleware/mockAuth');
const {
  getLeaderboard,
  spinWheelEndpoint,
  generateShareCard
} = require('../controllers/leaderboardController');

router.use(mockAuth);

router.get('/friends', getLeaderboard);
router.post('/spin', spinWheelEndpoint);
router.post('/share-card', generateShareCard);

module.exports = router;
