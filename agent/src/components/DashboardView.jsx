import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  LayoutDashboard,
  Target,
  Brain,
  BookOpen,
  Compass,
  TrendingUp,
  Bot,
  BookMarked,
  Settings,
  Bell,
  Search,
  Sun,
  Moon,
  LogOut,
  ArrowRight,
  Sparkles,
  MessageSquare,
  X,
  Play,
  Pause,
  CheckCircle2,
  Clock,
  Zap,
  Flame,
  Award,
  ChevronRight,
  Filter,
  Check,
  Crown,
  Book,
  Headphones,
  Video,
  FileText,
  RotateCcw,
  Send,
  Info,
  Maximize2,
  ChevronLeft,
  Calendar,
  Layers,
  HelpCircle,
  Plus
} from 'lucide-react';

export default function DashboardView({ onBackToHome }) {
  // ==========================================
  // THEME & NAVIGATION STATE
  // ==========================================
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeNav, setActiveNav] = useState('Dashboard');

  // Top Navbar Popover / Modal States
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFilter, setSearchFilter] = useState('All');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Floating AI Assistant Chat
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'ai', text: 'Hello Neha! I am your FutureSelf Curator. How can I accelerate your growth today?' }
  ]);
  const [chatInput, setChatInput] = useState('');

  // ==========================================
  // IDENTITY & PROGRESS STATE
  // ==========================================
  const [currentIdentity, setCurrentIdentity] = useState('Procrastinator');
  const [targetIdentity, setTargetIdentity] = useState('Deep Focused Builder');
  const [identityProgress, setIdentityProgress] = useState(28); // %
  const [xp, setXp] = useState(1480);
  const [level, setLevel] = useState(5);
  const [showUpdateIdentityModal, setShowUpdateIdentityModal] = useState(false);

  // ==========================================
  // TODAY'S MISSION (REAL TIMER)
  // ==========================================
  const [missionTitle, setMissionTitle] = useState('90-Minute Strategic Deep Work');
  const [missionTimeLeft, setMissionTimeLeft] = useState(25 * 60); // 25 mins
  const [isMissionRunning, setIsMissionRunning] = useState(false);
  const [missionCompleted, setMissionCompleted] = useState(false);

  useEffect(() => {
    let timer = null;
    if (isMissionRunning && missionTimeLeft > 0) {
      timer = setInterval(() => setMissionTimeLeft((prev) => prev - 1), 1000);
    } else if (missionTimeLeft === 0 && isMissionRunning) {
      setIsMissionRunning(false);
      setMissionCompleted(true);
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
    }
    return () => clearInterval(timer);
  }, [isMissionRunning, missionTimeLeft]);

  // ==========================================
  // TODAY'S CURATION RECOMMENDATIONS
  // ==========================================
  const [curations, setCurations] = useState([
    {
      id: 1,
      type: 'Watch',
      title: 'Atomic Habits Chapter 3: Identity & Systems',
      estTime: '12 min',
      difficulty: 'Easy',
      reason: 'Your morning focus routine needs stronger cue triggers.',
      completed: false,
      icon: Video
    },
    {
      id: 2,
      type: 'Read',
      title: 'Deep Work Summary & Circadian Cognitive Pacing',
      estTime: '8 min',
      difficulty: 'Medium',
      reason: 'Aligns with your peak focus hours between 10 AM & 1 PM.',
      completed: false,
      icon: Book
    },
    {
      id: 3,
      type: 'Podcast',
      title: 'Huberman Lab: Neuroplasticity & Dopamine Rewards',
      estTime: '24 min',
      difficulty: 'Medium',
      reason: 'Recommended based on your goal to build rapid skill mastery.',
      completed: false,
      icon: Headphones
    },
    {
      id: 4,
      type: 'Practice',
      title: '25-minute Focus Sprint Protocol',
      estTime: '25 min',
      difficulty: 'Hard',
      reason: 'Direct action to shift identity towards Deep Focused Builder.',
      completed: false,
      icon: Zap
    }
  ]);

  // ==========================================
  // HABIT STREAK TRACKER
  // ==========================================
  const [weekDays, setWeekDays] = useState([
    { day: 'Mon', checked: true },
    { day: 'Tue', checked: true },
    { day: 'Wed', checked: true },
    { day: 'Thu', checked: true },
    { day: 'Fri', checked: true },
    { day: 'Sat', checked: false },
    { day: 'Sun', checked: false }
  ]);
  const currentStreak = weekDays.filter((d) => d.checked).length;
  const longestStreak = 14;
  const consistencyPct = Math.round((currentStreak / 7) * 100);

  const toggleDayCheck = (index) => {
    const updated = [...weekDays];
    updated[index].checked = !updated[index].checked;
    setWeekDays(updated);

    if (updated[index].checked) {
      setXp((prev) => prev + 40);
      confetti({ particleCount: 30, spread: 50 });
    }
  };

  // ==========================================
  // AI REFLECTION & JOURNAL MODAL
  // ==========================================
  const [showReflectionModal, setShowReflectionModal] = useState(false);
  const [journalEntry, setJournalEntry] = useState('');
  const [reflectionLogs, setReflectionLogs] = useState([
    { date: 'Yesterday', note: 'Completed 90-minute focus sprint. Energy high.' }
  ]);

  // ==========================================
  // FUTURE ROADMAP MILESTONES
  // ==========================================
  const [selectedMilestone, setSelectedMilestone] = useState('30 Days');
  const roadmapData = {
    'Current': {
      label: 'Current Baseline',
      skills: ['Basic Pacing', 'Time Blocking'],
      books: ['Atomic Habits'],
      projects: ['Personal Growth Audit'],
      achievements: ['Account Created', 'First Curation Completed']
    },
    '30 Days': {
      label: 'Focus Architect',
      skills: ['Deep Work Protocol', 'Circadian Optimization'],
      books: ['Deep Work', 'Make Time'],
      projects: ['Habit Tracking System', 'Morning Focus Ritual'],
      achievements: ['14-Day Streak', 'Level 5 Master']
    },
    '90 Days': {
      label: 'Identity Shift',
      skills: ['Accelerated Skill Acquisition', 'High Friction Mastery'],
      books: ['Ultralearning', 'Thinking, Fast and Slow'],
      projects: ['Monk Mode Sprint', 'Published Industry Essay'],
      achievements: ['90% Consistency', 'Level 10 Synthesizer']
    },
    '6 Months': {
      label: 'High-Impact Output',
      skills: ['Autonomous Neural Workflows', 'Systems Design'],
      books: ['Principles by Ray Dalio'],
      projects: ['Venture Launch', 'Cognitive Output System'],
      achievements: ['Master Curator Badge']
    },
    'Future Self': {
      label: 'Deep Focused Builder',
      skills: ['Unrestricted Mastery', 'Flow State Control'],
      books: ['Flow', 'The Master and His Emissary'],
      projects: ['Legacy Platform', 'Enduring Impact'],
      achievements: ['Identity Transformation Complete (100%)']
    }
  };

  // ==========================================
  // NOTIFICATIONS LIST
  // ==========================================
  const [notificationsList, setNotificationsList] = useState([
    { id: 1, text: 'Curator synthesized 3 new Deep Work recommendations.', time: '10m ago', unread: true },
    { id: 2, text: 'Level 5 Unlocked! You earned +150 XP.', time: '2h ago', unread: true },
    { id: 3, text: 'Weekly identity alignment report ready for review.', time: '1d ago', unread: false }
  ]);

  // Handlers
  const handleCompleteCuration = (id) => {
    setCurations((prev) =>
      prev.map((item) => {
        if (item.id === id && !item.completed) {
          confetti({ particleCount: 50, spread: 60 });
          setXp((curr) => curr + 50);
          setIdentityProgress((curr) => Math.min(100, curr + 8));
          return { ...item, completed: true };
        }
        return item;
      })
    );
  };

  const handleSendChatMessage = (textToSend = chatInput) => {
    if (!textToSend.trim()) return;
    const userMsg = { sender: 'user', text: textToSend };
    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput('');

    setTimeout(() => {
      let response = "I have analyzed your request. Based on your target identity as a Deep Focused Builder, I recommend starting a 25-minute focus sprint now.";
      if (textToSend.includes('learn')) {
        response = "Today's priority learning is Chapter 3 of Atomic Habits combined with Deep Work Pacing.";
      } else if (textToSend.includes('progress')) {
        response = `You are currently at ${identityProgress}% towards becoming a ${targetIdentity} with a ${currentStreak}-day streak!`;
      } else if (textToSend.includes('goals')) {
        response = `Your current target is "${targetIdentity}". Click 'Update Identity' on your dashboard to refine it!`;
      }

      setChatMessages((prev) => [...prev, { sender: 'ai', text: response }]);
    }, 600);
  };

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const navMenuItems = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: "Today's Mission", icon: Target },
    { name: 'AI Curator', icon: Brain },
    { name: 'Learning Library', icon: BookOpen },
    { name: 'Roadmap', icon: Compass },
    { name: 'Progress', icon: TrendingUp },
    { name: 'AI Team', icon: Bot },
    { name: 'Reflection Journal', icon: BookMarked },
    { name: 'Settings', icon: Settings }
  ];

  return (
    <div className={`min-h-screen font-sans flex relative overflow-hidden transition-colors duration-300 selection:bg-black selection:text-white ${
      darkMode ? 'bg-[#0D0D0D] text-[#F5F5F5]' : 'bg-[#F8F6F2] text-[#111111]'
    }`}>

      {/* ========================================== */}
      {/* LEFT SIDEBAR                               */}
      {/* ========================================== */}
      <aside className={`border-r transition-all duration-300 flex flex-col justify-between p-5 z-20 shrink-0 relative ${
        sidebarCollapsed ? 'w-20' : 'w-64'
      } ${darkMode ? 'bg-[#141414] border-white/10' : 'bg-[#F8F6F2] border-black/10'}`}>
        <div>
          {/* Logo & Collapse Toggle */}
          <div className="flex items-center justify-between mb-8 px-2">
            {!sidebarCollapsed && (
              <div 
                onClick={onBackToHome}
                className="cursor-pointer font-editorial text-xl font-bold tracking-tight hover:opacity-80 transition-opacity"
              >
                FutureSelf <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-black/10 uppercase border border-black/10">AI</span>
              </div>
            )}
            <button 
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-1.5 rounded-xl hover:bg-black/5 text-[#6E6E6E] hover:text-black transition-colors"
              title="Toggle Sidebar"
            >
              {sidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            </button>
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-1">
            {navMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => setActiveNav(item.name)}
                  className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-xs font-semibold transition-all duration-200 group relative ${
                    isActive
                      ? darkMode
                        ? 'bg-white text-black shadow-sm'
                        : 'bg-black text-white shadow-sm'
                      : 'text-[#6E6E6E] hover:bg-black/5 hover:text-black'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {!sidebarCollapsed && <span>{item.name}</span>}
                  
                  {/* Tooltip when collapsed */}
                  {sidebarCollapsed && (
                    <span className="absolute left-full ml-3 px-3 py-1.5 bg-black text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-lg">
                      {item.name}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Bottom Profile */}
        <div className="pt-6 border-t border-black/10">
          <div className="flex items-center gap-3 p-2 rounded-2xl hover:bg-black/5 transition-colors cursor-pointer" onClick={() => setShowProfileMenu(!showProfileMenu)}>
            <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center font-bold text-xs shrink-0">
              N
            </div>
            {!sidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <div className="font-bold text-xs leading-tight truncate">Neha</div>
                <div className="text-[10px] text-[#6E6E6E] truncate">{targetIdentity}</div>
                <div className="text-[9px] font-mono text-emerald-600 font-bold mt-0.5">Lvl {level} • {xp} XP</div>
              </div>
            )}
          </div>
          
          {!sidebarCollapsed && (
            <button 
              onClick={onBackToHome}
              className="mt-3 w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs text-rose-600 hover:bg-rose-50 border border-rose-200 font-semibold transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" /> Logout
            </button>
          )}
        </div>
      </aside>

      {/* ========================================== */}
      {/* MAIN CONTENT WORKSPACE                     */}
      {/* ========================================== */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto relative">
        
        {/* TOP NAVBAR */}
        <header className={`h-16 px-8 flex items-center justify-between border-b backdrop-blur-md sticky top-0 z-30 transition-colors ${
          darkMode ? 'bg-[#141414]/90 border-white/10' : 'bg-[#F8F6F2]/90 border-black/5'
        }`}>
          {/* Search Bar */}
          <div 
            onClick={() => setShowSearchModal(true)}
            className="flex items-center gap-3 px-4 py-2 bg-black/5 rounded-full border border-black/10 text-xs text-[#6E6E6E] cursor-pointer hover:bg-black/10 transition-colors w-64 md:w-96"
          >
            <Search className="w-4 h-4 text-[#6E6E6E]" />
            <span>Search recommendations, skills, books...</span>
            <span className="ml-auto font-mono text-[10px] bg-black/10 px-2 py-0.5 rounded text-black font-semibold">⌘K</span>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-4">
            
            {/* Dark Mode Toggle */}
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 rounded-full hover:bg-black/5 text-[#6E6E6E] transition-colors"
              title="Toggle Dark / Light Mode"
            >
              {darkMode ? <Sun className="w-4 h-4 text-yellow-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Notifications Icon & Popover */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2.5 rounded-full hover:bg-black/5 text-[#6E6E6E] transition-colors relative"
              >
                <Bell className="w-4 h-4" />
                {notificationsList.some(n => n.unread) && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
                )}
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className={`absolute right-0 mt-2 w-80 rounded-2xl shadow-xl p-4 z-50 border ${
                      darkMode ? 'bg-[#1C1C1C] border-white/10' : 'bg-white border-black/10'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3 pb-2 border-b border-black/5">
                      <span className="text-xs font-bold">Notifications</span>
                      <button 
                        onClick={() => setNotificationsList(prev => prev.map(n => ({ ...n, unread: false })))}
                        className="text-[10px] font-mono text-[#6E6E6E] hover:underline"
                      >
                        Mark all read
                      </button>
                    </div>
                    <div className="space-y-2">
                      {notificationsList.map(n => (
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

            {/* Profile Avatar Dropdown */}
            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold text-xs cursor-pointer shadow-xs" onClick={() => setShowProfileMenu(!showProfileMenu)}>
              N
            </div>
          </div>
        </header>

        {/* ========================================== */}
        {/* DASHBOARD PAGE WORKSPACE                   */}
        {/* ========================================== */}
        <div className="p-8 space-y-6 max-w-7xl mx-auto w-full">
          
          {/* HERO SECTION */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-3xl p-8 border shadow-xs relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6 ${
              darkMode ? 'bg-[#181818] border-white/10' : 'bg-[#FAF8F5] border-black/10'
            }`}
          >
            {/* Robotic Hand Artwork with Subtle Floating Animation */}
            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute right-0 top-0 bottom-0 w-80 md:w-96 pointer-events-none select-none overflow-hidden"
            >
              <img
                src="/card-ai-hand.png"
                alt="AI Hand Artwork"
                className="w-full h-full object-contain object-right opacity-90"
              />
            </motion.div>

            <div className="max-w-xl relative z-10">
              <h1 className="font-editorial text-4xl md:text-5xl font-bold tracking-tight mb-3">
                Who Are You <br /> Becoming Today?
              </h1>
              <p className="text-xs md:text-sm text-[#6E6E6E] font-light leading-relaxed mb-6">
                Your AI Curator has analyzed your habits, goals and recent progress to prepare today's personalized growth path.
              </p>

              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setIsMissionRunning(true)}
                  className="btn-pill-primary px-6 py-3 text-xs font-semibold flex items-center gap-2 shadow-md hover:scale-105 transition-transform"
                >
                  <span>Begin Today's Journey</span>
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

          {/* GRID ROW 1: Identity Transformation & Today's Curation */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* IDENTITY TRANSFORMATION CARD (7 cols) */}
            <motion.div 
              whileHover={{ y: -3 }}
              className={`md:col-span-7 rounded-3xl p-6 border shadow-xs flex flex-col justify-between ${
                darkMode ? 'bg-[#181818] border-white/10' : 'bg-[#FAF8F5] border-black/10'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-[#6E6E6E]">
                    IDENTITY TRANSFORMATION
                  </span>
                  <button 
                    onClick={() => setShowUpdateIdentityModal(true)}
                    className="text-[11px] font-mono font-bold text-black dark:text-white underline hover:opacity-80"
                  >
                    Update Identity
                  </button>
                </div>

                <div className="flex items-center justify-between text-xs mb-3">
                  <div>
                    <div className="text-[10px] font-mono text-[#6E6E6E] uppercase mb-0.5">CURRENT</div>
                    <div className="font-bold text-base">{currentIdentity}</div>
                  </div>

                  <div className="text-center">
                    <span className="font-bold text-base">{identityProgress}%</span>
                    <div className="text-[9px] font-mono text-[#6E6E6E]">Progress</div>
                  </div>

                  <div className="text-right">
                    <div className="text-[10px] font-mono text-[#6E6E6E] uppercase mb-0.5">TARGET</div>
                    <div className="font-bold text-base">{targetIdentity}</div>
                  </div>
                </div>

                {/* Animated Progress Bar */}
                <div 
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const newPct = Math.round(((e.clientX - rect.left) / rect.width) * 100);
                    setIdentityProgress(newPct);
                    confetti({ particleCount: 30, spread: 50 });
                  }}
                  className="relative w-full h-3 bg-black/10 dark:bg-white/10 rounded-full my-6 flex items-center cursor-pointer group"
                  title="Click to adjust progress"
                >
                  <div className="h-full bg-black dark:bg-white rounded-full transition-all duration-500" style={{ width: `${identityProgress}%` }} />
                  <div 
                    className="w-4 h-4 bg-black dark:bg-white rounded-full border-2 border-white dark:border-black shadow-md transition-all duration-500 group-hover:scale-125"
                    style={{ transform: `translateX(-50%)` }}
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <Target className="w-4 h-4 text-black dark:text-white" />
                  <div>
                    <div className="font-bold">Build a daily 90m study habit</div>
                    <div className="text-[11px] text-[#6E6E6E]">Small steps today. Massive change tomorrow.</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* TODAY'S CURATION RECOMMENDATIONS (5 cols) */}
            <motion.div 
              whileHover={{ y: -3 }}
              className={`md:col-span-5 rounded-3xl p-6 border shadow-xs flex flex-col justify-between ${
                darkMode ? 'bg-[#181818] border-white/10' : 'bg-[#FAF8F5] border-black/10'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-[#6E6E6E]">
                    TODAY'S CURATION
                  </span>
                  <span className="text-[10px] font-mono text-[#6E6E6E]">
                    {curations.filter(c => c.completed).length}/{curations.length} Done
                  </span>
                </div>

                <div className="space-y-3">
                  {curations.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div 
                        key={item.id}
                        onClick={() => handleCompleteCuration(item.id)}
                        className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                          item.completed 
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-medium' 
                            : 'bg-white border-black/10 text-[#111111] hover:border-black shadow-xs'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                            item.completed ? 'bg-emerald-600 text-white' : 'bg-black text-white'
                          }`}>
                            {item.completed ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                          </div>
                          <div>
                            <div className="text-[10px] font-mono text-[#6E6E6E] font-semibold">{item.type} • {item.estTime}</div>
                            <div className={`text-xs font-bold text-[#111111] ${item.completed ? 'line-through opacity-60' : ''}`}>
                              {item.title}
                            </div>
                          </div>
                        </div>

                        <button className="text-xs font-bold text-black hover:underline shrink-0">
                          {item.completed ? 'Done' : 'Start →'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>

          </div>

          {/* GRID ROW 2: TODAY'S MISSION (LARGE TIMER) */}
          <motion.div 
            whileHover={{ y: -3 }}
            className={`rounded-3xl p-8 border shadow-xs ${
              darkMode ? 'bg-[#181818] border-white/10' : 'bg-[#FAF8F5] border-black/10'
            }`}
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-[#6E6E6E] block mb-2">
                  TODAY'S MISSION PROTOCOL
                </span>
                <h3 className="font-editorial text-3xl font-bold mb-2">{missionTitle}</h3>
                <p className="text-xs text-[#6E6E6E]">Estimated time: 25 mins • High Friction Focus Task</p>
              </div>

              {/* Countdown Timer Display & Controls */}
              <div className="flex items-center gap-6">
                <div className="font-mono text-5xl font-bold tracking-wider">
                  {formatTimer(missionTimeLeft)}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsMissionRunning(!isMissionRunning)}
                    className="btn-pill-primary px-6 py-3 text-xs font-semibold flex items-center gap-2"
                  >
                    {isMissionRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                    <span>{isMissionRunning ? 'Pause' : 'Start'}</span>
                  </button>

                  <button
                    onClick={() => {
                      setMissionCompleted(true);
                      setIsMissionRunning(false);
                      confetti({ particleCount: 70, spread: 60 });
                      setXp((curr) => curr + 100);
                    }}
                    className="btn-pill-secondary px-6 py-3 text-xs font-semibold"
                  >
                    Complete
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* GRID ROW 3: AI Reflection, Habit Streak, AI Confidence */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* AI REFLECTION */}
            <motion.div 
              whileHover={{ y: -3 }}
              className={`rounded-3xl p-6 border shadow-xs flex flex-col justify-between ${
                darkMode ? 'bg-[#181818] border-white/10' : 'bg-[#FAF8F5] border-black/10'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-[#6E6E6E]">
                    AI REFLECTION
                  </span>
                  <Brain className="w-4 h-4" />
                </div>
                <p className="text-xs text-[#555555] dark:text-[#AAAAAA] font-light leading-relaxed mb-4 italic">
                  "Yesterday you were most productive between 10 AM and 1 PM."
                </p>
                <div className="text-xs font-semibold p-3 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5">
                  <strong>Recommendation:</strong> Schedule deep work during that window.
                </div>
              </div>

              <button 
                onClick={() => setShowReflectionModal(true)}
                className="mt-6 w-full btn-pill-secondary py-2.5 text-xs font-semibold"
              >
                Reflect in Journal
              </button>
            </motion.div>

            {/* HABIT STREAK */}
            <motion.div 
              whileHover={{ y: -3 }}
              className={`rounded-3xl p-6 border shadow-xs flex flex-col justify-between ${
                darkMode ? 'bg-[#181818] border-white/10' : 'bg-[#FAF8F5] border-black/10'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-[#6E6E6E]">
                    HABIT STREAK
                  </span>
                  <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
                </div>

                {/* Day Checkers */}
                <div className="flex items-center justify-between gap-1 mb-4">
                  {weekDays.map((d, i) => (
                    <div 
                      key={d.day}
                      onClick={() => toggleDayCheck(i)}
                      className="flex-1 flex flex-col items-center gap-1 cursor-pointer"
                    >
                      <div className={`w-full h-8 rounded-lg flex items-center justify-center transition-all ${
                        d.checked ? 'bg-black dark:bg-white text-white dark:text-black font-bold' : 'border border-black/20 hover:bg-black/10'
                      }`}>
                        {d.checked && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <span className="text-[9px] font-mono text-[#6E6E6E]">{d.day}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-black/5">
                  <div>
                    <div className="font-bold">{currentStreak} Days</div>
                    <div className="text-[10px] text-[#6E6E6E]">Current Streak</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{consistencyPct}%</div>
                    <div className="text-[10px] text-[#6E6E6E]">Consistency</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* AI CONFIDENCE */}
            <motion.div 
              whileHover={{ y: -3 }}
              className={`rounded-3xl p-6 border shadow-xs flex items-center gap-4 relative group ${
                darkMode ? 'bg-[#181818] border-white/10' : 'bg-[#FAF8F5] border-black/10'
              }`}
            >
              <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-black/10 dark:text-white/10"
                    strokeWidth="3"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-black dark:text-white"
                    strokeDasharray="89, 100"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="absolute font-bold text-sm">89%</span>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-[#6E6E6E] block mb-1">
                  AI CONFIDENCE
                </span>
                <p className="text-xs leading-relaxed font-semibold">
                  The AI understands your learning style well.
                </p>
                <div className="text-[10px] text-[#6E6E6E] mt-1 font-mono">
                  Accuracy improving daily
                </div>
              </div>
            </motion.div>

          </div>

          {/* GRID ROW 4: FUTURE ROADMAP (TIMELINE) */}
          <motion.div 
            whileHover={{ y: -3 }}
            className={`rounded-3xl p-8 border shadow-xs ${
              darkMode ? 'bg-[#181818] border-white/10' : 'bg-[#FAF8F5] border-black/10'
            }`}
          >
            <div className="flex items-center justify-between mb-6">
              <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-[#6E6E6E]">
                FUTURE ROADMAP (EXPANDABLE MILESTONES)
              </span>
              <span className="text-xs font-mono font-semibold">Active Milestone: {selectedMilestone}</span>
            </div>

            {/* Horizontal Timeline Buttons */}
            <div className="grid grid-cols-5 gap-3 mb-8">
              {Object.keys(roadmapData).map((key) => (
                <button
                  key={key}
                  onClick={() => setSelectedMilestone(key)}
                  className={`py-3 rounded-2xl text-xs font-bold transition-all border ${
                    selectedMilestone === key
                      ? 'bg-black text-white border-black shadow-sm scale-105'
                      : 'bg-white text-[#111111] border-black/10 hover:border-black shadow-xs'
                  }`}
                >
                  {key}
                </button>
              ))}
            </div>

            {/* Expanded Milestone Details */}
            <div className="bg-white p-6 rounded-2xl border border-black/10 grid grid-cols-1 md:grid-cols-4 gap-6 text-xs text-[#111111] shadow-xs">
              <div>
                <div className="font-mono text-[10px] text-[#6E6E6E] uppercase font-semibold mb-1">SKILLS TO MASTER</div>
                <div className="font-bold text-sm mb-2">{roadmapData[selectedMilestone].skills.join(', ')}</div>
              </div>
              <div>
                <div className="font-mono text-[10px] text-[#6E6E6E] uppercase font-semibold mb-1">CURATED BOOKS</div>
                <div className="font-bold text-sm mb-2">{roadmapData[selectedMilestone].books.join(', ')}</div>
              </div>
              <div>
                <div className="font-mono text-[10px] text-[#6E6E6E] uppercase font-semibold mb-1">PROJECT OUTPUT</div>
                <div className="font-bold text-sm mb-2">{roadmapData[selectedMilestone].projects.join(', ')}</div>
              </div>
              <div>
                <div className="font-mono text-[10px] text-[#6E6E6E] uppercase font-semibold mb-1">KEY ACHIEVEMENTS</div>
                <div className="font-bold text-sm mb-2 text-emerald-600 font-semibold">{roadmapData[selectedMilestone].achievements.join(', ')}</div>
              </div>
            </div>
          </motion.div>

          {/* GRID ROW 5: RECENT GROWTH (ACTIVITY FEED) */}
          <motion.div 
            whileHover={{ y: -3 }}
            className="rounded-3xl p-6 border border-black/10 shadow-xs flex flex-col justify-between bg-[#FAF8F5] text-[#111111]"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-[#6E6E6E]">
                RECENT GROWTH ACTIVITY
              </span>
              <button 
                onClick={() => alert("Showing all historical logs...")}
                className="text-xs font-bold text-black hover:underline flex items-center gap-1"
              >
                View All <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3.5 bg-white rounded-2xl border border-black/10 shadow-xs">
                <div className="flex items-center gap-3 font-semibold text-[#111111]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Finished Morning 90m Deep Work Session</span>
                </div>
                <span className="font-mono text-[10px] text-[#6E6E6E] font-semibold">Yesterday</span>
              </div>
              <div className="flex items-center justify-between p-3.5 bg-white rounded-2xl border border-black/10 shadow-xs">
                <div className="flex items-center gap-3 font-semibold text-[#111111]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Read Psychology of Success & Summarized Insights</span>
                </div>
                <span className="font-mono text-[10px] text-[#6E6E6E] font-semibold">Yesterday</span>
              </div>
              <div className="flex items-center justify-between p-3.5 bg-white rounded-2xl border border-black/10 shadow-xs">
                <div className="flex items-center gap-3 font-semibold text-[#111111]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Reflection Journal Entry Recorded</span>
                </div>
                <span className="font-mono text-[10px] text-[#6E6E6E] font-semibold">2 Days Ago</span>
              </div>
            </div>
          </motion.div>

        </div>
      </main>

      {/* ========================================== */}
      {/* FLOATING AI ASSISTANT CHAT                */}
      {/* ========================================== */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isChatOpen ? (
          <button
            onClick={() => setIsChatOpen(true)}
            className="w-14 h-14 rounded-full bg-black text-white shadow-2xl flex items-center justify-center hover:scale-110 transition-transform group"
            title="Ask AI Curator"
          >
            <Sparkles className="w-6 h-6 text-yellow-400 group-hover:rotate-12 transition-transform" />
          </button>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className={`w-96 rounded-3xl border shadow-2xl overflow-hidden flex flex-col ${
              darkMode ? 'bg-[#1C1C1C] border-white/10' : 'bg-white border-black/15'
            }`}
          >
            {/* Header */}
            <div className="p-4 bg-black text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span className="font-bold text-xs">FutureSelf AI Curator</span>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="p-1 rounded-full hover:bg-white/20">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="p-4 h-72 overflow-y-auto space-y-3 text-xs">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`p-3 rounded-2xl max-w-[85%] ${
                    msg.sender === 'user' 
                      ? 'bg-black text-white rounded-br-none' 
                      : 'bg-black/5 dark:bg-white/10 text-black dark:text-white rounded-bl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Prompts */}
            <div className="px-4 py-2 border-t border-black/5 flex gap-2 overflow-x-auto text-[10px] font-mono">
              <button onClick={() => handleSendChatMessage("What should I learn today?")} className="px-2.5 py-1 bg-black/5 rounded-full hover:bg-black/10 shrink-0">
                What should I learn today?
              </button>
              <button onClick={() => handleSendChatMessage("Show my progress")} className="px-2.5 py-1 bg-black/5 rounded-full hover:bg-black/10 shrink-0">
                Show my progress
              </button>
            </div>

            {/* Input */}
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSendChatMessage();
              }}
              className="p-3 border-t border-black/10 flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask your AI Curator..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="flex-1 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-3 py-2 text-xs focus:outline-none"
              />
              <button type="submit" className="p-2 bg-black text-white rounded-xl hover:bg-black/80">
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </div>

      {/* ========================================== */}
      {/* UPDATE IDENTITY MODAL                      */}
      {/* ========================================== */}
      <AnimatePresence>
        {showUpdateIdentityModal && (
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
              className="bg-[#F8F6F2] dark:bg-[#181818] rounded-3xl p-8 max-w-md w-full border border-black/15 shadow-2xl relative"
            >
              <button onClick={() => setShowUpdateIdentityModal(false)} className="absolute top-6 right-6 p-2 rounded-full hover:bg-black/5">
                <X className="w-5 h-5" />
              </button>

              <span className="text-[10px] font-mono uppercase tracking-widest text-[#6E6E6E] font-bold block mb-2">
                UPDATE IDENTITY GOAL
              </span>
              <h3 className="font-editorial text-3xl font-bold mb-6">Redefine Your Target</h3>

              <div className="space-y-4 text-xs mb-8">
                <div>
                  <label className="block text-[#6E6E6E] mb-1 font-bold">Current Identity</label>
                  <input 
                    type="text"
                    value={currentIdentity}
                    onChange={(e) => setCurrentIdentity(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-black/15 bg-white dark:bg-[#222] font-semibold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#6E6E6E] mb-1 font-bold">Target Identity Vision</label>
                  <input 
                    type="text"
                    value={targetIdentity}
                    onChange={(e) => setTargetIdentity(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-black/15 bg-white dark:bg-[#222] font-semibold focus:outline-none"
                  />
                </div>
              </div>

              <button 
                onClick={() => {
                  setShowUpdateIdentityModal(false);
                  confetti({ particleCount: 50, spread: 60 });
                }}
                className="w-full btn-pill-primary py-3 text-xs font-semibold"
              >
                Save Identity Shift
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================== */}
      {/* REFLECTION JOURNAL MODAL                  */}
      {/* ========================================== */}
      <AnimatePresence>
        {showReflectionModal && (
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
              className="bg-[#F8F6F2] dark:bg-[#181818] rounded-3xl p-8 max-w-lg w-full border border-black/15 shadow-2xl relative"
            >
              <button onClick={() => setShowReflectionModal(false)} className="absolute top-6 right-6 p-2 rounded-full hover:bg-black/5">
                <X className="w-5 h-5" />
              </button>

              <span className="text-[10px] font-mono uppercase tracking-widest text-[#6E6E6E] font-bold block mb-2">
                DAILY REFLECTION JOURNAL
              </span>
              <h3 className="font-editorial text-3xl font-bold mb-4">Record Today's Insights</h3>

              <textarea 
                rows={5}
                placeholder="What friction did you encounter today? What habit win made you feel aligned with your target identity?"
                value={journalEntry}
                onChange={(e) => setJournalEntry(e.target.value)}
                className="w-full p-4 rounded-2xl border border-black/15 bg-white dark:bg-[#222] text-xs leading-relaxed focus:outline-none mb-6"
              />

              <button 
                onClick={() => {
                  if (journalEntry.trim()) {
                    setReflectionLogs(prev => [{ date: 'Today', note: journalEntry }, ...prev]);
                    setJournalEntry('');
                    setXp(curr => curr + 75);
                    confetti({ particleCount: 50, spread: 60 });
                  }
                  setShowReflectionModal(false);
                }}
                className="w-full btn-pill-primary py-3 text-xs font-semibold"
              >
                Save Reflection & Claim +75 XP
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================== */}
      {/* GLOBAL SEARCH MODAL                       */}
      {/* ========================================== */}
      <AnimatePresence>
        {showSearchModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-20 p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: -10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: -10 }}
              className="bg-[#F8F6F2] text-[#111111] rounded-3xl p-6 max-w-2xl w-full border border-black/15 shadow-2xl relative"
            >
              <div className="flex items-center gap-3 pb-4 border-b border-black/10">
                <Search className="w-5 h-5 text-[#6E6E6E]" />
                <input 
                  autoFocus
                  type="text"
                  placeholder="Search FutureSelf AI (e.g. Deep Work, Habits, Podcasts)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent text-sm font-semibold text-[#111111] placeholder:text-[#6E6E6E] focus:outline-none"
                />
                <button onClick={() => setShowSearchModal(false)} className="p-1 rounded-full hover:bg-black/5 text-[#111111]">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Filter Pills */}
              <div className="flex gap-2 my-4 text-xs font-mono overflow-x-auto pb-2">
                {['All', 'Videos', 'Books', 'Courses', 'Podcasts'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setSearchFilter(filter)}
                    className={`px-3 py-1 rounded-full border transition-colors ${
                      searchFilter === filter ? 'bg-black text-white border-black font-bold' : 'bg-white text-[#111111] border-black/15 hover:border-black font-medium'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              {/* Search Results */}
              <div className="space-y-2.5 max-h-80 overflow-y-auto text-xs">
                <div className="p-3.5 bg-white text-[#111111] rounded-2xl border border-black/10 hover:border-black shadow-xs cursor-pointer flex items-center justify-between transition-colors">
                  <div>
                    <div className="font-bold text-sm text-[#111111]">Atomic Habits Chapter 3</div>
                    <div className="text-[10px] font-mono text-[#6E6E6E] font-semibold">Video • 12 min</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#111111]" />
                </div>
                <div className="p-3.5 bg-white text-[#111111] rounded-2xl border border-black/10 hover:border-black shadow-xs cursor-pointer flex items-center justify-between transition-colors">
                  <div>
                    <div className="font-bold text-sm text-[#111111]">Deep Work Pacing & Circadian Rhythms</div>
                    <div className="text-[10px] font-mono text-[#6E6E6E] font-semibold">Book Summary • 8 min</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#111111]" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
