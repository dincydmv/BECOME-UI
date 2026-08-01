/**
 * Navigation.jsx — Light Off-White Sidebar (Exact Match to User Screenshot)
 */

import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, Clock, BookOpen, Target, Library, Map, User,
  ChevronLeft, ChevronRight, RotateCcw, ArrowLeft, CheckSquare
} from 'lucide-react'
import { useApp } from '../store/AppContext.jsx'
import { useBackToHome } from '../PvtAgentApp.jsx'

const NAV_ITEMS = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/session',   icon: Clock,           label: "Today's Session" },
  { to: '/journey',   icon: BookOpen,        label: 'Journey' },
  { to: '/curator',   icon: Target,          label: 'Curator' },
  { to: '/library',   icon: Library,         label: 'Library' },
  { to: '/roadmap',   icon: Map,             label: 'Roadmap' },
  { to: '/profile',   icon: User,            label: 'Profile' },
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

  const userName = profile?.name || 'NEha'

  return (
    <motion.nav
      animate={{ width: collapsed ? 72 : 240 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
      style={{
        position: 'fixed', top: 0, left: 0, height: '100vh',
        backgroundColor: '#FAF8F5',
        borderRight: '1px solid #E8E5DF',
        display: 'flex', flexDirection: 'column',
        zIndex: 100, overflow: 'hidden',
        boxSizing: 'border-box'
      }}
    >
      {/* Brand Logo Header */}
      <div style={{
        padding: collapsed ? '24px 0 16px' : '32px 28px 20px',
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
                fontSize: 26,
                fontWeight: 900,
                color: '#111111',
                letterSpacing: '-0.8px',
                textTransform: 'uppercase'
              }}>
                BECOME
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* User Avatar & Info Section */}
      <div style={{
        padding: collapsed ? '12px 0 16px' : '12px 28px 20px',
        display: 'flex', alignItems: 'center', gap: 14,
        justifyContent: collapsed ? 'center' : 'flex-start',
      }}>
        <div style={{
          width: 40, height: 40, borderRadius: '50%',
          backgroundColor: '#111111',
          color: '#FFFFFF',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, fontSize: 15, fontWeight: 700,
        }}>
          {userName[0]?.toUpperCase() || 'N'}
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#111111', lineHeight: 1.2 }}>
                {userName}
              </div>
              <div style={{ fontSize: 12, color: '#777777', marginTop: 2, fontWeight: 400 }}>
                Growth Curator
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Nav Items List */}
      <div style={{ flex: 1, padding: '8px 16px', overflowY: 'auto' }}>
        {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: 14,
              padding: collapsed ? '12px 0' : '12px 18px',
              justifyContent: collapsed ? 'center' : 'flex-start',
              margin: '4px 0', borderRadius: 14,
              textDecoration: 'none', transition: 'all 0.18s ease',
              background: isActive ? '#EFECE6' : 'transparent',
              color: isActive ? '#111111' : '#333333',
              fontWeight: isActive ? 700 : 500,
              fontSize: 14,
            })}
          >
            {({ isActive }) => (
              <>
                <div style={{
                  width: 22, height: 22,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {isActive ? (
                    <div style={{
                      width: 20, height: 20, borderRadius: 6, backgroundColor: '#111111',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF'
                    }}>
                      <Icon size={12} strokeWidth={2.5} />
                    </div>
                  ) : (
                    <Icon size={18} strokeWidth={1.8} style={{ color: '#222222' }} />
                  )}
                </div>
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

      {/* Bottom Footer Actions */}
      <div style={{
        padding: collapsed ? '12px 0' : '14px 20px',
        borderTop: '1px solid #E8E5DF',
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
              padding: '6px 12px',
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
