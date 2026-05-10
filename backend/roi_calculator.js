/**
 * ROI & SAVINGS IMPACT CALCULATOR
 * Calculates return on investment for completed challenges
 * Shows savings impact and long-term financial benefits
 */

/**
 * Calculate ROI for a completed challenge
 * @param {object} params - Challenge parameters
 * @param {number} params.estimatedSaving - Estimated RM saved per challenge (from challenge generation)
 * @param {number} params.yearsUntilRetirement - Years until retirement age (e.g., 65)
 * @param {number} params.annualReturnRate - Average annual return on savings (default 0.05 = 5% ASB)
 * @param {number} params.userIncomeBracket - Income bracket for context
 * @returns {object} ROI analysis
 */
function calculateChallengeROI(params) {
  const {
    estimatedSaving,
    yearsUntilRetirement,
    annualReturnRate = 0.05,
    userIncomeBracket,
  } = params;

  if (!estimatedSaving || estimatedSaving <= 0) {
    throw new Error("Estimated saving must be positive");
  }
  if (!yearsUntilRetirement || yearsUntilRetirement <= 0) {
    throw new Error("Years until retirement must be positive");
  }

  // Compound monthly savings over years
  const monthlyContribution = estimatedSaving;
  const monthlyRate = annualReturnRate / 12;
  const months = yearsUntilRetirement * 12;

  // Future value of monthly savings: FV = PMT × [((1 + r)^n - 1) / r]
  const futureValue =
    monthlyContribution *
    ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);

  // Simple case: if one-time saving just grew with interest
  const totalContributed = monthlyContribution * months;
  const interestEarned = futureValue - totalContributed;

  const roi = {
    monthlyContribution: Math.round(estimatedSaving * 100) / 100,
    yearsOfImpact: yearsUntilRetirement,
    totalMonthlyContributed: Math.round(totalContributed * 100) / 100,
    projectedFutureValue: Math.round(futureValue * 100) / 100,
    interestEarned: Math.round(interestEarned * 100) / 100,
    roiPercentage:
      Math.round((interestEarned / totalContributed) * 100 * 100) / 100,
    estimatedAnnualImpact: Math.round(estimatedSaving * 12 * 100) / 100,
  };

  return roi;
}

/**
 * Calculate aggregate impact of multiple completed challenges
 * @param {array} challenges - Array of {estimatedSaving, dateCompleted}
 * @param {object} params - Same as calculateChallengeROI
 * @returns {object} Aggregated impact analysis
 */
function calculateAggregateImpact(challenges, params) {
  const { yearsUntilRetirement, annualReturnRate = 0.05 } = params;

  if (!challenges || challenges.length === 0) {
    return {
      totalChallengesCompleted: 0,
      totalSavingsByMonth: 0,
      projectedFutureValue: 0,
      message: "No challenges completed yet. Start your first challenge!",
    };
  }

  // Sum all estimated savings
  const totalMonthlySavings = challenges.reduce(
    (sum, c) => sum + (c.estimatedSaving || 0),
    0,
  );

  // Calculate compound future value
  const monthlyRate = annualReturnRate / 12;
  const months = yearsUntilRetirement * 12;
  const futureValue =
    totalMonthlySavings *
    ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);

  const totalContributed = totalMonthlySavings * months;

  return {
    totalChallengesCompleted: challenges.length,
    totalMonthlySavings: Math.round(totalMonthlySavings * 100) / 100,
    totalAnnualSavings: Math.round(totalMonthlySavings * 12 * 100) / 100,
    yearsOfContinuedImpact: yearsUntilRetirement,
    totalContributedByRetirement: Math.round(totalContributed * 100) / 100,
    projectedFutureValue: Math.round(futureValue * 100) / 100,
    interestEarned: Math.round((futureValue - totalContributed) * 100) / 100,
    averageROI:
      Math.round(
        ((futureValue - totalContributed) / totalContributed) * 100 * 100,
      ) / 100,
  };
}

/**
 * Get motivational breakdown of challenge impact
 * Shows immediate, short-term, and long-term benefits
 * @param {number} estimatedSaving - Monthly saving amount
 * @returns {object} Motivational breakdown
 */
function getImpactBreakdown(estimatedSaving) {
  return {
    immediate: {
      timeframe: "This month",
      amount: Math.round(estimatedSaving * 100) / 100,
      message: `You save RM${estimatedSaving} this month`,
    },
    shortTerm: {
      timeframe: "This year",
      amount: Math.round(estimatedSaving * 12 * 100) / 100,
      message: `Save RM${estimatedSaving * 12} in 1 year`,
    },
    mediumTerm: {
      timeframe: "In 5 years",
      amount: Math.round(estimatedSaving * 60 * 1.05 * 100) / 100, // With 5% annual return
      message: `Your savings grow to RM${Math.round(estimatedSaving * 60 * 1.05 * 100) / 100} (with interest)`,
    },
    longTerm: {
      timeframe: "By age 65",
      amount: "See Projection page",
      message: "Impact multiplies with time and compounding",
    },
  };
}

