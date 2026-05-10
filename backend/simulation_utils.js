/**
 * MICRO-CHANGE SIMULATION ENGINE
 * Simulate small behavioral changes and their long-term impact
 * Examples: "Save RM50 more/month", "Skip 1 Grab Food order/week", "Start ASB"
 */

const projectionEngine = require("./projection_engine");

/**
 * Predefined micro-changes with Malaysian context
 */
const MICRO_CHANGES = {
  SAVE_50: {
    id: "save_50",
    label: "Save RM50 more per month",
    amount: 50,
    category: "savings",
    impact: "direct",
  },
  SAVE_100: {
    id: "save_100",
    label: "Save RM100 more per month",
    amount: 100,
    category: "savings",
    impact: "direct",
  },
  SAVE_200: {
    id: "save_200",
    label: "Save RM200 more per month",
    amount: 200,
    category: "savings",
    impact: "direct",
  },
  REDUCE_FOOD_DELIVERY: {
    id: "reduce_food_delivery",
    label: "Skip 1 food delivery per week",
    amount: 40, // Avg order RM40 × 4 weeks
    category: "food",
    estimatedSavings: "RM40/week (~RM160/month)",
    impact: "categorical",
  },
  REDUCE_SUBSCRIPTIONS: {
    id: "reduce_subscriptions",
    label: "Cancel unused subscriptions",
    amount: 50, // Multiple streaming: Netflix 20 + Spotify 14 + etc
    category: "subscriptions",
    estimatedSavings: "RM50/month average",
    impact: "categorical",
  },
  START_ASB: {
    id: "start_asb",
    label: "Start investing in ASB (RM100/month)",
    amount: 100,
    category: "investment",
    returnRate: 0.05, // 5% dividend
    impact: "investment",
  },
  REDUCE_TRANSPORT: {
    id: "reduce_transport",
    label: "Carpool or use public transport",
    amount: 60, // Save RM60/month on petrol/parking
    category: "transport",
    estimatedSavings: "RM60/month",
    impact: "categorical",
  },
  COFFEE_TO_HOME: {
    id: "coffee_to_home",
    label: "Make coffee at home (5x/week)",
    amount: 50, // RM10 per coffee × 5 days
    category: "food",
    estimatedSavings: "RM50/month (~RM2.50 vs RM10)",
    impact: "categorical",
  },
  INSURANCE_REVIEW: {
    id: "insurance_review",
    label: "Review and optimize insurance",
    amount: 80, // Consolidate or reduce overlap
    category: "insurance",
    estimatedSavings: "RM80/month savings",
    impact: "categorical",
  },
  ENTERTAINMENT_LIMIT: {
    id: "entertainment_limit",
    label: "Set entertainment budget (RM150/month)",
    amount: 50, // Average saving from limiting impulse spending
    category: "entertainment",
    estimatedSavings: "RM30-50/month average",
    impact: "categorical",
  },
};

/**
 * Simulate a single micro-change impact
 * @param {object} params - Simulation parameters
 * @param {string} params.changeId - ID of micro-change (from MICRO_CHANGES)
 * @param {number} params.currentAge - User's current age
 * @param {number} params.targetAge - Projection target age
 * @param {number} params.monthlyIncome - Monthly income (RM)
 * @param {number} params.currentEPFBalance - Current EPF balance
 * @param {number} params.currentPersonalSavings - Current personal savings
 * @param {number} params.currentMonthlySavings - Current monthly savings (RM)
 * @returns {object} Simulation results with projections
 */
function simulateMicroChange(params) {
  const {
    changeId,
    currentAge,
    targetAge = 65,
    monthlyIncome,
    currentEPFBalance,
    currentPersonalSavings,
    currentMonthlySavings,
  } = params;

  const change = MICRO_CHANGES[changeId];
  if (!change) {
    throw new Error(`Unknown micro-change: ${changeId}`);
  }

  // Generate baseline (no change)
  const baselineProjection = projectionEngine.generateCurrentTrajectory({
    currentAge,
    targetAge,
    monthlyIncome,
    currentEPFBalance,
    currentPersonalSavings,
    monthlySavingsRate: currentMonthlySavings,
  });

  // Generate improved (with change)
  const improvedProjection = projectionEngine.generateCurrentTrajectory({
    currentAge,
    targetAge,
    monthlyIncome,
    currentEPFBalance,
    currentPersonalSavings,
    monthlySavingsRate: currentMonthlySavings + change.amount,
  });

  const baselineFinal = baselineProjection[baselineProjection.length - 1];
  const improvedFinal = improvedProjection[improvedProjection.length - 1];
  const totalGain =
    improvedFinal.totalProjectedSavings - baselineFinal.totalProjectedSavings;

  return {
    changeId,
    changeName: change.label,
    category: change.category,
    estimatedSavings: change.estimatedSavings || `RM${change.amount}/month`,
    baseline: baselineFinal,
    improved: improvedFinal,
    impact: {
      totalAdditionalWealthAt65: Math.round(totalGain * 100) / 100,
      percentageGain:
        Math.round(
          (totalGain / baselineFinal.totalProjectedSavings) * 100 * 100,
        ) / 100,
      monthlyContribution: change.amount,
      yearsOfImpact: targetAge - currentAge,
      motivationalMessage: `If you ${change.label.toLowerCase()}, you'd have RM${improvedFinal.totalProjectedSavings.toLocaleString()} instead of RM${baselineFinal.totalProjectedSavings.toLocaleString()} by age ${targetAge}`,
    },
  };
}

