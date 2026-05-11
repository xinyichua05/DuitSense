const asyncHandler = require('express-async-handler');
const { generateDualProjection } = require('../projection_reward/projection_engine');
const { query } = require('../data_integration/db_config');

// @desc    Get dual projection (current vs improved trajectory)
// @route   GET /api/projection
// @access  Private
const getProjection = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { target_age, monthly_extra_saving } = req.query;

  // Mock fetching user financial profile from DB
  const userProfile = {
    currentAge: 25,
    monthlyIncome: 4500,
    currentEPFBalance: 30000,
    currentPersonalSavings: 5000,
    monthlySavingsRate: 500 // RM500 per month currently
  };

  const params = {
    ...userProfile,
    targetAge: parseInt(target_age) || 65,
    additionalMonthlySavings: parseInt(monthly_extra_saving) || 0
  };

  const projectionData = generateDualProjection(params);

  res.status(200).json({
    success: true,
    data: projectionData
  });
});

// @desc    Update improved projection baseline from completed challenge
// @route   POST /api/projection/update-improved
// @access  Private
const updateImprovedBaseline = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { savedAmount } = req.body;

  if (!savedAmount) {
    res.status(400);
    throw new Error('savedAmount is required');
  }

  // Mock updating user's base savings rate in DB
  await query('UPDATE users SET monthly_savings_rate = monthly_savings_rate + $1 WHERE id = $2', [savedAmount, userId]);

  res.status(200).json({
    success: true,
    message: 'Projection baseline updated successfully'
  });
});

module.exports = {
  getProjection,
  updateImprovedBaseline
};
