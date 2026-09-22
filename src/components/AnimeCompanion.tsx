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
  UserCheck
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { soundFX } from '../utils/audio';

interface AnimeCompanionProps {
  animeAtmosphere: boolean;
  onToggleAnimeAtmosphere: () => void;
}

const COMPANION_AVATAR = '/src/assets/images/rizwan_anime_avatar_1790075294566.jpg';

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
              className="mb-3 max-w-[240px] p-3.5 rounded-2xl bg-[#FFFFFF] border border-[#18181B] shadow-[0_8px_24px_rgba(24,24,27,0.12)] text-xs text-[#18181B] flex items-start gap-2.5 relative cursor-pointer"
              onClick={handleToggleOpen}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#18181B] flex-shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <p className="font-serif italic leading-tight">
                  "Hi! Tap here for quick shortcuts & direct contact."
                </p>
                <div className="text-[9px] font-mono text-[#7E7E88]">PORTFOLIO CONCIERGE</div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setHasPrompted(false);
                }}
                className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#18181B] text-[#F9F9F6] flex items-center justify-center text-[9px]"
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
              className="mb-3 w-[310px] sm:w-[340px] rounded-3xl bg-[#FFFFFF]/95 backdrop-blur-xl border border-[#E6E5DC] shadow-[0_20px_50px_rgba(24,24,27,0.14)] p-5 overflow-hidden flex flex-col space-y-4"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#E6E5DC]">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-mono font-bold text-[#18181B] tracking-wider uppercase">
                    PORTFOLIO CONCIERGE
                  </span>
                </div>
                <button
                  onClick={handleToggleOpen}
                  className="p-1 rounded-full hover:bg-[#EFEFE8] text-[#57575E] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Founder Avatar & Dialogue Banner */}
              <div className="flex items-start gap-3 bg-[#F9F9F6] p-3.5 rounded-2xl border border-[#E6E5DC]">
                <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-[#D4D3C7] flex-shrink-0 shadow-sm">
                  <img
                    src={COMPANION_AVATAR}
                    alt="Muhammad Rizwan"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 inset-x-0 h-3 bg-gradient-to-t from-[#18181B]/40 to-transparent" />
                </div>

                <div className="flex-1 space-y-1">
                  <div className="text-[10px] font-mono text-[#7E7E88] flex items-center justify-between">
                    <span>FOUNDER ETHOS</span>
                    <button
                      onClick={handleNextDialogue}
                      className="text-[9px] text-[#18181B] underline font-semibold hover:text-[#57575E]"
                    >
                      Next ↻
                    </button>
                  </div>
                  <p
                    onClick={handleNextDialogue}
                    className="text-xs font-serif italic text-[#18181B] leading-snug cursor-pointer"
                  >
                    «{COMPANION_DIALOGUES[dialogueIndex]}»
                  </p>
                </div>
              </div>

              {/* Action CTA Buttons with Lucide Icons */}
              <div className="space-y-2 text-xs">
                <div className="text-[10px] font-mono text-[#7E7E88] uppercase tracking-wider mb-1">
                  QUICK DESTINATIONS
                </div>

                <button
                  onClick={() => scrollToSection('education-point')}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#F9F9F6] hover:bg-[#EFEFE8] border border-[#E6E5DC] transition-all text-left text-[#18181B] font-medium group active:scale-98"
                >
                  <span className="flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-[#18181B]" />
                    <span>Education Point Flagship</span>
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#7E7E88] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>

                <button
                  onClick={() => scrollToSection('projects')}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#F9F9F6] hover:bg-[#EFEFE8] border border-[#E6E5DC] transition-all text-left text-[#18181B] font-medium group active:scale-98"
                >
                  <span className="flex items-center gap-2">
                    <Code2 className="w-3.5 h-3.5 text-[#18181B]" />
                    <span>6 Curated Web Projects</span>
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#7E7E88] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>

                <a
                  href={PERSONAL_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#18181B] text-[#F9F9F6] hover:bg-[#333338] transition-all text-left font-semibold group shadow-sm active:scale-98"
                >
                  <span className="flex items-center gap-2">
                    <Send className="w-3.5 h-3.5 text-[#F9F9F6]" />
                    <span>WhatsApp Direct Message</span>
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#F9F9F6] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>

              {/* Toggles: Atmosphere FX & Audio */}
              <div className="pt-3 border-t border-[#E6E5DC] grid grid-cols-2 gap-2 text-[11px]">
                <button
                  onClick={onToggleAnimeAtmosphere}
                  className={`p-2 rounded-xl border flex items-center justify-center gap-1.5 transition-all ${
                    animeAtmosphere
                      ? 'bg-[#18181B] text-[#F9F9F6] border-[#18181B]'
                      : 'bg-[#FFFFFF] text-[#57575E] border-[#E6E5DC] hover:border-[#18181B]'
                  }`}
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Atmosphere FX</span>
                </button>

                <button
                  onClick={handleToggleSound}
                  className={`p-2 rounded-xl border flex items-center justify-center gap-1.5 transition-all ${
                    soundEnabled
                      ? 'bg-[#EFEFE8] text-[#18181B] border-[#D4D3C7]'
                      : 'bg-[#FFFFFF] text-[#7E7E88] border-[#E6E5DC]'
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
          className="relative group p-1.5 rounded-full bg-[#FFFFFF] border-2 border-[#18181B] shadow-[0_8px_24px_rgba(24,24,27,0.15)] flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#18181B]"
        >
          {/* Circular Avatar Thumbnail */}
          <div className="w-10 h-10 rounded-full overflow-hidden border border-[#D4D3C7] bg-[#F9F9F6] relative">
            <img
              src={COMPANION_AVATAR}
              alt="Muhammad Rizwan"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="hidden sm:flex flex-col text-left pr-3">
            <span className="text-[11px] font-bold text-[#18181B] leading-none">CONCIERGE</span>
            <span className="text-[9px] text-[#57575E] leading-tight mt-0.5">Quick Guide</span>
          </div>

          {/* Active Status Dot */}
          <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-[#FFFFFF] animate-pulse" />
        </motion.button>
      </div>
    </>
  );
}
