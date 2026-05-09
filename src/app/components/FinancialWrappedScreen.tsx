import { motion } from 'motion/react';
import { Share2, Download, Sparkles, TrendingUp, Trophy, Flame } from 'lucide-react';

export default function FinancialWrappedScreen({ onClose }: { onClose?: () => void }) {
  return (
    <div className="h-screen w-full bg-gradient-to-br from-[#0F1115] via-[#5B8DEF]/20 to-[#7C4DFF]/20 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 right-10 w-96 h-96 bg-gradient-to-br from-[#5B8DEF] to-[#7C4DFF] blur-3xl rounded-full animate-pulse" />
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-br from-[#FFD600] to-[#00C853] blur-3xl rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md bg-gradient-to-br from-[#1A1D24] to-[#0F1115] border-2 border-white/20 rounded-3xl p-8 shadow-2xl overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#5B8DEF]/10 via-transparent to-[#7C4DFF]/10" />

        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-6"
          >
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#FFD600]/20 to-[#00C853]/20 border border-[#FFD600]/30 rounded-full px-4 py-2 mb-4">
              <Sparkles className="w-4 h-4 text-[#FFD600]" />
              <span className="text-[#FFD600] text-sm font-bold">YOUR 2026 FINANCIAL WRAPPED</span>
            </div>

            <div className="w-20 h-20 bg-gradient-to-br from-[#5B8DEF] to-[#7C4DFF] rounded-2xl flex items-center justify-center text-4xl mx-auto mb-3">
              🎯
            </div>

            <h1 className="text-4xl font-black mb-2 bg-gradient-to-r from-white via-[#5B8DEF] to-[#7C4DFF] bg-clip-text text-transparent">
              Amir
            </h1>
            <p className="text-[#9CA3AF] text-sm">The Future Builder</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-4 mb-6"
          >
            <div className="bg-gradient-to-r from-[#00C853]/20 to-[#5B8DEF]/20 border border-[#00C853]/30 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-[#00C853]" />
                  <span className="text-[#9CA3AF] text-sm">Total Savings</span>
                </div>
              </div>
              <div className="text-4xl font-black text-white">RM 4,327</div>
              <div className="text-[#00C853] text-sm mt-1">↗ 34% increase from last year</div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gradient-to-br from-[#7C4DFF]/20 to-[#5B8DEF]/20 border border-[#7C4DFF]/30 rounded-2xl p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Trophy className="w-4 h-4 text-[#FFD600]" />
                  <span className="text-[#9CA3AF] text-xs">XP Earned</span>
                </div>
                <div className="text-3xl font-black text-white">2,247</div>
              </div>

              <div className="bg-gradient-to-br from-[#FFD600]/20 to-[#00C853]/20 border border-[#FFD600]/30 rounded-2xl p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Flame className="w-4 h-4 text-[#FF5252]" />
                  <span className="text-[#9CA3AF] text-xs">Best Streak</span>
                </div>
                <div className="text-3xl font-black text-white">14 days</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#5B8DEF]/20 to-[#7C4DFF]/20 border border-[#5B8DEF]/30 rounded-2xl p-4">
              <div className="text-[#9CA3AF] text-sm mb-2">Top Spending Category</div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="text-2xl">🍔</div>
                  <span className="text-white font-bold text-lg">Food & Drinks</span>
                </div>
                <span className="text-white font-bold text-lg">RM 1,450</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#00C853]/20 to-[#FFD600]/20 border border-[#00C853]/30 rounded-2xl p-4">
              <div className="text-[#9CA3AF] text-sm mb-2">Future Projection Growth</div>
              <div className="text-3xl font-black text-[#00C853] mb-1">+RM 28,000</div>
              <div className="text-white text-sm">by age 30 with current habits</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center mb-4"
          >
            <div className="bg-gradient-to-r from-[#7C4DFF]/10 to-[#5B8DEF]/10 border border-[#7C4DFF]/30 rounded-xl p-3">
              <p className="text-[#9CA3AF] text-xs leading-relaxed">
                "You're building a strong financial future. Keep up the amazing work!"
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex items-center justify-center space-x-2 mb-4"
          >
            <div className="text-[#9CA3AF] text-xs">Powered by</div>
            <div className="font-bold bg-gradient-to-r from-[#5B8DEF] to-[#7C4DFF] bg-clip-text text-transparent">
              SpendWise AI
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="grid grid-cols-2 gap-3"
          >
            <button className="bg-gradient-to-r from-[#5B8DEF] to-[#7C4DFF] text-white py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transition-shadow">
              <Share2 className="w-4 h-4" />
              <span className="text-sm">Share</span>
            </button>

            <button className="bg-[#1A1D24] border border-[#5B8DEF]/30 text-white py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:bg-[#2A2D34] transition-colors">
              <Download className="w-4 h-4" />
              <span className="text-sm">Download</span>
            </button>
          </motion.div>
        </div>
      </motion.div>

      {onClose && (
        <>
          <button
            onClick={onClose}
            className="fixed top-6 right-6 w-12 h-12 bg-[#1A1D24]/90 backdrop-blur-xl border border-white/20 rounded-xl flex items-center justify-center hover:bg-[#2A2D34] transition-colors z-50 shadow-lg"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            onClick={onClose}
            className="mt-6 text-[#9CA3AF] hover:text-white transition-colors text-sm"
          >
            Close
          </motion.button>
        </>
      )}
    </div>
  );
}
