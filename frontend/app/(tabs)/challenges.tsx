import { View, Text, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown, FadeInRight, ZoomIn } from 'react-native-reanimated';
import { Gift, Users, Sparkles } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import TopBar from '../components/TopBar';

const challenges = [
  {
    id: 1,
    title: 'Raya Saving Challenge',
    description: 'Save RM500 before Hari Raya',
    progress: 68,
    xp: 500,
    coins: 200,
    energy: 40,
    emoji: '🌙',
    difficulty: 'Medium',
    colors: ['#00C853', '#FFD600'] as const,
  },
  {
    id: 2,
    title: 'No Bubble Tea for 5 Days',
    description: 'Avoid unnecessary sweets',
    progress: 40,
    xp: 120,
    coins: 50,
    energy: 20,
    emoji: '🧋',
    difficulty: 'Easy',
    colors: ['#5B8DEF', '#7C4DFF'] as const,
  },
  {
    id: 3,
    title: 'CNY Budget Master',
    description: 'Stay within CNY budget',
    progress: 85,
    xp: 300,
    coins: 150,
    energy: 30,
    emoji: '🧧',
    difficulty: 'Hard',
    colors: ['#FF5252', '#FFD600'] as const,
  },
];

export default function ChallengesScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#0F1115]">
      <TopBar
        onSettingsClick={() => router.push('/settings')}
        onWrappedClick={() => router.push('/wrapped')}
      />
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }} className="flex-1">
        <View className="px-6 gap-6">

          {/* HERO AVATAR SECTION */}
          <Animated.View entering={FadeInDown.duration(600)}>
            <LinearGradient
              colors={['#1A1D24', '#0F1115']}
              className="rounded-[40px] border-2 border-[#5B8DEF]/30 p-8 shadow-2xl overflow-hidden"
            >
              <View className="items-center">
                <View className="flex-row items-center bg-[#5B8DEF]/10 border border-[#5B8DEF]/20 rounded-full px-4 py-1.5 mb-6 gap-2">
                  <Sparkles size={14} color="#5B8DEF" />
                  <Text className="text-[#5B8DEF] text-[10px] font-black uppercase tracking-widest">Evolution Level 4</Text>
                </View>

                <Animated.View entering={ZoomIn.delay(300)} className="w-44 h-44 rounded-full bg-[#0F1115] items-center justify-center border-4 border-[#5B8DEF]/20 mb-4">
                  <Text className="text-8xl">🐷</Text>
                  <View className="absolute -bottom-2 bg-[#00C853] px-3 py-1 rounded-full">
                    <Text className="text-white text-[10px] font-black">ACTIVE</Text>
                  </View>
                </Animated.View>

                <Text className="text-3xl font-black text-white mb-1 tracking-tight">Penny</Text>
                <Text className="text-[#9CA3AF] text-sm font-bold mb-6">"You're doing great today!"</Text>

                <View className="flex-row gap-6 mb-8">
                  <View className="items-center">
                    <View className="w-12 h-1.5 bg-[#2A2D34] rounded-full overflow-hidden mb-2">
                      <View className="h-full bg-[#FF5252] w-[80%]" />
                    </View>
                    <Text className="text-[#9CA3AF] text-[8px] font-black uppercase">Happiness</Text>
                  </View>
                  <View className="items-center">
                    <View className="w-12 h-1.5 bg-[#2A2D34] rounded-full overflow-hidden mb-2">
                      <View className="h-full bg-[#00C853] w-[95%]" />
                    </View>
                    <Text className="text-[#9CA3AF] text-[8px] font-black uppercase">Discipline</Text>
                  </View>
                  <View className="items-center">
                    <View className="w-12 h-1.5 bg-[#2A2D34] rounded-full overflow-hidden mb-2">
                      <View className="h-full bg-[#5B8DEF] w-[60%]" />
                    </View>
                    <Text className="text-[#9CA3AF] text-[8px] font-black uppercase">Energy</Text>
                  </View>
                </View>

                <View className="w-full">
                  <View className="flex-row justify-between mb-2 px-2">
                    <Text className="text-white text-[10px] font-black uppercase tracking-wider">Evolution Progress</Text>
                    <Text className="text-[#5B8DEF] text-[10px] font-black">68%</Text>
                  </View>
                  <View className="w-full h-3 bg-[#0F1115] rounded-full overflow-hidden border border-[#2A2D34]">
                    <LinearGradient
                      colors={['#5B8DEF', '#7C4DFF']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      className="h-full w-[68%]"
                    />
                  </View>
                  <Text className="text-[#9CA3AF] text-[10px] font-bold text-center mt-2 italic">Complete 3 more challenges to evolve</Text>
                </View>
              </View>
            </LinearGradient>
          </Animated.View>

          {/* DAILY CARE */}
          <View className="flex-row gap-3">
            <TouchableOpacity className="flex-1 bg-[#1A1D24] border border-[#2A2D34] rounded-[24px] p-5 items-center flex-row justify-center gap-2">
              <Gift size={20} color="#FFD600" />
              <Text className="text-white font-black text-xs uppercase tracking-widest">Feed Penny</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 bg-[#1A1D24] border border-[#2A2D34] rounded-[24px] p-5 items-center flex-row justify-center gap-2">
              <Users size={20} color="#5B8DEF" />
              <Text className="text-white font-black text-xs uppercase tracking-widest">Collect Daily</Text>
            </TouchableOpacity>
          </View>

          {/* ACTIVE CHALLENGES */}
          <View>
            <View className="flex-row items-center justify-between mb-4 px-1">
              <Text className="text-white font-black text-2xl tracking-tighter">Active Challenges</Text>
              <TouchableOpacity>
                <Text className="text-[#5B8DEF] text-sm font-black uppercase">View All</Text>
              </TouchableOpacity>
            </View>

            <View className="gap-4">
              {challenges.map((challenge, index) => (
                <Animated.View
                  key={challenge.id}
                  entering={FadeInRight.delay(400 + index * 100).duration(400)}
                >
                  <View className="bg-[#1A1D24] border-2 border-[#2A2D34] rounded-[40px] p-8 shadow-xl">
                    <View className="flex-row items-start mb-6 gap-4">
                      <View className="w-16 h-16 bg-[#0F1115] rounded-[24px] items-center justify-center border-2 border-white/5">
                        <Text className="text-4xl">{challenge.emoji}</Text>
                      </View>
                      <View className="flex-1">
                        <View className="flex-row items-center gap-2 mb-1">
                          <Text className="text-white font-black text-xl tracking-tight flex-shrink">{challenge.title}</Text>
                          <View className={`px-2 py-0.5 rounded-full ${
                            challenge.difficulty === 'Hard' ? 'bg-[#FF5252]/10 border border-[#FF5252]/20' :
                            challenge.difficulty === 'Medium' ? 'bg-[#FFD600]/10 border border-[#FFD600]/20' :
                            'bg-[#00C853]/10 border border-[#00C853]/20'
                          }`}>
                            <Text className={`text-[8px] font-black uppercase ${
                              challenge.difficulty === 'Hard' ? 'text-[#FF5252]' :
                              challenge.difficulty === 'Medium' ? 'text-[#FFD600]' :
                              'text-[#00C853]'
                            }`}>{challenge.difficulty}</Text>
                          </View>
                        </View>
                        <Text className="text-[#9CA3AF] text-sm font-bold">{challenge.description}</Text>
                      </View>
                    </View>

                    <View className="gap-4">
                      <View className="w-full bg-[#0F1115] rounded-full h-4 overflow-hidden border border-[#2A2D34]">
                        <LinearGradient
                          colors={challenge.colors}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 0 }}
                          style={{ width: `${challenge.progress}%`, height: '100%' }}
                        />
                      </View>

                      <View className="flex-row items-center justify-between border-t border-[#2A2D34] pt-4">
                        <View className="flex-row gap-4">
                          <View className="items-center">
                            <Text className="text-white font-black text-base">+{challenge.xp}</Text>
                            <Text className="text-[#9CA3AF] text-[8px] font-black uppercase">XP</Text>
                          </View>
                          <View className="items-center">
                            <Text className="text-[#FFD600] font-black text-base">+{challenge.coins}</Text>
                            <Text className="text-[#9CA3AF] text-[8px] font-black uppercase">Coins</Text>
                          </View>
                          <View className="items-center">
                            <Text className="text-[#5B8DEF] font-black text-base">+{challenge.energy}</Text>
                            <Text className="text-[#9CA3AF] text-[8px] font-black uppercase">Energy</Text>
                          </View>
                        </View>
                        <TouchableOpacity className="bg-[#5B8DEF] px-6 py-3 rounded-2xl">
                          <Text className="text-white font-black text-xs uppercase">Join</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </Animated.View>
              ))}
            </View>
          </View>

          {/* SQUAD */}
          <View className="mb-12">
            <View className="flex-row items-center justify-between mb-6 px-1">
              <Text className="text-white font-black text-2xl tracking-tighter">Your Squad</Text>
              <TouchableOpacity className="bg-[#5B8DEF]/10 border border-[#5B8DEF]/20 px-4 py-2 rounded-full">
                <Text className="text-[#5B8DEF] text-[10px] font-black uppercase tracking-widest">Invite Friends</Text>
              </TouchableOpacity>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-6 px-6">
              <View className="flex-row gap-4">
                {[
                  { name: 'Sarah', avatar: '🐱', lvl: 10, color: '#FF5252' },
                  { name: 'Zack', avatar: '🦊', lvl: 8, color: '#FFD600' },
                  { name: 'Mei', avatar: '🐨', lvl: 11, color: '#00C853' },
                  { name: 'Amir', avatar: '🦁', lvl: 4, color: '#7C4DFF' },
                ].map((member, i) => (
                  <TouchableOpacity key={i} className="bg-[#1A1D24] border-2 border-[#2A2D34] rounded-[40px] p-6 items-center w-36 shadow-lg">
                    <View
                      style={{ borderColor: member.color + '40' }}
                      className="w-20 h-20 bg-[#0F1115] rounded-[28px] items-center justify-center mb-4 border-2"
                    >
                      <Text className="text-4xl">{member.avatar}</Text>
                      <View className="absolute -top-2 -right-2 bg-white px-2 py-0.5 rounded-full">
                        <Text className="text-[8px] font-black text-[#0F1115]">Lvl {member.lvl}</Text>
                      </View>
                    </View>
                    <Text className="text-white font-black text-sm mb-1">{member.name}</Text>
                    <View className="w-full h-1 bg-[#0F1115] rounded-full overflow-hidden mt-2">
                      <View style={{ width: `${(member.lvl / 15) * 100}%`, backgroundColor: member.color }} className="h-full" />
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
