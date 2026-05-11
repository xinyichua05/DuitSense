import { View, Text, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Share2, Download, Sparkles, TrendingUp, Trophy, Flame, X } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function FinancialWrappedScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#0F1115]">
      <LinearGradient
        colors={['#1A1D24', '#0F1115']}
        className="absolute inset-0"
      />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
        <View className="flex-1 items-center justify-center p-6 py-12 relative">
          
          <TouchableOpacity
            onPress={() => router.back()}
            className="absolute top-6 right-6 w-12 h-12 bg-[#1A1D24] border border-[#2A2D34] rounded-full items-center justify-center z-50 shadow-xl"
          >
            <X size={24} color="white" />
          </TouchableOpacity>

          <Animated.View
            entering={FadeInDown.duration(600)}
            className="w-full max-w-md bg-[#1A1D24] border border-[#2A2D34] rounded-[48px] p-8 shadow-2xl relative overflow-hidden"
          >
            <LinearGradient
              colors={['rgba(91, 141, 239, 0.05)', 'transparent']}
              className="absolute inset-0"
            />

            <View className="relative">
              <Animated.View entering={FadeInDown.delay(200)} className="items-center mb-8">
                <View className="flex-row items-center bg-[#FFD600]/10 border border-[#FFD600]/20 rounded-full px-4 py-2 mb-6 gap-2">
                  <Sparkles size={16} color="#FFD600" />
                  <Text className="text-[#FFD600] text-[10px] font-black tracking-[2px] uppercase">Your 2026 Financial Wrapped</Text>
                </View>

                <View className="w-24 h-24 rounded-[32px] bg-[#0F1115] items-center justify-center border-2 border-[#5B8DEF]/20 mb-4 shadow-inner">
                  <Text className="text-5xl">🎯</Text>
                </View>

                <Text className="text-4xl font-black mb-1 text-white tracking-tighter">Amir</Text>
                <Text className="text-[#9CA3AF] text-base font-bold">The Future Builder</Text>
              </Animated.View>

              <Animated.View entering={FadeInDown.delay(400)} className="space-y-4 mb-8 gap-4">
                <View className="bg-[#0F1115] border border-[#00C853]/20 rounded-[32px] p-6 shadow-sm">
                  <View className="flex-row items-center gap-2 mb-2">
                    <TrendingUp size={20} color="#00C853" />
                    <Text className="text-[#9CA3AF] text-sm font-bold">Total Savings</Text>
                  </View>
                  <View className="flex-row items-end gap-2">
                    <Text className="text-4xl font-black text-white tracking-tighter">RM 4,327</Text>
                    <Text className="text-[#00C853] text-sm font-bold mb-1">↗ 34%</Text>
                  </View>
                </View>

                <View className="flex-row gap-4">
                  <View className="flex-1 bg-[#0F1115] border border-[#7C4DFF]/20 rounded-[32px] p-5 items-center">
                    <Trophy size={20} color="#FFD600" className="mb-2" />
                    <Text className="text-2xl font-black text-white mb-0.5">2,247</Text>
                    <Text className="text-[#9CA3AF] text-[10px] font-black uppercase tracking-wider">XP Earned</Text>
                  </View>

                  <View className="flex-1 bg-[#0F1115] border border-[#FF5252]/20 rounded-[32px] p-5 items-center">
                    <Flame size={20} color="#FF5252" className="mb-2" />
                    <Text className="text-2xl font-black text-white mb-0.5">14 Days</Text>
                    <Text className="text-[#9CA3AF] text-[10px] font-black uppercase tracking-wider">Best Streak</Text>
                  </View>
                </View>

                <View className="bg-[#0F1115] border border-[#5B8DEF]/20 rounded-[32px] p-6">
                  <Text className="text-[#9CA3AF] text-xs font-black uppercase tracking-wider mb-4">Top Spending Category</Text>
                  <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center gap-4">
                      <View className="w-12 h-12 bg-[#1A1D24] rounded-2xl items-center justify-center">
                        <Text className="text-2xl">🍔</Text>
                      </View>
                      <View>
                        <Text className="text-white font-bold text-lg">Food & Drinks</Text>
                        <Text className="text-[#9CA3AF] text-xs font-bold">RM 1,450</Text>
                      </View>
                    </View>
                  </View>
                </View>

                <LinearGradient
                  colors={['#00C853', '#009624']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  className="rounded-[32px] p-6 shadow-lg shadow-[#00C853]/20"
                >
                  <Text className="text-white/80 text-[10px] font-black uppercase tracking-wider mb-2">Future Projection Growth</Text>
                  <Text className="text-3xl font-black text-white mb-1 tracking-tight">+RM 28,000</Text>
                  <Text className="text-white/90 text-sm font-bold">by age 30 with current habits</Text>
                </LinearGradient>
              </Animated.View>

              <TouchableOpacity
                onPress={() => router.back()}
                className="bg-[#1A1D24] border border-[#2A2D34] py-5 rounded-[24px] items-center justify-center shadow-md active:scale-95"
              >
                <Text className="text-white font-black text-base uppercase tracking-widest">Close</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
