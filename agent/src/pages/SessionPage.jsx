/**
 * SessionPage.jsx — Curation session experience
 * Triggers the Growth Curator Agent's reasoning pipeline and renders recommendations.
 */

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, RefreshCw, CheckCircle, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../store/AppContext.jsx'
import { runGrowthAgent } from '../services/growthAgent.js'
import AgentThinking from '../components/AgentThinking.jsx'
import RecommendationCard from '../components/RecommendationCard.jsx'
import PageTransition from '../components/PageTransition.jsx'

export default function SessionPage() {
  const navigate = useNavigate()
  const { profile, growthState, completeRecommendation, skipRecommendation, refreshGrowthState } = useApp()

  const [loading, setLoading] = useState(true)
  const [sessionData, setSessionData] = useState(null)
  const [recs, setRecs] = useState([])
  const [completedCount, setCompletedCount] = useState(0)

  const loadSession = async () => {
    setLoading(true)
    setCompletedCount(0)
    try {
      const data = await runGrowthAgent(profile, growthState)
      setSessionData(data)
      setRecs(data.recommendations)
    } catch (e) {
      console.error('Failed to run agent', e)
    }
  }

  useEffect(() => {
    if (profile) loadSession()
  }, [])

  const handleComplete = (rec) => {
    completeRecommendation(rec)
    setRecs(prev => prev.filter(r => r.id !== rec.id))
    setCompletedCount(c => c + 1)
  }

  const handleSkip = (rec) => {
    skipRecommendation(rec)
    setRecs(prev => prev.filter(r => r.id !== rec.id))
  }

  if (loading && sessionData) {
    return (
      <PageTransition>
        <div className="page-inner">
          <AgentThinking
            steps={sessionData.reasoning.thinkingSteps}
            onComplete={() => setLoading(false)}
          />
        </div>
      </PageTransition>
    )
  }

  if (loading && !sessionData) {
    return (
      <PageTransition>
        <div className="page-inner" style={{ textAlign: 'center', paddingTop: 100 }}>
          <RefreshCw size={32} color="#10B981" className="animate-spin-slow" />
          <p style={{ marginTop: 16, color: 'rgba(255,255,255,0.5)' }}>Initializing Curator Agent...</p>
        </div>
      </PageTransition>
    )
  }

  const { reasoning } = sessionData

  return (
    <PageTransition>
      <div className="page-inner">

        {/* Back & Title */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
          <button
            onClick={() => navigate('/dashboard')}
            className="btn-ghost"
            style={{ padding: '8px 14px', fontSize: 13 }}
          >
            <ArrowLeft size={14} />
            Dashboard
          </button>
          <button
            onClick={loadSession}
            className="btn-ghost"
            style={{ padding: '8px 14px', fontSize: 13 }}
          >
            <RefreshCw size={14} />
            Recurate Session
          </button>
        </div>

        {/* Session Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            padding: '28px 32px',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 20,
            marginBottom: 32,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <span style={{
              padding: '4px 10px',
              borderRadius: 999,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
              background: 'rgba(16,185,129,0.12)',
              color: '#10B981',
              border: '1px solid rgba(16,185,129,0.3)',
            }}>
              Intervention: {reasoning.interventionType}
            </span>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
              Stage: {reasoning.identityStage} · Trust Score: {reasoning.trustScore}
            </span>
          </div>

          <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 32, color: 'rgba(255,255,255,0.95)', marginBottom: 12 }}>
            {reasoning.sessionTitle}
          </h1>

          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 15, lineHeight: 1.6, maxWidth: 680 }}>
            {reasoning.sessionMessage}
          </p>
        </motion.div>

        {/* Recommendations List */}
        {recs.length > 0 ? (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <h2 style={{ fontSize: 14, fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Today's Curated Recommendations ({recs.length} remaining)
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <AnimatePresence>
                {recs.map((rec, idx) => (
                  <RecommendationCard
                    key={rec.id}
                    rec={rec}
                    index={idx}
                    interventionType={reasoning.interventionType}
                    onComplete={handleComplete}
                    onSkip={handleSkip}
                  />
                ))}
              </AnimatePresence>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              padding: '48px 32px',
              textAlign: 'center',
              background: 'rgba(16,185,129,0.05)',
              border: '1px solid rgba(16,185,129,0.2)',
              borderRadius: 24,
            }}
          >
            <div style={{ fontSize: 48, marginBottom: 16 }}>🌱</div>
            <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 28, color: 'rgba(255,255,255,0.95)', marginBottom: 8 }}>
              Session Complete!
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 15, maxWidth: 460, margin: '0 auto 24px', lineHeight: 1.6 }}>
              You've engaged with all recommendations for this session. Your trust score and growth state have been updated.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <button onClick={() => navigate('/dashboard')} className="btn-primary">
                Return to Dashboard
              </button>
              <button onClick={loadSession} className="btn-ghost">
                Generate New Session
              </button>
            </div>
          </motion.div>
        )}

      </div>
    </PageTransition>
  )
}
