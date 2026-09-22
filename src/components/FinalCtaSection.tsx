import { motion } from 'motion/react';
import { ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export default function FinalCtaSection() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="final-cta" className="py-24 sm:py-36 relative border-b border-[#E6E5DC]/80 bg-[#F9F9F6] text-center overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
        {/* Subtle emblem */}
        <div className="w-12 h-12 rounded-full bg-[#18181B] text-[#F9F9F6] flex items-center justify-center font-serif text-xl font-bold mb-8 shadow-sm">
          MR
        </div>

        {/* Large Typography: KEEP BUILDING */}
        <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif font-bold text-[#18181B] tracking-tight leading-[0.9] mb-4">
          KEEP BUILDING.
        </h2>

        {/* Motto */}
        <p className="text-xl sm:text-3xl font-serif italic text-[#57575E] tracking-tight mb-10">
          {PERSONAL_INFO.motto}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            id="cta-explore-projects"
            onClick={() => scrollToSection('projects')}
            className="group inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-[#18181B] text-[#F9F9F6] text-sm font-semibold tracking-wide hover:bg-[#333338] transition-all duration-200 shadow-md active:scale-95"
          >
            <span>Explore Projects</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          <button
            id="cta-contact-me"
            onClick={() => scrollToSection('contact')}
            className="group inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-[#FFFFFF] border border-[#D4D3C7] text-[#18181B] text-sm font-semibold tracking-wide hover:bg-[#EFEFE8] transition-all duration-200 shadow-sm active:scale-95"
          >
            <span>Contact Me</span>
            <ArrowUpRight className="w-4 h-4 text-[#57575E] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
