/**
 * REWARD MANAGER
 * Manages reward allocation, voucher generation, fulfillment logic
 * Prevents abuse and ensures fairness
 */

const crypto = require("crypto");

/**
 * Generate a unique voucher code
 * Format: PREFIX-RANDOM (e.g., DSV-A7K9X2L5)
 * @param {string} prefix - Voucher prefix (default 'DSV' for DuitSense Voucher)
 * @returns {string} Unique voucher code
 */
function generateVoucherCode(prefix = "DSV") {
  const randomPart = crypto
    .randomBytes(4)
    .toString("hex")
    .toUpperCase()
    .substring(0, 8);
  return `${prefix}-${randomPart}`;
}

/**
 * Create a voucher reward
 * @param {object} params - Voucher creation params
 * @param {string} params.userId - User ID
 * @param {number} params.value - Voucher value in RM
 * @param {number} params.expiryDays - Days until expiry (default 30)
 * @param {string} params.category - Category (optional, for targeting)
 * @returns {object} Voucher object
 */
function createVoucher(params) {
  const { userId, value, expiryDays = 30, category = "general" } = params;

  if (!userId || !value || value <= 0) {
    throw new Error("userId and positive value required");
  }

  const now = new Date();
  const expiry = new Date(now.getTime() + expiryDays * 24 * 60 * 60 * 1000);

  return {
    voucherId: crypto.randomUUID(),
    code: generateVoucherCode(),
    userId,
    value,
    category,
    status: "active", // active, claimed, expired, cancelled
    createdAt: now.toISOString(),
    expiryDate: expiry.toISOString(),
    claimedAt: null,
    redeemedAt: null,
  };
}

/**
 * Validate and redeem a voucher
 * @param {object} voucher - Voucher object
 * @param {date} now - Current date for validation
 * @returns {object} Redemption result
 */
function redeemVoucher(voucher, now = new Date()) {
  // Check status
  if (voucher.status === "redeemed") {
    return {
      success: false,
      reason: "Voucher already redeemed",
      timestamp: now.toISOString(),
    };
  }

  if (voucher.status === "expired") {
    return {
      success: false,
      reason: "Voucher expired",
      timestamp: now.toISOString(),
    };
  }

  // Check expiry
  const expiryDate = new Date(voucher.expiryDate);
  if (now > expiryDate) {
    return {
      success: false,
      reason: "Voucher expired",
      timestamp: now.toISOString(),
    };
  }

  return {
    success: true,
    voucherId: voucher.voucherId,
    value: voucher.value,
    redeemedAt: now.toISOString(),
    timestamp: now.toISOString(),
  };
}

/**
 * TnG reload voucher creation
 * @param {object} params - TnG params
 * @param {string} params.userId - User ID
 * @param {number} params.amount - Reload amount in RM
 * @param {string} params.tngNumber - User's TnG card number (masked for storage)
 * @returns {object} TnG reload record
 */
function createTnGReload(params) {
  const { userId, amount, tngNumber } = params;

  if (!userId || !amount || amount <= 0) {
    throw new Error("userId and positive amount required");
  }

  if (!tngNumber || tngNumber.length < 8) {
    throw new Error("Valid TnG number required");
  }

  const maskedNumber = `${tngNumber.substring(0, 4)}****${tngNumber.substring(tngNumber.length - 2)}`;

  return {
    reloadId: crypto.randomUUID(),
    userId,
    amount,
    cardNumberMasked: maskedNumber,
    status: "pending", // pending, processing, completed, failed
    createdAt: new Date().toISOString(),
    processedAt: null,
    failureReason: null,
  };
}

/**
 * Process TnG reload (would call actual TnG API in production)
 * @param {object} tngReload - TnG reload record
 * @returns {object} Processing result
 */
function processTnGReload(tngReload) {
  // Simulate processing
  const isSuccess = Math.random() > 0.05; // 95% success rate

  if (!isSuccess) {
    return {
      reloadId: tngReload.reloadId,
      status: "failed",
      reason: "API connection failed. Will retry.",
      processedAt: new Date().toISOString(),
    };
  }

  return {
    reloadId: tngReload.reloadId,
    status: "completed",
    amount: tngReload.amount,
    cardNumberMasked: tngReload.cardNumberMasked,
    processedAt: new Date().toISOString(),
    message: `RM${tngReload.amount} successfully reloaded to ${tngReload.cardNumberMasked}`,
  };
}

/**
 * Create a reward entry in the system
 * @param {object} params - Reward params
 * @param {string} params.userId - User ID
 * @param {string} params.rewardType - 'voucher', 'tng', 'multiplier', 'cashback'
 * @param {number} params.value - Reward value/amount
 * @param {string} params.source - Where reward came from ('spin', 'challenge', 'bonus', 'referral')
 * @returns {object} Reward record
 */
function createReward(params) {
  const { userId, rewardType, value, source } = params;

  if (!userId || !rewardType || value === undefined) {
    throw new Error("userId, rewardType, and value required");
  }

  return {
    rewardId: crypto.randomUUID(),
    userId,
    type: rewardType,
    value,
    source, // Tracking where it came from
    status: "active",
    createdAt: new Date().toISOString(),
    claimedAt: null,
    fulfilledAt: null,
  };
}

