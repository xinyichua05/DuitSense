/**
 * MEMBER 5 - GAMIFICATION & PROJECTION ENGINE
 * Main integration point for all projection, gamification, and reward systems
 */

// ========== PROJECTION ENGINE ==========
const epfCalculator = require("./epf_calculator");
const projectionEngine = require("./projection_engine");
const simulationUtils = require("./simulation_utils");

const projection = {
  epf: epfCalculator,
  engine: projectionEngine,
  simulation: simulationUtils,
};

// ========== GAMIFICATION: STREAKS & XP ==========
const streakSystem = require("./streak_system");

const streaks = streakSystem;

// ========== GAMIFICATION: REWARDS ==========
const spinWheelEngine = require("./spin_wheel_engine");
const rewardManager = require("./reward_manager");

const rewards = {
  wheel: spinWheelEngine,
  manager: rewardManager,
};

// ========== FINANCIAL ANALYSIS ==========
const roiCalculator = require("./roi_calculator");

const analysis = {
  roi: roiCalculator,
};

// ========== SQUAD & ACHIEVEMENTS ==========
const squadAchievementSystem = require("./squad_achievement_system");

const achievements = squadAchievementSystem;

// ========== EXPORTED API ==========
module.exports = {
  projection,
  streaks,
  rewards,
  analysis,
  achievements,

  /**
   * Get overall user gamification status
   */
  getUserGamificationStatus: (params) => {
    const {
      userId,
      currentStreak = 0,
      challengesCompleted = 0,
      totalXP = 0,
      rewardsEarned = [],
      awardedAchievements = [],
    } = params || {};

    return {
      userId,
      streakStatus: currentStreak > 0 ? "active" : "inactive",
      currentStreak,
      streakMultiplier: streakSystem.calculateStreakMultiplier(currentStreak),
      challengesCompleted,
      totalXP,
      rewardsEarned: rewardsEarned.length,
      achievementsUnlocked: awardedAchievements.length,
      gamificationLevel: calculateGamificationLevel(
        currentStreak,
        challengesCompleted,
        totalXP,
      ),
    };
  },

  /**
   * Get complete dashboard data for user
   */
  getCompleteDashboard: (params) => {
    const {
      streakData = {},
      projectionData = {},
      rewardData = {},
      achievementData = {},
    } = params || {};

    return {
      streak: {
        current: streakData.currentStreak || 0,
        status: streakData.streakStatus || "inactive",
        visualization: streakSystem.getStreakVisualization(
          streakData.currentStreak || 0,
        ),
        motivation: streakSystem.getStreakMotivationalMessage(
          streakData.currentStreak || 0,
        ),
      },
      projection: {
        current: projectionData.current || null,
        improved: projectionData.improved || null,
        summary: projectionData.projectionSummary || "",
      },
      rewards: {
        spinAvailable: (rewardData.spinEntriesAvailable || 0) > 0,
        spinsRemaining: rewardData.spinEntriesAvailable || 0,
      },
      achievements: {
        total: achievementData.total || 0,
        newUnlocks: achievementData.newUnlocks || 0,
      },
    };
  },
};

/**
 * Calculate user's gamification level based on XP progression
 */
function calculateGamificationLevel(
  currentStreak,
  challengesCompleted,
  totalXP,
) {
  let level = 1;

  if (totalXP >= 500) level = 2;
  if (totalXP >= 1500) level = 3;
  if (totalXP >= 3500) level = 4;
  if (totalXP >= 7000) level = 5;

  // Prevent negative XP progression
  const prevLevelXP = (level - 1) * 500;
  const nextLevelXP = level * 500;

  const progressToNextLevel = Math.max(0, totalXP - prevLevelXP);

  const progressPercent = Math.min(
    100,
    Math.round((progressToNextLevel / (nextLevelXP - prevLevelXP)) * 100),
  );

  return {
    level,
    totalXP,
    nextLevelXP,
    progressPercent,
    badge: getGamificationBadge(level),
  };
}

/**
 * Get badge based on level
 */
function getGamificationBadge(level) {
  const badges = {
    1: "🌱 Sprout",
    2: "🌿 Seedling",
    3: "🌳 Sapling",
    4: "🏔️ Mountain",
    5: "🌟 Star",
  };

  return badges[level] || "🌟 Legend";
}
