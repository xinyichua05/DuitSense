import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { 
  FadeInDown, 
  FadeInRight, 
  ZoomIn, 
  useSharedValue, 
  useAnimatedStyle, 
  withSequence, 
  withSpring
} from 'react-native-reanimated';
import { Sparkles, Users } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import TopBar from '../components/TopBar';
import { useXP } from '../XPContext';

const challengesData = [
  {
    id: 1,
    title: 'Qurban Savings Plan',
    description: 'Save RM200 for your Qurban contribution',
    progress: 35,
    xp: 500,
    emoji: '🐏',
    difficulty: 'Medium',
    colors: ['#00C853', '#FFD600'] as const,
  },
  {
    id: 2,
    title: 'Haji Season Fasting',
    description: 'Save RM50 by preparing home meals during Arafah',
    progress: 0,
    xp: 150,
    emoji: '🕋',
    difficulty: 'Easy',
    colors: ['#5B8DEF', '#7C4DFF'] as const,
  },
  {
    id: 3,
    title: 'Rayagift Budget',
    description: 'Stay within budget for Eid gifts',
    progress: 75,
    xp: 300,
    emoji: '🎁',
    difficulty: 'Hard',
    colors: ['#FF5252', '#FFD600'] as const,
  },
];

const friends = [
  { id: 1, avatar: '👨‍💼', name: 'Ahmad' },
  { id: 2, avatar: '👩‍⚕️', name: 'Sarah' },
  { id: 3, avatar: '👨‍🎨', name: 'Marcus' },
  { id: 4, avatar: '👩‍💻', name: 'Priya' },
  { id: 5, avatar: '👨‍🚀', name: 'Lin' },
];

export default function ChallengesScreen() {
  const router = useRouter();
  const { xp, addXP } = useXP();
  const [progress, setProgress] = useState(68);
  const mascotScale = useSharedValue(1);

  const mascotStyle = useAnimatedStyle(() => ({
    transform: [{ scale: mascotScale.value }]
  }));

  const handleMarkAsDone = (challengeXp: number) => {
    // Animate mascot
    mascotScale.value = withSequence(
      withSpring(1.3),
      withSpring(1)
    );

    // Update stats
    addXP(challengeXp);
    setProgress(prev => Math.min(100, prev + 5));
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0F1115]">
      <TopBar
        onSettingsClick={() => router.push('/settings')}
        onWrappedClick={() => router.push('/wrapped')}
      />
      <ScrollView contentContainerStyle={{ paddingBottom: 140 }} className="flex-1">
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
                  <Text className="text-[#5B8DEF] text-[10px] font-black uppercase tracking-widest">Haji Festival Season</Text>
                </View>

                <Animated.View 
                  style={mascotStyle}
                  className="w-44 h-44 rounded-full bg-[#0F1115] items-center justify-center border-4 border-[#5B8DEF]/20 mb-4"
                >
                  <Text className="text-8xl">🦦</Text>
                  <View className="absolute -bottom-2 bg-[#00C853] px-3 py-1 rounded-full">
                    <Text className="text-white text-[10px] font-black">ACTIVE</Text>
                  </View>
                </Animated.View>

                <Text className="text-3xl font-black text-white mb-1 tracking-tight">Capy</Text>
                <Text className="text-[#9CA3AF] text-sm font-bold mb-6">"Let's save for Qurban together!"</Text>

                <View className="w-full">
                  <View className="flex-row justify-between mb-2 px-2">
                    <Text className="text-white text-[10px] font-black uppercase tracking-wider">Level Progress</Text>
                    <Text className="text-[#5B8DEF] text-[10px] font-black">{Math.round(progress)}%</Text>
                  </View>
                  <View className="w-full h-3 bg-[#0F1115] rounded-full overflow-hidden border border-[#2A2D34]">
                    <View 
                      style={{ width: `${progress}%` }} 
                      className="h-full"
                    >
                      <LinearGradient
                        colors={['#5B8DEF', '#7C4DFF']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        className="flex-1"
                      />
                    </View>
                  </View>
                  <Text className="text-[#9CA3AF] text-[10px] font-bold text-center mt-2 italic">Total XP: {xp.toLocaleString()}</Text>
                </View>
              </View>
            </LinearGradient>
          </Animated.View>

          {/* ACTIVE CHALLENGES */}
          <View>
            <View className="flex-row items-center justify-between mb-4 px-1">
              <Text className="text-white font-black text-2xl tracking-tighter">Haji Challenges</Text>
              <TouchableOpacity>
                <Text className="text-[#5B8DEF] text-sm font-black uppercase">View All</Text>
              </TouchableOpacity>
            </View>

            <View className="gap-4">
              {challengesData.map((challenge, index) => (
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
                        </View>
                        <TouchableOpacity 
                          onPress={() => handleMarkAsDone(challenge.xp)}
                          className="bg-[#5B8DEF] px-6 py-3 rounded-2xl"
                        >
                          <Text className="text-white font-black text-xs uppercase">Mark as Done</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </Animated.View>
              ))}
            </View>
          </View>

          {/* FRIENDS ACTIVITY SECTION */}
          <Animated.View 
            entering={FadeInDown.delay(800)}
            className="bg-[#1A1D24] border-2 border-[#2A2D34] rounded-[40px] p-6 mb-8"
          >
            <View className="flex-row items-center gap-2 mb-4">
              <Users size={20} color="#5B8DEF" />
              <Text className="text-white font-black text-lg tracking-tight">Friends in Challenges</Text>
            </View>
            <View className="flex-row items-center justify-around">
              {friends.map((friend) => (
                <View key={friend.id} className="items-center gap-1">
                  <View className="w-12 h-12 bg-[#0F1115] rounded-full items-center justify-center border-2 border-[#5B8DEF]/30">
                    <Text className="text-2xl">{friend.avatar}</Text>
                  </View>
                  <Text className="text-[#9CA3AF] text-[10px] font-bold">{friend.name}</Text>
                </View>
              ))}
              <TouchableOpacity className="w-12 h-12 bg-[#5B8DEF]/10 rounded-full items-center justify-center border-2 border-dashed border-[#5B8DEF]/30">
                <Text className="text-[#5B8DEF] text-xl font-bold">+</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
