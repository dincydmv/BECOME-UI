import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CuratorSection from './components/CuratorSection';
import DashboardMockup from './components/DashboardMockup';
import DashboardView from './components/DashboardView';
import IdentityTimeline from './components/IdentityTimeline';
import PersonalAITeam from './components/PersonalAITeam';
import ReasoningEngine from './components/ReasoningEngine';
import HowItWorks from './components/HowItWorks';
import PricingSection from './components/PricingSection';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import OnboardingModal from './components/OnboardingModal';
import VideoDemoModal from './components/VideoDemoModal';

export default function App() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing' | 'dashboard'
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  const handleOpenDashboard = () => {
    setCurrentView('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setCurrentView('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (currentView === 'dashboard') {
    return <DashboardView onBackToHome={handleBackToHome} />;
  }

  return (
    <div className="min-h-screen bg-[#F6F4EF] text-[#111111] font-sans relative selection:bg-black selection:text-white">
      {/* Paper Dither Noise Texture Overlay */}
      <div className="paper-grain" />

      {/* Main Sticky Navbar */}
      <Navbar
        onOpenModal={handleOpenDashboard}
        onOpenDashboard={handleOpenDashboard}
      />

      {/* Hero Section with Artwork */}
      <Hero
        onOpenModal={handleOpenDashboard}
        onOpenDemo={() => setIsDemoOpen(true)}
      />

      {/* Section 2: Meet Your AI Growth Curator */}
      <CuratorSection />

      {/* Section 3: Your Daily Growth Dashboard */}
      <DashboardMockup />

      {/* Section 4: Built Around Your Future Identity */}
      <IdentityTimeline />

      {/* Section 5: Your Personal AI Team */}
      <PersonalAITeam />

      {/* Section 6: Why Today's Recommendation? */}
      <ReasoningEngine />

      {/* Section 7: How It Works */}
      <HowItWorks onOpenModal={handleOpenDashboard} />

      {/* Pricing Section */}
      <PricingSection onOpenModal={handleOpenDashboard} />

      {/* Final CTA */}
      <FinalCTA onOpenModal={handleOpenDashboard} />

      {/* Footer */}
      <Footer onOpenModal={handleOpenDashboard} />

      {/* Interactive Modals */}
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
