import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInUp, FadeInDown, ZoomIn } from 'react-native-reanimated';
import { Sparkles, Share2, TrendingUp } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function PersonaResultScreen() {
  const router = useRouter();

  const handleContinue = () => {
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0F1115]">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
        <View className="flex-1 items-center justify-center p-6 py-12 relative">
          
          <Animated.View
            entering={FadeInDown.delay(200).duration(500)}
            className="items-center mb-6 z-10"
          >
            <View className="flex-row items-center border border-[#5B8DEF]/30 rounded-full px-4 py-2 bg-[#1A1D24]">
              <Sparkles size={16} color="#FFD600" className="mr-2" />
              <Text className="text-[#FFD600] text-sm font-semibold">Your Financial Persona</Text>
            </View>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.delay(400).duration(500)}
            className="w-full max-w-md bg-[#1A1D24] border border-[#5B8DEF]/30 rounded-3xl p-8 mb-6 shadow-2xl z-10"
          >
            <Animated.View
              entering={ZoomIn.delay(600).springify()}
              className="self-center mb-6"
            >
              <LinearGradient
                colors={['#5B8DEF', '#7C4DFF']}
                className="w-24 h-24 rounded-2xl items-center justify-center shadow-lg"
              >
                <TrendingUp size={48} color="white" />
              </LinearGradient>
            </Animated.View>

            <Animated.Text
              entering={FadeInDown.delay(800).duration(500)}
              className="text-3xl font-bold text-center mb-3 text-white"
            >
              The Future Builder
            </Animated.Text>

            <Animated.View
              entering={FadeInUp.delay(1000).duration(500)}
              className="space-y-4 mt-6 gap-4"
            >
              <View className="flex-row items-center justify-between bg-[#0F1115] rounded-xl p-4">
                <Text className="text-[#9CA3AF] text-sm">Saving Mindset</Text>
                <Text className="text-white font-semibold">Goal-Oriented</Text>
              </View>
              <View className="flex-row items-center justify-between bg-[#0F1115] rounded-xl p-4">
                <Text className="text-[#9CA3AF] text-sm">Spending Style</Text>
                <Text className="text-white font-semibold">Calculated</Text>
              </View>
              <View className="flex-row items-center justify-between bg-[#0F1115] rounded-xl p-4">
                <Text className="text-[#9CA3AF] text-sm">Motivation</Text>
                <Text className="text-white font-semibold">Achievement</Text>
              </View>
            </Animated.View>

            <Animated.View
              entering={FadeInDown.delay(1200).duration(500)}
              className="mt-6 p-4 bg-[#1A1D24] border border-[#5B8DEF]/20 rounded-xl"
            >
              <Text className="text-[#9CA3AF] text-sm leading-relaxed text-center">
                You're a strategic planner who values long-term financial stability. You make informed decisions and stay committed to your goals.
              </Text>
            </Animated.View>

            <Animated.View
              entering={ZoomIn.delay(1400).duration(500)}
              className="mt-6 flex-row items-center justify-center"
            >
              <LinearGradient
                colors={['#FFD600', '#00C853']}
                className="rounded-full p-3 mr-3"
              >
                <Sparkles size={20} color="white" />
              </LinearGradient>
              <View>
                <Text className="text-[#9CA3AF] text-xs">Starting XP</Text>
                <Text className="text-2xl font-bold text-white">250 XP</Text>
              </View>
            </Animated.View>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.delay(1600).duration(500)}
            className="w-full max-w-md space-y-3 z-10 gap-3"
          >
            <TouchableOpacity onPress={handleContinue} className="w-full overflow-hidden rounded-2xl">
              <LinearGradient
                colors={['#5B8DEF', '#7C4DFF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                className="py-4 items-center"
              >
                <Text className="text-white font-semibold text-lg">Continue to Dashboard</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity className="w-full bg-[#1A1D24] border border-[#5B8DEF]/30 py-4 rounded-2xl flex-row items-center justify-center mt-3">
              <Share2 size={20} color="white" className="mr-2" />
              <Text className="text-white font-semibold text-lg">Share My Persona</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
