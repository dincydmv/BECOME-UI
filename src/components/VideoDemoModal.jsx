import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Play, Pause, Volume2, VolumeX, Sparkles, CheckCircle2 } from 'lucide-react';

export default function VideoDemoModal({ isOpen, onClose }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-[#F6F4EF] rounded-3xl border border-black/20 w-full max-w-4xl p-6 md:p-8 relative shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#111111] font-bold">
              FutureSelf AI Platform Tour • HD 4K
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-black/5 text-[#111111] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Frame Simulation */}
        <div className="relative rounded-2xl overflow-hidden aspect-[16/9] bg-black mb-6 border border-black/20 group">
          <div className="w-full h-full bg-gradient-to-br from-[#111111] via-[#222222] to-[#000000] flex items-center justify-center relative opacity-90" />

          {/* Overlaid UI Controls */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 flex flex-col justify-between p-6">
            <div className="flex justify-between items-start">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-[10px] font-mono uppercase">
                Interactive Neural Curation Walkthrough
              </span>
            </div>

            {/* Center Play Button Overlay */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center mx-auto shadow-2xl hover:scale-110 transition-transform"
            >
              {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
            </button>

            {/* Bottom Progress Bar & Volume */}
            <div className="flex items-center justify-between text-white text-xs font-mono">
              <div className="flex items-center gap-3 w-full max-w-md">
                <span>01:42</span>
                <div className="w-full h-1.5 bg-white/30 rounded-full overflow-hidden">
                  <div className="h-full bg-white rounded-full w-2/5" />
                </div>
                <span>04:15</span>
              </div>

              <button onClick={() => setIsMuted(!isMuted)} className="p-2 hover:bg-white/10 rounded-full">
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Tour Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-3 bg-[#EBE7DF]/60 rounded-xl border border-black/10 text-xs">
            <strong className="block text-[#111111] mb-1 font-editorial font-bold">1. Ambition Diagnostic</strong>
            <span className="text-[#6E6E6E]">Continuous synthesis of long-term vision into daily tasks.</span>
          </div>
          <div className="p-3 bg-[#EBE7DF]/60 rounded-xl border border-black/10 text-xs">
            <strong className="block text-[#111111] mb-1 font-editorial font-bold">2. Autonomous AI Team</strong>
            <span className="text-[#6E6E6E]">6 specialized sub-agents cross-analyzing your biometrics.</span>
          </div>
          <div className="p-3 bg-[#EBE7DF]/60 rounded-xl border border-black/10 text-xs">
            <strong className="block text-[#111111] mb-1 font-editorial font-bold">3. Transparent Rationale</strong>
            <span className="text-[#6E6E6E]">Every recommendation explains exactly *why* it was chosen.</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
