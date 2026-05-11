const asyncHandler = require('express-async-handler');
const { query } = require('../data_integration/db_config');
const { generateChallenges } = require('../ai_personalisation/challenge_generator');
const { calculateStreakStatus, STREAK_BONUS_THRESHOLD } = require('../projection_reward/streak_system');

// @desc    Generate AI challenges
// @route   POST /api/challenges/generate
// @access  Private
const generateUserChallenges = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const persona = req.user.persona_type;

  // In a real scenario, we fetch the user's top categories and recent fails
  const categories = ['Food', 'Shopping'];
  const fails = ['Forgot', 'Too busy'];
  const streak = 3;

  const challenges = await generateChallenges(persona, categories, fails, streak);

  // Store them in DB mocked
  // await query('INSERT INTO challenges ...')

  res.status(200).json({
    success: true,
    data: challenges
  });
});

// @desc    Complete a challenge
// @route   PATCH /api/challenges/:id/complete
// @access  Private
const completeChallenge = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  // Mock checking streak
  const streakStatus = calculateStreakStatus({ activityLog: [{ date: new Date().toISOString() }] });
  
  // Base XP reward
  let xpReward = 20;
  let bonusXP = 0;

  if (streakStatus.currentStreak >= STREAK_BONUS_THRESHOLD) {
    bonusXP = 50;
  }

  // Complete challenge and credit XP
  await query('UPDATE challenges SET status = $1 WHERE id = $2', ['completed', id]);
  await query('UPDATE users SET week_xp = week_xp + $1 WHERE id = $2', [xpReward + bonusXP, userId]);

  res.status(200).json({
    success: true,
    data: {
      message: 'Challenge completed!',
      xpEarned: xpReward,
      bonusXP,
      streak: streakStatus.currentStreak
    }
  });
});

// @desc    Fail a challenge
// @route   PATCH /api/challenges/:id/fail
// @access  Private
const failChallenge = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  const { failReason } = req.body;

  if (!failReason) {
    res.status(400);
    throw new Error('Fail reason is required');
  }

  // Update DB and store reason
  await query('UPDATE challenges SET status = $1, fail_reason = $2 WHERE id = $3', ['failed', failReason, id]);

  res.status(200).json({
    success: true,
    data: {
      message: 'Fail reason recorded for AI adaptation',
      xpPenalty: 0 // No penalty
    }
  });
});

module.exports = {
  generateUserChallenges,
  completeChallenge,
  failChallenge
};
