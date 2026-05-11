const db = require('./db_config');

/**
 * Aggregates monthly expenses for a given user.
 * @param {number} userId 
 * @param {number} year 
 * @param {number} month 
 * @returns {Promise<Object>} Total and breakdown by category
 */
async function getMonthlySummary(userId, year, month) {
  // Get start and end of month dates
  const startDate = new Date(year, month - 1, 1).toISOString();
  const endDate = new Date(year, month, 1).toISOString();

  // Get total spent
  const totalRes = await db.query(
    `SELECT COALESCE(SUM(amount), 0) as total 
     FROM expenses 
     WHERE user_id = $1 AND timestamp >= $2 AND timestamp < $3`,
    [userId, startDate, endDate]
  );
  
  // Get breakdown by category
  const breakdownRes = await db.query(
    `SELECT category, SUM(amount) as amount 
     FROM expenses 
     WHERE user_id = $1 AND timestamp >= $2 AND timestamp < $3
     GROUP BY category`,
    [userId, startDate, endDate]
  );

  return {
    total: parseFloat(totalRes.rows[0].total),
    categories: breakdownRes.rows.map(row => ({
      category: row.category,
      amount: parseFloat(row.amount)
    }))
  };
}

/**
 * Gets expense history for the last N months for the line chart.
 * @param {number} userId 
 * @param {number} monthsCount 
 */
async function getExpenseHistory(userId, monthsCount = 6) {
  const query = `
    SELECT 
      DATE_TRUNC('month', timestamp) as month_start,
      SUM(amount) as total
    FROM expenses
    WHERE user_id = $1 AND timestamp >= DATE_TRUNC('month', CURRENT_DATE) - INTERVAL '$2 months'
    GROUP BY month_start
    ORDER BY month_start ASC
  `;
  
  const res = await db.query(query, [userId, monthsCount]);
  
  return res.rows.map(row => ({
    month: new Date(row.month_start).toISOString().slice(0, 7), // YYYY-MM
    total: parseFloat(row.total)
  }));
}

module.exports = {
  getMonthlySummary,
  getExpenseHistory
};
