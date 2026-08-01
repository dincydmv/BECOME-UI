import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CuratorSection from './components/CuratorSection';
import DashboardMockup from './components/DashboardMockup';
import IdentityTimeline from './components/IdentityTimeline';
import PersonalAITeam from './components/PersonalAITeam';
import ReasoningEngine from './components/ReasoningEngine';
import HowItWorks from './components/HowItWorks';
import PricingSection from './components/PricingSection';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import OnboardingModal from './components/OnboardingModal';
import VideoDemoModal from './components/VideoDemoModal';

// pvt-agent — the full AI growth curator app
import PvtAgentApp from './PvtAgentApp.jsx';

export default function App() {
  const [currentView, setCurrentView] = useState('landing'); // Opens directly to the initial Landing page with Hero!
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  const handleOpenDashboard = () => {
    setCurrentView('agent');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setCurrentView('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // When agent view is active → render pvt-agent app
  if (currentView === 'agent') {
    return <PvtAgentApp onBackToHome={handleBackToHome} />;
  }

  // Render initial landing page with Hero section
  return (
    <div className="min-h-screen bg-[#F6F4EF] text-[#111111] font-sans relative selection:bg-black selection:text-white">
      <div className="paper-grain" />

      <Navbar
        onOpenModal={handleOpenDashboard}
        onOpenDashboard={handleOpenDashboard}
      />

      <Hero
        onOpenModal={handleOpenDashboard}
        onOpenDemo={() => setIsDemoOpen(true)}
      />

      <CuratorSection />
      <DashboardMockup />
      <IdentityTimeline />
      <PersonalAITeam />
      <ReasoningEngine />
      <HowItWorks onOpenModal={handleOpenDashboard} />
      <PricingSection onOpenModal={handleOpenDashboard} />
      <FinalCTA onOpenModal={handleOpenDashboard} />
      <Footer onOpenModal={handleOpenDashboard} />

      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
      />
      <VideoDemoModal
        isOpen={isDemoOpen}
        onClose={() => setIsDemoOpen(false)}
      />
    </div>
  );
}
