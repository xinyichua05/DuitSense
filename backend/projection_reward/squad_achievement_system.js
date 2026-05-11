/**
 * SQUAD STREAK & ACHIEVEMENT SYSTEM
 * Manages squad-based gamification: streaks, badges, achievements
 * Squad leaderboard with anonymous privacy, streak bonuses, achievement tracking
 */

const crypto = require("crypto");

/**
 * Achievement badges available in the system
 */
const ACHIEVEMENTS = {
  FIRST_CHALLENGE: {
    id: "first_challenge",
    name: "🚀 First Steps",
    description: "Complete your first challenge",
    icon: "🚀",
    xpReward: 10,
    category: "milestone",
  },
  SEVEN_DAY_WARRIOR: {
    id: "seven_day_warrior",
    name: "🔥 Seven Day Warrior",
    description: "Maintain a 7-day streak",
    icon: "🔥",
    xpReward: 50,
    category: "streak",
  },
  FOURTEEN_DAY_LEGEND: {
    id: "fourteen_day_legend",
    name: "👑 Fourteen Day Legend",
    description: "Maintain a 14-day streak",
    icon: "👑",
    xpReward: 100,
    category: "streak",
  },
  THIRTY_DAY_CHAMPION: {
    id: "thirty_day_champion",
    name: "🏆 Thirty Day Champion",
    description: "Maintain a 30-day streak",
    icon: "🏆",
    xpReward: 200,
    category: "streak",
  },
  CHALLENGE_COLLECTOR: {
    id: "challenge_collector",
    name: "💎 Challenge Collector",
    description: "Complete 10 challenges",
    icon: "💎",
    xpReward: 75,
    category: "challenge",
  },
  SAVINGS_MILLIONAIRE: {
    id: "savings_millionaire",
    name: "💰 Savings Millionaire",
    description: "Reach RM100,000 in projected savings",
    icon: "💰",
    xpReward: 150,
    category: "savings",
  },
  SQUAD_PLAYER: {
    id: "squad_player",
    name: "👥 Squad Player",
    description: "Complete first squad challenge",
    icon: "👥",
    xpReward: 30,
    category: "squad",
  },
  SQUAD_LEADER: {
    id: "squad_leader",
    name: "👨‍✈️ Squad Leader",
    description: "Be ranked #1 in squad for a week",
    icon: "👨‍✈️",
    xpReward: 100,
    category: "squad",
  },
  SQUAD_CHAMPION: {
    id: "squad_champion",
    name: "🥇 Squad Champion",
    description: "Win squad competition 3 times",
    icon: "🥇",
    xpReward: 200,
    category: "squad",
  },
};

/**
 * Create a squad
 * @param {object} params - Squad creation params
 * @param {string} params.name - Squad name
 * @param {string} params.createdBy - User ID who created squad
 * @param {string} params.description - Squad description (optional)
 * @returns {object} Squad object
 */
function createSquad(params) {
  const { name, createdBy, description = "" } = params;

  if (!name || !createdBy) {
    throw new Error("Squad name and creator required");
  }

  return {
    squadId: crypto.randomUUID(),
    name,
    description,
    createdBy,
    members: [createdBy],
    createdAt: new Date().toISOString(),
    status: "active",
    joinCode: generateSquadJoinCode(),
    currentChallenge: null,
    streakStartDate: null,
  };
}

/**
 * Generate a unique squad join code
 * Format: 4 alphanumeric chars (e.g., A7K9)
 * @returns {string} Join code
 */
function generateSquadJoinCode() {
  return crypto.randomBytes(3).toString("hex").toUpperCase().substring(0, 4);
}

/**
 * Add member to squad
 * @param {object} params - Join params
 * @param {string} params.squadId - Squad ID
 * @param {string} params.userId - User ID joining
 * @param {string} params.joinCode - Join code for validation
 * @returns {object} Result
 */
function joinSquad(params) {
  const { squadId, userId, joinCode } = params;

  // In production, validate squadId, userId, joinCode against DB
  return {
    success: true,
    squadId,
    userId,
    joinedAt: new Date().toISOString(),
    initialXP: 0,
    initialStreak: 0,
  };
}

