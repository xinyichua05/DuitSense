/**
 * PROJECTION ENGINE
 * Generates dual-line financial projections (current trajectory vs improved trajectory)
 * Shows impact of behavior changes and additional savings on long-term wealth
 */

const epfCalc = require("./epf_calculator");

/**
 * Generate current trajectory (baseline spending/saving pattern)
 * Assumes user continues current savings rate
 * @param {object} params - Projection parameters
 * @param {number} params.currentAge - User's current age
 * @param {number} params.targetAge - Target projection age (default 65)
 * @param {number} params.monthlyIncome - Monthly income (RM)
 * @param {number} params.currentEPFBalance - Current EPF balance (RM)
 * @param {number} params.currentPersonalSavings - Personal savings outside EPF (RM)
 * @param {number} params.monthlySavingsRate - Monthly savings rate (RM)
 * @param {number} params.personalSavingsGrowth - Annual return rate for personal savings (0.05 = 5% ASB)
 * @returns {array} Array of {age, totalProjectedSavings, epfBalance, personalSavings}
 */
function generateCurrentTrajectory(params) {
  const {
    currentAge,
    targetAge = 65,
    monthlyIncome,
    currentEPFBalance,
    currentPersonalSavings = 0,
    monthlySavingsRate,
    personalSavingsGrowth = 0.05, // Default 5% p.a. like ASB
  } = params;

  // Validate inputs
  if (!currentAge || currentAge < 18) throw new Error("Invalid current age");
  if (!monthlyIncome || monthlyIncome <= 0)
    throw new Error("Invalid monthly income");
  if (monthlySavingsRate === undefined)
    throw new Error("Missing monthly savings rate");

  // Get EPF projection
  const epfProjection = epfCalc.projectEPFBalance({
    currentBalance: currentEPFBalance || 0,
    monthlyIncome,
    currentAge,
    targetAge,
  });

  const monthlyPersonalGrowthRate =
    Math.pow(1 + personalSavingsGrowth, 1 / 12) - 1;

  let personalBalance = currentPersonalSavings;
  const trajectory = [];

  epfProjection.forEach((epfSnapshot) => {
    const age = epfSnapshot.age;

    // Calculate months since start
    const monthsElapsed = (age - currentAge) * 12;

    // Personal savings growth with monthly contributions
    personalBalance = currentPersonalSavings;
    for (let m = 0; m < monthsElapsed; m++) {
      personalBalance += monthlySavingsRate;
      personalBalance *= 1 + monthlyPersonalGrowthRate;
    }

    trajectory.push({
      age,
      totalProjectedSavings:
        Math.round((epfSnapshot.balance + personalBalance) * 100) / 100,
      epfBalance: epfSnapshot.balance,
      personalSavings: Math.round(personalBalance * 100) / 100,
      yearlyContribution: epfSnapshot.yearlyContribution,
    });
  });

  return trajectory;
}

/**
 * Generate improved trajectory based on additional monthly savings
 * User saves RM50, RM100, etc. more per month
 * @param {object} params - Same as generateCurrentTrajectory plus:
 * @param {number} params.additionalMonthlySavings - Extra amount to save per month (RM)
 * @returns {array} Array of improved trajectory snapshots
 */
function generateImprovedTrajectory(params) {
  const {
    currentAge,
    targetAge = 65,
    monthlyIncome,
    currentEPFBalance,
    currentPersonalSavings = 0,
    monthlySavingsRate,
    additionalMonthlySavings,
    personalSavingsGrowth = 0.05,
  } = params;

  if (!additionalMonthlySavings || additionalMonthlySavings <= 0) {
    throw new Error("Additional monthly savings must be greater than 0");
  }

  // Use improved savings rate
  const improvedParams = {
    ...params,
    monthlySavingsRate: monthlySavingsRate + additionalMonthlySavings,
  };

  return generateCurrentTrajectory(improvedParams);
}

/**
 * Generate dual projection: current vs improved
 * @param {object} params - Projection parameters
 * @param {number} params.additionalMonthlySavings - How much more to save per month
 * @returns {object} {current, improved, projectionSummary}
 */
