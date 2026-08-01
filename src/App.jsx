import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CuratorSection from './components/CuratorSection';
import DashboardMockup from './components/DashboardMockup';
import IdentityTimeline from './components/IdentityTimeline';
import PersonalAITeam from './components/PersonalAITeam';
import ReasoningEngine from './components/ReasoningEngine';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import PricingSection from './components/PricingSection';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import OnboardingModal from './components/OnboardingModal';
import VideoDemoModal from './components/VideoDemoModal';

export default function App() {
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F6F4EF] text-[#111111] font-sans relative selection:bg-black selection:text-white">
      {/* Paper Dither Noise Texture Overlay */}
      <div className="paper-grain" />

      {/* Main Sticky Navbar */}
      <Navbar onOpenModal={() => setIsOnboardingOpen(true)} />

      {/* Hero Section with Artwork */}
      <Hero
        onOpenModal={() => setIsOnboardingOpen(true)}
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
      <HowItWorks onOpenModal={() => setIsOnboardingOpen(true)} />

      {/* Section 8: Testimonials */}
      <Testimonials />

      {/* Pricing Section */}
      <PricingSection onOpenModal={() => setIsOnboardingOpen(true)} />

      {/* Final CTA */}
      <FinalCTA onOpenModal={() => setIsOnboardingOpen(true)} />

      {/* Footer */}
      <Footer onOpenModal={() => setIsOnboardingOpen(true)} />

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
