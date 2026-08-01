/**
 * DashboardPage.jsx — Editorial Off-White Minimalist Dashboard (Exact Match to Screenshot #4 / Mockup)
 * Preserves all existing dynamic text and backend AI integration.
 */

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  Sparkles, PlayCircle, ArrowRight, CheckCircle2, Award,
  BookOpen, Leaf, TrendingUp, Target, Brain, Bell, User,
  Check, Flame, Zap, Compass, Activity, ArrowUpRight, Play
} from 'lucide-react'
import { useApp } from '../store/AppContext.jsx'
import PageTransition from '../components/PageTransition.jsx'

export default function DashboardPage() {
  const navigate = useNavigate()
  const { profile, growthState, history } = useApp()
  const completedRecent = history?.filter(h => h.status === 'completed')?.slice(0, 3) || []

  const firstName = profile?.name?.split(' ')[0] || 'NEha'
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  const currentTrait = profile?.currentTraits || 'Easily Distracted'
  const targetTrait = profile?.targetTraits || 'Deeply Focused'
  const userGoal = profile?.goals || 'abcdefghij'
  const trustScore = growthState?.trustScore ?? 52
  const consistencyDays = growthState?.consistency ?? 5

  const [progressPercent, setProgressPercent] = useState(28)

  return (
    <PageTransition>
      <div className="page-inner" style={{ padding: '24px 32px 60px', maxWidth: 1120, margin: '0 auto' }}>

        {/* TOP BAR / HEADER (Minimalist Icons on Top Right) */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 16, marginBottom: 24 }}>
          <button type="button" style={{ background: '#FFFFFF', border: '1px solid #E8E5DF', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#111111', cursor: 'pointer', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
            <Bell size={16} />
          </button>
          <div style={{ width: 36, height: 36, borderRadius: '50%', backgroundColor: '#111111', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700 }}>
            {firstName[0]?.toUpperCase() || 'N'}
          </div>
        </div>

        {/* ── 1. MAIN HERO BANNER (MATCHES SCREENSHOT #4) ── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            padding: '40px 48px',
            backgroundColor: '#FFFFFF',
            border: '1px solid #E8E5DF',
            borderRadius: 32,
            marginBottom: 28,
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 2px 12px rgba(0,0,0,0.02)'
          }}
        >
          {/* Top Right Robotic Hand Artwork (card-ai-hand.png) */}
          <div style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            width: 380,
            pointerEvents: 'none',
            overflow: 'hidden',
          }}>
            <img
              src="/card-ai-hand.png"
              alt="AI Robotic Hand"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                objectPosition: 'right center',
                opacity: 0.9,
              }}
            />
          </div>

          <div style={{ position: 'relative', zIndex: 2, maxWidth: 560 }}>
            <h1 style={{
              fontFamily: 'Inter, -apple-system, sans-serif',
              fontSize: 42,
              fontWeight: 800,
              color: '#111111',
              lineHeight: 1.15,
              marginBottom: 12,
              letterSpacing: '-1px'
            }}>
              {greeting}, {firstName}.<br />
              Who Are You Becoming Today?
            </h1>

            <p style={{
              color: '#555555',
              fontSize: 14,
              lineHeight: 1.6,
              marginBottom: 28,
              maxWidth: 480
            }}>
              Your AI Curator has analyzed your current identity ({currentTrait}) and prepared today's growth path just for you.
            </p>

            <button
              onClick={() => navigate('/session')}
              type="button"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '14px 28px',
                backgroundColor: '#111111',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: 999,
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#222222'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#111111'}
            >
              Start Today's Curation Session
              <ArrowRight size={16} />
            </button>
          </div>
        </motion.div>

        {/* ── 2. ROW 1: IDENTITY TRANSFORMATION & TODAY'S CURATION ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>

          {/* IDENTITY TRANSFORMATION CARD */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{
              padding: '28px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #E8E5DF',
              borderRadius: 24,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
            }}
          >
            <div>
              <span style={{ fontSize: 10, fontWeight: 700, fontFamily: 'monospace', color: '#888888', letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: 20 }}>
                IDENTITY TRANSFORMATION PATH
              </span>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <div>
                  <div style={{ fontSize: 10, fontFamily: 'monospace', color: '#888888', textTransform: 'uppercase', marginBottom: 4 }}>STARTING IDENTITY</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#111111' }}>{currentTrait}</div>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 16, fontWeight: 800, color: '#111111' }}>{progressPercent}%</div>
                  <div style={{ fontSize: 10, color: '#888888' }}>Progress</div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 10, fontFamily: 'monospace', color: '#888888', textTransform: 'uppercase', marginBottom: 4 }}>TARGET IDENTITY</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#111111' }}>{targetTrait}</div>
                </div>
              </div>

              {/* Progress Bar Line */}
              <div
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect()
                  const newPct = Math.round(((e.clientX - rect.left) / rect.width) * 100)
                  setProgressPercent(newPct)
                }}
                style={{ position: 'relative', width: '100%', height: 6, backgroundColor: '#F0EDE6', borderRadius: 99, margin: '20px 0', cursor: 'pointer' }}
              >
                <div style={{ width: `${progressPercent}%`, height: '100%', backgroundColor: '#111111', borderRadius: 99, transition: 'width 0.4s ease' }} />
                <div style={{ position: 'absolute', top: -5, left: `${progressPercent}%`, width: 16, height: 16, borderRadius: '50%', backgroundColor: '#111111', border: '2px solid #FFFFFF', transform: 'translateX(-50%)', boxShadow: '0 2px 6px rgba(0,0,0,0.15)' }} />
              </div>
            </div>

            <div style={{ paddingTop: 16, borderTop: '1px solid #F0EDE6' }}>
              <div style={{ fontSize: 10, fontFamily: 'monospace', color: '#888888', textTransform: 'uppercase', marginBottom: 6 }}>ACTIVE GOAL</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Target size={16} color="#111111" />
                <span style={{ fontSize: 14, fontWeight: 700, color: '#111111' }}>"{userGoal}"</span>
              </div>
              <span style={{ fontSize: 11, color: '#777777', display: 'block', marginTop: 4 }}>Small steps today. Massive change tomorrow.</span>
            </div>
          </motion.div>

          {/* TODAY'S CURATION CARD */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            style={{
              padding: '28px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #E8E5DF',
              borderRadius: 24,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
            }}
          >
            <div>
              <span style={{ fontSize: 10, fontWeight: 700, fontFamily: 'monospace', color: '#888888', letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: 16 }}>
                TODAY'S CURATION
              </span>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {/* Item 1 */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', background: '#FAFAFA', borderRadius: 14, border: '1px solid #F0EDE6' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 10, background: '#111111', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF' }}>
                      <Play size={14} fill="#FFFFFF" />
                    </div>
                    <div>
                      <div style={{ fontSize: 11, color: '#888888', fontWeight: 600 }}>Watch</div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#111111' }}>Atomic Habits Chapter 3</div>
                    </div>
                  </div>
                  <span style={{ fontSize: 12, color: '#888888' }}>12 min</span>
                </div>

                {/* Item 2 */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', background: '#FAFAFA', borderRadius: 14, border: '1px solid #F0EDE6' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 10, background: '#111111', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF' }}>
                      <BookOpen size={14} />
                    </div>
                    <div>
                      <div style={{ fontSize: 11, color: '#888888', fontWeight: 600 }}>Read</div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#111111' }}>Deep Work Summary</div>
                    </div>
                  </div>
                  <span style={{ fontSize: 12, color: '#888888' }}>8 min</span>
                </div>

                {/* Item 3 */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', background: '#FAFAFA', borderRadius: 14, border: '1px solid #F0EDE6' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 10, background: '#111111', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF' }}>
                      <Zap size={14} />
                    </div>
                    <div>
                      <div style={{ fontSize: 11, color: '#888888', fontWeight: 600 }}>Practice</div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#111111' }}>25-minute Focus Sprint</div>
                    </div>
                  </div>
                  <button onClick={() => navigate('/session')} type="button" style={{ background: 'none', border: 'none', fontSize: 12, fontWeight: 700, color: '#111111', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
                    Start →
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* ── 3. ROW 2: AI REFLECTION, MOMENTUM, & AI CONFIDENCE ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: 24, marginBottom: 24 }}>

          {/* AI REFLECTION */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              padding: '24px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #E8E5DF',
              borderRadius: 24,
              boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <span style={{ fontSize: 10, fontWeight: 700, fontFamily: 'monospace', color: '#888888', letterSpacing: '1px', textTransform: 'uppercase' }}>
                AI REFLECTION
              </span>
              <Brain size={18} color="#111111" />
            </div>
            <p style={{ fontSize: 13, color: '#555555', lineHeight: 1.5, marginBottom: 12 }}>
              "Yesterday you completed your focus session. Your consistency is improving."
            </p>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#111111' }}>
              Today's recommendation:<br/>
              <span style={{ fontWeight: 400, color: '#666666' }}>Remove distractions before starting your study session.</span>
            </div>
          </motion.div>

          {/* MOMENTUM */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            style={{
              padding: '24px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #E8E5DF',
              borderRadius: 24,
              boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
            }}
          >
            <span style={{ fontSize: 10, fontWeight: 700, fontFamily: 'monospace', color: '#888888', letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: 14 }}>
              MOMENTUM
            </span>
            {/* Week Checkboxes */}
            <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => (
                <div key={idx} style={{ flex: 1, textAlign: 'center' }}>
                  <div style={{ width: '100%', height: 16, backgroundColor: idx < 5 ? '#111111' : '#F0EDE6', borderRadius: 4, marginBottom: 4 }} />
                  <span style={{ fontSize: 9, color: '#888888', fontWeight: 600 }}>{day}</span>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#111111', marginBottom: 2 }}>
              {consistencyDays} day consistency
            </div>
            <span style={{ fontSize: 12, color: '#777777' }}>Keep going, {firstName}!</span>
          </motion.div>

          {/* AI CONFIDENCE / TRUST SCORE */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              padding: '24px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #E8E5DF',
              borderRadius: 24,
              boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
              display: 'flex',
              alignItems: 'center',
              gap: 16
            }}
          >
            {/* Circular Progress Ring */}
            <div style={{ position: 'relative', width: 64, height: 64, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="64" height="64" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none" stroke="#F0EDE6" strokeWidth="3"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none" stroke="#111111" strokeWidth="3" strokeDasharray={`${trustScore}, 100`}
                />
              </svg>
              <span style={{ position: 'absolute', fontSize: 14, fontWeight: 800, color: '#111111' }}>{trustScore}%</span>
            </div>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, fontFamily: 'monospace', color: '#888888', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 4 }}>
                AI CONFIDENCE
              </div>
              <p style={{ fontSize: 12, color: '#555555', margin: 0, lineHeight: 1.4 }}>
                Your curator understands your habits well.<br/>Accuracy improving every day.
              </p>
            </div>
          </motion.div>

        </div>

        {/* ── 4. ROW 3: IDENTITY STAGE & RECENT GROWTH ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 24 }}>

          {/* IDENTITY STAGE */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            style={{
              padding: '28px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #E8E5DF',
              borderRadius: 24,
              boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
            }}
          >
            <span style={{ fontSize: 10, fontWeight: 700, fontFamily: 'monospace', color: '#888888', letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: 24 }}>
              IDENTITY STAGE
            </span>

            {/* Stage Node Line */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', marginBottom: 20 }}>
              <div style={{ position: 'absolute', top: 12, left: 16, right: 16, height: 2, backgroundColor: '#E0DDD6', zIndex: 1 }} />
              {['Foundation Builder', 'Explorer', 'Creator', 'Leader'].map((stage, idx) => {
                const isActive = idx === 0
                return (
                  <div key={idx} style={{ zIndex: 2, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{
                      width: 26, height: 26, borderRadius: '50%',
                      backgroundColor: isActive ? '#111111' : '#FFFFFF',
                      border: `2px solid ${isActive ? '#111111' : '#D0CDC5'}`,
                      color: isActive ? '#FFFFFF' : '#888888',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 12, fontWeight: 700
                    }}>
                      {isActive ? '+' : ''}
                    </div>
                    <span style={{ fontSize: 12, fontWeight: isActive ? 700 : 500, color: isActive ? '#111111' : '#999999', marginTop: 8 }}>
                      {stage}
                    </span>
                  </div>
                )
              })}
            </div>
          </motion.div>

          {/* RECENT GROWTH ACTIVITY */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{
              padding: '28px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #E8E5DF',
              borderRadius: 24,
              boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <span style={{ fontSize: 10, fontWeight: 700, fontFamily: 'monospace', color: '#888888', letterSpacing: '1px', textTransform: 'uppercase' }}>
                  RECENT GROWTH
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 13 }}>
                  <span style={{ color: '#888888', fontSize: 12 }}>Yesterday</span>
                  <span style={{ fontWeight: 600, color: '#111111' }}>✓ Finished Morning Deep Work</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 13 }}>
                  <span style={{ color: '#888888', fontSize: 12 }}>Yesterday</span>
                  <span style={{ fontWeight: 600, color: '#111111' }}>✓ Read Psychology of Success</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 13 }}>
                  <span style={{ color: '#888888', fontSize: 12 }}>2 Days Ago</span>
                  <span style={{ fontWeight: 600, color: '#111111' }}>✓ Reflection Completed</span>
                </div>
              </div>
            </div>

            <button onClick={() => navigate('/journey')} type="button" style={{ background: 'none', border: 'none', color: '#111111', fontSize: 12, fontWeight: 700, cursor: 'pointer', textAlign: 'left', marginTop: 16, padding: 0 }}>
              View All Activity →
            </button>
          </motion.div>

        </div>

      </div>
    </PageTransition>
  )
}
