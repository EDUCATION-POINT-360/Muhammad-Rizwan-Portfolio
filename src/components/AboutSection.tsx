import { useState } from 'react';
import { motion } from 'motion/react';
import { Terminal, ArrowRight, ArrowUpRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { soundFX } from '../utils/audio';
import { ASSETS } from '../assets/images';
import { useTheme } from '../context/ThemeContext';

interface AboutSectionProps {
  onOpenCvModal?: () => void;
}

export default function AboutSection({ onOpenCvModal }: AboutSectionProps) {
  const [portraitSrc, setPortraitSrc] = useState<string>(ASSETS.portrait);
  const [hasTriedRemote, setHasTriedRemote] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { isDark } = useTheme();

  const handleImageError = () => {
    if (!hasTriedRemote && ASSETS.portraitRemote) {
      setHasTriedRemote(true);
      setPortraitSrc(ASSETS.portraitRemote);
    } else {
      setImageError(true);
    }
  };

  const scrollTo = (id: string) => {
    soundFX.playTick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="about"
      className={`py-24 sm:py-32 relative border-b transition-colors duration-300 ${
        isDark ? 'bg-[#0E0E12] border-[#242432]' : 'bg-[#FFFFFF] border-[#E6E5DC]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Numbering Header (anti-slop) */}
        <div className="flex items-center gap-2 mb-4">
          <span className={`text-xs font-mono tracking-widest uppercase ${isDark ? 'text-[#747482]' : 'text-[#7E7E88]'}`}>
            01. Background & Identity
          </span>
          <div className={`w-12 h-[1px] ${isDark ? 'bg-[#353548]' : 'bg-[#D4D3C7]'}`} />
        </div>

        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div>
            <h2 className={`text-xs font-bold tracking-[0.25em] uppercase mb-3 ${isDark ? 'text-[#747482]' : 'text-[#7E7E88]'}`}>
              ABOUT MUHAMMAD RIZWAN
            </h2>
            <h3 className={`text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight ${
              isDark ? 'text-[#F4F4F6]' : 'text-[#18181B]'
            }`}>
              Digital Product Builder & Founder
            </h3>
          </div>

          <p className={`text-sm sm:text-base max-w-md font-sans leading-relaxed ${
            isDark ? 'text-[#A6A6B4]' : 'text-[#57575E]'
          }`}>
            Building practical, accessible platforms at the intersection of education, modern web technologies, and emerging AI tools.
          </p>
        </div>

        {/* Main Content Grid: Image + Bio Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Authentic Portrait with 3D Depth Card (5 cols) */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <div className={`p-4 rounded-3xl border transition-all ${
              isDark
                ? 'bg-[#15151C] border-[#262636] shadow-[0_20px_50px_rgba(0,0,0,0.5)]'
                : 'bg-[#F9F9F6] border-[#E6E5DC] shadow-[0_20px_50px_rgba(24,24,27,0.06)]'
            }`}>
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#18181B] group">
                <img
                  src={portraitSrc}
                  alt="Muhammad Rizwan — Founder & Digital Architect"
                  className="w-full h-full object-cover object-top filter grayscale contrast-110 group-hover:filter-none transition-all duration-700"
                  onError={handleImageError}
                />

                {/* Subtle vignette & bottom badge */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="font-serif font-bold text-lg leading-tight">Muhammad Rizwan</div>
                  <div className="text-xs font-mono text-emerald-400 mt-0.5">Founder & Owner — Education Point</div>
                </div>
              </div>
            </div>

            {/* Founder Belief Statement Box */}
            <div
              className={`p-6 rounded-2xl border transition-colors ${
                isDark ? 'bg-[#121218] border-[#242432]' : 'bg-[#F9F9F6] border-[#E6E5DC]'
              }`}
            >
              <div className="text-[11px] font-mono tracking-wider uppercase text-emerald-600 dark:text-emerald-400 font-bold mb-2">
                FOUNDER PRINCIPLE
              </div>
              <p className={`text-sm font-serif italic leading-relaxed ${isDark ? 'text-[#F4F4F6]' : 'text-[#18181B]'}`}>
                “{PERSONAL_INFO.founderStatement}”
              </p>
              <div className={`mt-3 text-[11px] font-sans font-medium opacity-60`}>
                — Muhammad Rizwan
              </div>
            </div>

            {/* Clean Section Navigation Actions (no CV download buttons) */}
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <button
                onClick={() => scrollTo('projects')}
                className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-mono font-bold transition-all ${
                  isDark
                    ? 'bg-[#F4F4F6] text-[#0C0C0F] hover:bg-[#E2E2E6]'
                    : 'bg-[#18181B] text-[#F9F9F6] hover:bg-[#333338]'
                }`}
              >
                <span>Explore Selected Projects</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => scrollTo('founder')}
                className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-mono font-medium transition-all border ${
                  isDark
                    ? 'bg-[#15151C] border-[#353548] text-[#F4F4F6] hover:bg-[#1D1D26]'
                    : 'bg-[#FFFFFF] border-[#D4D3C7] text-[#18181B] hover:bg-[#F4F4EE]'
                }`}
              >
                <span>Founder Methodology</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
              </button>
            </div>
          </div>

          {/* Right Column: Narrative & Areas of Practice (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            {/* Bio Paragraphs */}
            <div className={`space-y-4 text-base sm:text-lg leading-relaxed font-normal ${isDark ? 'text-[#A6A6B4]' : 'text-[#57575E]'}`}>
              <p className={`relative pl-4 border-l-2 ${isDark ? 'border-emerald-500/70 text-[#E2E2E6]' : 'border-emerald-600/70 text-[#333338]'}`}>
                {PERSONAL_INFO.aboutMe}
              </p>
              <p className={`relative pl-4 border-l-2 ${isDark ? 'border-[#353548] text-[#D0D0D8]' : 'border-[#E6E5DC] text-[#44444C]'}`}>
                His work is focused on making useful academic resources organized and accessible with zero financial friction, while exploring how modern web architecture, Progressive Web Apps, and emerging AI technologies can provide everyday utility.
              </p>
            </div>

            {/* Verified Digital Identity & Leadership Card */}
            <div className={`p-4 rounded-2xl border text-xs font-mono transition-colors ${
              isDark ? 'bg-[#12121A] border-[#2A2A3A] text-[#C0C0D0]' : 'bg-[#F7F7F2] border-[#E2E2D6] text-[#44444E]'
            }`}>
              <div className="flex items-center gap-2 text-emerald-500 font-bold mb-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span className="uppercase tracking-wider text-[10px] font-semibold">Verified Digital Identity & Leadership</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Official digital portfolio and verified web presence of <strong className={isDark ? 'text-white' : 'text-black'}>Muhammad Rizwan</strong> — Founder, Educationist and Digital Architect from Mianwali, Pakistan. Founder &amp; Owner of <strong className={isDark ? 'text-emerald-400' : 'text-emerald-600'}>Education Point</strong>, dedicated to engineering accessible educational platforms, progressive web applications, and independent digital initiatives.
              </p>
            </div>

            {/* Areas of Practice (Unboxed text with typographic separators, zero-pill discipline) */}
            <div className="pt-2">
              <h4 className={`text-xs font-mono font-semibold tracking-wider uppercase mb-3 flex items-center gap-2 ${
                isDark ? 'text-[#F4F4F6]' : 'text-[#18181B]'
              }`}>
                <Terminal className="w-3.5 h-3.5" />
                <span>Professional Focus & Disciplines</span>
              </h4>
              <div className="flex flex-wrap gap-2 text-xs">
                {[
                  "Education Technology",
                  "Digital Education",
                  "Web Development",
                  "Frontend Development",
                  "Educational Platforms",
                  "Progressive Web Apps (PWA)",
                  "Digital Products",
                  "Student-Focused Technology",
                  "Online Educational Resources"
                ].map((area, idx, arr) => (
                  <span key={area} className="inline-flex items-center">
                    <span className={`py-1 font-medium ${isDark ? 'text-[#E2E2EA]' : 'text-[#2D2D34]'}`}>
                      {area}
                    </span>
                    {idx < arr.length - 1 && (
                      <span className="mx-2 opacity-30 select-none">·</span>
                    )}
                  </span>
                ))}
              </div>
            </div>

            {/* Academic Foundation Summary Cards */}
            <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div
                className={`p-4 rounded-2xl border ${
                  isDark ? 'bg-[#15151C] border-[#2A2A38]' : 'bg-[#F9F9F6] border-[#E6E5DC]'
                }`}
              >
                <div className="text-[10px] font-mono opacity-70 uppercase tracking-widest">
                  Academic Foundation
                </div>
                <div className="font-serif font-bold text-base mt-1">Intermediate in CS (ICS)</div>
                <div className="text-xs font-mono text-emerald-500 mt-0.5">Higher Secondary • 70%</div>
              </div>

              <div
                className={`p-4 rounded-2xl border ${
                  isDark ? 'bg-[#15151C] border-[#2A2A38]' : 'bg-[#F9F9F6] border-[#E6E5DC]'
                }`}
              >
                <div className="text-[10px] font-mono opacity-70 uppercase tracking-widest">
                  Secondary Foundation
                </div>
                <div className="font-serif font-bold text-base mt-1">Matric (Computer Science)</div>
                <div className="text-xs font-mono text-emerald-500 mt-0.5">Distinction Score • 85%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
