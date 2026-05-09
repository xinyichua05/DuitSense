import { useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Coffee, Smartphone, Gamepad2, ChevronRight } from 'lucide-react';

const quizQuestions = [
  {
    id: 1,
    question: 'What do you spend most on?',
    options: [
      { icon: ShoppingBag, label: 'Shopping & Fashion', value: 'shopping' },
      { icon: Coffee, label: 'Food & Drinks', value: 'food' },
      { icon: Smartphone, label: 'Tech & Gadgets', value: 'tech' },
      { icon: Gamepad2, label: 'Entertainment', value: 'entertainment' },
    ],
  },
  {
    id: 2,
    question: 'How often do you overspend?',
    options: [
      { label: 'Rarely', value: 'rarely' },
      { label: 'Sometimes', value: 'sometimes' },
      { label: 'Often', value: 'often' },
      { label: 'Almost always', value: 'always' },
    ],
  },
  {
    id: 3,
    question: 'What motivates you to save?',
    options: [
      { label: 'Future goals', value: 'goals' },
      { label: 'Financial security', value: 'security' },
      { label: 'Competition with peers', value: 'competition' },
      { label: 'Rewards & incentives', value: 'rewards' },
    ],
  },
];

export default function PersonaQuizScreen({ onComplete }: { onComplete: () => void }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [currentQuestion]: value });

    if (currentQuestion < quizQuestions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300);
    } else {
      setTimeout(() => onComplete(), 300);
    }
  };

  const question = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  return (
    <div className="h-screen w-full bg-[#0F1115] flex flex-col p-6 overflow-hidden">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[#9CA3AF] text-sm">Question {currentQuestion + 1} of {quizQuestions.length}</span>
          <span className="text-[#5B8DEF] text-sm font-semibold">{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-[#1A1D24] rounded-full h-2 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
            className="h-full bg-gradient-to-r from-[#5B8DEF] to-[#7C4DFF]"
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col max-w-md mx-auto w-full">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-white mb-8">{question.question}</h2>

          <div className="space-y-4">
            {question.options.map((option, index) => {
              const OptionIcon = 'icon' in option ? option.icon : null;
              return (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleAnswer(option.value)}
                  className="w-full bg-[#1A1D24] border border-[#2A2D34] rounded-2xl p-5 text-left hover:border-[#5B8DEF] hover:bg-[#1A1D24]/80 transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {OptionIcon && (
                        <div className="w-12 h-12 bg-gradient-to-br from-[#5B8DEF]/20 to-[#7C4DFF]/20 rounded-xl flex items-center justify-center group-hover:from-[#5B8DEF]/30 group-hover:to-[#7C4DFF]/30 transition-all">
                          <OptionIcon className="w-6 h-6 text-[#5B8DEF]" />
                        </div>
                      )}
                      <span className="text-white font-medium">{option.label}</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[#9CA3AF] group-hover:text-[#5B8DEF] transition-colors" />
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </div>

      {currentQuestion > 0 && (
        <button
          onClick={() => setCurrentQuestion(currentQuestion - 1)}
          className="mt-6 text-[#9CA3AF] py-2 rounded-2xl font-medium"
        >
          Back
        </button>
      )}
    </div>
  );
}
