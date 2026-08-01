/**
 * PvtAgentApp.jsx
 *
 * Embeds the full pvt-agent BECOME growth curator application
 * inside a MemoryRouter so it runs as a self-contained sub-app
 * after "Start Your Journey" is clicked on the landing page.
 *
 * Accepts an optional `onBackToHome` prop so the user can
 * return to the landing page at any time.
 */

import React, { createContext, useContext } from 'react'
import { MemoryRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { AppProvider, useApp } from './store/AppContext.jsx'
import Navigation from './components/Navigation.jsx'
import OnboardingPage from './pages/OnboardingPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import SessionPage from './pages/SessionPage.jsx'
import JourneyPage from './pages/JourneyPage.jsx'

import './pvt-agent-styles.css'

// Context so any child can call back to the landing page
export const BackToHomeContext = createContext(() => {})
export const useBackToHome = () => useContext(BackToHomeContext)

// ─────────────────────────────────────────────────
// Protected layout: sidebar nav + page content
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
  const { hasProfile, isLoaded } = useApp()
  if (!isLoaded) return null

  return (
    <Routes>
      <Route
        path="/onboarding"
        element={hasProfile ? <Navigate to="/dashboard" replace /> : <OnboardingPage />}
      />
      <Route path="/*" element={<ProtectedLayout />} />
    </Routes>
  )
}

// ─────────────────────────────────────────────────
// Root export — wrapped in MemoryRouter + AppProvider
// ─────────────────────────────────────────────────
export default function PvtAgentApp({ onBackToHome }) {
  return (
    <BackToHomeContext.Provider value={onBackToHome || (() => {})}>
      <motion.div
        className="pvt-agent-root"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <AppProvider>
          <MemoryRouter initialEntries={['/onboarding']} initialIndex={0}>
            <AppRoutes />
          </MemoryRouter>
        </AppProvider>
      </motion.div>
    </BackToHomeContext.Provider>
  )
}
