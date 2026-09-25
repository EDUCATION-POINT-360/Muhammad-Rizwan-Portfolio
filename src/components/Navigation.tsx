import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu,
  X,
  Sparkles,
  ArrowUpRight,
  Sun,
  Moon,
  FileText,
  MessageSquare,
} from 'lucide-react';
import { soundFX } from '../utils/audio';
import { useTheme } from '../context/ThemeContext';
import { ASSETS } from '../assets/images';

interface NavigationProps {
  activeSection: string;
  ambientAtmosphere: boolean;
  onToggleAtmosphere: () => void;
  onOpenCvModal?: () => void;
}

const NAV_LINKS = [
  { name: 'About', href: '#about', id: 'about' },
  { name: 'Global Scope', href: '#international-career', id: 'international-career' },
  { name: 'Projects', href: '#projects', id: 'projects' },
  { name: 'Directory', href: '#project-directory', id: 'project-directory' },
  { name: 'Education Point', href: '#education-point', id: 'education-point' },
  { name: 'Founder', href: '#founder', id: 'founder' },
  { name: 'Skills', href: '#skills', id: 'skills' },
  { name: 'Education', href: '#education', id: 'education' },
  { name: 'CV & Credentials', href: '#cv', id: 'cv' },
  { name: 'Contact', href: '#contact', id: 'contact' },
];

