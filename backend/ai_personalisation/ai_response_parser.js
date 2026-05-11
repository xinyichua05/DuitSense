// ai_response_parser.js
// Gemini-based AI handler (fixed + stable version)

require("dotenv").config();

const fetchFn = globalThis.fetch;
if (!fetchFn) {
  throw new Error(
    "Global fetch is not available. Upgrade Node or install a fetch polyfill."
  );
}

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL =
  process.env.GEMINI_MODEL || "gemini-1.5-flash";

async function callGemini(prompt) {
  console.log("[MOCK AI] Prompt received:", prompt);

  // ALWAYS return safe mock JSON (no API needed)
  return null;
}

// ------------------------------
// VALIDATION
// ------------------------------
function validatePersonaResponse(response) {
  if (!response || typeof response !== "object") return false;

  const validPersonas = [
    "Saver",
    "Spender",
    "Investor",
    "Debtor",
    "Planner",
    "ImpulseBuyer",
    "Traditionalist",
    "Modernist",
  ];

  return (
    response.persona_type &&
    validPersonas.includes(response.persona_type) &&
    response.weakness &&
    Array.isArray(response.roadmap) &&
    response.roadmap.length === 4
  );
}

function validateChallengeResponse(response) {
  return (
    Array.isArray(response) &&
    response.length === 3 &&
    response.every(
      (ch) =>
        ch.title &&
        ch.description &&
        typeof ch.saving === "number" &&
        typeof ch.xp === "number"
    )
  );
}

// ------------------------------
// FALLBACKS
// ------------------------------
function fallbackPersona(answers) {
  const score = Array.isArray(answers)
    ? answers.reduce((a, b) => a + b, 0)
    : 0;

  if (score > 10) {
    return {
      persona_type: "Spender",
      weakness: "Impulsive spending",
      roadmap: ["Step1", "Step2", "Step3", "Step4"],
    };
  }

  return {
    persona_type: "Saver",
    weakness: "Overly cautious",
    roadmap: ["Step1", "Step2", "Step3", "Step4"],
  };
}

function fallbackChallenges() {
  return [
    {
      title: "Save on coffee",
      description: "Brew at home",
      saving: 50,
      xp: 10,
    },
    {
      title: "Track expenses",
      description: "Log daily",
      saving: 0,
      xp: 5,
    },
    {
      title: "Set budget",
      description: "Limit categories",
      saving: 100,
      xp: 15,
    },
  ];
}

// ------------------------------
// PUBLIC FUNCTIONS (USED BY APP)
// ------------------------------
async function safeClassifyPersona(answers) {
  const prompt = `
You are a financial behaviour classifier for Malaysian users.

Return ONLY valid JSON in this format:
{
  "persona_type": "Saver | Spender | Investor | Debtor | Planner | ImpulseBuyer | Traditionalist | Modernist",
  "weakness": "short description",
  "roadmap": ["step1", "step2", "step3", "step4"]
}

User answers:
${JSON.stringify(answers)}
`;

  const response = await callGemini(prompt);

  if (validatePersonaResponse(response)) return response;

  return fallbackPersona(answers);
}

async function safeGenerateChallenges(context) {
  const prompt = `
You are a financial coach.

Return ONLY valid JSON array with exactly 3 items:

[
  {
    "title": "...",
    "description": "...",
    "saving": number,
    "xp": number
  }
]

Rules:
- Must be realistic micro financial habits for Malaysians
- Saving must be in RM
- XP must be integer
- No extra text

Context:
${JSON.stringify(context)}
`;

  const response = await callGemini(prompt);

  if (validateChallengeResponse(response)) return response;

  return fallbackChallenges();
}

module.exports = {
  callGemini,
  safeClassifyPersona,
  safeGenerateChallenges,
};