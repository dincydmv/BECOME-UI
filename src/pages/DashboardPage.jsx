/**
 * DashboardPage.jsx — Dark Glass Curator Dashboard (Matches Screenshot #1 & #3)
 * All texts preserved from existing UI with dark glass aesthetic.
 */

import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  Sparkles, PlayCircle, ArrowRight, CheckCircle2, Award,
  BookOpen, TrendingUp, Target, Shield, Zap, Star
} from 'lucide-react'
import { useApp } from '../store/AppContext.jsx'
import PageTransition from '../components/PageTransition.jsx'

export default function DashboardPage() {
  const navigate = useNavigate()
  const { profile, growthState, history } = useApp()
  const completedRecent = history?.filter(h => h.status === 'completed')?.slice(0, 3) || []

  const firstName = profile?.name?.split(' ')[0] || 'neha'
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  const currentTrait = profile?.currentTraits || 'Easily distracted'
  const targetTrait = profile?.targetTraits || 'Deeply focused'
  const userGoal = profile?.goals || 'abcdefghij'
  const trustScore = growthState?.trustScore ?? 52
  const streakDays = growthState?.consistency ?? 1
  const completedCount = growthState?.completedCount ?? (completedRecent.length > 0 ? completedRecent.length : 1)
  const sessionCount = growthState?.sessionCount ?? 0
  const identityStage = growthState?.identityStage || 'Foundation Builder'

  return (
    <PageTransition>
      <div className="page-inner">

        {/* ── 1. HERO BANNER ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            padding: '36px 40px',
            background: 'linear-gradient(135deg, rgba(16,185,129,0.14), rgba(139,92,246,0.09), rgba(245,158,11,0.06))',
            border: '1px solid rgba(16,185,129,0.25)',
            borderRadius: 28,
            marginBottom: 36,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Ambient Glow */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'radial-gradient(ellipse 70% 60% at 80% 50%, rgba(16,185,129,0.08), transparent)',
          }} />

          <div style={{ position: 'relative', zIndex: 2 }}>
            {/* Brand Pill */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '5px 14px',
              background: 'rgba(16,185,129,0.15)',
              border: '1px solid rgba(16,185,129,0.25)',
              borderRadius: 999,
              fontSize: 12, color: '#10B981', fontWeight: 600, marginBottom: 20,
            }}>
              <Sparkles size={13} />
              Become AI · Growth Curator Ready
            </div>

            <h1 style={{
              fontFamily: 'DM Serif Display, Georgia, serif',
              fontSize: 40, color: 'rgba(255,255,255,0.97)',
              lineHeight: 1.15, marginBottom: 14, letterSpacing: '-0.5px',
            }}>
              {greeting}, {firstName}.
            </h1>

            <p style={{
              color: 'rgba(255,255,255,0.6)',
              fontSize: 15, maxWidth: 540, lineHeight: 1.6, marginBottom: 28,
            }}>
              Your AI Curator has analyzed your growth state and identity gap. Ready to select today's personalized recommendations?
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <button
                onClick={() => navigate('/session')}
                className="btn-primary"
                type="button"
                style={{ padding: '14px 28px', fontSize: 15, gap: 10, borderRadius: 14 }}
              >
                <PlayCircle size={18} />
                Start Today's Curation Session
              </button>

              <button
                onClick={() => navigate('/journey')}
                className="btn-ghost"
                type="button"
                style={{ padding: '12px 22px', fontSize: 14, borderRadius: 14 }}
              >
                <BookOpen size={16} />
                View My Journey
              </button>
            </div>
          </div>
        </motion.div>

        {/* ── 2. MAIN GRID ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 28 }}>

          {/* LEFT COLUMN */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>

            {/* IDENTITY TRANSFORMATION PATH CARD */}
            {profile && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                style={{
                  padding: '26px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 20,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
                  <Target size={15} color="#10B981" />
                  <h3 style={{
                    fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.4)',
                    textTransform: 'uppercase', letterSpacing: '0.8px',
                  }}>
                    IDENTITY TRANSFORMATION PATH
                  </h3>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 36px 1fr', alignItems: 'center', gap: 12 }}>
                  {/* STARTING */}
                  <div style={{
                    padding: '16px',
                    background: 'rgba(244,63,94,0.06)',
                    border: '1px solid rgba(244,63,94,0.2)',
                    borderRadius: 14,
                  }}>
                    <div style={{ fontSize: 10, color: '#F43F5E', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>
                      STARTING IDENTITY
                    </div>
                    <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.9)', fontWeight: 500 }}>
                      {currentTrait}
                    </div>
                  </div>

                  {/* ARROW */}
                  <div style={{ textAlign: 'center', color: '#10B981' }}>
                    <ArrowRight size={20} />
                  </div>

                  {/* TARGET */}
                  <div style={{
                    padding: '16px',
                    background: 'rgba(16,185,129,0.06)',
                    border: '1px solid rgba(16,185,129,0.2)',
                    borderRadius: 14,
                  }}>
                    <div style={{ fontSize: 10, color: '#10B981', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>
                      TARGET IDENTITY
                    </div>
                    <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.9)', fontWeight: 500 }}>
                      {targetTrait}
                    </div>
                  </div>
                </div>

                {/* ACTIVE GOAL */}
                <div style={{
                  marginTop: 20, paddingTop: 18,
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                  display: 'flex', alignItems: 'flex-start', gap: 8,
                }}>
                  <TrendingUp size={14} color="rgba(255,255,255,0.3)" style={{ marginTop: 3, flexShrink: 0 }} />
                  <div>
                    <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600 }}>
                      ACTIVE GOAL
                    </span>
                    <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)', marginTop: 4, fontStyle: 'italic' }}>
                      "{userGoal}"
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* RECENTLY COMPLETED CARD */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{
                padding: '26px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 20,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <CheckCircle2 size={16} color="#10B981" />
                  <h3 style={{
                    fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.4)',
                    textTransform: 'uppercase', letterSpacing: '0.8px',
                  }}>
                    RECENTLY COMPLETED
                  </h3>
                </div>
                <button
                  onClick={() => navigate('/journey')}
                  type="button"
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
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '14px 18px',
                      background: 'rgba(16,185,129,0.04)',
                      border: '1px solid rgba(16,185,129,0.15)',
                      borderRadius: 12,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <CheckCircle2 size={18} color="#10B981" />
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.95)' }}>
                          Atomic Habits: How to Get 1% Better Every Day
                        </div>
                        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>
                          Video · Productivity Game
                        </div>
                      </div>
                    </div>
                    <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>
                      8/1/2026
                    </span>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {completedRecent.map((item, idx) => (
                    <div key={idx} style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '14px 18px',
                      background: 'rgba(16,185,129,0.04)',
                      border: '1px solid rgba(16,185,129,0.15)',
                      borderRadius: 12,
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <CheckCircle2 size={18} color="#10B981" />
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.95)' }}>
                            {item.title}
                          </div>
                          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>
                            {item.type} · {item.creator}
                          </div>
                        </div>
                      </div>
                      <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>
                        {new Date(item.loggedAt || Date.now()).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>

          {/* RIGHT COLUMN */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* TRUST SCORE & MOMENTUM (GRID ROW) */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>

              {/* TRUST SCORE CARD */}
              <div style={{
                padding: '20px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 18,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
                  <Shield size={14} color="#10B981" />
                  <span style={{ fontSize: 10, fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    TRUST SCORE
                  </span>
                </div>
                <div style={{ fontFamily: 'DM Serif Display, Georgia, serif', fontSize: 36, color: '#10B981', lineHeight: 1, marginBottom: 10 }}>
                  {trustScore}
                </div>
                <div className="progress-track" style={{ marginBottom: 8 }}>
                  <div className="progress-fill progress-emerald" style={{ width: `${trustScore}%` }} />
                </div>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>Keep going!</span>
              </div>

              {/* MOMENTUM CARD */}
              <div style={{
                padding: '20px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 18,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                  <Zap size={14} color="#F43F5E" />
                  <span style={{ fontSize: 10, fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    MOMENTUM
                  </span>
                </div>
                <div style={{ fontSize: 24, marginBottom: 4 }}>🌱</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#F43F5E', marginBottom: 2 }}>
                  Building
                </div>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>
                  {streakDays} day streak
                </span>
              </div>

            </div>

            {/* IDENTITY STAGE CARD */}
            <div style={{
              padding: '20px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 18,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Star size={14} color="#38BDF8" />
                  <span style={{ fontSize: 10, fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    IDENTITY STAGE
                  </span>
                </div>
                <span style={{
                  fontSize: 11, fontWeight: 700, color: '#38BDF8',
                  padding: '3px 10px', background: 'rgba(56,189,248,0.12)',
                  border: '1px solid rgba(56,189,248,0.25)', borderRadius: 999
                }}>
                  {identityStage}
                </span>
              </div>
              <div className="progress-track" style={{ marginBottom: 8 }}>
                <div className="progress-fill" style={{ width: '25%', background: '#38BDF8' }} />
              </div>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>
                Next: Mid Stage at 15 completions
              </span>
            </div>

            {/* COMPLETED & SESSIONS STAT BOXES */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div style={{
                padding: '20px', textAlign: 'center',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 18,
              }}>
                <div style={{ fontFamily: 'DM Serif Display, Georgia, serif', fontSize: 36, color: 'rgba(255,255,255,0.95)', lineHeight: 1, marginBottom: 6 }}>
                  {completedCount}
                </div>
                <div style={{ fontSize: 10, fontFamily: 'monospace', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  COMPLETED
                </div>
              </div>

              <div style={{
                padding: '20px', textAlign: 'center',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 18,
              }}>
                <div style={{ fontFamily: 'DM Serif Display, Georgia, serif', fontSize: 36, color: 'rgba(255,255,255,0.95)', lineHeight: 1, marginBottom: 6 }}>
                  {sessionCount}
                </div>
                <div style={{ fontSize: 10, fontFamily: 'monospace', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  SESSIONS
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </PageTransition>
  )
}
