import { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'motion/react';
import { Sparkles, Terminal, Layers, User, Box, MessageCircle, ArrowUpRight, Compass, ShieldCheck } from 'lucide-react';
import { soundFX } from '../utils/audio';

const AVATAR_IMAGE = '/src/assets/images/rizwan_anime_avatar_1790075294566.jpg';

const QUOTES = [
  "Think Digital. Build Future.",
  "I don't just use technology. I build with it.",
  "Making education accessible through technology.",
  "Quiet. Creative. Curious.",
  "Learn • Create • Improve • Repeat",
];

export default function Hero3DVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [mode, setMode] = useState<'portrait' | 'spatial'>('portrait');
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [showSpeech, setShowSpeech] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    if (!container || shouldReduceMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMousePos({ x, y });
    };

    // Support touch interactions on mobile
    const handleTouchMove = (e: TouchEvent) => {
      if (!e.touches[0]) return;
      const rect = container.getBoundingClientRect();
      const x = (e.touches[0].clientX - rect.left) / rect.width - 0.5;
      const y = (e.touches[0].clientY - rect.top) / rect.height - 0.5;
      setMousePos({ x: Math.max(-0.5, Math.min(0.5, x)), y: Math.max(-0.5, Math.min(0.5, y)) });
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => {
      setIsHovered(false);
      setMousePos({ x: 0, y: 0 });
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('touchmove', handleTouchMove);
    };
  }, [shouldReduceMotion]);

  const handleNextQuote = () => {
    soundFX.playTick();
    setQuoteIndex((prev) => (prev + 1) % QUOTES.length);
  };

  const handleModeToggle = (newMode: 'portrait' | 'spatial') => {
    soundFX.playChime();
    setMode(newMode);
  };

  // 3D rotation values
  const rotateX = shouldReduceMotion ? 0 : isHovered ? -mousePos.y * 14 : 0;
  const rotateY = shouldReduceMotion ? 0 : isHovered ? mousePos.x * 14 : 0;

  return (
    <div className="flex flex-col items-center w-full">
      {/* 3D Visual Stage */}
      <div
        ref={containerRef}
        id="hero-3d-stage"
        className="relative w-full max-w-[340px] sm:max-w-[420px] aspect-square mx-auto flex items-center justify-center perspective-1000 select-none touch-pan-y"
      >
        {/* Ambient Depth Glow */}
        <div className="absolute inset-4 sm:inset-8 rounded-full bg-gradient-to-br from-[#EAEAE0]/70 via-[#F3F3EC]/50 to-transparent blur-2xl -z-10 pointer-events-none" />

        {/* 3D Rotational Root Canvas */}
        <motion.div
          animate={{
            rotateX,
            rotateY,
          }}
          transition={{ type: 'spring', stiffness: 120, damping: 22, mass: 0.8 }}
          className="relative w-72 h-72 sm:w-80 sm:h-80 preserve-3d flex items-center justify-center"
        >
          {/* Orbital Ring Background (Z-depth: -30px) */}
          <motion.div
            animate={shouldReduceMotion ? {} : { rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            className="absolute w-64 h-64 sm:w-76 sm:h-76 rounded-full border border-dashed border-[#D4D3C7]"
            style={{ transform: 'translateZ(-30px)' }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#18181B] shadow-sm" />
            <div className="absolute bottom-6 right-10 w-2 h-2 rounded-full bg-[#7E7E88]" />
          </motion.div>

          {/* Counter-orbital Ring (Z-depth: 10px) */}
          <motion.div
            animate={shouldReduceMotion ? {} : { rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className="absolute w-52 h-52 sm:w-60 sm:h-60 rounded-full border border-[#E6E5DC]"
            style={{ transform: 'translateZ(10px) rotateX(30deg)' }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 rounded-full bg-[#18181B]" />
          </motion.div>

          <AnimatePresence mode="wait">
            {mode === 'portrait' ? (
              /* ================= PORTRAIT VIEW ================= */
              <motion.div
                key="portrait-view"
                initial={{ opacity: 0, scale: 0.9, rotateY: -20 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.9, rotateY: 20 }}
                transition={{ duration: 0.4 }}
                className="relative w-56 h-56 sm:w-64 sm:h-64 preserve-3d flex items-center justify-center"
              >
                {/* Character Main Portrait Frame */}
                <div
                  className="relative w-full h-full rounded-3xl overflow-hidden border-2 border-[#18181B]/15 bg-[#FFFFFF] shadow-[0_16px_40px_rgba(24,24,27,0.08)] group/avatar cursor-pointer"
                  style={{ transform: 'translateZ(20px)' }}
                  onClick={handleNextQuote}
                  title="Click to view digital ethos statement"
                >
                  <img
                    src={AVATAR_IMAGE}
                    alt="Muhammad Rizwan — Digital Architect & Founder"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/avatar:scale-105"
                  />

                  {/* Gradient sheen overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#18181B]/40 via-transparent to-transparent pointer-events-none" />

                  {/* Bottom Identity Tag */}
                  <div className="absolute bottom-2.5 inset-x-2.5 px-3 py-1.5 rounded-xl bg-[#F9F9F6]/95 backdrop-blur-md border border-[#E6E5DC] flex items-center justify-between text-[10px] font-mono shadow-sm">
                    <span className="font-bold text-[#18181B] truncate">MUHAMMAD RIZWAN</span>
                    <span className="text-emerald-700 font-semibold text-[9px] uppercase tracking-wider">FOUNDER</span>
                  </div>
                </div>

                {/* Floating Interactive Speech Bubble (High Z-depth: 70px) */}
                <AnimatePresence>
                  {showSpeech && (
                    <motion.div
                      key={quoteIndex}
                      initial={{ opacity: 0, y: -10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      onClick={handleNextQuote}
                      className="absolute -top-12 sm:-top-14 left-1/2 -translate-x-1/2 px-3.5 py-2 rounded-2xl bg-[#FFFFFF] border border-[#18181B] shadow-[0_10px_25px_rgba(24,24,27,0.12)] cursor-pointer hover:bg-[#F9F9F6] transition-colors whitespace-nowrap z-20 flex items-center gap-1.5 text-xs font-serif italic text-[#18181B]"
                      style={{ transform: 'translateZ(70px) translateX(-50%)' }}
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-[#18181B] not-italic flex-shrink-0" />
                      <span>"{QUOTES[quoteIndex]}"</span>
                      <span className="text-[9px] font-mono not-italic text-[#7E7E88] ml-1 bg-[#EFEFE8] px-1.5 py-0.5 rounded-full">click</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Floating Holographic Badge 1: Education Point */}
                <motion.div
                  animate={shouldReduceMotion ? {} : { y: [-3, 3, -3] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -bottom-4 -left-6 px-3 py-1.5 rounded-xl bg-[#FFFFFF] border border-[#E6E5DC] shadow-[0_8px_20px_rgba(24,24,27,0.06)] flex items-center gap-2"
                  style={{ transform: 'translateZ(60px)' }}
                >
                  <div className="w-5 h-5 rounded-lg bg-[#18181B] text-[#F9F9F6] flex items-center justify-center">
                    <Layers className="w-3 h-3" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] font-bold text-[#18181B] leading-none">Education Point</span>
                    <span className="text-[8px] text-[#7E7E88] leading-tight">Flagship Portal</span>
                  </div>
                </motion.div>

                {/* Floating Holographic Badge 2: AI Tech */}
                <motion.div
                  animate={shouldReduceMotion ? {} : { y: [3, -3, 3] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  className="absolute -bottom-3 -right-6 px-3 py-1.5 rounded-xl bg-[#FFFFFF] border border-[#E6E5DC] shadow-[0_8px_20px_rgba(24,24,27,0.06)] flex items-center gap-2"
                  style={{ transform: 'translateZ(65px)' }}
                >
                  <div className="w-5 h-5 rounded-lg bg-[#EFEFE8] text-[#18181B] flex items-center justify-center">
                    <Sparkles className="w-3 h-3" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] font-bold text-[#18181B] leading-none">EP AI & Web</span>
                    <span className="text-[8px] text-[#7E7E88] leading-tight">Netlify Verified</span>
                  </div>
                </motion.div>
              </motion.div>
            ) : (
              /* ================= SPATIAL CORE VIEW ================= */
              <motion.div
                key="spatial-view"
                initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.9, rotateY: -20 }}
                transition={{ duration: 0.4 }}
                className="relative w-56 h-56 sm:w-64 sm:h-64 preserve-3d flex items-center justify-center"
              >
                {/* Layer: Perspective Coordinate Grid */}
                <div
                  className="absolute inset-0 rounded-3xl border border-[#E6E5DC]/80 bg-[#FFFFFF]/60 backdrop-blur-[2px] shadow-[0_8px_32px_rgba(24,24,27,0.04)]"
                  style={{
                    transform: 'translateZ(-20px)',
                    backgroundImage:
                      'linear-gradient(to right, rgba(24,24,27,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(24,24,27,0.04) 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                  }}
                >
                  <div className="absolute top-2 left-2 text-[9px] font-mono text-[#7E7E88]">31.58° N, 71.54° E</div>
                  <div className="absolute bottom-2 right-2 text-[9px] font-mono text-[#7E7E88]">ARCH // 2026</div>
                </div>

                {/* Core Monolith */}
                <motion.div
                  animate={shouldReduceMotion ? {} : { y: [-5, 5, -5] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-2xl bg-[#FFFFFF] border border-[#18181B]/20 shadow-[0_12px_36px_rgba(24,24,27,0.08)] flex flex-col items-center justify-center p-3 text-center"
                  style={{ transform: 'translateZ(45px)' }}
                >
                  <span className="font-serif text-3xl font-semibold text-[#18181B] tracking-tight">
                    MR
                  </span>
                  <div className="w-8 h-[1px] bg-[#18181B]/20 my-1.5" />
                  <span className="text-[9px] font-mono tracking-widest text-[#57575E] uppercase">
                    ARCHITECT
                  </span>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* 3D View Switcher Controls (Modern Pill) */}
      <div className="mt-4 inline-flex items-center gap-1.5 p-1 rounded-full bg-[#FFFFFF] border border-[#E6E5DC] shadow-sm text-xs font-mono">
        <button
          onClick={() => handleModeToggle('portrait')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${
            mode === 'portrait'
              ? 'bg-[#18181B] text-[#F9F9F6] font-semibold shadow-xs'
              : 'text-[#57575E] hover:text-[#18181B]'
          }`}
        >
          <User className="w-3 h-3" />
          <span>Digital Identity</span>
        </button>

        <button
          onClick={() => handleModeToggle('spatial')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${
            mode === 'spatial'
              ? 'bg-[#18181B] text-[#F9F9F6] font-semibold shadow-xs'
              : 'text-[#57575E] hover:text-[#18181B]'
          }`}
        >
          <Box className="w-3 h-3" />
          <span>Spatial Core</span>
        </button>
      </div>
    </div>
  );
}
