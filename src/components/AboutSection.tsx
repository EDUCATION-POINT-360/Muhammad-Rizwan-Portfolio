import { motion } from 'motion/react';
import { Sparkles, Terminal, Code, Cpu, Award, User, ShieldCheck, ArrowUpRight, BookOpen, Compass } from 'lucide-react';
import { PERSONAL_INFO, QUICK_PROFILE } from '../data/portfolioData';
import { soundFX } from '../utils/audio';

const AVATAR_IMAGE = '/src/assets/images/rizwan_anime_avatar_1790075294566.jpg';

export default function AboutSection() {
  const scrollTo = (id: string) => {
    soundFX.playTick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="about" className="py-24 sm:py-32 relative border-b border-[#E6E5DC]/80 bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Tag */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-mono tracking-widest text-[#7E7E88] uppercase">
            01 // PROFILE & VISION
          </span>
          <div className="w-12 h-[1px] bg-[#D4D3C7]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading, Founder Card & Quote (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div>
              <h2 className="text-xs font-bold tracking-[0.25em] text-[#7E7E88] uppercase mb-4">
                ABOUT ME
              </h2>
              <h3 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#18181B] leading-[1.08] tracking-tight">
                I don't just use technology.
                <span className="block italic text-[#57575E] mt-2">I build with it.</span>
              </h3>
            </div>

            {/* Founder Digital Profile Card */}
            <div className="p-5 rounded-3xl bg-[#F9F9F6] border border-[#E6E5DC] flex items-center gap-4 shadow-sm group hover:border-[#18181B] transition-all">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-[#18181B]/15 flex-shrink-0 shadow-md">
                <img
                  src={AVATAR_IMAGE}
                  alt="Muhammad Rizwan"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute bottom-1 right-1 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-[#FFFFFF]" />
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#7E7E88]">
                  <span>DIGITAL ARCHITECT</span>
                  <span>•</span>
                  <span className="text-emerald-700 font-semibold">FOUNDER</span>
                </div>
                <h4 className="font-serif font-bold text-lg text-[#18181B] leading-snug">
                  Muhammad Rizwan
                </h4>
                <p className="text-xs font-mono text-[#57575E]">
                  Mianwali, Pakistan // Class of 2026
                </p>
              </div>
            </div>

            {/* Editorial quote badge */}
            <div className="p-6 rounded-2xl bg-[#F9F9F6] border border-[#E6E5DC] shadow-[0_4px_20px_rgba(24,24,27,0.03)]">
              <div className="flex items-center gap-2 text-xs font-mono text-[#7E7E88] mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#18181B]" />
                <span>ARCHITECTURAL ETHOS</span>
              </div>
              <p className="text-sm font-serif italic text-[#18181B] leading-relaxed">
                "{PERSONAL_INFO.digitalPhilosophyQuote}"
              </p>
              <div className="mt-3 text-[11px] font-sans font-medium text-[#7E7E88]">
                — Muhammad Rizwan, Mianwali
              </div>
            </div>

            {/* Modern CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => scrollTo('education-point')}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#18181B] text-[#F9F9F6] text-xs font-semibold hover:bg-[#333338] transition-all shadow-sm active:scale-95"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Explore Education Point</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => scrollTo('journey')}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#FFFFFF] border border-[#D4D3C7] text-[#18181B] text-xs font-medium hover:bg-[#F4F4EE] transition-all active:scale-95"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Read Full Journey</span>
              </button>
            </div>
          </div>

          {/* Right Column: Bio & Areas of Interest (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            {/* Bio Paragraphs */}
            <div className="space-y-4 text-base sm:text-lg text-[#57575E] leading-relaxed font-normal">
              {PERSONAL_INFO.aboutBios.map((paragraph, index) => (
                <p key={index} className="relative pl-4 border-l-2 border-[#E6E5DC] text-[#333338]">
                  «{paragraph}»
                </p>
              ))}
            </div>

            {/* Areas of Interest */}
            <div className="pt-6">
              <h4 className="text-xs font-mono font-semibold tracking-wider text-[#18181B] uppercase mb-4 flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5" />
                <span>Main Areas of Interest</span>
              </h4>
              <div className="flex flex-wrap gap-2.5">
                {PERSONAL_INFO.areasOfInterest.map((area) => (
                  <span
                    key={area}
                    className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-[#FFFFFF] border border-[#D4D3C7] text-[#18181B] shadow-sm hover:border-[#18181B] transition-colors"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section 08: Quick Profile Grid */}
        <div className="mt-20 pt-16 border-t border-[#E6E5DC]">
          <div className="flex items-center justify-between mb-8">
            <h4 className="text-xs font-mono font-bold tracking-widest text-[#7E7E88] uppercase">
              QUICK PROFILE // METRICS & BACKGROUND
            </h4>
            <span className="text-[11px] font-mono text-[#7E7E88]">[ VERIFIED CREDENTIALS ]</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {QUICK_PROFILE.map((item, idx) => (
              <div
                key={idx}
                className={`p-5 rounded-2xl border transition-all duration-200 ${
                  item.highlight
                    ? 'bg-[#F9F9F6] border-[#18181B]/25 shadow-[0_4px_16px_rgba(24,24,27,0.04)]'
                    : 'bg-[#FFFFFF] border-[#E6E5DC]'
                }`}
              >
                <div className="text-[10px] font-mono tracking-widest text-[#7E7E88] uppercase mb-1.5">
                  {item.label}
                </div>
                <div className={`font-sans ${item.highlight ? 'text-2xl font-bold text-[#18181B]' : 'text-sm font-semibold text-[#18181B]'}`}>
                  {item.value}
                </div>
                {item.highlight && (
                  <div className="mt-2 flex items-center gap-1 text-[11px] font-mono text-[#57575E]">
                    <Award className="w-3 h-3 text-[#18181B]" />
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
