/**
 * AgentThinking.jsx — Animated "agent is reasoning" overlay
 */

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, Sparkles } from 'lucide-react'

export default function AgentThinking({ steps = [], onComplete }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!steps.length) return

    let idx = 0
    const advance = () => {
      if (idx >= steps.length) {
        setDone(true)
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
      gap: 40,
      padding: '40px 20px',
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
            border: '1.5px dashed rgba(16,185,129,0.3)',
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
            border: '1.5px dashed rgba(139,92,246,0.3)',
          }}
        />
        {/* Core */}
        <motion.div
          animate={{
            boxShadow: [
              '0 0 20px rgba(16,185,129,0.3)',
              '0 0 50px rgba(16,185,129,0.5)',
              '0 0 20px rgba(16,185,129,0.3)',
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            position: 'absolute',
            inset: 28,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(16,185,129,0.2), rgba(139,92,246,0.2))',
            border: '1px solid rgba(16,185,129,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Brain size={24} color="#10B981" />
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
              background: ['#10B981', '#8B5CF6', '#F59E0B'][i],
              transform: 'translateX(-50%)',
              boxShadow: `0 0 6px ${['#10B981', '#8B5CF6', '#F59E0B'][i]}`,
            }} />
          </motion.div>
        ))}
      </div>

      {/* Title */}
      <div style={{ textAlign: 'center' }}>
        <h2 style={{
          fontFamily: 'DM Serif Display, serif',
          fontSize: 28,
          color: 'rgba(255,255,255,0.9)',
          marginBottom: 8,
        }}>
          Curating Your Growth Path
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>
          Analyzing your journey • Selecting the right content • Crafting your recommendations
        </p>
      </div>

      {/* Steps */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        width: '100%',
        maxWidth: 420,
      }}>
        {steps.map((step, idx) => (
          <AnimatePresence key={idx}>
            {idx <= currentStep && (
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '10px 14px',
                  borderRadius: 10,
                  background: idx === currentStep
                    ? 'rgba(16,185,129,0.1)'
                    : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${idx === currentStep ? 'rgba(16,185,129,0.3)' : 'rgba(255,255,255,0.06)'}`,
                }}
              >
                {idx < currentStep ? (
                  <div style={{
                    width: 18,
                    height: 18,
                    borderRadius: '50%',
                    background: 'rgba(16,185,129,0.2)',
                    border: '1.5px solid #10B981',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <svg width="10" height="10" viewBox="0 0 10 10">
                      <path d="M2 5l2.5 2.5L8 3" stroke="#10B981" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                ) : (
                  <div style={{ display: 'flex', gap: 3, flexShrink: 0 }}>
                    {[0, 1, 2].map(d => (
                      <div key={d} className="thinking-dot" style={{
                        width: 4,
                        height: 4,
                        borderRadius: '50%',
                        background: '#10B981',
                      }} />
                    ))}
                  </div>
                )}
                <span style={{
                  fontSize: 13,
                  color: idx === currentStep ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.4)',
                  fontWeight: idx === currentStep ? 500 : 400,
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
