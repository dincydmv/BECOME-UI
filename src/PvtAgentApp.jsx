/**
 * PvtAgentApp.jsx
 *
 * Systematic 3-Stage Application Sequence:
 * Stage 1: Main Hero Landing Page (handled in App.jsx)
 * Stage 2: Personalisation Onboarding (/onboarding)
 * Stage 3: Dashboard & AI Growth Curator (/dashboard)
 */

import React, { createContext, useContext } from 'react'
import { MemoryRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { AppProvider, useApp } from './store/AppContext.jsx'
import Navigation from './components/Navigation.jsx'
import OnboardingPage from './pages/OnboardingPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import SessionPage from './pages/SessionPage.jsx'
import JourneyPage from './pages/JourneyPage.jsx'

import './pvt-agent-styles.css'

// Context so any child component can call back to the main Hero Landing Page
export const BackToHomeContext = createContext(() => {})
export const useBackToHome = () => useContext(BackToHomeContext)

// ─────────────────────────────────────────────────
// Protected layout: sidebar navigation + main page content
// ─────────────────────────────────────────────────
function ProtectedLayout() {
  const { hasProfile, isLoaded } = useApp()
  const location = useLocation()

  if (!isLoaded) return null
  if (!hasProfile) return <Navigate to="/onboarding" replace />

  return (
    <div className="page-layout gradient-mesh">
      <Navigation />
      <main className="main-content">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/session"   element={<SessionPage />} />
            <Route path="/journey"   element={<JourneyPage />} />
            <Route path="*"          element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  )
}

// ─────────────────────────────────────────────────
// Router-aware app routes
// ─────────────────────────────────────────────────
function AppRoutes() {
  const { isLoaded } = useApp()
  if (!isLoaded) return null

  return (
    <Routes>
      <Route path="/onboarding" element={<OnboardingPage />} />
      <Route path="/*" element={<ProtectedLayout />} />
    </Routes>
  )
}

// ─────────────────────────────────────────────────
// Root export — wrapped in MemoryRouter + AppProvider
// ─────────────────────────────────────────────────
export default function PvtAgentApp({ onBackToHome, initialRoute = '/onboarding' }) {
  return (
    <BackToHomeContext.Provider value={onBackToHome || (() => {})}>
      <motion.div
        className="pvt-agent-root"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        <AppProvider>
          <MemoryRouter initialEntries={[initialRoute]} initialIndex={0}>
            <AppRoutes />
          </MemoryRouter>
        </AppProvider>
      </motion.div>
    </BackToHomeContext.Provider>
  )
}
