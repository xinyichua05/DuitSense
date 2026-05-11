import { motion } from 'motion/react';

export default function SplashScreen() {
  return (
    <div className="h-screen w-full bg-gradient-to-br from-[#0F1115] via-[#1a1d24] to-[#5B8DEF]/20 flex flex-col items-center justify-center relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10"
      >
        <div className="relative">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute inset-0 bg-gradient-to-r from-[#5B8DEF] to-[#7C4DFF] blur-3xl rounded-full"
          />
          <div className="relative bg-gradient-to-br from-[#5B8DEF] to-[#7C4DFF] p-8 rounded-3xl">
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M40 10L50 30H30L40 10Z" fill="white" opacity="0.9"/>
              <circle cx="40" cy="50" r="20" fill="white" opacity="0.9"/>
              <rect x="35" y="35" width="10" height="30" rx="2" fill="#5B8DEF"/>
            </svg>
          </div>
        </div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-8 text-4xl font-bold bg-gradient-to-r from-white to-[#5B8DEF] bg-clip-text text-transparent"
      >
        SpendWise AI
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="mt-4 text-[#9CA3AF] text-lg text-center px-8"
      >
        Your Financial Future Starts Here
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="absolute bottom-20"
      >
        <div className="flex space-x-2">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0 }}
            className="w-3 h-3 bg-[#5B8DEF] rounded-full"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
            className="w-3 h-3 bg-[#7C4DFF] rounded-full"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
            className="w-3 h-3 bg-[#5B8DEF] rounded-full"
          />
        </div>
      </motion.div>
    </div>
  );
}