/**
 * Compare two scenarios: with challenge vs without
 * @param {number} monthlyWithoutChallenge - Current monthly savings (RM)
 * @param {number} monthlyWithChallenge - Monthly savings if challenge accepted (RM)
 * @param {number} yearsToRetirement - Years until retirement
 * @param {number} returnRate - Annual return rate
 * @returns {object} Comparison analysis
 */
function compareScenarios(
  monthlyWithoutChallenge,
  monthlyWithChallenge,
  yearsToRetirement,
  returnRate = 0.05,
) {
  const withoutChallenge = calculateChallengeROI({
    estimatedSaving: monthlyWithoutChallenge,
    yearsUntilRetirement: yearsToRetirement,
    annualReturnRate: returnRate,
  });

  const withChallenge = calculateChallengeROI({
    estimatedSaving: monthlyWithChallenge,
    yearsUntilRetirement: yearsToRetirement,
    annualReturnRate: returnRate,
  });

  const difference =
    withChallenge.projectedFutureValue - withoutChallenge.projectedFutureValue;

  return {
    scenario1: {
      name: "Without challenge",
      monthlyAmount: withoutChallenge.monthlyContribution,
      futureValue: withoutChallenge.projectedFutureValue,
    },
    scenario2: {
      name: "With challenge",
      monthlyAmount: withChallenge.monthlyContribution,
      futureValue: withChallenge.projectedFutureValue,
    },
    difference: {
      amount: Math.round(difference * 100) / 100,
      percentage:
        Math.round(
          (difference / withoutChallenge.projectedFutureValue) * 100 * 100,
        ) / 100,
      message: `Completing this challenge gives you an extra RM${Math.round(difference * 100) / 100} by retirement!`,
    },
  };
}

/**
 * Calculate impact of habit stacking (multiple challenges)
 * Shows how each additional challenge compounds
 * @param {array} challengeSavings - Array of monthly saving amounts for each challenge
 * @param {number} yearsToRetirement
 * @param {number} returnRate
 * @returns {array} Progressive impact
 */
function calculateHabitStackingEffect(
  challengeSavings,
  yearsToRetirement,
  returnRate = 0.05,
) {
  const progression = [];
  let cumulativeSavings = 0;

  challengeSavings.forEach((saving, index) => {
    cumulativeSavings += saving;

    const roi = calculateChallengeROI({
      estimatedSaving: cumulativeSavings,
      yearsUntilRetirement: yearsToRetirement,
      annualReturnRate: returnRate,
    });

    progression.push({
      challengeNumber: index + 1,
      monthlyAmount: cumulativeSavings,
      projectedValue: roi.projectedFutureValue,
      marginalImpact:
        index === 0
          ? roi.projectedFutureValue
          : roi.projectedFutureValue - progression[index - 1].projectedValue,
      motivation: `Complete ${index + 1} challenge${index > 0 ? "s" : ""} = RM${roi.projectedFutureValue} by retirement!`,
    });
  });

  return progression;
}

/**
 * Generate shareable ROI stats for social media
 * @param {object} roi - From calculateChallengeROI
 * @returns {object} Stats for sharing
 */
function generateShareableROIStats(roi) {
  return {
    headline: `Completed a financial challenge! 💪`,
    stats: [
      `💰 Saving RM${roi.monthlyContribution}/month`,
      `📈 Will have RM${roi.projectedFutureValue} by retirement`,
      `🎯 That's RM${roi.interestEarned} in interest alone!`,
    ],
    shareText: `I just completed a financial challenge on DuitSense! Saving RM${roi.monthlyContribution}/month will give me RM${roi.projectedFutureValue} by retirement. Join me in building better financial habits! 💪`,
  };
}

/**
 * Calculate payback period for an upfront cost challenge
 * (e.g., buying an ASB certificate for RM1000, then saving RM100/month)
 * @param {number} upfrontCost - Initial cost
 * @param {number} monthlyBenefit - Monthly benefit/savings
 * @returns {object} Payback analysis
 */
function calculatePaybackPeriod(upfrontCost, monthlyBenefit) {
  if (monthlyBenefit <= 0) {
    return {
      paybackMonths: Infinity,
      message: "Monthly benefit must be positive",
    };
  }

  const paybackMonths = Math.ceil(upfrontCost / monthlyBenefit);

  return {
    upfrontCost: Math.round(upfrontCost * 100) / 100,
    monthlyBenefit: Math.round(monthlyBenefit * 100) / 100,
    paybackMonths,
    paybackYears: Math.round((paybackMonths / 12) * 100) / 100,
    message: `You break even in ${paybackMonths} months (${Math.round((paybackMonths / 12) * 100) / 100} years)`,
  };
}

module.exports = {
  calculateChallengeROI,
  calculateAggregateImpact,
  getImpactBreakdown,
  compareScenarios,
  calculateHabitStackingEffect,
  generateShareableROIStats,
  calculatePaybackPeriod,
};
