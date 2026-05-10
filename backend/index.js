/**
 * MEMBER 5 - GAMIFICATION & PROJECTION ENGINE
 * Main integration point for all projection, gamification, and reward systems
 *
 * Usage:
 * const member5 = require('./services/index');
 *
 * // Projection
 * const projection = member5.projection.generateDualProjection({...});
 *
 * // Gamification
 * const reward = member5.rewards.spinWheel();
 * const achievement = member5.achievements.awardAchievement({...});
 *
 * // Streaks & XP
 * const streak = member5.streaks.calculateStreakStatus({...});
 * const xpReward = member5.streaks.calculateStreakXPReward(10, 1.5);
 */

// ========== PROJECTION ENGINE ==========
const epfCalculator = require("./epf_calculator");
const projectionEngine = require("./projection_engine");
const simulationUtils = require("./simulation_utils");

const projection = {
  epf: epfCalculator,
  dualProjection: projectionEngine,
  microChanges: simulationUtils,
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

  // Utility: Get overall user gamification status
  getUserGamificationStatus: (params) => {
    const {
      userId,
      currentStreak,
      challengesCompleted,
      totalXP,
      rewardsEarned,
      awardedAchievements,
    } = params;

    return {
      userId,
      streakStatus: currentStreak > 0 ? "active" : "inactive",
      currentStreak,
      streakMultiplier: streakSystem.calculateStreakMultiplier(currentStreak),
      challengesCompleted,
      totalXP,
      rewardsEarned: rewardsEarned?.length || 0,
      achievementsUnlocked: awardedAchievements?.length || 0,
      gamificationLevel: calculateGamificationLevel(
        currentStreak,
        challengesCompleted,
        totalXP,
      ),
    };
  },

  // Utility: Get complete dashboard data for user
  getCompleteDashboard: (params) => {
    const { streakData, projectionData, rewardData, achievementData } = params;

    return {
      streak: {
        current: streakData.currentStreak,
        status: streakData.streakStatus,
        visualization: streakSystem.getStreakVisualization(
          streakData.currentStreak,
        ),
        motivation: streakSystem.getStreakMotivationalMessage(
          streakData.currentStreak,
        ),
      },
      projection: {
        current: projectionData.current,
        improved: projectionData.improved,
        summary: projectionData.projectionSummary,
      },
      rewards: {
        spinAvailable: rewardData.spinEntriesAvailable > 0,
        spinsRemaining: rewardData.spinEntriesAvailable,
      },
      achievements: {
        total: achievementData.total,
        newUnlocks: achievementData.newUnlocks,
      },
    };
  },
};

/**
 * Calculate user's gamification level based on activity
 * @returns {object} Level info
 */
function calculateGamificationLevel(
  currentStreak,
  challengesCompleted,
  totalXP,
) {
  let level = 1;
  let nextLevelXP = 500;

  if (totalXP >= 500) level = 2;
  if (totalXP >= 1500) level = 3;
  if (totalXP >= 3500) level = 4;
  if (totalXP >= 7000) level = 5;

  const progressToNextLevel = Math.min(totalXP - level * 500, nextLevelXP);
  const progressPercent = Math.round((progressToNextLevel / nextLevelXP) * 100);

  return {
    level,
    totalXP,
    nextLevelXP: level * 500 + 500,
    progressPercent,
    badge: getGamificationBadge(level),
  };
}

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
