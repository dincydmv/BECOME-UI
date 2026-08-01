/**
 * AppContext.jsx — Global state management for BECOME
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import {
  getProfile, setProfile, hasProfile,
  getGrowthState, updateGrowthState,
  getRecommendationHistory, logRecommendation,
  getSessions, updateStreak, resetAll,
} from '../services/storage.js'

const AppContext = createContext(null)

export const AppProvider = ({ children }) => {
  const [profile, setProfileState] = useState(null)
  const [growthState, setGrowthStateLocal] = useState(null)
  const [history, setHistory] = useState([])
  const [sessions, setSessionsLocal] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load all state from localStorage on mount
  useEffect(() => {
    const p = getProfile()
    const g = getGrowthState()
    const h = getRecommendationHistory()
    const s = getSessions()
    setProfileState(p)
    setGrowthStateLocal(g)
    setHistory(h)
    setSessionsLocal(s)
    setIsLoaded(true)
  }, [])

  const saveProfile = useCallback((data) => {
    setProfile(data)
    setProfileState(data)
  }, [])

  const refreshGrowthState = useCallback(() => {
    const g = getGrowthState()
    setGrowthStateLocal(g)
    return g
  }, [])

  const completeRecommendation = useCallback((rec, feedback = null) => {
    logRecommendation(rec, 'completed', feedback)
    const next = updateStreak(true)
    setGrowthStateLocal(next)
    setHistory(getRecommendationHistory())
  }, [])

  const skipRecommendation = useCallback((rec, reason = null) => {
    logRecommendation(rec, 'skipped', reason)
    const next = updateStreak(false)
    setGrowthStateLocal(next)
    setHistory(getRecommendationHistory())
  }, [])

  const handleUpdateGrowthState = useCallback((updates) => {
    const next = updateGrowthState(updates)
    setGrowthStateLocal(next)
    return next
  }, [])

  const reset = useCallback(() => {
    resetAll()
    setProfileState(null)
    setGrowthStateLocal(getGrowthState())
    setHistory([])
    setSessionsLocal([])
  }, [])

  return (
    <AppContext.Provider value={{
      profile,
      growthState,
      history,
      sessions,
      isLoaded,
      hasProfile: hasProfile(),
      saveProfile,
      refreshGrowthState,
      completeRecommendation,
      skipRecommendation,
      updateGrowthState: handleUpdateGrowthState,
      reset,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside AppProvider')
  return ctx
}
