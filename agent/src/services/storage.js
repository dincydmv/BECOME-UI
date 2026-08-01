/**
 * storage.js — localStorage abstraction for BECOME
 * Replaces Supabase in the local-only build.
 * All data is namespaced under "become_" prefix.
 */

const NS = 'become_'

const get = (key, fallback = null) => {
  try {
    const raw = localStorage.getItem(NS + key)
    return raw ? JSON.parse(raw) : fallback
  } catch { return fallback }
}

const set = (key, value) => {
  try { localStorage.setItem(NS + key, JSON.stringify(value)) }
  catch (e) { console.error('Storage write failed', e) }
}

const remove = (key) => localStorage.removeItem(NS + key)

// ===== USER PROFILE =====
export const getProfile = () => get('profile', null)
export const setProfile = (profile) => set('profile', { ...profile, updatedAt: Date.now() })
export const hasProfile = () => !!get('profile', null)

// ===== GROWTH STATE =====
const DEFAULT_GROWTH_STATE = {
  trustScore: 50,
  momentum: 'medium',     // low | medium | high
  consistency: 0,         // completion streak
  identityStage: 'early', // early | mid | advanced
  lastIntervention: null, // LEARN | REFLECT | ACT | CONNECT
  sessionCount: 0,
  completedCount: 0,
  skippedCount: 0,
}

export const getGrowthState = () => get('growthState', DEFAULT_GROWTH_STATE)

export const updateGrowthState = (updates) => {
  const current = getGrowthState()
  const next = { ...current, ...updates, updatedAt: Date.now() }

  // Auto-advance identity stage
  if (next.completedCount >= 15 && next.identityStage === 'early') {
    next.identityStage = 'mid'
  } else if (next.completedCount >= 35 && next.identityStage === 'mid') {
    next.identityStage = 'advanced'
  }

  // Auto-adjust momentum
  if (next.consistency >= 5) next.momentum = 'high'
  else if (next.consistency >= 2) next.momentum = 'medium'
  else next.momentum = 'low'

  set('growthState', next)
  return next
}

// ===== RECOMMENDATIONS HISTORY =====
export const getRecommendationHistory = () => get('recommendations', [])

export const logRecommendation = (rec, status, feedback = null) => {
  const history = getRecommendationHistory()
  history.unshift({
    ...rec,
    status,       // 'completed' | 'skipped' | 'pending'
    feedback,
    loggedAt: Date.now(),
  })
  // Keep last 100 entries
  set('recommendations', history.slice(0, 100))
}

export const getCompletedIds = () => {
  return getRecommendationHistory()
    .filter(r => r.status === 'completed')
    .map(r => r.id)
}

// ===== SESSION LOG =====
export const getSessions = () => get('sessions', [])

export const startSession = (interventionType) => {
  const session = {
    id: Date.now().toString(),
    interventionType,
    startedAt: Date.now(),
    endedAt: null,
    recommendations: [],
    completed: 0,
    skipped: 0,
  }
  const sessions = getSessions()
  sessions.unshift(session)
  set('sessions', sessions.slice(0, 50))
  set('activeSessionId', session.id)
  return session
}

export const endSession = () => {
  const sessionId = get('activeSessionId')
  const sessions = getSessions()
  const idx = sessions.findIndex(s => s.id === sessionId)
  if (idx !== -1) {
    sessions[idx].endedAt = Date.now()
    set('sessions', sessions)
  }
  remove('activeSessionId')
}

// ===== STREAK TRACKING =====
export const updateStreak = (completed) => {
  const state = getGrowthState()
  if (completed) {
    return updateGrowthState({
      consistency: state.consistency + 1,
      completedCount: state.completedCount + 1,
      trustScore: Math.min(100, state.trustScore + 7),
    })
  } else {
    return updateGrowthState({
      consistency: Math.max(0, state.consistency - 1),
      skippedCount: state.skippedCount + 1,
      trustScore: Math.max(0, state.trustScore - 5),
    })
  }
}

// ===== RESET (for dev / re-onboarding) =====
export const resetAll = () => {
  ['profile', 'growthState', 'recommendations', 'sessions', 'activeSessionId'].forEach(remove)
}
