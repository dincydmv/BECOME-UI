/**
 * DashboardPage.jsx — Main user hub
 */

import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  Sparkles, PlayCircle, Shield, Zap, Star,
  BookOpen, ArrowRight, CheckCircle2, Award, Flame
} from 'lucide-react'
import { useApp } from '../store/AppContext.jsx'
import GrowthStatePanel from '../components/GrowthStatePanel.jsx'
import PageTransition from '../components/PageTransition.jsx'

export default function DashboardPage() {
  const navigate = useNavigate()
  const { profile, growthState, history } = useApp()

  const completedRecent = history.filter(h => h.status === 'completed').slice(0, 3)

  return (
    <PageTransition>
      <div className="page-inner">

        {/* Hero Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            padding: '32px 36px',
            background: 'linear-gradient(135deg, rgba(16,185,129,0.12), rgba(139,92,246,0.08), rgba(245,158,11,0.06))',
            border: '1px solid rgba(16,185,129,0.25)',
            borderRadius: 24,
            marginBottom: 36,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 12px', background: 'rgba(16,185,129,0.15)', borderRadius: 999, fontSize: 12, color: '#10B981', fontWeight: 600, marginBottom: 16 }}>
              <Sparkles size={13} />
              Growth Curator Ready
            </div>
            <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 36, color: 'rgba(255,255,255,0.95)', lineHeight: 1.2, marginBottom: 12 }}>
              Good day, {profile?.name || 'Explorer'}.
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 15, maxWidth: 520, lineHeight: 1.6, marginBottom: 24 }}>
              Who do you want to become today? Your curator is ready to analyze your growth state and select today's 3 personalized recommendations.
            </p>
            <button
              onClick={() => navigate('/session')}
              className="btn-primary"
              style={{ padding: '14px 28px', fontSize: 15 }}
            >
              <PlayCircle size={18} />
              Start Growth Curation Session
            </button>
          </div>
        </motion.div>

        {/* Main Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 28 }}>

          {/* Left Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>

            {/* Current Identity & Target */}
            {profile && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                style={{
                  padding: '24px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 20,
                }}
              >
                <h3 style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 16 }}>
                  Identity Transformation Path
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 30px 1fr', alignItems: 'center', gap: 12 }}>
                  {/* Current */}
                  <div style={{ padding: '16px', background: 'rgba(244,63,94,0.06)', border: '1px solid rgba(244,63,94,0.2)', borderRadius: 12 }}>
                    <div style={{ fontSize: 11, color: '#F43F5E', fontWeight: 700, textTransform: 'uppercase', marginBottom: 6 }}>
                      Starting Identity
                    </div>
                    <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>
                      {profile.currentTraits}
                    </div>
                  </div>

                  {/* Arrow */}
                  <div style={{ textAlign: 'center', color: '#10B981' }}>
                    <ArrowRight size={20} />
                  </div>

                  {/* Target */}
                  <div style={{ padding: '16px', background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 12 }}>
                    <div style={{ fontSize: 11, color: '#10B981', fontWeight: 700, textTransform: 'uppercase', marginBottom: 6 }}>
                      Target Identity
                    </div>
                    <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>
                      {profile.targetTraits}
                    </div>
                  </div>
                </div>

                {profile.goals && (
                  <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Active Goal: </span>
                    <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', fontStyle: 'italic' }}>
                      "{profile.goals}"
                    </span>
                  </div>
                )}
              </motion.div>
            )}

            {/* Recent Accomplishments */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{
                padding: '24px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 20,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h3 style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Recently Completed Content
                </h3>
                <button
                  onClick={() => navigate('/journey')}
                  style={{ background: 'none', border: 'none', color: '#10B981', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}
                >
                  View All →
                </button>
              </div>

              {completedRecent.length === 0 ? (
                <div style={{ padding: '24px', textAlign: 'center', background: 'rgba(255,255,255,0.02)', borderRadius: 12, border: '1px dashed rgba(255,255,255,0.08)' }}>
                  <Award size={24} color="rgba(255,255,255,0.2)" style={{ marginBottom: 8 }} />
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
                    No completed content yet. Start your first session to receive personalized growth recommendations!
                  </p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {completedRecent.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px 16px',
                        background: 'rgba(16,185,129,0.04)',
                        border: '1px solid rgba(16,185,129,0.15)',
                        borderRadius: 10,
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <CheckCircle2 size={16} color="#10B981" />
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.9)' }}>
                            {item.title}
                          </div>
                          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>
                            {item.type} · by {item.creator}
                          </div>
                        </div>
                      </div>
                      <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>
                        {new Date(item.loggedAt).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>

          {/* Right Column: Growth State Panel */}
          <div>
            <GrowthStatePanel growthState={growthState} />
          </div>

        </div>

      </div>
    </PageTransition>
  )
}
