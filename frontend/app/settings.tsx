import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { User, Bell, Lock, Moon, LogOut, ChevronRight, Sparkles } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function SettingsScreen() {
  const router = useRouter();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  return (
    <SafeAreaView className="flex-1 bg-[#0F1115]">
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }} className="flex-1">
        <View className="p-6 space-y-6 gap-6 pt-12">
          <View>
            <Text className="text-2xl font-bold text-white mb-1">Settings</Text>
            <Text className="text-[#9CA3AF] text-sm">Manage your account and preferences</Text>
          </View>

          <Animated.View
            entering={FadeInDown.delay(100)}
            className="bg-[#1A1D24] border border-[#2A2D34] rounded-[32px] p-8 relative overflow-hidden shadow-xl"
          >
            <View className="relative flex-row items-center gap-6">
              <View className="w-24 h-24 rounded-[32px] bg-[#0F1115] items-center justify-center border-2 border-[#5B8DEF]/20 shadow-inner">
                <Text className="text-4xl">🎯</Text>
              </View>
              <View className="flex-1">
                <Text className="text-2xl font-black text-white mb-1 tracking-tight">Amir</Text>
                <Text className="text-[#9CA3AF] text-sm font-bold mb-3">amir@university.edu.my</Text>
                <View className="flex-row items-center">
                  <View className="flex-row items-center bg-[#FFD600]/10 border border-[#FFD600]/20 rounded-full px-4 py-1.5 gap-2">
                    <Sparkles size={14} color="#FFD600" />
                    <Text className="text-[#FFD600] text-[10px] font-black uppercase tracking-wider">The Future Builder</Text>
                  </View>
                </View>
              </View>
            </View>

            <View className="relative flex-row gap-4 mt-8">
              <View className="flex-1 bg-[#0F1115] rounded-[24px] p-4 items-center border border-[#2A2D34]">
                <Text className="text-2xl font-black text-white mb-0.5">2,247</Text>
                <Text className="text-[#9CA3AF] text-[10px] font-black uppercase tracking-widest">Total XP</Text>
              </View>
              <View className="flex-1 bg-[#0F1115] rounded-[24px] p-4 items-center border border-[#2A2D34]">
                <Text className="text-2xl font-black text-white mb-0.5">7</Text>
                <Text className="text-[#9CA3AF] text-[10px] font-black uppercase tracking-widest">Streak</Text>
              </View>
              <View className="flex-1 bg-[#0F1115] rounded-[24px] p-4 items-center border border-[#2A2D34]">
                <Text className="text-2xl font-black text-white mb-0.5">12</Text>
                <Text className="text-[#9CA3AF] text-[10px] font-black uppercase tracking-widest">Badges</Text>
              </View>
            </View>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(200)}>
            <Text className="text-white font-bold mb-4 px-2 text-xl tracking-tight">Preferences</Text>
            <View className="bg-[#1A1D24] border border-[#2A2D34] rounded-[32px] overflow-hidden shadow-lg">
              <View className="w-full flex-row items-center justify-between p-5 border-b border-[#2A2D34]">
                <View className="flex-row items-center gap-4">
                  <View className="w-12 h-12 rounded-2xl bg-[#5B8DEF]/10 items-center justify-center">
                    <Bell size={22} color="#5B8DEF" />
                  </View>
                  <Text className="text-white font-bold text-base">Notifications</Text>
                </View>
                <Switch
                  value={notifications}
                  onValueChange={setNotifications}
                  trackColor={{ false: '#0F1115', true: '#5B8DEF' }}
                  thumbColor="#ffffff"
                />
              </View>

              <View className="w-full flex-row items-center justify-between p-5">
                <View className="flex-row items-center gap-4">
                  <View className="w-12 h-12 rounded-2xl bg-[#7C4DFF]/10 items-center justify-center">
                    <Moon size={22} color="#7C4DFF" />
                  </View>
                  <Text className="text-white font-bold text-base">Dark Mode</Text>
                </View>
                <Switch
                  value={darkMode}
                  onValueChange={setDarkMode}
                  trackColor={{ false: '#0F1115', true: '#5B8DEF' }}
                  thumbColor="#ffffff"
                />
              </View>
            </View>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(300)}>
            <Text className="text-white font-bold mb-4 px-2 text-xl tracking-tight">Account</Text>
            <View className="bg-[#1A1D24] border border-[#2A2D34] rounded-[32px] overflow-hidden shadow-lg">
              <TouchableOpacity className="w-full flex-row items-center justify-between p-5 border-b border-[#2A2D34]">
                <View className="flex-row items-center gap-4">
                  <View className="w-12 h-12 rounded-2xl bg-[#00C853]/10 items-center justify-center">
                    <User size={22} color="#00C853" />
                  </View>
                  <Text className="text-white font-bold text-base">Edit Profile</Text>
                </View>
                <ChevronRight size={20} color="#4B5563" />
              </TouchableOpacity>

              <TouchableOpacity className="w-full flex-row items-center justify-between p-5">
                <View className="flex-row items-center gap-4">
                  <View className="w-12 h-12 rounded-2xl bg-[#FFD600]/10 items-center justify-center">
                    <Lock size={22} color="#FFD600" />
                  </View>
                  <Text className="text-white font-bold text-base">Privacy & Security</Text>
                </View>
                <ChevronRight size={20} color="#4B5563" />
              </TouchableOpacity>
            </View>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(500)}>
            <TouchableOpacity className="w-full bg-[#FF5252]/5 border border-[#FF5252]/20 py-5 rounded-[24px] flex-row items-center justify-center gap-3 mb-8 shadow-sm">
              <LogOut size={22} color="#FF5252" />
              <Text className="text-[#FF5252] font-black text-lg uppercase tracking-widest">Log Out</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
