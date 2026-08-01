import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, ArrowRight } from 'lucide-react';

export default function PricingSection({ onOpenModal }) {
  const [billingCycle, setBillingCycle] = useState('annual');

  const plans = [
    {
      name: 'Essential Growth',
      priceMonthly: '$29',
      priceAnnual: '$19',
      description: 'Ideal for focused individuals seeking daily curated reads, podcasts, and habit tracking.',
      features: [
        '3 Daily Curated Recommendations',
        'Transparent AI Reasoning Engine',
        'Basic Habit Progress Metrics',
        'Standard Personal AI Curator',
        'Mobile & Web Interface',
      ],
      popular: false,
      cta: 'Start Essential',
    },
    {
      name: 'Pro Visionary',
      priceMonthly: '$59',
      priceAnnual: '$39',
      description: 'Full access to the 6 Multi-Agent AI Team, custom roadmap evolution, and deep analytics.',
      features: [
        'Unlimited Daily Curation & Deep Reads',
        'Full 6-Agent Personal AI Team',
        'Interactive 90-Day Identity Roadmap',
        'Circadian Bio-Pacing Integration',
        'Biographic Knowledge Graph',
        'Priority Neural Synthesis Engine',
      ],
      popular: true,
      cta: 'Start 14-Day Free Trial',
    },
    {
      name: 'Executive Leadership',
      priceMonthly: '$149',
      priceAnnual: '$99',
      description: 'Designed for founders, executives, and high-impact leaders requiring 1-on-1 AI alignment.',
      features: [
        'Dedicated Autonomous AI Sub-Agents',
        '1-on-1 Stanford Mentor Framework',
        'Custom Knowledge Ingestion (PDFs/Vaults)',
        'Unlimited Team & Enterprise Sync',
        '24/7 Priority Neural Channel',
      ],
      popular: false,
      cta: 'Request Executive Access',
    },
  ];

  return (
    <section id="pricing" className="py-24 px-6 md:px-12 bg-[#F6F4EF] border-t border-black/10 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest font-mono text-[#6E6E6E] block mb-3">
            [ Section 09 • Investment In Yourself ]
          </span>
          <h2 className="font-display text-5xl md:text-7xl font-bold uppercase tracking-tight text-[#111111] mb-4">
            Transparent Pricing
          </h2>
          <p className="font-body text-base md:text-lg text-[#6E6E6E] mb-8">
            Invest in your compound growth with simple, transparent membership tiers.
          </p>

          {/* Annual / Monthly Billing Switcher */}
          <div className="inline-flex items-center gap-3 p-1.5 rounded-full bg-[#EBE7DF] border border-black/10">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2 rounded-full text-xs font-mono font-bold transition-all ${
                billingCycle === 'monthly' ? 'bg-black text-white shadow' : 'text-[#6E6E6E]'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-5 py-2 rounded-full text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                billingCycle === 'annual' ? 'bg-black text-white shadow' : 'text-[#6E6E6E]'
              }`}
            >
              <span>Annual (Save 33%)</span>
              <span className="px-1.5 py-0.5 bg-emerald-500 text-black text-[9px] rounded-full uppercase font-extrabold">
                Best Value
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`rounded-3xl p-8 border flex flex-col justify-between transition-all duration-300 relative ${
                plan.popular
                  ? 'bg-black text-[#F6F4EF] border-black shadow-2xl scale-[1.03] z-10'
                  : 'bg-[#EBE7DF]/50 text-[#111111] border-black/15 hover:bg-[#EBE7DF]'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-white text-black text-[10px] font-mono font-bold uppercase tracking-widest border border-black shadow flex items-center gap-1">
                  <Sparkles className="w-3 h-3 fill-black" />
                  Most Popular Plan
                </div>
              )}

              <div>
                <h3 className="font-editorial text-2xl font-bold mb-2">{plan.name}</h3>
                <p className={`text-xs leading-relaxed mb-6 ${plan.popular ? 'text-[#F6F4EF]/70' : 'text-[#6E6E6E]'}`}>
                  {plan.description}
                </p>

                {/* Price Display */}
                <div className="flex items-baseline gap-1 mb-8 pb-6 border-b border-current/15">
                  <span className="font-display text-5xl md:text-6xl font-bold">
                    {billingCycle === 'annual' ? plan.priceAnnual : plan.priceMonthly}
                  </span>
                  <span className={`text-xs font-mono ${plan.popular ? 'text-[#F6F4EF]/60' : 'text-[#6E6E6E]'}`}>
                    / month {billingCycle === 'annual' ? '(billed yearly)' : ''}
                  </span>
                </div>

                {/* Features Checklist */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-xs font-medium">
                      <div
                        className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                          plan.popular ? 'bg-white text-black' : 'bg-black text-white'
                        }`}
                      >
                        <Check className="w-3 h-3 stroke-[2.5]" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={onOpenModal}
                className={`w-full py-4 rounded-full text-xs font-bold font-mono uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all ${
                  plan.popular
                    ? 'bg-[#F6F4EF] text-black hover:bg-white'
                    : 'bg-black text-white hover:bg-black/90'
                }`}
              >
                <span>{plan.cta}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
