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
  Volume2,
  VolumeX,
  CheckCircle,
  Flame,
  Award,
  ChevronRight,
  LogOut
} from 'lucide-react';

export default function DashboardView({ onBackToHome }) {
  // Navigation & View States
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Curator synthesized 3 new Deep Work insights for you.', time: '10m ago', unread: true },
    { id: 2, text: 'Streak Master milestone reached! +150 XP awarded.', time: '2h ago', unread: true },
    { id: 3, text: 'Weekly identity alignment report is ready.', time: '1d ago', unread: false }
  ]);

  // Interactive Identity & Progress State
  const [progressPercent, setProgressPercent] = useState(28);
  const [currentIdentity, setCurrentIdentity] = useState('Easily Distracted');
  const [targetIdentity] = useState('Deeply Focused');
  const [selectedStage, setSelectedStage] = useState('Foundation Builder');
  const [xp, setXp] = useState(1480);
  const [streakCount, setStreakCount] = useState(5);
  const [aiConfidence, setAiConfidence] = useState(82);

  // Active Goals
  const [activeGoal, setActiveGoal] = useState('Build a daily study habit');
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [newGoalInput, setNewGoalInput] = useState('');

  // Interactive Days Tracker State (M T W T F S S M T W T F S)
  const [dayCheckins, setDayCheckins] = useState([
    true, true, true, true, true, false, false, false, false, false, false, false, false
  ]);

  // Curation Items Completed State
  const [completedItems, setCompletedItems] = useState({
    watch: false,
    read: false,
    practice: false
  });

  // Modal / Session States
  const [activeModal, setActiveModal] = useState(null); // 'session' | 'watch' | 'read' | 'practice' | 'stage'
  const [stageDetailsModal, setStageDetailsModal] = useState(null);

  // Practice Sprint Timer State
  const [timerTime, setTimerTime] = useState(25 * 60); // 25 mins
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // AI Reflection Quote Cycling
  const reflections = [
    {
      quote: "Yesterday you completed your focus session. Your consistency is improving.",
      recommendation: "Remove distractions before starting your study session."
    },
    {
      quote: "Your peak cognitive performance occurs between 9:00 AM and 11:30 AM.",
      recommendation: "Schedule your highest friction task right after morning coffee."
    },
    {
      quote: "You have maintained a 5-day habit streak in deep reading.",
      recommendation: "Synthesize 3 key takeaways into your knowledge vault today."
    }
  ];
  const [reflectionIndex, setReflectionIndex] = useState(0);

  // Timer Effect
  useEffect(() => {
    let interval = null;
    if (isTimerRunning && timerTime > 0) {
      interval = setInterval(() => {
        setTimerTime((prev) => prev - 1);
      }, 1000);
    } else if (timerTime === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerTime]);

  // Handlers
  const handleToggleDay = (idx) => {
    const updated = [...dayCheckins];
    updated[idx] = !updated[idx];
    setDayCheckins(updated);

    if (updated[idx]) {
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.8 } });
      setXp((prev) => prev + 50);
      setStreakCount((prev) => prev + 1);
    } else {
      setStreakCount((prev) => Math.max(0, prev - 1));
    }
  };

  const handleCompleteCurationItem = (key, xpAmount) => {
    if (!completedItems[key]) {
      setCompletedItems((prev) => ({ ...prev, [key]: true }));
      setXp((prev) => prev + xpAmount);
      setProgressPercent((prev) => Math.min(100, prev + 12));
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    }
  };

  const handleNextReflection = () => {
    setReflectionIndex((prev) => (prev + 1) % reflections.length);
  };

  const handleSimulateAiTraining = () => {
    if (aiConfidence < 98) {
      setAiConfidence((prev) => prev + 4);
      confetti({ particleCount: 25, spread: 40 });
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: "Today's Session", icon: Clock },
    { name: 'Journey', icon: BookOpen },
    { name: 'Curator', icon: Settings },
    { name: 'Library', icon: Library },
    { name: 'Roadmap', icon: Compass },
    { name: 'Profile', icon: User },
  ];

  const stages = [
    { name: 'Foundation Builder', desc: 'Establishing core focus & daily habits.', level: 'Level 1-3', unlocked: true },
    { name: 'Explorer', desc: 'Expanding domain knowledge & deep synthesis.', level: 'Level 4-6', unlocked: progressPercent >= 40 },
    { name: 'Creator', desc: 'Producing high-impact creative & technical output.', level: 'Level 7-9', unlocked: progressPercent >= 75 },
    { name: 'Leader', desc: 'Mentoring, scaling systems & high autonomy.', level: 'Level 10+', unlocked: progressPercent >= 100 }
  ];

  return (
    <div className="min-h-screen bg-[#F8F6F2] text-[#111111] font-sans flex relative overflow-hidden selection:bg-black selection:text-white">
      
      {/* LEFT SIDEBAR */}
      <aside className="w-64 bg-[#F8F6F2] border-r border-black/10 flex flex-col justify-between p-6 shrink-0 relative z-20">
        <div>
          {/* Top Brand Logo */}
          <div className="flex items-center justify-between mb-8">
            <div 
              onClick={onBackToHome}
              className="cursor-pointer font-display text-2xl font-bold tracking-wider uppercase hover:opacity-80 transition-opacity"
            >
              BECOME
            </div>
            <button 
              onClick={onBackToHome} 
              className="text-[10px] font-mono text-[#6E6E6E] hover:text-black flex items-center gap-1 border border-black/10 px-2 py-1 rounded-full"
              title="Return to Landing Page"
            >
              <LogOut className="w-3 h-3" /> Home
            </button>
          </div>

          {/* User Profile Pill */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-3 mb-8 p-2 rounded-2xl bg-white border border-black/10 shadow-xs cursor-pointer"
            onClick={() => setActiveTab('Profile')}
          >
            <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold text-sm shadow-sm">
              N
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-sm leading-tight text-[#111111] truncate">NEha</div>
              <div className="text-[11px] text-[#6E6E6E] truncate">Growth Curator</div>
            </div>
            <span className="text-[10px] font-mono font-bold bg-black/5 px-2 py-0.5 rounded-full text-[#111111]">
              Lvl 5
            </span>
          </motion.div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => setActiveTab(item.name)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-black text-white shadow-sm scale-[1.02]'
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
        <div className="relative pt-8">
          {/* Human Hand Watermark */}
          <div className="absolute -bottom-6 -left-6 w-44 h-44 pointer-events-none opacity-25 mix-blend-multiply">
            <img src="/hero-bg-exact.jpg" alt="" className="w-full h-full object-cover object-bottom" />
          </div>

          <div className="relative z-10 p-3.5 rounded-2xl bg-white border border-black/10 shadow-xs">
            <div className="flex items-center justify-between text-[10px] font-mono font-bold uppercase tracking-wider text-[#111111] mb-1">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                AI Curator
              </div>
              <span className="text-black/40 font-mono">v3.4</span>
            </div>
            <p className="text-[10px] text-[#6E6E6E] leading-tight font-light">
              Always learning. Always with you.
            </p>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto relative">
        
        {/* Top Header */}
        <header className="h-16 px-8 flex items-center justify-between border-b border-black/5 bg-[#F8F6F2]/90 backdrop-blur-md sticky top-0 z-30">
          <div className="text-xs font-mono text-[#6E6E6E]">
            WORKSPACE / <span className="font-bold text-[#111111] uppercase">{activeTab}</span>
          </div>

          <div className="flex items-center gap-4">
            {/* XP Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-black text-white rounded-full text-xs font-mono font-bold shadow-xs">
              <Zap className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
              <span>{xp} XP</span>
            </div>

            {/* Streak Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-100 text-orange-900 border border-orange-200 rounded-full text-xs font-mono font-bold">
              <Flame className="w-3.5 h-3.5 text-orange-600 fill-orange-500" />
              <span>{streakCount} Days</span>
            </div>

            {/* Notifications Dropdown Toggle */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2.5 rounded-full hover:bg-black/5 text-[#555555] transition-colors relative"
              >
                <Bell className="w-4 h-4" />
                {notifications.some(n => n.unread) && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
                )}
              </button>

              {/* Notifications Popover */}
              <AnimatePresence>
                {showNotifications && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-80 bg-white border border-black/10 rounded-2xl shadow-xl p-4 z-50"
                  >
                    <div className="flex items-center justify-between mb-3 pb-2 border-b border-black/5">
                      <span className="text-xs font-bold text-[#111111]">Notifications</span>
                      <button 
                        onClick={() => setNotifications(prev => prev.map(n => ({ ...n, unread: false })))}
                        className="text-[10px] font-mono text-[#6E6E6E] hover:text-black"
                      >
                        Mark all read
                      </button>
                    </div>
                    <div className="space-y-2">
                      {notifications.map(n => (
                        <div key={n.id} className={`p-2.5 rounded-xl text-xs ${n.unread ? 'bg-black/5 font-semibold' : 'text-[#6E6E6E]'}`}>
                          <div>{n.text}</div>
                          <div className="text-[9px] font-mono text-[#6E6E6E] mt-1">{n.time}</div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </header>

        {/* TAB CONTENT SWITCHER */}
        {activeTab !== 'Dashboard' ? (
          <div className="p-8 max-w-4xl">
            <div className="bg-white rounded-3xl p-8 border border-black/10 shadow-xs">
              <h2 className="font-editorial text-3xl font-bold text-[#111111] mb-3">{activeTab} Module</h2>
              <p className="text-xs text-[#6E6E6E] mb-6">
                Explore personalized data and autonomous AI configurations for your identity shift.
              </p>
              <button onClick={() => setActiveTab('Dashboard')} className="btn-pill-primary px-6 py-2.5 text-xs font-semibold">
                Back to Dashboard
              </button>
            </div>
          </div>
        ) : (

          /* MAIN DASHBOARD CONTENT */
          <div className="p-8 space-y-6 max-w-6xl">
            
            {/* GREETING HERO BANNER */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#FAF8F5] rounded-3xl p-8 border border-black/10 shadow-xs relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
            >
              {/* Cybernetic AI Hand Background Artwork on Right */}
              <div className="absolute right-0 top-0 bottom-0 w-80 pointer-events-none opacity-25 mix-blend-multiply overflow-hidden">
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

                <button 
                  onClick={() => setActiveModal('session')}
                  className="btn-pill-primary px-6 py-3 text-xs font-semibold flex items-center gap-2 shadow-md hover:scale-105 transition-transform group"
                >
                  <span>Begin Today's Session</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </motion.div>

            {/* ROW 1: Identity Transformation & Today's Curation */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Left Card: IDENTITY TRANSFORMATION (7 cols) */}
              <motion.div 
                whileHover={{ y: -2 }}
                className="md:col-span-7 bg-[#FAF8F5] rounded-3xl p-6 border border-black/10 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-[#6E6E6E]">
                      IDENTITY TRANSFORMATION
                    </span>
                    <button 
                      onClick={() => {
                        const newProg = Math.min(100, progressPercent + 15);
                        setProgressPercent(newProg);
                        if (newProg >= 50) setCurrentIdentity('Focusing Apprentice');
                        if (newProg >= 90) setCurrentIdentity('Deeply Focused');
                        confetti({ particleCount: 40, spread: 60 });
                      }}
                      className="text-[10px] font-mono text-black/60 hover:text-black underline"
                    >
                      Simulate Progress +15%
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-xs mb-2">
                    <div>
                      <div className="text-[10px] font-mono text-[#6E6E6E] uppercase mb-0.5">CURRENT IDENTITY</div>
                      <div className="font-bold text-base text-[#111111]">{currentIdentity}</div>
                    </div>

                    <div className="text-center">
                      <span className="font-bold text-base text-[#111111]">{progressPercent}%</span>
                      <div className="text-[9px] font-mono text-[#6E6E6E]">Progress</div>
                    </div>

                    <div className="text-right">
                      <div className="text-[10px] font-mono text-[#6E6E6E] uppercase mb-0.5">TARGET IDENTITY</div>
                      <div className="font-bold text-base text-[#111111]">{targetIdentity}</div>
                    </div>
                  </div>

                  {/* Interactive Progress Bar */}
                  <div 
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const clickX = e.clientX - rect.left;
                      const newPct = Math.round((clickX / rect.width) * 100);
                      setProgressPercent(newPct);
                      confetti({ particleCount: 30, spread: 50 });
                    }}
                    className="relative w-full h-3 bg-black/10 rounded-full my-6 flex items-center cursor-pointer group"
                    title="Click to adjust your identity transformation progress"
                  >
                    <div className="h-full bg-black rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }} />
                    <div 
                      className="w-4 h-4 bg-black rounded-full border-2 border-white shadow-md transition-all duration-500 group-hover:scale-125"
                      style={{ transform: `translateX(-50%)` }}
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-black/5">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-[10px] font-mono text-[#6E6E6E] uppercase">ACTIVE GOAL</div>
                    <button 
                      onClick={() => setIsEditingGoal(!isEditingGoal)} 
                      className="text-[10px] font-mono text-black underline"
                    >
                      {isEditingGoal ? 'Cancel' : 'Edit Goal'}
                    </button>
                  </div>

                  {isEditingGoal ? (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        defaultValue={activeGoal}
                        onChange={(e) => setNewGoalInput(e.target.value)}
                        className="flex-1 px-3 py-1.5 border border-black/20 rounded-xl text-xs bg-white text-[#111111] focus:outline-none"
                      />
                      <button
                        onClick={() => {
                          if (newGoalInput.trim()) setActiveGoal(newGoalInput);
                          setIsEditingGoal(false);
                        }}
                        className="px-3 py-1.5 bg-black text-white rounded-xl text-xs font-bold"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-xl bg-black/5 text-black">
                        <Target className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-sm text-[#111111]">{activeGoal}</div>
                        <div className="text-xs text-[#6E6E6E]">Small steps today. Massive change tomorrow.</div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Right Card: TODAY'S CURATION (5 cols) */}
              <motion.div 
                whileHover={{ y: -2 }}
                className="md:col-span-5 bg-[#FAF8F5] rounded-3xl p-6 border border-black/10 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-[#6E6E6E]">
                      TODAY'S CURATION
                    </span>
                    <span className="text-[10px] font-mono text-[#6E6E6E]">
                      {Object.values(completedItems).filter(Boolean).length}/3 Done
                    </span>
                  </div>

                  <div className="space-y-3">
                    {/* Watch */}
                    <div 
                      onClick={() => handleCompleteCurationItem('watch', 60)}
                      className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer ${
                        completedItems.watch ? 'bg-emerald-50 border-emerald-300 text-emerald-950' : 'bg-white border-black/5 hover:border-black'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${completedItems.watch ? 'bg-emerald-600 text-white' : 'bg-black text-white'}`}>
                          {completedItems.watch ? <Check className="w-4 h-4" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
                        </div>
                        <div>
                          <div className="text-[10px] font-mono text-[#6E6E6E]">Watch</div>
                          <div className={`text-xs font-bold ${completedItems.watch ? 'line-through' : 'text-[#111111]'}`}>
                            Atomic Habits Chapter 3
                          </div>
                        </div>
                      </div>
                      <span className="text-[11px] font-mono text-[#6E6E6E]">12 min</span>
                    </div>

                    {/* Read */}
                    <div 
                      onClick={() => handleCompleteCurationItem('read', 40)}
                      className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer ${
                        completedItems.read ? 'bg-emerald-50 border-emerald-300 text-emerald-950' : 'bg-white border-black/5 hover:border-black'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${completedItems.read ? 'bg-emerald-600 text-white' : 'bg-black text-white'}`}>
                          {completedItems.read ? <Check className="w-4 h-4" /> : <Book className="w-3.5 h-3.5" />}
                        </div>
                        <div>
                          <div className="text-[10px] font-mono text-[#6E6E6E]">Read</div>
                          <div className={`text-xs font-bold ${completedItems.read ? 'line-through' : 'text-[#111111]'}`}>
                            Deep Work Summary
                          </div>
                        </div>
                      </div>
                      <span className="text-[11px] font-mono text-[#6E6E6E]">8 min</span>
                    </div>

                    {/* Practice */}
                    <div 
                      onClick={() => setActiveModal('practice')}
                      className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer ${
                        completedItems.practice ? 'bg-emerald-50 border-emerald-300 text-emerald-950' : 'bg-white border-black/5 hover:border-black'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${completedItems.practice ? 'bg-emerald-600 text-white' : 'bg-black text-white'}`}>
                          {completedItems.practice ? <Check className="w-4 h-4" /> : <Zap className="w-3.5 h-3.5" />}
                        </div>
                        <div>
                          <div className="text-[10px] font-mono text-[#6E6E6E]">Practice</div>
                          <div className={`text-xs font-bold ${completedItems.practice ? 'line-through' : 'text-[#111111]'}`}>
                            25-minute Focus Sprint
                          </div>
                        </div>
                      </div>
                      <button className="text-xs font-bold text-black flex items-center gap-1 hover:underline">
                        Start <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>

            {/* ROW 2: AI Reflection, Momentum, AI Confidence */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* AI Reflection */}
              <motion.div 
                whileHover={{ y: -2 }}
                className="bg-[#FAF8F5] rounded-3xl p-6 border border-black/10 shadow-xs flex flex-col justify-between relative"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-[#6E6E6E]">
                    AI REFLECTION
                  </span>
                  <button 
                    onClick={handleNextReflection}
                    className="p-1 rounded-full hover:bg-black/5 text-black/60 hover:text-black transition-colors"
                    title="Generate Next Insight"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-3">
                  <p className="text-xs text-[#555555] font-light leading-relaxed italic">
                    "{reflections[reflectionIndex].quote}"
                  </p>
                  <div className="text-xs font-medium text-[#111111] bg-black/5 p-3 rounded-2xl border border-black/5">
                    <strong>Today's recommendation:</strong> <br />
                    {reflections[reflectionIndex].recommendation}
                  </div>
                </div>
              </motion.div>

              {/* Momentum */}
              <motion.div 
                whileHover={{ y: -2 }}
                className="bg-[#FAF8F5] rounded-3xl p-6 border border-black/10 shadow-xs flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-[#6E6E6E]">
                    MOMENTUM
                  </span>
                  <span className="text-[10px] font-mono text-[#6E6E6E]">Click boxes to check in</span>
                </div>

                {/* Day Tracker */}
                <div>
                  <div className="flex items-center gap-1.5 mb-2">
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
                      <div 
                        key={idx} 
                        onClick={() => handleToggleDay(idx)}
                        className="flex-1 flex flex-col items-center gap-1 cursor-pointer group"
                      >
                        <div 
                          className={`w-full h-5 rounded-xs transition-all duration-200 ${
                            dayCheckins[idx] 
                              ? 'bg-black scale-105 shadow-xs' 
                              : 'border border-black/20 hover:bg-black/10'
                          }`} 
                        />
                        <span className="text-[9px] font-mono text-[#6E6E6E]">{day}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-sm text-[#111111]">{streakCount} day consistency</div>
                      <div className="text-xs text-[#6E6E6E]">Keep going, Neha!</div>
                    </div>
                    <Flame className="w-5 h-5 text-orange-500 fill-orange-500 animate-pulse" />
                  </div>
                </div>
              </motion.div>

              {/* AI Confidence */}
              <motion.div 
                whileHover={{ y: -2 }}
                onClick={handleSimulateAiTraining}
                className="bg-[#FAF8F5] rounded-3xl p-6 border border-black/10 shadow-xs flex items-center gap-4 cursor-pointer hover:border-black transition-all"
                title="Click to train AI Curator model"
              >
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
                      className="text-black transition-all duration-500"
                      strokeDasharray={`${aiConfidence}, 100`}
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <span className="absolute font-bold text-sm text-[#111111]">{aiConfidence}%</span>
                </div>

                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest font-bold text-[#6E6E6E] mb-1">
                    AI CONFIDENCE
                  </div>
                  <div className="text-xs text-[#111111] leading-relaxed font-semibold">
                    Your curator understands your habits well.
                  </div>
                  <div className="text-[10px] text-[#6E6E6E] mt-1 font-light">
                    Click to optimize neural model.
                  </div>
                </div>
              </motion.div>

            </div>

            {/* ROW 3: Identity Stage & Recent Growth */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Identity Stage (7 cols) */}
              <motion.div 
                whileHover={{ y: -2 }}
                className="md:col-span-7 bg-[#FAF8F5] rounded-3xl p-6 border border-black/10 shadow-xs flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-[#6E6E6E]">
                    IDENTITY STAGE
                  </span>
                  <span className="text-[10px] font-mono text-black font-semibold">Active: {selectedStage}</span>
                </div>

                {/* Stepper Timeline */}
                <div className="relative py-4">
                  {/* Horizontal Connecting Line */}
                  <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-black/10 -translate-y-1/2" />
                  <div 
                    className="absolute top-1/2 left-4 h-0.5 bg-black -translate-y-1/2 transition-all duration-500" 
                    style={{ width: `${Math.min(100, (progressPercent / 100) * 85)}%` }} 
                  />

                  <div className="relative flex justify-between items-center text-center">
                    {stages.map((stage, idx) => (
                      <div 
                        key={stage.name}
                        onClick={() => {
                          setSelectedStage(stage.name);
                          setStageDetailsModal(stage);
                        }}
                        className="flex flex-col items-center cursor-pointer group"
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 transition-transform group-hover:scale-110 ${
                          selectedStage === stage.name 
                            ? 'bg-black text-white shadow-md' 
                            : stage.unlocked ? 'bg-white border-2 border-black text-black' : 'bg-white border-2 border-black/20 text-[#6E6E6E]'
                        }`}>
                          {idx === 0 ? <Sparkles className="w-3.5 h-3.5" /> : idx === 3 ? <Crown className="w-3.5 h-3.5" /> : <div className="w-2 h-2 bg-current rounded-full" />}
                        </div>
                        <span className={`text-xs font-bold mt-2 ${selectedStage === stage.name ? 'text-black' : 'text-[#6E6E6E]'}`}>
                          {stage.name.split(' ')[0]}<br />{stage.name.split(' ')[1]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Recent Growth (5 cols) */}
              <motion.div 
                whileHover={{ y: -2 }}
                className="md:col-span-5 bg-[#FAF8F5] rounded-3xl p-6 border border-black/10 shadow-xs flex flex-col justify-between"
              >
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
                  <button 
                    onClick={() => alert("Loading full activity timeline archive...")}
                    className="text-xs font-bold text-black hover:underline inline-flex items-center gap-1"
                  >
                    View All Activity <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </motion.div>

            </div>

          </div>
        )}

      </main>

      {/* INTERACTIVE PRACTICE FOCUS SPRINT MODAL */}
      <AnimatePresence>
        {activeModal === 'practice' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#F8F6F2] rounded-3xl p-8 max-w-md w-full border border-black/15 shadow-2xl relative"
            >
              <button
                onClick={() => {
                  setActiveModal(null);
                  setIsTimerRunning(false);
                }}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-black/5"
              >
                <X className="w-5 h-5 text-black" />
              </button>

              <div className="text-center">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#6E6E6E] font-bold block mb-2">
                  25-MINUTE FOCUS SPRINT
                </span>
                <h3 className="font-editorial text-3xl font-bold text-[#111111] mb-6">
                  Deep Work Protocol
                </h3>

                {/* Countdown Timer Display */}
                <div className="font-mono text-6xl font-bold text-[#111111] mb-8 tracking-wider">
                  {formatTime(timerTime)}
                </div>

                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={() => setIsTimerRunning(!isTimerRunning)}
                    className="btn-pill-primary px-8 py-3 text-sm font-semibold flex items-center gap-2"
                  >
                    {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                    <span>{isTimerRunning ? 'Pause Sprint' : 'Start Focus Sprint'}</span>
                  </button>

                  <button
                    onClick={() => {
                      handleCompleteCurationItem('practice', 100);
                      setActiveModal(null);
                      setIsTimerRunning(false);
                    }}
                    className="btn-pill-secondary px-6 py-3 text-sm font-semibold"
                  >
                    Mark Done
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* INTERACTIVE TODAY'S SESSION MODAL */}
      <AnimatePresence>
        {activeModal === 'session' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#F8F6F2] rounded-3xl p-8 max-w-lg w-full border border-black/15 shadow-2xl relative"
            >
              <button
                onClick={() => setActiveModal(null)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-black/5"
              >
                <X className="w-5 h-5 text-black" />
              </button>

              <span className="text-[10px] font-mono uppercase tracking-widest text-[#6E6E6E] font-bold block mb-2">
                DAILY GROWTH SESSION
              </span>
              <h3 className="font-editorial text-3xl font-bold text-[#111111] mb-4">
                Today's Identity Shift
              </h3>
              <p className="text-xs text-[#6E6E6E] mb-6 leading-relaxed">
                Your AI curator has structured 3 high-leverage micro-actions to transition from <strong>{currentIdentity}</strong> to <strong>{targetIdentity}</strong>.
              </p>

              <div className="space-y-3 mb-8">
                <div className="p-3 bg-white rounded-2xl border border-black/10 flex items-center gap-3 text-xs">
                  <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center font-bold text-xs">1</div>
                  <span>Review & Clear Distractions (5 mins)</span>
                </div>
                <div className="p-3 bg-white rounded-2xl border border-black/10 flex items-center gap-3 text-xs">
                  <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center font-bold text-xs">2</div>
                  <span>Execute 25-Min Focus Sprint</span>
                </div>
                <div className="p-3 bg-white rounded-2xl border border-black/10 flex items-center gap-3 text-xs">
                  <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center font-bold text-xs">3</div>
                  <span>Record Evening Reflection</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setActiveModal(null);
                  handleCompleteCurationItem('practice', 120);
                  confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
                }}
                className="w-full btn-pill-primary py-3.5 text-xs font-semibold flex items-center justify-center gap-2"
              >
                <span>Complete Session & Claim +120 XP</span>
                <Sparkles className="w-4 h-4 text-yellow-400" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* STAGE DETAILS MODAL */}
      <AnimatePresence>
        {stageDetailsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#F8F6F2] rounded-3xl p-8 max-w-md w-full border border-black/15 shadow-2xl relative"
            >
              <button
                onClick={() => setStageDetailsModal(null)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-black/5"
              >
                <X className="w-5 h-5 text-black" />
              </button>

              <span className="text-[10px] font-mono uppercase tracking-widest text-[#6E6E6E] font-bold block mb-2">
                STAGE MILESTONE • {stageDetailsModal.level}
              </span>
              <h3 className="font-editorial text-3xl font-bold text-[#111111] mb-2">
                {stageDetailsModal.name}
              </h3>
              <p className="text-xs text-[#6E6E6E] mb-6">
                {stageDetailsModal.desc}
              </p>

              <div className="p-4 bg-white rounded-2xl border border-black/10 text-xs space-y-2 mb-6">
                <div className="font-bold text-[#111111]">Stage Requirements:</div>
                <div className="flex items-center gap-2 text-[#6E6E6E]">
                  <CheckCircle className="w-3.5 h-3.5 text-black" /> Maintain 14-day consistency streak
                </div>
                <div className="flex items-center gap-2 text-[#6E6E6E]">
                  <CheckCircle className="w-3.5 h-3.5 text-black" /> Complete 10 Deep Work Sprints
                </div>
              </div>

              <button
                onClick={() => setStageDetailsModal(null)}
                className="w-full btn-pill-primary py-3 text-xs font-semibold"
              >
                Close Milestone Overview
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
