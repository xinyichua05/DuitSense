import { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Dimensions, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { 
  FadeInDown, 
  FadeInUp, 
  SlideInRight, 
  SlideOutLeft, 
  useAnimatedStyle, 
  useSharedValue, 
  withTiming, 
  withRepeat,
  withSequence,
  interpolateColor,
  runOnJS
} from 'react-native-reanimated';
import { Timer, Trophy, X, Check, ArrowRight, Brain } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const mockAiQuestions = [
  {
    id: 1,
    question: "In the 50/30/20 budgeting rule, which category does 'Rent' fall into?",
    options: ["Wants", "Needs", "Savings", "Investments"],
    correctIndex: 1,
    explanation: "Rent is a fixed necessity, so it falls under the 50% 'Needs' category."
  },
  {
    id: 2,
    question: "What is the primary benefit of compound interest?",
    options: ["Higher taxes", "Inflation protection", "Growth on your growth", "Guaranteed returns"],
    correctIndex: 2,
    explanation: "Compound interest allows you to earn interest on both your principal and the interest already accumulated."
  },
  {
    id: 3,
    question: "In Malaysia, what is the maximum PIDM protection per bank per depositor?",
    options: ["RM 100,000", "RM 250,000", "RM 500,000", "Unlimited"],
    correctIndex: 1,
    explanation: "PIDM protects your bank deposits up to RM250,000 per depositor per member bank."
  },
  {
    id: 4,
    question: "Which of these is considered a 'Good Debt'?",
    options: ["Credit card debt", "Payday loans", "Education loans", "Gambling debt"],
    correctIndex: 2,
    explanation: "Education loans are often considered good debt because they increase your future earning potential."
  },
  {
    id: 5,
    question: "What does 'Inflation' do to your money's purchasing power?",
    options: ["Increases it", "Decreases it", "Keeps it same", "Doubles it"],
    correctIndex: 1,
    explanation: "Inflation reduces the purchasing power of money over time as prices rise."
  }
];

export default function DailyQuizScreen() {
  const router = useRouter();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(45);
  const [showExplanation, setShowExplanation] = useState(false);

  const timerProgress = useSharedValue(1);
  const shakeOffset = useSharedValue(0);

  useEffect(() => {
    if (timeLeft > 0 && !isFinished) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsFinished(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Start smooth progress bar
      timerProgress.value = withTiming(0, { duration: timeLeft * 1000 });

      return () => clearInterval(timer);
    }
  }, [isFinished]);

  const handleAnswer = (index: number) => {
    if (selectedIdx !== null || isFinished) return;
    
    setSelectedIdx(index);
    if (index === currentQuestion.correctIndex) {
      setScore(score + 1);
    } else {
      shakeOffset.value = withSequence(
        withTiming(-10, { duration: 50 }),
        withTiming(10, { duration: 50 }),
        withTiming(-10, { duration: 50 }),
        withTiming(0, { duration: 50 })
      );
    }
    
    setTimeout(() => {
      setShowExplanation(true);
    }, 500);
  };

  const nextQuestion = () => {
    if (currentIdx < mockAiQuestions.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelectedIdx(null);
      setShowExplanation(false);
    } else {
      setIsFinished(true);
    }
  };

  const timerStyle = useAnimatedStyle(() => {
    return {
      width: `${timerProgress.value * 100}%`,
      backgroundColor: timerProgress.value < 0.2 ? '#FF5252' : '#5B8DEF'
    };
  });

  const currentQuestion = mockAiQuestions[currentIdx];

  if (isFinished) {
    return (
      <SafeAreaView className="flex-1 bg-[#0F1115] items-center justify-center p-6">
        <Animated.View entering={FadeInUp.duration(600)} className="items-center w-full max-w-md">
          <LinearGradient
            colors={['#5B8DEF', '#7C4DFF']}
            className="w-32 h-32 rounded-[40px] items-center justify-center mb-8 shadow-2xl"
          >
            <Trophy size={64} color="white" />
          </LinearGradient>
          
          <Text className="text-4xl font-black text-white mb-2">Quiz Complete!</Text>
          <Text className="text-[#9CA3AF] text-lg mb-12">You scored {score} out of {mockAiQuestions.length}</Text>
          
          <View className="bg-[#1A1D24] border border-[#2A2D34] rounded-[32px] p-8 w-full mb-8">
            <View className="flex-row justify-between items-center mb-6">
              <View>
                <Text className="text-[#9CA3AF] text-xs font-black uppercase tracking-widest mb-1">XP Earned</Text>
                <Text className="text-3xl font-black text-white">+{score * 20}</Text>
              </View>
              <View className="w-12 h-12 bg-[#5B8DEF]/10 rounded-2xl items-center justify-center">
                <Brain size={24} color="#5B8DEF" />
              </View>
            </View>
            
            <View className="h-2 w-full bg-[#0F1115] rounded-full overflow-hidden">
              <View 
                style={{ width: `${(score / mockAiQuestions.length) * 100}%` }} 
                className="h-full bg-[#00C853]" 
              />
            </View>
          </View>

          <TouchableOpacity 
            onPress={() => router.replace('/(tabs)')}
            className="w-full rounded-[24px] overflow-hidden"
          >
            <LinearGradient
              colors={['#5B8DEF', '#7C4DFF']}
              className="py-5 items-center"
            >
              <Text className="text-white font-black text-lg uppercase tracking-widest">Back to Home</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#0F1115]">
      <View className="flex-1 p-6">
        {/* Header */}
        <View className="flex-row items-center justify-between mb-8">
          <TouchableOpacity 
            onPress={() => router.back()}
            className="w-12 h-12 bg-[#1A1D24] rounded-xl items-center justify-center border border-[#2A2D34]"
          >
            <X size={24} color="#9CA3AF" />
          </TouchableOpacity>
          <View className="bg-[#1A1D24] px-4 py-2 rounded-full border border-[#2A2D34] flex-row items-center gap-2">
            <Timer size={18} color={timeLeft < 10 ? '#FF5252' : '#5B8DEF'} />
            <Text className={`font-black text-lg ${timeLeft < 10 ? 'text-[#FF5252]' : 'text-white'}`}>
              0:{timeLeft.toString().padStart(2, '0')}
            </Text>
          </View>
          <View className="w-12" />
        </View>

        {/* Progress Bar */}
        <View className="w-full h-1.5 bg-[#1A1D24] rounded-full overflow-hidden mb-12">
          <Animated.View style={timerStyle} className="h-full" />
        </View>

        <View className="flex-1 w-full max-w-md self-center">
          <Animated.View 
            key={currentIdx}
            entering={SlideInRight.duration(400)}
            exiting={SlideOutLeft.duration(400)}
          >
            <View className="flex-row items-center gap-2 mb-4">
              <View className="bg-[#5B8DEF]/10 px-3 py-1 rounded-full border border-[#5B8DEF]/20">
                <Text className="text-[#5B8DEF] text-[10px] font-black uppercase">Question {currentIdx + 1}/{mockAiQuestions.length}</Text>
              </View>
              <View className="bg-[#00C853]/10 px-3 py-1 rounded-full border border-[#00C853]/20">
                <Text className="text-[#00C853] text-[10px] font-black uppercase">+{score * 20} XP</Text>
              </View>
            </View>

            <Text className="text-2xl font-black text-white mb-8 leading-tight">
              {currentQuestion.question}
            </Text>

            <View className="gap-4">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedIdx === index;
                const isCorrect = index === currentQuestion.correctIndex;
                const showResult = selectedIdx !== null;

                let borderColor = '#2A2D34';
                let bgColor = '#1A1D24';
                if (showResult) {
                  if (isCorrect) {
                    borderColor = '#00C853';
                    bgColor = 'rgba(0, 200, 83, 0.1)';
                  } else if (isSelected) {
                    borderColor = '#FF5252';
                    bgColor = 'rgba(255, 82, 82, 0.1)';
                  }
                } else if (isSelected) {
                  borderColor = '#5B8DEF';
                }

                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleAnswer(index)}
                    disabled={showResult}
                    style={{ borderColor, backgroundColor: bgColor }}
                    className="w-full border-2 rounded-[24px] p-5 flex-row items-center justify-between"
                  >
                    <Text className={`text-lg font-bold ${showResult && isCorrect ? 'text-[#00C853]' : showResult && isSelected ? 'text-[#FF5252]' : 'text-white'}`}>
                      {option}
                    </Text>
                    {showResult && isCorrect && <Check size={24} color="#00C853" />}
                    {showResult && isSelected && !isCorrect && <X size={24} color="#FF5252" />}
                  </TouchableOpacity>
                );
              })}
            </View>
          </Animated.View>

          {showExplanation && (
            <Animated.View entering={FadeInDown.duration(400)} className="mt-8 bg-[#5B8DEF]/5 border border-[#5B8DEF]/20 rounded-3xl p-6">
              <View className="flex-row items-center gap-2 mb-2">
                <Brain size={16} color="#5B8DEF" />
                <Text className="text-[#5B8DEF] font-black text-xs uppercase tracking-widest">AI Explanation</Text>
              </View>
              <Text className="text-[#9CA3AF] text-sm leading-relaxed">
                {currentQuestion.explanation}
              </Text>
              
              <TouchableOpacity 
                onPress={nextQuestion}
                className="mt-6 flex-row items-center justify-center bg-[#5B8DEF] py-4 rounded-2xl gap-2"
              >
                <Text className="text-white font-black uppercase tracking-widest text-xs">
                  {currentIdx === mockAiQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                </Text>
                <ArrowRight size={16} color="white" />
              </TouchableOpacity>
            </Animated.View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
