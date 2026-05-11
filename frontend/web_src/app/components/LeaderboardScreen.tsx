import { useState } from 'react';
import { motion } from 'motion/react';
import { Trophy, Medal, Award, TrendingUp, Gift } from 'lucide-react';
import * as Tabs from '@radix-ui/react-tabs';
import TopBar from './TopBar';

const squadLeaderboard = [
  { rank: 1, name: 'Sarah M.', xp: 2847, avatar: '🏆', change: 2 },
  { rank: 2, name: 'Ahmad K.', xp: 2654, avatar: '🥈', change: -1 },
  { rank: 3, name: 'You (Amir)', xp: 2247, avatar: '🎯', change: 1, isUser: true },
  { rank: 4, name: 'Priya R.', xp: 2103, avatar: '⭐', change: -1 },
  { rank: 5, name: 'Marcus T.', xp: 1987, avatar: '🚀', change: 0 },
  { rank: 6, name: 'Lin W.', xp: 1856, avatar: '💎', change: 2 },
  { rank: 7, name: 'Fatimah A.', xp: 1742, avatar: '🌟', change: -2 },
  { rank: 8, name: 'David L.', xp: 1623, avatar: '⚡', change: 1 },
];

const weeklyLeaderboard = [
  { rank: 1, name: 'Ahmad K.', xp: 847, avatar: '🥇', badge: 'On Fire' },
  { rank: 2, name: 'You (Amir)', xp: 654, avatar: '🎯', badge: 'Climbing', isUser: true },
  { rank: 3, name: 'Sarah M.', xp: 603, avatar: '🏆', badge: 'Steady' },
];

