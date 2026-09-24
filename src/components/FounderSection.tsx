import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Lightbulb, Palette, Code2, Wrench, Rocket, CheckCircle2 } from 'lucide-react';
import { PERSONAL_INFO, FOUNDER_TIMELINE, FOUNDER_EXPERIENCE } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';

const TIMELINE_ICONS = [Lightbulb, Palette, Code2, Wrench, Rocket];

export default function FounderSection() {
  const { isDark } = useTheme();

  return (
    <section
      id="founder"
      className={`py-24 sm:py-36 relative border-b overflow-hidden transition-colors duration-300 ${
        isDark ? 'bg-[#0E0E13] border-[#242432]' : 'bg-[#F7F7F2] border-[#E6E5DC]/80'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Tag */}
        <div className="flex items-center gap-2 mb-4">
          <span className={`text-xs font-mono tracking-widest uppercase ${isDark ? 'text-[#747482]' : 'text-[#7E7E88]'}`}>
            05. Founder Methodology & Experience
          </span>
          <div className={`w-12 h-[1px] ${isDark ? 'bg-[#353548]' : 'bg-[#D4D3C7]'}`} />
        </div>

        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <h2 className={`text-xs font-bold tracking-[0.25em] uppercase mb-3 ${isDark ? 'text-[#747482]' : 'text-[#7E7E88]'}`}>
            PRACTICAL EXECUTION
          </h2>
          <h3 className={`text-4xl sm:text-6xl font-serif tracking-tight leading-[0.98] ${
            isDark ? 'text-[#F4F4F6]' : 'text-[#18181B]'
          }`}>
            Founder & Builder
          </h3>
          <p className={`mt-5 text-xl sm:text-2xl font-serif italic leading-relaxed border-l-2 pl-6 py-1 ${
            isDark ? 'text-[#E2E2E8] border-emerald-500' : 'text-[#2D2D32] border-[#18181B]'
          }`}>
            “{PERSONAL_INFO.founderStatement}”
          </p>
        </div>

        {/* Founder Workflow Timeline: Idea -> Design -> Build -> Improve -> Launch */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h4 className={`text-xs font-mono font-bold tracking-widest uppercase ${
              isDark ? 'text-[#747482]' : 'text-[#7E7E88]'
            }`}>
              THE PRODUCT LIFECYCLE TIMELINE
            </h4>
            <span className={`text-xs font-mono ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
              [ 5-STAGE ITERATION CYCLE ]
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 relative">
            {FOUNDER_TIMELINE.map((item, index) => {
              const IconComp = TIMELINE_ICONS[index % TIMELINE_ICONS.length];
              return (
                <motion.div
                  key={item.phase}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`p-6 rounded-3xl border flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1 ${
                    isDark
                      ? 'bg-[#15151E] border-[#252535] hover:border-emerald-500/50'
                      : 'bg-[#FFFFFF] border-[#E6E5DC] hover:border-[#18181B]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-xs font-mono font-bold ${
                        isDark ? 'text-emerald-400' : 'text-emerald-600'
                      }`}>
                        STAGE {item.step}
                      </span>
                      <div className={`p-2 rounded-xl border ${
                        isDark
                          ? 'bg-[#1D1D28] border-[#303042] text-[#F4F4F6]'
                          : 'bg-[#F2F2EC] border-[#DFDFD3] text-[#18181B]'
                      }`}>
                        <IconComp className="w-4 h-4" />
                      </div>
                    </div>

                    <h5 className={`text-xl font-serif font-bold tracking-tight mb-2 ${
                      isDark ? 'text-[#F4F4F6]' : 'text-[#18181B]'
                    }`}>
                      {item.phase}
                    </h5>

                    <p className={`text-xs leading-relaxed ${isDark ? 'text-[#A6A6B4]' : 'text-[#57575E]'}`}>
                      {item.desc}
                    </p>
                  </div>

                  {index < FOUNDER_TIMELINE.length - 1 && (
                    <div className="hidden md:flex items-center gap-1 mt-6 text-xs font-mono opacity-40">
                      <span>Proceeds to</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Founder Experience & Independent Projects */}
        <div className={`pt-16 border-t ${isDark ? 'border-[#242432]' : 'border-[#E6E5DC]'}`}>
          <div className="flex items-center justify-between mb-8">
            <h4 className={`text-xs font-mono font-bold tracking-widest uppercase ${
              isDark ? 'text-[#747482]' : 'text-[#7E7E88]'
            }`}>
              FOUNDER EXPERIENCE & INDEPENDENT PROJECTS
            </h4>
            <span className={`text-xs font-mono ${isDark ? 'text-[#A6A6B4]' : 'text-[#57575E]'}`}>
              [ 2024 — PRESENT ]
            </span>
          </div>

          <div className="space-y-6">
            {FOUNDER_EXPERIENCE.map((exp, idx) => (
              <div
                key={idx}
                className={`p-8 sm:p-10 rounded-3xl border shadow-sm transition-all duration-300 ${
                  isDark
                    ? 'bg-[#14141B] border-[#242432]'
                    : 'bg-[#FFFFFF] border-[#E6E5DC]'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-baseline justify-between gap-3 pb-6 border-b border-current/10">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-500 font-bold">
                      FLAGSHIP VENTURE
                    </span>
                    <h5 className={`text-2xl sm:text-3xl font-serif font-bold tracking-tight mt-1 ${
                      isDark ? 'text-[#F4F4F6]' : 'text-[#18181B]'
                    }`}>
                      {exp.role} — {exp.organization}
                    </h5>
                    <a
                      href={exp.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-emerald-600 dark:text-emerald-400 hover:underline mt-1 inline-block"
                    >
                      {exp.website} ↗
                    </a>
                  </div>
                  <div className="text-left lg:text-right">
                    <div className="text-xs font-mono font-semibold">{exp.period}</div>
                    <div className={`text-xs font-mono opacity-70 mt-0.5 ${isDark ? 'text-[#A6A6B4]' : 'text-[#57575E]'}`}>
                      {exp.location}
                    </div>
                  </div>
                </div>

                <p className={`mt-6 text-sm sm:text-base leading-relaxed ${isDark ? 'text-[#D0D0DA]' : 'text-[#3F3F46]'}`}>
                  {exp.description}
                </p>

                <div className="mt-6 pt-4">
                  <h6 className="text-xs font-mono font-bold uppercase tracking-wider mb-3 opacity-80">
                    Architectural & Operational Focus Areas:
                  </h6>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {exp.focusAreas.map((area, aIdx) => (
                      <div key={aIdx} className="flex items-start gap-2 text-xs">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                        <span className={isDark ? 'text-[#B8B8C6]' : 'text-[#44444C]'}>{area}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
