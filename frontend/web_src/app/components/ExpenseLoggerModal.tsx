import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Coffee, Car, Home, Smartphone, Heart } from 'lucide-react';

const categories = [
  { icon: ShoppingBag, label: 'Shopping', color: 'from-[#7C4DFF] to-[#FF5252]' },
  { icon: Coffee, label: 'Food', color: 'from-[#FFD600] to-[#00C853]' },
  { icon: Car, label: 'Transport', color: 'from-[#5B8DEF] to-[#7C4DFF]' },
  { icon: Home, label: 'Bills', color: 'from-[#FF5252] to-[#FFD600]' },
  { icon: Smartphone, label: 'Tech', color: 'from-[#00C853] to-[#5B8DEF]' },
  { icon: Heart, label: 'Health', color: 'from-[#FF5252] to-[#7C4DFF]' },
];

export default function ExpenseLoggerModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [amount, setAmount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSave = () => {
    onClose();
    setAmount('');
    setSelectedCategory(null);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed bottom-0 left-0 right-0 bg-gradient-to-br from-[#1A1D24] to-[#0F1115] border-t border-white/10 rounded-t-3xl p-6 z-50 max-w-md mx-auto"
            style={{ maxHeight: '80vh' }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Add Expense</h2>
              <button
                onClick={onClose}
                className="w-10 h-10 bg-[#2A2D34] rounded-xl flex items-center justify-center hover:bg-[#3A3D44] transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-[#9CA3AF] text-sm mb-2 block">Amount (RM)</label>
                <div className="relative">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-[#0F1115] border border-[#2A2D34] rounded-2xl px-4 py-4 text-white text-2xl font-bold focus:border-[#5B8DEF] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-[#9CA3AF] text-sm mb-3 block">Category</label>
                <div className="grid grid-cols-3 gap-3">
                  {categories.map((category) => {
                    const Icon = category.icon;
                    const isSelected = selectedCategory === category.label;
                    return (
                      <button
                        key={category.label}
                        onClick={() => setSelectedCategory(category.label)}
                        className={`relative p-4 rounded-2xl border-2 transition-all ${
                          isSelected
                            ? 'border-[#5B8DEF] bg-[#5B8DEF]/10'
                            : 'border-[#2A2D34] bg-[#0F1115] hover:border-[#5B8DEF]/50'
                        }`}
                      >
                        <div className={`w-10 h-10 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center mx-auto mb-2`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-white text-xs font-medium text-center">{category.label}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="text-[#9CA3AF] text-sm mb-2 block">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-[#0F1115] border border-[#2A2D34] rounded-2xl px-4 py-3 text-white focus:border-[#5B8DEF] focus:outline-none transition-colors"
                />
              </div>

              <button
                onClick={handleSave}
                disabled={!amount || !selectedCategory}
                className="w-full bg-gradient-to-r from-[#5B8DEF] to-[#7C4DFF] text-white py-4 rounded-2xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-shadow"
              >
                Save Expense
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
