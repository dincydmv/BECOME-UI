/**
 * GrowthStatePanel.jsx — Visual growth state display
 */

import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Zap, Shield, Star, Flame } from 'lucide-react'

const MOMENTUM_CONFIG = {
  low: { label: 'Building', color: '#F43F5E', bg: 'rgba(244,63,94,0.1)', border: 'rgba(244,63,94,0.25)', icon: '🌱' },
  medium: { label: 'Growing', color: '#F59E0B', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.25)', icon: '🌿' },
  high: { label: 'Thriving', color: '#10B981', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.25)', icon: '🌳' },
}

const STAGE_CONFIG = {
  early: { label: 'Foundation Builder', color: '#38BDF8', progress: 25, next: 'Mid Stage at 15 completions' },
  mid: { label: 'Habit Architect', color: '#F59E0B', progress: 58, next: 'Advanced at 35 completions' },
  advanced: { label: 'Identity Embodier', color: '#8B5CF6', progress: 90, next: 'Peak mastery' },
}

export default function GrowthStatePanel({ growthState }) {
  if (!growthState) return null

  const {
    trustScore = 50,
    momentum = 'medium',
    consistency = 0,
    identityStage = 'early',
    completedCount = 0,
    sessionCount = 0,
  } = growthState

  const mom = MOMENTUM_CONFIG[momentum] || MOMENTUM_CONFIG.medium
  const stage = STAGE_CONFIG[identityStage] || STAGE_CONFIG.early

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Top row: Trust + Momentum */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {/* Trust Score */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            padding: '20px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 16,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <div style={{
              width: 30,
              height: 30,
              borderRadius: 8,
              background: 'rgba(16,185,129,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Shield size={14} color="#10B981" />
            </div>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Trust Score
            </span>
          </div>
          <div style={{ fontSize: 36, fontFamily: 'DM Serif Display, serif', color: '#10B981', lineHeight: 1, marginBottom: 10 }}>
            {trustScore}
          </div>
          <div className="progress-track">
            <motion.div
              className="progress-fill progress-emerald"
              initial={{ width: 0 }}
              animate={{ width: `${trustScore}%` }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
            />
          </div>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 6 }}>
            {trustScore >= 75 ? 'Excellent consistency!' : trustScore >= 50 ? 'Keep going!' : 'Build momentum'}
          </p>
        </motion.div>

        {/* Momentum */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          style={{
            padding: '20px',
            background: mom.bg,
            border: `1px solid ${mom.border}`,
            borderRadius: 16,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <div style={{
              width: 30,
              height: 30,
              borderRadius: 8,
              background: `${mom.color}22`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Zap size={14} color={mom.color} />
            </div>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Momentum
            </span>
          </div>
          <div style={{ fontSize: 28, marginBottom: 4 }}>{mom.icon}</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: mom.color, marginBottom: 4 }}>
            {mom.label}
          </div>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>
            {consistency} day streak
          </p>
        </motion.div>
      </div>

      {/* Identity Stage */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{
          padding: '20px',
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 16,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 30,
              height: 30,
              borderRadius: 8,
              background: `${stage.color}22`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Star size={14} color={stage.color} />
            </div>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Identity Stage
            </span>
          </div>
          <span style={{
            fontSize: 12,
            fontWeight: 700,
            color: stage.color,
            padding: '4px 10px',
            background: `${stage.color}15`,
            borderRadius: 999,
            border: `1px solid ${stage.color}33`,
          }}>
            {stage.label}
          </span>
        </div>

        <div className="progress-track" style={{ marginBottom: 8 }}>
          <motion.div
            className="progress-fill"
            style={{ background: `linear-gradient(90deg, ${stage.color}99, ${stage.color})` }}
            initial={{ width: 0 }}
            animate={{ width: `${stage.progress}%` }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.4 }}
          />
        </div>
        <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>
          Next: {stage.next}
        </p>
      </motion.div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          style={{
            padding: '16px',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 12,
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: 28, fontFamily: 'DM Serif Display, serif', color: 'rgba(255,255,255,0.9)' }}>
            {completedCount}
          </div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: 4 }}>
            Completed
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{
            padding: '16px',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 12,
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: 28, fontFamily: 'DM Serif Display, serif', color: 'rgba(255,255,255,0.9)' }}>
            {sessionCount || 0}
          </div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: 4 }}>
            Sessions
          </div>
        </motion.div>
      </div>
    </div>
  )
}
