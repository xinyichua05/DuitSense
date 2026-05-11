import { motion } from 'motion/react';
import { Sparkles, Share2, TrendingUp } from 'lucide-react';

export default function PersonaResultScreen({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="h-screen w-full bg-gradient-to-br from-[#0F1115] via-[#1a1d24] to-[#5B8DEF]/10 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-[#5B8DEF] to-[#7C4DFF] blur-3xl rounded-full animate-pulse" />
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-br from-[#7C4DFF] to-[#00C853] blur-3xl rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 max-w-md w-full"
      >
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center mb-6"
        >
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#5B8DEF]/20 to-[#7C4DFF]/20 border border-[#5B8DEF]/30 rounded-full px-4 py-2 mb-4">
            <Sparkles className="w-4 h-4 text-[#FFD600]" />
            <span className="text-[#FFD600] text-sm font-semibold">Your Financial Persona</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-gradient-to-br from-[#1A1D24] to-[#2A2D34] border border-[#5B8DEF]/30 rounded-3xl p-8 mb-6 relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#5B8DEF]/20 to-transparent rounded-full blur-2xl" />

          <div className="relative">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5, type: 'spring' }}
              className="w-24 h-24 bg-gradient-to-br from-[#5B8DEF] to-[#7C4DFF] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
            >
              <TrendingUp className="w-12 h-12 text-white" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="text-4xl font-bold text-center mb-3 bg-gradient-to-r from-white via-[#5B8DEF] to-[#7C4DFF] bg-clip-text text-transparent"
            >
              The Future Builder
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="space-y-4 mt-6"
            >
              <div className="flex items-center justify-between bg-[#0F1115]/50 rounded-xl p-3">
                <span className="text-[#9CA3AF] text-sm">Saving Mindset</span>
                <span className="text-white font-semibold">Goal-Oriented</span>
              </div>
              <div className="flex items-center justify-between bg-[#0F1115]/50 rounded-xl p-3">
                <span className="text-[#9CA3AF] text-sm">Spending Style</span>
                <span className="text-white font-semibold">Calculated</span>
              </div>
              <div className="flex items-center justify-between bg-[#0F1115]/50 rounded-xl p-3">
                <span className="text-[#9CA3AF] text-sm">Motivation</span>
                <span className="text-white font-semibold">Achievement</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="mt-6 p-4 bg-gradient-to-r from-[#5B8DEF]/10 to-[#7C4DFF]/10 border border-[#5B8DEF]/20 rounded-xl"
            >
              <p className="text-[#9CA3AF] text-sm leading-relaxed">
                You're a strategic planner who values long-term financial stability. You make informed decisions and stay committed to your goals.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.4, duration: 0.5 }}
              className="mt-6 flex items-center justify-center space-x-2"
            >
              <div className="bg-gradient-to-r from-[#FFD600] to-[#00C853] rounded-full p-3">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-[#9CA3AF] text-xs">Starting XP</div>
                <div className="text-2xl font-bold text-white">250 XP</div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.5 }}
          className="space-y-3"
        >
          <button
            onClick={onContinue}
            className="w-full bg-gradient-to-r from-[#5B8DEF] to-[#7C4DFF] text-white py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-shadow"
          >
            Continue to Dashboard
          </button>

          <button className="w-full bg-[#1A1D24] border border-[#5B8DEF]/30 text-white py-4 rounded-2xl font-semibold flex items-center justify-center space-x-2 hover:bg-[#2A2D34] transition-colors">
            <Share2 className="w-5 h-5" />
            <span>Share My Persona</span>
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
