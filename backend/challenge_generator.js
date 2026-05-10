// challenge_generator.js
// Handles AI micro-challenge generation

const { safeGenerateChallenges } = require('./ai_response_parser');

async function generateChallenges(persona, categories, fails, streak) {
  const context = { persona, categories, fails, streak };
  return await safeGenerateChallenges(context);
}

async function generateFestiveChallenges(festival, days, persona, income, pastSpend) {
  const context = { festival, days, persona, income, pastSpend, festive: true };
  return await safeGenerateChallenges(context);
}

module.exports = { generateChallenges, generateFestiveChallenges };