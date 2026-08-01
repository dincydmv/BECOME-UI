/**
 * DashboardPage.jsx — Main user hub for BECOME AI
 */

import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  Sparkles, PlayCircle, ArrowRight, CheckCircle2, Award,
  BookOpen, Leaf, TrendingUp, Target
} from 'lucide-react'
import { useApp } from '../store/AppContext.jsx'
import GrowthStatePanel from '../components/GrowthStatePanel.jsx'
import PageTransition from '../components/PageTransition.jsx'

export default function DashboardPage() {
  const navigate = useNavigate()
  const { profile, growthState, history } = useApp()
  const completedRecent = history.filter(h => h.status === 'completed').slice(0, 3)

  const firstName = profile?.name?.split(' ')[0] || 'Explorer'
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <PageTransition>
      <div className="page-inner">

        {/* ── HERO BANNER ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            padding: '36px 40px',
            background: 'linear-gradient(135deg, rgba(16,185,129,0.14), rgba(139,92,246,0.09), rgba(245,158,11,0.06))',
            border: '1px solid rgba(16,185,129,0.25)',
            borderRadius: 28,
            marginBottom: 40,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Subtle ambient glow */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'radial-gradient(ellipse 70% 60% at 80% 50%, rgba(16,185,129,0.08), transparent)',
          }} />

          <div style={{ position: 'relative', zIndex: 2 }}>
            {/* Brand pill */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '5px 14px',
              background: 'rgba(16,185,129,0.12)',
              border: '1px solid rgba(16,185,129,0.25)',
              borderRadius: 999,
              fontSize: 12, color: '#10B981', fontWeight: 600, marginBottom: 20,
            }}>
              <Sparkles size={12} />
              Become AI · Growth Curator Ready
            </div>

            <h1 style={{
              fontFamily: 'DM Serif Display, serif',
              fontSize: 38, color: 'rgba(255,255,255,0.97)',
              lineHeight: 1.15, marginBottom: 14, letterSpacing: '-0.5px',
            }}>
              {greeting}, {firstName}.
            </h1>

            <p style={{
              color: 'rgba(255,255,255,0.55)',
              fontSize: 15, maxWidth: 520, lineHeight: 1.7, marginBottom: 30,
            }}>
              Your AI Curator has analyzed your growth state and identity gap. Ready to select today's personalized recommendations?
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <button
                onClick={() => navigate('/session')}
                className="btn-primary"
                style={{ padding: '14px 28px', fontSize: 15, gap: 10 }}
              >
                <PlayCircle size={18} />
                Start Today's Curation Session
              </button>

              <button
                onClick={() => navigate('/journey')}
                className="btn-ghost"
                style={{ padding: '12px 20px', fontSize: 14 }}
              >
                <BookOpen size={16} />
                View My Journey
              </button>
            </div>
          </div>
        </motion.div>

        {/* ── MAIN GRID ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 28 }}>

          {/* LEFT COLUMN */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

            {/* Identity Transformation Card */}
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
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20,
                }}>
                  <Target size={15} color="#10B981" />
                  <h3 style={{
                    fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.35)',
                    textTransform: 'uppercase', letterSpacing: '0.8px',
                  }}>
                    Identity Transformation Path
                  </h3>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 36px 1fr', alignItems: 'center', gap: 12 }}>
                  {/* Current */}
                  <div style={{
                    padding: '16px',
                    background: 'rgba(244,63,94,0.06)',
                    border: '1px solid rgba(244,63,94,0.2)',
                    borderRadius: 14,
                  }}>
                    <div style={{ fontSize: 10, color: '#F43F5E', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>
                      Starting Identity
                    </div>
                    <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)', fontWeight: 500, lineHeight: 1.5 }}>
                      {profile.currentTraits}
                    </div>
                  </div>

                  {/* Arrow */}
                  <div style={{ textAlign: 'center', color: '#10B981' }}>
                    <ArrowRight size={20} />
                  </div>

                  {/* Target */}
                  <div style={{
                    padding: '16px',
                    background: 'rgba(16,185,129,0.06)',
                    border: '1px solid rgba(16,185,129,0.2)',
                    borderRadius: 14,
                  }}>
                    <div style={{ fontSize: 10, color: '#10B981', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>
                      Target Identity
                    </div>
                    <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)', fontWeight: 500, lineHeight: 1.5 }}>
                      {profile.targetTraits}
                    </div>
                  </div>
                </div>

                {profile.goals && (
                  <div style={{
                    marginTop: 18, paddingTop: 18,
                    borderTop: '1px solid rgba(255,255,255,0.06)',
                    display: 'flex', alignItems: 'flex-start', gap: 8,
                  }}>
                    <TrendingUp size={14} color="rgba(255,255,255,0.3)" style={{ marginTop: 2, flexShrink: 0 }} />
                    <div>
                      <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600 }}>
                        Active Goal
                      </span>
                      <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 4, lineHeight: 1.5, fontStyle: 'italic' }}>
                        "{profile.goals}"
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Recently Completed */}
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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <CheckCircle2 size={15} color="#10B981" />
                  <h3 style={{
                    fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.35)',
                    textTransform: 'uppercase', letterSpacing: '0.8px',
                  }}>
                    Recently Completed
                  </h3>
                </div>
                <button
                  onClick={() => navigate('/journey')}
                  style={{
                    background: 'none', border: 'none',
                    color: '#10B981', fontSize: 12, fontWeight: 600, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: 4,
                  }}
                >
                  View All <ArrowRight size={13} />
                </button>
              </div>

              {completedRecent.length === 0 ? (
                <div style={{
                  padding: '28px', textAlign: 'center',
                  background: 'rgba(255,255,255,0.02)',
                  borderRadius: 14,
                  border: '1px dashed rgba(255,255,255,0.08)',
                }}>
                  <Award size={28} color="rgba(255,255,255,0.15)" style={{ marginBottom: 10, display: 'block', margin: '0 auto 10px' }} />
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', lineHeight: 1.6 }}>
                    No completed content yet.<br/>
                    Start your first session to receive personalized recommendations.
                  </p>
                  <button
                    onClick={() => navigate('/session')}
                    className="btn-primary"
                    style={{ marginTop: 16, padding: '10px 20px', fontSize: 13 }}
                  >
                    <PlayCircle size={15} />
                    Begin First Session
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {completedRecent.map((item, idx) => (
                    <div key={idx} style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '13px 16px',
                      background: 'rgba(16,185,129,0.04)',
                      border: '1px solid rgba(16,185,129,0.14)',
                      borderRadius: 12,
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <CheckCircle2 size={16} color="#10B981" />
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.9)' }}>
                            {item.title}
                          </div>
                          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>
                            {item.type} · {item.creator}
                          </div>
                        </div>
                      </div>
                      <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', flexShrink: 0 }}>
                        {new Date(item.loggedAt).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Growth State Panel */}
          <div>
            <GrowthStatePanel growthState={growthState} />
          </div>

        </div>
      </div>
    </PageTransition>
  )
}
