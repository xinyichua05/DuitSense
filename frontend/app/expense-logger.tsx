import { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { X, ShoppingBag, Coffee, Car, Home, Smartphone, Heart } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const categories = [
  { icon: ShoppingBag, label: 'Shopping', colors: ['#7C4DFF', '#FF5252'] as const },
  { icon: Coffee, label: 'Food', colors: ['#FFD600', '#00C853'] as const },
  { icon: Car, label: 'Transport', colors: ['#5B8DEF', '#7C4DFF'] as const },
  { icon: Home, label: 'Bills', colors: ['#FF5252', '#FFD600'] as const },
  { icon: Smartphone, label: 'Tech', colors: ['#00C853', '#5B8DEF'] as const },
  { icon: Heart, label: 'Health', colors: ['#FF5252', '#7C4DFF'] as const },
];

export default function ExpenseLoggerModal() {
  const router = useRouter();
  const [amount, setAmount] = useState('0');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleKeyPress = (val: string) => {
    if (val === 'back') {
      setAmount(prev => prev.length > 1 ? prev.slice(0, -1) : '0');
    } else if (val === '.') {
      if (!amount.includes('.')) setAmount(prev => prev + '.');
    } else {
      setAmount(prev => prev === '0' ? val : prev + val);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0F1115]">
      <View className="flex-1 justify-end">
        <Animated.View
          entering={FadeInUp.duration(400)}
          className="bg-[#1A1D24] rounded-t-[48px] p-8 pb-12 shadow-2xl"
        >
          <View className="items-center mb-8">
            <View className="w-12 h-1.5 bg-[#2A2D34] rounded-full mb-8" />
            <Text className="text-[#9CA3AF] text-sm font-black uppercase tracking-widest mb-4">Add New Expense</Text>
            <View className="flex-row items-center">
              <Text className="text-white text-5xl font-black tracking-tighter">RM {amount}</Text>
            </View>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-10 -mx-8 px-8">
            <View className="flex-row gap-4">
              {categories.map((category) => {
                const Icon = category.icon;
                const isSelected = selectedCategory === category.label;
                return (
                  <TouchableOpacity
                    key={category.label}
                    onPress={() => setSelectedCategory(category.label)}
                    className={`px-6 py-4 rounded-[24px] border-2 flex-row items-center gap-3 ${
                      isSelected
                        ? 'border-[#5B8DEF] bg-[#5B8DEF]/10'
                        : 'border-[#2A2D34] bg-[#0F1115]'
                    }`}
                  >
                    <Icon size={18} color={isSelected ? '#5B8DEF' : '#9CA3AF'} />
                    <Text className={`font-black text-sm ${isSelected ? 'text-white' : 'text-[#9CA3AF]'}`}>{category.label}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>

          <View className="mb-10">
            <View className="flex-row flex-wrap justify-between gap-y-6">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'back'].map((key) => (
                <TouchableOpacity
                  key={key}
                  onPress={() => handleKeyPress(key)}
                  className="w-[30%] h-16 items-center justify-center rounded-2xl"
                >
                  {key === 'back' ? (
                    <X size={24} color="white" />
                  ) : (
                    <Text className="text-white text-2xl font-black">{key}</Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity
            onPress={() => router.back()}
            disabled={amount === '0' || !selectedCategory}
            className={`w-full rounded-[24px] overflow-hidden ${amount === '0' || !selectedCategory ? 'opacity-50' : 'opacity-100'}`}
          >
            <LinearGradient
              colors={['#5B8DEF', '#7C4DFF']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              className="py-5 items-center"
            >
              <Text className="text-white font-black text-lg uppercase tracking-widest">Save Expense</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}
