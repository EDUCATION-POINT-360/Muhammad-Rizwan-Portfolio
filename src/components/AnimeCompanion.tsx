import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  X,
  MessageSquare,
  ArrowUpRight,
  Volume2,
  VolumeX,
  Compass,
  Wand2,
  Check,
  ChevronUp,
  BookOpen,
  Code2,
  Send,
  UserCheck,
  Sun,
  Moon
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { soundFX } from '../utils/audio';
import { ASSETS } from '../assets/images';
import { useTheme } from '../context/ThemeContext';

interface AnimeCompanionProps {
  animeAtmosphere: boolean;
  onToggleAnimeAtmosphere: () => void;
}

const COMPANION_DIALOGUES = [
  "Welcome! I am Muhammad Rizwan. Ready to explore what we can build together?",
  "Education Point was founded with one goal: making academic resources accessible for every student.",
  "From ICS computer science to AI and web architecture, curiosity drives everything I create.",
  "Check out EP AI for intelligent tutoring and automated student assistance.",
  "Drop me a direct note on WhatsApp anytime — let's build something digital.",
];

export default function AnimeCompanion({
  animeAtmosphere,
  onToggleAnimeAtmosphere,
}: AnimeCompanionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [hasPrompted, setHasPrompted] = useState(false);
  const [portraitSrc, setPortraitSrc] = useState<string>(ASSETS.portrait);
  const [hasTriedRemote, setHasTriedRemote] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const handleImageError = () => {
    if (!hasTriedRemote && ASSETS.portraitRemote) {
      setHasTriedRemote(true);
      setPortraitSrc(ASSETS.portraitRemote);
    } else {
      setImageError(true);
    }
  };

  useEffect(() => {
    // Show a subtle greeting hint after 3 seconds on first load
    const timer = setTimeout(() => {
      setHasPrompted(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleNextDialogue = () => {
    soundFX.playTick();
    setDialogueIndex((prev) => (prev + 1) % COMPANION_DIALOGUES.length);
  };

  const handleToggleSound = () => {
    soundFX.enabled = !soundEnabled;
    setSoundEnabled(!soundEnabled);
    if (!soundEnabled) {
      soundFX.playChime();
    }
  };

  const handleToggleOpen = () => {
    if (!isOpen) {
      soundFX.playChime();
    } else {
      soundFX.playTick();
    }
    setIsOpen(!isOpen);
    setHasPrompted(false);
  };

  const scrollToSection = (id: string) => {
    soundFX.playTick();
    setIsOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Floating Widget Root in Bottom-Right Corner */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end pointer-events-auto">
        {/* Subtle Greeting Bubble Before Opening */}
        <AnimatePresence>
          {hasPrompted && !isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`mb-3 max-w-[250px] p-3.5 rounded-2xl border shadow-xl flex items-start gap-2.5 relative cursor-pointer ${
                isDark
                  ? 'bg-[#15151C] border-[#353548] text-[#F4F4F6]'
                  : 'bg-[#FFFFFF] border-[#18181B] text-[#18181B]'
              }`}
              onClick={handleToggleOpen}
            >
              <Sparkles className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 ${isDark ? 'text-amber-400' : 'text-[#18181B]'}`} />
              <div className="space-y-0.5">
                <p className="font-serif italic leading-tight text-xs">
                  "Hi! Tap here for quick shortcuts, theme switch & direct contact."
                </p>
                <div className={`text-[9px] font-mono ${isDark ? 'text-[#747482]' : 'text-[#7E7E88]'}`}>
                  PORTFOLIO CONCIERGE
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setHasPrompted(false);
                }}
                className={`absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full flex items-center justify-center text-[9px] ${
                  isDark ? 'bg-[#F4F4F6] text-[#0C0C0F]' : 'bg-[#18181B] text-[#F9F9F6]'
                }`}
              >
                ×
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Expanded Interactive HUD Card */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className={`mb-3 w-[310px] sm:w-[340px] rounded-3xl backdrop-blur-xl border shadow-2xl p-5 overflow-hidden flex flex-col space-y-4 ${
                isDark
                  ? 'bg-[#15151C]/95 border-[#242432] text-[#F4F4F6]'
                  : 'bg-[#FFFFFF]/95 border-[#E6E5DC] text-[#18181B]'
              }`}
            >
              {/* Header */}
              <div className={`flex items-center justify-between pb-3 border-b ${isDark ? 'border-[#242432]' : 'border-[#E6E5DC]'}`}>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-mono font-bold tracking-wider uppercase">
                    PORTFOLIO CONCIERGE
                  </span>
                </div>
                <button
                  onClick={handleToggleOpen}
                  className={`p-1 rounded-full transition-colors ${isDark ? 'hover:bg-[#242432] text-[#A6A6B4]' : 'hover:bg-[#EFEFE8] text-[#57575E]'}`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Founder Avatar & Dialogue Banner */}
              <div className={`flex items-start gap-3 p-3.5 rounded-2xl border ${
                isDark ? 'bg-[#101016] border-[#242432]' : 'bg-[#F9F9F6] border-[#E6E5DC]'
              }`}>
                <div className={`relative w-14 h-14 rounded-2xl overflow-hidden border flex-shrink-0 shadow-sm ${
                  isDark ? 'border-[#353548] bg-[#1D1D26]' : 'border-[#D4D3C7] bg-[#FFFFFF]'
                }`}>
                  {!imageError ? (
                    <img
                      src={portraitSrc}
                      alt={ASSETS.portraitAlt}
                      referrerPolicy="no-referrer"
                      onError={handleImageError}
                      className="w-full h-full object-cover object-[center_20%]"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-serif text-lg font-bold bg-[#18181B] text-white">
                      MR
                    </div>
                  )}
                  <div className="absolute bottom-0 inset-x-0 h-3 bg-gradient-to-t from-black/40 to-transparent" />
                </div>

                <div className="flex-1 space-y-1">
                  <div className={`text-[10px] font-mono flex items-center justify-between ${isDark ? 'text-[#747482]' : 'text-[#7E7E88]'}`}>
                    <span>FOUNDER ETHOS</span>
                    <button
                      onClick={handleNextDialogue}
                      className={`text-[9px] underline font-semibold transition-colors ${
                        isDark ? 'text-[#F4F4F6] hover:text-[#A6A6B4]' : 'text-[#18181B] hover:text-[#57575E]'
                      }`}
                    >
                      Next ↻
                    </button>
                  </div>
                  <p
                    onClick={handleNextDialogue}
                    className="text-xs font-serif italic leading-snug cursor-pointer"
                  >
                    «{COMPANION_DIALOGUES[dialogueIndex]}»
                  </p>
                </div>
              </div>

              {/* Action CTA Buttons with Lucide Icons */}
              <div className="space-y-2 text-xs">
                <div className={`text-[10px] font-mono uppercase tracking-wider mb-1 ${isDark ? 'text-[#747482]' : 'text-[#7E7E88]'}`}>
                  QUICK DESTINATIONS
                </div>

                <button
                  onClick={() => scrollToSection('education-point')}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border transition-all text-left font-medium group active:scale-98 ${
                    isDark
                      ? 'bg-[#101016] hover:bg-[#1D1D26] border-[#242432] text-[#F4F4F6]'
                      : 'bg-[#F9F9F6] hover:bg-[#EFEFE8] border-[#E6E5DC] text-[#18181B]'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Education Point Flagship</span>
                  </span>
                  <ArrowUpRight className={`w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform ${isDark ? 'text-[#747482]' : 'text-[#7E7E88]'}`} />
                </button>

                <button
                  onClick={() => scrollToSection('projects')}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border transition-all text-left font-medium group active:scale-98 ${
                    isDark
                      ? 'bg-[#101016] hover:bg-[#1D1D26] border-[#242432] text-[#F4F4F6]'
                      : 'bg-[#F9F9F6] hover:bg-[#EFEFE8] border-[#E6E5DC] text-[#18181B]'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Code2 className="w-3.5 h-3.5" />
                    <span>6 Curated Web Projects</span>
                  </span>
                  <ArrowUpRight className={`w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform ${isDark ? 'text-[#747482]' : 'text-[#7E7E88]'}`} />
                </button>

                <a
                  href={PERSONAL_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all text-left font-semibold group shadow-sm active:scale-98 ${
                    isDark
                      ? 'bg-[#F4F4F6] text-[#0C0C0F] hover:bg-[#E2E2E6]'
                      : 'bg-[#18181B] text-[#F9F9F6] hover:bg-[#333338]'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Send className="w-3.5 h-3.5" />
                    <span>WhatsApp Direct Message</span>
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>

              {/* Toggles: Theme Toggle (Dark/Light), Atmosphere FX & Audio */}
              <div className={`pt-3 border-t grid grid-cols-3 gap-1.5 text-[11px] ${isDark ? 'border-[#242432]' : 'border-[#E6E5DC]'}`}>
                {/* Theme Switcher Button */}
                <button
                  onClick={toggleTheme}
                  title="Toggle Dark / Light theme"
                  className={`p-2 rounded-xl border flex items-center justify-center gap-1 transition-all ${
                    isDark
                      ? 'bg-[#1D1D26] text-amber-300 border-[#353548]'
                      : 'bg-[#FFFFFF] text-[#18181B] border-[#E6E5DC] hover:border-[#18181B]'
                  }`}
                >
                  {isDark ? <Sun className="w-3 h-3" /> : <Moon className="w-3 h-3" />}
                  <span>{isDark ? 'Light' : 'Dark'}</span>
                </button>

                <button
                  onClick={onToggleAnimeAtmosphere}
                  className={`p-2 rounded-xl border flex items-center justify-center gap-1 transition-all ${
                    animeAtmosphere
                      ? isDark ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' : 'bg-[#18181B] text-[#F9F9F6] border-[#18181B]'
                      : isDark ? 'bg-[#101016] text-[#747482] border-[#242432]' : 'bg-[#FFFFFF] text-[#57575E] border-[#E6E5DC]'
                  }`}
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Atmosphere</span>
                </button>

                <button
                  onClick={handleToggleSound}
                  className={`p-2 rounded-xl border flex items-center justify-center gap-1 transition-all ${
                    soundEnabled
                      ? isDark ? 'bg-[#1D1D26] text-[#F4F4F6] border-[#353548]' : 'bg-[#EFEFE8] text-[#18181B] border-[#D4D3C7]'
                      : isDark ? 'bg-[#101016] text-[#747482] border-[#242432]' : 'bg-[#FFFFFF] text-[#7E7E88] border-[#E6E5DC]'
                  }`}
                >
                  {soundEnabled ? <Volume2 className="w-3 h-3" /> : <VolumeX className="w-3 h-3" />}
                  <span>{soundEnabled ? 'Audio ON' : 'Audio OFF'}</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Trigger Button */}
        <motion.button
          id="portfolio-concierge-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleToggleOpen}
          aria-label="Open Portfolio Concierge"
          className={`relative group p-1.5 rounded-full border-2 shadow-2xl flex items-center gap-2 focus:outline-none transition-colors ${
            isDark
              ? 'bg-[#15151C] border-emerald-500/60 shadow-black'
              : 'bg-[#FFFFFF] border-[#18181B]'
          }`}
        >
          {/* Circular Real Portrait Thumbnail */}
          <div className="w-10 h-10 rounded-full overflow-hidden border border-[#D4D3C7] bg-[#18181B] relative">
            {!imageError ? (
              <img
                src={portraitSrc}
                alt={ASSETS.portraitAlt}
                referrerPolicy="no-referrer"
                onError={handleImageError}
                className="w-full h-full object-cover object-[center_20%]"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center font-serif text-xs font-bold text-white">
                MR
              </div>
            )}
          </div>

          <div className="hidden sm:flex flex-col text-left pr-3">
            <span className={`text-[11px] font-bold leading-none ${isDark ? 'text-[#F4F4F6]' : 'text-[#18181B]'}`}>CONCIERGE</span>
            <span className={`text-[9px] leading-tight mt-0.5 ${isDark ? 'text-[#A6A6B4]' : 'text-[#57575E]'}`}>Quick Guide</span>
          </div>

          {/* Active Status Dot */}
          <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-[#FFFFFF] animate-pulse" />
        </motion.button>
      </div>
    </>
  );
}
