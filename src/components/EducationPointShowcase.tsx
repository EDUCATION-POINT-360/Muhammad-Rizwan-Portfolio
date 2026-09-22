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

export default function EducationPointShowcase() {
  const shouldReduceMotion = useReducedMotion();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section id="education-point" className="py-24 sm:py-36 relative border-b border-[#E6E5DC]/80 bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Pill */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-mono tracking-widest text-[#7E7E88] uppercase">
            04 // FLAGSHIP FOUNDATION
          </span>
          <div className="w-12 h-[1px] bg-[#D4D3C7]" />
        </div>

        {/* Main Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFEFE8] text-[11px] font-mono text-[#18181B] mb-3 border border-[#D4D3C7]/60">
              <span className="font-semibold">{EDUCATION_POINT_DETAILS.role}</span>
              <span>•</span>
              <span>{EDUCATION_POINT_DETAILS.tagline}</span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif text-[#18181B] tracking-tight leading-[0.98]">
              EDUCATION POINT
            </h2>
            <p className="mt-4 text-lg sm:text-xl text-[#57575E] leading-relaxed max-w-2xl font-normal">
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
              className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-[#18181B] text-[#F9F9F6] text-xs font-semibold tracking-wide hover:bg-[#333338] transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 group w-full sm:w-auto"
            >
              <ExternalLink className="w-4 h-4 text-[#F9F9F6]" />
              <span>Launch Education Point</span>
              <ArrowUpRight className="w-4 h-4 text-[#F9F9F6] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <a
              id="ep-scheme-cta-btn"
              href={EDUCATION_POINT_DETAILS.schemeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFX.playTick()}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#F9F9F6] border border-[#D4D3C7] text-[#18181B] text-xs font-medium tracking-wide hover:bg-[#EFEFE8] transition-all duration-200 active:scale-95 group w-full sm:w-auto"
            >
              <FileText className="w-4 h-4 text-[#57575E]" />
              <span>Browse Resource Schemes</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#7E7E88] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>

        {/* Highlight Showcase Container */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#F9F9F6] border border-[#E6E5DC] shadow-[0_8px_32px_rgba(24,24,27,0.03)]">
          {/* Key Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-10 border-b border-[#E6E5DC]">
            {EDUCATION_POINT_DETAILS.stats.map((stat, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-[10px] font-mono tracking-widest text-[#7E7E88] uppercase mb-1">
                  {stat.label}
                </span>
                <span className="text-xl sm:text-3xl font-serif font-bold text-[#18181B]">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>

          {/* Resources Grid: Interactive 3D Cards */}
          <div className="pt-10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xs font-mono font-bold tracking-widest text-[#18181B] uppercase flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#18181B]" />
                <span>Curated Academic Resources Hub</span>
              </h3>
              <span className="text-[11px] font-mono text-[#7E7E88]">10 Core Streams</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5">
              {EDUCATION_POINT_DETAILS.resources.map((item, idx) => (
                <div
                  key={idx}
                  onMouseEnter={() => {
                    setHoveredCard(idx);
                    soundFX.playTick();
                  }}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#E6E5DC] hover:border-[#18181B] hover:shadow-[0_8px_20px_rgba(24,24,27,0.06)] hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between group shadow-xs cursor-default"
                >
                  <div className="flex items-center justify-between text-[#7E7E88] group-hover:text-[#18181B] mb-2">
                    <span className="text-[10px] font-mono font-bold">0{idx + 1}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 opacity-60 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-[#18181B] leading-snug">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Direct Platform Preview Banner with Modern CTA Buttons */}
          <div className="mt-10 pt-8 border-t border-[#E6E5DC] flex flex-col md:flex-row items-center justify-between gap-6 bg-[#FFFFFF] p-6 sm:p-8 rounded-2xl border border-[#E6E5DC] shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#18181B] text-[#F9F9F6] flex items-center justify-center font-serif text-2xl font-bold flex-shrink-0 shadow-sm">
                EP
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-lg font-serif font-bold text-[#18181B]">
                    Education Point Official Portal
                  </h4>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono font-semibold">
                    LIVE
                  </span>
                </div>
                <p className="text-xs text-[#57575E] mt-1">
                  Free matric and intermediate curriculum notes, paper patterns, and academic resources for students.
                </p>
                <div className="mt-2 text-xs font-mono text-[#18181B] font-medium flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-[#7E7E88]" />
                  <span>https://educationpoint360.netlify.app/</span>
                </div>
              </div>
            </div>

            {/* CTA Button Group with Lucide Icons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              <a
                href={EDUCATION_POINT_DETAILS.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFX.playChime()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#18181B] text-[#F9F9F6] text-xs font-semibold hover:bg-[#333338] transition-all shadow-sm active:scale-95"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Visit Portal</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <a
                href={EDUCATION_POINT_DETAILS.schemeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFX.playTick()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#EFEFE8] text-[#18181B] text-xs font-medium hover:bg-[#E6E5DC] transition-all active:scale-95"
              >
                <FileText className="w-3.5 h-3.5 text-[#57575E]" />
                <span>Schemes</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
