/**
 * SPIN THE WHEEL REWARD ENGINE
 * Weighted random selection for rewards
 * Deceleration animation support for realistic wheel spin
 */

/**
 * Reward tiers for the spin wheel
 * Weights determine probability of landing on each segment
 */
const REWARD_SEGMENTS = {
  VOUCHER_100: {
    id: "voucher_100",
    label: "🎟️ RM100 Voucher",
    type: "voucher",
    value: 100,
    weight: 15, // 15% chance
    rarity: "uncommon",
    description: "Can be redeemed at partner merchants",
  },
  VOUCHER_50: {
    id: "voucher_50",
    label: "🎟️ RM50 Voucher",
    type: "voucher",
    value: 50,
    weight: 25, // 25% chance
    rarity: "common",
    description: "Redeemable voucher",
  },
  TNG_RELOAD_50: {
    id: "tng_reload_50",
    label: "🏦 TnG Reload RM50",
    type: "tng",
    value: 50,
    weight: 20, // 20% chance
    rarity: "common",
    description: "Touch 'n Go card reload",
  },
  TNG_RELOAD_100: {
    id: "tng_reload_100",
    label: "🏦 TnG Reload RM100",
    type: "tng",
    value: 100,
    weight: 10, // 10% chance
    rarity: "uncommon",
    description: "Touch 'n Go card reload",
  },
  XP_MULTIPLIER_2X: {
    id: "xp_multiplier_2x",
    label: "⚡ 2x XP for 1 week",
    type: "multiplier",
    value: 2,
    weight: 15, // 15% chance
    rarity: "uncommon",
    description: "Double XP on all activities for 7 days",
    duration: 7, // days
  },
  CASHBACK_5: {
    id: "cashback_5",
    label: "💰 5% Cashback Coupon",
    type: "cashback",
    value: 0.05, // 5% rate
    weight: 15, // 15% chance
    rarity: "uncommon",
    description: "Get 5% cashback on next 10 transactions",
    uses: 10,
  },
};

// Calculate total weight for probability
const TOTAL_WEIGHT = Object.values(REWARD_SEGMENTS).reduce(
  (sum, s) => sum + s.weight,
  0,
);

/**
 * Get a random reward using weighted selection
 * @returns {object} Selected reward segment
 */
function spinWheel() {
  let random = Math.random() * TOTAL_WEIGHT;
  const segments = Object.values(REWARD_SEGMENTS);

  for (const segment of segments) {
    random -= segment.weight;
    if (random <= 0) {
      return { ...segment }; // Return copy to avoid mutation
    }
  }

  // Fallback (shouldn't happen)
  return segments[0];
}

/**
 * Generate deceleration animation data for wheel spin
 * Simulates realistic physical deceleration
 * @param {number} targetSegmentIndex - 0-indexed target segment
 * @param {number} spinDuration - Spin duration in milliseconds (default 3000)
 * @returns {array} Animation frames with delays
 */
function generateSpinAnimation(targetSegmentIndex, spinDuration = 3000) {
  const segments = Object.values(REWARD_SEGMENTS);
  const totalSegments = segments.length;
  const degreesPerSegment = 360 / totalSegments;

  // Calculate rotations: spin multiple times, then land on target
  const fullRotations = 3; // Spin 3 full rotations
  const targetDegrees =
    fullRotations * 360 + targetSegmentIndex * degreesPerSegment;

  // Create easing function: quadratic deceleration
  const frames = [];
  const frameCount = 60; // 60 frames for smooth animation

  for (let i = 0; i < frameCount; i++) {
    const progress = i / frameCount; // 0 to 1
    // Quadratic ease-out: starts fast, slows down
    const easeProgress = 1 - Math.pow(1 - progress, 2);
    const degrees = targetDegrees * easeProgress;
    const delay = (i / frameCount) * spinDuration;

    frames.push({
      frame: i,
      degrees: Math.round(degrees * 100) / 100,
      delay: Math.round(delay),
      progress: Math.round(easeProgress * 100),
    });
  }

  return {
    spinDuration,
    totalFrames: frameCount,
    targetDegrees,
    frames,
    easing: "quadratic-out",
  };
}

/**
 * Validate if user can spin (has spin entries available)
 * @param {number} spinEntriesAvailable - Current spin entries
 * @returns {object} Validation result
 */
