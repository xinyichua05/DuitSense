import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { Plus, Sparkles, Target, Zap, ChevronRight, TrendingDown } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInUp, FadeInDown, ZoomIn } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import TopBar from '../components/TopBar';

const knowledgeFeed = [
  { title: 'Save 20% on groceries', description: 'Shop on weekdays instead of weekends', icon: Target, colors: ['#00C853', '#FFD600'] as const },
  { title: 'Investment tip', description: 'Start with ASB for safe returns', icon: TrendingDown, colors: ['#5B8DEF', '#7C4DFF'] as const },
  { title: 'Budget hack', description: 'Use the 50/30/20 rule', icon: Zap, colors: ['#7C4DFF', '#FF5252'] as const },
];

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#0F1115]">
      <TopBar
        onSettingsClick={() => router.push('/settings')}
        onWrappedClick={() => router.push('/wrapped')}
      />
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }} className="flex-1">
        <View className="px-6 space-y-6 gap-6">

          <Animated.View
            entering={FadeInDown.delay(100).duration(500)}
            className="bg-[#1A1D24] border border-[#2A2D34] rounded-[32px] p-6 shadow-2xl"
          >
            <View className="flex-row items-center justify-between mb-6">
              <Text className="text-[#9CA3AF] text-sm font-medium">Monthly Spending</Text>
              <Text className="text-[#00C853] text-sm font-bold">-12% vs last month</Text>
            </View>

            <View className="flex-row items-baseline space-x-2 gap-1 mb-6">
              <Text className="text-4xl font-bold text-white">RM 1,247</Text>
              <Text className="text-[#9CA3AF] text-lg font-medium">/ RM 1,500</Text>
            </View>

            <View className="w-full bg-[#0F1115] rounded-full h-4 overflow-hidden mb-3">
              <Animated.View className="h-full w-[83%]">
                <LinearGradient
                  colors={['#5B8DEF', '#7C4DFF', '#00C853']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  className="flex-1"
                />
              </Animated.View>
            </View>

            <View className="flex-row items-center justify-between">
              <Text className="text-[#9CA3AF] text-xs font-medium">RM 253 left</Text>
              <Text className="text-[#5B8DEF] text-xs font-bold">83% used</Text>
            </View>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.delay(200).duration(500)}
            className="bg-[#1A1D24] border border-[#7C4DFF]/20 rounded-[24px] p-6 flex-row items-start gap-4"
          >
            <View className="w-12 h-12 rounded-full bg-[#7C4DFF]/20 items-center justify-center flex-shrink-0">
              <Sparkles size={24} color="#7C4DFF" />
            </View>
            <View className="flex-1">
              <Text className="text-white font-bold mb-1 text-lg">AI Insight</Text>
              <Text className="text-[#9CA3AF] text-sm leading-relaxed font-medium">
                You overspend 42% more on weekends. Try planning your purchases during weekdays.
              </Text>
            </View>
          </Animated.View>

          <View>
            <Text className="text-white font-bold mb-4 text-xl tracking-tight">Knowledge Feed</Text>
            <View className="space-y-4 gap-4">
              {knowledgeFeed.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Animated.View key={index} entering={FadeInDown.delay(300 + index * 100)}>
                    <TouchableOpacity
                      onPress={() => {}}
                      className="w-full bg-[#1A1D24] border border-[#2A2D34] rounded-[24px] p-5 flex-row items-center gap-4 shadow-sm"
                    >
                      <LinearGradient
                        colors={item.colors}
                        className="w-14 h-14 rounded-2xl items-center justify-center flex-shrink-0"
                      >
                        <Icon size={28} color="white" />
                      </LinearGradient>
                      <View className="flex-1">
                        <Text className="text-white font-bold text-base mb-0.5">{item.title}</Text>
                        <Text className="text-[#9CA3AF] text-sm font-medium">{item.description}</Text>
                      </View>
                      <ChevronRight size={20} color="#4B5563" />
                    </TouchableOpacity>
                  </Animated.View>
                );
              })}
            </View>
          </View>

          <View>
            <Text className="text-white font-bold mb-4 text-xl tracking-tight">Quick Challenges</Text>
            <View className="flex-row gap-4">
              <Animated.View entering={ZoomIn.delay(600)} className="flex-1">
                <View className="bg-[#1A1D24] border border-[#2A2D34] rounded-[24px] p-5">
                  <View className="w-10 h-10 bg-[#00C853]/10 rounded-xl items-center justify-center mb-3">
                    <Target size={20} color="#00C853" />
                  </View>
                  <Text className="text-white font-bold text-sm mb-1">No-Spend Weekend</Text>
                  <Text className="text-[#00C853] text-xs font-bold">+100 XP</Text>
                </View>
              </Animated.View>

              <Animated.View entering={ZoomIn.delay(700)} className="flex-1">
                <View className="bg-[#1A1D24] border border-[#2A2D34] rounded-[24px] p-5">
                  <View className="w-10 h-10 bg-[#FFD600]/10 rounded-xl items-center justify-center mb-3">
                    <Zap size={20} color="#FFD600" />
                  </View>
                  <Text className="text-white font-bold text-sm mb-1">Save RM50 Today</Text>
                  <Text className="text-[#FFD600] text-xs font-bold">+50 XP</Text>
                </View>
              </Animated.View>
            </View>
          </View>
        </View>
      </ScrollView>

      <Animated.View
        entering={ZoomIn.delay(800)}
        className={`absolute ${Platform.OS === 'ios' ? 'bottom-32' : 'bottom-28'} right-6 z-30`}
      >
        <TouchableOpacity
          onPress={() => router.push('/expense-logger')}
          className="shadow-2xl overflow-hidden rounded-[24px]"
        >
          <LinearGradient
            colors={['#5B8DEF', '#7C4DFF']}
            className="w-16 h-16 items-center justify-center"
          >
            <Plus size={32} color="white" strokeWidth={3} />
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
}
