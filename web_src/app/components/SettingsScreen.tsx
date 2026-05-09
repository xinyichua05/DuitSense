import { motion } from 'motion/react';
import { User, Bell, Lock, Moon, LogOut, ChevronRight, Sparkles } from 'lucide-react';
import * as Switch from '@radix-ui/react-switch';
import { useState } from 'react';

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className="h-full w-full bg-[#0F1115] flex flex-col overflow-hidden pt-16">
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Settings</h1>
            <p className="text-[#9CA3AF] text-sm">Manage your account and preferences</p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-[#1A1D24] to-[#2A2D34] border border-white/10 rounded-3xl p-6 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#5B8DEF]/20 to-transparent rounded-full blur-2xl" />

            <div className="relative flex items-center space-x-4">
              <div className="w-20 h-20 bg-gradient-to-br from-[#5B8DEF] to-[#7C4DFF] rounded-2xl flex items-center justify-center text-3xl">
                🎯
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-white mb-1">Amir</h2>
                <p className="text-[#9CA3AF] text-sm mb-2">amir@university.edu.my</p>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1 bg-gradient-to-r from-[#FFD600]/20 to-[#00C853]/20 border border-[#FFD600]/30 rounded-full px-3 py-1">
                    <Sparkles className="w-3 h-3 text-[#FFD600]" />
                    <span className="text-[#FFD600] text-xs font-semibold">The Future Builder</span>
                  </div>
                </div>
              </div>
              <button className="text-[#5B8DEF] text-sm font-medium">Edit</button>
            </div>

            <div className="relative grid grid-cols-3 gap-3 mt-4">
              <div className="bg-[#0F1115]/50 rounded-xl p-3 text-center">
                <div className="text-2xl font-bold text-white mb-0.5">2,247</div>
                <div className="text-[#9CA3AF] text-xs">Total XP</div>
              </div>
              <div className="bg-[#0F1115]/50 rounded-xl p-3 text-center">
                <div className="text-2xl font-bold text-white mb-0.5">7</div>
                <div className="text-[#9CA3AF] text-xs">Streak</div>
              </div>
              <div className="bg-[#0F1115]/50 rounded-xl p-3 text-center">
                <div className="text-2xl font-bold text-white mb-0.5">12</div>
                <div className="text-[#9CA3AF] text-xs">Badges</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-white font-semibold mb-3 px-1">Preferences</h3>
            <div className="bg-gradient-to-br from-[#1A1D24] to-[#2A2D34] border border-white/10 rounded-2xl overflow-hidden">
              <button className="w-full flex items-center justify-between p-4 hover:bg-[#2A2D34]/50 transition-colors border-b border-white/10">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#5B8DEF]/20 to-[#7C4DFF]/20 rounded-xl flex items-center justify-center">
                    <Bell className="w-5 h-5 text-[#5B8DEF]" />
                  </div>
                  <span className="text-white font-medium">Notifications</span>
                </div>
                <Switch.Root
                  checked={notifications}
                  onCheckedChange={setNotifications}
                  className="w-11 h-6 bg-[#2A2D34] rounded-full relative data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[#5B8DEF] data-[state=checked]:to-[#7C4DFF] transition-colors"
                >
                  <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform duration-100 translate-x-0.5 data-[state=checked]:translate-x-[22px]" />
                </Switch.Root>
              </button>

              <button className="w-full flex items-center justify-between p-4 hover:bg-[#2A2D34]/50 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#7C4DFF]/20 to-[#5B8DEF]/20 rounded-xl flex items-center justify-center">
                    <Moon className="w-5 h-5 text-[#7C4DFF]" />
                  </div>
                  <span className="text-white font-medium">Dark Mode</span>
                </div>
                <Switch.Root
                  checked={darkMode}
                  onCheckedChange={setDarkMode}
                  className="w-11 h-6 bg-[#2A2D34] rounded-full relative data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[#5B8DEF] data-[state=checked]:to-[#7C4DFF] transition-colors"
                >
                  <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform duration-100 translate-x-0.5 data-[state=checked]:translate-x-[22px]" />
                </Switch.Root>
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-white font-semibold mb-3 px-1">Account</h3>
            <div className="bg-gradient-to-br from-[#1A1D24] to-[#2A2D34] border border-white/10 rounded-2xl overflow-hidden">
              <button className="w-full flex items-center justify-between p-4 hover:bg-[#2A2D34]/50 transition-colors border-b border-white/10">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#00C853]/20 to-[#FFD600]/20 rounded-xl flex items-center justify-center">
                    <User className="w-5 h-5 text-[#00C853]" />
                  </div>
                  <span className="text-white font-medium">Edit Profile</span>
                </div>
                <ChevronRight className="w-5 h-5 text-[#9CA3AF]" />
              </button>

              <button className="w-full flex items-center justify-between p-4 hover:bg-[#2A2D34]/50 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#FFD600]/20 to-[#FF5252]/20 rounded-xl flex items-center justify-center">
                    <Lock className="w-5 h-5 text-[#FFD600]" />
                  </div>
                  <span className="text-white font-medium">Privacy & Security</span>
                </div>
                <ChevronRight className="w-5 h-5 text-[#9CA3AF]" />
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-white font-semibold mb-3 px-1">About</h3>
            <div className="bg-gradient-to-br from-[#1A1D24] to-[#2A2D34] border border-white/10 rounded-2xl overflow-hidden">
              <button className="w-full flex items-center justify-between p-4 hover:bg-[#2A2D34]/50 transition-colors border-b border-white/10">
                <span className="text-white font-medium">Terms & Conditions</span>
                <ChevronRight className="w-5 h-5 text-[#9CA3AF]" />
              </button>

              <button className="w-full flex items-center justify-between p-4 hover:bg-[#2A2D34]/50 transition-colors border-b border-white/10">
                <span className="text-white font-medium">Privacy Policy</span>
                <ChevronRight className="w-5 h-5 text-[#9CA3AF]" />
              </button>

              <button className="w-full flex items-center justify-between p-4 hover:bg-[#2A2D34]/50 transition-colors">
                <span className="text-white font-medium">App Version</span>
                <span className="text-[#9CA3AF] text-sm">v1.0.0</span>
              </button>
            </div>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="w-full bg-gradient-to-br from-[#FF5252]/20 to-[#FF5252]/10 border border-[#FF5252]/30 text-[#FF5252] py-4 rounded-2xl font-semibold flex items-center justify-center space-x-2 hover:bg-[#FF5252]/30 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Log Out</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
