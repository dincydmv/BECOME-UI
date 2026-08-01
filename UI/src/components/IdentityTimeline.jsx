import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Sparkles, BookOpen, Award, Layers, Flame, Code } from 'lucide-react';

export default function IdentityTimeline() {
  const [activeStep, setActiveStep] = useState(2); // Default to '90 Days'

  const milestones = [
    {
      id: 0,
      label: 'Current Self',
      subtitle: 'Baseline Identity',
      tag: 'Day 0',
      description: 'Initial assessment of cognitive strengths, goal clarity, and daily routines.',
      skills: ['Foundational Focus', 'Basic Time-Blocking', 'Topic Exploration'],
      habits: ['30m Daily Reading', 'Irregular Journaling', '8h Sleep Goal'],
      achievements: ['Onboarded to FutureSelf AI', 'Identity Audit Completed'],
      certifications: ['Personal Baseline Assessment'],
      books: ['Atomic Habits', 'Mindset'],
      projects: ['Personal Growth Plan v1.0'],
    },
    {
      id: 1,
      label: '30 Days',
      subtitle: 'Momentum Catalyst',
      tag: 'Day 30',
      description: 'First milestone of unbroken routine consistency and early habit compounding.',
      skills: ['First-Principles Thinking', 'Deep Work Pacing', 'Active Recall'],
      habits: ['6 AM Morning Protocol', '90m Deep Work Session', 'Evening Journaling'],
      achievements: ['30-Day Unbroken Streak', 'Cognitive Stamina +40%'],
      certifications: ['Deep Work Specialist Badge'],
      books: ['Deep Work', 'Thinking, Fast and Slow'],
      projects: ['Personal Knowledge Graph'],
    },
    {
      id: 2,
      label: '90 Days',
      subtitle: 'Identity Shift',
      tag: 'Day 90',
      description: 'Substantial neurological habit wiring and skill mastery breakthrough.',
      skills: ['Strategic Decision Frameworks', 'High-Leverage Execution', 'Public Speaking'],
      habits: ['Intermittent Fasting & Cold Plunge', 'Zero Distraction Phone Protocol', 'Weekly Review'],
      achievements: ['Published Technical Essay', 'Synthesized 12 Core Books'],
      certifications: ['Stanford Cognitive Architecture Certificate'],
      books: ['Principles by Ray Dalio', 'The Master Key System', 'High Output Management'],
      projects: ['Autonomous AI Workflow System', 'Thought Leadership Essay'],
    },
    {
      id: 3,
      label: '1 Year',
      subtitle: 'Domain Mastery',
      tag: 'Year 1',
      description: 'Complete transformation of career trajectory, mental clarity, and influence.',
      skills: ['Multidisciplinary Synthesis', 'Venture Creation', 'Executive Leadership'],
      habits: ['Polymath Learning Routine', 'Deep Creative Sabbaticals', 'Daily Bio-Optimizing'],
      achievements: ['Launched AI Growth Startup', 'Spoke at Global Tech Summit'],
      certifications: ['Advanced Prompt & AI Architecture Master'],
      books: ['Zero to One', 'Poor Charlie’s Almanack', 'Skin in the Game'],
      projects: ['FutureSelf AI Enterprise Platform', 'Personal Capital Fund'],
    },
    {
      id: 4,
      label: 'Future You',
      subtitle: 'Ultimate Identity',
      tag: 'Vision',
      description: 'Operating at peak human potential with effortless high-leverage impact.',
      skills: ['Visionary Leadership', 'Global System Design', 'Wisdom Synthesis'],
      habits: ['Unshakeable Mental Resilience', 'Continuous Lifelong Curiosity', 'Legacy Mentorship'],
      achievements: ['Impacted 100,000+ Minds', 'Published Bestselling Book'],
      certifications: ['Global Innovation Laureate'],
      books: ['Meditations by Marcus Aurelius', 'The Sovereign Individual', 'The Art of Learning'],
      projects: ['Global Open Human Potential Foundation'],
    },
  ];

  const currentMilestone = milestones[activeStep];

  return (
    <section id="roadmap" className="py-24 px-6 md:px-12 bg-[#F6F4EF] border-t border-black/10 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest font-mono text-[#6E6E6E] block mb-3">
            [ Section 04 • Identity Roadmap ]
          </span>
          <h2 className="font-display text-5xl md:text-7xl font-bold uppercase tracking-tight text-[#111111] mb-4">
            Built Around Your Future Identity
          </h2>
          <p className="font-body text-[#6E6E6E] text-base md:text-lg">
            Track how compounding micro-habits compound into extraordinary personal evolution.
          </p>
        </div>

        {/* Timeline Step Selector */}
        <div className="flex items-center justify-between overflow-x-auto pb-6 mb-12 border-b border-black/10 gap-4 no-scrollbar">
          {milestones.map((milestone, idx) => {
            const isActive = activeStep === idx;
            return (
              <button
                key={milestone.id}
                onClick={() => setActiveStep(idx)}
                className={`flex-1 min-w-[140px] text-left p-4 rounded-2xl transition-all duration-300 ${
                  isActive
                    ? 'bg-black text-[#F6F4EF] shadow-xl scale-105'
                    : 'bg-[#EBE7DF]/40 text-[#111111] hover:bg-[#EBE7DF]/80 border border-black/5'
                }`}
              >
                <span className={`text-[10px] font-mono uppercase tracking-widest block mb-1 ${isActive ? 'text-[#F6F4EF]/60' : 'text-[#6E6E6E]'}`}>
                  {milestone.tag}
                </span>
                <div className="font-editorial text-lg font-bold">{milestone.label}</div>
                <div className={`text-xs ${isActive ? 'text-[#F6F4EF]/80' : 'text-[#6E6E6E]'}`}>{milestone.subtitle}</div>
              </button>
            );
          })}
        </div>

        {/* Milestone Specs Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentMilestone.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="bg-[#EBE7DF]/60 rounded-3xl border border-black/15 p-6 md:p-10 shadow-xl"
          >
            {/* Top Overview Banner */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-black/10">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest px-3 py-1 bg-black text-white rounded-full">
                  Target Phase: {currentMilestone.label}
                </span>
                <h3 className="font-editorial text-3xl md:text-4xl font-bold text-[#111111] mt-3">
                  {currentMilestone.subtitle}
                </h3>
              </div>
              <p className="text-sm md:text-base text-[#6E6E6E] max-w-xl font-light">
                {currentMilestone.description}
              </p>
            </div>

            {/* 6 Category Grid Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Skills Card */}
              <div className="bg-[#F6F4EF] p-6 rounded-2xl border border-black/10 shadow-sm">
                <div className="flex items-center gap-2 mb-4 text-[#111111]">
                  <Sparkles className="w-5 h-5" />
                  <h4 className="font-editorial font-bold text-lg">Skills Acquired</h4>
                </div>
                <ul className="space-y-2">
                  {currentMilestone.skills.map((item) => (
                    <li key={item} className="text-xs font-medium text-[#111111] flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Habits Card */}
              <div className="bg-[#F6F4EF] p-6 rounded-2xl border border-black/10 shadow-sm">
                <div className="flex items-center gap-2 mb-4 text-[#111111]">
                  <Flame className="w-5 h-5 text-orange-600" />
                  <h4 className="font-editorial font-bold text-lg">Daily Habits</h4>
                </div>
                <ul className="space-y-2">
                  {currentMilestone.habits.map((item) => (
                    <li key={item} className="text-xs font-medium text-[#111111] flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Achievements Card */}
              <div className="bg-[#F6F4EF] p-6 rounded-2xl border border-black/10 shadow-sm">
                <div className="flex items-center gap-2 mb-4 text-[#111111]">
                  <Award className="w-5 h-5 text-amber-600" />
                  <h4 className="font-editorial font-bold text-lg">Achievements</h4>
                </div>
                <ul className="space-y-2">
                  {currentMilestone.achievements.map((item) => (
                    <li key={item} className="text-xs font-medium text-[#111111] flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Certifications Card */}
              <div className="bg-[#F6F4EF] p-6 rounded-2xl border border-black/10 shadow-sm">
                <div className="flex items-center gap-2 mb-4 text-[#111111]">
                  <Layers className="w-5 h-5" />
                  <h4 className="font-editorial font-bold text-lg font-serif">Certifications</h4>
                </div>
                <ul className="space-y-2">
                  {currentMilestone.certifications.map((item) => (
                    <li key={item} className="text-xs font-medium text-[#111111] flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Books Card */}
              <div className="bg-[#F6F4EF] p-6 rounded-2xl border border-black/10 shadow-sm">
                <div className="flex items-center gap-2 mb-4 text-[#111111]">
                  <BookOpen className="w-5 h-5" />
                  <h4 className="font-editorial font-bold text-lg">Core Reading</h4>
                </div>
                <ul className="space-y-2">
                  {currentMilestone.books.map((item) => (
                    <li key={item} className="text-xs font-medium text-[#111111] flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Projects Card */}
              <div className="bg-[#F6F4EF] p-6 rounded-2xl border border-black/10 shadow-sm">
                <div className="flex items-center gap-2 mb-4 text-[#111111]">
                  <Code className="w-5 h-5" />
                  <h4 className="font-editorial font-bold text-lg">Key Projects</h4>
                </div>
                <ul className="space-y-2">
                  {currentMilestone.projects.map((item) => (
                    <li key={item} className="text-xs font-medium text-[#111111] flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
