const asyncHandler = require('express-async-handler');
const { analyzeMonthlyBehaviour, analyzeCategoryBehaviour } = require('../ai_personalisation/behaviour_mirror');
const { getPeerComparisonData } = require('../data_integration/peer_compare_engine');
const { getCache, setCache } = require('../data_integration/redis_cache');

// @desc    Get monthly behaviour insight
// @route   POST /api/insights/monthly
// @access  Private
const getMonthlyInsight = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const persona = req.user.persona_type;
  const { month } = req.body;

  if (!month) {
    res.status(400);
    throw new Error('Month parameter is required');
  }

  const cacheKey = `insight_monthly_${userId}_${month}`;
  
  // 1. Check cache (TTL 24h)
  const cachedInsight = await getCache(cacheKey);
  if (cachedInsight) {
    return res.status(200).json({ success: true, data: cachedInsight, cached: true });
  }

  // 2. Fetch required data (Mocked)
  const totals = { past6Months: [1000, 1200, 1100, 1300, 900, 1150] };
  const peerMedian = await getPeerComparisonData('22-26');

  // 3. Call AI Mirror
  let analysisResult;
  try {
    analysisResult = await analyzeMonthlyBehaviour(totals, persona, peerMedian);
  } catch (err) {
    console.error('AI call failed, using fallback:', err);
    analysisResult = {
      insight: 'You are spending slightly above your historical average. Consider reviewing your entertainment budget.',
      bias: 'None detected',
      confidence: 0,
    };
  }

  // 4. Cache and Return
  await setCache(cacheKey, analysisResult, 86400); // 24h

  res.status(200).json({
    success: true,
    data: analysisResult,
    cached: false
  });
});

// @desc    Get category anomaly insight
// @route   POST /api/insights/category
// @access  Private
const getCategoryInsight = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { month } = req.body;

  const cacheKey = `insight_category_${userId}_${month}`;
  
  const cachedInsight = await getCache(cacheKey);
  if (cachedInsight) {
    return res.status(200).json({ success: true, data: cachedInsight, cached: true });
  }

  const breakdown = { Food: 450, Transport: 200, Entertainment: 150 };
  const peerMedians = await getPeerComparisonData('22-26');

  let analysisResult;
  try {
    analysisResult = await analyzeCategoryBehaviour(breakdown, peerMedians);
  } catch (err) {
    console.error('AI call failed, using fallback:', err);
    analysisResult = {
      insight: 'Your food spending is relatively normal compared to peers.',
      bias: 'None detected',
      confidence: 0,
    };
  }

  await setCache(cacheKey, analysisResult, 86400);

  res.status(200).json({
    success: true,
    data: analysisResult,
    cached: false
  });
});

module.exports = {
  getMonthlyInsight,
  getCategoryInsight
};
