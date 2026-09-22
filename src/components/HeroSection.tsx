import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ArrowDown, MapPin, Sparkles, Clock } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import Hero3DVisual from './Hero3DVisual';
import { soundFX } from '../utils/audio';
import { useTheme } from '../context/ThemeContext';

export default function HeroSection() {
  const [currentTime, setCurrentTime] = useState<string>('');
  const { isDark } = useTheme();

  useEffect(() => {
    const updateTime = () => {
      // Pakistan Standard Time (UTC+5)
      try {
        const timeStr = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Karachi',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        }).format(new Date());
        setCurrentTime(timeStr);
      } catch {
        setCurrentTime('PKT');
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    soundFX.playTick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className={`relative min-h-[92vh] pt-32 pb-20 sm:pt-36 sm:pb-28 flex items-center overflow-hidden border-b transition-colors duration-300 ${
        isDark ? 'border-[#242432]' : 'border-[#E6E5DC]/80'
      }`}
    >
      {/* Background subtle noise and fine grid lines */}
      <div className="absolute inset-0 bg-noise opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Text & Editorial Content (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Small Label Pill */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-[11px] sm:text-xs font-mono font-medium tracking-wider uppercase mb-6 transition-colors ${
                isDark
                  ? 'bg-[#15151C] border-[#353548] text-[#F4F4F6]'
                  : 'bg-[#EFEFE8] border-[#D4D3C7]/70 text-[#18181B]'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${isDark ? 'bg-emerald-400' : 'bg-[#18181B]'}`} />
              <span>FOUNDER • EDUCATIONIST • DIGITAL ARCHITECT</span>
            </motion.div>

            {/* Main Heading: Editorial & Monumental */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-4"
            >
              <h1 className={`text-5xl sm:text-7xl md:text-8xl font-serif font-normal tracking-tight leading-[0.95] ${
                isDark ? 'text-[#F4F4F6]' : 'text-[#18181B]'
              }`}>
                MUHAMMAD
                <span className={`block font-serif italic text-4xl sm:text-6xl md:text-7xl mt-1 sm:mt-2 ${
                  isDark ? 'text-[#A6A6B4]' : 'text-[#3A3A40]'
                }`}>
                  RIZWAN
                </span>
              </h1>
            </motion.div>

            {/* Main Statement */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-2 mb-6"
            >
              <p className={`text-2xl sm:text-3xl font-sans font-semibold tracking-tight ${
                isDark ? 'text-[#F4F4F6]' : 'text-[#18181B]'
              }`}>
                Think Digital. <span className={isDark ? 'text-[#747482]' : 'text-[#57575E]'}>Build Future.</span>
              </p>
            </motion.div>

            {/* Supporting Text */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className={`text-base sm:text-lg leading-relaxed max-w-xl font-normal mb-8 ${
                isDark ? 'text-[#A6A6B4]' : 'text-[#57575E]'
              }`}
            >
              «{PERSONAL_INFO.heroSupportingText}»
            </motion.p>

            {/* Location & Status Bar */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className={`flex flex-wrap items-center gap-4 sm:gap-6 mb-8 text-xs font-mono border-y py-3 w-full max-w-xl ${
                isDark ? 'border-[#242432] text-[#A6A6B4]' : 'border-[#E6E5DC] text-[#57575E]'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <MapPin className={`w-3.5 h-3.5 ${isDark ? 'text-emerald-400' : 'text-[#18181B]'}`} />
                <span className={`font-semibold ${isDark ? 'text-[#F4F4F6]' : 'text-[#18181B]'}`}>{PERSONAL_INFO.location}</span>
              </div>
              <div className={`hidden sm:block ${isDark ? 'text-[#353548]' : 'text-[#D4D3C7]'}`}>•</div>
              <div className="flex items-center gap-1.5">
                <Clock className={`w-3.5 h-3.5 ${isDark ? 'text-[#747482]' : 'text-[#7E7E88]'}`} />
                <span>PKT: {currentTime || '5:00 PM'}</span>
              </div>
              <div className={`hidden sm:block ${isDark ? 'text-[#353548]' : 'text-[#D4D3C7]'}`}>•</div>
              <div className="flex items-center gap-1.5">
                <Sparkles className={`w-3 h-3 ${isDark ? 'text-amber-400' : 'text-[#18181B]'}`} />
                <span className={isDark ? 'text-[#F4F4F6]' : 'text-[#18181B]'}>Ready to Build</span>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap items-center gap-4"
            >
              <button
                id="hero-explore-projects"
                onClick={() => scrollToSection('projects')}
                className={`group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-200 shadow-sm active:scale-95 ${
                  isDark
                    ? 'bg-[#F4F4F6] text-[#0C0C0F] hover:bg-[#E2E2E6]'
                    : 'bg-[#18181B] text-[#F9F9F6] hover:bg-[#333338]'
                }`}
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <button
                id="hero-about-me"
                onClick={() => scrollToSection('about')}
                className={`group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full border text-sm font-medium tracking-wide transition-all duration-200 shadow-sm active:scale-95 ${
                  isDark
                    ? 'bg-[#15151C] border-[#353548] text-[#F4F4F6] hover:bg-[#1D1D26]'
                    : 'bg-[#FFFFFF] border-[#D4D3C7] text-[#18181B] hover:bg-[#EFEFE8]'
                }`}
              >
                <span>About Me</span>
                <ArrowDown className={`w-4 h-4 transition-transform duration-300 group-hover:translate-y-1 ${
                  isDark ? 'text-[#A6A6B4]' : 'text-[#57575E]'
                }`} />
              </button>
            </motion.div>
          </div>

          {/* Right Column: 3D Visual Experience (5 cols) */}
          <div className="lg:col-span-5 flex items-center justify-center pt-8 lg:pt-0">
            <Hero3DVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
