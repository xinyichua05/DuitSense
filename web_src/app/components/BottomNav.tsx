import { Home, Target, TrendingUp, Trophy, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

type TabType = 'home' | 'challenges' | 'insights' | 'projection' | 'leaderboard';

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const tabs = [
  { id: 'home' as TabType, icon: Home, label: 'Home' },
  { id: 'challenges' as TabType, icon: Target, label: 'Challenges' },
  { id: 'insights' as TabType, icon: TrendingUp, label: 'Insights' },
  { id: 'projection' as TabType, icon: Sparkles, label: 'Future' },
  { id: 'leaderboard' as TabType, icon: Trophy, label: 'Leaderboard' },
];

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#1A1D24]/95 backdrop-blur-xl border-t border-white/10 z-30">
      <div className="max-w-md mx-auto px-4 py-2">
        <div className="flex items-center justify-around">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className="relative flex flex-col items-center py-2 px-3 rounded-xl transition-all"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-[#5B8DEF]/20 to-[#7C4DFF]/20 rounded-xl"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}

                <div className="relative z-10">
                  <Icon
                    className={`w-6 h-6 transition-colors ${
                      isActive ? 'text-[#5B8DEF]' : 'text-[#9CA3AF]'
                    }`}
                  />
                </div>

                <span
                  className={`relative z-10 text-xs mt-1 transition-colors ${
                    isActive ? 'text-white font-semibold' : 'text-[#9CA3AF]'
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
