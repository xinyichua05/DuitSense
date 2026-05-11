import { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Dimensions, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown, useAnimatedStyle, useSharedValue, withTiming, Easing, FadeIn, ZoomIn } from 'react-native-reanimated';
import { Gift, Sparkles, X } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Circle, G, Text as SvgText } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const rewards = [
  { label: 'RM5 Grab', color: '#FFD600', icon: '🚗' },
  { label: '50 XP', color: '#5B8DEF', icon: '⚡' },
  { label: 'RM10 Shopee', color: '#FF5252', icon: '🛍️' },
  { label: '100 XP', color: '#7C4DFF', icon: '💎' },
  { label: 'RM15 GrabFood', color: '#00C853', icon: '🍔' },
  { label: '200 XP', color: '#FFD600', icon: '🏆' },
  { label: 'Better Luck!', color: '#9CA3AF', icon: '🎯' },
  { label: 'RM20 Lazada', color: '#5B8DEF', icon: '🎁' },
];

export default function SpinWheelScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [isSpinning, setIsSpinning] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const [wonReward, setWonReward] = useState<typeof rewards[0] | null>(null);

  const rotation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  const handleSpin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    const winningIndex = Math.floor(Math.random() * rewards.length);
    const segmentAngle = 360 / rewards.length;
    const extraSpins = 5;
    
    // The pointer is at -90 degrees (top).
    // Segment i center is at (i + 0.5) * segmentAngle.
    // We need: rotation + center = -90 => rotation = -90 - center.
    const targetAngle = -90 - (winningIndex + 0.5) * segmentAngle;
    
    // Normalize to current rotation context
    const currentRot = rotation.value;
    const normalizedCurrent = currentRot % 360;
    let angleDiff = (targetAngle - normalizedCurrent) % 360;
    if (angleDiff > 0) angleDiff -= 360; // Ensure we always spin forward
    
    const finalRotation = currentRot - (360 * extraSpins) + angleDiff;

    rotation.value = withTiming(finalRotation, { duration: 4000, easing: Easing.out(Easing.cubic) });

    setTimeout(() => {
      setIsSpinning(false);
      setWonReward(rewards[winningIndex]);
      setShowReward(true);
    }, 4100);
  };

  return (
    <View className="flex-1 bg-[#0F1115]">
      <LinearGradient
        colors={['rgba(255, 214, 0, 0.1)', 'rgba(0, 200, 83, 0.1)']}
        className="absolute inset-0"
      />

      <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <TouchableOpacity
          onPress={() => router.back()}
          className="absolute right-6 w-12 h-12 bg-[#1A1D24]/90 border border-white/20 rounded-xl items-center justify-center z-50 shadow-lg"
          style={{ top: insets.top + 16 }}
        >
          <X size={24} color="white" />
        </TouchableOpacity>

        <Animated.View entering={FadeInDown.delay(100)} className="text-center mb-8 relative z-10 items-center">
          <View className="flex-row items-center justify-center space-x-2 mb-3 gap-2">
            <LinearGradient
              colors={['#FFD600', '#00C853']}
              className="w-10 h-10 rounded-xl items-center justify-center"
            >
              <Gift size={20} color="white" />
            </LinearGradient>
            <Text className="text-3xl font-bold text-white">Spin & Win!</Text>
          </View>
          <Text className="text-[#9CA3AF]">Try your luck for amazing rewards</Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(200)} className="relative mb-8 z-10 items-center justify-center">
          <View className="absolute -top-4 z-20 items-center">
            <View className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[30px] border-t-[#FFD600]" />
          </View>

          <Animated.View style={animatedStyle} className="w-80 h-80 bg-[#1A1D24] rounded-full border-4 border-white/10 items-center justify-center overflow-hidden">
            <Svg viewBox="0 0 200 200" width="100%" height="100%">
              {rewards.map((reward, index) => {
                const angle = (360 / rewards.length) * index;
                const nextAngle = (360 / rewards.length) * (index + 1);

                const x1 = 100 + 100 * Math.cos((angle * Math.PI) / 180);
                const y1 = 100 + 100 * Math.sin((angle * Math.PI) / 180);
                const x2 = 100 + 100 * Math.cos((nextAngle * Math.PI) / 180);
                const y2 = 100 + 100 * Math.sin((nextAngle * Math.PI) / 180);

                const textAngle = angle + 360 / rewards.length / 2;
                const textX = 100 + 65 * Math.cos((textAngle * Math.PI) / 180);
                const textY = 100 + 65 * Math.sin((textAngle * Math.PI) / 180);

                return (
                  <G key={index}>
                    <Path
                      d={`M 100 100 L ${x1} ${y1} A 100 100 0 0 1 ${x2} ${y2} Z`}
                      fill={reward.color}
                      stroke="#0F1115"
                      strokeWidth="1"
                    />
                    <SvgText
                      x={textX}
                      y={textY + 6}
                      fill="white"
                      fontSize="18"
                      textAnchor="middle"
                      transform={`rotate(${textAngle + 90}, ${textX}, ${textY})`}
                    >
                      {reward.icon}
                    </SvgText>
                  </G>
                );
              })}
              <Circle cx="100" cy="100" r="20" fill="#1A1D24" stroke="#5B8DEF" strokeWidth="3" />
            </Svg>
          </Animated.View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(300)}>
          <TouchableOpacity
            onPress={handleSpin}
            disabled={isSpinning}
            className={`rounded-2xl overflow-hidden ${isSpinning ? 'opacity-50' : 'opacity-100'}`}
          >
            <LinearGradient
              colors={['#FFD600', '#00C853']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              className="px-12 py-4"
            >
              <Text className="text-white font-bold text-lg">{isSpinning ? 'Spinning...' : 'SPIN NOW'}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(400)} className="mt-8 items-center relative z-10 w-full max-w-sm">
          <View className="bg-[#1A1D24] border border-white/10 rounded-2xl p-4 w-full">
            <View className="flex-row items-center justify-center space-x-2 mb-3 gap-2">
              <Sparkles size={16} color="#FFD600" />
              <Text className="text-white text-sm font-semibold">Available Rewards</Text>
            </View>
            <View className="flex-row flex-wrap justify-between w-full">
              {rewards.map((reward, index) => (
                <View key={index} className="bg-[#0F1115] rounded-xl p-2 items-center w-[23%] mb-2">
                  <Text className="text-lg mb-1">{reward.icon}</Text>
                  <Text className="text-white font-medium text-center" style={{ fontSize: 8 }}>
                    {reward.label}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </Animated.View>
      </ScrollView>

      {showReward && wonReward && (
        <View className="absolute inset-0 bg-black/80 z-40 items-center justify-center p-6">
          <Animated.View entering={ZoomIn.duration(400)} className="bg-[#1A1D24] border-2 border-[#FFD600] rounded-3xl p-8 max-w-sm w-full items-center relative overflow-hidden">
            <LinearGradient
              colors={['rgba(255, 214, 0, 0.2)', 'transparent']}
              className="absolute inset-0"
            />
            
            <View className="relative items-center">
              <Text className="text-6xl mb-4">{wonReward.icon}</Text>
              
              <Text className="text-3xl font-bold text-white mb-2">Congratulations!</Text>
              <Text className="text-[#9CA3AF] mb-6">You won</Text>

              <LinearGradient
                colors={['#FFD600', '#00C853']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                className="rounded-2xl p-4 mb-6 w-full items-center"
              >
                <Text className="text-2xl font-bold text-white">{wonReward.label}</Text>
              </LinearGradient>

              <TouchableOpacity
                onPress={() => {
                  setShowReward(false);
                  router.back();
                }}
                className="w-full rounded-2xl overflow-hidden"
              >
                <LinearGradient
                  colors={['#5B8DEF', '#7C4DFF']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  className="py-4 items-center"
                >
                  <Text className="text-white font-semibold">Claim Reward</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      )}
    </View>
  );
}
