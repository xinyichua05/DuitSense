import { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Sparkles } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Slider from '@react-native-community/slider';
import { LineChart } from 'react-native-chart-kit';
import TopBar from '../components/TopBar';

const screenWidth = Dimensions.get('window').width;

const generateProjectionData = (savingsRate: number) => {
  const currentAge = 22;
  const labels = [];
  const current = [];
  const improved = [];

  for (let age = currentAge; age <= 65; age += 5) {
    const yearsSaving = age - currentAge;
    const currentTrajectory = yearsSaving * 1200;
    const improvedTrajectory = yearsSaving * (1200 + savingsRate * 50);
    labels.push(age.toString());
    current.push(Math.round(currentTrajectory / 1000));
    improved.push(Math.round(improvedTrajectory / 1000));
  }

  return { labels, current, improved };
};

const milestones = [
  { age: 25, label: 'Emergency Fund', amount: 5000, icon: '🛡️' },
  { age: 30, label: 'ASB Goal', amount: 20000, icon: '💰' },
  { age: 40, label: 'House Deposit', amount: 50000, icon: '🏠' },
  { age: 60, label: 'Retirement', amount: 150000, icon: '🌴' },
];

export default function FutureProjectionScreen() {
  const router = useRouter();
  const [savingsRate, setSavingsRate] = useState(10);
  const [targetAge, setTargetAge] = useState(30);

  const { labels, current, improved } = generateProjectionData(savingsRate);

  const chartData = {
    labels,
    datasets: [
      {
        data: current,
        color: (opacity = 1) => `rgba(156, 163, 175, ${opacity * 0.5})`, // Gray dashed
        strokeWidth: 2,
      },
      {
        data: improved,
        color: (opacity = 1) => `rgba(124, 77, 255, ${opacity})`, // Purple
        strokeWidth: 4,
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: '#1A1D24',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#2A2D34',
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 2,
    useShadowColorFromDataset: false,
    propsForDots: {
      r: '0',
    },
    decimalPlaces: 0,
    labelColor: (opacity = 1) => `rgba(156, 163, 175, ${opacity})`,
    gridColor: (opacity = 1) => `rgba(255, 255, 255, 0.05)`,
  };

  const improvedValue = improved[labels.indexOf(targetAge.toString())] * 1000 || 0;
  const currentValue = current[labels.indexOf(targetAge.toString())] * 1000 || 0;
  const difference = improvedValue - currentValue;

  return (
    <SafeAreaView className="flex-1 bg-[#0F1115]">
      <TopBar
        onSettingsClick={() => router.push('/settings')}
        onWrappedClick={() => router.push('/wrapped')}
      />
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }} className="flex-1">
        <View className="px-6 space-y-6 gap-6">

          <Animated.View
            entering={FadeInDown.delay(100)}
            className="bg-[#1A1D24] border border-[#2A2D34] rounded-[32px] p-6 relative overflow-hidden shadow-xl"
          >
            <View className="relative mb-6">
              <View className="flex-row items-center justify-between mb-4">
                <Text className="text-[#9CA3AF] text-sm font-bold">Projection to age {targetAge}</Text>
                <View className="flex-row items-center bg-[#5B8DEF]/10 border border-[#5B8DEF]/20 rounded-full px-3 py-1 gap-1.5">
                  <Sparkles size={14} color="#FFD600" />
                  <Text className="text-[#FFD600] text-xs font-bold">AI Powered</Text>
                </View>
              </View>

              <View className="flex-row gap-3 mb-4">
                <View className="flex-1 bg-[#0F1115] rounded-[24px] p-5 border border-[#2A2D34]">
                  <Text className="text-[#9CA3AF] text-xs font-bold mb-1">Current Trajectory</Text>
                  <Text className="text-2xl font-black text-white">RM {currentValue.toLocaleString()}</Text>
                </View>
                <View className="flex-1 bg-[#00C853]/5 border border-[#00C853]/20 rounded-[24px] p-5">
                  <Text className="text-[#9CA3AF] text-xs font-bold mb-1">Improved Trajectory</Text>
                  <Text className="text-2xl font-black text-[#00C853]">RM {improvedValue.toLocaleString()}</Text>
                </View>
              </View>

              <View className="bg-[#5B8DEF]/5 border border-[#5B8DEF]/20 rounded-[24px] p-4 flex-row items-center justify-between">
                <Text className="text-[#9CA3AF] text-sm font-bold">Potential Gain</Text>
                <Text className="text-[#00C853] text-xl font-black">+RM {difference.toLocaleString()}</Text>
              </View>
            </View>

            <View className="mb-4 w-full items-center">
              <LineChart
                data={chartData}
                width={screenWidth - 80}
                height={220}
                chartConfig={chartConfig}
                bezier
                withDots={false}
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                  marginLeft: -16
                }}
              />
            </View>

            <View className="flex-row items-center space-x-6 gap-6 justify-center mt-2">
              <View className="flex-row items-center gap-2">
                <View className="w-6 h-1 bg-[#9CA3AF]/30 rounded-full" />
                <Text className="text-[#9CA3AF] text-xs font-bold">Current Path</Text>
              </View>
              <View className="flex-row items-center gap-2">
                <View className="w-6 h-1 bg-[#7C4DFF] rounded-full" />
                <Text className="text-white text-xs font-bold">Improved Path</Text>
              </View>
            </View>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.delay(200)}
            className="bg-[#1A1D24] border border-[#2A2D34] rounded-[24px] p-6 shadow-lg"
          >
            <Text className="text-white text-base font-bold mb-4 tracking-tight">
              Target Age: <Text className="text-[#5B8DEF]">{targetAge} years</Text>
            </Text>
            <Slider
              style={{ width: '100%', height: 40 }}
              minimumValue={25}
              maximumValue={65}
              step={5}
              value={targetAge}
              onValueChange={setTargetAge}
              minimumTrackTintColor="#5B8DEF"
              maximumTrackTintColor="#0F1115"
              thumbTintColor="#ffffff"
            />
          </Animated.View>

          <Animated.View
            entering={FadeInDown.delay(300)}
            className="bg-[#1A1D24] border border-[#2A2D34] rounded-[24px] p-6 shadow-lg"
          >
            <Text className="text-white text-base font-bold mb-4 tracking-tight">
              Monthly Savings Boost: <Text className="text-[#00C853]">+RM {savingsRate * 50}</Text>
            </Text>
            <Slider
              style={{ width: '100%', height: 40 }}
              minimumValue={0}
              maximumValue={20}
              step={1}
              value={savingsRate}
              onValueChange={setSavingsRate}
              minimumTrackTintColor="#00C853"
              maximumTrackTintColor="#0F1115"
              thumbTintColor="#ffffff"
            />
          </Animated.View>

          <View>
            <Text className="text-white font-bold mb-4 text-xl tracking-tight px-1">Financial Milestones</Text>
            <View className="space-y-4 gap-4">
              {milestones.map((milestone, index) => (
                <Animated.View
                  key={index}
                  entering={FadeInDown.delay(400 + index * 100)}
                  className="bg-[#1A1D24] border border-[#2A2D34] rounded-[24px] p-5 flex-row items-center justify-between shadow-md"
                >
                  <View className="flex-row items-center gap-4">
                    <View className="w-12 h-12 bg-[#0F1115] rounded-2xl items-center justify-center">
                      <Text className="text-2xl">{milestone.icon}</Text>
                    </View>
                    <View>
                      <Text className="text-white font-bold text-lg tracking-tight">{milestone.label}</Text>
                      <Text className="text-[#9CA3AF] text-sm font-medium">Age {milestone.age}</Text>
                    </View>
                  </View>
                  <View className="items-end">
                    <Text className="text-white font-black text-lg">RM {milestone.amount.toLocaleString()}</Text>
                  </View>
                </Animated.View>
              ))}
            </View>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
