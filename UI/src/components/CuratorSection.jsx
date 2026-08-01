import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Compass, TrendingUp, Sparkles, Brain, CheckCircle2 } from 'lucide-react';

export default function CuratorSection() {
  const [activeCard, setActiveCard] = useState(0);

  const features = [
    {
      id: 0,
      title: 'Learns your goals',
      icon: Target,
      tagline: 'Deep Ambition Synthesis',
      description:
        'Analyzes your 1-year, 5-year, and ultimate identity vision. Uncovers hidden aspirations and transforms abstract goals into daily actionable milestones.',
      metrics: '99.4% Ambition Alignment',
      color: 'bg-black text-white',
    },
    {
      id: 1,
      title: 'Understands your habits',
      icon: Compass,
      tagline: 'Behavioral Pattern Recognition',
      description:
        'Maps your energy levels, focus windows, and daily routines. Identifies cognitive friction and replaces low-leverage habits with micro-victories.',
      metrics: 'Real-time Friction Detection',
      color: 'bg-black text-white',
    },
    {
      id: 2,
      title: 'Tracks your progress',
      icon: TrendingUp,
      tagline: 'Compound Growth Metrics',
      description:
        'Visualizes your daily cognitive growth, skill acquisition velocity, and identity shifts with high-precision metrics and streak milestones.',
      metrics: '+142% Learning Retention',
      color: 'bg-black text-white',
    },
    {
      id: 3,
      title: 'Curates daily recommendations',
      icon: Sparkles,
      tagline: 'Hyper-Personalized Knowledge Stream',
      description:
        'Filters millions of books, research papers, podcasts, and masterclasses to serve you exactly 3 high-impact items tailored for your current state.',
      metrics: '3 High-Yield Items / Day',
      color: 'bg-black text-white',
    },
  ];

  return (
    <section id="curator" className="py-24 px-6 md:px-12 bg-[#F6F4EF] border-t border-black/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-16 md:mb-24">
          <span className="text-xs uppercase tracking-widest font-mono text-[#6E6E6E] block mb-3">
            [ Section 02 • Core Intelligence ]
          </span>
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tight text-[#111111]">
            Meet Your AI Growth Curator
          </h2>
        </div>

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Dynamic Interactive AI Neural Identity Visualizer */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl bg-[#EBE7DF]/60 border border-black/10 p-8 min-h-[480px] flex flex-col justify-between overflow-hidden shadow-xl">
              
              {/* Dynamic Connecting Grid Overlay */}
              <div className="absolute inset-0 opacity-15 bg-[radial-[#111111]_1px,transparent_1px] [background-size:16px_16px]" />

              {/* Central Glowing AI Brain Emblem */}
              <div className="relative z-10 flex flex-col items-center justify-center my-auto py-10">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                  className="w-48 h-48 rounded-full border border-dashed border-black/30 flex items-center justify-center relative"
                >
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-32 h-32 rounded-full bg-black/5 border border-black/20 flex items-center justify-center backdrop-blur-md"
                  >
                    <Brain className="w-16 h-16 text-[#111111] stroke-[1.2]" />
                  </motion.div>

                  {/* Pulsing Satellite Nodes */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-black text-[#F6F4EF] text-[10px] font-mono rounded-full uppercase tracking-wider shadow">
                    Goals
                  </div>
                  <div className="absolute top-1/2 -right-6 -translate-y-1/2 px-3 py-1 bg-black text-[#F6F4EF] text-[10px] font-mono rounded-full uppercase tracking-wider shadow">
                    Habits
                  </div>
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-black text-[#F6F4EF] text-[10px] font-mono rounded-full uppercase tracking-wider shadow">
                    Progress
                  </div>
                  <div className="absolute top-1/2 -left-6 -translate-y-1/2 px-3 py-1 bg-black text-[#F6F4EF] text-[10px] font-mono rounded-full uppercase tracking-wider shadow">
                    Curation
                  </div>
                </motion.div>
              </div>

              {/* Bottom Active Status Card */}
              <div className="relative z-10 bg-[#F6F4EF] rounded-2xl p-4 border border-black/10 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  <div>
                    <div className="text-xs font-bold text-[#111111]">Active Neural Synthesis</div>
                    <div className="text-[11px] text-[#6E6E6E]">Curating next milestone focus area...</div>
                  </div>
                </div>
                <span className="text-xs font-mono font-semibold px-2.5 py-1 bg-black/5 rounded-full border border-black/10">
                  99.8% Sync
                </span>
              </div>

            </div>
          </div>

          {/* Right: Interactive Feature Cards (Scroll & Hover Animated) */}
          <div className="lg:col-span-7 space-y-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const isActive = activeCard === index;

              return (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => setActiveCard(index)}
                  className={`p-6 sm:p-8 rounded-3xl border transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-[#111111] text-[#F6F4EF] border-black shadow-2xl scale-[1.01]'
                      : 'bg-[#EBE7DF]/30 text-[#111111] border-black/10 hover:bg-[#EBE7DF]/70'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                          isActive ? 'bg-[#F6F4EF] text-[#111111]' : 'bg-black/10 text-[#111111]'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <span className={`text-[10px] font-mono uppercase tracking-widest ${isActive ? 'text-[#F6F4EF]/60' : 'text-[#6E6E6E]'}`}>
                          {feature.tagline}
                        </span>
                        <h3 className={`text-xl sm:text-2xl font-bold font-editorial tracking-tight ${isActive ? 'text-[#F6F4EF]' : 'text-[#111111]'}`}>
                          {feature.title}
                        </h3>
                      </div>
                    </div>

                    <span className={`text-xs font-mono px-3 py-1 rounded-full ${isActive ? 'bg-[#F6F4EF]/20 text-[#F6F4EF]' : 'bg-black/5 text-[#6E6E6E]'}`}>
                      {feature.metrics}
                    </span>
                  </div>

                  <p className={`text-sm sm:text-base leading-relaxed pl-14 font-light ${isActive ? 'text-[#F6F4EF]/80' : 'text-[#6E6E6E]'}`}>
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
