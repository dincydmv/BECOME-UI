/**
 * Navigation.jsx — Sidebar navigation for BECOME
 */

import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles, LayoutDashboard, PlayCircle, BookOpen,
  ChevronLeft, ChevronRight, Leaf, Settings, RotateCcw
} from 'lucide-react'
import { useApp } from '../store/AppContext.jsx'

const NAV_ITEMS = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/session', icon: PlayCircle, label: 'Start Session' },
  { to: '/journey', icon: BookOpen, label: 'My Journey' },
]

const MomentumDot = ({ momentum }) => {
  const colors = {
    low: '#F43F5E',
    medium: '#F59E0B',
    high: '#10B981',
  }
  return (
    <span
      style={{
        width: 8,
        height: 8,
        borderRadius: '50%',
        background: colors[momentum] || colors.medium,
        display: 'inline-block',
        boxShadow: `0 0 6px ${colors[momentum] || colors.medium}`,
      }}
    />
  )
}

export default function Navigation() {
  const [collapsed, setCollapsed] = useState(false)
  const { profile, growthState, reset } = useApp()
  const navigate = useNavigate()

  const handleReset = () => {
    if (window.confirm('Reset all your data and start fresh?')) {
      reset()
      navigate('/onboarding')
    }
  }

  return (
    <motion.nav
      animate={{ width: collapsed ? 72 : 240 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        background: 'rgba(17, 17, 20, 0.95)',
        borderRight: '1px solid rgba(255,255,255,0.06)',
        backdropFilter: 'blur(20px)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 100,
        overflow: 'hidden',
      }}
    >
      {/* Logo */}
      <div style={{
        padding: collapsed ? '20px 0' : '24px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        justifyContent: collapsed ? 'center' : 'flex-start',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          background: 'linear-gradient(135deg, #10B981, #059669)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          boxShadow: '0 4px 12px rgba(16,185,129,0.3)',
        }}>
          <Leaf size={18} color="white" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.15 }}
              style={{
                fontFamily: 'DM Serif Display, serif',
                fontSize: 20,
                color: 'rgba(255,255,255,0.95)',
                letterSpacing: '-0.5px',
              }}
            >
              BECOME
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* User Info */}
      {profile && (
        <div style={{
          padding: collapsed ? '16px 0' : '16px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          justifyContent: collapsed ? 'center' : 'flex-start',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}>
          <div style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #8B5CF6, #7C3AED)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            fontSize: 13,
            fontWeight: 600,
            color: 'white',
          }}>
            {(profile.name || 'U')[0].toUpperCase()}
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.9)' }}>
                  {profile.name || 'Explorer'}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                  <MomentumDot momentum={growthState?.momentum} />
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', textTransform: 'capitalize' }}>
                    {growthState?.momentum || 'medium'} momentum
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Nav Items */}
      <div style={{ flex: 1, padding: '12px 0', overflowY: 'auto' }}>
        {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: collapsed ? '12px 0' : '11px 20px',
              justifyContent: collapsed ? 'center' : 'flex-start',
              margin: '2px 8px',
              borderRadius: 10,
              textDecoration: 'none',
              transition: 'all 0.15s ease',
              background: isActive ? 'rgba(16,185,129,0.1)' : 'transparent',
              color: isActive ? '#10B981' : 'rgba(255,255,255,0.5)',
              borderLeft: isActive && !collapsed ? '2px solid #10B981' : '2px solid transparent',
            })}
          >
            {({ isActive }) => (
              <>
                <Icon size={18} strokeWidth={isActive ? 2 : 1.5} style={{ flexShrink: 0 }} />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      style={{ fontSize: 14, fontWeight: isActive ? 600 : 400 }}
                    >
                      {label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </>
            )}
          </NavLink>
        ))}
      </div>

      {/* Trust Score */}
      {growthState && !collapsed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            margin: '0 12px 12px',
            padding: '12px',
            background: 'rgba(255,255,255,0.03)',
            borderRadius: 10,
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Trust Score
            </span>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#10B981' }}>
              {growthState.trustScore}
            </span>
          </div>
          <div className="progress-track">
            <div
              className="progress-fill progress-emerald"
              style={{ width: `${growthState.trustScore}%` }}
            />
          </div>
        </motion.div>
      )}

      {/* Bottom Actions */}
      <div style={{
        padding: collapsed ? '12px 0' : '12px',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        justifyContent: collapsed ? 'center' : 'space-between',
        alignItems: 'center',
        gap: 8,
      }}>
        {!collapsed && (
          <button
            onClick={handleReset}
            title="Reset data"
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(255,255,255,0.3)',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: 6,
              display: 'flex',
              alignItems: 'center',
              transition: 'color 0.15s',
            }}
            onMouseEnter={e => e.target.style.color = '#F43F5E'}
            onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.3)'}
          >
            <RotateCcw size={14} />
          </button>
        )}
        <button
          onClick={() => setCollapsed(c => !c)}
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 8,
            color: 'rgba(255,255,255,0.5)',
            cursor: 'pointer',
            padding: '6px 8px',
            display: 'flex',
            alignItems: 'center',
            transition: 'all 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.09)'; e.currentTarget.style.color = 'rgba(255,255,255,0.9)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)' }}
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>
    </motion.nav>
  )
}
