import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  ArrowUpRight,
  BookOpen,
  Layers,
  CheckCircle2,
  FileText,
  ExternalLink,
  Sparkles,
  GraduationCap,
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
            04. Flagship EdTech Platform
          </span>
          <div className={`w-12 h-[1px] ${isDark ? 'bg-[#353548]' : 'bg-[#D4D3C7]'}`} />
        </div>

        {/* Main Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          <div className="lg:col-span-8">
            <div className={`inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-mono mb-4 border ${
              isDark
                ? 'bg-[#15151C] text-[#F4F4F6] border-[#353548]'
                : 'bg-[#EFEFE8] text-[#18181B] border-[#D4D3C7]/60'
            }`}>
              <span className="font-semibold text-emerald-500">{EDUCATION_POINT_DETAILS.role}</span>
              <span>•</span>
              <span className="italic">{EDUCATION_POINT_DETAILS.brandPhrases[0]}</span>
            </div>
            <h2 className={`text-4xl sm:text-6xl md:text-7xl font-serif tracking-tight leading-[0.98] ${
              isDark ? 'text-[#F4F4F6]' : 'text-[#18181B]'
            }`}>
              {EDUCATION_POINT_DETAILS.title}
            </h2>
            <p className={`mt-4 text-lg sm:text-xl leading-relaxed max-w-2xl font-normal ${
              isDark ? 'text-[#A6A6B4]' : 'text-[#57575E]'
            }`}>
              “{EDUCATION_POINT_DETAILS.statement}”
            </p>

            {/* Brand Motifs */}
            <div className="flex flex-wrap items-center gap-3 mt-4 text-xs font-mono text-emerald-500">
              {EDUCATION_POINT_DETAILS.brandPhrases.map((phrase, pIdx) => (
                <span key={pIdx} className="inline-flex items-center gap-1.5 opacity-90">
                  <span>“{phrase}”</span>
                  {pIdx < EDUCATION_POINT_DETAILS.brandPhrases.length - 1 && <span className="opacity-30">•</span>}
                </span>
              ))}
            </div>
          </div>

          {/* Prominent CTA Buttons */}
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-end justify-start">
            <a
              id="ep-main-cta-btn"
              href={EDUCATION_POINT_DETAILS.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFX.playChime()}
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-xs font-mono font-bold bg-emerald-500 hover:bg-emerald-400 text-white shadow-md transition-all active:scale-95 group w-full sm:w-auto"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Visit Education Point →</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <a
              id="ep-scheme-cta-btn"
              href={EDUCATION_POINT_DETAILS.schemeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFX.playTick()}
              className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border text-xs font-mono font-semibold transition-all active:scale-95 group w-full sm:w-auto ${
                isDark
                  ? 'bg-[#15151C] border-[#353548] text-[#F4F4F6] hover:bg-[#1D1D26]'
                  : 'bg-[#F9F9F6] border-[#D4D3C7] text-[#18181B] hover:bg-[#EFEFE8]'
              }`}
            >
              <FileText className="w-4 h-4 text-emerald-500" />
              <span>Browse Pairing Schemes</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>

        {/* Target Audience Bar */}
        <div className="mb-12">
          <div className="text-[10px] font-mono uppercase tracking-widest text-emerald-500 font-bold mb-3">
            TARGET AUDIENCE & STUDENT COMMUNITIES
          </div>
          <div className="flex flex-wrap gap-2 text-xs font-mono">
            {EDUCATION_POINT_DETAILS.targetAudience.map((audience, aIdx) => (
              <span
                key={aIdx}
                className={`px-3 py-1.5 rounded-xl border flex items-center gap-2 ${
                  isDark
                    ? 'bg-[#15151C] border-[#252535] text-[#D0D0DA]'
                    : 'bg-[#FFFFFF] border-[#E2E2D6] text-[#2D2D34]'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                <span>{audience}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Resources Highlighted Grid */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-xs font-mono font-bold tracking-widest uppercase ${
              isDark ? 'text-[#747482]' : 'text-[#7E7E88]'
            }`}>
              CURRICULAR RESOURCES & ACADEMIC CATEGORIES
            </h3>
            <span className={`text-[11px] font-mono ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
              [ 10+ Primary Resource Tracks ]
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {EDUCATION_POINT_DETAILS.coreAreas.map((res, idx) => (
              <div
                key={res}
                className={`p-4 rounded-2xl border text-center transition-all duration-200 group hover:-translate-y-0.5 ${
                  isDark
                    ? 'bg-[#14141B] border-[#242432] hover:border-emerald-500/40'
                    : 'bg-[#F9F9F6] border-[#E6E5DC] hover:border-[#18181B]/30'
                }`}
              >
                <div className={`w-8 h-8 rounded-xl mx-auto flex items-center justify-center mb-2 text-xs font-mono ${
                  isDark ? 'bg-[#1E1E2A] text-emerald-400' : 'bg-[#EFEFE8] text-emerald-600'
                }`}>
                  {String(idx + 1).padStart(2, '0')}
                </div>
                <div className={`text-xs font-sans font-bold tracking-tight ${
                  isDark ? 'text-[#F4F4F6]' : 'text-[#18181B]'
                }`}>
                  {res}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {EDUCATION_POINT_DETAILS.stats.map((stat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              onMouseEnter={() => soundFX.playTick()}
              className={`p-6 rounded-3xl border transition-all duration-300 relative overflow-hidden group ${
                isDark
                  ? 'bg-[#14141B] border-[#242432] hover:border-emerald-500/50 hover:shadow-[0_12px_32px_rgba(0,0,0,0.5)]'
                  : 'bg-[#FAFAF7] border-[#E8E7DF] hover:border-emerald-500/50 hover:shadow-[0_12px_32px_rgba(24,24,27,0.06)]'
              }`}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/15 transition-all duration-300 pointer-events-none" />
              <div className={`text-[10px] font-mono tracking-widest uppercase mb-2 ${
                isDark ? 'text-[#747482]' : 'text-[#7E7E88]'
              }`}>
                {stat.label}
              </div>
              <div className={`text-2xl sm:text-3xl font-serif font-bold tracking-tight ${
                isDark ? 'text-[#F4F4F6]' : 'text-[#18181B]'
              }`}>
                {stat.value}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
