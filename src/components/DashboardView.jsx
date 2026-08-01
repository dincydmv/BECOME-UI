import React, { useState } from 'react';
import {
  LayoutDashboard,
  Clock,
  BookOpen,
  Settings,
  Library,
  Compass,
  User,
  Bell,
  ArrowRight,
  Play,
  Book,
  Zap,
  Target,
  Brain,
  Check,
  Crown,
  Sparkles,
  Plus
} from 'lucide-react';

export default function DashboardView({ onBackToHome }) {
  const [activeTab, setActiveTab] = useState('Dashboard');

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: "Today's Session", icon: Clock },
    { name: 'Journey', icon: BookOpen },
    { name: 'Curator', icon: Settings },
    { name: 'Library', icon: Library },
    { name: 'Roadmap', icon: Compass },
    { name: 'Profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-[#F8F6F2] text-[#111111] font-sans flex relative overflow-hidden selection:bg-black selection:text-white">
      
      {/* LEFT SIDEBAR */}
      <aside className="w-64 bg-[#F8F6F2] border-r border-black/10 flex flex-col justify-between p-6 shrink-0 relative z-20">
        <div>
          {/* Top Brand Logo */}
          <div 
            onClick={onBackToHome}
            className="cursor-pointer font-display text-2xl font-bold tracking-wider uppercase mb-8 hover:opacity-80 transition-opacity"
          >
            BECOME
          </div>

          {/* User Profile Pill */}
          <div className="flex items-center gap-3 mb-8 p-1.5 rounded-xl">
            <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center font-bold text-sm">
              N
            </div>
            <div>
              <div className="font-bold text-sm leading-tight text-[#111111]">NEha</div>
              <div className="text-[11px] text-[#6E6E6E]">Growth Curator</div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => setActiveTab(item.name)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-black text-white shadow-sm'
                      : 'text-[#555555] hover:bg-black/5 hover:text-black'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer & Hand Watermark */}
        <div className="relative pt-12">
          {/* Human Hand Watermark */}
          <div className="absolute -bottom-6 -left-6 w-40 h-40 pointer-events-none opacity-20 mix-blend-multiply">
            <img src="/hero-bg-exact.jpg" alt="" className="w-full h-full object-cover object-bottom" />
          </div>

          <div className="relative z-10 p-3 rounded-xl bg-black/5 border border-black/5">
            <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-[#111111] mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              AI Curator
            </div>
            <p className="text-[10px] text-[#6E6E6E] leading-tight font-light">
              Always learning. Always with you.
            </p>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Top Header */}
        <header className="h-16 px-8 flex items-center justify-end gap-4 border-b border-black/5 bg-[#F8F6F2]/80 backdrop-blur-sm sticky top-0 z-10">
          <button className="p-2 rounded-full hover:bg-black/5 text-[#555555] transition-colors relative">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-black rounded-full" />
          </button>
          <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold text-xs cursor-pointer">
            <User className="w-4 h-4" />
          </div>
        </header>

        {/* Dashboard Body */}
        <div className="p-8 space-y-6 max-w-6xl">
          
          {/* GREETING HERO BANNER */}
          <div className="bg-[#FAF8F5] rounded-3xl p-8 border border-black/10 shadow-xs relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            
            {/* Cybernetic AI Hand Background Artwork on Right */}
            <div className="absolute right-0 top-0 bottom-0 w-80 pointer-events-none opacity-20 mix-blend-multiply overflow-hidden">
              <img
                src="/hero-bg-exact.jpg"
                alt=""
                className="w-full h-full object-cover object-right"
              />
            </div>

            <div className="max-w-xl relative z-10">
              <h1 className="font-editorial text-4xl md:text-5xl font-bold tracking-tight text-[#111111] mb-3">
                Who Are You <br /> Becoming Today?
              </h1>
              <p className="text-xs md:text-sm text-[#6E6E6E] font-light leading-relaxed mb-6">
                Your AI Curator has analyzed your current identity and prepared today's growth path just for you.
              </p>

              <button className="btn-pill-primary px-6 py-3 text-xs font-semibold flex items-center gap-2 shadow-md hover:scale-105 transition-transform">
                <span>Begin Today's Session</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* ROW 1: Identity Transformation & Today's Curation */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Left Card: IDENTITY TRANSFORMATION (7 cols) */}
            <div className="md:col-span-7 bg-[#FAF8F5] rounded-3xl p-6 border border-black/10 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-[#6E6E6E] block mb-6">
                  IDENTITY TRANSFORMATION
                </span>

                <div className="flex items-center justify-between text-xs mb-2">
                  <div>
                    <div className="text-[10px] font-mono text-[#6E6E6E] uppercase mb-0.5">CURRENT IDENTITY</div>
                    <div className="font-bold text-base text-[#111111]">Easily Distracted</div>
                  </div>

                  <div className="text-center">
                    <span className="font-bold text-base text-[#111111]">28%</span>
                    <div className="text-[9px] font-mono text-[#6E6E6E]">Progress</div>
                  </div>

                  <div className="text-right">
                    <div className="text-[10px] font-mono text-[#6E6E6E] uppercase mb-0.5">TARGET IDENTITY</div>
                    <div className="font-bold text-base text-[#111111]">Deeply Focused</div>
                  </div>
                </div>

                {/* Progress Bar with Dot */}
                <div className="relative w-full h-1.5 bg-black/10 rounded-full my-6 flex items-center">
                  <div className="h-full bg-black rounded-full" style={{ width: '28%' }} />
                  <div className="w-3 h-3 bg-black rounded-full border-2 border-white shadow-xs -ml-1.5" />
                </div>
              </div>

              <div className="pt-4 border-t border-black/5">
                <div className="text-[10px] font-mono text-[#6E6E6E] uppercase mb-2">ACTIVE GOAL</div>
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-black/5 text-black">
                    <Target className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-[#111111]">Build a daily study habit</div>
                    <div className="text-xs text-[#6E6E6E]">Small steps today. Massive change tomorrow.</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Card: TODAY'S CURATION (5 cols) */}
            <div className="md:col-span-5 bg-[#FAF8F5] rounded-3xl p-6 border border-black/10 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-[#6E6E6E] block mb-4">
                  TODAY'S CURATION
                </span>

                <div className="space-y-3">
                  {/* Watch */}
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-white border border-black/5 hover:border-black/20 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-black text-white flex items-center justify-center">
                        <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                      </div>
                      <div>
                        <div className="text-[10px] font-mono text-[#6E6E6E]">Watch</div>
                        <div className="text-xs font-bold text-[#111111]">Atomic Habits Chapter 3</div>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono text-[#6E6E6E]">12 min</span>
                  </div>

                  {/* Read */}
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-white border border-black/5 hover:border-black/20 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-black text-white flex items-center justify-center">
                        <Book className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-[10px] font-mono text-[#6E6E6E]">Read</div>
                        <div className="text-xs font-bold text-[#111111]">Deep Work Summary</div>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono text-[#6E6E6E]">8 min</span>
                  </div>

                  {/* Practice */}
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-white border border-black/5 hover:border-black/20 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-black text-white flex items-center justify-center">
                        <Zap className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-[10px] font-mono text-[#6E6E6E]">Practice</div>
                        <div className="text-xs font-bold text-[#111111]">25-minute Focus Sprint</div>
                      </div>
                    </div>
                    <button className="text-xs font-bold text-black flex items-center gap-1 hover:underline">
                      Start <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* ROW 2: AI Reflection, Momentum, AI Confidence */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* AI Reflection */}
            <div className="bg-[#FAF8F5] rounded-3xl p-6 border border-black/10 shadow-xs flex flex-col justify-between relative">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-[#6E6E6E]">
                  AI REFLECTION
                </span>
                <Brain className="w-4 h-4 text-black" />
              </div>

              <div className="space-y-3">
                <p className="text-xs text-[#555555] font-light leading-relaxed">
                  "Yesterday you completed your focus session. Your consistency is improving."
                </p>
                <div className="text-xs font-medium text-[#111111]">
                  <strong>Today's recommendation:</strong> <br />
                  Remove distractions before starting your study session.
                </div>
              </div>
            </div>

            {/* Momentum */}
            <div className="bg-[#FAF8F5] rounded-3xl p-6 border border-black/10 shadow-xs flex flex-col justify-between">
              <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-[#6E6E6E] block mb-4">
                MOMENTUM
              </span>

              {/* Day Tracker */}
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  {['M', 'T', 'W', 'T', 'F'].map((day, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full h-4 bg-black rounded-xs" />
                      <span className="text-[9px] font-mono text-[#6E6E6E]">{day}</span>
                    </div>
                  ))}
                  {['S', 'S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full h-4 border border-black/20 rounded-xs" />
                      <span className="text-[9px] font-mono text-[#6E6E6E]">{day}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4">
                  <div className="font-bold text-sm text-[#111111]">5 day consistency</div>
                  <div className="text-xs text-[#6E6E6E]">Keep going, Neha!</div>
                </div>
              </div>
            </div>

            {/* AI Confidence */}
            <div className="bg-[#FAF8F5] rounded-3xl p-6 border border-black/10 shadow-xs flex items-center gap-4">
              {/* Donut Progress Circle */}
              <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-black/10"
                    strokeWidth="3"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-black"
                    strokeDasharray="82, 100"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="absolute font-bold text-sm text-[#111111]">82%</span>
              </div>

              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest font-bold text-[#6E6E6E] mb-1">
                  AI CONFIDENCE
                </div>
                <div className="text-xs text-[#111111] leading-relaxed">
                  Your curator understands your habits well.
                </div>
                <div className="text-[10px] text-[#6E6E6E] mt-1 font-light">
                  Accuracy improving every day.
                </div>
              </div>
            </div>

          </div>

          {/* ROW 3: Identity Stage & Recent Growth */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Identity Stage (7 cols) */}
            <div className="md:col-span-7 bg-[#FAF8F5] rounded-3xl p-6 border border-black/10 shadow-xs flex flex-col justify-between">
              <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-[#6E6E6E] block mb-6">
                IDENTITY STAGE
              </span>

              {/* Stepper Timeline */}
              <div className="relative py-4">
                {/* Horizontal Connecting Line */}
                <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-black/10 -translate-y-1/2" />
                <div className="absolute top-1/2 left-4 w-1/4 h-0.5 bg-black -translate-y-1/2" />

                <div className="relative flex justify-between items-center text-center">
                  {/* Node 1: Foundation Builder (Active) */}
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center z-10 shadow-sm">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-bold text-[#111111] mt-2">Foundation<br />Builder</span>
                  </div>

                  {/* Node 2: Explorer */}
                  <div className="flex flex-col items-center">
                    <div className="w-6 h-6 rounded-full bg-white border-2 border-black/20 z-10" />
                    <span className="text-xs text-[#6E6E6E] mt-3">Explorer</span>
                  </div>

                  {/* Node 3: Creator */}
                  <div className="flex flex-col items-center">
                    <div className="w-6 h-6 rounded-full bg-white border-2 border-black/20 z-10" />
                    <span className="text-xs text-[#6E6E6E] mt-3">Creator</span>
                  </div>

                  {/* Node 4: Leader */}
                  <div className="flex flex-col items-center">
                    <div className="w-7 h-7 rounded-full bg-white border-2 border-black/20 flex items-center justify-center text-[#6E6E6E] z-10">
                      <Crown className="w-3 h-3" />
                    </div>
                    <span className="text-xs text-[#6E6E6E] mt-2">Leader</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Growth (5 cols) */}
            <div className="md:col-span-5 bg-[#FAF8F5] rounded-3xl p-6 border border-black/10 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-[#6E6E6E] block mb-4">
                  RECENT GROWTH
                </span>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-xs">
                    <span className="w-2 h-2 rounded-full bg-black shrink-0" />
                    <span className="text-[#6E6E6E] font-mono text-[11px] w-20 shrink-0">Yesterday</span>
                    <span className="text-[#111111] flex items-center gap-1">
                      <Check className="w-3 h-3 text-black" /> Finished Morning Deep Work
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs">
                    <span className="w-2 h-2 rounded-full bg-black shrink-0" />
                    <span className="text-[#6E6E6E] font-mono text-[11px] w-20 shrink-0">Yesterday</span>
                    <span className="text-[#111111] flex items-center gap-1">
                      <Check className="w-3 h-3 text-black" /> Read Psychology of Success
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs">
                    <span className="w-2 h-2 rounded-full bg-black shrink-0" />
                    <span className="text-[#6E6E6E] font-mono text-[11px] w-20 shrink-0">2 Days Ago</span>
                    <span className="text-[#111111] flex items-center gap-1">
                      <Check className="w-3 h-3 text-black" /> Reflection Completed
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-right pt-4">
                <button className="text-xs font-bold text-black hover:underline inline-flex items-center gap-1">
                  View All Activity <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

          </div>

        </div>

      </main>

    </div>
  );
}
