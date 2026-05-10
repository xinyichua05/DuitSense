const db = require('./db_config');
const redisCache = require('./redis_cache');

/**
 * Calculates the median percentage of expenses per category across anonymized users.
 * This simulates a peer comparison engine.
 * @returns {Promise<Object>} An object with category medians
 */
async function computePeerMedians() {
  // Cache key
  const cacheKey = 'peer_medians:all';
  
  // Try cache first
  const cached = await redisCache.client.get(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }

  // NOTE: A real implementation would filter by age bracket.
  // For the MVP, we aggregate across all users who opted in.
  
  const query = `
    WITH user_monthly_totals AS (
      SELECT 
        e.user_id,
        e.category,
        SUM(e.amount) as category_total,
        SUM(SUM(e.amount)) OVER (PARTITION BY e.user_id) as month_total
      FROM expenses e
      JOIN users u ON e.user_id = u.id
      WHERE u.opt_in_peer_data = TRUE 
        AND e.timestamp >= DATE_TRUNC('month', CURRENT_DATE)
      GROUP BY e.user_id, e.category
    ),
    user_category_percentages AS (
      SELECT 
        user_id,
        category,
        (category_total / month_total) * 100 as percentage
      FROM user_monthly_totals
    )
    SELECT 
      category,
      PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY percentage) as median_percentage
    FROM user_category_percentages
    GROUP BY category
  `;

  const res = await db.query(query);
  
  const medians = {};
  res.rows.forEach(row => {
    medians[row.category] = parseFloat(row.median_percentage).toFixed(2);
  });

  // Cache for 1 hour to prevent heavy DB load
  await redisCache.client.set(cacheKey, JSON.stringify(medians), {
    EX: 3600 
  });

  return medians;
}

module.exports = {
  computePeerMedians
};
