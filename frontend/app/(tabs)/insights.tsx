import { View, Text, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { TrendingDown, Sparkles, Users } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { LineChart, PieChart, BarChart } from 'react-native-chart-kit';
import TopBar from '../components/TopBar';

const screenWidth = Dimensions.get('window').width;

const monthlyData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
  datasets: [
    {
      data: [1200, 1450, 1100, 1350, 1247],
    },
  ],
};

const categoryData = [
  { name: 'Food', value: 450, color: '#FFD600', legendFontColor: '#9CA3AF', legendFontSize: 12 },
  { name: 'Transport', value: 280, color: '#5B8DEF', legendFontColor: '#9CA3AF', legendFontSize: 12 },
  { name: 'Shopping', value: 320, color: '#7C4DFF', legendFontColor: '#9CA3AF', legendFontSize: 12 },
  { name: 'Bills', value: 197, color: '#00C853', legendFontColor: '#9CA3AF', legendFontSize: 12 },
];

const peerComparisonData = {
  labels: ['You', 'Avg Peer'],
  datasets: [
    {
      data: [1247, 1420],
    },
  ],
};

const chartConfig = {
  backgroundGradientFrom: '#1A1D24',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#2A2D34',
  backgroundGradientToOpacity: 0,
  color: (opacity = 1) => `rgba(91, 141, 239, ${opacity})`,
  strokeWidth: 3,
  barPercentage: 0.6,
  useShadowColorFromDataset: false,
  propsForDots: {
    r: '5',
    strokeWidth: '3',
    stroke: '#5B8DEF',
  },
  decimalPlaces: 0,
  labelColor: (opacity = 1) => `rgba(156, 163, 175, ${opacity})`,
};

export default function InsightsScreen() {
  const router = useRouter();
  const totalSpending = categoryData.reduce((acc, item) => acc + item.value, 0);

  return (
    <SafeAreaView className="flex-1 bg-[#0F1115]">
      <TopBar
        onSettingsClick={() => router.push('/settings')}
        onWrappedClick={() => router.push('/wrapped')}
      />
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }} className="flex-1">
        <View className="px-6 gap-6">

          <Animated.View
            entering={FadeInDown.delay(100)}
            className="bg-[#1A1D24] border border-[#7C4DFF]/20 rounded-[24px] p-6 flex-row items-start gap-4"
          >
            <View className="w-12 h-12 rounded-full bg-[#7C4DFF]/20 items-center justify-center flex-shrink-0">
              <Sparkles size={24} color="#7C4DFF" />
            </View>
            <View className="flex-1">
              <Text className="text-white font-bold mb-1 text-lg">AI Analysis</Text>
              <Text className="text-[#9CA3AF] text-sm leading-relaxed font-medium">
                You overspend <Text className="text-[#FF5252] font-bold">42% more</Text> during weekends. Try planning your purchases during weekdays to save more.
              </Text>
            </View>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.delay(200)}
            className="bg-[#1A1D24] border border-[#2A2D34] rounded-[32px] p-6 overflow-hidden shadow-xl"
          >
            <Text className="text-white font-bold mb-6 text-xl tracking-tight">Monthly Spending Trend</Text>
            <View className="items-center w-full">
              <LineChart
                data={monthlyData}
                width={screenWidth - 80}
                height={220}
                chartConfig={{
                  ...chartConfig,
                  color: (opacity = 1) => `rgba(124, 77, 255, ${opacity})`,
                }}
                bezier
                withInnerLines={true}
                withOuterLines={false}
                withHorizontalLines={true}
                withVerticalLines={false}
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                  marginLeft: -16,
                }}
              />
            </View>
            <View className="flex-row items-center justify-center mt-4 gap-2 border-t border-[#2A2D34] pt-4">
              <TrendingDown size={18} color="#00C853" />
              <Text className="text-[#00C853] text-sm font-bold">12% decrease from last month</Text>
            </View>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.delay(300)}
            className="bg-[#1A1D24] border border-[#2A2D34] rounded-[32px] p-6 shadow-xl"
          >
            <Text className="text-white font-bold mb-6 text-xl tracking-tight">Spending by Category</Text>
            <View className="items-center justify-center mb-6 relative">
              <PieChart
                data={categoryData}
                width={screenWidth - 60}
                height={200}
                chartConfig={chartConfig}
                accessor="value"
                backgroundColor="transparent"
                paddingLeft="50"
                center={[0, 0]}
                absolute
                hasLegend={false}
              />
            </View>
            <View className="flex-row flex-wrap justify-between gap-y-4">
              {categoryData.map((category, index) => (
                <View key={index} className="flex-row items-center w-[48%] gap-3">
                  <View className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: category.color }} />
                  <View className="flex-1">
                    <Text className="text-white text-sm font-bold">{category.name}</Text>
                    <Text className="text-[#9CA3AF] text-xs font-medium">
                      RM {category.value} ({Math.round((category.value / totalSpending) * 100)}%)
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.delay(400)}
            className="bg-[#1A1D24] border border-[#2A2D34] rounded-[32px] p-6 shadow-xl"
          >
            <View className="flex-row items-center justify-between mb-6">
              <Text className="text-white font-bold text-xl tracking-tight">Peer Comparison</Text>
              <View className="flex-row items-center bg-[#5B8DEF]/10 border border-[#5B8DEF]/20 rounded-full px-3 py-1 gap-1.5">
                <Users size={14} color="#5B8DEF" />
                <Text className="text-[#5B8DEF] text-xs font-bold">Private</Text>
              </View>
            </View>
            <View className="items-center w-full">
              <BarChart
                data={peerComparisonData}
                width={screenWidth - 80}
                height={220}
                yAxisLabel="RM"
                yAxisSuffix=""
                chartConfig={{
                  ...chartConfig,
                  color: (opacity = 1) => `rgba(91, 141, 239, ${opacity})`,
                }}
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                  marginLeft: -16,
                }}
                showValuesOnTopOfBars
                fromZero
              />
            </View>
            <View className="mt-4 pt-4 border-t border-[#2A2D34] items-center">
              <Text className="text-[#00C853] text-sm font-bold">
                You spend <Text className="text-[#00C853] font-black">12% less</Text> than your peers
              </Text>
            </View>
          </Animated.View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
