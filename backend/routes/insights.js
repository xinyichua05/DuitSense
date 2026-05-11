const express = require('express');
const router = express.Router();
const { mockAuth } = require('../middleware/mockAuth');
const {
  getMonthlyInsight,
  getCategoryInsight
} = require('../controllers/insightController');

router.use(mockAuth);

router.post('/monthly', getMonthlyInsight);
router.post('/category', getCategoryInsight);

module.exports = router;
