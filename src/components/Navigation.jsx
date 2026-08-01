/**
 * Navigation.jsx — Light Off-White Sidebar (Matches Screenshot #4)
 */

import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, PlayCircle, BookOpen, ChevronLeft, ChevronRight,
  RotateCcw, ArrowLeft
} from 'lucide-react'
import { useApp } from '../store/AppContext.jsx'
import { useBackToHome } from '../PvtAgentApp.jsx'

const NAV_ITEMS = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/session',   icon: PlayCircle,       label: "Today's Session" },
  { to: '/journey',   icon: BookOpen,         label: 'My Journey' },
]

export default function Navigation() {
  const [collapsed, setCollapsed] = useState(false)
  const { profile, reset } = useApp()
  const navigate = useNavigate()
  const backToHome = useBackToHome()

  const handleReset = () => {
    if (window.confirm('Reset all your data and start fresh?')) {
      reset()
      navigate('/onboarding')
    }
  }

  const userName = profile?.name || 'neha'

  return (
    <motion.nav
      animate={{ width: collapsed ? 72 : 240 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
      style={{
        position: 'fixed', top: 0, left: 0, height: '100vh',
        backgroundColor: '#F8F6F2',
        borderRight: '1px solid #E5E2DC',
        display: 'flex', flexDirection: 'column',
        zIndex: 100, overflow: 'hidden',
        boxSizing: 'border-box'
      }}
    >
      {/* Brand Logo */}
      <div style={{
        padding: collapsed ? '20px 0' : '24px 24px 16px',
        display: 'flex', alignItems: 'center', gap: 10,
        justifyContent: collapsed ? 'center' : 'flex-start',
      }}>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.15 }}
            >
              <span style={{
                fontFamily: 'Inter, -apple-system, sans-serif',
                fontSize: 22,
                fontWeight: 900,
                color: '#111111',
                letterSpacing: '-0.5px',
                textTransform: 'uppercase'
              }}>
                BECOME
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* User Info Header */}
      {profile && (
        <div style={{
          padding: collapsed ? '12px 0' : '16px 24px',
          display: 'flex', alignItems: 'center', gap: 12,
          justifyContent: collapsed ? 'center' : 'flex-start',
          marginBottom: 8,
        }}>
          <div style={{
            width: 34, height: 34, borderRadius: '50%',
            backgroundColor: '#111111',
            color: '#FFFFFF',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0, fontSize: 14, fontWeight: 700,
          }}>
            {userName[0].toUpperCase()}
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#111111', lineHeight: 1.2 }}>
                  {userName}
                </div>
                <div style={{ fontSize: 11, color: '#777777', marginTop: 2 }}>
                  Growth Curator
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Nav Links */}
      <div style={{ flex: 1, padding: '8px 12px', overflowY: 'auto' }}>
        {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: 12,
              padding: collapsed ? '12px 0' : '11px 16px',
              justifyContent: collapsed ? 'center' : 'flex-start',
              margin: '3px 0', borderRadius: 12,
              textDecoration: 'none', transition: 'all 0.18s ease',
              background: isActive ? '#FFFFFF' : 'transparent',
              color: isActive ? '#111111' : '#666666',
              boxShadow: isActive ? '0 2px 8px rgba(0,0,0,0.04)' : 'none',
              border: isActive ? '1px solid #E5E2DC' : '1px solid transparent',
              fontWeight: isActive ? 600 : 500,
              fontSize: 13,
            })}
          >
            {({ isActive }) => (
              <>
                <Icon size={17} strokeWidth={isActive ? 2.2 : 1.7} style={{ flexShrink: 0, color: isActive ? '#111111' : '#777777' }} />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                      {label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </>
            )}
          </NavLink>
        ))}
      </div>

      {/* AI Curator Badge Box at Bottom Left */}
      {!collapsed && (
        <div style={{ padding: '0 16px 16px', position: 'relative' }}>
          <div style={{
            position: 'relative',
            padding: '12px',
            backgroundColor: '#FFFFFF',
            border: '1px solid #E5E2DC',
            borderRadius: 14,
            boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#111111' }}>AI Curator</span>
              <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#10B981' }} />
            </div>
            <p style={{ fontSize: 10, color: '#777777', margin: 0, lineHeight: 1.4 }}>
              Always learning.<br/>Always with you.
            </p>
          </div>
        </div>
      )}

      {/* Bottom Footer Actions */}
      <div style={{
        padding: collapsed ? '12px 0' : '12px 16px',
        borderTop: '1px solid #E5E2DC',
        display: 'flex',
        justifyContent: collapsed ? 'center' : 'space-between',
        alignItems: 'center',
        gap: 8,
      }}>
        {!collapsed && (
          <button
            onClick={backToHome}
            type="button"
            style={{
              background: '#FFFFFF',
              border: '1px solid #E0DDD6',
              borderRadius: 8,
              color: '#333333',
              cursor: 'pointer',
              padding: '6px 10px',
              display: 'flex', alignItems: 'center', gap: 6,
              fontSize: 12, fontWeight: 600,
              transition: 'all 0.15s',
            }}
          >
            <ArrowLeft size={13} /> Home
          </button>
        )}

        {!collapsed && (
          <button onClick={handleReset} title="Reset data" type="button" style={{
            background: 'none', border: 'none', color: '#999999',
            cursor: 'pointer', padding: '6px', borderRadius: 6,
            display: 'flex', alignItems: 'center', transition: 'color 0.15s',
          }}
          onMouseEnter={e => e.target.style.color = '#F43F5E'}
          onMouseLeave={e => e.target.style.color = '#999999'}
          >
            <RotateCcw size={14} />
          </button>
        )}

        <button
          onClick={() => setCollapsed(c => !c)}
          type="button"
          style={{
            background: '#FFFFFF',
            border: '1px solid #E0DDD6',
            borderRadius: 8,
            color: '#555555',
            cursor: 'pointer', padding: '6px 8px',
            display: 'flex', alignItems: 'center', transition: 'all 0.15s',
          }}
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>
    </motion.nav>
  )
}
