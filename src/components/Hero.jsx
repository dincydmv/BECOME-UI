import React from 'react';
import { ArrowRight, Play, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero({ onOpenModal, onOpenDemo }) {
  const trustedResources = [
    { name: 'YouTube', type: 'Video' },
    { name: 'Coursera', type: 'Academy' },
    { name: 'TED', type: 'Talks' },
    { name: 'Spotify', type: 'Audio' },
    { name: 'Notion', type: 'Knowledge' },
    { name: 'GitHub', type: 'Code' },
    { name: 'Medium', type: 'Essays' },
    { name: 'Harvard Business Review', type: 'Research' },
    { name: 'Books', type: 'Literature' },
    { name: 'Podcasts', type: 'Conversations' },
  ];

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-6 md:px-12 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#EBE7DF]/50 rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* Blurred Creation of Adam Hands Background Artwork Layer */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10 overflow-hidden px-4">
        <img
          src="/bg-artwork.png"
          alt="Hands Touching Creation of Adam Background"
          className="w-full max-w-6xl h-auto max-h-[600px] object-contain opacity-60 grayscale contrast-110 scale-105 select-none"
        />
      </div>

      <div className="max-w-6xl mx-auto text-center flex flex-col items-center">
        
        {/* Massive Bold Condensed Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-[110px] leading-[0.9] font-bold text-[#111111] tracking-tight uppercase max-w-5xl mb-8"
        >
          Become The Person <br className="hidden sm:block" />
          <span className="relative inline-block">
            You Imagine.
            <svg
              className="absolute -bottom-2 left-0 w-full h-3 text-black/20"
              viewBox="0 0 300 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 10C50 3 150 2 298 9"
                stroke="currentColor"
                strokeWidth="3"
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
          className="font-body text-lg md:text-xl lg:text-2xl text-[#6E6E6E] max-w-3xl font-light leading-relaxed mb-10 text-balance"
        >
          An AI curator that understands your ambitions, habits, and evolving identity to recommend exactly what you need to learn, watch, read, and experience next.
        </motion.p>

        {/* CTA Button Group */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex items-center justify-center gap-4 mb-8 w-full sm:w-auto"
        >
          <button
            onClick={onOpenModal}
            className="w-full sm:w-auto btn-pill-primary px-8 py-4 text-base font-semibold flex items-center justify-center gap-3 group cursor-pointer"
          >
            <span>Start Your Journey</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </motion.div>

      </div>
    </section>
  );
}
