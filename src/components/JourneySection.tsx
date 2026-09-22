import { useState } from 'react';
import { motion } from 'motion/react';
import { Compass, Lightbulb, Code2, Globe2, Sparkles, Rocket } from 'lucide-react';
import { JOURNEY_STEPS } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';

const STEP_ICONS = [
  Compass,
  Lightbulb,
  Code2,
  Globe2,
  Sparkles,
  Rocket
];

export default function JourneySection() {
  const [activeStep, setActiveStep] = useState<number>(3); // Default highlighting Education Point
  const { isDark } = useTheme();

  return (
    <section
      id="journey"
      className={`py-24 sm:py-32 relative border-b transition-colors duration-300 ${
        isDark ? 'bg-[#0C0C0F] border-[#242432]' : 'bg-[#FFFFFF] border-[#E6E5DC]/80'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-20 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-xs font-mono tracking-widest uppercase ${isDark ? 'text-[#747482]' : 'text-[#7E7E88]'}`}>
                03 // PROGRESSION & EVOLUTION
              </span>
              <div className={`w-12 h-[1px] ${isDark ? 'bg-[#353548]' : 'bg-[#D4D3C7]'}`} />
            </div>
            <h2 className={`text-3xl sm:text-5xl font-serif tracking-tight ${isDark ? 'text-[#F4F4F6]' : 'text-[#18181B]'}`}>
              My Journey
            </h2>
          </div>
          <p className={`text-sm font-mono max-w-md ${isDark ? 'text-[#A6A6B4]' : 'text-[#57575E]'}`}>
            From early inquisitiveness to founding educational ecosystems and architecting modern digital products.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Connecting Line */}
          <div className={`absolute left-4 sm:left-1/2 top-4 bottom-4 w-[2px] -translate-x-1/2 ${
            isDark ? 'bg-[#242432]' : 'bg-[#E6E5DC]'
          }`} />

          <div className="space-y-12 sm:space-y-16">
            {JOURNEY_STEPS.map((item, idx) => {
              const Icon = STEP_ICONS[idx % STEP_ICONS.length];
              const isEven = idx % 2 === 0;
              const isCurrent = activeStep === idx;

              return (
                <div
                  key={item.step}
                  onClick={() => setActiveStep(idx)}
                  className={`relative flex flex-col sm:flex-row items-start cursor-pointer group ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Content Card (Half width on desktop) */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className={`w-full sm:w-[calc(50%-2.5rem)] ml-12 sm:ml-0 p-6 sm:p-7 rounded-2xl border transition-all duration-300 ${
                      isDark
                        ? isCurrent
                          ? 'bg-[#15151C] border-[#45455E] shadow-lg scale-[1.02]'
                          : 'bg-[#121218]/80 border-[#242432] group-hover:border-[#353548] group-hover:bg-[#15151C]'
                        : isCurrent
                        ? 'bg-[#FFFFFF] border-[#18181B] shadow-[0_8px_30px_rgba(24,24,27,0.06)] scale-[1.02]'
                        : 'bg-[#FFFFFF]/70 border-[#E6E5DC] group-hover:border-[#D4D3C7] group-hover:bg-[#FFFFFF]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-xs font-mono font-bold tracking-widest ${
                        isDark ? 'text-[#747482]' : 'text-[#7E7E88]'
                      }`}>
                        PHASE {item.step}
                      </span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md ${
                        isDark ? 'bg-[#1D1D26] text-[#A6A6B4]' : 'bg-[#EFEFE8] text-[#57575E]'
                      }`}>
                        {item.tagline}
                      </span>
                    </div>

                    <h3 className={`text-xl font-serif font-bold tracking-tight mb-2 ${
                      isDark ? 'text-[#F4F4F6]' : 'text-[#18181B]'
                    }`}>
                      {item.title}
                    </h3>

                    <p className={`text-sm sm:text-base leading-relaxed ${
                      isDark ? 'text-[#A6A6B4]' : 'text-[#57575E]'
                    }`}>
                      {item.description}
                    </p>
                  </motion.div>

                  {/* Center Node on Timeline */}
                  <div className="absolute left-4 sm:left-1/2 top-6 -translate-x-1/2 flex items-center justify-center">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isDark
                          ? isCurrent
                            ? 'bg-[#F4F4F6] text-[#0C0C0F] shadow-md ring-4 ring-[#242432]'
                            : 'bg-[#15151C] text-[#A6A6B4] border-2 border-[#353548] group-hover:border-[#F4F4F6] group-hover:text-[#F4F4F6]'
                          : isCurrent
                          ? 'bg-[#18181B] text-[#F9F9F6] shadow-md ring-4 ring-[#EFEFE8]'
                          : 'bg-[#FFFFFF] text-[#57575E] border-2 border-[#D4D3C7] group-hover:border-[#18181B] group-hover:text-[#18181B]'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
