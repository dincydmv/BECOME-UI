import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  CheckSquare,
  Square,
  BookOpen,
  Headphones,
  Flame,
  Zap,
  Smile,
  Compass,
  ArrowUpRight,
  Play,
  Pause,
  Award,
  CheckCircle,
  BarChart3,
  Calendar
} from 'lucide-react';

export default function DashboardMockup() {
  // Interactive state
  const [xp, setXp] = useState(1480);
  const [streak, setStreak] = useState(14);
  const [isPlayingPodcast, setIsPlayingPodcast] = useState(false);
  const [selectedMood, setSelectedMood] = useState('Inspired');
  const [missions, setMissions] = useState([
    { id: 1, text: '20-min Deep Focus Reading: "Atomic Habits"', xp: 50, completed: true },
    { id: 2, text: 'Listen to Huberman Lab: Dopamine & Motivation', xp: 75, completed: false },
    { id: 3, text: 'Evening Identity & Gratitude Journaling', xp: 40, completed: false },
  ]);

  const habits = [
    { name: 'Morning Routine', progress: 100, status: 'Done' },
    { name: 'Deep Work (90m)', progress: 85, status: 'In Progress' },
    { name: 'Mindfulness (15m)', progress: 100, status: 'Done' },
    { name: 'Reading (30m)', progress: 60, status: 'Active' },
  ];

  const moods = [
    { emoji: '⚡', label: 'Driven', feedback: 'High energy day—perfect time to attack your hardest skill acquisition goal!' },
    { emoji: '🎯', label: 'Focused', feedback: 'Optimal cognitive state for 90-minute uninterrupted deep work.' },
    { emoji: '✨', label: 'Inspired', feedback: 'Great mindset for creative synthesis and high-level strategic roadmap planning.' },
    { emoji: '🧘', label: 'Calm', feedback: 'Ideal state for slow reading, reflection, and absorbing complex philosophy.' },
    { emoji: '🔋', label: 'Resting', feedback: 'Your curator will prioritize lightweight micro-insights and physical recovery recommendations.' },
  ];

  const toggleMission = (id) => {
    setMissions((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          const nextState = !m.completed;
          if (nextState) {
            setXp((curr) => curr + m.xp);
            confetti({
              particleCount: 40,
              spread: 60,
              origin: { y: 0.8 },
            });
          } else {
            setXp((curr) => Math.max(0, curr - m.xp));
          }
          return { ...m, completed: nextState };
        }
        return m;
      })
    );
  };

  return (
    <section id="dashboard" className="py-24 px-6 md:px-12 bg-[#F6F4EF] border-t border-black/10 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest font-mono text-[#6E6E6E] block mb-3">
            [ Section 03 • Living Interface ]
          </span>
          <h2 className="font-display text-5xl md:text-7xl font-bold uppercase tracking-tight text-[#111111] mb-4">
            Your Daily Growth Dashboard
          </h2>
          <p className="font-body text-base md:text-lg text-[#6E6E6E]">
            A luxury editorial command center designed around clarity, purpose, and deliberate focus.
          </p>
        </div>

        {/* Dashboard Frame Mockup */}
        <div className="bg-[#EBE7DF]/80 rounded-[36px] border border-black/15 p-4 sm:p-8 shadow-2xl backdrop-blur-md">
          
          {/* Top User Bar */}
          <div className="bg-[#F6F4EF] rounded-2xl p-4 sm:p-6 border border-black/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-black text-[#F6F4EF] font-bold font-editorial flex items-center justify-center text-lg">
                AM
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-editorial text-xl font-bold text-[#111111]">Alex Mercer</h3>
                  <span className="text-[10px] font-mono uppercase bg-black/5 text-[#111111] px-2.5 py-0.5 rounded-full border border-black/10 font-semibold">
                    Identity Evolving • Day 42
                  </span>
                </div>
                <p className="text-xs text-[#6E6E6E]">Goal: Tech Founder & System Designer • Stanford Executive Track</p>
              </div>
            </div>

            {/* Top Metrics Pills */}
            <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
              <div className="flex items-center gap-2 px-4 py-2 bg-black/5 rounded-full border border-black/10 text-xs font-mono font-bold text-[#111111]">
                <Flame className="w-4 h-4 text-orange-600 fill-orange-500" />
                <span>{streak} Day Streak</span>
              </div>

              <div className="flex items-center gap-2 px-4 py-2 bg-black text-[#F6F4EF] rounded-full text-xs font-mono font-bold">
                <Zap className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span>{xp} XP</span>
              </div>
            </div>
          </div>

          {/* Main Dashboard Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Left Column: Today's Mission & Reading (7 cols) */}
            <div className="md:col-span-7 space-y-6">
              
              {/* Today's Mission Card */}
              <div className="bg-[#F6F4EF] rounded-3xl p-6 border border-black/10 shadow-sm">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-black/10">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-black" />
                    <h4 className="font-editorial text-lg font-bold text-[#111111]">Today's Mission</h4>
                  </div>
                  <span className="text-xs font-mono text-[#6E6E6E]">
                    {missions.filter((m) => m.completed).length} / {missions.length} Completed
                  </span>
                </div>

                <div className="space-y-3">
                  {missions.map((mission) => (
                    <div
                      key={mission.id}
                      onClick={() => toggleMission(mission.id)}
                      className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all duration-200 ${
                        mission.completed
                          ? 'bg-black/5 border-black/10 text-[#6E6E6E] line-through'
                          : 'bg-white border-black/15 text-[#111111] hover:border-black'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {mission.completed ? (
                          <CheckSquare className="w-5 h-5 text-black shrink-0" />
                        ) : (
                          <Square className="w-5 h-5 text-[#6E6E6E] shrink-0" />
                        )}
                        <span className="text-sm font-medium">{mission.text}</span>
                      </div>
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-black/5 text-[#111111] shrink-0">
                        +{mission.xp} XP
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reading Recommendation Card */}
              <div className="bg-[#F6F4EF] rounded-3xl p-6 border border-black/10 shadow-sm relative overflow-hidden">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#6E6E6E] flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    Curated Reading • 15 min read
                  </span>
                  <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 font-medium">
                    Recommended Today
                  </span>
                </div>

                <h4 className="font-editorial text-2xl font-bold text-[#111111] mb-2">
                  "The Psychology of Consistency & Identity Shifts"
                </h4>
                <p className="text-xs text-[#6E6E6E] mb-4 font-light leading-relaxed">
                  By Dr. James Clear & Stanford Neuroscience Lab. Explores how small habitual choices redefine self-narrative.
                </p>

                <div className="bg-black/5 p-3 rounded-xl border border-black/10 mb-4 text-xs font-mono text-[#111111]">
                  <strong>AI Rationale:</strong> "You recorded difficulty maintaining focus past 3:00 PM yesterday. This chapter covers circadian cognitive pacing."
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#111111]">Format: Interactive Summary + Notes</span>
                  <button className="btn-pill-primary px-5 py-2 text-xs font-medium flex items-center gap-1.5">
                    <span>Start Reading</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Habit Progress Bars */}
              <div className="bg-[#F6F4EF] rounded-3xl p-6 border border-black/10 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-black" />
                    <h4 className="font-editorial text-lg font-bold text-[#111111]">Habit Progress</h4>
                  </div>
                  <span className="text-xs font-mono text-[#6E6E6E]">Overall: 86% Success Rate</span>
                </div>

                <div className="space-y-4">
                  {habits.map((habit) => (
                    <div key={habit.name}>
                      <div className="flex justify-between text-xs font-medium mb-1.5">
                        <span className="text-[#111111]">{habit.name}</span>
                        <span className="text-[#6E6E6E] font-mono">{habit.progress}%</span>
                      </div>
                      <div className="w-full h-2.5 bg-black/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-black rounded-full transition-all duration-500"
                          style={{ width: `${habit.progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Podcast, Streak, Mood, Roadmap (5 cols) */}
            <div className="md:col-span-5 space-y-6">
              
              {/* Podcast Recommendation */}
              <div className="bg-[#111111] text-[#F6F4EF] rounded-3xl p-6 border border-black shadow-lg">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#F6F4EF]/60 flex items-center gap-1.5">
                    <Headphones className="w-3.5 h-3.5" />
                    Audio Curation • 24 mins
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F6F4EF]/20 text-[#F6F4EF]">
                    Huberman Lab
                  </span>
                </div>

                <h4 className="font-editorial text-xl font-bold mb-2 text-[#F6F4EF]">
                  Neuroplasticity & Accelerated Skill Learning
                </h4>
                <p className="text-xs text-[#F6F4EF]/70 mb-5 font-light leading-relaxed">
                  How focused friction triggers micro-dopamine rewards to rewire neuro-pathways.
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-[#F6F4EF]/15">
                  <button
                    onClick={() => setIsPlayingPodcast(!isPlayingPodcast)}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#F6F4EF] text-[#111111] text-xs font-bold hover:bg-white transition-colors"
                  >
                    {isPlayingPodcast ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                    <span>{isPlayingPodcast ? 'Pause Audio' : 'Listen Now'}</span>
                  </button>

                  <span className="text-xs font-mono text-[#F6F4EF]/60">
                    {isPlayingPodcast ? '04:12 / 24:00' : '24 min'}
                  </span>
                </div>
              </div>

              {/* XP Progress & Weekly Goal */}
              <div className="bg-[#F6F4EF] rounded-3xl p-6 border border-black/10 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-[#111111] flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-black" />
                    Level 7 Identity Progress
                  </span>
                  <span className="text-xs font-mono font-bold text-[#111111]">{xp} / 2000 XP</span>
                </div>

                <div className="w-full h-3 bg-black/10 rounded-full overflow-hidden mb-3">
                  <div
                    className="h-full bg-black rounded-full transition-all duration-700"
                    style={{ width: `${(xp / 2000) * 100}%` }}
                  />
                </div>
                <p className="text-[11px] text-[#6E6E6E] font-mono">
                  520 XP remaining to unlock "Master Synthesizer" Badge
                </p>
              </div>

              {/* Interactive Mood Check-in */}
              <div className="bg-[#F6F4EF] rounded-3xl p-6 border border-black/10 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-editorial text-base font-bold text-[#111111] flex items-center gap-2">
                    <Smile className="w-4 h-4 text-black" />
                    Daily Mood Check-in
                  </h4>
                  <span className="text-[10px] font-mono text-[#6E6E6E]">Select State</span>
                </div>

                {/* Mood Selector Buttons */}
                <div className="flex items-center justify-between gap-1.5 mb-4">
                  {moods.map((m) => (
                    <button
                      key={m.label}
                      onClick={() => setSelectedMood(m.label)}
                      className={`flex-1 py-2 rounded-xl text-center text-lg transition-all ${
                        selectedMood === m.label
                          ? 'bg-black text-white shadow scale-105'
                          : 'bg-black/5 hover:bg-black/10 text-black'
                      }`}
                      title={m.label}
                    >
                      {m.emoji}
                    </button>
                  ))}
                </div>

                {/* AI Mood Feedback */}
                <div className="bg-black/5 p-3 rounded-xl border border-black/10 text-xs text-[#111111]">
                  <strong className="block font-mono text-[10px] uppercase text-[#6E6E6E] mb-1">
                    AI Curator Insight ({selectedMood}):
                  </strong>
                  {moods.find((m) => m.label === selectedMood)?.feedback}
                </div>
              </div>

              {/* Future Roadmap Card */}
              <div className="bg-[#F6F4EF] rounded-3xl p-6 border border-black/10 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-editorial text-base font-bold text-[#111111] flex items-center gap-2">
                    <Compass className="w-4 h-4 text-black" />
                    Future Roadmap Milestone
                  </h4>
                  <span className="text-xs font-mono font-semibold text-[#111111]">Day 90 Target</span>
                </div>
                <p className="text-xs text-[#6E6E6E] leading-relaxed">
                  "Complete 30 Deep Work sprints, publish key industry essay, achieve 95% routine consistency."
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
