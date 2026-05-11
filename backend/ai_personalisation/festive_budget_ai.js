// festive_budget_ai.js
// Handles Festive Budget Plan AI generator

const { festiveBudgetPlanPrompt, festiveDebriefPrompt } = require('./ai_prompts');
const { callGemini } = require('./ai_response_parser');

async function generateBudgetPlan(persona, income, pastSpend, days) {
  const prompt = festiveBudgetPlanPrompt
    .replace('{persona}', persona)
    .replace('{income}', income)
    .replace('{pastSpend}', pastSpend)
    .replace('{days}', days);
  const response = await callGemini(prompt);
  return response;
}

async function generateDebrief(actual, plan) {
  const prompt = festiveDebriefPrompt
    .replace('{actual}', actual)
    .replace('{plan}', plan);
  const response = await callGemini(prompt);
  return response;
}

module.exports = { generateBudgetPlan, generateDebrief };