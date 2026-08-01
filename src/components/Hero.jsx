import React from 'react';
import { ArrowRight, Play, Sparkles, Video, BookOpen, Radio, FileText, Code2, Headphones } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero({ onOpenModal, onOpenDemo }) {
  const trustedResources = [
    { name: 'YouTube', icon: Video, type: 'VIDEO' },
    { name: 'coursera', icon: BookOpen, type: 'ACADEMY' },
    { name: 'TED', icon: Sparkles, type: 'TALKS' },
    { name: 'Spotify', icon: Headphones, type: 'AUDIO' },
    { name: 'Notion', icon: FileText, type: 'KNOWLEDGE' },
    { name: 'GitHub', icon: Code2, type: 'CODE' },
    { name: 'Medium', icon: FileText, type: 'ESSAYS' },
    { name: 'Harvard Business Review', icon: BookOpen, type: 'RESEARCH' },
    { name: 'Books', icon: BookOpen, type: 'LITERATURE' },
    { name: 'Podcasts', icon: Radio, type: 'CONVERSATIONS' },
  ];

  return (
    <section className="relative pt-32 pb-20 md:pt-36 md:pb-24 px-6 md:px-12 overflow-hidden min-h-[90vh] flex flex-col justify-between">
      
      {/* Background Radial Subtle Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#EBE7DF]/40 rounded-full blur-3xl -z-20 pointer-events-none" />

      {/* Left Cybernetic Robotic AI Hand - Positioned from Left Edge */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[340px] sm:w-[450px] lg:w-[580px] xl:w-[640px] pointer-events-none -z-10 opacity-90 mix-blend-multiply select-none transition-all duration-700">
        <img
          src="/ai-hand-left.png"
          alt="Cybernetic AI Hand Reaching Left"
          className="w-full h-auto object-contain filter contrast-110 grayscale"
        />
      </div>

      {/* Right Realistic Human Hand - Positioned from Right Edge */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[340px] sm:w-[450px] lg:w-[580px] xl:w-[640px] pointer-events-none -z-10 opacity-90 mix-blend-multiply select-none transition-all duration-700">
        <img
          src="/human-hand-right.png"
          alt="Human Hand Reaching Right"
          className="w-full h-auto object-contain filter contrast-110 grayscale"
        />
      </div>

      {/* Main Center Content Container */}
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center relative z-10 my-auto">
        
        {/* Top Minimal Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-black/15 bg-[#F6F4EF]/90 text-[#111111] text-[11px] font-mono uppercase tracking-widest font-semibold mb-8 backdrop-blur-sm shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-black" />
          <span>The Personal Growth AI Engine</span>
        </motion.div>

        {/* Massive Bold Condensed Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-[112px] leading-[0.88] font-bold text-[#111111] tracking-tight uppercase max-w-4xl mb-8 select-none"
        >
          Become The Person <br />
          <span className="relative inline-block">
            You Imagine.
            <svg
              className="absolute -bottom-2 left-0 w-full h-3 text-black/25"
              viewBox="0 0 300 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 10C50 3 150 2 298 9"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </motion.h1>

        {/* Editorial Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-body text-base sm:text-lg md:text-xl text-[#6E6E6E] max-w-2xl font-light leading-relaxed mb-10 text-balance"
        >
          An AI curator that understands your ambitions, habits, and evolving identity to recommend exactly what you need to learn, watch, read, and experience next.
        </motion.p>

        {/* Interactive CTA Buttons Group */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 w-full sm:w-auto"
        >
          <button
            onClick={onOpenModal}
            className="w-full sm:w-auto btn-pill-primary px-8 py-4 text-base font-semibold flex items-center justify-center gap-3 group cursor-pointer shadow-lg"
          >
            <span>Start Your Journey</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          <button
            onClick={onOpenDemo}
            className="w-full sm:w-auto btn-pill-secondary px-8 py-4 text-base font-semibold flex items-center justify-center gap-3 group cursor-pointer"
          >
            <div className="w-6 h-6 rounded-full bg-black/10 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
              <Play className="w-3 h-3 fill-current ml-0.5" />
            </div>
            <span>Watch Demo</span>
          </button>
        </motion.div>

      </div>

      {/* Under Hero - Trusted Resources Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-7xl mx-auto pt-10 border-t border-black/10 relative z-10"
      >
        <p className="text-[11px] uppercase tracking-[0.2em] font-mono font-bold text-center text-[#6E6E6E] mb-8">
          Curates Insights From Trusted Global Knowledge Sources
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-10 gap-6 items-center justify-center opacity-80 hover:opacity-100 transition-opacity duration-300">
          {trustedResources.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.name}
                className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-black/5 transition-colors group cursor-default"
              >
                <div className="flex items-center gap-1.5 font-editorial text-sm font-bold tracking-tight text-[#111111] group-hover:scale-105 transition-transform">
                  <Icon className="w-3.5 h-3.5 stroke-[1.8] text-black" />
                  <span>{item.name}</span>
                </div>
                <span className="text-[9px] font-mono text-[#6E6E6E] uppercase tracking-wider mt-0.5">
                  {item.type}
                </span>
              </div>
            );
          })}
        </div>
      </motion.div>

    </section>
  );
}
