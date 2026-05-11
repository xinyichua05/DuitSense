import { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeIn, FadeInDown, withRepeat, withTiming, withSequence, useSharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Circle, Rect } from 'react-native-svg';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/onboarding');
    }, 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <LinearGradient
      colors={['#0F1115', '#1a1d24', 'rgba(91, 141, 239, 0.2)']}
      className="flex-1 items-center justify-center relative overflow-hidden"
    >
      <Animated.View entering={FadeIn.duration(600)} className="relative z-10 items-center">
        <View className="relative">
          <LinearGradient
            colors={['#5B8DEF', '#7C4DFF']}
            className="p-8 rounded-3xl"
          >
            <Svg width="80" height="80" viewBox="0 0 80 80" fill="none">
              <Path d="M40 10L50 30H30L40 10Z" fill="white" opacity={0.9} />
              <Circle cx="40" cy="50" r="20" fill="white" opacity={0.9} />
              <Rect x="35" y="35" width="10" height="30" rx="2" fill="#5B8DEF" />
            </Svg>
          </LinearGradient>
        </View>
      </Animated.View>

      <Animated.Text
        entering={FadeInDown.delay(300).duration(600)}
        className="mt-8 text-4xl font-bold text-white"
      >
        SpendWise AI
      </Animated.Text>

      <Animated.Text
        entering={FadeInDown.delay(500).duration(600)}
        className="mt-4 text-[#9CA3AF] text-lg text-center px-8"
      >
        Your Financial Future Starts Here
      </Animated.Text>

    </LinearGradient>
  );
}