function generateDualProjection(params) {
  const current = generateCurrentTrajectory(params);
  const improved = generateImprovedTrajectory(params);

  const currentFinal = current[current.length - 1];
  const improvedFinal = improved[improved.length - 1];
  const difference =
    improvedFinal.totalProjectedSavings - currentFinal.totalProjectedSavings;

  return {
    current,
    improved,
    projectionSummary: {
      targetAge: params.targetAge || 65,
      currentTrajectoryEnd: currentFinal.totalProjectedSavings,
      improvedTrajectoryEnd: improvedFinal.totalProjectedSavings,
      additionalWealthGenerated: Math.round(difference * 100) / 100,
      percentageGain:
        Math.round(
          (difference / currentFinal.totalProjectedSavings) * 100 * 100,
        ) / 100,
      additionalMonthlySavings: params.additionalMonthlySavings,
      yearsToTarget: params.targetAge - params.currentAge,
    },
  };
}

/**
 * Calculate impact of starting early (ASB, regular savings)
 * Shows how starting 5 years earlier changes the outcome
 * @param {object} params - Same projection params
 * @returns {object} Comparison of starting now vs starting 5 years ago
 */
function analyzeStartingEarlyImpact(params) {
  const {
    currentAge,
    monthlySavingsRate,
    additionalMonthlySavings = 0,
  } = params;

  const earlierParams = {
    ...params,
    currentAge: currentAge - 5,
  };

  const currentProjection = generateCurrentTrajectory(params);
  const earlierProjection = generateCurrentTrajectory(earlierParams);

  // Find balance at current age in earlier projection
  const balanceAtCurrentAge = earlierProjection.find(
    (p) => p.age === currentAge,
  );

  return {
    startingNow:
      currentProjection[currentProjection.length - 1].totalProjectedSavings,
    startedFiveYearsAgo: balanceAtCurrentAge?.totalProjectedSavings || 0,
    difference:
      (balanceAtCurrentAge?.totalProjectedSavings || 0) -
      currentProjection[currentProjection.length - 1].totalProjectedSavings,
    message: `Starting 5 years earlier would have given you RM${balanceAtCurrentAge?.totalProjectedSavings || 0} today`,
  };
}

/**
 * Get milestone markers for the chart (EPF 55, housing, education, retirement)
 * @param {number} targetAge - Target age for projection
 * @returns {array} Array of {age, label, type}
 */
function getProjectionMilestones(targetAge) {
  const milestones = [];

  // EPF Account 3 withdrawal at 55
  if (targetAge >= 55) {
    milestones.push({
      age: 55,
      label: "EPF Account 3",
      type: "epf",
      description: "Can withdraw for healthcare",
    });
  }

  // Potential retirement at 60
  if (targetAge >= 60) {
    milestones.push({
      age: 60,
      label: "Full EPF Withdrawal",
      type: "retirement",
      description: "Can withdraw full balance",
    });
  }

  // Custom milestone: 65 (Malaysia full retirement age)
  if (targetAge >= 65) {
    milestones.push({
      age: 65,
      label: "Standard Retirement",
      type: "retirement",
      description: "Target retirement age",
    });
  }

  return milestones;
}

/**
 * Calculate break-even analysis: at what age will improved trajectory catch up?
 * (Only relevant if there's a higher upfront cost to the improved plan)
 * @param {object} current - Current trajectory array
 * @param {object} improved - Improved trajectory array
 * @returns {object} Break-even analysis
 */
function analyzeBreakEvenPoint(current, improved) {
  // Find first year where improved > current
  for (let i = 0; i < current.length; i++) {
    if (improved[i].totalProjectedSavings > current[i].totalProjectedSavings) {
      return {
        breakEvenAge: current[i].age,
        yearsUntilBreakEven: current[i].age - current[0].age,
        benefitAtBreakEven:
          Math.round(improved[i].totalProjectedSavings * 100) / 100,
      };
    }
  }

  return {
    breakEvenAge: null,
    yearsUntilBreakEven: null,
    benefitAtBreakEven: 0,
    message: "Current trajectory is always better",
  };
}

module.exports = {
  generateCurrentTrajectory,
  generateImprovedTrajectory,
  generateDualProjection,
  analyzeStartingEarlyImpact,
  getProjectionMilestones,
  analyzeBreakEvenPoint,
};
