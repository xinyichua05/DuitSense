import { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';
import { TrendingUp, Target, Trophy } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const onboardingSteps = [
  {
    icon: TrendingUp,
    title: 'Track Your Spending',
    description: 'Understand where your money goes with AI-powered insights and real-time tracking',
    colors: ['#5B8DEF', '#7C4DFF'] as const,
  },
  {
    icon: Target,
    title: 'Smart Budgeting',
    description: 'Set goals and let AI help you save more with personalized challenges',
    colors: ['#7C4DFF', '#FF5252'] as const,
  },
  {
    icon: Trophy,
    title: 'Gamify Your Finance',
    description: 'Earn XP, climb leaderboards, and compete with peers to build better habits',
    colors: ['#00C853', '#FFD600'] as const,
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      router.replace('/quiz');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const step = onboardingSteps[currentStep];
  const Icon = step.icon;

  return (
    <SafeAreaView className="flex-1 bg-[#0F1115]">
      <View className="flex-1 px-8 py-4 justify-between relative">
        <View className="flex-1 items-center justify-center relative z-10 w-full max-w-md self-center">
          <Animated.View
            key={currentStep}
            entering={FadeInRight.duration(500)}
            exiting={FadeOutLeft.duration(500)}
            className="items-center"
          >
            <View className="relative mb-12">
              <View className="absolute -inset-4 bg-white/5 rounded-full blur-xl" />
              <LinearGradient
                colors={step.colors}
                className="w-40 h-40 rounded-[48px] items-center justify-center shadow-2xl"
              >
                <Icon size={80} color="white" />
              </LinearGradient>
            </View>

            <Text className="text-4xl font-black text-white mb-6 text-center tracking-tighter">{step.title}</Text>
            <Text className="text-[#9CA3AF] text-lg text-center leading-relaxed font-medium px-4">
              {step.description}
            </Text>
          </Animated.View>
        </View>

        <View className="w-full max-w-md self-center pb-12">
          <View className="flex-row justify-center space-x-3 mb-12 gap-3">
            {onboardingSteps.map((_, index) => (
              <View
                key={index}
                className={`h-2.5 rounded-full ${
                  index === currentStep ? 'w-10 bg-[#5B8DEF]' : 'w-2.5 bg-[#1A1D24]'
                }`}
              />
            ))}
          </View>

          <TouchableOpacity onPress={handleNext} className="w-full overflow-hidden rounded-[24px] mb-6 shadow-xl shadow-[#5B8DEF]/20">
            <LinearGradient
              colors={['#5B8DEF', '#7C4DFF']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              className="py-5 items-center"
            >
              <Text className="text-white font-black text-lg uppercase tracking-widest">
                {currentStep === onboardingSteps.length - 1 ? 'Start Journey' : 'Next'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          {currentStep > 0 ? (
            <TouchableOpacity onPress={handleBack} className="w-full py-4 items-center">
              <Text className="text-[#9CA3AF] font-bold text-base uppercase tracking-widest">Back</Text>
            </TouchableOpacity>
          ) : (
            <View className="py-4 opacity-0">
              <Text className="text-base font-bold uppercase tracking-widest">Back</Text>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
