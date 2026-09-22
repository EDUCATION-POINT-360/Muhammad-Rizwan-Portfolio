import { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Terminal, Code, Cpu, Award, User, ShieldCheck, ArrowUpRight, BookOpen, Compass } from 'lucide-react';
import { PERSONAL_INFO, QUICK_PROFILE } from '../data/portfolioData';
import { soundFX } from '../utils/audio';
import { ASSETS } from '../assets/images';
import { useTheme } from '../context/ThemeContext';

export default function AboutSection() {
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
        isDark ? 'bg-[#0C0C0F] border-[#242432]' : 'bg-[#FFFFFF] border-[#E6E5DC]/80'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Tag */}
        <div className="flex items-center gap-2 mb-4">
          <span className={`text-xs font-mono tracking-widest uppercase ${isDark ? 'text-[#747482]' : 'text-[#7E7E88]'}`}>
            01 // PROFILE & VISION
          </span>
          <div className={`w-12 h-[1px] ${isDark ? 'bg-[#353548]' : 'bg-[#D4D3C7]'}`} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading, Founder Card & Quote (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div>
              <h2 className={`text-xs font-bold tracking-[0.25em] uppercase mb-4 ${isDark ? 'text-[#747482]' : 'text-[#7E7E88]'}`}>
                ABOUT ME
              </h2>
              <h3 className={`text-4xl sm:text-5xl md:text-6xl font-serif leading-[1.08] tracking-tight ${isDark ? 'text-[#F4F4F6]' : 'text-[#18181B]'}`}>
                I don't just use technology.
                <span className={`block italic mt-2 ${isDark ? 'text-[#A6A6B4]' : 'text-[#57575E]'}`}>I build with it.</span>
              </h3>
            </div>

            {/* Founder Digital Profile Card with Real Portrait */}
            <div
              className={`p-5 sm:p-6 rounded-3xl border shadow-sm group transition-all duration-300 ${
                isDark
                  ? 'bg-[#15151C] border-[#242432] hover:border-[#353548]'
                  : 'bg-[#F9F9F6] border-[#E6E5DC] hover:border-[#18181B]'
              }`}
            >
              <div className="flex items-center gap-4 sm:gap-5">
                <div className={`relative w-20 h-24 sm:w-24 sm:h-28 rounded-2xl overflow-hidden border-2 flex-shrink-0 shadow-md ${
                  isDark ? 'border-[#353548] bg-[#1D1D26]' : 'border-[#18181B]/20 bg-[#FFFFFF]'
                }`}>
                  {!imageError ? (
                    <img
                      src={portraitSrc}
                      alt={ASSETS.portraitAlt}
                      referrerPolicy="no-referrer"
                      onError={handleImageError}
                      className="w-full h-full object-cover object-[center_20%] transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#18181B] to-[#333338] flex items-center justify-center font-serif text-xl font-bold text-white">
                      MR
                    </div>
                  )}
                  {/* Subtle rim light */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                  <span className="absolute bottom-1.5 right-1.5 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-[#FFFFFF] shadow-sm animate-pulse" />
                </div>

                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className={`flex flex-wrap items-center gap-1.5 text-[10px] font-mono ${isDark ? 'text-[#747482]' : 'text-[#7E7E88]'}`}>
                    <span className="text-emerald-500 font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                      FOUNDER
                    </span>
                    <span>•</span>
                    <span>EDUCATIONIST</span>
                  </div>
                  <h4 className={`font-serif font-bold text-xl leading-snug tracking-tight truncate ${isDark ? 'text-[#F4F4F6]' : 'text-[#18181B]'}`}>
                    Muhammad Rizwan
                  </h4>
                  <p className={`text-xs font-mono ${isDark ? 'text-[#A6A6B4]' : 'text-[#57575E]'}`}>
                    Mianwali, Pakistan
                  </p>
                  <div className={`text-[11px] font-serif italic pt-1 ${isDark ? 'text-[#D0D0DA]' : 'text-[#333338]'}`}>
                    «{PERSONAL_INFO.motto}»
                  </div>
                </div>
              </div>
            </div>

            {/* Editorial quote badge */}
            <div
              className={`p-6 rounded-2xl border shadow-sm ${
                isDark
                  ? 'bg-[#15151C] border-[#242432]'
                  : 'bg-[#F9F9F6] border-[#E6E5DC]'
              }`}
            >
              <div className={`flex items-center gap-2 text-xs font-mono mb-2 ${isDark ? 'text-[#747482]' : 'text-[#7E7E88]'}`}>
                <Sparkles className={`w-3.5 h-3.5 ${isDark ? 'text-amber-400' : 'text-[#18181B]'}`} />
                <span>ARCHITECTURAL ETHOS</span>
              </div>
              <p className={`text-sm font-serif italic leading-relaxed ${isDark ? 'text-[#F4F4F6]' : 'text-[#18181B]'}`}>
                "{PERSONAL_INFO.digitalPhilosophyQuote}"
              </p>
              <div className={`mt-3 text-[11px] font-sans font-medium ${isDark ? 'text-[#747482]' : 'text-[#7E7E88]'}`}>
                — Muhammad Rizwan, Mianwali
              </div>
            </div>

            {/* Modern CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => scrollTo('education-point')}
                className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-semibold shadow-sm active:scale-95 transition-all ${
                  isDark
                    ? 'bg-[#F4F4F6] text-[#0C0C0F] hover:bg-[#E2E2E6]'
                    : 'bg-[#18181B] text-[#F9F9F6] hover:bg-[#333338]'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Explore Education Point</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => scrollTo('journey')}
                className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-medium active:scale-95 transition-all border ${
                  isDark
                    ? 'bg-[#15151C] border-[#353548] text-[#F4F4F6] hover:bg-[#1D1D26]'
                    : 'bg-[#FFFFFF] border-[#D4D3C7] text-[#18181B] hover:bg-[#F4F4EE]'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Read Full Journey</span>
              </button>
            </div>
          </div>

          {/* Right Column: Bio & Areas of Interest (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            {/* Bio Paragraphs */}
            <div className={`space-y-4 text-base sm:text-lg leading-relaxed font-normal ${isDark ? 'text-[#A6A6B4]' : 'text-[#57575E]'}`}>
              {PERSONAL_INFO.aboutBios.map((paragraph, index) => (
                <p
                  key={index}
                  className={`relative pl-4 border-l-2 ${
                    isDark ? 'border-[#353548] text-[#E2E2E6]' : 'border-[#E6E5DC] text-[#333338]'
                  }`}
                >
                  «{paragraph}»
                </p>
              ))}
            </div>

            {/* Areas of Interest */}
            <div className="pt-6">
              <h4 className={`text-xs font-mono font-semibold tracking-wider uppercase mb-4 flex items-center gap-2 ${
                isDark ? 'text-[#F4F4F6]' : 'text-[#18181B]'
              }`}>
                <Terminal className="w-3.5 h-3.5" />
                <span>Main Areas of Interest</span>
              </h4>
              <div className="flex flex-wrap gap-2.5">
                {PERSONAL_INFO.areasOfInterest.map((area) => (
                  <span
                    key={area}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium border shadow-sm transition-colors ${
                      isDark
                        ? 'bg-[#15151C] border-[#353548] text-[#F4F4F6] hover:border-[#A6A6B4]'
                        : 'bg-[#FFFFFF] border-[#D4D3C7] text-[#18181B] hover:border-[#18181B]'
                    }`}
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section 08: Quick Profile Grid */}
        <div className={`mt-20 pt-16 border-t ${isDark ? 'border-[#242432]' : 'border-[#E6E5DC]'}`}>
          <div className="flex items-center justify-between mb-8">
            <h4 className={`text-xs font-mono font-bold tracking-widest uppercase ${isDark ? 'text-[#747482]' : 'text-[#7E7E88]'}`}>
              QUICK PROFILE // METRICS & BACKGROUND
            </h4>
            <span className={`text-[11px] font-mono ${isDark ? 'text-[#747482]' : 'text-[#7E7E88]'}`}>[ VERIFIED CREDENTIALS ]</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {QUICK_PROFILE.map((item, idx) => (
              <div
                key={idx}
                className={`p-5 rounded-2xl border transition-all duration-200 ${
                  item.highlight
                    ? isDark
                      ? 'bg-[#15151C] border-emerald-500/30 shadow-[0_4px_16px_rgba(0,0,0,0.3)]'
                      : 'bg-[#F9F9F6] border-[#18181B]/25 shadow-[0_4px_16px_rgba(24,24,27,0.04)]'
                    : isDark
                    ? 'bg-[#101016] border-[#242432]'
                    : 'bg-[#FFFFFF] border-[#E6E5DC]'
                }`}
              >
                <div className={`text-[10px] font-mono tracking-widest uppercase mb-1.5 ${isDark ? 'text-[#747482]' : 'text-[#7E7E88]'}`}>
                  {item.label}
                </div>
                <div className={`font-sans ${
                  item.highlight
                    ? `text-2xl font-bold ${isDark ? 'text-emerald-400' : 'text-[#18181B]'}`
                    : `text-sm font-semibold ${isDark ? 'text-[#F4F4F6]' : 'text-[#18181B]'}`
                }`}>
                  {item.value}
                </div>
                {item.highlight && (
                  <div className={`mt-2 flex items-center gap-1 text-[11px] font-mono ${isDark ? 'text-[#A6A6B4]' : 'text-[#57575E]'}`}>
                    <Award className={`w-3 h-3 ${isDark ? 'text-emerald-400' : 'text-[#18181B]'}`} />
                    <span>Academic Distinction</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
