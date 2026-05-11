import { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown, SlideInRight, SlideOutLeft, withTiming, useAnimatedStyle, useSharedValue, useEffect } from 'react-native-reanimated';
import { ShoppingBag, Coffee, Smartphone, Gamepad2, ChevronRight } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

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

export default function PersonaQuizScreen() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const progressWidth = useSharedValue(0);

  const question = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  // Animate progress bar
  progressWidth.value = withTiming(progress, { duration: 300 });

  const progressStyle = useAnimatedStyle(() => {
    return {
      width: `${progressWidth.value}%`,
    };
  });

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [currentQuestion]: value });

    if (currentQuestion < quizQuestions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300);
    } else {
      setTimeout(() => router.replace('/result'), 300);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0F1115]">
      <View className="flex-1 p-6">
        <View className="mb-8 mt-4">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-[#9CA3AF] text-sm">Question {currentQuestion + 1} of {quizQuestions.length}</Text>
            <Text className="text-[#5B8DEF] text-sm font-semibold">{Math.round(progress)}%</Text>
          </View>
          <View className="w-full bg-[#1A1D24] rounded-full h-2 overflow-hidden">
            <Animated.View style={progressStyle} className="h-full">
              <LinearGradient
                colors={['#5B8DEF', '#7C4DFF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                className="flex-1"
              />
            </Animated.View>
          </View>
        </View>

        <View className="flex-1 w-full max-w-md self-center">
          <Animated.View
            key={currentQuestion}
            entering={SlideInRight.duration(300)}
            exiting={SlideOutLeft.duration(300)}
            className="flex-1"
          >
            <Text className="text-2xl font-bold text-white mb-8">{question.question}</Text>

            <View className="space-y-4 gap-4">
              {question.options.map((option, index) => {
                const OptionIcon = 'icon' in option ? option.icon : null;
                return (
                  <Animated.View
                    key={index}
                    entering={FadeInDown.delay(index * 100).duration(300)}
                  >
                    <TouchableOpacity
                      onPress={() => handleAnswer(option.value)}
                      activeOpacity={0.7}
                      className="w-full bg-[#1A1D24] border border-[#2A2D34] rounded-2xl p-5 flex-row items-center justify-between"
                    >
                      <View className="flex-row items-center">
                        {OptionIcon && (
                          <LinearGradient
                            colors={['rgba(91, 141, 239, 0.2)', 'rgba(124, 77, 255, 0.2)']}
                            className="w-12 h-12 rounded-xl items-center justify-center mr-4"
                          >
                            <OptionIcon size={24} color="#5B8DEF" />
                          </LinearGradient>
                        )}
                        <Text className="text-white font-medium text-base">{option.label}</Text>
                      </View>
                      <ChevronRight size={20} color="#9CA3AF" />
                    </TouchableOpacity>
                  </Animated.View>
                );
              })}
            </View>
          </Animated.View>
        </View>

        {currentQuestion > 0 && (
          <TouchableOpacity
            onPress={() => setCurrentQuestion(currentQuestion - 1)}
            className="mt-6 py-4 items-center"
          >
            <Text className="text-[#9CA3AF] font-medium text-lg">Back</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}
