const asyncHandler = require('express-async-handler');
const { query } = require('../data_integration/db_config');
const { getPeerComparisonData } = require('../data_integration/peer_compare_engine');

// @desc    Create new expense
// @route   POST /api/expenses
// @access  Private
const createExpense = asyncHandler(async (req, res) => {
  const { amount, category, note, timestamp } = req.body;
  const userId = req.user.id;

  if (!amount || !category) {
    res.status(400);
    throw new Error('Amount and category are required');
  }

  // Mock DB Insertion
  const dbResult = await query(
    'INSERT INTO expenses (user_id, amount, category, note, timestamp) VALUES ($1, $2, $3, $4, $5) RETURNING id',
    [userId, amount, category, note, timestamp || new Date()]
  );

  res.status(201).json({
    success: true,
    data: { expense_id: dbResult.rows ? dbResult.rows[0]?.id : Math.floor(Math.random() * 1000) }
  });
});

// @desc    Get expense summary for a specific month
// @route   GET /api/expenses/summary?year=2024&month=5
// @access  Private
const getExpenseSummary = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { year, month } = req.query;

  // Mock response for summary
  res.json({
    success: true,
    data: {
      total: 1250.50,
      breakdown: {
        Food: 450,
        Transport: 200,
        Entertainment: 150,
        Shopping: 300,
        Others: 150.50
      }
    }
  });
});

// @desc    Get monthly historical expenses
// @route   GET /api/expenses/monthly
// @access  Private
const getMonthlyExpenses = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  
  // Mock response for line chart
  res.json({
    success: true,
    data: [
      { month: 'Jan', total: 1100 },
      { month: 'Feb', total: 1400 },
      { month: 'Mar', total: 1250 },
      { month: 'Apr', total: 950 },
      { month: 'May', total: 1250.50 }
    ]
  });
});

// @desc    Get anonymised peer comparison data
// @route   GET /api/expenses/peer-compare
// @access  Private
const getPeerComparison = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  
  // Mock age bracket resolving based on userId
  const ageBracket = '22-26';
  
  // Call data integration engine
  const peerData = await getPeerComparisonData(ageBracket);
  
  res.json({
    success: true,
    data: peerData
  });
});

module.exports = {
  createExpense,
  getExpenseSummary,
  getMonthlyExpenses,
  getPeerComparison
};
