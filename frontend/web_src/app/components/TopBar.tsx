import { Bell, Settings, Sparkles } from 'lucide-react';

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
  return (
    <div className="flex items-center justify-between p-6 pb-4">
      <div>
        <p className="text-[#9CA3AF] text-sm">{greeting}</p>
        <h1 className="text-2xl font-bold text-white">{userName}</h1>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={onWrappedClick}
          className="w-12 h-12 bg-gradient-to-br from-[#1A1D24] to-[#2A2D34] border border-[#7C4DFF]/30 rounded-2xl flex items-center justify-center hover:bg-[#2A2D34] transition-colors"
        >
          <Sparkles className="w-5 h-5 text-[#7C4DFF]" />
        </button>
        <button
          onClick={onSettingsClick}
          className="w-12 h-12 bg-gradient-to-br from-[#1A1D24] to-[#2A2D34] border border-[#9CA3AF]/30 rounded-2xl flex items-center justify-center hover:bg-[#2A2D34] transition-colors"
        >
          <Settings className="w-5 h-5 text-white" />
        </button>
        <button className="w-12 h-12 bg-gradient-to-br from-[#1A1D24] to-[#2A2D34] border border-[#5B8DEF]/30 rounded-2xl flex items-center justify-center relative hover:bg-[#2A2D34] transition-colors">
          <Bell className="w-5 h-5 text-white" />
          <div className="absolute top-2 right-2 w-2 h-2 bg-[#FF5252] rounded-full" />
        </button>
      </div>
    </div>
  );
}
