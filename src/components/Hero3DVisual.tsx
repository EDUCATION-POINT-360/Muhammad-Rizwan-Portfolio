import { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'motion/react';
import { Sparkles, Terminal, Layers, User, Box, MessageCircle, ArrowUpRight, Compass, ShieldCheck, Sun, Moon } from 'lucide-react';
import { soundFX } from '../utils/audio';
import { ASSETS } from '../assets/images';
import { useTheme } from '../context/ThemeContext';

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
  const [mode, setMode] = useState<'portrait' | 'avatar3d' | 'spatial'>('portrait');
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [showSpeech, setShowSpeech] = useState(true);
  const [portraitSrc, setPortraitSrc] = useState<string>(ASSETS.portrait);
  const [hasTriedRemote, setHasTriedRemote] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(true);
  const shouldReduceMotion = useReducedMotion();
  const { isDark } = useTheme();

  const handleImageError = () => {
    if (!hasTriedRemote && ASSETS.portraitRemote) {
      setHasTriedRemote(true);
      setPortraitSrc(ASSETS.portraitRemote);
    } else {
      setImageLoaded(false);
    }
  };

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

  const handleModeToggle = (newMode: 'portrait' | 'avatar3d' | 'spatial') => {
    soundFX.playChime();
    setMode(newMode);
  };

  // 3D rotation values
  const rotateX = shouldReduceMotion ? 0 : isHovered ? -mousePos.y * 16 : 0;
  const rotateY = shouldReduceMotion ? 0 : isHovered ? mousePos.x * 16 : 0;

  return (
    <div className="flex flex-col items-center w-full">
      {/* 3D Visual Stage */}
      <div
        ref={containerRef}
        id="hero-3d-stage"
        className="relative w-full max-w-[340px] sm:max-w-[420px] aspect-square mx-auto flex items-center justify-center perspective-1000 select-none touch-pan-y"
      >
        {/* Ambient Depth Glow (adapts to light/dark) */}
        <div
          className={`absolute inset-4 sm:inset-8 rounded-full blur-3xl -z-10 pointer-events-none transition-all duration-500 ${
            isDark
              ? 'bg-gradient-to-br from-indigo-500/15 via-emerald-500/10 to-transparent'
              : 'bg-gradient-to-br from-[#EAEAE0]/80 via-[#F3F3EC]/50 to-transparent'
          }`}
        />

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
            className={`absolute w-64 h-64 sm:w-76 sm:h-76 rounded-full border border-dashed ${
              isDark ? 'border-[#353548]' : 'border-[#D4D3C7]'
            }`}
            style={{ transform: 'translateZ(-30px)' }}
          >
            <div className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full shadow-sm ${isDark ? 'bg-emerald-400' : 'bg-[#18181B]'}`} />
            <div className={`absolute bottom-6 right-10 w-2 h-2 rounded-full ${isDark ? 'bg-[#737380]' : 'bg-[#7E7E88]'}`} />
          </motion.div>

          {/* Counter-orbital Ring (Z-depth: 10px) */}
          <motion.div
            animate={shouldReduceMotion ? {} : { rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className={`absolute w-52 h-52 sm:w-60 sm:h-60 rounded-full border ${
              isDark ? 'border-[#242432]' : 'border-[#E6E5DC]'
            }`}
            style={{ transform: 'translateZ(10px) rotateX(30deg)' }}
          >
            <div className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 rounded-full ${isDark ? 'bg-[#F4F4F6]' : 'bg-[#18181B]'}`} />
          </motion.div>

          <AnimatePresence mode="wait">
            {mode === 'portrait' && (
              /* ================= REAL PORTRAIT VIEW ================= */
              <motion.div
                key="portrait-view"
                initial={{ opacity: 0, scale: 0.9, rotateY: -20 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.9, rotateY: 20 }}
                transition={{ duration: 0.4 }}
                className="relative w-64 h-[300px] sm:w-72 sm:h-[340px] preserve-3d flex items-center justify-center"
              >
                {/* Ambient Backlight Glow */}
                <div
                  className={`absolute -inset-4 rounded-[36px] blur-2xl opacity-40 transition-opacity duration-500 pointer-events-none ${
                    isDark
                      ? 'bg-gradient-to-tr from-emerald-500/25 via-indigo-500/20 to-teal-400/20'
                      : 'bg-gradient-to-tr from-emerald-500/15 via-zinc-300/40 to-amber-200/20'
                  } ${isHovered ? 'opacity-80 scale-105' : 'opacity-40'}`}
                  style={{ transform: 'translateZ(-20px)' }}
                />

                {/* Real Founder Portrait Frame */}
                <div
                  className={`relative w-full h-full rounded-[26px] overflow-hidden border-2 shadow-[0_20px_50px_rgba(0,0,0,0.18)] group/avatar cursor-pointer transition-all duration-300 ${
                    isDark ? 'border-[#353548] bg-[#15151C]' : 'border-[#18181B]/15 bg-[#FFFFFF]'
                  }`}
                  style={{ transform: 'translateZ(26px)' }}
                  onClick={handleNextQuote}
                  title="Click to view digital ethos statement"
                >
                  {imageLoaded ? (
                    <img
                      src={portraitSrc}
                      alt={ASSETS.portraitAlt}
                      referrerPolicy="no-referrer"
                      onError={handleImageError}
                      className="w-full h-full object-cover object-[center_20%] transition-transform duration-700 ease-out group-hover/avatar:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#18181B] to-[#333338] flex flex-col items-center justify-center text-center p-4">
                      <span className="text-4xl font-serif font-bold text-[#F9F9F6]">MR</span>
                      <span className="text-xs font-mono text-emerald-400 mt-2">Muhammad Rizwan</span>
                    </div>
                  )}

                  {/* Gradient sheen overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent pointer-events-none" />

                  {/* Specular glare overlay tracking mouse */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-30 mix-blend-overlay transition-opacity duration-300 group-hover/avatar:opacity-60"
                    style={{
                      background: `radial-gradient(circle at ${(mousePos.x + 0.5) * 100}% ${(mousePos.y + 0.5) * 100}%, rgba(255,255,255,0.45) 0%, transparent 60%)`,
                    }}
                  />

                  {/* Top-Right Active Status Indicator */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full backdrop-blur-md bg-black/50 border border-white/20 text-[10px] font-mono text-white flex items-center gap-1.5 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="tracking-widest uppercase">ACTIVE</span>
                  </div>

                  {/* Bottom Identity Tag */}
                  <div
                    className={`absolute bottom-3 inset-x-3 px-3.5 py-2 rounded-2xl backdrop-blur-md border flex items-center justify-between text-[11px] font-mono shadow-md ${
                      isDark
                        ? 'bg-[#15151C]/90 border-[#353548] text-[#F4F4F6]'
                        : 'bg-[#F9F9F6]/95 border-[#E6E5DC] text-[#18181B]'
                    }`}
                  >
                    <div>
                      <div className="font-bold leading-tight truncate">MUHAMMAD RIZWAN</div>
                      <div className="text-[9px] opacity-75">Founder • Digital Architect</div>
                    </div>
                    <span className="text-emerald-500 font-semibold text-[10px] uppercase tracking-wider flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                      2026
                    </span>
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
                      className={`absolute -top-12 sm:-top-14 left-1/2 -translate-x-1/2 px-3.5 py-2 rounded-2xl border shadow-[0_10px_25px_rgba(0,0,0,0.18)] cursor-pointer transition-colors whitespace-nowrap z-20 flex items-center gap-1.5 text-xs font-serif italic ${
                        isDark
                          ? 'bg-[#15151C] border-[#353548] text-[#F4F4F6] hover:bg-[#1D1D26]'
                          : 'bg-[#FFFFFF] border-[#18181B] text-[#18181B] hover:bg-[#F9F9F6]'
                      }`}
                      style={{ transform: 'translateZ(70px) translateX(-50%)' }}
                    >
                      <MessageCircle className="w-3.5 h-3.5 flex-shrink-0 not-italic" />
                      <span>"{QUOTES[quoteIndex]}"</span>
                      <span className={`text-[9px] font-mono not-italic px-1.5 py-0.5 rounded-full ml-1 ${isDark ? 'bg-[#242432] text-[#A6A6B4]' : 'bg-[#EFEFE8] text-[#7E7E88]'}`}>
                        click
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Floating Holographic Badge 1: Education Point */}
                <motion.div
                  animate={shouldReduceMotion ? {} : { y: [-3, 3, -3] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className={`absolute -bottom-4 -left-6 px-3 py-1.5 rounded-xl border shadow-[0_8px_20px_rgba(0,0,0,0.1)] flex items-center gap-2 ${
                    isDark ? 'bg-[#15151C] border-[#353548]' : 'bg-[#FFFFFF] border-[#E6E5DC]'
                  }`}
                  style={{ transform: 'translateZ(60px)' }}
                >
                  <div className={`w-5 h-5 rounded-lg flex items-center justify-center ${isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-[#18181B] text-[#F9F9F6]'}`}>
                    <Layers className="w-3 h-3" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className={`text-[10px] font-bold leading-none ${isDark ? 'text-[#F4F4F6]' : 'text-[#18181B]'}`}>Education Point</span>
                    <span className={`text-[8px] leading-tight ${isDark ? 'text-[#747482]' : 'text-[#7E7E88]'}`}>Flagship Portal</span>
                  </div>
                </motion.div>

                {/* Floating Holographic Badge 2: Tech Architect */}
                <motion.div
                  animate={shouldReduceMotion ? {} : { y: [3, -3, 3] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  className={`absolute -bottom-3 -right-6 px-3 py-1.5 rounded-xl border shadow-[0_8px_20px_rgba(0,0,0,0.1)] flex items-center gap-2 ${
                    isDark ? 'bg-[#15151C] border-[#353548]' : 'bg-[#FFFFFF] border-[#E6E5DC]'
                  }`}
                  style={{ transform: 'translateZ(65px)' }}
                >
                  <div className={`w-5 h-5 rounded-lg flex items-center justify-center ${isDark ? 'bg-[#242432] text-amber-400' : 'bg-[#EFEFE8] text-[#18181B]'}`}>
                    <Sparkles className="w-3 h-3" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className={`text-[10px] font-bold leading-none ${isDark ? 'text-[#F4F4F6]' : 'text-[#18181B]'}`}>Digital Architect</span>
                    <span className={`text-[8px] leading-tight ${isDark ? 'text-[#747482]' : 'text-[#7E7E88]'}`}>Web & AI Systems</span>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {mode === 'avatar3d' && (
              /* ================= 3D HOLOGRAPHIC CHARACTER VIEW ================= */
              <motion.div
                key="avatar3d-view"
                initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.9, rotateY: -20 }}
                transition={{ duration: 0.4 }}
                className="relative w-56 h-56 sm:w-64 sm:h-64 preserve-3d flex items-center justify-center"
              >
                {/* 3D Holographic Chamber */}
                <div
                  className={`relative w-full h-full rounded-3xl border-2 flex flex-col items-center justify-center overflow-hidden shadow-2xl ${
                    isDark
                      ? 'border-emerald-500/40 bg-gradient-to-b from-[#15151C] via-[#101016] to-[#0C0C0F]'
                      : 'border-[#18181B]/20 bg-gradient-to-b from-[#FFFFFF] via-[#F4F4EE] to-[#EAEAE0]'
                  }`}
                  style={{ transform: 'translateZ(25px)' }}
                >
                  {/* Energy grid in background */}
                  <div
                    className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{
                      backgroundImage: isDark
                        ? 'linear-gradient(to right, rgba(16, 185, 129, 0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(16, 185, 129, 0.2) 1px, transparent 1px)'
                        : 'linear-gradient(to right, rgba(24, 24, 27, 0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(24, 24, 27, 0.15) 1px, transparent 1px)',
                      backgroundSize: '16px 16px',
                    }}
                  />

                  {/* Animated Hologram Character Figure */}
                  <motion.div
                    animate={shouldReduceMotion ? {} : { y: [-6, 6, -6], rotateZ: [-2, 2, -2] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="relative z-10 flex flex-col items-center"
                  >
                    {/* Head Core */}
                    <div className="relative">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg border ${
                        isDark ? 'bg-gradient-to-br from-emerald-500 to-teal-700 text-white border-emerald-400/50' : 'bg-gradient-to-br from-[#18181B] to-[#333338] text-white border-[#18181B]'
                      }`}>
                        <span className="font-serif text-2xl font-bold tracking-tight">MR</span>
                      </div>
                      <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-emerald-500 animate-ping" />
                      <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400" />
                    </div>

                    {/* Torso & Nodes */}
                    <div className="mt-3 flex items-center gap-2">
                      <div className={`h-1.5 w-8 rounded-full ${isDark ? 'bg-emerald-400/60' : 'bg-[#18181B]/60'}`} />
                      <div className={`h-2.5 w-2.5 rounded-full ${isDark ? 'bg-emerald-400' : 'bg-[#18181B]'}`} />
                      <div className={`h-1.5 w-8 rounded-full ${isDark ? 'bg-emerald-400/60' : 'bg-[#18181B]/60'}`} />
                    </div>

                    <div className="mt-2 text-center">
                      <div className={`text-xs font-mono font-bold tracking-wider uppercase ${isDark ? 'text-[#F4F4F6]' : 'text-[#18181B]'}`}>
                        MUHAMMAD RIZWAN
                      </div>
                      <div className="text-[10px] font-mono text-emerald-500 font-semibold">
                        3D SPATIAL AVATAR
                      </div>
                    </div>
                  </motion.div>

                  {/* Pulsing Light Bar at Bottom */}
                  <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
                </div>
              </motion.div>
            )}

            {mode === 'spatial' && (
              /* ================= SPATIAL ARCHITECTURE VIEW ================= */
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
                  className={`absolute inset-0 rounded-3xl border shadow-[0_8px_32px_rgba(0,0,0,0.06)] ${
                    isDark ? 'border-[#353548] bg-[#15151C]/80' : 'border-[#E6E5DC]/80 bg-[#FFFFFF]/60'
                  }`}
                  style={{
                    transform: 'translateZ(-20px)',
                    backgroundImage: isDark
                      ? 'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)'
                      : 'linear-gradient(to right, rgba(24,24,27,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(24,24,27,0.04) 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                  }}
                >
                  <div className={`absolute top-2.5 left-2.5 text-[9px] font-mono ${isDark ? 'text-[#747482]' : 'text-[#7E7E88]'}`}>31.58° N, 71.54° E</div>
                  <div className={`absolute bottom-2.5 right-2.5 text-[9px] font-mono ${isDark ? 'text-[#747482]' : 'text-[#7E7E88]'}`}>ARCH // 2026</div>
                </div>

                {/* Core Monolith */}
                <motion.div
                  animate={shouldReduceMotion ? {} : { y: [-5, 5, -5] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  className={`relative w-32 h-32 sm:w-36 sm:h-36 rounded-2xl border shadow-[0_12px_36px_rgba(0,0,0,0.12)] flex flex-col items-center justify-center p-3 text-center ${
                    isDark ? 'bg-[#15151C] border-[#353548]' : 'bg-[#FFFFFF] border-[#18181B]/20'
                  }`}
                  style={{ transform: 'translateZ(45px)' }}
                >
                  <span className={`font-serif text-3xl font-semibold tracking-tight ${isDark ? 'text-[#F4F4F6]' : 'text-[#18181B]'}`}>
                    MR
                  </span>
                  <div className={`w-8 h-[1px] my-1.5 ${isDark ? 'bg-[#353548]' : 'bg-[#18181B]/20'}`} />
                  <span className={`text-[9px] font-mono tracking-widest uppercase ${isDark ? 'text-[#A6A6B4]' : 'text-[#57575E]'}`}>
                    ARCHITECT
                  </span>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* 3D View Switcher Controls (Modern Pill with 3 options) */}
      <div
        className={`mt-4 inline-flex items-center gap-1.5 p-1 rounded-full border shadow-sm text-xs font-mono transition-colors ${
          isDark ? 'bg-[#15151C] border-[#242432]' : 'bg-[#FFFFFF] border-[#E6E5DC]'
        }`}
      >
        <button
          onClick={() => handleModeToggle('portrait')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${
            mode === 'portrait'
              ? isDark ? 'bg-[#F4F4F6] text-[#0C0C0F] font-semibold shadow-xs' : 'bg-[#18181B] text-[#F9F9F6] font-semibold shadow-xs'
              : isDark ? 'text-[#A6A6B4] hover:text-[#F4F4F6]' : 'text-[#57575E] hover:text-[#18181B]'
          }`}
        >
          <User className="w-3 h-3" />
          <span>Real Portrait</span>
        </button>

        <button
          onClick={() => handleModeToggle('avatar3d')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${
            mode === 'avatar3d'
              ? isDark ? 'bg-[#F4F4F6] text-[#0C0C0F] font-semibold shadow-xs' : 'bg-[#18181B] text-[#F9F9F6] font-semibold shadow-xs'
              : isDark ? 'text-[#A6A6B4] hover:text-[#F4F4F6]' : 'text-[#57575E] hover:text-[#18181B]'
          }`}
        >
          <Sparkles className="w-3 h-3" />
          <span>3D Avatar</span>
        </button>

        <button
          onClick={() => handleModeToggle('spatial')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${
            mode === 'spatial'
              ? isDark ? 'bg-[#F4F4F6] text-[#0C0C0F] font-semibold shadow-xs' : 'bg-[#18181B] text-[#F9F9F6] font-semibold shadow-xs'
              : isDark ? 'text-[#A6A6B4] hover:text-[#F4F4F6]' : 'text-[#57575E] hover:text-[#18181B]'
          }`}
        >
          <Box className="w-3 h-3" />
          <span>Spatial Core</span>
        </button>
      </div>
    </div>
  );
}
