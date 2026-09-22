import { motion } from 'motion/react';
import { ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';

export default function FinalCtaSection() {
  const { isDark } = useTheme();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="final-cta"
      className={`py-24 sm:py-36 relative border-b text-center overflow-hidden transition-colors duration-300 ${
        isDark ? 'bg-[#0C0C0F] border-[#242432]' : 'bg-[#F9F9F6] border-[#E6E5DC]/80'
      }`}
    >
      {/* Background radial accent */}
      <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
        {/* Subtle emblem */}
        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-serif text-xl font-bold mb-8 shadow-sm ${
          isDark ? 'bg-[#F4F4F6] text-[#0C0C0F]' : 'bg-[#18181B] text-[#F9F9F6]'
        }`}>
          MR
        </div>

        {/* Large Typography: KEEP BUILDING */}
        <h2 className={`text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif font-bold tracking-tight leading-[0.9] mb-4 ${
          isDark ? 'text-[#F4F4F6]' : 'text-[#18181B]'
        }`}>
          KEEP BUILDING.
        </h2>

        {/* Motto */}
        <p className={`text-xl sm:text-3xl font-serif italic tracking-tight mb-10 ${
          isDark ? 'text-[#A6A6B4]' : 'text-[#57575E]'
        }`}>
          {PERSONAL_INFO.motto}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            id="cta-explore-projects"
            onClick={() => scrollToSection('projects')}
            className={`group inline-flex items-center gap-2.5 px-7 py-4 rounded-full text-sm font-semibold tracking-wide transition-all duration-200 shadow-md active:scale-95 ${
              isDark
                ? 'bg-[#F4F4F6] text-[#0C0C0F] hover:bg-[#E2E2E6]'
                : 'bg-[#18181B] text-[#F9F9F6] hover:bg-[#333338]'
            }`}
          >
            <span>Explore Projects</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          <button
            id="cta-contact-me"
            onClick={() => scrollToSection('contact')}
            className={`group inline-flex items-center gap-2.5 px-7 py-4 rounded-full border text-sm font-semibold tracking-wide transition-all duration-200 shadow-sm active:scale-95 ${
              isDark
                ? 'bg-[#15151C] border-[#353548] text-[#F4F4F6] hover:bg-[#1D1D26]'
                : 'bg-[#FFFFFF] border-[#D4D3C7] text-[#18181B] hover:bg-[#EFEFE8]'
            }`}
          >
            <span>Contact Me</span>
            <ArrowUpRight className={`w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
              isDark ? 'text-[#A6A6B4]' : 'text-[#57575E]'
            }`} />
          </button>
        </div>
      </div>
    </section>
  );
}
