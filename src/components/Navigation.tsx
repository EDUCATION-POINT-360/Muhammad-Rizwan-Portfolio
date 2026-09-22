import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu,
  X,
  Sparkles,
  ArrowUpRight,
  Sun,
  Moon,
  Laptop,
  GraduationCap,
  Layers,
  Code2,
  Mail,
  User,
  Heart,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { soundFX } from '../utils/audio';
import { useTheme } from '../context/ThemeContext';
import { ASSETS } from '../assets/images';

interface NavigationProps {
  activeSection: string;
  animeAtmosphere: boolean;
  onToggleAnimeAtmosphere: () => void;
}

const NAV_LINKS = [
  { name: 'About', href: '#about', id: 'about' },
  { name: 'Education', href: '#education', id: 'education' },
  { name: 'Journey', href: '#journey', id: 'journey' },
  { name: 'Education Point', href: '#education-point', id: 'education-point' },
  { name: 'Projects', href: '#projects', id: 'projects' },
  { name: 'Skills', href: '#skills', id: 'skills' },
  { name: 'Interests', href: '#interests', id: 'interests' },
  { name: 'Contact', href: '#contact', id: 'contact' },
];

export default function Navigation({
  activeSection,
  animeAtmosphere,
  onToggleAnimeAtmosphere,
}: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    soundFX.playTick();
    setMobileMenuOpen(false);

    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav
            aria-label="Main Navigation"
            className={`mx-auto flex items-center justify-between rounded-full px-4 sm:px-6 py-2.5 transition-all duration-300 ${
              isDark
                ? scrolled
                  ? 'bg-[#15151C]/90 backdrop-blur-xl border border-[#242432] shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
                  : 'bg-[#101016]/80 backdrop-blur-md border border-[#242432]/60'
                : scrolled
                ? 'bg-[#FFFFFF]/90 backdrop-blur-xl border border-[#E6E5DC] shadow-[0_8px_32px_rgba(24,24,27,0.06)]'
                : 'bg-[#FFFFFF]/75 backdrop-blur-md border border-[#E6E5DC]/80'
            }`}
          >
            {/* Left Brand Identity: Photo Avatar + Name */}
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className="flex items-center gap-2.5 group focus:outline-none"
            >
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#18181B]/20 bg-[#18181B] flex-shrink-0 transition-transform duration-300 group-hover:scale-105 shadow-xs">
                <img
                  src={ASSETS.portrait}
                  alt="Muhammad Rizwan"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = ASSETS.portraitRemote;
                  }}
                  className="w-full h-full object-cover object-[center_20%]"
                />
              </div>
              <div className="flex flex-col text-left">
                <span
                  className={`text-xs font-bold tracking-tight leading-none transition-colors ${
                    isDark ? 'text-[#F4F4F6] group-hover:text-emerald-400' : 'text-[#18181B] group-hover:text-[#57575E]'
                  }`}
                >
                  MUHAMMAD RIZWAN
                </span>
                <span
                  className={`text-[9px] font-mono tracking-wider leading-tight mt-0.5 ${
                    isDark ? 'text-[#747482]' : 'text-[#7E7E88]'
                  }`}
                >
                  FOUNDER • ARCHITECT
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.id;

                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`relative px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                      isActive
                        ? isDark
                          ? 'text-[#F4F4F6] font-semibold'
                          : 'text-[#18181B] font-semibold'
                        : isDark
                        ? 'text-[#A6A6B4] hover:text-[#F4F4F6]'
                        : 'text-[#57575E] hover:text-[#18181B]'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activeNavIndicator"
                        className={`absolute inset-0 rounded-full -z-10 ${
                          isDark ? 'bg-[#242432]' : 'bg-[#EFEFE8]'
                        }`}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    {link.name}
                  </a>
                );
              })}
            </div>

            {/* Right Controls: Theme Toggle + Atmosphere + CTA + Mobile Toggle */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* Dark / Light Theme Toggle Button */}
              <button
                id="theme-toggle-btn"
                onClick={toggleTheme}
                title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                aria-label="Toggle Dark and Light theme"
                className={`p-2 rounded-full border transition-all text-xs flex items-center justify-center ${
                  isDark
                    ? 'bg-[#1D1D26] text-amber-300 border-[#353548] hover:bg-[#242432]'
                    : 'bg-[#FFFFFF] text-[#18181B] border-[#E6E5DC] hover:bg-[#F4F4EE]'
                }`}
              >
                {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
              </button>

              {/* Atmosphere Quick Toggle Button */}
              <button
                onClick={() => {
                  soundFX.playChime();
                  onToggleAnimeAtmosphere();
                }}
                title={animeAtmosphere ? 'Disable Atmospheric Particles' : 'Enable Atmospheric Particles'}
                className={`p-2 rounded-full border transition-all text-xs flex items-center gap-1.5 ${
                  animeAtmosphere
                    ? isDark
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                      : 'bg-[#18181B] text-[#F9F9F6] border-[#18181B]'
                    : isDark
                    ? 'bg-[#15151C] text-[#747482] border-[#242432] hover:text-[#F4F4F6]'
                    : 'bg-[#FFFFFF] text-[#57575E] border-[#E6E5DC] hover:text-[#18181B]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span className="hidden xl:inline text-[10px] font-mono font-medium">
                  {animeAtmosphere ? 'Atmosphere: ON' : 'Atmosphere FX'}
                </span>
              </button>

              <a
                id="nav-cta-talk"
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className={`hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 shadow-sm active:scale-95 ${
                  isDark
                    ? 'bg-[#F4F4F6] text-[#0C0C0F] hover:bg-[#E2E2E6]'
                    : 'bg-[#18181B] text-[#F9F9F6] hover:bg-[#333338]'
                }`}
              >
                <span>Let's Talk</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              {/* Mobile Menu Toggle Button */}
              <button
                id="mobile-menu-toggle"
                onClick={() => {
                  soundFX.playTick();
                  setMobileMenuOpen(!mobileMenuOpen);
                }}
                aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
                className={`lg:hidden p-2 rounded-full transition-colors ${
                  isDark ? 'text-[#F4F4F6] hover:bg-[#242432]' : 'text-[#18181B] hover:bg-[#EFEFE8]'
                }`}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Drawer Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className={`fixed inset-x-4 top-20 z-50 p-6 rounded-3xl backdrop-blur-2xl border shadow-2xl lg:hidden flex flex-col space-y-4 ${
              isDark
                ? 'bg-[#15151C]/98 border-[#242432] text-[#F4F4F6]'
                : 'bg-[#FFFFFF]/98 border-[#E6E5DC] text-[#18181B]'
            }`}
          >
            <div className={`flex items-center justify-between pb-3 border-b ${isDark ? 'border-[#242432]' : 'border-[#E6E5DC]'}`}>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full overflow-hidden border border-[#D4D3C7] dark:border-[#353548] bg-[#18181B] flex-shrink-0">
                  <img
                    src={ASSETS.portrait}
                    alt="Muhammad Rizwan"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = ASSETS.portraitRemote;
                    }}
                    className="w-full h-full object-cover object-[center_20%]"
                  />
                </div>
                <div>
                  <div className={`text-xs font-bold font-serif leading-tight ${isDark ? 'text-[#F4F4F6]' : 'text-[#18181B]'}`}>
                    Muhammad Rizwan
                  </div>
                  <div className={`text-[9px] font-mono ${isDark ? 'text-[#747482]' : 'text-[#7E7E88]'}`}>
                    Founder & Digital Architect
                  </div>
                </div>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className={`p-1.5 rounded-full transition-colors ${
                  isDark ? 'hover:bg-[#242432] text-[#A6A6B4]' : 'hover:bg-[#EFEFE8] text-[#57575E]'
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-col space-y-1">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.id;

                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? isDark
                          ? 'bg-[#242432] text-[#F4F4F6]'
                          : 'bg-[#18181B] text-[#F9F9F6]'
                        : isDark
                        ? 'text-[#A6A6B4] hover:bg-[#1D1D26]'
                        : 'text-[#18181B] hover:bg-[#EFEFE8]'
                    }`}
                  >
                    <span>{link.name}</span>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
                  </a>
                );
              })}
            </div>

            <div className={`pt-4 border-t flex flex-col gap-2 ${isDark ? 'border-[#242432]' : 'border-[#E6E5DC]'}`}>
              {/* Theme toggle in mobile menu */}
              <button
                onClick={toggleTheme}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl border text-xs font-semibold ${
                  isDark
                    ? 'bg-[#1D1D26] border-[#353548] text-amber-300'
                    : 'bg-[#FFFFFF] border-[#D4D3C7] text-[#18181B]'
                }`}
              >
                <span className="flex items-center gap-2">
                  {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  <span>Theme: {isDark ? 'Dark Mode' : 'Light Mode'}</span>
                </span>
                <span className="font-mono text-[10px] uppercase">Toggle ↻</span>
              </button>

              <button
                onClick={() => {
                  soundFX.playChime();
                  onToggleAnimeAtmosphere();
                }}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl border text-xs font-semibold ${
                  isDark
                    ? 'bg-[#101016] border-[#242432] text-[#F4F4F6]'
                    : 'bg-[#FFFFFF] border-[#D4D3C7] text-[#18181B]'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Atmospheric Particles</span>
                </span>
                <span className="font-mono text-[10px]">
                  {animeAtmosphere ? 'ACTIVE' : 'OFF'}
                </span>
              </button>

              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold tracking-wide shadow-sm ${
                  isDark
                    ? 'bg-[#F4F4F6] text-[#0C0C0F]'
                    : 'bg-[#18181B] text-[#F9F9F6]'
                }`}
              >
                <span>Let's Talk</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href={PERSONAL_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-medium transition-colors ${
                  isDark
                    ? 'bg-[#1D1D26] text-[#A6A6B4] hover:text-[#F4F4F6]'
                    : 'bg-[#EFEFE8] text-[#18181B] hover:bg-[#E6E5DC]'
                }`}
              >
                <span>Chat on WhatsApp ({PERSONAL_INFO.phone})</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