export default function LeaderboardScreen({
  onOpenSpin,
  onOpenSettings,
  onOpenWrapped
}: {
  onOpenSpin: () => void;
  onOpenSettings: () => void;
  onOpenWrapped: () => void;
}) {
  const [activeTab, setActiveTab] = useState('squad');

  return (
    <div className="h-full w-full bg-[#0F1115] flex flex-col overflow-hidden">
      <TopBar onSettingsClick={onOpenSettings} onWrappedClick={onOpenWrapped} />
      <div className="flex-1 overflow-y-auto pb-24">
        <div className="px-6 space-y-6">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-[#FFD600]/20 to-[#00C853]/20 border border-[#FFD600]/30 rounded-2xl p-5 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#FFD600]/30 to-transparent rounded-full blur-2xl" />

            <div className="relative flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#FFD600] to-[#00C853] rounded-2xl flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-white font-semibold">You're in Top 8%</div>
                  <div className="text-[#9CA3AF] text-sm">Keep up the great work!</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-white">2,247</div>
                <div className="text-[#FFD600] text-sm">Total XP</div>
              </div>
            </div>
          </motion.div>

          <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
            <Tabs.List className="flex bg-[#1A1D24] rounded-2xl p-1 mb-4">
              <Tabs.Trigger
                value="squad"
                className="flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#5B8DEF] data-[state=active]:to-[#7C4DFF] data-[state=active]:text-white text-[#9CA3AF]"
              >
                Squad
              </Tabs.Trigger>
              <Tabs.Trigger
                value="weekly"
                className="flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#5B8DEF] data-[state=active]:to-[#7C4DFF] data-[state=active]:text-white text-[#9CA3AF]"
              >
                Weekly
              </Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value="squad">
              <div className="space-y-3">
                {squadLeaderboard.map((player, index) => (
                  <motion.div
                    key={player.rank}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`bg-gradient-to-br ${
                      player.isUser
                        ? 'from-[#5B8DEF]/20 to-[#7C4DFF]/20 border-[#5B8DEF]'
                        : 'from-[#1A1D24] to-[#2A2D34] border-white/10'
                    } border rounded-2xl p-4 flex items-center justify-between`}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
                          player.rank === 1
                            ? 'bg-gradient-to-br from-[#FFD600] to-[#00C853] text-white'
                            : player.rank === 2
                            ? 'bg-gradient-to-br from-[#9CA3AF] to-[#5B8DEF] text-white'
                            : player.rank === 3
                            ? 'bg-gradient-to-br from-[#FF5252] to-[#FFD600] text-white'
                            : 'bg-[#2A2D34] text-[#9CA3AF]'
                        }`}
                      >
                        {player.rank <= 3 ? (
                          player.rank === 1 ? (
                            <Trophy className="w-5 h-5" />
                          ) : player.rank === 2 ? (
                            <Medal className="w-5 h-5" />
                          ) : (
                            <Award className="w-5 h-5" />
                          )
                        ) : (
                          player.rank
                        )}
                      </div>
                      <div className="text-2xl">{player.avatar}</div>
                      <div>
                        <div className={`font-semibold ${player.isUser ? 'text-[#5B8DEF]' : 'text-white'}`}>
                          {player.name}
                        </div>
                        <div className="text-[#9CA3AF] text-sm">{player.xp.toLocaleString()} XP</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      {player.change > 0 && (
                        <div className="flex items-center space-x-1 text-[#00C853] text-sm">
                          <TrendingUp className="w-4 h-4" />
                          <span className="font-semibold">+{player.change}</span>
                        </div>
                      )}
                      {player.change < 0 && (
                        <div className="flex items-center space-x-1 text-[#FF5252] text-sm">
                          <TrendingUp className="w-4 h-4 transform rotate-180" />
                          <span className="font-semibold">{player.change}</span>
                        </div>
                      )}
                      {player.change === 0 && (
                        <div className="text-[#9CA3AF] text-sm font-semibold">-</div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </Tabs.Content>

            <Tabs.Content value="weekly">
              <div className="space-y-4">
                {weeklyLeaderboard.map((player, index) => (
                  <motion.div
                    key={player.rank}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative ${
                      player.isUser
                        ? 'bg-gradient-to-br from-[#5B8DEF]/20 to-[#7C4DFF]/20 border-[#5B8DEF]'
                        : 'bg-gradient-to-br from-[#1A1D24] to-[#2A2D34] border-white/10'
                    } border rounded-3xl p-5 overflow-hidden`}
                  >
                    {player.rank === 1 && (
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#FFD600]/20 to-transparent rounded-full blur-2xl" />
                    )}

                    <div className="relative flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-2xl ${
                            player.rank === 1
                              ? 'bg-gradient-to-br from-[#FFD600] to-[#00C853]'
                              : player.rank === 2
                              ? 'bg-gradient-to-br from-[#9CA3AF] to-[#5B8DEF]'
                              : 'bg-gradient-to-br from-[#FF5252] to-[#FFD600]'
                          }`}
                        >
                          {player.avatar}
                        </div>
                        <div>
                          <div className={`text-lg font-bold ${player.isUser ? 'text-[#5B8DEF]' : 'text-white'}`}>
                            {player.name}
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-[#9CA3AF] text-sm">{player.xp.toLocaleString()} XP this week</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="relative bg-[#0F1115]/50 rounded-xl px-3 py-2 flex items-center justify-between">
                      <span className="text-[#9CA3AF] text-sm">Status</span>
                      <span
                        className={`text-sm font-semibold ${
                          player.badge === 'On Fire'
                            ? 'text-[#FFD600]'
                            : player.badge === 'Climbing'
                            ? 'text-[#00C853]'
                            : 'text-[#5B8DEF]'
                        }`}
                      >
                        {player.badge}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Tabs.Content>
          </Tabs.Root>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-[#7C4DFF]/20 to-[#FF5252]/20 border border-[#7C4DFF]/30 rounded-2xl p-5"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#7C4DFF] to-[#FF5252] rounded-2xl flex items-center justify-center">
                  <Gift className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-white font-semibold">Weekly Reward Ready!</div>
                  <div className="text-[#9CA3AF] text-sm">Spin the wheel for prizes</div>
                </div>
              </div>
              <button
                onClick={onOpenSpin}
                className="bg-gradient-to-r from-[#7C4DFF] to-[#FF5252] text-white px-5 py-2 rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transition-shadow"
              >
                Spin
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