/**
 * Get squad progress
 * Returns completion status ONLY, never amounts (privacy)
 * @param {array} members - Squad member IDs
 * @param {object} memberStats - Stats keyed by userId
 * @returns {array} Squad progress showing {userId, displayName, avatar, status, streak}
 */
function getSquadProgress(members, memberStats) {
  return members.map((userId) => {
    const stats = memberStats[userId] || {};

    return {
      userId,
      displayName: stats.displayName || "Squad Member",
      avatar: stats.avatar,
      status: stats.status || "inactive", // 'active', 'inactive', 'pending'
      streakDays: stats.streakDays || 0,
      streakBadge: getStreakBadge(stats.streakDays || 0),
      completedToday: stats.completedToday || false,
      // NEVER include: spending amounts, savings, XP, financial data
    };
  });
}

/**
 * Get streak badge for display
 * @param {number} streakDays
 * @returns {string} Badge emoji/text
 */
function getStreakBadge(streakDays) {
  if (streakDays === 0) return "⭕";
  if (streakDays <= 3) return "🟢";
  if (streakDays <= 7) return "🔥";
  if (streakDays <= 14) return "💪";
  return "👑";
}

/**
 * Calculate squad-wide streak
 * All members must maintain individual streaks for squad to qualify
 * @param {array} memberStreaks - Array of individual streak objects
 * @returns {object} Squad streak info
 */
function calculateSquadStreak(memberStreaks) {
  if (!memberStreaks || memberStreaks.length === 0) {
    return {
      squadStreakDays: 0,
      squadStreakActive: false,
      activeMembersCount: 0,
      message: "Squad streak requires all members to maintain streaks",
    };
  }

  // Squad streak = minimum streak among all members
  const minStreak = Math.min(...memberStreaks.map((m) => m.currentStreak || 0));
  const activeMembersCount = memberStreaks.filter(
    (m) => m.currentStreak > 0,
  ).length;

  return {
    squadStreakDays: minStreak,
    squadStreakActive: minStreak > 0,
    activeMembersCount,
    totalMembers: memberStreaks.length,
    squadStreakBonus: calculateSquadStreakBonus(minStreak),
    message:
      minStreak > 0
        ? `Squad on a ${minStreak}-day streak! 🔥 ${activeMembersCount}/${memberStreaks.length} members active`
        : "Squad streak broken - help teammates rebuild!",
  };
}

/**
 * Calculate XP bonus for squad streaks
 * Squad bonus on top of individual streaks
 * @param {number} squadStreakDays
 * @returns {number} Additional XP bonus
 */
function calculateSquadStreakBonus(squadStreakDays) {
  if (squadStreakDays === 0) return 0;
  if (squadStreakDays <= 7) return 10;
  if (squadStreakDays <= 14) return 25;
  if (squadStreakDays <= 30) return 50;
  return 100; // 30+ days
}

/**
 * Award achievement to user
 * @param {object} params - Achievement params
 * @param {string} params.userId - User ID
 * @param {string} params.achievementId - Achievement ID (from ACHIEVEMENTS)
 * @returns {object} Achievement record
 */
function awardAchievement(params) {
  const { userId, achievementId } = params;

  const achievement = ACHIEVEMENTS[achievementId];
  if (!achievement) {
    throw new Error(`Unknown achievement: ${achievementId}`);
  }

  return {
    awardId: crypto.randomUUID(),
    userId,
    achievementId,
    name: achievement.name,
    description: achievement.description,
    icon: achievement.icon,
    xpReward: achievement.xpReward,
    awardedAt: new Date().toISOString(),
    unlockedAt: new Date().toISOString(),
    shared: false,
  };
}

/**
 * Check if user qualifies for an achievement
 * @param {object} params - Qualification params
 * @param {string} params.userId - User ID
 * @param {string} params.achievementId - Achievement to check
 * @param {object} params.userStats - User's current stats
 * @returns {object} Qualification check
 */
