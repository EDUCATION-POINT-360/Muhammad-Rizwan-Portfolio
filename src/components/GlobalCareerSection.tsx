import { motion } from 'motion/react';
import {
  Globe,
  Laptop,
  Code2,
  GraduationCap,
  Sparkles,
  Layers,
  Rocket,
  Users,
  Compass,
  ArrowUpRight,
  CheckCircle2,
} from 'lucide-react';
import { PERSONAL_INFO, GLOBAL_CAREER_AREAS } from '../data/portfolioData';
import { soundFX } from '../utils/audio';
import { useTheme } from '../context/ThemeContext';

interface GlobalCareerSectionProps {
  onOpenCvModal: () => void;
}

const ICONS = [
  Laptop,
  Code2,
  GraduationCap,
  Sparkles,
  Compass,
  Layers,
  Sparkles,
  Users,
  Rocket,
  Globe,
];

export default function GlobalCareerSection({ onOpenCvModal }: GlobalCareerSectionProps) {
  const { isDark } = useTheme();

  return (
    <section
      id="international-career"
      className={`py-24 sm:py-32 relative border-b transition-colors duration-300 ${
        isDark ? 'bg-[#0B0B0E] border-[#242432]' : 'bg-[#FFFFFF] border-[#E6E5DC]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Tag */}
        <div className="flex items-center gap-2 mb-4">
          <span className={`text-xs font-mono tracking-widest uppercase ${isDark ? 'text-[#747482]' : 'text-[#7E7E88]'}`}>
            02 // INTERNATIONAL CAREER & SCOPE
          </span>
          <div className={`w-12 h-[1px] ${isDark ? 'bg-[#353548]' : 'bg-[#D4D3C7]'}`} />
        </div>

        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div className="max-w-3xl">
            <h2 className={`text-xs font-bold tracking-[0.25em] uppercase mb-3 ${isDark ? 'text-[#747482]' : 'text-[#7E7E88]'}`}>
              GLOBAL HORIZONS
            </h2>
            <h3 className={`text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight ${
              isDark ? 'text-[#F4F4F6]' : 'text-[#18181B]'
            }`}>
              Building for a Global Digital World
            </h3>
            <p className={`mt-4 text-base sm:text-lg leading-relaxed ${isDark ? 'text-[#A6A6B4]' : 'text-[#57575E]'}`}>
              Muhammad Rizwan creates web products with international standards of performance, clean information architecture, and accessibility. Prepared to collaborate with forward-thinking teams, remote startups, and technology organizations worldwide.
            </p>
          </div>

          {/* Status Badge & CV Quick Trigger */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/25">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{PERSONAL_INFO.openStatus}</span>
            </div>

            <button
              onClick={() => {
                soundFX.playTick();
                onOpenCvModal();
              }}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full border text-xs font-mono font-semibold transition-colors ${
                isDark
                  ? 'border-[#353548] hover:bg-[#1D1D26] text-[#F4F4F6]'
                  : 'border-[#D4D3C7] hover:bg-[#F2F2EC] text-[#18181B]'
              }`}
            >
              <span>View Full CV</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Grid of Global Opportunities */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {GLOBAL_CAREER_AREAS.map((item, index) => {
            const IconComponent = ICONS[index % ICONS.length];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
                className={`p-6 rounded-3xl border transition-all duration-300 group hover:-translate-y-1 ${
                  isDark
                    ? 'bg-[#14141B] border-[#222230] hover:border-[#353548] hover:shadow-[0_12px_30px_rgba(0,0,0,0.4)]'
                    : 'bg-[#FAFAF7] border-[#E8E7DF] hover:border-[#18181B]/20 hover:shadow-[0_12px_30px_rgba(24,24,27,0.06)]'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-colors ${
                      isDark
                        ? 'bg-[#1E1E2A] text-emerald-400 group-hover:bg-emerald-500 group-hover:text-black'
                        : 'bg-[#EFEFE8] text-emerald-600 group-hover:bg-[#18181B] group-hover:text-[#F9F9F6]'
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono opacity-50">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <h4 className={`text-base font-serif font-bold tracking-tight mb-2 ${
                  isDark ? 'text-[#F4F4F6]' : 'text-[#18181B]'
                }`}>
                  {item.title}
                </h4>

                <p className={`text-xs leading-relaxed ${isDark ? 'text-[#A6A6B4]' : 'text-[#57575E]'}`}>
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Banner Statement */}
        <div
          className={`mt-10 p-6 sm:p-8 rounded-3xl border flex flex-col md:flex-row items-center justify-between gap-6 transition-colors ${
            isDark ? 'bg-[#14141B] border-[#242432]' : 'bg-[#F5F5ED] border-[#DFDFD3]'
          }`}
        >
          <div className="flex items-start gap-4">
            <div className="w-3 h-3 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0 animate-ping" />
            <div>
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                International Availability & Readiness
              </div>
              <p className={`text-sm mt-1 max-w-2xl ${isDark ? 'text-[#D0D0DA]' : 'text-[#333338]'}`}>
                {PERSONAL_INFO.globalOpportunitiesStatement} Flexible with international timezones (US, UK, Europe, Middle East, Asia-Pacific) for remote projects, digital product contracts, and technical internships.
              </p>
            </div>
          </div>

          <a
            href="#contact"
            onClick={() => soundFX.playTick()}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-mono font-bold bg-[#18181B] dark:bg-[#F4F4F6] text-[#F9F9F6] dark:text-[#0C0C0F] hover:opacity-90 transition-all flex-shrink-0"
          >
            <span>Start a Conversation</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
