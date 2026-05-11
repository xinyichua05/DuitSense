const { query } = require('../data_integration/db_config');
const { spinWheel, processSpinReward } = require('../projection_reward/spin_wheel_engine');

/**
 * Fetches the friends leaderboard for a user
 * @param {number} userId - The user ID
 * @returns {Array} List of leaderboard entries
 */
const getFriendsLeaderboard = async (userId) => {
  // In a real app, this would join users, user_friends, and calculate ranks
  // We'll mock the leaderboard query here
  const result = await query(`
    SELECT u.id, u.display_name, u.persona_type, u.week_xp as xp, '7-Day Streak' as top_stat
    FROM users u
    -- JOIN user_friends uf ON u.id = uf.friend_id WHERE uf.user_id = $1
    ORDER BY u.week_xp DESC
    LIMIT 50
  `, [userId]);

  // Mocked response for demo purposes
  if (!result.rows || result.rows.length === 0) {
    return [
      { rank: 1, user_id: 2, display_name: 'Ahmad', xp: 450, persona_type: 'The Solid Pelabur', top_stat: '7-Day Streak' },
      { rank: 2, user_id: userId, display_name: 'You', xp: 320, persona_type: 'The YOLO Spender', top_stat: '5 Quizzes Done' },
      { rank: 3, user_id: 3, display_name: 'Sarah', xp: 210, persona_type: 'The Kiasu Investor', top_stat: '3 Challenges' }
    ];
  }

  return result.rows.map((row, index) => ({
    rank: index + 1,
    ...row
  }));
};

/**
 * Processes a spin wheel request
 * @param {number} userId - The user ID
 * @returns {Object} Claim data
 */
const processUserSpin = async (userId) => {
  // 1. Validate if user has spin entries
  // Mocking DB check
  const hasEntries = true; // Replace with actual query
  const entriesRemaining = 2; // Mock

  if (!hasEntries) {
    throw new Error("No spin entries available");
  }

  // 2. Spin the wheel
  const reward = spinWheel();

  // 3. Deduct entry and store reward (Mocked DB calls)
  await query('UPDATE users SET spin_entries = spin_entries - 1 WHERE id = $1', [userId]);
  await query('INSERT INTO reward_log (user_id, reward_type, value) VALUES ($1, $2, $3)', 
    [userId, reward.type, reward.value]);

  // 4. Return processed claim data
  return processSpinReward(reward, entriesRemaining - 1);
};

/**
 * Runs the weekly reset job: archives XP, assigns spins to top 3, resets XP
 */
const runWeeklyReset = async () => {
  console.log('[LeaderboardEngine] Starting weekly XP reset transaction...');
  try {
    // In a real app, this should be wrapped in a DB transaction using `pool.connect()` and `BEGIN`/`COMMIT`
    
    // Step 1: Snapshot week_xp into leaderboard_history
    await query(`
      INSERT INTO leaderboard_history (user_id, week_start_date, xp_earned)
      SELECT id, date_trunc('week', current_date - interval '1 week'), week_xp
      FROM users WHERE week_xp > 0
    `);

    // Step 2: Allocate spin entries to top 3 (Mock logic for allocation)
    console.log('[LeaderboardEngine] Allocating spin entries...');
    // Real logic would identify top 3 per friend group. 
    // Simplified global top 3 for demo:
    const topUsers = await query(`SELECT id FROM users ORDER BY week_xp DESC LIMIT 3`);
    if (topUsers.rows && topUsers.rows.length >= 1) {
      await query('UPDATE users SET spin_entries = spin_entries + 3 WHERE id = $1', [topUsers.rows[0].id]);
      if (topUsers.rows.length >= 2) {
        await query('UPDATE users SET spin_entries = spin_entries + 2 WHERE id = $1', [topUsers.rows[1].id]);
      }
      if (topUsers.rows.length >= 3) {
        await query('UPDATE users SET spin_entries = spin_entries + 1 WHERE id = $1', [topUsers.rows[2].id]);
      }
    }

    // Step 3: Reset week_xp = 0
    await query('UPDATE users SET week_xp = 0');
    
    console.log('[LeaderboardEngine] Weekly reset complete.');
  } catch (err) {
    console.error('[LeaderboardEngine] Weekly reset failed!', err);
    // Real app would rollback transaction
  }
};

module.exports = {
  getFriendsLeaderboard,
  processUserSpin,
  runWeeklyReset
};
