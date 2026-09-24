import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  ArrowDown,
  MapPin,
  Sparkles,
  Clock,
  Code2,
  Terminal,
  Zap,
  Globe2,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import Hero3DVisual from './Hero3DVisual';
import { soundFX } from '../utils/audio';
import { useTheme } from '../context/ThemeContext';

interface HeroSectionProps {
  onOpenCvModal?: () => void;
}

export default function HeroSection({ onOpenCvModal }: HeroSectionProps) {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { isDark } = useTheme();

  useEffect(() => {
    const updateTime = () => {
      try {
        const timeStr = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Karachi',
          hour: '2-digit',
          minute: '2-digit',
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

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY } = e;
    setMousePos({ x: clientX, y: clientY });
  };

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
      onMouseMove={handleMouseMove}
      className={`min-h-[92vh] flex items-center justify-center relative pt-28 pb-20 overflow-hidden border-b transition-colors duration-300 ${
        isDark ? 'border-[#242432]' : 'border-[#E6E5DC]/80'
      }`}
    >
      {/* Dynamic Animated Ambient Cursor Glow on PC */}
      <div
        className="pointer-events-none fixed w-[500px] h-[500px] rounded-full blur-[140px] opacity-15 transition-all duration-300 ease-out -z-10"
        style={{
          left: `${mousePos.x - 250}px`,
          top: `${mousePos.y - 250}px`,
          background: isDark
            ? 'radial-gradient(circle, #10B981 0%, rgba(16,185,129,0) 70%)'
            : 'radial-gradient(circle, #059669 0%, rgba(5,150,105,0) 70%)',
        }}
      />

      {/* Subtle Background Radial Glow */}
      <div
        className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[160px] pointer-events-none animate-pulse ${
          isDark ? 'bg-emerald-500/10' : 'bg-emerald-500/5'
        }`}
        style={{ animationDuration: '8s' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Core Positioning & Brand Statements (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Live Availability Status */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 mb-6"
            >
              <div
                className={`inline-flex flex-wrap items-center gap-2 px-3 py-1.5 rounded-full border text-[11px] sm:text-xs font-mono backdrop-blur-md ${
                  isDark
                    ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400'
                    : 'bg-emerald-50 border-emerald-200 text-emerald-700'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-ping flex-shrink-0" />
                <span className="font-semibold tracking-wide">
                  Available for Remote & Digital Product Roles
                </span>
                <span className="hidden sm:inline opacity-40">·</span>
                <span className="hidden sm:inline opacity-80">Global Ready</span>
              </div>
            </motion.div>

            {/* Founder & Builder Name Title */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-2 mb-4"
            >
              <h1
                className={`text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight leading-[1.05] ${
                  isDark ? 'text-[#F4F4F6]' : 'text-[#18181B]'
                }`}
              >
                MUHAMMAD RIZWAN
              </h1>

              {/* Sub-headline: Professional Position */}
              <div className="pt-1 flex flex-wrap items-center gap-2 text-xs sm:text-sm font-mono tracking-wider uppercase text-emerald-600 dark:text-emerald-400 font-semibold">
                <span className="flex items-center gap-1">
                  <Terminal className="w-3.5 h-3.5" /> Founder
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Code2 className="w-3.5 h-3.5" /> Educationist
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Globe2 className="w-3.5 h-3.5" /> Digital Architect
                </span>
              </div>
            </motion.div>

            {/* Personal Brand Statement Motto */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mb-6"
            >
              <p
                className={`text-2xl sm:text-3xl md:text-4xl font-serif italic tracking-tight font-medium ${
                  isDark ? 'text-[#EAEAEF]' : 'text-[#27272A]'
                }`}
              >
                Think Digital.{' '}
                <span className={isDark ? 'text-emerald-400' : 'text-emerald-600'}>
                  Build Future.
                </span>
              </p>
            </motion.div>

            {/* Short Introduction */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className={`text-base sm:text-lg leading-relaxed max-w-xl font-normal mb-7 ${
                isDark ? 'text-[#D0D0DA]' : 'text-[#3F3F46]'
              }`}
            >
              “{PERSONAL_INFO.shortIntro}”
            </motion.p>

            {/* Location & Real-Time Context Bar */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className={`flex flex-wrap items-center gap-4 sm:gap-6 mb-8 text-xs font-mono border-y py-3 w-full max-w-xl ${
                isDark ? 'border-[#242432] text-[#A6A6B4]' : 'border-[#E6E5DC] text-[#57575E]'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <MapPin className={`w-3.5 h-3.5 ${isDark ? 'text-emerald-400' : 'text-[#18181B]'}`} />
                <span className={`font-semibold ${isDark ? 'text-[#F4F4F6]' : 'text-[#18181B]'}`}>
                  {PERSONAL_INFO.location}
                </span>
              </div>
              <div className={`hidden sm:block ${isDark ? 'text-[#353548]' : 'text-[#D4D3C7]'}`}>•</div>
              <div className="flex items-center gap-1.5">
                <Clock className={`w-3.5 h-3.5 ${isDark ? 'text-[#747482]' : 'text-[#7E7E88]'}`} />
                <span>PKT: {currentTime || 'Pakistan'}</span>
              </div>
              <div className={`hidden sm:block ${isDark ? 'text-[#353548]' : 'text-[#D4D3C7]'}`}>•</div>
              <div className="flex items-center gap-1.5">
                <Sparkles className={`w-3 h-3 ${isDark ? 'text-amber-400' : 'text-[#18181B]'}`} />
                <span className={isDark ? 'text-[#F4F4F6]' : 'text-[#18181B]'}>
                  Founder: Education Point
                </span>
              </div>
            </motion.div>

            {/* Primary Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="flex flex-wrap items-center gap-3 sm:gap-4 mb-5"
            >
              {/* Primary: View Projects */}
              <button
                id="hero-explore-work-btn"
                onClick={() => scrollToSection('projects')}
                className={`group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-200 active:scale-95 shadow-md ${
                  isDark
                    ? 'bg-[#F4F4F6] text-[#0C0C0F] hover:bg-[#E2E2E6]'
                    : 'bg-[#18181B] text-[#F9F9F6] hover:bg-[#333338]'
                }`}
              >
                <span>Explore Work</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              {/* Secondary: Start a Conversation */}
              <button
                id="hero-contact-btn"
                onClick={() => scrollToSection('contact')}
                className={`inline-flex items-center gap-2 px-6 py-3.5 rounded-full border text-sm font-semibold tracking-wide transition-all duration-200 active:scale-95 ${
                  isDark
                    ? 'bg-[#15151C] border-[#353548] text-[#F4F4F6] hover:bg-[#1D1D26]'
                    : 'bg-[#FFFFFF] border-[#D4D3C7] text-[#18181B] hover:bg-[#EFEFE8]'
                }`}
              >
                <span>Start a Conversation</span>
              </button>
            </motion.div>

            {/* Subtle, elegant anchor to Curriculum Vitae section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="pt-2"
            >
              <button
                onClick={() => scrollToSection('cv')}
                className="inline-flex items-center gap-1.5 text-xs font-mono opacity-70 hover:opacity-100 hover:text-emerald-500 transition-all group"
              >
                <span>View Official Curriculum Vitae & Credentials</span>
                <ArrowDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-y-0.5" />
              </button>
            </motion.div>
          </div>

          {/* Right Column: 3D Visual Stage with Three.js WebGL & Holographic Tilt (5 cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <Hero3DVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