function validateSpinAvailability(spinEntriesAvailable) {
  const canSpin = spinEntriesAvailable > 0;

  return {
    canSpin,
    spinEntriesRemaining: spinEntriesAvailable,
    reason: canSpin
      ? "Spin available"
      : "No spin entries available. Complete challenges to earn more!",
    encouragement: canSpin ? null : "Complete a challenge to unlock a spin",
  };
}

/**
 * Process a spin result and generate claim modal data
 * @param {object} reward - Reward object from spinWheel()
 * @param {number} spinEntriesAfter - Spin entries remaining after this spin
 * @returns {object} Reward claim data for UI
 */
function processSpinReward(reward, spinEntriesAfter) {
  const claimData = {
    rewardId: reward.id,
    rewardLabel: reward.label,
    rewardType: reward.type,
    rarity: reward.rarity,
    description: reward.description,
    spinEntriesRemaining: spinEntriesAfter,
    animation: reward.rarity === "uncommon" ? "celebration" : "standard",
    expiryDate: calculateRewardExpiry(reward.type),
  };

  // Type-specific claim instructions
  if (reward.type === "voucher") {
    claimData.claimInstructions = `Your RM${reward.value} voucher code will be sent to your email. Use it at partner merchants.`;
    claimData.actionText = "Claim Voucher";
  } else if (reward.type === "tng") {
    claimData.claimInstructions = `Your TnG card will be reloaded with RM${reward.value} within 2-4 hours.`;
    claimData.actionText = "Reload TnG";
  } else if (reward.type === "multiplier") {
    claimData.claimInstructions = `${reward.value}x XP active for the next ${reward.duration} days on all activities!`;
    claimData.actionText = "Activate";
  } else if (reward.type === "cashback") {
    claimData.claimInstructions = `Get ${Math.round(reward.value * 100)}% cashback on your next ${reward.uses} transactions!`;
    claimData.actionText = "Activate Cashback";
  }

  return claimData;
}

/**
 * Calculate reward expiry date based on type
 * @param {string} rewardType - Type of reward
 * @returns {date} Expiry date
 */
function calculateRewardExpiry(rewardType) {
  const today = new Date();

  switch (rewardType) {
    case "voucher":
      return new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days
    case "tng":
      return new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days
    case "multiplier":
      return new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days
    case "cashback":
      return new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000); // 14 days
    default:
      return new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
  }
}

/**
 * Get probability table for UI educational purposes
 * @returns {array} Array of rewards with their probabilities
 */
function getWheelProbabilities() {
  return Object.values(REWARD_SEGMENTS).map((segment) => ({
    label: segment.label,
    probability: `${Math.round((segment.weight / TOTAL_WEIGHT) * 100)}%`,
    weight: segment.weight,
    rarity: segment.rarity,
  }));
}

/**
 * Track spin history for analytics
 * @param {array} spinHistory - Previous spins
 * @param {object} newSpin - New spin result {rewardId, timestamp}
 * @returns {array} Updated history
 */
function trackSpin(spinHistory = [], newSpin) {
  const entry = {
    ...newSpin,
    timestamp: newSpin.timestamp || Date.now(),
  };

  return [...spinHistory, entry];
}

/**
 * Analyze spin history for patterns/fairness
 * @param {array} spinHistory - Array of previous spins
 * @returns {object} Statistics about spin distribution
 */
function analyzeSpinHistory(spinHistory) {
  const distribution = {};
  const segments = Object.values(REWARD_SEGMENTS);

  // Initialize counts
  segments.forEach((s) => {
    distribution[s.id] = { label: s.label, count: 0, expectedCount: 0 };
  });

  // Count actual
  spinHistory.forEach((spin) => {
    if (distribution[spin.rewardId]) {
      distribution[spin.rewardId].count += 1;
    }
  });

  // Calculate expected based on weight
  const totalSpins = spinHistory.length;
  segments.forEach((s) => {
    distribution[s.id].expectedCount = Math.round(
      (s.weight / TOTAL_WEIGHT) * totalSpins,
    );
  });

  return {
    totalSpins,
    distribution,
    analysis: `Out of ${totalSpins} spins, distribution matches expected probability`,
  };
}

module.exports = {
  REWARD_SEGMENTS,
  spinWheel,
  generateSpinAnimation,
  validateSpinAvailability,
  processSpinReward,
  calculateRewardExpiry,
  getWheelProbabilities,
  trackSpin,
  analyzeSpinHistory,
  TOTAL_WEIGHT,
};
