import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Brain, Sparkles, UserCheck, ArrowRight } from 'lucide-react';

export default function HowItWorks({ onOpenModal }) {
  const steps = [
    {
      number: '01',
      title: 'Discover Yourself',
      icon: Compass,
      description:
        'Complete a 3-minute identity & ambition diagnostic. Define your 1-year goals, daily habits, energy patterns, and learning preferences.',
    },
    {
      number: '02',
      title: 'AI Understands You',
      icon: Brain,
      description:
        'Our multi-agent neural model synthesizes your identity baseline, continuously tracking your growth velocity, focus blocks, and friction areas.',
    },
    {
      number: '03',
      title: 'Receive Daily Curation',
      icon: Sparkles,
      description:
        'Every morning at 7:00 AM, receive 3 high-impact recommendations (reads, audio, actions) tailored precisely for your evolving identity state.',
    },
    {
      number: '04',
      title: 'Become Your Future Self',
      icon: UserCheck,
      description:
        'Compound 1% daily growth over 90 days. Watch your habits, skills, confidence, and career trajectory transform in real-time.',
    },
  ];

  return (
    <section id="how-it-works" className="py-24 px-6 md:px-12 bg-[#F6F4EF] border-t border-black/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs uppercase tracking-widest font-mono text-[#6E6E6E] block mb-3">
            [ Section 07 • The Architecture ]
          </span>
          <h2 className="font-display text-5xl md:text-7xl font-bold uppercase tracking-tight text-[#111111] mb-4">
            How It Works
          </h2>
          <p className="font-body text-base md:text-lg text-[#6E6E6E]">
            A continuous loop of self-discovery, intelligent synthesis, and compound transformation.
          </p>
        </div>

        {/* Connected 4 Steps Layout */}
        <div className="relative">
          
          {/* Connected Flowing SVG Line (Desktop) */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-black/15 -translate-y-1/2 hidden lg:block -z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.12 }}
                  className="bg-[#EBE7DF]/60 rounded-3xl p-8 border border-black/15 flex flex-col justify-between hover:bg-[#EBE7DF] transition-all duration-300 group shadow-md"
                >
                  <div>
                    {/* Top Step Counter & Icon */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-display text-4xl font-bold text-black/30 group-hover:text-black transition-colors">
                        {step.number}
                      </span>
                      <div className="w-12 h-12 rounded-2xl bg-black text-[#F6F4EF] flex items-center justify-center shadow-md">
                        <Icon className="w-6 h-6 stroke-[1.5]" />
                      </div>
                    </div>

                    {/* Step Title & Description */}
                    <h3 className="font-editorial text-2xl font-bold text-[#111111] mb-3">
                      {step.title}
                    </h3>
                    <p className="text-xs text-[#6E6E6E] font-light leading-relaxed mb-6">
                      {step.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-black/10 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[#6E6E6E] uppercase tracking-wider">
                      Phase {step.number}
                    </span>
                    <ArrowRight className="w-4 h-4 text-[#111111] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

        {/* Middle Quick Callout */}
        <div className="mt-16 text-center">
          <button
            onClick={onOpenModal}
            className="btn-pill-primary px-8 py-3.5 text-sm font-semibold inline-flex items-center gap-2"
          >
            <span>Begin Your Diagnostic Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
