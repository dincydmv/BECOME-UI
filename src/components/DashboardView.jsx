import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
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
  Pause,
  Book,
  Zap,
  Target,
  Brain,
  Check,
  Crown,
  Sparkles,
  Plus,
  RefreshCw,
  X,
  CheckCircle,
  Flame,
  Award,
  ChevronRight,
  LogOut,
  Bot,
  Terminal,
  Activity,
  ArrowUpRight
} from 'lucide-react';

import { runGrowthAgent } from '../services/growthAgent.js';
import { useApp } from '../store/AppContext.jsx';
import AgentThinking from './AgentThinking.jsx';
import RecommendationCard from './RecommendationCard.jsx';
import GrowthStatePanel from './GrowthStatePanel.jsx';

export default function DashboardView({ onBackToHome }) {
  const { profile, growthState, completeRecommendation, skipRecommendation, refreshGrowthState } = useApp() || {};

  // Navigation & View States
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Backend Agent Execution State
  const [agentRunning, setAgentRunning] = useState(false);
  const [agentReasoningDone, setAgentReasoningDone] = useState(false);
  const [agentSessionData, setAgentSessionData] = useState(null);
  const [agentRecs, setAgentRecs] = useState([]);

  // Interactive Identity State
  const [progressPercent, setProgressPercent] = useState(28);
  const [currentIdentity, setCurrentIdentity] = useState(profile?.currentTraits || 'Procrastinator');
  const [targetIdentity, setTargetIdentity] = useState(profile?.targetTraits || 'Deep Focused Builder');
  const [xp, setXp] = useState(1480);
  const [streakCount, setStreakCount] = useState(5);
  const [aiConfidence, setAiConfidence] = useState(89);

  // Active Goals & Modals
  const [activeGoal, setActiveGoal] = useState(profile?.goals || 'Build a daily 90m study habit');
  const [showUpdateIdentityModal, setShowUpdateIdentityModal] = useState(false);
  const [showReflectionModal, setShowReflectionModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);

  // Floating AI Chat
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'ai', text: 'Hello Neha! I am your Become AI Curator. How can I accelerate your growth today?' }
  ]);
  const [chatInput, setChatInput] = useState('');

  // Day check-ins
  const [weekDays, setWeekDays] = useState([
    { day: 'Mon', checked: true },
    { day: 'Tue', checked: true },
    { day: 'Wed', checked: true },
    { day: 'Thu', checked: true },
    { day: 'Fri', checked: true },
    { day: 'Sat', checked: false },
    { day: 'Sun', checked: false }
  ]);

  // Run Backend AI Agent Pipeline
  const handleExecuteBackendAgent = async () => {
    setAgentRunning(true);
    setAgentReasoningDone(false);
    try {
      const data = await runGrowthAgent(
        profile || { name: 'Neha', currentTraits: currentIdentity, targetTraits: targetIdentity, goals: activeGoal },
        growthState || { trustScore: 82, momentum: 'medium', identityStage: 'early' }
      );
      setAgentSessionData(data);
      setAgentRecs(data.recommendations || []);
    } catch (err) {
      console.error('Error running growth agent:', err);
      setAgentRunning(false);
    }
  };

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: "Today's Mission", icon: Target, action: handleExecuteBackendAgent },
    { name: 'AI Curator', icon: Brain, action: handleExecuteBackendAgent },
    { name: 'Learning Library', icon: BookOpen },
    { name: 'Roadmap', icon: Compass },
    { name: 'AI Team', icon: Bot },
    { name: 'Settings', icon: Settings }
  ];

  return (
    <div className={`min-h-screen font-sans flex relative overflow-hidden transition-colors duration-300 selection:bg-black selection:text-white ${
      darkMode ? 'bg-[#0D0D0D] text-[#F5F5F5]' : 'bg-[#F8F6F2] text-[#111111]'
    }`}>

      {/* LEFT SIDEBAR */}
      <aside className={`border-r transition-all duration-300 flex flex-col justify-between p-5 z-20 shrink-0 relative ${
        sidebarCollapsed ? 'w-20' : 'w-64'
      } ${darkMode ? 'bg-[#141414] border-white/10' : 'bg-[#F8F6F2] border-black/10'}`}>
        <div>
          {/* Logo */}
          <div className="flex items-center justify-between mb-8 px-2">
            {!sidebarCollapsed && (
              <div 
                onClick={onBackToHome}
                className="cursor-pointer font-editorial text-xl font-bold tracking-tight hover:opacity-80 transition-opacity"
              >
                Become <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-black/10 uppercase border border-black/10">AI</span>
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    setActiveTab(item.name);
                    if (item.action) item.action();
                  }}
                  className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-black text-white shadow-sm'
                      : 'text-[#6E6E6E] hover:bg-black/5 hover:text-black'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {!sidebarCollapsed && <span>{item.name}</span>}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-black/10">
          <button 
            onClick={onBackToHome}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs text-rose-600 hover:bg-rose-50 border border-rose-200 font-semibold transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" /> Logout
          </button>
        </div>
      </aside>

      {/* MAIN WORKSPACE */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto relative">
        
        {/* HEADER */}
        <header className="h-16 px-8 flex items-center justify-between border-b backdrop-blur-md sticky top-0 z-30 bg-[#F8F6F2]/90 border-black/5">
          <div className="text-xs font-mono text-[#6E6E6E]">
            WORKSPACE / <span className="font-bold text-[#111111] uppercase">{activeTab}</span>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={handleExecuteBackendAgent}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-full text-xs font-mono font-bold shadow-sm hover:bg-emerald-700 transition-all cursor-pointer"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Run AI Agent Pipeline</span>
            </button>

            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold text-xs">
              N
            </div>
          </div>
        </header>

        {/* BACKEND AGENT RUNNING OVERLAY / PANEL */}
        {agentRunning ? (
          <div className="p-8 max-w-5xl mx-auto w-full">
            {!agentReasoningDone ? (
              <div className="bg-white rounded-3xl p-8 border border-black/10 shadow-lg">
                <div className="text-center mb-6">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-600 font-bold block mb-1">
                    BACKEND AGENT REASONING PIPELINE
                  </span>
                  <h2 className="font-editorial text-3xl font-bold text-[#111111]">
                    BECOME Autonomous Growth Curator
                  </h2>
                </div>

                <AgentThinking
                  steps={agentSessionData?.reasoning?.thinkingSteps || [
                    { step: "OBSERVE: Analyzing user identity gap (Procrastinator → Deep Focused Builder)...", duration: 600 },
                    { step: "THINK: Assessing trust score & momentum to select intervention strategy...", duration: 700 },
                    { step: "DISCOVER: Filtering 36+ growth videos & scoring content match...", duration: 600 },
                    { step: "CURATE: Executing OpenRouter GPT-4o-mini personalization model...", duration: 800 },
                    { step: "EXPLAIN: Generating Why This & Why Now rationales for user goals...", duration: 500 },
                    { step: "Curation complete ✓", duration: 400 }
                  ]}
                  onComplete={() => setAgentReasoningDone(true)}
                />
              </div>
            ) : (
              <div className="space-y-6">
                {/* Agent Header Banner */}
                <div className="bg-white rounded-3xl p-6 border border-black/10 shadow-sm flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-xs font-mono font-bold text-emerald-700 uppercase">
                        {agentSessionData?.engineType || 'OpenRouter AI (GPT-4o-mini)'}
                      </span>
                    </div>
                    <h2 className="font-editorial text-2xl font-bold text-[#111111]">
                      {agentSessionData?.reasoning?.sessionTitle || "Personalized Growth Curation"}
                    </h2>
                    <p className="text-xs text-[#6E6E6E] mt-1">
                      {agentSessionData?.reasoning?.sessionMessage}
                    </p>
                  </div>

                  <button 
                    onClick={() => setAgentRunning(false)}
                    className="btn-pill-secondary px-5 py-2.5 text-xs font-semibold"
                  >
                    Close Session
                  </button>
                </div>

                {/* Growth State Panel */}
                <GrowthStatePanel growthState={growthState || { trustScore: 84, momentum: 'high', identityStage: 'mid' }} />

                {/* Agent Recommendations List */}
                <div className="space-y-4">
                  <h3 className="font-editorial text-xl font-bold text-[#111111]">
                    Curated Growth Videos ({agentRecs.length})
                  </h3>

                  {agentRecs.map((rec, idx) => (
                    <RecommendationCard
                      key={rec.id || idx}
                      rec={rec}
                      index={idx}
                      onComplete={(r) => {
                        completeRecommendation?.(r);
                        confetti({ particleCount: 50, spread: 60 });
                      }}
                      onSkip={(r) => skipRecommendation?.(r)}
                      interventionType={agentSessionData?.reasoning?.interventionType || 'LEARN'}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (

          /* STANDARD DASHBOARD */
          <div className="p-8 space-y-6 max-w-7xl mx-auto w-full">
            
            {/* HERO CARD */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#FAF8F5] rounded-3xl p-8 border border-black/10 shadow-xs relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
            >
              <div className="absolute right-0 top-0 bottom-0 w-80 md:w-96 pointer-events-none select-none overflow-hidden">
                <img
                  src="/card-ai-hand.png"
                  alt="AI Hand Artwork"
                  className="w-full h-full object-contain object-right opacity-90"
                />
              </div>

              <div className="max-w-xl relative z-10">
                <h1 className="font-editorial text-4xl md:text-5xl font-bold tracking-tight text-[#111111] mb-3">
                  Who Are You <br /> Becoming Today?
                </h1>
                <p className="text-xs md:text-sm text-[#6E6E6E] font-light leading-relaxed mb-6">
                  Your AI Curator has analyzed your habits, goals and recent progress to prepare today's personalized growth path.
                </p>

                <div className="flex items-center gap-4">
                  <button 
                    onClick={handleExecuteBackendAgent}
                    className="btn-pill-primary px-6 py-3 text-xs font-semibold flex items-center gap-2 shadow-md hover:scale-105 transition-transform"
                  >
                    <span>Start Your Journey</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button 
                    onClick={() => setIsChatOpen(true)}
                    className="btn-pill-secondary px-6 py-3 text-xs font-semibold flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Ask AI</span>
                  </button>
                </div>
              </div>
            </motion.div>

            {/* IDENTITY & CURATION GRID */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              <div className="md:col-span-7 bg-[#FAF8F5] rounded-3xl p-6 border border-black/10 shadow-xs flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-[#6E6E6E] block mb-4">
                    IDENTITY TRANSFORMATION
                  </span>

                  <div className="flex items-center justify-between text-xs mb-3">
                    <div>
                      <div className="text-[10px] font-mono text-[#6E6E6E] uppercase mb-0.5">CURRENT</div>
                      <div className="font-bold text-base text-[#111111]">{currentIdentity}</div>
                    </div>
                    <div className="text-center">
                      <span className="font-bold text-base text-[#111111]">{progressPercent}%</span>
                      <div className="text-[9px] font-mono text-[#6E6E6E]">Progress</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] font-mono text-[#6E6E6E] uppercase mb-0.5">TARGET</div>
                      <div className="font-bold text-base text-[#111111]">{targetIdentity}</div>
                    </div>
                  </div>

                  <div 
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const newPct = Math.round(((e.clientX - rect.left) / rect.width) * 100);
                      setProgressPercent(newPct);
                      confetti({ particleCount: 30, spread: 50 });
                    }}
                    className="relative w-full h-3 bg-black/10 rounded-full my-6 flex items-center cursor-pointer"
                  >
                    <div className="h-full bg-black rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }} />
                  </div>
                </div>

                <div className="pt-4 border-t border-black/5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <Target className="w-4 h-4 text-black" />
                    <div>
                      <div className="font-bold text-[#111111]">{activeGoal}</div>
                      <div className="text-[11px] text-[#6E6E6E]">Small steps today. Massive change tomorrow.</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CURATION ACTION CARD */}
              <div className="md:col-span-5 bg-[#FAF8F5] rounded-3xl p-6 border border-black/10 shadow-xs flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-[#6E6E6E] block mb-4">
                    AUTONOMOUS AI CURATION
                  </span>

                  <p className="text-xs text-[#6E6E6E] leading-relaxed mb-6">
                    Connect your profile traits to our 36+ video growth library and OpenRouter AI engine.
                  </p>

                  <button
                    onClick={handleExecuteBackendAgent}
                    className="w-full btn-pill-primary py-3 text-xs font-semibold flex items-center justify-center gap-2"
                  >
                    <Terminal className="w-4 h-4" />
                    <span>Run Backend AI Agent Pipeline</span>
                  </button>
                </div>
              </div>

            </div>

          </div>
        )}

      </main>

    </div>
  );
}
