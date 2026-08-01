import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function FinalCTA({ onOpenModal }) {
  return (
    <section className="py-32 px-6 md:px-12 bg-[#F6F4EF] border-t border-black/10 relative overflow-hidden text-center">
      {/* Background Subtle Accent Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#EBE7DF]/70 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-5xl mx-auto flex flex-col items-center">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-16 h-16 rounded-full bg-black text-[#F6F4EF] flex items-center justify-center mb-8 shadow-xl"
        >
          <Sparkles className="w-8 h-8 stroke-[1.5]" />
        </motion.div>

        {/* Large Condensed Typography */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-display text-6xl sm:text-8xl md:text-9xl font-bold uppercase tracking-tight text-[#111111] leading-[0.9] mb-8"
        >
          Your Future <br />
          Starts Today.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-body text-lg md:text-xl text-[#6E6E6E] max-w-2xl font-light leading-relaxed mb-12"
        >
          Join thousands of high-achievers using FutureSelf AI to align their daily habits, learning, and identity vision.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <button
            onClick={onOpenModal}
            className="btn-pill-primary px-10 py-5 text-lg font-bold flex items-center gap-3 group cursor-pointer shadow-2xl"
          >
            <span>Create My AI Curator</span>
            <ArrowRight className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </motion.div>

        {/* Guarantee subtext */}
        <p className="text-xs font-mono text-[#6E6E6E] mt-6">
          14-day risk-free trial • No credit card required to start diagnostic
        </p>

      </div>
    </section>
  );
}
