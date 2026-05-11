/**
 * STREAK SYSTEM
 * Manages 7-day streaks, streak multipliers, bonuses
 * Tracks daily activity, resets on missed days, awards bonuses
 */

const STREAK_BONUS_THRESHOLD = 7; // Bonus at day 7
const MAX_STREAK_MULTIPLIER = 2; // 2x XP at day 7
const STREAK_LOST_PENALTY = 0; // No XP penalty, but streak resets
const BASE_XP_PER_ACTION = 10;

/**
 * Calculate current streak status for a user
 * @param {object} params - Streak calculation params
 * @param {array} params.activityLog - Array of {date, action_type} ordered by date DESC
 * @param {date} params.today - Today's date for comparison (default new Date())
 * @returns {object} Streak information and status
 */
function calculateStreakStatus(params) {
  const { activityLog = [], today = new Date() } = params;

  if (!activityLog || activityLog.length === 0) {
    return {
      currentStreak: 0,
      streakStatus: "none",
      lastActivityDate: null,
      daysUntilStreakLost: 1,
      multiplier: 1,
      bonusEarned: false,
    };
  }

  // Sort by date descending (most recent first)
  const sorted = [...activityLog].sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );

  let currentStreak = 0;
  let checkDate = new Date(today);
  checkDate.setHours(0, 0, 0, 0);

  // Check each day backwards from today
  for (let day = 0; day < 365; day++) {
    const dayStr = checkDate.toISOString().split("T")[0];
    const hasActivity = sorted.some((log) => log.date.split("T")[0] === dayStr);

    if (hasActivity) {
      currentStreak += 1;
    } else {
      // Streak broken
      break;
    }

    checkDate.setDate(checkDate.getDate() - 1);
  }

  const lastActivity = new Date(sorted[0].date);
  lastActivity.setHours(0, 0, 0, 0);

  const todayCheck = new Date(today);
  todayCheck.setHours(0, 0, 0, 0);

  const timeSinceLastActivity = Math.floor(
    (todayCheck - lastActivity) / (1000 * 60 * 60 * 24),
  );

  const streakStatus =
    timeSinceLastActivity === 0
      ? "active"
      : timeSinceLastActivity > 1
        ? "lost"
        : "at_risk";

  return {
    currentStreak,
    streakStatus, // 'active', 'at_risk', 'lost', 'none'
    lastActivityDate: sorted[0].date,
    daysUntilStreakLost: Math.max(0, 2 - timeSinceLastActivity), // Loses after missing 1 day
    multiplier: calculateStreakMultiplier(currentStreak),
    bonusEarned: currentStreak >= STREAK_BONUS_THRESHOLD,
    bonusXP: currentStreak >= STREAK_BONUS_THRESHOLD ? 50 : 0,
  };
}

/**
 * Calculate XP multiplier based on current streak
 * Linear scaling: 1x at day 1, 2x at day 7+
 * @param {number} streak - Current streak day count
 * @returns {number} Multiplier (1.0 to 2.0)
 */
function calculateStreakMultiplier(streak) {
  if (streak < 1) return 1;
  if (streak >= STREAK_BONUS_THRESHOLD) return MAX_STREAK_MULTIPLIER;

  // Linear interpolation: day 1 = 1x, day 7 = 2x
  return (
    1 +
    (streak - 1) * ((MAX_STREAK_MULTIPLIER - 1) / (STREAK_BONUS_THRESHOLD - 1))
  );
}

/**
 * Calculate XP reward with streak multiplier applied
 * @param {number} baseXP - Base XP before multiplier
 * @param {number} streakMultiplier - Multiplier from calculateStreakMultiplier
 * @returns {object} {baseXP, multiplier, totalXP, breakdown}
 */
function calculateStreakXPReward(baseXP, streakMultiplier) {
  const totalXP = Math.round(baseXP * streakMultiplier);
  const bonusXP = totalXP - baseXP;

  return {
    baseXP,
    multiplier: streakMultiplier,
    totalXP,
    bonusXP,
    breakdown: `${baseXP} base + ${bonusXP} streak bonus = ${totalXP} XP`,
  };
}

/**
 * Log a user activity (challenge completed, quiz done, etc)
 * @param {object} params - Activity logging params
 * @param {string} params.userId - User ID
 * @param {string} params.actionType - Type of action (challenge, quiz, expense_logged)
 * @param {date} params.date - When the action occurred
 * @returns {object} Updated activity with timestamp
 */
function logActivity(params) {
  const { userId, actionType, date = new Date() } = params;

  if (!userId || !actionType) {
    throw new Error("userId and actionType are required");
  }

  return {
    userId,
    actionType,
    date: date.toISOString(),
    timestamp: Date.now(),
  };
}

