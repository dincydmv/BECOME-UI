/**
 * App.jsx — Router & layout container
 */

import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { AppProvider, useApp } from './store/AppContext.jsx'
import Navigation from './components/Navigation.jsx'
import OnboardingPage from './pages/OnboardingPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import SessionPage from './pages/SessionPage.jsx'
import JourneyPage from './pages/JourneyPage.jsx'

function ProtectedRoutes() {
  const { hasProfile, isLoaded } = useApp()
  const location = useLocation()

  if (!isLoaded) return null

  if (!hasProfile) {
    return <Navigate to="/onboarding" replace />
  }

  return (
    <div className="page-layout gradient-mesh">
      <Navigation />
      <main className="main-content">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/session" element={<SessionPage />} />
            <Route path="/journey" element={<JourneyPage />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  )
}

function AppRoutes() {
  const { hasProfile, isLoaded } = useApp()

  if (!isLoaded) return null

  return (
    <Routes>
      <Route
        path="/onboarding"
        element={hasProfile ? <Navigate to="/dashboard" replace /> : <OnboardingPage />}
      />
      <Route path="/*" element={<ProtectedRoutes />} />
    </Routes>
  )
}

export default function App() {
  return (
    <AppProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AppProvider>
  )
}
