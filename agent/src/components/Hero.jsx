import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero({ onOpenModal }) {
  return (
    <section className="relative pt-32 pb-20 md:pt-36 md:pb-24 px-6 md:px-12 overflow-hidden min-h-[90vh] flex flex-col justify-between select-none isolate">
      
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#EBE7DF]/40 rounded-full blur-3xl -z-20 pointer-events-none" />

      {/* Exact User-Uploaded Hero Background Layer — pixel-for-pixel original */}
      <div className="absolute inset-0 w-full h-full pointer-events-none -z-10 select-none">
        <img
          src="/hero-bg-exact.jpg"
          alt="Hero Background"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Main Center Content Container */}
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center relative z-10 my-auto">
        
        {/* Massive Bold Condensed Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-[112px] leading-[0.88] font-bold text-[#111111] tracking-tight uppercase max-w-4xl mb-8"
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

        {/* Interactive CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex items-center justify-center w-full sm:w-auto"
        >
          <button
            onClick={onOpenModal}
            className="w-full sm:w-auto btn-pill-primary px-8 py-4 text-base font-semibold flex items-center justify-center gap-3 group cursor-pointer shadow-lg"
          >
            <span>Start Your Journey</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </motion.div>

      </div>

    </section>
  );
}
