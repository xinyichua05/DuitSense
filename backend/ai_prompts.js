// ai_prompts.js
// Contains all AI prompt templates for the backend AI engine

const personaClassificationPrompt = `
You are a Malaysian financial behaviour classifier. Given 5 quiz answers, return JSON with persona_type (one of 8 archetypes: Saver, Spender, Investor, Debtor, Planner, ImpulseBuyer, Traditionalist, Modernist), weakness, and 4-step roadmap array. Strict JSON output only.
User answers: {answers}
Response format: {"persona_type": "string", "weakness": "string", "roadmap": ["step1", "step2", "step3", "step4"]}
`;

const behaviourMirrorMonthlyPrompt = `
You are a financial behaviour analyst for Malaysian users. Context: past 6 months expense totals {totals}, persona_type {persona}, peer median for age bracket {peerMedian}.
Identify one named cognitive bias, quantify impact ("RM12k less by 35"), and suggest one action. Return JSON.
Response format: {"bias": "string", "impact": "string", "action": "string", "challenge_suggestion": {"title": "string", "description": "string", "saving": number, "xp": number}, "confidence": number}
`;

const behaviourMirrorCategoryPrompt = `
You are a financial behaviour analyst. Context: current month category breakdown {breakdown}, peer category medians {peerMedians}.
Identify highest anomaly category, name pattern, recommend one habit change. Return JSON.
Response format: {"category": "string", "pattern": "string", "recommendation": "string", "challenge_suggestion": {"title": "string", "description": "string", "saving": number, "xp": number}, "confidence": number}
`;

const challengeGenerationPrompt = `
Generate 3 ultra-small, achievable financial challenges for a Malaysian user. Context: persona_type {persona}, top 3 spending categories {categories}, last 5 fail_reasons {fails}, current streak {streak}.
Each must have a title, description, estimated saving in RM, and XP reward. Return JSON array.
Response format: [{"title": "string", "description": "string", "saving": number, "xp": number}, ...]
`;

const festiveChallengePrompt = `
Generate 3 festival-specific financial challenges. Festival: {festival}, days until: {days}. Context: persona_type {persona}, income bracket {income}, past festive spend {pastSpend}.
All challenges must be festival-specific (budgeting duit raya, baju, travel, angpau etc.). Return JSON array.
Response format: [{"title": "string", "description": "string", "saving": number, "xp": number}, ...]
`;

const festiveBudgetPlanPrompt = `
Generate festive budget plan. Context: persona_type {persona}, average monthly income {income}, past festive spend {pastSpend}, days until festival {days}.
Return: total_budget_recommendation, daily_savings_target, breakdown by category (food, clothes, travel, angpau/duit raya).
Response format: {"total_budget": number, "daily_target": number, "breakdown": {"food": number, "clothes": number, "travel": number, "angpau": number}}
`;

const festiveDebriefPrompt = `
Post-festival debrief. Actual spend {actual} vs plan {plan}. Generate one-sentence verdict.
Response format: {"verdict": "string"}
`;

module.exports = {
  personaClassificationPrompt,
  behaviourMirrorMonthlyPrompt,
  behaviourMirrorCategoryPrompt,
  challengeGenerationPrompt,
  festiveChallengePrompt,
  festiveBudgetPlanPrompt,
  festiveDebriefPrompt
};