// persona_engine.js
// Handles persona classification from quiz answers

const { safeClassifyPersona } = require('./ai_response_parser');

async function classifyPersona(answers) {
  return await safeClassifyPersona(answers);
}

module.exports = { classifyPersona };