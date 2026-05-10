/**
 * EPF CALCULATOR
 * Calculates Employee Provident Fund projections based on Malaysian contribution rates
 * Real rates: 11% employee + 13% employer contribution (24% total annual)
 * Includes BNM inflation at 3.2% p.a. and compounding monthly
 */

const EMPLOYEE_CONTRIBUTION_RATE = 0.11; // 11% of salary
const EMPLOYER_CONTRIBUTION_RATE = 0.13; // 13% of salary
const TOTAL_CONTRIBUTION_RATE =
  EMPLOYEE_CONTRIBUTION_RATE + EMPLOYER_CONTRIBUTION_RATE; // 24%
const BNM_INFLATION_RATE = 0.032; // 3.2% p.a. inflation per BNM
const COMPOUNDING_FREQUENCY = 12; // Monthly compounding

/**
 * Calculate EPF contributions for a single month
 * @param {number} monthlyIncome - User's estimated monthly income (RM)
 * @returns {object} Monthly contribution breakdown
 */
function calculateMonthlyEPFContribution(monthlyIncome) {
  const monthlyRate = TOTAL_CONTRIBUTION_RATE / COMPOUNDING_FREQUENCY;
  const employeeContribution =
    monthlyIncome * (EMPLOYEE_CONTRIBUTION_RATE / COMPOUNDING_FREQUENCY);
  const employerContribution =
    monthlyIncome * (EMPLOYER_CONTRIBUTION_RATE / COMPOUNDING_FREQUENCY);

  return {
    monthlyIncome,
    employeeContribution: Math.round(employeeContribution * 100) / 100,
    employerContribution: Math.round(employerContribution * 100) / 100,
    totalMonthlyContribution:
      Math.round((employeeContribution + employerContribution) * 100) / 100,
    annualContribution:
      Math.round((employeeContribution + employerContribution) * 12 * 100) /
      100,
  };
}

/**
 * Project EPF balance growth from current age to target age
 * Applies monthly compounding with BNM inflation adjustment
 * @param {object} params - Projection parameters
 * @param {number} params.currentBalance - Current EPF balance (RM)
 * @param {number} params.monthlyIncome - Monthly income (RM)
 * @param {number} params.currentAge - Current age (years)
 * @param {number} params.targetAge - Target age for projection (years)
 * @param {number} params.incomeGrowth - Annual income growth rate (default 0.03 = 3%)
 * @returns {array} Array of {age, balance, yearlyContribution}
 */
function projectEPFBalance(params) {
  const {
    currentBalance,
    monthlyIncome,
    currentAge,
    targetAge,
    incomeGrowth = 0.03,
  } = params;

  if (!currentBalance || currentBalance < 0) {
    throw new Error("Invalid current EPF balance");
  }
  if (!monthlyIncome || monthlyIncome <= 0) {
    throw new Error("Invalid monthly income");
  }
  if (!currentAge || currentAge < 0 || currentAge > 100) {
    throw new Error("Invalid current age");
  }
  if (!targetAge || targetAge <= currentAge) {
    throw new Error("Target age must be greater than current age");
  }

  const monthlyInflationRate = Math.pow(1 + BNM_INFLATION_RATE, 1 / 12) - 1;
  const monthlyIncomeGrowthRate = Math.pow(1 + incomeGrowth, 1 / 12) - 1;
  const monthlyContributionRate =
    TOTAL_CONTRIBUTION_RATE / COMPOUNDING_FREQUENCY;

  let balance = currentBalance;
  let income = monthlyIncome;
  let balanceAtAge = []; // Store balance only at age boundaries

  // Iterate month by month
  for (let age = currentAge; age <= targetAge; age += 1 / 12) {
    // Add monthly EPF contribution (employee + employer)
    const monthlyContribution = income * monthlyContributionRate;
    balance += monthlyContribution;

    // Apply inflation-adjusted interest (EPF actual returns vary; this is conservative estimate)
    const monthlyReturn = balance * (monthlyInflationRate * 0.5); // Conservative: half of inflation
    balance += monthlyReturn;

    // Increase income annually
    income *= 1 + monthlyIncomeGrowthRate;

    // Store snapshot at each year boundary
    if (Math.abs((age % 1) - 0) < 0.001 || age === Math.ceil(currentAge)) {
      const ageInt = Math.round(age);
      if (!balanceAtAge.some((b) => b.age === ageInt)) {
        balanceAtAge.push({
          age: ageInt,
          balance: Math.round(balance * 100) / 100,
          yearlyContribution:
            Math.round(income * monthlyContributionRate * 12 * 100) / 100,
        });
      }
    }
  }

  return balanceAtAge;
}

/**
 * Calculate if user will reach a savings milestone by target age
 * @param {object} params - Same as projectEPFBalance
 * @param {number} milestone - Target amount in RM
 * @returns {object} Milestone analysis
 */
function analyzeEPFMilestone(params, milestone) {
  const projection = projectEPFBalance(params);
  const finalBalance = projection[projection.length - 1].balance;
  const reachMilestone = finalBalance >= milestone;

  return {
    targetMilestone: milestone,
    projectedBalance: finalBalance,
    reachMilestone,
    shortfall: reachMilestone
      ? 0
      : Math.round((milestone - finalBalance) * 100) / 100,
    yearsToMilestone: reachMilestone ? Math.round(projection.length - 1) : null,
  };
}

/**
 * Calculate age when user can withdraw from EPF Account 2 (age 50)
 * or Account 3 (age 55) or full withdrawal (age 60)
 * @param {number} currentAge
 * @returns {object} EPF withdrawal milestones
 */
function getEPFWithdrawalMilestones(currentAge) {
  const milestones = {
    account2Withdrawal: {
      age: 50,
      yearsUntil: Math.max(0, 50 - currentAge),
      description: "Can withdraw from Account 2 (Housing, medical, education)",
    },
    account3Withdrawal: {
      age: 55,
      yearsUntil: Math.max(0, 55 - currentAge),
      description: "Can withdraw from Account 3 (Healthcare)",
    },
    fullWithdrawal: {
      age: 60,
      yearsUntil: Math.max(0, 60 - currentAge),
      description: "Can withdraw full balance at retirement",
    },
    account2Locked: {
      age: 60,
      description: "Account 2 funds automatically locked in Account 1",
    },
  };

  return milestones;
}

module.exports = {
  calculateMonthlyEPFContribution,
  projectEPFBalance,
  analyzeEPFMilestone,
  getEPFWithdrawalMilestones,
  EMPLOYEE_CONTRIBUTION_RATE,
  EMPLOYER_CONTRIBUTION_RATE,
  TOTAL_CONTRIBUTION_RATE,
  BNM_INFLATION_RATE,
};
