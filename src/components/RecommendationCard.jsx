/**
 * RecommendationCard.jsx — Premium recommendation card with in-app YouTube Player
 * Styled in crisp black text and black accent icons matching light off-white theme.
 */

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Play, Headphones, BookOpen, FileText,
  ChevronDown, ChevronUp, CheckCircle2, XCircle,
  ExternalLink, Sparkles, Clock, Target, Zap
} from 'lucide-react'

const TYPE_CONFIG = {
  Video: { icon: Play, label: 'Video' },
  Podcast: { icon: Headphones, label: 'Podcast' },
  Book: { icon: BookOpen, label: 'Book' },
  Article: { icon: FileText, label: 'Article' },
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
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: completed || skipped ? 0 : 1,
        y: 0,
        scale: completed ? 0.98 : skipped ? 0.96 : 1,
      }}
      transition={{ delay: index * 0.1, duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
      style={{
        background: '#FFFFFF',
        border: '1px solid #E8E5DF',
        borderRadius: 24,
        overflow: 'hidden',
        boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
      }}
    >
      {/* IN-APP EMBEDDED YOUTUBE PLAYER */}
      {ytId && (
        <div style={{
          position: 'relative',
          width: '100%',
          paddingBottom: '56.25%', // 16:9 Aspect Ratio
          background: '#111111',
          borderBottom: '1px solid #E8E5DF',
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
      <div style={{ padding: '24px 28px 22px' }}>
        {/* Top badges & duration */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginBottom: 14 }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              background: '#111111',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 11,
              fontWeight: 700,
              color: '#FFFFFF',
              flexShrink: 0,
            }}>
              {index + 1}
            </span>
            <span style={{
              padding: '4px 10px',
              borderRadius: 999,
              fontSize: 11,
              fontWeight: 700,
              background: '#FAFAFA',
              border: '1px solid #E0DDD6',
              color: '#111111',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
            }}>
              <IntIcon size={11} />
              {rec.type}
            </span>
            <span style={{
              padding: '4px 10px',
              borderRadius: 999,
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
              background: '#111111',
              color: '#FFFFFF',
            }}>
              {interventionType || 'LEARN'}
            </span>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            color: '#777777',
            fontSize: 12,
            fontWeight: 500,
            flexShrink: 0,
          }}>
            <Clock size={13} />
            {rec.duration}
          </div>
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: 'Inter, -apple-system, sans-serif',
          fontSize: 22,
          fontWeight: 800,
          color: '#111111',
          lineHeight: 1.3,
          marginBottom: 6,
          letterSpacing: '-0.3px',
        }}>
          {rec.title}
        </h3>

        {/* Creator / Source */}
        <p style={{ fontSize: 13, color: '#666666', marginBottom: 16 }}>
          by {rec.creator} · {rec.source}
        </p>

        {/* Key Insight */}
        <div style={{
          padding: '14px 18px',
          background: '#FAFAFA',
          border: '1px solid #E0DDD6',
          borderRadius: 14,
          marginBottom: 18,
        }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <Sparkles size={16} color="#111111" style={{ flexShrink: 0, marginTop: 2 }} />
            <p style={{ fontSize: 13, color: '#222222', fontStyle: 'italic', lineHeight: 1.5, margin: 0 }}>
              "{rec.keyInsight}"
            </p>
          </div>
        </div>

        {/* Expandable rationale button */}
        <button
          onClick={() => setExpanded(e => !e)}
          type="button"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: 'none',
            border: 'none',
            color: '#444444',
            cursor: 'pointer',
            fontSize: 13,
            fontWeight: 600,
            padding: 0,
            marginBottom: expanded ? 16 : 0,
          }}
        >
          <span>{expanded ? 'Hide Curator Analysis' : 'Why This & Why Now'}</span>
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>

        {/* Expanded Analysis */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{
                padding: '16px',
                background: '#FAFAFA',
                border: '1px solid #E0DDD6',
                borderRadius: 14,
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                fontSize: 13,
                marginBottom: 20,
              }}>
                <div>
                  <div style={{ fontSize: 10, fontFamily: 'monospace', fontWeight: 700, color: '#888888', textTransform: 'uppercase', marginBottom: 4 }}>
                    WHY THIS (IDENTITY FIT)
                  </div>
                  <p style={{ color: '#333333', lineHeight: 1.5, margin: 0 }}>
                    {rec.whyThis}
                  </p>
                </div>

                <div>
                  <div style={{ fontSize: 10, fontFamily: 'monospace', fontWeight: 700, color: '#888888', textTransform: 'uppercase', marginBottom: 4 }}>
                    WHY NOW (GROWTH MOMENT)
                  </div>
                  <p style={{ color: '#333333', lineHeight: 1.5, margin: 0 }}>
                    {rec.whyNow}
                  </p>
                </div>

                <div>
                  <div style={{ fontSize: 10, fontFamily: 'monospace', fontWeight: 700, color: '#888888', textTransform: 'uppercase', marginBottom: 4 }}>
                    EXPECTED BEHAVIOR OUTCOME
                  </div>
                  <p style={{ color: '#111111', fontWeight: 600, lineHeight: 1.5, margin: 0 }}>
                    {rec.expectedOutcome}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: 16,
          borderTop: '1px solid #F0EDE6',
          marginTop: 16,
        }}>
          <div style={{ display: 'flex', gap: 10 }}>
            <button
              onClick={handleComplete}
              type="button"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '10px 20px',
                backgroundColor: '#111111',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: 999,
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              }}
            >
              <CheckCircle2 size={15} />
              Complete Session
            </button>

            <button
              onClick={handleSkip}
              type="button"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '10px 18px',
                backgroundColor: '#FFFFFF',
                color: '#666666',
                border: '1px solid #E0DDD6',
                borderRadius: 999,
                fontSize: 13,
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              <XCircle size={15} />
              Skip
            </button>
          </div>

          <a
            href={rec.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              color: '#111111',
              fontSize: 12,
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            Open Link <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </motion.div>
  )
}
