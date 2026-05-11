import { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Sparkles, Target, Zap, ChevronRight, TrendingDown } from 'lucide-react';
import TopBar from './TopBar';

const knowledgeFeed = [
  { title: 'Save 20% on groceries', description: 'Shop on weekdays instead of weekends', icon: Target, color: 'from-[#00C853] to-[#FFD600]' },
  { title: 'Investment tip', description: 'Start with ASB for safe returns', icon: TrendingDown, color: 'from-[#5B8DEF] to-[#7C4DFF]' },
  { title: 'Budget hack', description: 'Use the 50/30/20 rule', icon: Zap, color: 'from-[#7C4DFF] to-[#FF5252]' },
];

export default function HomeScreen({
  onOpenExpense,
  onOpenSettings,
  onOpenWrapped
}: {
  onOpenExpense: () => void;
  onOpenSettings: () => void;
  onOpenWrapped: () => void;
}) {
  const [currentFeed, setCurrentFeed] = useState(0);

  return (
    <div className="h-full w-full bg-[#0F1115] flex flex-col overflow-hidden">
      <TopBar onSettingsClick={onOpenSettings} onWrappedClick={onOpenWrapped} />
      <div className="flex-1 overflow-y-auto pb-24">
        <div className="px-6 space-y-6">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative bg-gradient-to-br from-[#1A1D24]/80 to-[#2A2D34]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 overflow-hidden shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#5B8DEF]/20 to-transparent rounded-full blur-2xl" />

            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[#9CA3AF] text-sm">Monthly Spending</span>
                <span className="text-[#00C853] text-sm font-semibold">-12% vs last month</span>
              </div>

              <div className="flex items-end space-x-3 mb-4">
                <div className="text-4xl font-bold text-white">RM 1,247</div>
                <div className="text-[#9CA3AF] pb-1">/ RM 1,500</div>
              </div>

              <div className="relative w-full bg-[#0F1115]/50 rounded-full h-3 overflow-hidden mb-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '83%' }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-[#5B8DEF] via-[#7C4DFF] to-[#00C853]"
                />
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-[#9CA3AF]">RM 253 left</span>
                <span className="text-[#5B8DEF]">83% used</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative bg-gradient-to-br from-[#7C4DFF]/10 to-[#5B8DEF]/10 border border-[#7C4DFF]/30 rounded-2xl p-5 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#7C4DFF]/20 to-transparent rounded-full blur-xl" />

            <div className="relative flex items-start space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#7C4DFF] to-[#5B8DEF] rounded-xl flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold mb-1">AI Insight</h3>
                <p className="text-[#9CA3AF] text-sm">You overspend 42% more on weekends. Try planning your purchases during weekdays.</p>
              </div>
            </div>
          </motion.div>

          <div>
            <h2 className="text-white font-semibold mb-3">Knowledge Feed</h2>
            <div className="space-y-3">
              {knowledgeFeed.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    onClick={() => setCurrentFeed(index)}
                    className="w-full bg-[#1A1D24] border border-[#2A2D34] rounded-2xl p-4 flex items-center space-x-4 hover:border-[#5B8DEF]/50 transition-all group"
                  >
                    <div className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="text-white font-medium mb-0.5">{item.title}</div>
                      <div className="text-[#9CA3AF] text-sm">{item.description}</div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[#9CA3AF] group-hover:text-[#5B8DEF] transition-colors" />
                  </motion.button>
                );
              })}
            </div>
          </div>

          <div>
            <h2 className="text-white font-semibold mb-3">Quick Challenges</h2>
            <div className="grid grid-cols-2 gap-3">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-gradient-to-br from-[#00C853]/20 to-[#00C853]/5 border border-[#00C853]/30 rounded-2xl p-4"
              >
                <div className="text-2xl mb-1">🎯</div>
                <div className="text-white font-semibold text-sm mb-1">No-Spend Weekend</div>
                <div className="text-[#00C853] text-xs">+100 XP</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="bg-gradient-to-br from-[#FFD600]/20 to-[#FFD600]/5 border border-[#FFD600]/30 rounded-2xl p-4"
              >
                <div className="text-2xl mb-1">💰</div>
                <div className="text-white font-semibold text-sm mb-1">Save RM50 Today</div>
                <div className="text-[#FFD600] text-xs">+50 XP</div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.7, type: 'spring' }}
        onClick={onOpenExpense}
        className="fixed bottom-24 right-6 w-16 h-16 bg-gradient-to-br from-[#5B8DEF] to-[#7C4DFF] rounded-2xl flex items-center justify-center shadow-2xl z-30"
      >
        <Plus className="w-8 h-8 text-white" />
      </motion.button>
    </div>
  );
}
