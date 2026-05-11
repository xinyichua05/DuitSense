import { useState, useMemo } from 'react';
import { View, Text, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Sparkles, TrendingUp } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Slider from '@react-native-community/slider';
import { LineChart } from 'react-native-chart-kit';
import TopBar from '../components/TopBar';

const screenWidth = Dimensions.get('window').width;

export default function FutureProjectionScreen() {
  const router = useRouter();
  const [savingsBoost, setSavingsBoost] = useState(500);
  const [targetAge, setTargetAge] = useState(62);

  const currentAge = 22;
  const baseMonthlySavings = 1000; // Base savings

  const chartData = useMemo(() => {
    const labels = [];
    const currentData = [];
    const improvedData = [];

    for (let age = currentAge; age <= 65; age += 5) {
      const years = age - currentAge;
      const months = years * 12;
      
      const current = months * baseMonthlySavings;
      const improved = months * (baseMonthlySavings + savingsBoost);
      
      labels.push(age.toString());
      currentData.push(current / 1000); // in 'k'
      improvedData.push(improved / 1000); // in 'k'
    }

    return {
      labels,
      datasets: [
        {
          data: currentData,
          color: (opacity = 1) => `rgba(156, 163, 175, ${opacity * 0.3})`,
          strokeWidth: 2,
        },
        {
          data: improvedData,
          color: (opacity = 1) => `rgba(124, 77, 255, ${opacity})`,
          strokeWidth: 4,
        },
      ],
      legend: ["Current Path", "Improved Path"]
    };
  }, [savingsBoost]);

  // Values for the specific target age
  const { currentValue, improvedValue, potentialGain } = useMemo(() => {
    const yearsToTarget = targetAge - currentAge;
    const current = yearsToTarget * 12 * baseMonthlySavings;
    const improved = yearsToTarget * 12 * (baseMonthlySavings + savingsBoost);
    return {
      currentValue: current,
      improvedValue: improved,
      potentialGain: improved - current
    };
  }, [targetAge, savingsBoost]);

  const chartConfig = {
    backgroundGradientFrom: '#1A1D24',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#2A2D34',
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 2,
    useShadowColorFromDataset: false,
    propsForDots: {
      r: '4',
      strokeWidth: '2',
      stroke: '#7C4DFF',
    },
    decimalPlaces: 0,
    labelColor: (opacity = 1) => `rgba(156, 163, 175, ${opacity})`,
    gridColor: (opacity = 1) => `rgba(255, 255, 255, 0.05)`,
  };

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
            <View className="flex-row gap-3 mb-4">
              <View className="flex-1 bg-[#0F1115] rounded-[24px] p-5 border border-[#2A2D34]">
                <Text className="text-[#9CA3AF] text-xs font-bold mb-1">Current Trajectory</Text>
                <Text className="text-2xl font-black text-white">RM {Math.round(currentValue).toLocaleString()}</Text>
              </View>
              <LinearGradient
                colors={['rgba(0, 200, 83, 0.1)', 'transparent']}
                className="flex-1 border border-[#00C853]/20 rounded-[24px] p-5"
              >
                <Text className="text-[#9CA3AF] text-xs font-bold mb-1">Improved Trajectory</Text>
                <Text className="text-2xl font-black text-[#00C853]">RM {Math.round(improvedValue).toLocaleString()}</Text>
              </LinearGradient>
            </View>

            <View className="bg-[#00C853]/10 border border-[#00C853]/20 rounded-[24px] p-4 flex-row items-center justify-between mb-6">
              <Text className="text-[#9CA3AF] text-sm font-bold">Potential Gain</Text>
              <Text className="text-[#00C853] text-xl font-black">+RM {Math.round(potentialGain).toLocaleString()}</Text>
            </View>

            <View className="mb-4 w-full items-center">
              <LineChart
                data={chartData}
                width={screenWidth - 80}
                height={220}
                chartConfig={chartConfig}
                bezier
                withDots={true}
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

          {/* Target Age Slider */}
          <Animated.View
            entering={FadeInDown.delay(200)}
            className="bg-[#1A1D24] border border-[#2A2D34] rounded-[24px] p-6 shadow-lg"
          >
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-white text-base font-bold tracking-tight">Target Age: <Text className="text-[#5B8DEF]">{Math.round(targetAge)} years</Text></Text>
            </View>
            <Slider
              style={{ width: '100%', height: 40 }}
              minimumValue={22}
              maximumValue={65}
              step={1}
              value={targetAge}
              onValueChange={(val) => setTargetAge(val)}
              minimumTrackTintColor="#5B8DEF"
              maximumTrackTintColor="#0F1115"
              thumbTintColor="#ffffff"
            />
          </Animated.View>

          {/* Monthly Savings Boost Slider */}
          <Animated.View
            entering={FadeInDown.delay(300)}
            className="bg-[#1A1D24] border border-[#2A2D34] rounded-[24px] p-6 shadow-lg"
          >
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-white text-base font-bold tracking-tight">Monthly Savings Boost: <Text className="text-[#00C853]">+RM {Math.round(savingsBoost)}</Text></Text>
            </View>
            <Slider
              style={{ width: '100%', height: 40 }}
              minimumValue={0}
              maximumValue={5000}
              step={50}
              value={savingsBoost}
              onValueChange={(val) => setSavingsBoost(val)}
              minimumTrackTintColor="#00C853"
              maximumTrackTintColor="#0F1115"
              thumbTintColor="#ffffff"
            />
          </Animated.View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
