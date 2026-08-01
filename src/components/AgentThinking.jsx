/**
 * AgentThinking.jsx — Animated "agent is reasoning" overlay
 * Styled in crisp black text and black accent icons matching light off-white theme.
 */

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain } from 'lucide-react'

export default function AgentThinking({ steps = [], onComplete }) {
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    if (!steps.length) return

    let idx = 0
    const advance = () => {
      if (idx >= steps.length) {
        setTimeout(() => onComplete?.(), 400)
        return
      }
      setCurrentStep(idx)
      const delay = steps[idx]?.duration || 700
      idx++
      setTimeout(advance, delay)
    }

    advance()
  }, [steps])

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      gap: 36,
      padding: '40px 20px',
      color: '#111111',
    }}>
      {/* Animated orb */}
      <div style={{ position: 'relative', width: 120, height: 120 }}>
        {/* Outer ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '1.5px dashed rgba(17,17,17,0.3)',
          }}
        />
        {/* Middle ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            inset: 16,
            borderRadius: '50%',
            border: '1.5px dashed rgba(17,17,17,0.2)',
          }}
        />
        {/* Core */}
        <motion.div
          animate={{
            boxShadow: [
              '0 0 20px rgba(0,0,0,0.06)',
              '0 0 35px rgba(0,0,0,0.12)',
              '0 0 20px rgba(0,0,0,0.06)',
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            position: 'absolute',
            inset: 28,
            borderRadius: '50%',
            background: '#FFFFFF',
            border: '1.5px solid #111111',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Brain size={26} color="#111111" />
        </motion.div>

        {/* Orbiting dots */}
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            animate={{ rotate: 360 }}
            transition={{ duration: 3 + i, repeat: Infinity, ease: 'linear', delay: i * 0.5 }}
            style={{
              position: 'absolute',
              inset: 4 + i * 6,
              borderRadius: '50%',
            }}
          >
            <div style={{
              position: 'absolute',
              top: 0,
              left: '50%',
              width: 6 - i,
              height: 6 - i,
              borderRadius: '50%',
              background: '#111111',
              transform: 'translateX(-50%)',
            }} />
          </motion.div>
        ))}
      </div>

      {/* Title */}
      <div style={{ textAlign: 'center' }}>
        <h2 style={{
          fontFamily: 'Inter, -apple-system, sans-serif',
          fontSize: 26,
          fontWeight: 800,
          color: '#111111',
          marginBottom: 8,
          letterSpacing: '-0.5px'
        }}>
          Curating Your Growth Path
        </h2>
        <p style={{ color: '#555555', fontSize: 14, margin: 0 }}>
          Analyzing your journey • Selecting the right content • Crafting your recommendations
        </p>
      </div>

      {/* Steps List */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        width: '100%',
        maxWidth: 460,
      }}>
        {steps.map((step, idx) => (
          <AnimatePresence key={idx}>
            {idx <= currentStep && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '12px 16px',
                  borderRadius: 14,
                  background: idx === currentStep ? '#FFFFFF' : '#FAFAFA',
                  border: `1.5px solid ${idx === currentStep ? '#111111' : '#E8E5DF'}`,
                  boxShadow: idx === currentStep ? '0 4px 12px rgba(0,0,0,0.04)' : 'none',
                }}
              >
                {idx < currentStep ? (
                  <div style={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    background: '#111111',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <svg width="10" height="10" viewBox="0 0 10 10">
                      <path d="M2 5l2.5 2.5L8 3" stroke="#FFFFFF" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                ) : (
                  <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
                    {[0, 1, 2].map(d => (
                      <div key={d} className="thinking-dot" style={{
                        width: 5,
                        height: 5,
                        borderRadius: '50%',
                        background: '#111111',
                      }} />
                    ))}
                  </div>
                )}
                <span style={{
                  fontSize: 13,
                  color: '#111111',
                  fontWeight: idx === currentStep ? 600 : 500,
                  lineHeight: 1.4,
                }}>
                  {step.step}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        ))}
      </div>
    </div>
  )
}
