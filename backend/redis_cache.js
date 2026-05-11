const { createClient } = require('redis');
require('dotenv').config();

const client = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
});

client.on('error', (err) => console.log('Redis Client Error', err));
client.on('connect', () => console.log('Redis Client Connected'));

// Connect to Redis immediately
(async () => {
  try {
    await client.connect();
  } catch (error) {
    console.error('Failed to connect to Redis:', error);
  }
})();

module.exports = {
  client,
  // Helper functions for specific caching needs
  setInsightCache: async (userId, month, data) => {
    // 24-hour TTL for insights
    const key = `insight:${userId}:${month}`;
    await client.set(key, JSON.stringify(data), {
      EX: 60 * 60 * 24 
    });
  },
  
  getInsightCache: async (userId, month) => {
    const key = `insight:${userId}:${month}`;
    const data = await client.get(key);
    return data ? JSON.parse(data) : null;
  },

  updateLeaderboard: async (userId, xp) => {
    // Use Redis Sorted Set for Leaderboard
    await client.zAdd('leaderboard:weekly', { score: xp, value: userId.toString() });
  },

  getTopLeaderboard: async (count = 10) => {
    // Get top N users in descending order
    return await client.zRangeWithScores('leaderboard:weekly', 0, count - 1, { REV: true });
  }
};
