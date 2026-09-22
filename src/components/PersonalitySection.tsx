import { motion } from 'motion/react';
import { Sparkles, Compass, Eye, ShieldCheck } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export default function PersonalitySection() {
  return (
    <section id="personality" className="py-24 sm:py-32 relative border-b border-[#E6E5DC]/80 bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-mono tracking-widest text-[#7E7E88] uppercase">
            08 // BEHIND THE SCREEN
          </span>
          <div className="w-12 h-[1px] bg-[#D4D3C7]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Monumental Typography */}
          <div className="lg:col-span-6">
            <h2 className="text-xs font-mono font-bold tracking-widest text-[#7E7E88] uppercase mb-4">
              PERSONALITY & ETHOS
            </h2>
            <div className="space-y-1 sm:space-y-2">
              <span className="block text-4xl sm:text-6xl md:text-7xl font-serif font-bold text-[#18181B] tracking-tight leading-none">
                QUIET.
              </span>
              <span className="block text-4xl sm:text-6xl md:text-7xl font-serif italic text-[#57575E] tracking-tight leading-none">
                CREATIVE.
              </span>
              <span className="block text-4xl sm:text-6xl md:text-7xl font-serif font-bold text-[#18181B] tracking-tight leading-none">
                CURIOUS.
              </span>
            </div>

            <div className="mt-8 flex items-center gap-3 text-xs font-mono text-[#7E7E88]">
              <span className="w-2 h-2 rounded-full bg-[#18181B]" />
              <span>INDEPENDENT BUILDER // FOUNDER MINDSET</span>
            </div>
          </div>

          {/* Right Column: Statement & 9 Traits */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-8">
            <p className="text-lg sm:text-xl text-[#333338] leading-relaxed font-serif italic border-l-2 border-[#18181B] pl-6 py-2">
              «{PERSONAL_INFO.personalityDescription}»
            </p>

            {/* 9 Core Personality Traits */}
            <div>
              <h3 className="text-xs font-mono font-bold tracking-widest text-[#7E7E88] uppercase mb-4">
                DEFINING CHARACTER TRAITS
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {PERSONAL_INFO.personalityTraits.map((trait, idx) => (
                  <motion.div
                    key={trait}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.04 }}
                    className="px-4 py-2 rounded-xl bg-[#F9F9F6] border border-[#E6E5DC] text-xs font-medium text-[#18181B] shadow-sm flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#57575E]" />
                    <span>{trait}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
