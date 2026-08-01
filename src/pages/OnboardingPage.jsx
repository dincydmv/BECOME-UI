/**
 * OnboardingPage.jsx — Multi-step onboarding experience
 */

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  ArrowRight, ArrowLeft, Check, Leaf, Sparkles,
  User, Target, Brain, Monitor
} from 'lucide-react'
import { useApp } from '../store/AppContext.jsx'
import { updateGrowthState } from '../services/storage.js'

// ─── STEP DEFINITIONS ────────────────────────────────────────────────────────

const CURRENT_TRAIT_OPTIONS = [
  'Procrastinator', 'Easily distracted', 'Inconsistent', 'Perfectionist',
  'People-pleaser', 'Overthinks decisions', 'Avoids discomfort', 'Impulsive',
  'Self-doubter', 'Reactive', 'Disorganized', 'Fear of failure',
]

const TARGET_TRAIT_OPTIONS = [
  'Disciplined', 'Deeply focused', 'Resilient', 'Consistent',
  'Confident', 'Creative', 'Purpose-driven', 'Calm under pressure',
  'Authentic', 'Growth-oriented', 'High-performer', 'Empathetic leader',
]

const LEARNING_STYLE_OPTIONS = [
  { id: 'visual', label: 'Visual', emoji: '👁️', desc: 'I learn by seeing — diagrams, videos, illustrations' },
  { id: 'auditory', label: 'Auditory', emoji: '🎧', desc: 'I learn by listening — podcasts, discussions' },
  { id: 'reading', label: 'Reading', emoji: '📖', desc: 'I learn by reading — books, articles, long-form' },
  { id: 'kinesthetic', label: 'Doing', emoji: '⚡', desc: 'I learn by applying — exercises, challenges, action' },
]

const MEDIA_OPTIONS = [
  { id: 'video', label: 'Short Videos', emoji: '🎬', desc: '5-20 minutes, visual, fast-paced' },
  { id: 'podcast', label: 'Podcasts', emoji: '🎙️', desc: 'Deep conversations, long-form audio' },
  { id: 'book', label: 'Books', emoji: '📚', desc: 'Comprehensive, structured learning' },
  { id: 'article', label: 'Articles', emoji: '✍️', desc: 'Quick reads, specific insights' },
]

const LENGTH_OPTIONS = [
  { id: 'short', label: 'Short', emoji: '⚡', desc: 'Under 15 minutes' },
  { id: 'medium', label: 'Medium', emoji: '🌿', desc: '15-45 minutes' },
  { id: 'long', label: 'Long', emoji: '🌊', desc: '45+ minutes, deep dives' },
]

// ─── STEP COMPONENTS ─────────────────────────────────────────────────────────

const TagCloud = ({ options, selected, onToggle, max = null }) => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
    {options.map(opt => {
      const isSelected = selected.includes(opt)
      const isDisabled = max && !isSelected && selected.length >= max
      return (
        <button
          key={opt}
          onClick={() => !isDisabled && onToggle(opt)}
          className={`tag-option ${isSelected ? 'selected' : ''}`}
          style={{ opacity: isDisabled ? 0.4 : 1, cursor: isDisabled ? 'not-allowed' : 'pointer' }}
        >
          {isSelected && <Check size={11} />}
          {opt}
        </button>
      )
    })}
  </div>
)

const CardGrid = ({ options, selected, onToggle, multi = false }) => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10 }}>
    {options.map(opt => {
      const isSelected = multi ? selected.includes(opt.id) : selected === opt.id
      return (
        <button
          key={opt.id}
          onClick={() => onToggle(opt.id)}
          style={{
            padding: '16px',
            background: isSelected ? 'rgba(16,185,129,0.1)' : 'rgba(255,255,255,0.04)',
            border: `1px solid ${isSelected ? 'rgba(16,185,129,0.5)' : 'rgba(255,255,255,0.08)'}`,
            borderRadius: 12,
            cursor: 'pointer',
            textAlign: 'left',
            transition: 'all 0.2s ease',
            position: 'relative',
          }}
        >
          {isSelected && (
            <div style={{
              position: 'absolute',
              top: 8,
              right: 8,
              width: 18,
              height: 18,
              borderRadius: '50%',
              background: '#10B981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Check size={10} color="white" />
            </div>
          )}
          <div style={{ fontSize: 20, marginBottom: 6 }}>{opt.emoji}</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: isSelected ? '#10B981' : 'rgba(255,255,255,0.85)', marginBottom: 4 }}>
            {opt.label}
          </div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', lineHeight: 1.4 }}>
            {opt.desc}
          </div>
        </button>
      )
    })}
  </div>
)

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

const STEPS = [
  { id: 'welcome', title: 'Welcome', icon: Leaf },
  { id: 'identity', title: 'Who You Are', icon: User },
  { id: 'target', title: 'Who You\'re Becoming', icon: Target },
  { id: 'goals', title: 'Your Goals', icon: Sparkles },
  { id: 'learning', title: 'How You Learn', icon: Brain },
  { id: 'media', title: 'What You Enjoy', icon: Monitor },
]

