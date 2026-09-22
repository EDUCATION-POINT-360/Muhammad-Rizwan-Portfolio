import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  ArrowUpRight,
  BookOpen,
  Layers,
  CheckCircle2,
  Users,
  FileText,
  Compass,
  ExternalLink,
  Sparkles,
  Award,
  Globe,
} from 'lucide-react';
import { EDUCATION_POINT_DETAILS } from '../data/portfolioData';
import { soundFX } from '../utils/audio';
import { useTheme } from '../context/ThemeContext';

export default function EducationPointShowcase() {
  const shouldReduceMotion = useReducedMotion();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const { isDark } = useTheme();

  return (
    <section
      id="education-point"
      className={`py-24 sm:py-36 relative border-b transition-colors duration-300 ${
        isDark ? 'bg-[#0C0C0F] border-[#242432]' : 'bg-[#FFFFFF] border-[#E6E5DC]/80'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Pill */}
        <div className="flex items-center gap-2 mb-4">
          <span className={`text-xs font-mono tracking-widest uppercase ${isDark ? 'text-[#747482]' : 'text-[#7E7E88]'}`}>
            04 // FLAGSHIP FOUNDATION
          </span>
          <div className={`w-12 h-[1px] ${isDark ? 'bg-[#353548]' : 'bg-[#D4D3C7]'}`} />
        </div>

        {/* Main Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14">
          <div className="lg:col-span-8">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono mb-3 border ${
              isDark
                ? 'bg-[#15151C] text-[#F4F4F6] border-[#353548]'
                : 'bg-[#EFEFE8] text-[#18181B] border-[#D4D3C7]/60'
            }`}>
              <span className="font-semibold">{EDUCATION_POINT_DETAILS.role}</span>
              <span>•</span>
              <span>{EDUCATION_POINT_DETAILS.tagline}</span>
            </div>
            <h2 className={`text-4xl sm:text-6xl md:text-7xl font-serif tracking-tight leading-[0.98] ${
              isDark ? 'text-[#F4F4F6]' : 'text-[#18181B]'
            }`}>
              EDUCATION POINT
            </h2>
            <p className={`mt-4 text-lg sm:text-xl leading-relaxed max-w-2xl font-normal ${
              isDark ? 'text-[#A6A6B4]' : 'text-[#57575E]'
            }`}>
              «{EDUCATION_POINT_DETAILS.description}»
            </p>
          </div>

          {/* Prominent CTA Buttons with Lucide Icons */}
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-end justify-start">
            <a
              id="ep-main-cta-btn"
              href={EDUCATION_POINT_DETAILS.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFX.playChime()}
              className={`inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 shadow-sm active:scale-95 group w-full sm:w-auto ${
                isDark
                  ? 'bg-[#F4F4F6] text-[#0C0C0F] hover:bg-[#E2E2E6]'
                  : 'bg-[#18181B] text-[#F9F9F6] hover:bg-[#333338]'
              }`}
            >
              <ExternalLink className="w-4 h-4" />
              <span>Launch Education Point</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <a
              id="ep-scheme-cta-btn"
              href={EDUCATION_POINT_DETAILS.schemeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFX.playTick()}
              className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border text-xs font-medium tracking-wide transition-all duration-200 active:scale-95 group w-full sm:w-auto ${
                isDark
                  ? 'bg-[#15151C] border-[#353548] text-[#F4F4F6] hover:bg-[#1D1D26]'
                  : 'bg-[#F9F9F6] border-[#D4D3C7] text-[#18181B] hover:bg-[#EFEFE8]'
              }`}
            >
              <FileText className={`w-4 h-4 ${isDark ? 'text-[#A6A6B4]' : 'text-[#57575E]'}`} />
              <span>Browse Resource Schemes</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>

        {/* Highlight Showcase Container */}
        <div className={`p-8 sm:p-12 rounded-3xl border shadow-sm ${
          isDark
            ? 'bg-[#15151C] border-[#242432]'
            : 'bg-[#F9F9F6] border-[#E6E5DC]'
        }`}>
          {/* Key Stats Bar */}
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 pb-10 border-b ${
            isDark ? 'border-[#242432]' : 'border-[#E6E5DC]'
          }`}>
            {EDUCATION_POINT_DETAILS.stats.map((stat, i) => (
              <div key={i} className="flex flex-col">
                <span className={`text-[10px] font-mono tracking-widest uppercase mb-1 ${
                  isDark ? 'text-[#747482]' : 'text-[#7E7E88]'
                }`}>
                  {stat.label}
                </span>
                <span className={`text-xl sm:text-3xl font-serif font-bold ${
                  isDark ? 'text-[#F4F4F6]' : 'text-[#18181B]'
                }`}>
                  {stat.value}
                </span>
              </div>
            ))}
          </div>

          {/* Resources Grid: Interactive 3D Cards */}
          <div className="pt-10">
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-xs font-mono font-bold tracking-widest uppercase flex items-center gap-2 ${
                isDark ? 'text-[#F4F4F6]' : 'text-[#18181B]'
              }`}>
                <Layers className="w-4 h-4" />
                <span>Core Academic Modules & Coverage</span>
              </h3>
              <span className={`text-[11px] font-mono ${isDark ? 'text-[#747482]' : 'text-[#7E7E88]'}`}>
                [ PUNJAB TEXTBOOK BOARD CURRICULUM ]
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {EDUCATION_POINT_DETAILS.resources.map((resourceName, index) => (
                <div
                  key={resourceName}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                    isDark
                      ? hoveredCard === index
                        ? 'bg-[#1D1D26] border-[#353548] shadow-md -translate-y-1'
                        : 'bg-[#101016] border-[#242432]'
                      : hoveredCard === index
                      ? 'bg-[#FFFFFF] border-[#18181B] shadow-md -translate-y-1'
                      : 'bg-[#FFFFFF] border-[#E6E5DC]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-xs font-mono font-bold ${
                        isDark ? 'text-emerald-400' : 'text-[#18181B]'
                      }`}>
                        {index < 9 ? `0${index + 1}` : index + 1}
                      </span>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        hoveredCard === index ? 'bg-emerald-500' : isDark ? 'bg-[#353548]' : 'bg-[#D4D3C7]'
                      }`} />
                    </div>
                    <h4 className={`text-base font-serif font-bold tracking-tight mb-2 ${
                      isDark ? 'text-[#F4F4F6]' : 'text-[#18181B]'
                    }`}>
                      {resourceName}
                    </h4>
                    <p className={`text-xs leading-relaxed ${isDark ? 'text-[#A6A6B4]' : 'text-[#57575E]'}`}>
                      Verified Punjab board academic repository & exam material.
                    </p>
                  </div>

                  <div className={`mt-6 pt-3 border-t flex items-center justify-between text-[11px] font-mono ${
                    isDark ? 'border-[#242432]' : 'border-[#E6E5DC]'
                  }`}>
                    <span className={isDark ? 'text-[#747482]' : 'text-[#7E7E88]'}>ACCESS</span>
                    <a
                      href={EDUCATION_POINT_DETAILS.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`font-semibold flex items-center gap-1 transition-colors ${
                        isDark ? 'text-[#F4F4F6] hover:text-[#A6A6B4]' : 'text-[#18181B] hover:text-[#57575E]'
                      }`}
                    >
                      <span>Open</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Vision Box */}
          <div className={`mt-10 p-6 rounded-2xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
            isDark
              ? 'bg-[#101016] border-[#242432]'
              : 'bg-[#FFFFFF] border-[#E6E5DC]'
          }`}>
            <div className="space-y-1">
              <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${
                isDark ? 'text-emerald-400' : 'text-[#18181B]'
              }`}>
                FOUNDER'S MISSION FOR MIANWALI & BEYOND
              </span>
              <p className={`text-sm font-serif italic ${isDark ? 'text-[#F4F4F6]' : 'text-[#18181B]'}`}>
                "Education Point was created to bridge digital inequality in access to study materials, empowering every Pakistani student with free, structured knowledge."
              </p>
            </div>

            <a
              id="ep-visit-link"
              href={EDUCATION_POINT_DETAILS.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFX.playTick()}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold shadow-xs flex-shrink-0 active:scale-95 transition-all ${
                isDark
                  ? 'bg-[#F4F4F6] text-[#0C0C0F] hover:bg-[#E2E2E6]'
                  : 'bg-[#18181B] text-[#F9F9F6] hover:bg-[#333338]'
              }`}
            >
              <span>Visit Portal</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