function checkAchievementQualification(params) {
  const { userId, achievementId, userStats } = params;

  const achievement = ACHIEVEMENTS[achievementId];
  if (!achievement) {
    return { qualified: false, reason: "Unknown achievement" };
  }

  let qualified = false;
  let reason = "";

  switch (achievementId) {
    case "first_challenge":
      qualified = userStats.challengesCompleted >= 1;
      reason = qualified
        ? "First challenge completed!"
        : "Complete your first challenge";
      break;
    case "seven_day_warrior":
      qualified = userStats.currentStreak >= 7;
      reason = qualified
        ? "Reached 7-day streak!"
        : `${7 - userStats.currentStreak} days to go`;
      break;
    case "challenge_collector":
      qualified = userStats.challengesCompleted >= 10;
      reason = qualified
        ? "10 challenges done!"
        : `${10 - userStats.challengesCompleted} more to go`;
      break;
    case "savings_millionaire":
      qualified = userStats.projectedSavings >= 100000;
      reason = qualified ? "100k projection reached!" : "Keep saving!";
      break;
    case "squad_player":
      qualified = userStats.squadChallengesCompleted >= 1;
      reason = qualified
        ? "Squad player unlocked!"
        : "Complete a squad challenge";
      break;
    default:
      qualified = false;
      reason = "Check achievement requirements";
  }

  return {
    qualified,
    achievementId,
    achievement: ACHIEVEMENTS[achievementId],
    reason,
  };
}

/**
 * Get user's achievement progress
 * @param {object} userStats - User's stats
 * @param {array} awardedAchievementIds - Already awarded achievements
 * @returns {array} All achievements with progress
 */
function getUserAchievementProgress(userStats, awardedAchievementIds = []) {
  return Object.entries(ACHIEVEMENTS).map(([key, achievement]) => {
    const isAwarded = awardedAchievementIds.includes(key);

    const qualification = checkAchievementQualification({
      userId: userStats.userId,
      achievementId: key,
      userStats,
    });

    return {
      id: key,
      name: achievement.name,
      icon: achievement.icon,
      description: achievement.description,
      category: achievement.category,
      xpReward: achievement.xpReward,
      awarded: isAwarded,
      qualified: qualification.qualified && !isAwarded,
      progress: qualification.reason,
    };
  });
}

/**
 * Generate shareable achievement card
 * Shows achievement and encourages others to unlock it
 * @param {object} achievement - Awarded achievement
 * @returns {object} Shareable data
 */
function generateShareableAchievementCard(achievement) {
  const messages = {
    milestone: `I just unlocked ${achievement.name}! 🎉 Join me on DuitSense to earn your own achievements!`,
    streak: `${achievement.name} - I've been on fire! 🔥 Start your streak on DuitSense`,
    challenge: `I've completed ${achievement.name.toLowerCase()} challenges! 💪 Challenge yourself too!`,
    savings: `${achievement.name} - My savings are on track! 💰 Let's build wealth together on DuitSense`,
    squad: `${achievement.name} - Squad goals! 👥 Invite your friends to DuitSense`,
  };

  return {
    achievement: achievement.name,
    icon: achievement.icon,
    xpEarned: achievement.xpReward,
    shareText:
      messages[achievement.category] ||
      "I just unlocked an achievement on DuitSense!",
    hashtags: "#DuitSense #FinancialWellness #Gamified",
  };
}

/**
 * List all available achievements
 * @returns {array} All achievements with metadata
 */
function listAllAchievements() {
  return Object.entries(ACHIEVEMENTS).map(([key, achievement]) => ({
    id: key,
    ...achievement,
  }));
}

/**
 * Calculate achievement points (some gamification systems use this)
 * @param {array} awardedAchievements - Array of awarded achievements
 * @returns {number} Total points
 */
function calculateAchievementPoints(awardedAchievements = []) {
  return awardedAchievements.reduce((sum, ach) => sum + (ach.xpReward || 0), 0);
}

module.exports = {
  ACHIEVEMENTS,
  createSquad,
  generateSquadJoinCode,
  joinSquad,
  getSquadProgress,
  getStreakBadge,
  calculateSquadStreak,
  calculateSquadStreakBonus,
  awardAchievement,
  checkAchievementQualification,
  getUserAchievementProgress,
  generateShareableAchievementCard,
  listAllAchievements,
  calculateAchievementPoints,
};
