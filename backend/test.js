// test.js
// Run this file with: node test.js
require('dotenv').config();

const { pool } = require('./db_config');
const redisCache = require('./redis_cache');
const { generateStructuredAIResponse } = require('./gemini_client');

async function runTests() {
  console.log("=== Running Backend Tests ===\n");

  // 1. Test Database Connection
  try {
    const res = await pool.query('SELECT NOW() as current_time');
    console.log("✅ Database connected:", res.rows[0].current_time);
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
  }

  // 2. Test Redis Connection
  try {
    await redisCache.client.set('test_key', 'Hello from Redis!');
    const val = await redisCache.client.get('test_key');
    console.log("✅ Redis connected and working, value:", val);
  } catch (err) {
    console.error("❌ Redis connection failed:", err.message);
  }

  // 3. Test Gemini API (Make sure you have GEMINI_API_KEY in .env)
  try {
    if (!process.env.GEMINI_API_KEY) {
      console.log("⚠️ Skipping Gemini test (no API key in .env)");
    } else {
      const response = await generateStructuredAIResponse(
        "You are a helpful assistant. Return your response in JSON format like {\"greeting\": \"hello\"}.",
        "Say hi!"
      );
      console.log("✅ Gemini API working:", response);
    }
  } catch (err) {
    console.error("❌ Gemini API failed:", err.message);
  }

  console.log("\n=== Tests Completed ===");
  process.exit(0); // Exit script
}

runTests();
