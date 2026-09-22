import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { soundFX } from '../utils/audio';

interface NavigationProps {
  activeSection: string;
  animeAtmosphere: boolean;
  onToggleAnimeAtmosphere: () => void;
}

const NAV_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Journey', href: '#journey' },
  { name: 'Education Point', href: '#education-point' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Interests', href: '#interests' },
  { name: 'Contact', href: '#contact' },
];

export default function Navigation({
  activeSection,
  animeAtmosphere,
  onToggleAnimeAtmosphere,
}: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    soundFX.playTick();
    setMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        id="main-navigation"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav
            aria-label="Main Navigation"
            className={`flex items-center justify-between px-4 sm:px-6 py-2.5 rounded-full transition-all duration-300 ${
              isScrolled
                ? 'bg-[#F9F9F6]/90 backdrop-blur-md shadow-[0_4px_24px_rgba(24,24,27,0.06)] border border-[#E6E5DC]'
                : 'bg-[#F9F9F6]/70 backdrop-blur-sm border border-transparent'
            }`}
          >
            {/* Logo Mark */}
            <a
              id="nav-logo"
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#18181B] rounded-full"
            >
              <span className="w-9 h-9 rounded-full bg-[#18181B] text-[#F9F9F6] flex items-center justify-center font-serif text-lg font-medium transition-transform duration-300 group-hover:scale-105 shadow-sm">
                MR
              </span>
              <div className="hidden sm:flex flex-col">
                <span className="text-xs font-semibold tracking-wider text-[#18181B] uppercase leading-none">
                  Muhammad Rizwan
                </span>
                <span className="text-[10px] text-[#7E7E88] font-medium leading-none mt-1">
                  2026 Portfolio
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2">
              {NAV_LINKS.map((link) => {
                const sectionId = link.href.replace('#', '');
                const isActive = activeSection === sectionId;
                return (
                  <a
                    key={link.name}
                    id={`nav-link-${sectionId}`}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`relative px-3 py-1.5 text-xs tracking-wide transition-colors duration-200 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#18181B] ${
                      isActive
                        ? 'text-[#18181B] font-semibold'
                        : 'text-[#57575E] hover:text-[#18181B] font-medium'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activeNavPill"
                        className="absolute inset-0 bg-[#EFEFE8] rounded-full -z-10"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    {link.name}
                  </a>
                );
              })}
            </div>

            {/* Right Controls: Anime Sparkle Toggle + CTA + Mobile Toggle */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Anime Atmosphere Quick Toggle Button */}
              <button
                onClick={() => {
                  soundFX.playChime();
                  onToggleAnimeAtmosphere();
                }}
                title={animeAtmosphere ? 'Disable Atmospheric Particles' : 'Enable Atmospheric Particles'}
                className={`p-2 rounded-full border transition-all text-xs flex items-center gap-1.5 ${
                  animeAtmosphere
                    ? 'bg-[#18181B] text-[#F9F9F6] border-[#18181B]'
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
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold tracking-wide bg-[#18181B] text-[#F9F9F6] hover:bg-[#333338] transition-all duration-200 shadow-sm active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#18181B]"
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
                className="lg:hidden p-2 rounded-full text-[#18181B] hover:bg-[#EFEFE8] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#18181B]"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Sheet */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-navigation-drawer"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-x-4 top-20 z-40 bg-[#F9F9F6]/95 backdrop-blur-xl border border-[#E6E5DC] rounded-3xl p-6 shadow-2xl lg:hidden max-h-[85vh] overflow-y-auto"
          >
            <div className="flex flex-col space-y-3">
              <div className="pb-3 border-b border-[#E6E5DC] flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-[#18181B] tracking-wider uppercase">
                    {PERSONAL_INFO.name}
                  </div>
                  <div className="text-xs text-[#7E7E88]">
                    {PERSONAL_INFO.title}
                  </div>
                </div>
                <span className="text-[11px] font-mono bg-[#EFEFE8] text-[#57575E] px-2.5 py-1 rounded-full">
                  Mianwali, PK
                </span>
              </div>

              <div className="grid grid-cols-1 gap-1 pt-2">
                {NAV_LINKS.map((link) => {
                  const sectionId = link.href.replace('#', '');
                  const isActive = activeSection === sectionId;
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-[#18181B] text-[#F9F9F6]'
                          : 'text-[#18181B] hover:bg-[#EFEFE8]'
                      }`}
                    >
                      <span>{link.name}</span>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#F9F9F6]" />}
                    </a>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-[#E6E5DC] flex flex-col gap-2">
                <button
                  onClick={() => {
                    soundFX.playChime();
                    onToggleAnimeAtmosphere();
                  }}
                  className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#FFFFFF] border border-[#D4D3C7] text-xs font-semibold text-[#18181B]"
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
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#18181B] text-[#F9F9F6] text-sm font-semibold tracking-wide shadow-sm"
                >
                  <span>Let's Talk</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <a
                  href={PERSONAL_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#EFEFE8] text-[#18181B] text-xs font-medium hover:bg-[#E6E5DC] transition-colors"
                >
                  <span>Chat on WhatsApp ({PERSONAL_INFO.phone})</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
