// backend/test_ai_local.js
// Local smoke test for the Gemini-backed AI engine.

const { safeClassifyPersona, safeGenerateChallenges } = require('./ai_response_parser');
const { classifyPersona } = require('./persona_engine');
const { generateChallenges } = require('./challenge_generator');
const { generateBudgetPlan } = require('./festive_budget_ai');

async function run() {
  if (!process.env.GEMINI_API_KEY) {
    console.error('Missing GEMINI_API_KEY. Set it before running this script.');
    process.exit(1);
  }

  console.log('Running AI smoke tests...');

  try {
    const persona = await classifyPersona([1, 2, 3, 4, 5]);
    console.log('Persona result:', persona);
  } catch (error) {
    console.error('Persona classification failed:', error);
  }

  try {
    const challenges = await generateChallenges('Saver', ['food', 'transport', 'entertainment'], ['overspent on food last week'], 2);
    console.log('Generated challenges:', challenges);
  } catch (error) {
    console.error('Challenge generation failed:', error);
  }

  try {
    const budgetPlan = await generateBudgetPlan('Saver', 'RM4000', 'RM1200', 30);
    console.log('Festive budget plan:', budgetPlan);
  } catch (error) {
    console.error('Festive budget plan failed:', error);
  }
}

run();
