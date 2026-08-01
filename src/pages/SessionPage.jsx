/**
 * SessionPage.jsx — Curation session experience
 * Triggers the Growth Curator Agent's reasoning pipeline and renders recommendations.
 * Styled in crisp black text and black accent icons matching light off-white theme.
 */

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { RefreshCw, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../store/AppContext.jsx'
import { runGrowthAgent } from '../services/growthAgent.js'
import AgentThinking from '../components/AgentThinking.jsx'
import RecommendationCard from '../components/RecommendationCard.jsx'
import PageTransition from '../components/PageTransition.jsx'

export default function SessionPage() {
  const navigate = useNavigate()
  const { profile, growthState, completeRecommendation, skipRecommendation } = useApp()

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
          <RefreshCw size={32} color="#111111" className="animate-spin-slow" style={{ margin: '0 auto' }} />
          <p style={{ marginTop: 16, color: '#555555', fontWeight: 600, fontSize: 14 }}>Initializing Curator Agent...</p>
        </div>
      </PageTransition>
    )
  }

  const { reasoning } = sessionData

  return (
    <PageTransition>
      <div className="page-inner" style={{ maxWidth: 1080, margin: '0 auto', padding: '24px 32px 60px' }}>

        {/* Back & Title */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
          <button
            onClick={() => navigate('/dashboard')}
            type="button"
            style={{
              padding: '8px 16px',
              fontSize: 13,
              fontWeight: 600,
              backgroundColor: '#FFFFFF',
              color: '#111111',
              border: '1px solid #E0DDD6',
              borderRadius: 999,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <ArrowLeft size={14} />
            Dashboard
          </button>
          <button
            onClick={loadSession}
            type="button"
            style={{
              padding: '8px 16px',
              fontSize: 13,
              fontWeight: 600,
              backgroundColor: '#FFFFFF',
              color: '#111111',
              border: '1px solid #E0DDD6',
              borderRadius: 999,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
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
            padding: '32px 36px',
            backgroundColor: '#FFFFFF',
            border: '1px solid #E8E5DF',
            borderRadius: 24,
            marginBottom: 32,
            boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <span style={{
              padding: '5px 12px',
              borderRadius: 999,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
              backgroundColor: '#111111',
              color: '#FFFFFF',
            }}>
              Intervention: {reasoning.interventionType}
            </span>
            <span style={{ fontSize: 13, color: '#666666', fontWeight: 500 }}>
              Stage: {reasoning.identityStage} · Trust Score: {reasoning.trustScore}
            </span>
          </div>

          <h1 style={{ fontFamily: 'Inter, -apple-system, sans-serif', fontSize: 32, fontWeight: 800, color: '#111111', marginBottom: 12, letterSpacing: '-0.5px' }}>
            {reasoning.sessionTitle}
          </h1>

          <p style={{ color: '#555555', fontSize: 15, lineHeight: 1.6, maxWidth: 720, margin: 0 }}>
            {reasoning.sessionMessage}
          </p>
        </motion.div>

        {/* Recommendations List */}
        {recs.length > 0 ? (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <h2 style={{ fontSize: 12, fontWeight: 700, fontFamily: 'monospace', color: '#888888', textTransform: 'uppercase', letterSpacing: '1px' }}>
                TODAY'S CURATED RECOMMENDATIONS ({recs.length} REMAINING)
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {recs.map((rec, idx) => (
                <RecommendationCard
                  key={rec.id}
                  rec={rec}
                  index={idx}
                  onComplete={() => handleComplete(rec)}
                  onSkip={() => handleSkip(rec)}
                  interventionType={reasoning.interventionType}
                />
              ))}
            </div>
          </div>
        ) : (
          <div style={{
            padding: '48px',
            textAlign: 'center',
            backgroundColor: '#FFFFFF',
            border: '1px solid #E8E5DF',
            borderRadius: 24,
          }}>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: '#111111', marginBottom: 8 }}>
              All recommendations completed! 🎉
            </h3>
            <p style={{ color: '#666666', fontSize: 14, marginBottom: 24 }}>
              Great job taking action on your growth journey today.
            </p>
            <button
              onClick={() => navigate('/dashboard')}
              type="button"
              className="btn-primary"
              style={{ padding: '12px 24px' }}
            >
              Return to Dashboard
            </button>
          </div>
        )}
      </div>
    </PageTransition>
  )
}
