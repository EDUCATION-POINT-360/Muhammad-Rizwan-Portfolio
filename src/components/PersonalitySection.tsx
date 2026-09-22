import { motion } from 'motion/react';
import { Sparkles, Compass, Eye, ShieldCheck } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';

export default function PersonalitySection() {
  const { isDark } = useTheme();

  return (
    <section
      id="personality"
      className={`py-24 sm:py-32 relative border-b transition-colors duration-300 ${
        isDark ? 'bg-[#0C0C0F] border-[#242432]' : 'bg-[#FFFFFF] border-[#E6E5DC]/80'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center gap-2 mb-4">
          <span className={`text-xs font-mono tracking-widest uppercase ${isDark ? 'text-[#747482]' : 'text-[#7E7E88]'}`}>
            08 // BEHIND THE SCREEN
          </span>
          <div className={`w-12 h-[1px] ${isDark ? 'bg-[#353548]' : 'bg-[#D4D3C7]'}`} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Monumental Typography */}
          <div className="lg:col-span-6">
            <h2 className={`text-xs font-mono font-bold tracking-widest uppercase mb-4 ${
              isDark ? 'text-[#747482]' : 'text-[#7E7E88]'
            }`}>
              PERSONALITY & ETHOS
            </h2>
            <div className="space-y-1 sm:space-y-2">
              <span className={`block text-4xl sm:text-6xl md:text-7xl font-serif font-bold tracking-tight leading-none ${
                isDark ? 'text-[#F4F4F6]' : 'text-[#18181B]'
              }`}>
                QUIET.
              </span>
              <span className={`block text-4xl sm:text-6xl md:text-7xl font-serif italic tracking-tight leading-none ${
                isDark ? 'text-[#A6A6B4]' : 'text-[#57575E]'
              }`}>
                CREATIVE.
              </span>
              <span className={`block text-4xl sm:text-6xl md:text-7xl font-serif font-bold tracking-tight leading-none ${
                isDark ? 'text-[#F4F4F6]' : 'text-[#18181B]'
              }`}>
                CURIOUS.
              </span>
            </div>

            <div className="mt-8 flex items-center gap-3 text-xs font-mono text-[#7E7E88]">
              <span className={`w-2 h-2 rounded-full ${isDark ? 'bg-emerald-400' : 'bg-[#18181B]'}`} />
              <span>INDEPENDENT BUILDER // FOUNDER MINDSET</span>
            </div>
          </div>

          {/* Right Column: Statement & 9 Traits */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-8">
            <p className={`text-lg sm:text-xl leading-relaxed font-serif italic border-l-2 pl-6 py-2 ${
              isDark
                ? 'text-[#E2E2EA] border-emerald-500/50'
                : 'text-[#333338] border-[#18181B]'
            }`}>
              «{PERSONAL_INFO.personalityDescription}»
            </p>

            {/* 9 Core Personality Traits */}
            <div>
              <h3 className={`text-xs font-mono font-bold tracking-widest uppercase mb-4 ${
                isDark ? 'text-[#747482]' : 'text-[#7E7E88]'
              }`}>
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
                    className={`px-4 py-2 rounded-xl border text-xs font-medium shadow-xs flex items-center gap-2 ${
                      isDark
                        ? 'bg-[#15151C] border-[#242432] text-[#F4F4F6]'
                        : 'bg-[#F9F9F6] border-[#E6E5DC] text-[#18181B]'
                    }`}
                  >
                    <span className={`w-1 h-1 rounded-full ${isDark ? 'bg-emerald-400' : 'bg-[#57575E]'}`} />
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
