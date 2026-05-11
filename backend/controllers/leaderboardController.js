const asyncHandler = require('express-async-handler');
const { getFriendsLeaderboard, processUserSpin } = require('../services/leaderboard_engine');

// @desc    Get friends leaderboard
// @route   GET /api/leaderboard/friends
// @access  Private
const getLeaderboard = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const leaderboard = await getFriendsLeaderboard(userId);

  res.status(200).json({
    success: true,
    data: leaderboard
  });
});

// @desc    Spin the wheel
// @route   POST /api/leaderboard/spin
// @access  Private
const spinWheelEndpoint = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  
  const claimData = await processUserSpin(userId);

  res.status(200).json({
    success: true,
    data: claimData
  });
});

// @desc    Generate shareable summary card payload
// @route   POST /api/leaderboard/share-card
// @access  Private
const generateShareCard = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const persona = req.user.persona_type;

  // Mocking fetch user week stats
  const payload = {
    rank: 2,
    xp: 320,
    persona_type: persona,
    top_stat: '7-Day Streak'
  };

  res.status(200).json({
    success: true,
    data: payload
  });
});

module.exports = {
  getLeaderboard,
  spinWheelEndpoint,
  generateShareCard
};
