import { Tabs } from 'expo-router';
import { Home, Target, TrendingUp, Trophy, Sparkles } from 'lucide-react-native';
import { View } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#1A1D24',
          borderTopColor: '#2A2D34',
          borderTopWidth: 1,
          height: 85,
          paddingBottom: 25,
          paddingTop: 12,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
        },
        tabBarActiveTintColor: '#5B8DEF',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <View className={focused ? 'bg-[#5B8DEF]/20 p-2 rounded-2xl' : ''}>
              <Home size={22} color={color} strokeWidth={focused ? 2.5 : 2} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="challenges"
        options={{
          title: 'Challenges',
          tabBarIcon: ({ color, focused }) => (
            <View className={focused ? 'bg-[#5B8DEF]/20 p-2 rounded-2xl' : ''}>
              <Target size={22} color={color} strokeWidth={focused ? 2.5 : 2} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="insights"
        options={{
          title: 'Insights',
          tabBarIcon: ({ color, focused }) => (
            <View className={focused ? 'bg-[#5B8DEF]/20 p-2 rounded-2xl' : ''}>
              <TrendingUp size={22} color={color} strokeWidth={focused ? 2.5 : 2} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="projection"
        options={{
          title: 'Future',
          tabBarIcon: ({ color, focused }) => (
            <View className={focused ? 'bg-[#5B8DEF]/20 p-2 rounded-2xl' : ''}>
              <Sparkles size={22} color={color} strokeWidth={focused ? 2.5 : 2} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="leaderboard"
        options={{
          title: 'Leaderboard',
          tabBarIcon: ({ color, focused }) => (
            <View className={focused ? 'bg-[#5B8DEF]/20 p-2 rounded-2xl' : ''}>
              <Trophy size={22} color={color} strokeWidth={focused ? 2.5 : 2} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
