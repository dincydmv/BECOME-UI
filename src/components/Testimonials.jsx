import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      quote:
        'FutureSelf AI didn’t just recommend books—it fundamentally re-architected my morning focus. In 90 days, I launched my firm and doubled my cognitive output.',
      author: 'Elena Rostova',
      role: 'Managing Partner • Venture Capital',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      badge: 'Verified 1-Year Growth Member',
    },
    {
      quote:
        'The transparent AI reasoning is what sets it apart. Knowing *why* a specific lecture was chosen for my current stress level makes every minute feel deliberate.',
      author: 'Marcus Vance',
      role: 'Principal Systems Architect • AI Labs',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
      badge: 'Verified 90-Day Identity Shift',
    },
    {
      quote:
        'It feels like having a team of Stanford neuroscientists, executive coaches, and polymath researchers living inside a sleek, quiet interface.',
      author: 'Dr. Sophia Chen',
      role: 'Neuroscientist & Author',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
      badge: 'Verified Early Fellow',
    },
  ];

  return (
    <section className="py-24 px-6 md:px-12 bg-[#F6F4EF] border-t border-black/10 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs uppercase tracking-widest font-mono text-[#6E6E6E] block mb-3">
            [ Section 08 • User Stories ]
          </span>
          <h2 className="font-display text-5xl md:text-7xl font-bold uppercase tracking-tight text-[#111111] mb-4">
            Voices of Transformation
          </h2>
          <p className="font-body text-base md:text-lg text-[#6E6E6E]">
            How visionary leaders, researchers, and creators are evolving with FutureSelf AI.
          </p>
        </div>

        {/* Minimal Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-[#EBE7DF]/50 rounded-3xl p-8 border border-black/15 flex flex-col justify-between shadow-md hover:shadow-xl transition-shadow"
            >
              <div>
                {/* Quote Icon & Rating Stars */}
                <div className="flex items-center justify-between mb-6">
                  <Quote className="w-8 h-8 text-black/40 stroke-[1.2]" />
                  <div className="flex items-center gap-1 text-black">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-black stroke-none" />
                    ))}
                  </div>
                </div>

                {/* Large Editorial Quote */}
                <p className="font-editorial text-lg md:text-xl font-bold text-[#111111] leading-relaxed mb-8">
                  "{t.quote}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="flex items-center gap-4 pt-6 border-t border-black/10">
                <img
                  src={t.avatar}
                  alt={t.author}
                  className="w-12 h-12 rounded-full object-cover grayscale contrast-125 border border-black/20"
                />
                <div>
                  <h4 className="font-bold text-sm text-[#111111]">{t.author}</h4>
                  <p className="text-xs text-[#6E6E6E] font-light">{t.role}</p>
                  <span className="text-[9px] font-mono uppercase text-emerald-800 tracking-wider">
                    {t.badge}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
