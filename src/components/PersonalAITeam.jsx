import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase,
  GraduationCap,
  HeartPulse,
  TrendingUp,
  Palette,
  Moon,
  Brain,
  Sparkles,
  ArrowRight,
  Bot
} from 'lucide-react';

export default function PersonalAITeam() {
  const [selectedAgent, setSelectedAgent] = useState(0);

  const agents = [
    {
      id: 0,
      name: 'Career Agent',
      icon: Briefcase,
      focus: 'High-Leverage Execution & Trajectory',
      description:
        'Monitors industry shifts, identifies high-leverage networking moments, and optimizes your pitch, resume, and strategic project portfolio.',
      samplePrompt: 'Identified: 3 strategic advisors in your network attending the AI Tech Summit next Tuesday. Auto-drafted intro email.',
      status: 'Active • 98% Optimization',
    },
    {
      id: 1,
      name: 'Learning Agent',
      icon: GraduationCap,
      focus: 'Knowledge Synthesis & Recall',
      description:
        'Distills dense academic papers, nonfiction books, and technical documentation into bite-sized mental models and active recall quizzes.',
      samplePrompt: 'Synthesized 40-page paper on Transformer Architectures into 5 core mental models + 3 active recall prompts.',
      status: 'Active • 4 Papers Processed',
    },
    {
      id: 2,
      name: 'Health Agent',
      icon: HeartPulse,
      focus: 'Circadian Pacing & Bio-Recovery',
      description:
        'Synchronizes your work blocks with your natural circadian energy rhythms, sleep quality, and physical recovery markers.',
      samplePrompt: 'Heart Rate Variability elevated last night. Suggested shift: 30-min walking meeting instead of heavy laptop deep work.',
      status: 'Active • Circadian Matched',
    },
    {
      id: 3,
      name: 'Finance Agent',
      icon: TrendingUp,
      focus: 'Wealth Mindset & Allocation',
      description:
        'Guides resource allocation, personal runway planning, and long-term financial freedom strategies aligned with your career milestones.',
      samplePrompt: 'Calculated 18-month runway buffer based on current burn. Optimization: Reallocate $400/mo into high-yield learning asset.',
      status: 'Active • Runway Mode',
    },
    {
      id: 4,
      name: 'Creativity Agent',
      icon: Palette,
      focus: 'Lateral Thinking & Originality',
      description:
        'Combines insights from unrelated disciplines (e.g. biology + software architecture) to spark original ideas and breakthrough projects.',
      samplePrompt: 'Cross-pollination alert: Applied evolutionary biology principles to your software state machine architecture.',
      status: 'Active • Innovation Mode',
    },
    {
      id: 5,
      name: 'Reflection Agent',
      icon: Moon,
      focus: 'Self-Awareness & De-biasing',
      description:
        'Conducts daily 3-minute evening debriefs to surface cognitive biases, emotional stress, and identity growth shifts.',
      samplePrompt: 'Debrief complete: Noticed micro-hesitation during public speaking exercise. Curated 5-minute vocal warm-up drill.',
      status: 'Active • Evening Debrief Ready',
    },
  ];

  const current = agents[selectedAgent];

  return (
    <section id="ai-team" className="py-24 px-6 md:px-12 bg-[#F6F4EF] border-t border-black/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest font-mono text-[#6E6E6E] block mb-3">
            [ Section 05 • Multi-Agent System ]
          </span>
          <h2 className="font-display text-5xl md:text-7xl font-bold uppercase tracking-tight text-[#111111] mb-4">
            Your Personal AI Team
          </h2>
          <p className="font-body text-base md:text-lg text-[#6E6E6E]">
            Six autonomous specialized agents collaborating in harmony around your central growth engine.
          </p>
        </div>

        {/* Central Neural Brain & Connected Agent Grid */}
        <div className="relative mb-16">
          
          {/* Subtle SVG Connecting Lines */}
          <div className="absolute inset-0 pointer-events-none hidden lg:block">
            <svg className="w-full h-full" viewBox="0 0 1200 400" fill="none">
              <path d="M200 100 Q 600 200 600 200" stroke="rgba(17, 17, 17, 0.15)" strokeWidth="1.5" strokeDasharray="4 4" />
              <path d="M200 300 Q 600 200 600 200" stroke="rgba(17, 17, 17, 0.15)" strokeWidth="1.5" strokeDasharray="4 4" />
              <path d="M1000 100 Q 600 200 600 200" stroke="rgba(17, 17, 17, 0.15)" strokeWidth="1.5" strokeDasharray="4 4" />
              <path d="M1000 300 Q 600 200 600 200" stroke="rgba(17, 17, 17, 0.15)" strokeWidth="1.5" strokeDasharray="4 4" />
            </svg>
          </div>

          {/* Agents Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            {agents.map((agent, index) => {
              const Icon = agent.icon;
              const isSelected = selectedAgent === index;

              return (
                <motion.div
                  key={agent.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  onClick={() => setSelectedAgent(index)}
                  className={`p-6 rounded-3xl border transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'bg-[#111111] text-[#F6F4EF] border-black shadow-2xl scale-[1.02]'
                      : 'bg-[#EBE7DF]/50 text-[#111111] border-black/10 hover:bg-[#EBE7DF]/90'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                        isSelected ? 'bg-[#F6F4EF] text-[#111111]' : 'bg-black/10 text-[#111111]'
                      }`}
                    >
                      <Icon className="w-6 h-6 stroke-[1.5]" />
                    </div>
                    <span
                      className={`text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full ${
                        isSelected ? 'bg-[#F6F4EF]/20 text-[#F6F4EF]' : 'bg-black/5 text-[#6E6E6E]'
                      }`}
                    >
                      Agent 0{index + 1}
                    </span>
                  </div>

                  <h3 className="font-editorial text-2xl font-bold mb-1">{agent.name}</h3>
                  <p className={`text-xs font-mono mb-3 ${isSelected ? 'text-[#F6F4EF]/70' : 'text-[#6E6E6E]'}`}>
                    {agent.focus}
                  </p>

                  <p className={`text-xs leading-relaxed ${isSelected ? 'text-[#F6F4EF]/80' : 'text-[#6E6E6E]'}`}>
                    {agent.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

        </div>

        {/* Selected Agent Live Insight Inspector */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="bg-[#111111] text-[#F6F4EF] rounded-3xl p-6 sm:p-8 border border-black shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#F6F4EF] text-[#111111] flex items-center justify-center shrink-0">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#F6F4EF]/60">
                    Live Agent Telemetry • {current.name}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <h4 className="font-editorial text-xl font-bold text-[#F6F4EF] mb-2">
                  "{current.samplePrompt}"
                </h4>
                <p className="text-xs font-mono text-[#F6F4EF]/60">{current.status}</p>
              </div>
            </div>

            <button className="px-6 py-3 bg-[#F6F4EF] text-[#111111] rounded-full text-xs font-bold font-mono hover:bg-white transition-colors shrink-0 flex items-center gap-2">
              <span>Inspect Sub-Agent Logs</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
