import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gift, Sparkles, X } from 'lucide-react';
import confetti from 'canvas-confetti';

const rewards = [
  { label: 'RM5 Grab', color: '#FFD600', icon: '🚗' },
  { label: '50 XP', color: '#5B8DEF', icon: '⚡' },
  { label: 'RM10 Shopee', color: '#FF5252', icon: '🛍️' },
  { label: '100 XP', color: '#7C4DFF', icon: '💎' },
  { label: 'RM15 GrabFood', color: '#00C853', icon: '🍔' },
  { label: '200 XP', color: '#FFD600', icon: '🏆' },
  { label: 'Better Luck!', color: '#9CA3AF', icon: '🎯' },
  { label: 'RM20 Lazada', color: '#5B8DEF', icon: '🎁' },
];

export default function SpinWheelScreen({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [showReward, setShowReward] = useState(false);
  const [wonReward, setWonReward] = useState<typeof rewards[0] | null>(null);

  if (!isOpen) return null;

  const handleSpin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    const winningIndex = Math.floor(Math.random() * rewards.length);
    const segmentAngle = 360 / rewards.length;
    const extraSpins = 5;
    const finalRotation = rotation + 360 * extraSpins + (360 - winningIndex * segmentAngle);

    setRotation(finalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      setWonReward(rewards[winningIndex]);
      setShowReward(true);

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }, 4000);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
        <div className="h-full w-full max-w-md bg-gradient-to-br from-[#0F1115] via-[#1a1d24] to-[#7C4DFF]/10 flex flex-col overflow-hidden relative rounded-3xl">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-12 h-12 bg-[#1A1D24]/90 backdrop-blur-xl border border-white/20 rounded-xl flex items-center justify-center hover:bg-[#2A2D34] transition-colors z-50 shadow-lg"
          >
            <X className="w-6 h-6 text-white" />
          </button>

      <div className="flex-1 flex flex-col items-center justify-center p-6 relative">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-br from-[#FFD600] to-[#00C853] blur-3xl rounded-full animate-pulse" />
          <div className="absolute bottom-40 left-10 w-80 h-80 bg-gradient-to-br from-[#7C4DFF] to-[#FF5252] blur-3xl rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 relative z-10"
        >
          <div className="flex items-center justify-center space-x-2 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#FFD600] to-[#00C853] rounded-xl flex items-center justify-center">
              <Gift className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white">Spin & Win!</h1>
          </div>
          <p className="text-[#9CA3AF]">Try your luck for amazing rewards</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative mb-8 z-10"
        >
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
            <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[30px] border-t-[#FFD600] drop-shadow-lg" />
          </div>

          <motion.div
            animate={{ rotate: rotation }}
            transition={{ duration: 4, ease: 'easeOut' }}
            className="relative w-80 h-80"
          >
            <svg viewBox="0 0 200 200" className="w-full h-full">
              {rewards.map((reward, index) => {
                const angle = (360 / rewards.length) * index;
                const nextAngle = (360 / rewards.length) * (index + 1);

                const x1 = 100 + 95 * Math.cos((angle * Math.PI) / 180);
                const y1 = 100 + 95 * Math.sin((angle * Math.PI) / 180);
                const x2 = 100 + 95 * Math.cos((nextAngle * Math.PI) / 180);
                const y2 = 100 + 95 * Math.sin((nextAngle * Math.PI) / 180);

                const textAngle = angle + 360 / rewards.length / 2;
                const textX = 100 + 60 * Math.cos((textAngle * Math.PI) / 180);
                const textY = 100 + 60 * Math.sin((textAngle * Math.PI) / 180);

                return (
                  <g key={index}>
                    <path
                      d={`M 100 100 L ${x1} ${y1} A 95 95 0 0 1 ${x2} ${y2} Z`}
                      fill={reward.color}
                      stroke="#0F1115"
                      strokeWidth="2"
                    />
                    <text
                      x={textX}
                      y={textY}
                      fill="white"
                      fontSize="20"
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      {reward.icon}
                    </text>
                  </g>
                );
              })}
              <circle cx="100" cy="100" r="20" fill="#1A1D24" stroke="#5B8DEF" strokeWidth="3" />
            </svg>
          </motion.div>

          <div className="absolute inset-0 rounded-full border-4 border-white/10 pointer-events-none" style={{ boxShadow: '0 0 40px rgba(91, 141, 239, 0.3)' }} />
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          onClick={handleSpin}
          disabled={isSpinning}
          className="relative z-10 bg-gradient-to-r from-[#FFD600] to-[#00C853] text-white px-12 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-[#FFD600]/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSpinning ? 'Spinning...' : 'SPIN NOW'}
        </motion.button>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center relative z-10"
        >
          <div className="bg-gradient-to-br from-[#1A1D24] to-[#2A2D34] border border-white/10 rounded-2xl p-4 max-w-sm">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Sparkles className="w-4 h-4 text-[#FFD600]" />
              <span className="text-white text-sm font-semibold">Available Rewards</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {rewards.slice(0, 4).map((reward, index) => (
                <div key={index} className="bg-[#0F1115]/50 rounded-xl p-2 text-center">
                  <div className="text-xl mb-1">{reward.icon}</div>
                  <div className="text-white text-xs font-medium" style={{ fontSize: '10px' }}>
                    {reward.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {showReward && wonReward && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
              onClick={() => setShowReward(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ type: 'spring', damping: 20 }}
              className="fixed inset-0 flex items-center justify-center z-50 p-6"
            >
              <div className="bg-gradient-to-br from-[#1A1D24] to-[#2A2D34] border-2 border-[#FFD600] rounded-3xl p-8 max-w-sm w-full text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FFD600]/20 to-transparent rounded-3xl" />

                <div className="relative">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring' }}
                    className="text-8xl mb-4"
                  >
                    {wonReward.icon}
                  </motion.div>

                  <h2 className="text-3xl font-bold text-white mb-2">Congratulations!</h2>
                  <p className="text-[#9CA3AF] mb-6">You won</p>

                  <div className="bg-gradient-to-r from-[#FFD600] to-[#00C853] rounded-2xl p-4 mb-6">
                    <div className="text-2xl font-bold text-white">{wonReward.label}</div>
                  </div>

                  <button
                    onClick={() => setShowReward(false)}
                    className="w-full bg-gradient-to-r from-[#5B8DEF] to-[#7C4DFF] text-white py-4 rounded-2xl font-semibold"
                  >
                    Claim Reward
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
        </div>
      </div>
    </>
  );
}
