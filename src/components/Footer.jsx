import React from 'react';

export default function Footer({ onOpenModal }) {
  return (
    <footer className="bg-[#F6F4EF] border-t border-black/15 py-16 px-6 md:px-12 text-[#111111]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
        
        {/* Left Brand Mark */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-black text-[#F6F4EF] flex items-center justify-center font-editorial font-bold text-sm">
              FS
            </div>
            <span className="font-editorial text-2xl font-bold tracking-tight">
              FutureSelf AI
            </span>
          </div>
          <p className="text-xs text-[#6E6E6E] max-w-sm font-light leading-relaxed">
            The luxury personal growth platform powered by autonomous neural curation and identity synthesis.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center gap-8 text-xs font-mono uppercase tracking-wider text-[#6E6E6E]">
          <a href="#how-it-works" className="hover:text-black transition-colors">
            How It Works
          </a>
          <a href="#curator" className="hover:text-black transition-colors">
            AI Curator
          </a>
          <a href="#roadmap" className="hover:text-black transition-colors">
            Roadmap
          </a>
          <a href="#ai-team" className="hover:text-black transition-colors">
            AI Team
          </a>
          <a href="#pricing" className="hover:text-black transition-colors">
            Pricing
          </a>
          <button onClick={onOpenModal} className="hover:text-black transition-colors">
            Privacy Policy
          </button>
          <button onClick={onOpenModal} className="hover:text-black transition-colors">
            Terms of Service
          </button>
        </div>

        {/* Social Marks */}
        <div className="flex items-center gap-6 text-xs font-mono uppercase tracking-widest text-[#111111]">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Twitter ↗
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            LinkedIn ↗
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            GitHub ↗
          </a>
        </div>

      </div>

      {/* Copyright Line */}
      <div className="max-w-7xl mx-auto pt-10 mt-10 border-t border-black/10 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-[#6E6E6E] gap-2">
        <span>© {new Date().getFullYear()} FutureSelf AI Inc. All rights reserved.</span>
        <span>Crafted with Minimalist Precision • Awwwards Grade</span>
      </div>
    </footer>
  );
}
