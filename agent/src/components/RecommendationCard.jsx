/**
 * RecommendationCard.jsx — Premium recommendation card with in-app YouTube Player
 */

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Play, Headphones, BookOpen, FileText,
  ChevronDown, ChevronUp, CheckCircle2, XCircle,
  ExternalLink, Sparkles, Clock, Target, Zap
} from 'lucide-react'

const TYPE_CONFIG = {
  Video: { icon: Play, color: '#F43F5E', badge: 'badge-rose', label: 'Video' },
  Podcast: { icon: Headphones, color: '#8B5CF6', badge: 'badge-violet', label: 'Podcast' },
  Book: { icon: BookOpen, color: '#F59E0B', badge: 'badge-amber', label: 'Book' },
  Article: { icon: FileText, color: '#38BDF8', badge: 'badge-sky', label: 'Article' },
}

const INTERVENTION_CONFIG = {
  LEARN: { color: '#38BDF8', label: 'LEARN' },
  REFLECT: { color: '#8B5CF6', label: 'REFLECT' },
  ACT: { color: '#10B981', label: 'ACT' },
  CONNECT: { color: '#F59E0B', label: 'CONNECT' },
}

const extractYoutubeId = (rec) => {
  if (rec.youtubeId) return rec.youtubeId
  if (!rec.url) return null
  const match = rec.url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/)
  return match ? match[1] : null
}

