import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Clock, Sparkles, AlertCircle, ArrowUpRight, Filter, BookOpen, Video, Headphones, Activity } from 'lucide-react';

export default function ReasoningEngine() {
  const [activeCategory, setActiveCategory] = useState('All');

  const recommendations = [
    {
      id: 1,
      type: 'Watch',
      typeIcon: Video,
      title: 'The Psychology of Consistency',
      time: '12 minutes',
      author: 'Dr. Andrew Huberman',
      category: 'Mindset',
      reason: 'Because you’ve skipped your morning routine three times this week.',
      impact: '+45% Habit Adherence',
      tag: 'Critical Focus',
    },
    {
      id: 2,
      type: 'Read',
      typeIcon: BookOpen,
      title: 'High Output Management — Chapter 3: Peak Pacing',
      time: '18 minutes',
      author: 'Andy Grove',
      category: 'Deep Work',
      reason: 'Your weekly calendar indicates 14 hours of fragmented meetings; time to protect deep work.',
      impact: 'Meeting De-fragmentation',
      tag: 'Leverage',
    },
    {
      id: 3,
      type: 'Listen',
      typeIcon: Headphones,
      title: 'Building a Second Brain & Knowledge Graphs',
      time: '25 minutes',
      author: 'Tiago Forte',
      category: 'Leadership',
      reason: 'You logged feeling overwhelmed by unorganized project notes yesterday.',
      impact: 'Information Synthesis',
      tag: 'Clarity',
    },
    {
      id: 4,
      type: 'Practice',
      typeIcon: Activity,
      title: '10-Min Box Breathing & Body Scan',
      time: '10 minutes',
      author: 'Wim Hof Protocol',
      category: 'Health',
      reason: 'Your biometrics detected elevated heart rate variability during late-night coding.',
      impact: 'Autonomic Balance',
      tag: 'Bio-Recovery',
    },
  ];

  const categories = ['All', 'Mindset', 'Deep Work', 'Health', 'Leadership'];

  const filtered =
    activeCategory === 'All'
      ? recommendations
      : recommendations.filter((r) => r.category === activeCategory);

  return (
    <section className="py-24 px-6 md:px-12 bg-[#F6F4EF] border-t border-black/10 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="text-xs uppercase tracking-widest font-mono text-[#6E6E6E] block mb-3">
              [ Section 06 • Transparent AI Rationale ]
            </span>
            <h2 className="font-display text-5xl md:text-7xl font-bold uppercase tracking-tight text-[#111111]">
              Why Today's Recommendation?
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-mono transition-all ${
                  activeCategory === cat
                    ? 'bg-black text-[#F6F4EF] font-bold shadow'
                    : 'bg-black/5 text-[#6E6E6E] hover:bg-black/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Recommendation Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => {
              const TypeIcon = item.typeIcon;

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="bg-[#EBE7DF]/50 rounded-3xl p-6 sm:p-8 border border-black/15 flex flex-col justify-between shadow-lg hover:shadow-xl transition-shadow"
                >
                  {/* Top Badge Bar */}
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-black text-[#F6F4EF] rounded-full text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5">
                          <TypeIcon className="w-3.5 h-3.5" />
                          {item.type}
                        </span>
                        <span className="text-xs font-mono text-[#6E6E6E] flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {item.time}
                        </span>
                      </div>

                      <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-full border border-black/20 text-[#111111]">
                        {item.tag}
                      </span>
                    </div>

                    {/* Title & Author */}
                    <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#111111] mb-2 leading-tight">
                      "{item.title}"
                    </h3>
                    <p className="text-xs font-mono text-[#6E6E6E] mb-6">By {item.author}</p>
                  </div>

                  {/* Highlighted AI Reasoning Box */}
                  <div className="bg-[#F6F4EF] p-4 sm:p-5 rounded-2xl border border-black/15 mb-6">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-black uppercase tracking-wider mb-2">
                      <AlertCircle className="w-4 h-4 text-black" />
                      <span>Why This Recommendation?</span>
                    </div>
                    <p className="font-editorial text-base sm:text-lg text-[#111111] font-bold leading-snug">
                      "{item.reason}"
                    </p>
                  </div>

                  {/* Bottom Action Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-black/10">
                    <span className="text-xs font-mono text-[#6E6E6E]">Projected Gain: {item.impact}</span>
                    <button className="btn-pill-primary px-5 py-2 text-xs font-medium flex items-center gap-1.5">
                      <span>Engage Now</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
