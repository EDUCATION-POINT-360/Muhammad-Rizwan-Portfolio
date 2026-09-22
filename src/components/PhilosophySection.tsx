import { motion, useReducedMotion } from 'motion/react';
import { Sparkles, Terminal, ArrowRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';

export default function PhilosophySection() {
  const shouldReduceMotion = useReducedMotion();
  const { isDark } = useTheme();

  const PILLARS = ['TECHNOLOGY', 'EDUCATION', 'CREATIVITY', 'INNOVATION'];

  return (
    <section
      id="philosophy"
      className={`py-24 sm:py-36 relative border-b overflow-hidden transition-colors duration-300 ${
        isDark ? 'bg-[#101016] border-[#242432]' : 'bg-[#F4F4EE]/50 border-[#E6E5DC]/80'
      }`}
    >
      {/* Background Noise & Fine Axis */}
      <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Tag */}
        <div className="flex items-center gap-2 mb-6">
          <span className={`text-xs font-mono tracking-widest uppercase ${isDark ? 'text-[#747482]' : 'text-[#7E7E88]'}`}>
            09 // PHILOSOPHY & MOTTO
          </span>
          <div className={`w-12 h-[1px] ${isDark ? 'bg-[#353548]' : 'bg-[#D4D3C7]'}`} />
        </div>

        {/* Section 17: Digital Philosophy Equation */}
        <div className="mb-24">
          <h2 className={`text-xs font-mono font-bold tracking-widest uppercase mb-8 ${
            isDark ? 'text-[#747482]' : 'text-[#7E7E88]'
          }`}>
            DIGITAL PHILOSOPHY // THE EQUATION
          </h2>

          <div className={`flex flex-wrap items-center gap-4 sm:gap-6 text-3xl sm:text-5xl md:text-6xl font-serif tracking-tight ${
            isDark ? 'text-[#F4F4F6]' : 'text-[#18181B]'
          }`}>
            {PILLARS.map((pillar, index) => (
              <div key={pillar} className="flex items-center gap-4 sm:gap-6">
                <span className={`font-bold transition-colors ${
                  isDark ? 'hover:text-[#A6A6B4]' : 'hover:text-[#57575E]'
                }`}>
                  {pillar}
                </span>
                {index < PILLARS.length - 1 && (
                  <span className={`text-2xl sm:text-4xl font-sans font-light ${
                    isDark ? 'text-emerald-400' : 'text-[#7E7E88]'
                  }`}>
                    +
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="mt-10 max-w-2xl">
            <p className={`text-xl sm:text-2xl font-serif italic leading-relaxed border-l-2 pl-6 py-2 ${
              isDark
                ? 'text-[#D0D0DA] border-emerald-500/50'
                : 'text-[#3A3A40] border-[#18181B]'
            }`}>
              «{PERSONAL_INFO.digitalPhilosophyQuote}»
            </p>
          </div>
        </div>

        {/* Section 18: Personal Motto */}
        <div className={`pt-16 border-t relative ${isDark ? 'border-[#242432]' : 'border-[#E6E5DC]'}`}>
          <div className="flex items-center justify-between mb-8">
            <span className={`text-xs font-mono font-bold tracking-widest uppercase ${
              isDark ? 'text-[#747482]' : 'text-[#7E7E88]'
            }`}>
              LIFELONG CREDO // 2026
            </span>
            <span className={`text-xs font-mono ${isDark ? 'text-[#A6A6B4]' : 'text-[#57575E]'}`}>
              MIANWALI, PAKISTAN
            </span>
          </div>

          {/* Large Cinematic Typography with subtle drift */}
          <motion.div
            animate={
              shouldReduceMotion
                ? {}
                : {
                    x: [-4, 4, -4],
                  }
            }
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="space-y-2 select-none"
          >
            <div className={`text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif font-bold tracking-tight leading-[0.9] ${
              isDark ? 'text-[#F4F4F6]' : 'text-[#18181B]'
            }`}>
              THINK DIGITAL.
            </div>
            <div className={`text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif italic tracking-tight leading-[0.9] ${
              isDark ? 'text-[#A6A6B4]' : 'text-[#57575E]'
            }`}>
              BUILD FUTURE.
            </div>
          </motion.div>

          {/* Secondary Motto: Learn • Create • Improve • Repeat */}
          <div className="mt-10 flex flex-wrap items-center gap-3 sm:gap-4">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border shadow-xs text-xs sm:text-sm font-mono font-semibold ${
              isDark
                ? 'bg-[#15151C] border-[#353548] text-[#F4F4F6]'
                : 'bg-[#FFFFFF] border-[#D4D3C7] text-[#18181B]'
            }`}>
              <Sparkles className={`w-3.5 h-3.5 ${isDark ? 'text-emerald-400' : 'text-[#18181B]'}`} />
              <span>{PERSONAL_INFO.secondaryMotto}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