/**
 * Track reward claiming to prevent double-claiming
 * @param {object} reward - Reward object
 * @returns {object} Claim record
 */
function claimReward(reward) {
  if (reward.status === "claimed") {
    return {
      success: false,
      reason: "Reward already claimed",
      rewardId: reward.rewardId,
    };
  }

  return {
    success: true,
    rewardId: reward.rewardId,
    type: reward.type,
    value: reward.value,
    claimedAt: new Date().toISOString(),
  };
}

/**
 * XP Multiplier reward
 * @param {object} params - Multiplier params
 * @param {string} params.userId - User ID
 * @param {number} params.multiplier - Multiplier value (e.g., 2 for 2x)
 * @param {number} params.durationDays - How long multiplier lasts
 * @returns {object} Multiplier record
 */
function createXPMultiplier(params) {
  const { userId, multiplier = 2, durationDays = 7 } = params;

  const startDate = new Date();
  const endDate = new Date(
    startDate.getTime() + durationDays * 24 * 60 * 60 * 1000,
  );

  return {
    multiplyId: crypto.randomUUID(),
    userId,
    multiplier,
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
    active: true,
    xpEarned: 0, // Track XP earned during this period
  };
}

/**
 * Cashback coupon creation
 * @param {object} params - Cashback params
 * @param {string} params.userId - User ID
 * @param {number} params.cashbackRate - Rate (e.g., 0.05 for 5%)
 * @param {number} params.maxUses - How many times it can be used (default 10)
 * @returns {object} Cashback record
 */
function createCashbackCoupon(params) {
  const { userId, cashbackRate, maxUses = 10 } = params;

  if (!userId || !cashbackRate || cashbackRate <= 0) {
    throw new Error("userId and positive cashbackRate required");
  }

  return {
    couponId: crypto.randomUUID(),
    userId,
    cashbackRate,
    maxUses,
    usedCount: 0,
    status: "active",
    createdAt: new Date().toISOString(),
    expiryDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
  };
}

/**
 * Apply cashback to a transaction
 * @param {object} cashback - Cashback coupon
 * @param {number} transactionAmount - Amount to apply cashback to
 * @returns {object} Cashback application result
 */
function applyCashback(cashback, transactionAmount) {
  if (cashback.usedCount >= cashback.maxUses) {
    return {
      success: false,
      reason: "Cashback coupon exhausted",
      couponId: cashback.couponId,
    };
  }

  if (cashback.status !== "active") {
    return {
      success: false,
      reason: "Cashback coupon inactive",
      couponId: cashback.couponId,
    };
  }

  const cashbackAmount =
    Math.round(transactionAmount * cashback.cashbackRate * 100) / 100;

  return {
    success: true,
    couponId: cashback.couponId,
    transactionAmount,
    cashbackRate: cashback.cashbackRate,
    cashbackAmount,
    usesRemaining: cashback.maxUses - cashback.usedCount - 1,
  };
}

/**
 * Reward history analytics
 * @param {array} rewards - Array of reward objects
 * @returns {object} Reward statistics
 */
function analyzeRewardHistory(rewards = []) {
  if (rewards.length === 0) {
    return {
      totalRewards: 0,
      rewardsByType: {},
      totalValue: 0,
      message: "No rewards earned yet",
    };
  }

  const byType = {};
  let totalValue = 0;

  rewards.forEach((reward) => {
    byType[reward.type] = (byType[reward.type] || 0) + 1;
    if (reward.value) {
      totalValue += reward.value;
    }
  });

  return {
    totalRewards: rewards.length,
    rewardsByType: byType,
    totalValue: Math.round(totalValue * 100) / 100,
    averageRewardValue:
      rewards.length > 0
        ? Math.round((totalValue / rewards.length) * 100) / 100
        : 0,
    mostCommonType: Object.entries(byType).sort((a, b) => b[1] - a[1])[0]?.[0],
  };
}

/**
 * Prevent reward abuse - check if user is claiming too many rewards
 * @param {object} params - Abuse check params
 * @param {string} params.userId - User ID
 * @param {array} params.recentClaims - Recent reward claims (last 24h)
 * @param {number} params.maxClaimsPerDay - Max allowed (default 5)
 * @returns {object} Abuse check result
 */
function checkRewardAbusePattern(params) {
  const { userId, recentClaims = [], maxClaimsPerDay = 5 } = params;

  const todaysClaims = recentClaims.filter((claim) => {
    const claimDate = new Date(claim.claimedAt);
    const today = new Date();
    return claimDate.toDateString() === today.toDateString();
  });

  const isAbusive = todaysClaims.length >= maxClaimsPerDay;

  return {
    userId,
    todaysClaims: todaysClaims.length,
    maxAllowed: maxClaimsPerDay,
    isAbusive,
    reason: isAbusive ? "Exceeded daily reward limit" : "Normal activity",
    nextResetTime: new Date(
      new Date().getTime() + 24 * 60 * 60 * 1000,
    ).toISOString(),
  };
}

module.exports = {
  generateVoucherCode,
  createVoucher,
  redeemVoucher,
  createTnGReload,
  processTnGReload,
  createReward,
  claimReward,
  createXPMultiplier,
  createCashbackCoupon,
  applyCashback,
  analyzeRewardHistory,
  checkRewardAbusePattern,
};