export default function Navigation({
  activeSection,
  ambientAtmosphere,
  onToggleAtmosphere,
  onOpenCvModal,
}: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

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
          scrolled ? 'py-2.5 sm:py-3' : 'py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <nav
            aria-label="Main Navigation"
            className={`mx-auto flex items-center justify-between rounded-full px-3.5 sm:px-6 py-2 transition-all duration-300 ${
              isDark
                ? scrolled
                  ? 'bg-[#15151C]/92 backdrop-blur-xl border border-[#242432] shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
                  : 'bg-[#101016]/80 backdrop-blur-md border border-[#242432]/60'
                : scrolled
                ? 'bg-[#FFFFFF]/92 backdrop-blur-xl border border-[#E6E5DC] shadow-[0_8px_32px_rgba(24,24,27,0.06)]'
                : 'bg-[#FFFFFF]/75 backdrop-blur-md border border-[#E6E5DC]/80'
            }`}
          >
            {/* Left Brand Identity: Photo Avatar + Name */}
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className="flex items-center gap-2.5 group focus:outline-none"
            >
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-current/20 bg-[#18181B] flex-shrink-0 transition-transform duration-300 group-hover:scale-105 shadow-xs">
                <img
                  src={ASSETS.portrait}
                  alt="Muhammad Rizwan"
                  className="w-full h-full object-cover object-top"
                  loading="eager"
                />
              </div>

              <div className="flex flex-col text-left">
                <span
                  className={`text-xs font-serif font-bold tracking-tight transition-colors ${
                    isDark
                      ? 'text-[#F4F4F6] group-hover:text-emerald-400'
                      : 'text-[#18181B] group-hover:text-emerald-600'
                  }`}
                >
                  MUHAMMAD RIZWAN
                </span>
                <span
                  className={`text-[9px] sm:text-[10px] font-mono leading-none tracking-wider uppercase opacity-75 ${
                    isDark ? 'text-[#A6A6B4]' : 'text-[#7E7E88]'
                  }`}
                >
                  Founder • Digital Architect
                </span>
              </div>
            </a>

            {/* Center Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-0.5 xl:gap-1">
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
                        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                      />
                    )}
                    {link.name}
                  </a>
                );
              })}
            </div>

            {/* Right Controls: Theme Toggle + Atmosphere + Quick CTAs + Mobile Burger */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Dark / Light Theme Toggle Button */}
              <button
                id="theme-toggle-btn"
                onClick={toggleTheme}
                title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                aria-label="Toggle Dark and Light theme"
                className={`p-2 rounded-full border transition-all text-xs flex items-center justify-center active:scale-95 ${
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
                  onToggleAtmosphere();
                }}
                title={ambientAtmosphere ? 'Ambient particle field active' : 'Ambient particle field paused'}
                aria-label="Toggle ambient atmosphere particles"
                className={`p-2 rounded-full border transition-all text-xs flex items-center justify-center active:scale-95 ${
                  ambientAtmosphere
                    ? isDark
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                      : 'bg-[#18181B] text-[#F9F9F6] border-[#18181B]'
                    : isDark
                    ? 'bg-[#15151C] text-[#747482] border-[#242432] hover:text-[#F4F4F6]'
                    : 'bg-[#FFFFFF] text-[#57575E] border-[#E6E5DC] hover:text-[#18181B]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
              </button>

              {/* Desktop Let's Talk CTA */}
              <a
                id="nav-cta-talk"
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className={`hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 shadow-xs active:scale-95 ${
                  isDark
                    ? 'bg-[#F4F4F6] text-[#0C0C0F] hover:bg-[#E2E2E6]'
                    : 'bg-[#18181B] text-[#F9F9F6] hover:bg-[#333338]'
                }`}
              >
                <span>Let's Talk</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              {/* Mobile Menu Hamburger Button */}
              <button
                id="mobile-menu-toggle-btn"
                onClick={() => {
                  soundFX.playTick();
                  setMobileMenuOpen((prev) => !prev)}
                }
                aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
                className={`lg:hidden p-2 rounded-full border transition-all active:scale-95 ${
                  isDark
                    ? 'bg-[#15151C] text-[#F4F4F6] border-[#242432]'
                    : 'bg-[#FFFFFF] text-[#18181B] border-[#E6E5DC]'
                }`}
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Modern Lucid Mobile Menu Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-md lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ y: -20, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -20, opacity: 0, scale: 0.98 }}
              transition={{ type: 'spring', damping: 28, stiffness: 350 }}
              onClick={(e) => e.stopPropagation()}
              className={`absolute top-20 left-4 right-4 max-h-[82vh] overflow-y-auto rounded-3xl p-6 border shadow-2xl ${
                isDark
                  ? 'bg-[#121218]/98 border-[#2E2E3E] text-[#F4F4F6]'
                  : 'bg-[#FFFFFF]/98 border-[#E6E5DC] text-[#18181B]'
              }`}
            >
              <div className="flex items-center justify-between pb-4 border-b border-current/10 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-current/20">
                    <img
                      src={ASSETS.portrait}
                      alt="Muhammad Rizwan"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div>
                    <div className="font-serif font-bold text-sm">Muhammad Rizwan</div>
                    <div className="text-[10px] font-mono opacity-70">Navigation Directory</div>
                  </div>
                </div>

                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/5 opacity-70 hover:opacity-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links List */}
              <div className="space-y-1">
                {NAV_LINKS.map((link) => {
                  const isActive = activeSection === link.id;

                  return (
                    <a
                      key={link.id}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={`flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-medium transition-all ${
                        isActive
                          ? isDark
                            ? 'bg-emerald-500/15 text-emerald-400 font-semibold'
                            : 'bg-emerald-50 text-emerald-700 font-semibold'
                          : isDark
                          ? 'hover:bg-[#1C1C26] text-[#D0D0DA]'
                          : 'hover:bg-[#F3F3EB] text-[#333338]'
                      }`}
                    >
                      <span>{link.name}</span>
                      <ArrowUpRight className="w-4 h-4 opacity-50" />
                    </a>
                  );
                })}
              </div>

              {/* Quick Actions in Mobile Drawer */}
              <div className="mt-6 pt-5 border-t border-current/10 grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => {
                    soundFX.playTick();
                    setMobileMenuOpen(false);
                    if (onOpenCvModal) onOpenCvModal();
                  }}
                  className={`flex items-center justify-center gap-2 p-3 rounded-2xl border text-xs font-mono font-semibold transition-all ${
                    isDark
                      ? 'bg-[#1A1A24] border-[#303042] text-[#F4F4F6]'
                      : 'bg-[#F9F9F6] border-[#D4D3C7] text-[#18181B]'
                  }`}
                >
                  <FileText className="w-4 h-4 text-emerald-500" />
                  <span>View CV</span>
                </button>

                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-mono font-bold transition-all shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Contact</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
