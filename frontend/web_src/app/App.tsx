import { useState, useEffect } from 'react';
import SplashScreen from './components/SplashScreen';
import OnboardingScreen from './components/OnboardingScreen';
import PersonaQuizScreen from './components/PersonaQuizScreen';
import PersonaResultScreen from './components/PersonaResultScreen';
import HomeScreen from './components/HomeScreen';
import ExpenseLoggerModal from './components/ExpenseLoggerModal';
import ChallengesScreen from './components/ChallengesScreen';
import InsightsScreen from './components/InsightsScreen';
import FutureProjectionScreen from './components/FutureProjectionScreen';
import LeaderboardScreen from './components/LeaderboardScreen';
import SpinWheelScreen from './components/SpinWheelScreen';
import SettingsScreen from './components/SettingsScreen';
import FinancialWrappedScreen from './components/FinancialWrappedScreen';
import BottomNav from './components/BottomNav';

type AppFlow =
  | 'splash'
  | 'onboarding'
  | 'quiz'
  | 'result'
  | 'app'
  | 'wrapped'
  | 'settings';

type TabType = 'home' | 'challenges' | 'insights' | 'projection' | 'leaderboard';

export default function App() {
  const [flow, setFlow] = useState<AppFlow>('splash');
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [isSpinModalOpen, setIsSpinModalOpen] = useState(false);

  useEffect(() => {
    if (flow === 'splash') {
      const timer = setTimeout(() => {
        setFlow('onboarding');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [flow]);

  if (flow === 'splash') {
    return <SplashScreen />;
  }

  if (flow === 'onboarding') {
    return <OnboardingScreen onComplete={() => setFlow('quiz')} />;
  }

  if (flow === 'quiz') {
    return <PersonaQuizScreen onComplete={() => setFlow('result')} />;
  }

  if (flow === 'result') {
    return <PersonaResultScreen onContinue={() => setFlow('app')} />;
  }

  if (flow === 'wrapped') {
    return <FinancialWrappedScreen onClose={() => setFlow('app')} />;
  }

  if (flow === 'settings') {
    return (
      <div className="h-screen w-full bg-[#0F1115] flex flex-col overflow-hidden">
        <button
          onClick={() => setFlow('app')}
          className="fixed top-6 left-6 w-10 h-10 bg-[#1A1D24] border border-white/10 rounded-xl flex items-center justify-center hover:bg-[#2A2D34] transition-colors z-50 shadow-lg"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.5 15L7.5 10L12.5 5" stroke="#5B8DEF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <SettingsScreen />
      </div>
    );
  }

  const handleOpenSettings = () => setFlow('settings');
  const handleOpenWrapped = () => setFlow('wrapped');

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomeScreen
            onOpenExpense={() => setIsExpenseModalOpen(true)}
            onOpenSettings={handleOpenSettings}
            onOpenWrapped={handleOpenWrapped}
          />
        );
      case 'challenges':
        return (
          <ChallengesScreen
            onOpenSettings={handleOpenSettings}
            onOpenWrapped={handleOpenWrapped}
          />
        );
      case 'insights':
        return (
          <InsightsScreen
            onOpenSettings={handleOpenSettings}
            onOpenWrapped={handleOpenWrapped}
          />
        );
      case 'projection':
        return (
          <FutureProjectionScreen
            onOpenSettings={handleOpenSettings}
            onOpenWrapped={handleOpenWrapped}
          />
        );
      case 'leaderboard':
        return (
          <LeaderboardScreen
            onOpenSpin={() => setIsSpinModalOpen(true)}
            onOpenSettings={handleOpenSettings}
            onOpenWrapped={handleOpenWrapped}
          />
        );
      default:
        return (
          <HomeScreen
            onOpenExpense={() => setIsExpenseModalOpen(true)}
            onOpenSettings={handleOpenSettings}
            onOpenWrapped={handleOpenWrapped}
          />
        );
    }
  };

  return (
    <div className="size-full relative bg-[#0F1115]">
      {renderScreen()}

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

      <ExpenseLoggerModal
        isOpen={isExpenseModalOpen}
        onClose={() => setIsExpenseModalOpen(false)}
      />

      {isSpinModalOpen && (
        <SpinWheelScreen
          isOpen={isSpinModalOpen}
          onClose={() => setIsSpinModalOpen(false)}
        />
      )}
    </div>
  );
}
