import { useState } from 'react';
import { motion } from 'motion/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceDot } from 'recharts';
import { TrendingUp, Sparkles } from 'lucide-react';
import * as Slider from '@radix-ui/react-slider';
import TopBar from './TopBar';

const generateProjectionData = (savingsRate: number) => {
  const currentAge = 22;
  const data = [];

  for (let age = currentAge; age <= 65; age += 5) {
    const yearsSaving = age - currentAge;
    const currentTrajectory = yearsSaving * 1200;
    const improvedTrajectory = yearsSaving * (1200 + savingsRate * 50);
    data.push({
      age,
      current: Math.round(currentTrajectory),
      improved: Math.round(improvedTrajectory),
    });
  }

  return data;
};

const milestones = [
  { age: 25, label: 'Emergency Fund', amount: 5000, icon: '🛡️' },
  { age: 30, label: 'ASB Goal', amount: 20000, icon: '💰' },
  { age: 40, label: 'House Deposit', amount: 50000, icon: '🏠' },
  { age: 60, label: 'Retirement', amount: 150000, icon: '🌴' },
];

export default function FutureProjectionScreen({
  onOpenSettings,
  onOpenWrapped
}: {
  onOpenSettings?: () => void;
  onOpenWrapped?: () => void;
}) {
  const [savingsRate, setSavingsRate] = useState(10);
  const [targetAge, setTargetAge] = useState(30);

  const projectionData = generateProjectionData(savingsRate);
  const improvedValue = projectionData.find((d) => d.age === targetAge)?.improved || 0;
  const currentValue = projectionData.find((d) => d.age === targetAge)?.current || 0;
  const difference = improvedValue - currentValue;

  return (
    <div className="h-full w-full bg-gradient-to-br from-[#0F1115] via-[#1a1d24] to-[#5B8DEF]/10 flex flex-col overflow-hidden">
      {onOpenSettings && onOpenWrapped && (
        <TopBar onSettingsClick={onOpenSettings} onWrappedClick={onOpenWrapped} />
      )}
      <div className="flex-1 overflow-y-auto pb-24">
        <div className="px-6 space-y-6">

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-[#1A1D24] to-[#2A2D34] border border-white/10 rounded-3xl p-6 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#5B8DEF]/20 to-transparent rounded-full blur-3xl" />

            <div className="relative mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[#9CA3AF] text-sm">Projection to age {targetAge}</span>
                <div className="flex items-center space-x-1 bg-gradient-to-r from-[#5B8DEF]/20 to-[#7C4DFF]/20 border border-[#5B8DEF]/30 rounded-full px-3 py-1">
                  <Sparkles className="w-3 h-3 text-[#FFD600]" />
                  <span className="text-[#FFD600] text-xs font-semibold">AI Powered</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-[#0F1115]/50 rounded-2xl p-4">
                  <div className="text-[#9CA3AF] text-xs mb-1">Current Trajectory</div>
                  <div className="text-2xl font-bold text-white">RM {currentValue.toLocaleString()}</div>
                </div>
                <div className="bg-gradient-to-br from-[#00C853]/20 to-[#5B8DEF]/20 border border-[#00C853]/30 rounded-2xl p-4">
                  <div className="text-[#9CA3AF] text-xs mb-1">Improved Trajectory</div>
                  <div className="text-2xl font-bold text-[#00C853]">RM {improvedValue.toLocaleString()}</div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-[#5B8DEF]/10 to-[#00C853]/10 border border-[#00C853]/30 rounded-xl p-3 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-[#9CA3AF] text-sm">Potential Gain</span>
                  <span className="text-[#00C853] font-bold">+RM {difference.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="relative h-64 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={projectionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2A2D34" />
                  <XAxis
                    dataKey="age"
                    stroke="#9CA3AF"
                    style={{ fontSize: '12px' }}
                    label={{ value: 'Age', position: 'insideBottom', offset: -5, fill: '#9CA3AF' }}
                  />
                  <YAxis
                    stroke="#9CA3AF"
                    style={{ fontSize: '12px' }}
                    tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1A1D24',
                      border: '1px solid #5B8DEF',
                      borderRadius: '12px',
                      color: '#fff',
                    }}
                    formatter={(value: number) => `RM ${value.toLocaleString()}`}
                  />
                  <Line
                    type="monotone"
                    dataKey="current"
                    stroke="#9CA3AF"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="improved"
                    stroke="url(#futureGradient)"
                    strokeWidth={3}
                    dot={{ fill: '#00C853', r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <defs>
                    <linearGradient id="futureGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#5B8DEF" />
                      <stop offset="50%" stopColor="#7C4DFF" />
                      <stop offset="100%" stopColor="#00C853" />
                    </linearGradient>
                  </defs>
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="flex items-center space-x-3 text-xs mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-0.5 bg-[#9CA3AF] border-dashed" />
                <span className="text-[#9CA3AF]">Current Path</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-0.5 bg-gradient-to-r from-[#5B8DEF] to-[#00C853]" />
                <span className="text-white">Improved Path</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-[#1A1D24] to-[#2A2D34] border border-white/10 rounded-2xl p-5"
          >
            <label className="text-white text-sm font-semibold mb-3 block">
              Target Age: <span className="text-[#5B8DEF]">{targetAge} years</span>
            </label>
            <Slider.Root
              className="relative flex items-center select-none touch-none w-full h-5"
              value={[targetAge]}
              onValueChange={(value) => setTargetAge(value[0])}
              min={25}
              max={65}
              step={5}
            >
              <Slider.Track className="bg-[#2A2D34] relative grow rounded-full h-2">
                <Slider.Range className="absolute bg-gradient-to-r from-[#5B8DEF] to-[#7C4DFF] rounded-full h-full" />
              </Slider.Track>
              <Slider.Thumb className="block w-5 h-5 bg-white rounded-full shadow-lg hover:bg-[#5B8DEF] focus:outline-none focus:ring-2 focus:ring-[#5B8DEF]" />
            </Slider.Root>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-[#1A1D24] to-[#2A2D34] border border-white/10 rounded-2xl p-5"
          >
            <label className="text-white text-sm font-semibold mb-3 block">
              Monthly Savings Boost: <span className="text-[#00C853]">+RM {savingsRate * 50}</span>
            </label>
            <Slider.Root
              className="relative flex items-center select-none touch-none w-full h-5"
              value={[savingsRate]}
              onValueChange={(value) => setSavingsRate(value[0])}
              min={0}
              max={20}
              step={1}
            >
              <Slider.Track className="bg-[#2A2D34] relative grow rounded-full h-2">
                <Slider.Range className="absolute bg-gradient-to-r from-[#00C853] to-[#FFD600] rounded-full h-full" />
              </Slider.Track>
              <Slider.Thumb className="block w-5 h-5 bg-white rounded-full shadow-lg hover:bg-[#00C853] focus:outline-none focus:ring-2 focus:ring-[#00C853]" />
            </Slider.Root>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-white font-semibold mb-3">Financial Milestones</h3>
            <div className="space-y-3">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-[#1A1D24] to-[#2A2D34] border border-white/10 rounded-2xl p-4 flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{milestone.icon}</div>
                    <div>
                      <div className="text-white font-medium">{milestone.label}</div>
                      <div className="text-[#9CA3AF] text-sm">Age {milestone.age}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-semibold">RM {milestone.amount.toLocaleString()}</div>
                    {improvedValue >= milestone.amount && targetAge >= milestone.age && (
                      <div className="text-[#00C853] text-xs">✓ Achievable</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
