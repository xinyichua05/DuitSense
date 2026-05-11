import { View, Text, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Calendar, TrendingDown, TrendingUp } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const mockTransactions = [
  { id: 1, title: 'Village Grocer', amount: -145.20, date: 'May 10, 2026', category: 'Groceries' },
  { id: 2, title: 'Salary Credit', amount: 4500.00, date: 'May 01, 2026', category: 'Income' },
  { id: 3, title: 'Grab Ride', amount: -12.00, date: 'May 08, 2026', category: 'Transport' },
  { id: 4, title: 'Starbucks', amount: -18.50, date: 'May 07, 2026', category: 'Dining' },
  { id: 5, title: 'Uniqlo', amount: -79.00, date: 'May 05, 2026', category: 'Shopping' },
  { id: 6, title: 'TNB Bill', amount: -120.40, date: 'May 04, 2026', category: 'Bills' },
];

export default function HistoryScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-[#0F1115]">
      <View 
        className="flex-row items-center px-6 pb-6 border-b border-white/5"
        style={{ paddingTop: insets.top + 16 }}
      >
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-center justify-center bg-white/5 rounded-full">
          <ChevronLeft size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-xl font-bold ml-4">Spending History</Text>
      </View>

      <ScrollView className="flex-1 px-6 pt-6">
        <Animated.View entering={FadeInDown.delay(100)} className="bg-[#1A1D24] rounded-3xl p-6 mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-[#9CA3AF] font-medium">May 2026</Text>
            <Calendar size={20} color="#9CA3AF" />
          </View>
          <Text className="text-white text-3xl font-bold mb-2">RM 1,247.00</Text>
          <Text className="text-[#00C853] font-bold">You've saved RM 253 this month!</Text>
        </Animated.View>

        <Text className="text-white text-lg font-bold mb-4">Recent Transactions</Text>
        <View className="space-y-4 gap-4 pb-10">
          {mockTransactions.map((tx, index) => (
            <Animated.View 
              key={tx.id} 
              entering={FadeInDown.delay(200 + index * 50)}
              className="bg-[#1A1D24] p-4 rounded-2xl flex-row items-center justify-between"
            >
              <View className="flex-row items-center gap-4">
                <View className={`w-12 h-12 rounded-xl items-center justify-center ${tx.amount > 0 ? 'bg-[#00C853]/10' : 'bg-[#FF5252]/10'}`}>
                  {tx.amount > 0 ? <TrendingUp size={24} color="#00C853" /> : <TrendingDown size={24} color="#FF5252" />}
                </View>
                <View>
                  <Text className="text-white font-bold">{tx.title}</Text>
                  <Text className="text-[#9CA3AF] text-xs">{tx.date} • {tx.category}</Text>
                </View>
              </View>
              <Text className={`font-bold ${tx.amount > 0 ? 'text-[#00C853]' : 'text-white'}`}>
                {tx.amount > 0 ? '+' : ''}RM {Math.abs(tx.amount).toFixed(2)}
              </Text>
            </Animated.View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
