// behaviour_mirror.js
// Handles Behaviour Mirror AI analysis

const { behaviourMirrorMonthlyPrompt, behaviourMirrorCategoryPrompt } = require('./ai_prompts');
const { callGemini } = require('./ai_response_parser');
const { safeGenerateChallenges } = require('./challenge_generator');

async function analyzeMonthlyBehaviour(totals, persona, peerMedian) {
  const prompt = behaviourMirrorMonthlyPrompt
    .replace('{totals}', JSON.stringify(totals))
    .replace('{persona}', persona)
    .replace('{peerMedian}', JSON.stringify(peerMedian));
  const response = await callGemini(prompt);
  if (response && response.confidence > 0.8 && response.challenge_suggestion) {
    // Auto-generate challenge
    const challenges = await safeGenerateChallenges({ persona, bias: response.bias });
    response.auto_challenge = challenges[0]; // Or something
  }
  return response;
}

async function analyzeCategoryBehaviour(breakdown, peerMedians) {
  const prompt = behaviourMirrorCategoryPrompt
    .replace('{breakdown}', JSON.stringify(breakdown))
    .replace('{peerMedians}', JSON.stringify(peerMedians));
  const response = await callGemini(prompt);
  if (response && response.confidence > 0.8 && response.challenge_suggestion) {
    const challenges = await safeGenerateChallenges({ category: response.category });
    response.auto_challenge = challenges[0];
  }
  return response;
}

module.exports = { analyzeMonthlyBehaviour, analyzeCategoryBehaviour };