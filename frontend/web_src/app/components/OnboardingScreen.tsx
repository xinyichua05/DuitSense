import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TrendingUp, Target, Trophy } from 'lucide-react';

const onboardingSteps = [
  {
    icon: TrendingUp,
    title: 'Track Your Spending',
    description: 'Understand where your money goes with AI-powered insights and real-time tracking',
    gradient: 'from-[#5B8DEF] to-[#7C4DFF]',
  },
  {
    icon: Target,
    title: 'Smart Budgeting',
    description: 'Set goals and let AI help you save more with personalized challenges',
    gradient: 'from-[#7C4DFF] to-[#FF5252]',
  },
  {
    icon: Trophy,
    title: 'Gamify Your Finance',
    description: 'Earn XP, climb leaderboards, and compete with peers to build better habits',
    gradient: 'from-[#00C853] to-[#FFD600]',
  },
];

export default function OnboardingScreen({ onComplete }: { onComplete: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const step = onboardingSteps[currentStep];
  const Icon = step.icon;

  return (
    <div className="h-screen w-full bg-[#0F1115] flex flex-col items-center justify-between p-8 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className={`absolute top-20 right-10 w-64 h-64 bg-gradient-to-br ${step.gradient} blur-3xl rounded-full`} />
        <div className={`absolute bottom-40 left-10 w-48 h-48 bg-gradient-to-br ${step.gradient} blur-3xl rounded-full`} />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative z-10 max-w-md">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center text-center"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className={`w-32 h-32 rounded-3xl bg-gradient-to-br ${step.gradient} flex items-center justify-center mb-8 shadow-2xl`}
            >
              <Icon className="w-16 h-16 text-white" />
            </motion.div>

            <h2 className="text-3xl font-bold text-white mb-4">{step.title}</h2>
            <p className="text-[#9CA3AF] text-lg leading-relaxed">{step.description}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative z-10 w-full max-w-md space-y-6">
        <div className="flex justify-center space-x-2">
          {onboardingSteps.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentStep ? 'w-8 bg-[#5B8DEF]' : 'w-2 bg-[#1A1D24]'
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="w-full bg-gradient-to-r from-[#5B8DEF] to-[#7C4DFF] text-white py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow"
        >
          {currentStep === onboardingSteps.length - 1 ? 'Start My Journey' : 'Next'}
        </button>

        {currentStep > 0 && (
          <button
            onClick={() => setCurrentStep(currentStep - 1)}
            className="w-full text-[#9CA3AF] py-2 rounded-2xl font-medium"
          >
            Back
          </button>
        )}
      </div>
    </div>
  );
}
