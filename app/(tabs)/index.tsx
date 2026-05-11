import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, Platform, Modal } from 'react-native';
import { Plus, Sparkles, Target, Zap, ChevronRight, TrendingDown, X, BookOpen } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInUp, FadeInDown, ZoomIn } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import TopBar from '../components/TopBar';

const knowledgeFeed = [
  { 
    title: 'Save 20% on groceries', 
    description: 'Shop on weekdays instead of weekends', 
    content: 'Recent studies show that grocery prices often fluctuate based on demand. Supermarkets tend to offer more discounts on Tuesdays and Wednesdays to attract shoppers during slow periods. Additionally, shopping during these times helps you avoid impulse buys that often happen in crowded weekend aisles.',
    icon: Target, 
    colors: ['#00C853', '#FFD600'] as const 
  },
  { 
    title: 'Investment tip', 
    description: 'Start with ASB for safe returns', 
    content: 'Amanah Saham Bumiputera (ASB) is one of the most reliable investment vehicles in Malaysia. With consistent dividends and a fixed price per unit (for ASB 1), it is an excellent choice for building your emergency fund or long-term savings with minimal risk compared to the stock market.',
    icon: TrendingDown, 
    colors: ['#5B8DEF', '#7C4DFF'] as const 
  },
  { 
    title: 'Budget hack', 
    description: 'Use the 50/30/20 rule', 
    content: 'The 50/30/20 rule is a simple yet effective budgeting method. Allocate 50% of your income to Needs (rent, bills), 30% to Wants (dining out, hobbies), and 20% to Savings or Debt Repayment. This ensures you are living within your means while consistently building your future wealth.',
    icon: Zap, 
    colors: ['#7C4DFF', '#FF5252'] as const 
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState<typeof knowledgeFeed[0] | null>(null);

  return (
    <SafeAreaView className="flex-1 bg-[#0F1115]">
      <TopBar
        onSettingsClick={() => router.push('/settings')}
        onWrappedClick={() => router.push('/wrapped')}
      />
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }} className="flex-1">
        <View className="px-6 space-y-6 gap-6">

          <TouchableOpacity 
            onPress={() => router.push('/history')}
            activeOpacity={0.7}
          >
            <Animated.View
              entering={FadeInDown.delay(100).duration(500)}
              className="bg-[#1A1D24] border border-[#2A2D34] rounded-[32px] p-6 shadow-2xl"
            >
              <View className="flex-row items-center justify-between mb-6">
                <View className="flex-row items-center gap-2">
                  <Text className="text-[#9CA3AF] text-sm font-medium">Monthly Spending</Text>
                  <ChevronRight size={14} color="#9CA3AF" />
                </View>
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
          </TouchableOpacity>

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

          <Animated.View
            entering={FadeInDown.delay(250).duration(500)}
            className="bg-[#1A1D24] border border-[#5B8DEF]/20 rounded-[24px] p-6 flex-row items-center justify-between"
          >
            <View className="flex-row items-center gap-4">
              <View className="w-12 h-12 rounded-full bg-[#5B8DEF]/20 items-center justify-center">
                <Zap size={24} color="#5B8DEF" />
              </View>
              <View>
                <Text className="text-white font-bold text-lg">Daily Quiz</Text>
                <Text className="text-[#9CA3AF] text-sm font-medium">Test your knowledge & earn XP</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => router.push('/daily-quiz')}
              className="bg-[#5B8DEF] px-4 py-2 rounded-xl"
            >
              <Text className="text-white font-bold">Start</Text>
            </TouchableOpacity>
          </Animated.View>

          <View>
            <Text className="text-white font-bold mb-4 text-xl tracking-tight">Knowledge Feed</Text>
            <View className="space-y-4 gap-4">
              {knowledgeFeed.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Animated.View key={index} entering={FadeInDown.delay(300 + index * 100)}>
                    <TouchableOpacity
                      onPress={() => setSelectedItem(item)}
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

        </View>
      </ScrollView>

      {/* Detail Modal */}
      <Modal
        visible={selectedItem !== null}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSelectedItem(null)}
      >
        <View className="flex-1 bg-black/60 justify-end">
          <Animated.View 
            entering={FadeInUp}
            className="bg-[#1A1D24] rounded-t-[40px] p-8 pb-12 border-t border-white/10"
          >
            <View className="flex-row items-center justify-between mb-8">
              <View className="flex-row items-center gap-4">
                <View className="w-12 h-12 rounded-2xl bg-[#5B8DEF]/10 items-center justify-center">
                  <BookOpen size={24} color="#5B8DEF" />
                </View>
                <Text className="text-white text-xl font-bold">Article Detail</Text>
              </View>
              <TouchableOpacity 
                onPress={() => setSelectedItem(null)}
                className="w-10 h-10 bg-white/5 rounded-full items-center justify-center"
              >
                <X size={20} color="#9CA3AF" />
              </TouchableOpacity>
            </View>

            {selectedItem && (
              <View>
                <LinearGradient
                  colors={selectedItem.colors}
                  className="w-20 h-20 rounded-3xl items-center justify-center mb-6"
                >
                  <selectedItem.icon size={40} color="white" />
                </LinearGradient>
                <Text className="text-white text-3xl font-bold mb-2">{selectedItem.title}</Text>
                <Text className="text-[#5B8DEF] font-bold mb-6 text-lg">{selectedItem.description}</Text>
                <Text className="text-[#9CA3AF] text-base leading-relaxed">
                  {selectedItem.content}
                </Text>

                <TouchableOpacity 
                  onPress={() => setSelectedItem(null)}
                  className="mt-10 bg-[#5B8DEF] py-4 rounded-2xl items-center"
                >
                  <Text className="text-white font-bold text-lg">Got it!</Text>
                </TouchableOpacity>
              </View>
            )}
          </Animated.View>
        </View>
      </Modal>

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
