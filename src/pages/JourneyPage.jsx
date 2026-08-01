/**
 * JourneyPage.jsx — User growth history & timeline
 */

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  BookOpen, CheckCircle2, XCircle, Clock,
  Sparkles, Award, ExternalLink, Filter
} from 'lucide-react'
import { useApp } from '../store/AppContext.jsx'
import PageTransition from '../components/PageTransition.jsx'

export default function JourneyPage() {
  const { history, growthState, profile } = useApp()
  const [filter, setFilter] = useState('all') // 'all' | 'completed' | 'skipped'

  const filteredHistory = history.filter(h => {
    if (filter === 'completed') return h.status === 'completed'
    if (filter === 'skipped') return h.status === 'skipped'
    return true
  })

  return (
    <PageTransition>
      <div className="page-inner">

        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 12px', background: 'rgba(139,92,246,0.12)', borderRadius: 999, fontSize: 12, color: '#8B5CF6', fontWeight: 600, marginBottom: 12 }}>
            <BookOpen size={13} />
            Identity Timeline
          </div>
          <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 36, color: 'rgba(255,255,255,0.95)', marginBottom: 8 }}>
            My Growth Journey
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 15 }}>
            A complete record of your interactions, completed content, and identity milestones.
          </p>
        </div>

        {/* Summary Banner */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: 12,
          marginBottom: 32,
        }}>
          <div style={{ padding: '20px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16 }}>
            <div style={{ fontSize: 32, fontFamily: 'DM Serif Display, serif', color: '#10B981', marginBottom: 4 }}>
              {growthState?.completedCount || 0}
            </div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Completed Items
            </div>
          </div>

          <div style={{ padding: '20px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16 }}>
            <div style={{ fontSize: 32, fontFamily: 'DM Serif Display, serif', color: '#F59E0B', marginBottom: 4 }}>
              {growthState?.trustScore || 50}
            </div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Current Trust Score
            </div>
          </div>

          <div style={{ padding: '20px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16 }}>
            <div style={{ fontSize: 32, fontFamily: 'DM Serif Display, serif', color: '#8B5CF6', marginBottom: 4 }}>
              {growthState?.consistency || 0}d
            </div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Active Streak
            </div>
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <h2 style={{ fontSize: 14, fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Recommendation Log
          </h2>

          <div style={{ display: 'flex', gap: 6 }}>
            {['all', 'completed', 'skipped'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: '6px 12px',
                  borderRadius: 8,
                  fontSize: 12,
                  fontWeight: 600,
                  border: '1px solid',
                  textTransform: 'capitalize',
                  cursor: 'pointer',
                  background: filter === f ? 'rgba(16,185,129,0.12)' : 'transparent',
                  borderColor: filter === f ? '#10B981' : 'rgba(255,255,255,0.08)',
                  color: filter === f ? '#10B981' : 'rgba(255,255,255,0.4)',
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline */}
        {filteredHistory.length === 0 ? (
          <div style={{
            padding: '48px 24px',
            textAlign: 'center',
            background: 'rgba(255,255,255,0.02)',
            border: '1px dashed rgba(255,255,255,0.08)',
            borderRadius: 16,
          }}>
            <Award size={32} color="rgba(255,255,255,0.2)" style={{ marginBottom: 12 }} />
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>
              No history found for filter "{filter}". Complete recommendations in a curation session to see them here!
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {filteredHistory.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                style={{
                  padding: '16px 20px',
                  background: 'rgba(255,255,255,0.03)',
                  border: `1px solid ${item.status === 'completed' ? 'rgba(16,185,129,0.2)' : 'rgba(255,255,255,0.06)'}`,
                  borderRadius: 14,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 16,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  {item.status === 'completed' ? (
                    <CheckCircle2 size={20} color="#10B981" style={{ flexShrink: 0 }} />
                  ) : (
                    <XCircle size={20} color="#F43F5E" style={{ flexShrink: 0 }} />
                  )}

                  <div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: 'rgba(255,255,255,0.9)', marginBottom: 2 }}>
                      {item.title}
                    </div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
                      {item.type} · by {item.creator} · {item.duration}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>
                    {new Date(item.loggedAt).toLocaleDateString()}
                  </span>

                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-icon"
                    title="Open resource"
                  >
                    <ExternalLink size={14} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </PageTransition>
  )
}
