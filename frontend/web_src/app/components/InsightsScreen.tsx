import { motion } from 'motion/react';
import { LineChart, Line, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingDown, Sparkles, Users } from 'lucide-react';
import TopBar from './TopBar';

const monthlyData = [
  { month: 'Jan', amount: 1200 },
  { month: 'Feb', amount: 1450 },
  { month: 'Mar', amount: 1100 },
  { month: 'Apr', amount: 1350 },
  { month: 'May', amount: 1247 },
];

const categoryData = [
  { name: 'Food', value: 450, color: '#FFD600' },
  { name: 'Transport', value: 280, color: '#5B8DEF' },
  { name: 'Shopping', value: 320, color: '#7C4DFF' },
  { name: 'Bills', value: 197, color: '#00C853' },
];

const peerComparisonData = [
  { category: 'You', amount: 1247 },
  { category: 'Avg Peer', amount: 1420 },
];
export default function InsightsScreen({
  onOpenSettings,
  onOpenWrapped
}: {
  onOpenSettings: () => void;
  onOpenWrapped: () => void;
}) {
  const totalSpending = categoryData.reduce((acc, item) => acc + item.value, 0);

  return (
    <div className="h-full w-full bg-[#0F1115] flex flex-col overflow-hidden">
      <TopBar onSettingsClick={onOpenSettings} onWrappedClick={onOpenWrapped} />
      <div className="flex-1 overflow-y-auto pb-24">
        <div className="px-6 space-y-6">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-[#7C4DFF]/20 to-[#5B8DEF]/20 border border-[#7C4DFF]/30 rounded-2xl p-5"
          >
            <div className="flex items-start space-x-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#7C4DFF] to-[#5B8DEF] rounded-xl flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">AI Analysis</h3>
                <p className="text-[#9CA3AF] text-sm leading-relaxed">
                  You overspend <span className="text-[#FF5252] font-semibold">42% more</span> during weekends. Try planning your purchases during weekdays to save more.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-[#1A1D24] to-[#2A2D34] border border-white/10 rounded-2xl p-5"
          >
            <h3 className="text-white font-semibold mb-4">Monthly Spending Trend</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2D34" />
                <XAxis dataKey="month" stroke="#9CA3AF" style={{ fontSize: '12px' }} />
                <YAxis stroke="#9CA3AF" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1A1D24',
                    border: '1px solid #5B8DEF',
                    borderRadius: '12px',
                    color: '#fff',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="url(#colorGradient)"
                  strokeWidth={3}
                  dot={{ fill: '#5B8DEF', r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#5B8DEF" />
                    <stop offset="100%" stopColor="#7C4DFF" />
                  </linearGradient>
                </defs>
              </LineChart>
            </ResponsiveContainer>
            <div className="flex items-center justify-center space-x-2 mt-3">
              <TrendingDown className="w-4 h-4 text-[#00C853]" />
              <span className="text-[#00C853] text-sm font-semibold">12% decrease from last month</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-[#1A1D24] to-[#2A2D34] border border-white/10 rounded-2xl p-5"
          >
            <h3 className="text-white font-semibold mb-4">Spending by Category</h3>
            <div className="flex items-center justify-center mb-4">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1A1D24',
                      border: '1px solid #5B8DEF',
                      borderRadius: '12px',
                      color: '#fff',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {categoryData.map((category, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }} />
                  <div className="flex-1">
                    <div className="text-white text-sm font-medium">{category.name}</div>
                    <div className="text-[#9CA3AF] text-xs">
                      RM {category.value} ({Math.round((category.value / totalSpending) * 100)}%)
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-[#1A1D24] to-[#2A2D34] border border-white/10 rounded-2xl p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold">Anonymous Peer Comparison</h3>
              <div className="flex items-center space-x-1 bg-[#5B8DEF]/10 border border-[#5B8DEF]/30 rounded-full px-2 py-1">
                <Users className="w-3 h-3 text-[#5B8DEF]" />
                <span className="text-[#5B8DEF] text-xs font-semibold">Private</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={150}>
              <BarChart data={peerComparisonData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2D34" />
                <XAxis dataKey="category" stroke="#9CA3AF" style={{ fontSize: '12px' }} />
                <YAxis stroke="#9CA3AF" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1A1D24',
                    border: '1px solid #5B8DEF',
                    borderRadius: '12px',
                    color: '#fff',
                  }}
                />
                <Bar dataKey="amount" fill="url(#barGradient)" radius={[8, 8, 0, 0]} />
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#5B8DEF" />
                    <stop offset="100%" stopColor="#7C4DFF" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-3 text-center">
              <p className="text-[#00C853] text-sm">
                You spend <span className="font-semibold">12% less</span> than your peers
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
