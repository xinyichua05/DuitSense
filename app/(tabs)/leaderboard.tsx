import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown, FadeInRight, FadeOutLeft } from 'react-native-reanimated';
import { Trophy, Medal, Award, TrendingUp, Gift } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import TopBar from '../components/TopBar';

const squadLeaderboard = [
  { rank: 1, name: 'Sarah M.', xp: 2847, avatar: '🏆', change: 2 },
  { rank: 2, name: 'Ahmad K.', xp: 2654, avatar: '🥈', change: -1 },
  { rank: 3, name: 'You (Amir)', xp: 2247, avatar: '🎯', change: 1, isUser: true },
  { rank: 4, name: 'Priya R.', xp: 2103, avatar: '⭐', change: -1 },
  { rank: 5, name: 'Marcus T.', xp: 1987, avatar: '🚀', change: 0 },
  { rank: 6, name: 'Lin W.', xp: 1856, avatar: '💎', change: 2 },
  { rank: 7, name: 'Fatimah A.', xp: 1742, avatar: '🌟', change: -2 },
  { rank: 8, name: 'David L.', xp: 1623, avatar: '⚡', change: 1 },
];

const weeklyLeaderboard = [
  { rank: 1, name: 'Ahmad K.', xp: 847, avatar: '🥇', badge: 'On Fire' },
  { rank: 2, name: 'You (Amir)', xp: 654, avatar: '🎯', badge: 'Climbing', isUser: true },
  { rank: 3, name: 'Sarah M.', xp: 603, avatar: '🏆', badge: 'Steady' },
];

export default function LeaderboardScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'squad' | 'weekly'>('squad');

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
            className="overflow-hidden rounded-[32px]"
          >
            <LinearGradient
              colors={['#FFD600', '#00C853']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="p-6 relative"
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-4">
                  <View className="w-16 h-16 bg-white/20 rounded-2xl items-center justify-center">
                    <Trophy size={32} color="white" />
                  </View>
                  <View>
                    <Text className="text-white font-black text-xl tracking-tight">You're in Top 8%</Text>
                    <Text className="text-white/80 font-bold text-sm">Keep up the great work!</Text>
                  </View>
                </View>
                <View className="items-end">
                  <Text className="text-4xl font-black text-white">2,247</Text>
                  <Text className="text-white/80 font-bold text-sm">Total XP</Text>
                </View>
              </View>
            </LinearGradient>
          </Animated.View>

          <View className="flex-row bg-[#1A1D24] rounded-2xl p-1 mb-2">
            <TouchableOpacity
              onPress={() => setActiveTab('squad')}
              className={`flex-1 py-3.5 rounded-xl items-center justify-center overflow-hidden`}
            >
              {activeTab === 'squad' && (
                <LinearGradient colors={['#5B8DEF', '#7C4DFF']} className="absolute inset-0" />
              )}
              <Text className={`text-base font-bold relative z-10 ${
                activeTab === 'squad' ? 'text-white' : 'text-[#9CA3AF]'
              }`}>Squad</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setActiveTab('weekly')}
              className={`flex-1 py-3.5 rounded-xl items-center justify-center overflow-hidden`}
            >
              {activeTab === 'weekly' && (
                <LinearGradient colors={['#5B8DEF', '#7C4DFF']} className="absolute inset-0" />
              )}
              <Text className={`text-base font-bold relative z-10 ${
                activeTab === 'weekly' ? 'text-white' : 'text-[#9CA3AF]'
              }`}>Weekly</Text>
            </TouchableOpacity>
          </View>

          <View className="space-y-3 gap-3">
            {squadLeaderboard.map((player) => (
              <Animated.View
                key={player.rank}
                entering={FadeInRight.delay(200 + player.rank * 50)}
              >
                <View
                  className={`bg-[#1A1D24] border rounded-[24px] p-4 flex-row items-center justify-between shadow-md ${
                    player.isUser ? 'border-[#5B8DEF] bg-[#5B8DEF]/5' : 'border-[#2A2D34]'
                  }`}
                >
                  <View className="flex-row items-center gap-4">
                    <View className="relative">
                      <View className={`w-14 h-14 rounded-full items-center justify-center border-2 ${
                        player.rank === 1 ? 'border-[#FFD600]' :
                        player.rank === 2 ? 'border-[#9CA3AF]' :
                        player.rank === 3 ? 'border-[#CD7F32]' : 'border-[#2A2D34]'
                      }`}>
                        <Text className="text-3xl">{player.avatar}</Text>
                      </View>
                      <View className={`absolute -bottom-1 -right-1 w-7 h-7 rounded-full items-center justify-center ${
                        player.rank === 1 ? 'bg-[#FFD600]' :
                        player.rank === 2 ? 'bg-[#9CA3AF]' :
                        player.rank === 3 ? 'bg-[#CD7F32]' : 'bg-[#2A2D34]'
                      }`}>
                        <Text className="text-white font-black text-xs">{player.rank}</Text>
                      </View>
                    </View>
                    <View>
                      <Text className={`font-bold text-lg tracking-tight ${player.isUser ? 'text-[#5B8DEF]' : 'text-white'}`}>
                        {player.name}
                      </Text>
                      <Text className="text-[#9CA3AF] font-bold text-sm">{player.xp.toLocaleString()} XP</Text>
                    </View>
                  </View>

                  <View className="flex-row items-center gap-2">
                    {player.change > 0 ? (
                      <View className="flex-row items-center gap-1">
                        <TrendingUp size={18} color="#00C853" />
                        <Text className="text-[#00C853] font-black text-sm">+{player.change}</Text>
                      </View>
                    ) : player.change < 0 ? (
                      <View className="flex-row items-center gap-1">
                        <View style={{ transform: [{ rotate: '180deg' }] }}>
                          <TrendingUp size={18} color="#FF5252" />
                        </View>
                        <Text className="text-[#FF5252] font-black text-sm">{player.change}</Text>
                      </View>
                    ) : (
                      <Text className="text-[#4B5563] font-bold">-</Text>
                    )}
                  </View>
                </View>
              </Animated.View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