/**
 * Simulate multiple micro-changes combined
 * @param {object} params - Base parameters
 * @param {array} params.changeIds - Array of micro-change IDs to combine
 * @returns {object} Combined simulation
 */
function simulateMultipleMicroChanges(params) {
  const { changeIds, ...baseParams } = params;

  if (!changeIds || !Array.isArray(changeIds) || changeIds.length === 0) {
    throw new Error("Must provide at least one change ID");
  }

  const results = changeIds.map((id) =>
    simulateMicroChange({ ...baseParams, changeId: id }),
  );

  // Calculate combined impact
  const totalAdditionalSavings = results.reduce(
    (sum, r) => sum + (r.impact.monthlyContribution || 0),
    0,
  );

  const combinedProjection = projectionEngine.generateCurrentTrajectory({
    ...baseParams,
    monthlySavingsRate:
      baseParams.currentMonthlySavings + totalAdditionalSavings,
  });

  const baselineProjection = projectionEngine.generateCurrentTrajectory({
    ...baseParams,
    monthlySavingsRate: baseParams.currentMonthlySavings,
  });

  const combinedFinal = combinedProjection[combinedProjection.length - 1];
  const baselineFinal = baselineProjection[baselineProjection.length - 1];

  return {
    individual: results,
    combined: {
      totalMonthlyIncrease: totalAdditionalSavings,
      projectedSavingsAtTarget: combinedFinal.totalProjectedSavings,
      baselineProjectedSavings: baselineFinal.totalProjectedSavings,
      totalWealthGain:
        Math.round(
          combinedFinal.totalProjectedSavings -
            baselineFinal.totalProjectedSavings,
        ) / 100,
      changes: changeIds.map((id) => MICRO_CHANGES[id].label),
    },
  };
}

/**
 * Generate slider-based interactive simulation
 * User moves slider: "Save RM50 more/month" → "Save RM500 more/month"
 * @param {object} params - Base parameters
 * @param {number} params.minAdditionalSavings - Minimum (default 0)
 * @param {number} params.maxAdditionalSavings - Maximum (default 500)
 * @param {number} params.step - Slider step (default 10)
 * @param {number} params.currentAdditionalSavings - Current slider position
 * @returns {object} Slider data for chart re-rendering
 */
function getSliderProjection(params) {
  const {
    minAdditionalSavings = 0,
    maxAdditionalSavings = 500,
    step = 10,
    currentAdditionalSavings = 50,
    ...baseParams
  } = params;

  if (
    currentAdditionalSavings < minAdditionalSavings ||
    currentAdditionalSavings > maxAdditionalSavings
  ) {
    throw new Error("Current additional savings out of range");
  }

  const projection = projectionEngine.generateCurrentTrajectory({
    ...baseParams,
    monthlySavingsRate:
      baseParams.currentMonthlySavings + currentAdditionalSavings,
  });

  const baseline = projectionEngine.generateCurrentTrajectory({
    ...baseParams,
    monthlySavingsRate: baseParams.currentMonthlySavings,
  });

  const projectedFinal = projection[projection.length - 1];
  const baselineFinal = baseline[baseline.length - 1];

  return {
    currentSliderValue: currentAdditionalSavings,
    sliderRange: {
      min: minAdditionalSavings,
      max: maxAdditionalSavings,
      step,
    },
    projectedOutcome: {
      savings: projectedFinal.totalProjectedSavings,
      gain:
        Math.round(
          (projectedFinal.totalProjectedSavings -
            baselineFinal.totalProjectedSavings) *
            100,
        ) / 100,
      gainPercentage:
        Math.round(
          ((projectedFinal.totalProjectedSavings -
            baselineFinal.totalProjectedSavings) /
            baselineFinal.totalProjectedSavings) *
            100 *
            100,
        ) / 100,
    },
    trajectory: projection, // Full trajectory data for chart
  };
}

/**
 * Get all available micro-changes
 * @returns {object} Dictionary of all changes with descriptions
 */
function getAvailableMicroChanges() {
  return MICRO_CHANGES;
}

/**
 * Categorize micro-changes by impact type for UI organization
 * @returns {object} Changes grouped by category
 */
function getMicroChangesByCategory() {
  const byCategory = {};

  Object.entries(MICRO_CHANGES).forEach(([key, change]) => {
    if (!byCategory[change.category]) {
      byCategory[change.category] = [];
    }
    byCategory[change.category].push({ key, ...change });
  });

  return byCategory;
}

module.exports = {
  MICRO_CHANGES,
  simulateMicroChange,
  simulateMultipleMicroChanges,
  getSliderProjection,
  getAvailableMicroChanges,
  getMicroChangesByCategory,
};
