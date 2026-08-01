import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, CheckCircle2, Sparkles, Brain, Target, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function OnboardingModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [focusArea, setFocusArea] = useState('Career Trajectory');
  const [commitment, setCommitment] = useState('30 mins / day');
  const [userName, setUserName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completed, setCompleted] = useState(false);

  if (!isOpen) return null;

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setCompleted(true);
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      }, 1200);
    }
  };

  const resetModal = () => {
    setStep(1);
    setCompleted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-[#F6F4EF] rounded-3xl border border-black/20 w-full max-w-xl p-8 relative shadow-2xl overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={resetModal}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-black/5 text-[#111111] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!completed ? (
          <div>
            {/* Modal Step Indicator */}
            <div className="flex items-center gap-2 mb-6">
              <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-black text-[#F6F4EF] font-bold">
                Step 0{step} of 03
              </span>
              <span className="text-xs text-[#6E6E6E] font-mono">Identity Diagnostic</span>
            </div>

            {/* Step 1: Primary Focus */}
            {step === 1 && (
              <div>
                <h3 className="font-editorial text-3xl font-bold text-[#111111] mb-2">
                  What is your primary growth ambition?
                </h3>
                <p className="text-xs text-[#6E6E6E] mb-6">
                  Select the domain your AI Curator should prioritize during the first 30 days.
                </p>

                <div className="space-y-3 mb-8">
                  {[
                    'Career Trajectory & High-Leverage Impact',
                    'Deep Focus & Cognitive Stamina',
                    'Strategic Thinking & System Design',
                    'Bio-Pacing, Sleep & Physical Recovery',
                  ].map((area) => (
                    <div
                      key={area}
                      onClick={() => setFocusArea(area)}
                      className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                        focusArea === area
                          ? 'bg-black text-[#F6F4EF] border-black shadow'
                          : 'bg-[#EBE7DF]/50 text-[#111111] border-black/10 hover:bg-[#EBE7DF]'
                      }`}
                    >
                      <span className="text-sm font-medium">{area}</span>
                      {focusArea === area && <CheckCircle2 className="w-5 h-5 text-white" />}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Time Commitment */}
            {step === 2 && (
              <div>
                <h3 className="font-editorial text-3xl font-bold text-[#111111] mb-2">
                  How much daily focus can you dedicate?
                </h3>
                <p className="text-xs text-[#6E6E6E] mb-6">
                  Your curator balances high-impact micro-curations with your existing schedule.
                </p>

                <div className="space-y-3 mb-8">
                  {[
                    { label: '15 mins / day', desc: 'Lightweight morning & evening micro-curation' },
                    { label: '30 mins / day', desc: 'Standard optimal pacing for compound 90-day shift' },
                    { label: '60+ mins / day', desc: 'Accelerated polymath immersion & deep work' },
                  ].map((item) => (
                    <div
                      key={item.label}
                      onClick={() => setCommitment(item.label)}
                      className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                        commitment === item.label
                          ? 'bg-black text-[#F6F4EF] border-black shadow'
                          : 'bg-[#EBE7DF]/50 text-[#111111] border-black/10 hover:bg-[#EBE7DF]'
                      }`}
                    >
                      <div>
                        <div className="text-sm font-bold">{item.label}</div>
                        <div className={`text-xs ${commitment === item.label ? 'text-[#F6F4EF]/70' : 'text-[#6E6E6E]'}`}>
                          {item.desc}
                        </div>
                      </div>
                      {commitment === item.label && <CheckCircle2 className="w-5 h-5 text-white" />}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Identity Tag & Name */}
            {step === 3 && (
              <div>
                <h3 className="font-editorial text-3xl font-bold text-[#111111] mb-2">
                  Initialize Your AI Identity Profile
                </h3>
                <p className="text-xs text-[#6E6E6E] mb-6">
                  Enter your preferred name to personalize your neural daily briefing.
                </p>

                <div className="space-y-4 mb-8">
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#6E6E6E] mb-2">Your Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Alex Mercer"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full p-4 rounded-2xl bg-white border border-black/15 text-[#111111] font-medium focus:outline-none focus:border-black text-sm"
                    />
                  </div>

                  <div className="bg-[#EBE7DF]/60 p-4 rounded-2xl border border-black/10 text-xs font-mono text-[#111111]">
                    <div className="flex items-center gap-2 font-bold mb-1">
                      <Sparkles className="w-4 h-4 text-black" />
                      <span>Configured Parameters:</span>
                    </div>
                    <div>Focus: {focusArea}</div>
                    <div>Commitment: {commitment}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Modal Bottom Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-black/10">
              {step > 1 ? (
                <button
                  onClick={() => setStep(step - 1)}
                  className="text-xs font-mono uppercase text-[#6E6E6E] hover:text-black"
                >
                  Back
                </button>
              ) : (
                <div />
              )}

              <button
                onClick={handleNext}
                disabled={isSubmitting}
                className="btn-pill-primary px-7 py-3 text-xs font-bold font-mono uppercase flex items-center gap-2 cursor-pointer"
              >
                <span>{isSubmitting ? 'Generating AI Profile...' : step === 3 ? 'Launch Curator' : 'Continue'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Completion State */
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center mx-auto mb-6">
              <Brain className="w-8 h-8 stroke-[1.5]" />
            </div>
            <h3 className="font-editorial text-3xl font-bold text-[#111111] mb-2">
              Welcome, {userName || 'Visionary'}!
            </h3>
            <p className="text-sm text-[#6E6E6E] mb-6 max-w-md mx-auto">
              Your AI Growth Curator has been successfully initialized. Your first personalized 7:00 AM briefing is ready on your dashboard.
            </p>

            <button
              onClick={resetModal}
              className="btn-pill-primary px-8 py-3.5 text-xs font-mono uppercase font-bold inline-flex items-center gap-2"
            >
              <span>Explore Your Growth Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