/**
 * Check if streak is at risk and generate notification content
 * @param {object} streakStatus - From calculateStreakStatus
 * @returns {object|null} Notification details or null if not at risk
 */
function getStreakAtRiskNotification(streakStatus) {
  if (streakStatus.streakStatus !== "at_risk") {
    return null;
  }

  return {
    title: "Your streak is at risk! 🔥",
    body: `Complete 1 activity today to keep your ${streakStatus.currentStreak}-day streak alive!`,
    urgency: "high",
    daysUntilLost: streakStatus.daysUntilStreakLost,
    currentStreak: streakStatus.currentStreak,
  };
}

/**
 * Get streak lost animation/notification
 * @param {number} previousStreak - Streak count before it was lost
 * @returns {object} Animation and notification data
 */
function getStreakLostNotification(previousStreak) {
  return {
    type: "streak_lost",
    title: "Streak Lost 😢",
    body: `You had a ${previousStreak}-day streak! Time to start a new one.`,
    previousStreak,
    animationType: "shake", // For UI animation
  };
}

/**
 * Get bonus unlock animation (when streak reaches day 7)
 * @param {number} bonusXP - XP bonus amount
 * @returns {object} Celebration animation data
 */
function getStreakBonusUnlockAnimation(bonusXP) {
  return {
    type: "bonus_unlock",
    title: "7-Day Streak! 🎉",
    body: `You earned ${bonusXP} bonus XP! Keep it up!`,
    bonusXP,
    animationType: "confetti", // For UI animation
    badge: "seven_day_warrior",
  };
}

/**
 * Reset streak (typically from a cron job at midnight)
 * Called daily at midnight MYT to update streak status
 * @param {object} params - Reset parameters
 * @param {date} params.lastActivityDate - Last time user was active
 * @param {date} params.today - Today's date (default new Date())
 * @returns {object} Reset result
 */
function resetStreakIfNeeded(params) {
  const { lastActivityDate, today = new Date() } = params;

  if (!lastActivityDate) {
    return { streakReset: false, reason: "No previous activity" };
  }

  const last = new Date(lastActivityDate);
  last.setHours(0, 0, 0, 0);

  const todayCheck = new Date(today);
  todayCheck.setHours(0, 0, 0, 0);

  const daysSinceActivity = Math.floor(
    (todayCheck - last) / (1000 * 60 * 60 * 24),
  );

  if (daysSinceActivity > 1) {
    return {
      streakReset: true,
      reason: "Missed more than 1 day",
      daysSinceActivity,
    };
  }

  return { streakReset: false, reason: "Activity within acceptable window" };
}

/**
 * Streak progression visualization data
 * Shows 7 circles: filled for completed days, empty for remaining
 * @param {number} currentStreak - Current streak count
 * @returns {array} Array of {day, filled, milestone}
 */
function getStreakVisualization(currentStreak) {
  const visualization = [];

  for (let day = 1; day <= 7; day++) {
    visualization.push({
      day,
      filled: day <= Math.min(currentStreak, 7),
      milestone: day === 7,
      label: day === 7 ? "🎁 Bonus" : `Day ${day}`,
    });
  }

  return visualization;
}

/**
 * Get motivational message based on streak progress
 * @param {number} currentStreak
 * @returns {string} Motivational message
 */
function getStreakMotivationalMessage(currentStreak) {
  if (currentStreak === 0) {
    return "Let's start a new streak! 🚀 Complete an activity today.";
  }
  if (currentStreak === 1) {
    return "1 day down! You got this 💪";
  }
  if (currentStreak === 3) {
    return "3-day streak! Momentum is building 🔥";
  }
  if (currentStreak === 5) {
    return "5 days! Nearly at the bonus zone 💝";
  }
  if (currentStreak === 7) {
    return "🎉 7-DAY CHAMPION! You earned 50 bonus XP!";
  }
  if (currentStreak > 7) {
    return `${currentStreak}-day streak! Absolute legend 👑`;
  }
  return `${currentStreak}-day streak going! Keep it up!`;
}

module.exports = {
  calculateStreakStatus,
  calculateStreakMultiplier,
  calculateStreakXPReward,
  logActivity,
  getStreakAtRiskNotification,
  getStreakLostNotification,
  getStreakBonusUnlockAnimation,
  resetStreakIfNeeded,
  getStreakVisualization,
  getStreakMotivationalMessage,
  STREAK_BONUS_THRESHOLD,
  MAX_STREAK_MULTIPLIER,
  BASE_XP_PER_ACTION,
};
