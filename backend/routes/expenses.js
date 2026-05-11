const express = require('express');
const router = express.Router();
const { mockAuth } = require('../middleware/mockAuth');
const {
  createExpense,
  getExpenseSummary,
  getMonthlyExpenses,
  getPeerComparison
} = require('../controllers/expenseController');

router.use(mockAuth);

router.route('/')
  .post(createExpense);

router.get('/summary', getExpenseSummary);
router.get('/monthly', getMonthlyExpenses);
router.get('/peer-compare', getPeerComparison);

module.exports = router;
