import { View, Text, TouchableOpacity } from 'react-native';
import { Bell, Settings, Sparkles } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface TopBarProps {
  userName?: string;
  greeting?: string;
  onSettingsClick: () => void;
  onWrappedClick: () => void;
}

export default function TopBar({
  userName = 'Amir',
  greeting = 'Good Evening',
  onSettingsClick,
  onWrappedClick
}: TopBarProps) {
  const insets = useSafeAreaInsets();
  return (
    <View className="flex-row items-center justify-between px-6 pb-4" style={{ paddingTop: insets.top + 12 }}>
      <View>
        <Text className="text-[#9CA3AF] text-sm font-medium">{greeting}</Text>
        <Text className="text-3xl font-bold text-white tracking-tight">{userName}</Text>
      </View>
      <View className="flex-row items-center space-x-2 gap-2">
        <TouchableOpacity
          onPress={onWrappedClick}
          className="w-12 h-12 bg-[#1A1D24] border border-[#7C4DFF]/50 rounded-2xl items-center justify-center shadow-lg"
        >
          <Sparkles size={22} color="#A78BFA" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onSettingsClick}
          className="w-12 h-12 bg-[#1A1D24] border border-[#374151] rounded-2xl items-center justify-center shadow-lg"
        >
          <Settings size={22} color="white" />
        </TouchableOpacity>
        <TouchableOpacity className="w-12 h-12 bg-[#1A1D24] border border-[#374151] rounded-2xl items-center justify-center relative shadow-lg">
          <Bell size={22} color="white" />
          <View className="absolute top-3.5 right-3.5 w-2.5 h-2.5 bg-[#FF5252] rounded-full border-2 border-[#1A1D24]" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
