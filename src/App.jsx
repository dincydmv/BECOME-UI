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
  const [currentView, setCurrentView] = useState('landing'); // Initial Landing page with Hero
  const [initialAgentRoute, setInitialAgentRoute] = useState('/onboarding'); // Personalisation onboarding first
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  // Stage 1 -> Stage 2: Click "Start Your Journey" on Landing Page opens Personalisation Onboarding!
  const handleStartPersonalisation = () => {
    setInitialAgentRoute('/onboarding');
    setCurrentView('agent');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Direct open Dashboard (e.g. from nav link if profile exists)
  const handleOpenDashboard = () => {
    setInitialAgentRoute('/dashboard');
    setCurrentView('agent');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Return to Stage 1: Landing page with Hero
  const handleBackToHome = () => {
    setCurrentView('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // When agent view is active → render pvt-agent app starting at Personalisation or Dashboard
  if (currentView === 'agent') {
    return (
      <PvtAgentApp
        onBackToHome={handleBackToHome}
        initialRoute={initialAgentRoute}
      />
    );
  }

  // Stage 1: Render initial landing page with Hero section
  return (
    <div className="min-h-screen bg-[#F6F4EF] text-[#111111] font-sans relative selection:bg-black selection:text-white">
      <div className="paper-grain" />

      <Navbar
        onOpenModal={handleStartPersonalisation}
        onOpenDashboard={handleOpenDashboard}
      />

      <Hero
        onOpenModal={handleStartPersonalisation}
        onOpenDemo={() => setIsDemoOpen(true)}
      />

      <CuratorSection />
      <DashboardMockup />
      <IdentityTimeline />
      <PersonalAITeam />
      <ReasoningEngine />
      <HowItWorks onOpenModal={handleStartPersonalisation} />
      <PricingSection onOpenModal={handleStartPersonalisation} />
      <FinalCTA onOpenModal={handleStartPersonalisation} />
      <Footer onOpenModal={handleStartPersonalisation} />

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