export default function OnboardingPage() {
  const navigate = useNavigate()
  const { saveProfile } = useApp()
  const [step, setStep] = useState(0)
  const [data, setData] = useState({
    name: '',
    currentTraits: [],
    targetTraits: [],
    goals: '',
    learningStyle: [],
    preferredMedia: [],
    contentLength: 'medium',
  })

  const update = (key, val) => setData(d => ({ ...d, [key]: val }))

  const toggleTrait = (key, val) => {
    setData(d => {
      const arr = d[key]
      return { ...d, [key]: arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val] }
    })
  }

  const canAdvance = () => {
    switch (step) {
      case 0: return data.name.trim().length >= 2
      case 1: return data.currentTraits.length >= 1
      case 2: return data.targetTraits.length >= 1
      case 3: return data.goals.trim().length >= 10
      case 4: return data.learningStyle.length >= 1
      case 5: return data.preferredMedia.length >= 1
      default: return true
    }
  }

  const handleNext = () => {
    if (step < STEPS.length - 1) {
      setStep(s => s + 1)
    } else {
      handleComplete()
    }
  }

  const handleComplete = () => {
    const profile = {
      ...data,
      currentTraits: data.currentTraits.join(', '),
      targetTraits: data.targetTraits.join(', '),
    }
    saveProfile(profile)
    updateGrowthState({ sessionCount: 0, lastInteraction: Date.now() })
    navigate('/dashboard')
  }

  const progressPct = ((step) / (STEPS.length - 1)) * 100

  return (
    <div className="gradient-hero" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ width: '100%', maxWidth: 600 }}>

        {/* Progress bar */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: 'linear-gradient(135deg, #10B981, #059669)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Leaf size={16} color="white" />
              </div>
              <span style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, color: 'rgba(255,255,255,0.95)', letterSpacing: '-0.3px' }}>
                Become
              </span>
              <span style={{ fontSize: 10, fontWeight: 700, fontFamily: 'monospace', padding: '2px 8px', borderRadius: 999, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.5)', letterSpacing: '1px', textTransform: 'uppercase' }}>
                AI
              </span>
            </div>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>
              Step {step + 1} of {STEPS.length}
            </span>
          </div>
          <div className="progress-track">
            <motion.div
              className="progress-fill progress-emerald"
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>

          {/* Step dots */}
          <div style={{ display: 'flex', gap: 6, marginTop: 10, justifyContent: 'center' }}>
            {STEPS.map((s, i) => (
              <div key={i} style={{
                width: i === step ? 20 : 6,
                height: 6,
                borderRadius: 3,
                background: i <= step ? '#10B981' : 'rgba(255,255,255,0.1)',
                transition: 'all 0.3s ease',
              }} />
            ))}
          </div>
        </div>

        {/* Step content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {/* Welcome */}
            {step === 0 && (
              <div style={{ textAlign: 'center', marginBottom: 32 }}>
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ fontSize: 64, marginBottom: 20 }}
                >
                  🌱
                </motion.div>
                <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 40, color: 'rgba(255,255,255,0.95)', marginBottom: 12 }}>
                  Your Growth Journey
                  <br />
                  <em style={{ color: '#10B981' }}>Starts Here</em>
                </h1>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 16, lineHeight: 1.6, maxWidth: 440, margin: '0 auto 32px' }}>
                  I'm your personal growth curator. I won't recommend what's popular — I'll recommend what's right for <em>you</em>, right now.
                </p>
                <div style={{ textAlign: 'left' }}>
                  <label style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', fontWeight: 500, display: 'block', marginBottom: 8 }}>
                    What should I call you?
                  </label>
                  <input
                    className="input-field"
                    placeholder="Your first name"
                    value={data.name}
                    onChange={e => update('name', e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && canAdvance() && handleNext()}
                    autoFocus
                    style={{ fontSize: 16 }}
                  />
                </div>
              </div>
            )}

            {/* Current traits */}
            {step === 1 && (
              <div style={{ marginBottom: 32 }}>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 32, color: 'rgba(255,255,255,0.95)', marginBottom: 8 }}>
                  Who are you <em style={{ color: '#F59E0B' }}>right now?</em>
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14, lineHeight: 1.6, marginBottom: 24 }}>
                  Honest self-awareness is the start of every transformation. Select the traits that honestly describe you today.
                </p>
                <TagCloud
                  options={CURRENT_TRAIT_OPTIONS}
                  selected={data.currentTraits}
                  onToggle={val => toggleTrait('currentTraits', val)}
                />
                {data.currentTraits.length > 0 && (
                  <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginTop: 12 }}>
                    {data.currentTraits.length} selected · There's no judgment here — only awareness.
                  </p>
                )}
              </div>
            )}

            {/* Target traits */}
            {step === 2 && (
              <div style={{ marginBottom: 32 }}>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 32, color: 'rgba(255,255,255,0.95)', marginBottom: 8 }}>
                  Who do you want to <em style={{ color: '#10B981' }}>become?</em>
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14, lineHeight: 1.6, marginBottom: 24 }}>
                  Every piece of content I recommend will bridge the gap between who you are and who you're becoming. Pick up to 5.
                </p>
                <TagCloud
                  options={TARGET_TRAIT_OPTIONS}
                  selected={data.targetTraits}
                  onToggle={val => toggleTrait('targetTraits', val)}
                  max={5}
                />
                {data.targetTraits.length > 0 && (
                  <div style={{
                    marginTop: 16,
                    padding: '12px 16px',
                    background: 'rgba(16,185,129,0.06)',
                    border: '1px solid rgba(16,185,129,0.15)',
                    borderRadius: 10,
                  }}>
                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', fontStyle: 'italic' }}>
                      "I am becoming {data.targetTraits.slice(0, 2).map(t => t.toLowerCase()).join(' and ')}{data.targetTraits.length > 2 ? '...' : '.'}"
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Goals */}
            {step === 3 && (
              <div style={{ marginBottom: 32 }}>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 32, color: 'rgba(255,255,255,0.95)', marginBottom: 8 }}>
                  What do you want to <em style={{ color: '#8B5CF6' }}>achieve?</em>
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14, lineHeight: 1.6, marginBottom: 24 }}>
                  Be specific. The more I know about what you're working toward, the more precisely I can curate your path.
                </p>
                <textarea
                  className="input-field"
                  placeholder="e.g. Build a daily writing habit and finish my book draft. Stop procrastinating on creative work. Become more focused and consistent in my work..."
                  value={data.goals}
                  onChange={e => update('goals', e.target.value)}
                  rows={4}
                  style={{ fontSize: 14 }}
                />
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', marginTop: 8 }}>
                  {data.goals.length} characters · minimum 10
                </p>
              </div>
            )}

            {/* Learning style */}
            {step === 4 && (
              <div style={{ marginBottom: 32 }}>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 32, color: 'rgba(255,255,255,0.95)', marginBottom: 8 }}>
                  How do you learn <em style={{ color: '#38BDF8' }}>best?</em>
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14, lineHeight: 1.6, marginBottom: 24 }}>
                  Select all that apply — most of us learn through multiple modalities.
                </p>
                <CardGrid
                  options={LEARNING_STYLE_OPTIONS}
                  selected={data.learningStyle}
                  onToggle={id => toggleTrait('learningStyle', id)}
                  multi
                />
              </div>
            )}

            {/* Media + length preference */}
            {step === 5 && (
              <div style={{ marginBottom: 32 }}>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 32, color: 'rgba(255,255,255,0.95)', marginBottom: 8 }}>
                  What content do you <em style={{ color: '#F43F5E' }}>enjoy?</em>
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>
                  Select your preferred formats (choose all that apply):
                </p>
                <CardGrid
                  options={MEDIA_OPTIONS}
                  selected={data.preferredMedia}
                  onToggle={id => toggleTrait('preferredMedia', id)}
                  multi
                />

                <div style={{ marginTop: 24 }}>
                  <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', marginBottom: 12 }}>
                    How long do you prefer content to be?
                  </p>
                  <div style={{ display: 'flex', gap: 10 }}>
                    {LENGTH_OPTIONS.map(opt => (
                      <button
                        key={opt.id}
                        onClick={() => update('contentLength', opt.id)}
                        style={{
                          flex: 1,
                          padding: '12px 8px',
                          background: data.contentLength === opt.id ? 'rgba(16,185,129,0.1)' : 'rgba(255,255,255,0.04)',
                          border: `1px solid ${data.contentLength === opt.id ? 'rgba(16,185,129,0.5)' : 'rgba(255,255,255,0.08)'}`,
                          borderRadius: 10,
                          cursor: 'pointer',
                          textAlign: 'center',
                          transition: 'all 0.2s',
                        }}
                      >
                        <div style={{ fontSize: 18, marginBottom: 4 }}>{opt.emoji}</div>
                        <div style={{ fontSize: 12, fontWeight: 600, color: data.contentLength === opt.id ? '#10B981' : 'rgba(255,255,255,0.7)' }}>
                          {opt.label}
                        </div>
                        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>
                          {opt.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: step > 0 ? 'space-between' : 'flex-end', alignItems: 'center', marginTop: 8 }}>
          {step > 0 && (
            <button
              onClick={() => setStep(s => s - 1)}
              className="btn-ghost"
            >
              <ArrowLeft size={16} />
              Back
            </button>
          )}
          <motion.button
            onClick={handleNext}
            disabled={!canAdvance()}
            className="btn-primary"
            whileHover={{ scale: canAdvance() ? 1.02 : 1 }}
            whileTap={{ scale: canAdvance() ? 0.98 : 1 }}
            style={{ opacity: canAdvance() ? 1 : 0.4, cursor: canAdvance() ? 'pointer' : 'not-allowed' }}
          >
            {step === STEPS.length - 1 ? (
              <>
                <Sparkles size={16} />
                Begin My Journey
              </>
            ) : (
              <>
                Continue
                <ArrowRight size={16} />
              </>
            )}
          </motion.button>
        </div>
      </div>
    </div>
  )
}
