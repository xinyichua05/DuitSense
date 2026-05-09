import { motion } from 'motion/react';
import { Flame, Trophy, Users, Zap, Gift, Calendar } from 'lucide-react';
import TopBar from './TopBar';

const challenges = [
  {
    id: 1,
    title: 'Raya Saving Challenge',
    description: 'Save RM500 before Hari Raya',
    progress: 68,
    xp: 500,
    emoji: '🌙',
    theme: 'festive',
    gradient: 'from-[#00C853] to-[#FFD600]',
  },
  {
    id: 2,
    title: 'No-Spend Weekend',
    description: 'Complete 2 weekends without spending',
    progress: 50,
    xp: 200,
    emoji: '🎯',
    theme: 'regular',
    gradient: 'from-[#5B8DEF] to-[#7C4DFF]',
  },
  {
    id: 3,
    title: 'CNY Budget Master',
    description: 'Stay within CNY budget',
    progress: 85,
    xp: 300,
    emoji: '🧧',
    theme: 'festive',
    gradient: 'from-[#FF5252] to-[#FFD600]',
  },
  {
    id: 4,
    title: 'Daily Coffee Saver',
    description: 'Skip daily coffee for a week',
    progress: 30,
    xp: 150,
    emoji: '☕',
    theme: 'regular',
    gradient: 'from-[#7C4DFF] to-[#5B8DEF]',
  },
];

export default function ChallengesScreen({
  onOpenSettings,
  onOpenWrapped
}: {
  onOpenSettings: () => void;
  onOpenWrapped: () => void;
}) {
  return (
    <div className="h-full w-full bg-[#0F1115] flex flex-col overflow-hidden">
      <TopBar onSettingsClick={onOpenSettings} onWrappedClick={onOpenWrapped} />
      <div className="flex-1 overflow-y-auto pb-24">
        <div className="px-6 space-y-6">

          <div className="grid grid-cols-3 gap-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-[#1A1D24] to-[#2A2D34] border border-[#FFD600]/30 rounded-2xl p-4"
            >
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-[#FFD600] to-[#00C853] rounded-xl mb-2">
                <Flame className="w-5 h-5 text-white" />
              </div>
              <div className="text-2xl font-bold text-white mb-0.5">7</div>
              <div className="text-[#9CA3AF] text-xs">Day Streak</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-[#1A1D24] to-[#2A2D34] border border-[#5B8DEF]/30 rounded-2xl p-4"
            >
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-[#5B8DEF] to-[#7C4DFF] rounded-xl mb-2">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <div className="text-2xl font-bold text-white mb-0.5">1,247</div>
              <div className="text-[#9CA3AF] text-xs">Total XP</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-[#1A1D24] to-[#2A2D34] border border-[#00C853]/30 rounded-2xl p-4"
            >
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-[#00C853] to-[#5B8DEF] rounded-xl mb-2">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div className="text-2xl font-bold text-white mb-0.5">12</div>
              <div className="text-[#9CA3AF] text-xs">Completed</div>
            </motion.div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-semibold">Active Challenges</h2>
              <button className="text-[#5B8DEF] text-sm font-medium">View All</button>
            </div>

            <div className="space-y-4">
              {challenges.map((challenge, index) => (
                <motion.div
                  key={challenge.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-[#1A1D24] to-[#2A2D34] border border-white/10 rounded-2xl p-5 relative overflow-hidden"
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${challenge.gradient} opacity-10 blur-2xl`} />

                  <div className="relative">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start space-x-3">
                        <div className="text-3xl">{challenge.emoji}</div>
                        <div className="flex-1">
                          <h3 className="text-white font-semibold mb-1">{challenge.title}</h3>
                          <p className="text-[#9CA3AF] text-sm">{challenge.description}</p>
                        </div>
                      </div>
                      {challenge.theme === 'festive' && (
                        <div className="flex items-center space-x-1 bg-gradient-to-r from-[#FFD600]/20 to-[#00C853]/20 border border-[#FFD600]/30 rounded-full px-2 py-1">
                          <Calendar className="w-3 h-3 text-[#FFD600]" />
                          <span className="text-[#FFD600] text-xs font-semibold">Festive</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[#9CA3AF]">Progress</span>
                        <span className="text-white font-semibold">{challenge.progress}%</span>
                      </div>
                      <div className="relative w-full bg-[#0F1115]/50 rounded-full h-2 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${challenge.progress}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          className={`h-full bg-gradient-to-r ${challenge.gradient}`}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <Trophy className="w-4 h-4 text-[#FFD600]" />
                          <span className="text-[#FFD600] text-sm font-semibold">+{challenge.xp} XP</span>
                        </div>
                        <button className="text-[#5B8DEF] text-sm font-medium hover:text-[#7C4DFF] transition-colors">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-[#7C4DFF]/20 to-[#5B8DEF]/20 border border-[#7C4DFF]/30 rounded-2xl p-5"
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#7C4DFF] to-[#5B8DEF] rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold">Squad Leaderboard</h3>
                <p className="text-[#9CA3AF] text-sm">You're ranked #3 this week</p>
              </div>
              <button className="text-[#5B8DEF] text-sm font-medium">View</button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-[#FFD600]/20 to-[#00C853]/20 border border-[#FFD600]/30 rounded-2xl p-5"
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#FFD600] to-[#00C853] rounded-xl flex items-center justify-center">
                <Gift className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold">Weekly Reward Available!</h3>
                <p className="text-[#9CA3AF] text-sm">Spin the wheel for prizes</p>
              </div>
              <button className="bg-gradient-to-r from-[#FFD600] to-[#00C853] text-white px-4 py-2 rounded-xl font-semibold text-sm">
                Spin
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