export default function RecommendationCard({
  rec,
  index = 0,
  onComplete,
  onSkip,
  interventionType,
}) {
  const [expanded, setExpanded] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [skipped, setSkipped] = useState(false)

  const typeConfig = TYPE_CONFIG[rec.type] || TYPE_CONFIG.Video
  const IntIcon = typeConfig.icon
  const intConfig = INTERVENTION_CONFIG[interventionType] || INTERVENTION_CONFIG.LEARN
  const ytId = extractYoutubeId(rec)

  const handleComplete = () => {
    setCompleted(true)
    setTimeout(() => onComplete?.(rec), 400)
  }

  const handleSkip = () => {
    setSkipped(true)
    setTimeout(() => onSkip?.(rec), 400)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{
        opacity: completed || skipped ? 0 : 1,
        y: 0,
        scale: completed ? 0.98 : skipped ? 0.96 : 1,
      }}
      transition={{ delay: index * 0.1, duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: `1px solid ${completed ? 'rgba(16,185,129,0.4)' : 'rgba(255,255,255,0.08)'}`,
        borderRadius: 20,
        overflow: 'hidden',
        transition: 'border-color 0.3s',
      }}
    >
      {/* IN-APP EMBEDDED YOUTUBE PLAYER */}
      {ytId && (
        <div style={{
          position: 'relative',
          width: '100%',
          paddingBottom: '56.25%', // 16:9 Aspect Ratio
          background: '#000',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}>
          <iframe
            src={`https://www.youtube.com/embed/${ytId}?rel=0&modestbranding=1`}
            title={rec.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 'none',
            }}
          />
        </div>
      )}

      {/* Card Header & Content */}
      <div style={{ padding: '24px 24px 20px' }}>
        {/* Top badges & duration */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 14 }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.08)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 11,
              fontWeight: 700,
              color: 'rgba(255,255,255,0.4)',
              flexShrink: 0,
            }}>
              {index + 1}
            </span>
            <span className={`badge ${typeConfig.badge}`}>
              <IntIcon size={10} />
              {rec.type}
            </span>
            <span style={{
              padding: '3px 8px',
              borderRadius: 999,
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
              background: `rgba(${intConfig.color === '#38BDF8' ? '56,189,248' : intConfig.color === '#8B5CF6' ? '139,92,246' : intConfig.color === '#10B981' ? '16,185,129' : '245,158,11'},0.1)`,
              color: intConfig.color,
              border: `1px solid ${intConfig.color}33`,
            }}>
              {intConfig.label}
            </span>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            color: 'rgba(255,255,255,0.35)',
            fontSize: 12,
            flexShrink: 0,
          }}>
            <Clock size={12} />
            {rec.duration}
          </div>
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: 'DM Serif Display, serif',
          fontSize: 22,
          color: 'rgba(255,255,255,0.95)',
          lineHeight: 1.3,
          marginBottom: 6,
        }}>
          {rec.title}
        </h3>

        {/* Creator / Source */}
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 14 }}>
          by {rec.creator} · {rec.source}
        </p>

        {/* Key Insight */}
        <div style={{
          padding: '12px 16px',
          background: 'rgba(16,185,129,0.06)',
          border: '1px solid rgba(16,185,129,0.15)',
          borderRadius: 12,
          marginBottom: 16,
        }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
            <Sparkles size={15} color="#10B981" style={{ flexShrink: 0, marginTop: 2 }} />
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', fontStyle: 'italic', lineHeight: 1.5 }}>
              "{rec.keyInsight}"
            </p>
          </div>
        </div>

        {/* Expandable rationale button */}
        <button
          onClick={() => setExpanded(e => !e)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: 'none',
            border: 'none',
            color: 'rgba(255,255,255,0.45)',
            cursor: 'pointer',
            fontSize: 13,
            padding: 0,
            transition: 'color 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.85)'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.45)'}
        >
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          {expanded ? 'Hide Rationale' : 'Why this? Why now? Expected outcome'}
        </button>
      </div>

      {/* Expandable rationale section */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{
              padding: '0 24px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
            }}>
              <div style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />

              {/* Why this */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                  <Target size={13} color="#10B981" />
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#10B981', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Why this?
                  </span>
                </div>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.6 }}>
                  {rec.whyThis}
                </p>
              </div>

              {/* Why now */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                  <Zap size={13} color="#F59E0B" />
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#F59E0B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Why now?
                  </span>
                </div>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.6 }}>
                  {rec.whyNow}
                </p>
              </div>

              {/* Expected outcome */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                  <CheckCircle2 size={13} color="#8B5CF6" />
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#8B5CF6', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Expected outcome
                  </span>
                </div>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.6 }}>
                  {rec.expectedOutcome}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action bar */}
      <div style={{
        padding: '14px 24px',
        background: 'rgba(255,255,255,0.02)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        flexWrap: 'wrap',
      }}>
        {/* Open on YouTube link */}
        <a
          href={rec.url || `https://www.youtube.com/watch?v=${ytId}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '8px 14px',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 8,
            color: 'rgba(255,255,255,0.7)',
            fontSize: 13,
            fontWeight: 500,
            textDecoration: 'none',
            transition: 'all 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(255,255,255,0.95)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)' }}
        >
          <ExternalLink size={13} />
          Open on YouTube
        </a>

        {/* Complete / Skip buttons */}
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={handleSkip}
            disabled={completed || skipped}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 14px',
              background: 'transparent',
              border: '1px solid rgba(244,63,94,0.25)',
              borderRadius: 8,
              color: skipped ? '#F43F5E' : 'rgba(244,63,94,0.6)',
              fontSize: 13,
              fontWeight: 500,
              cursor: completed || skipped ? 'default' : 'pointer',
              transition: 'all 0.15s',
              opacity: completed ? 0.3 : 1,
            }}
            onMouseEnter={e => { if (!completed && !skipped) { e.currentTarget.style.background = 'rgba(244,63,94,0.08)'; e.currentTarget.style.color = '#F43F5E' }}}
            onMouseLeave={e => { if (!completed && !skipped) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(244,63,94,0.6)' }}}
          >
            <XCircle size={13} />
            Skip
          </button>
          <button
            onClick={handleComplete}
            disabled={completed || skipped}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 16px',
              background: completed ? 'rgba(16,185,129,0.15)' : 'rgba(16,185,129,0.12)',
              border: `1px solid ${completed ? '#10B981' : 'rgba(16,185,129,0.4)'}`,
              borderRadius: 8,
              color: '#10B981',
              fontSize: 13,
              fontWeight: 600,
              cursor: completed || skipped ? 'default' : 'pointer',
              transition: 'all 0.15s',
              opacity: skipped ? 0.3 : 1,
            }}
            onMouseEnter={e => { if (!completed && !skipped) { e.currentTarget.style.background = 'rgba(16,185,129,0.2)' }}}
            onMouseLeave={e => { if (!completed && !skipped) { e.currentTarget.style.background = 'rgba(16,185,129,0.12)' }}}
          >
            <CheckCircle2 size={13} />
            {completed ? 'Completed ✓' : 'Mark Complete'}
          </button>
        </div>
      </div>
    </motion.div>
  )
}
