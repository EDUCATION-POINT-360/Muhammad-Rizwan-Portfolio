import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Navigation from './components/Navigation';
import ScrollProgress from './components/ScrollProgress';
import AnimeParticles from './components/AnimeParticles';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import GlobalCareerSection from './components/GlobalCareerSection';
import ProjectsSection from './components/ProjectsSection';
import EducationPointShowcase from './components/EducationPointShowcase';
import FounderSection from './components/FounderSection';
import SkillsSection from './components/SkillsSection';
import EducationSection from './components/EducationSection';
import CvSection from './components/CvSection';
import ContactSection from './components/ContactSection';
import FinalCtaSection from './components/FinalCtaSection';
import Footer from './components/Footer';
import CvModal from './components/CvModal';
import FloatingBotWidget from './components/FloatingBotWidget';
import { soundFX } from './utils/audio';

function PortfolioMain() {
  const [activeSection, setActiveSection] = useState('home');
  const [ambientAtmosphere, setAmbientAtmosphere] = useState(true);
  const [cvModalOpen, setCvModalOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { isDark } = useTheme();

  useEffect(() => {
    // Observer for tracking active section and scroll-to-top button
    const sections = [
      'home',
      'about',
      'international-career',
      'projects',
      'education-point',
      'founder',
      'skills',
      'education',
      'cv',
      'contact',
    ];

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);

      const scrollPosition = window.scrollY + 200;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    soundFX.playTick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className={`min-h-screen relative overflow-x-hidden transition-colors duration-500 ${
        isDark
          ? 'bg-[#0C0C0F] text-[#F4F4F6] selection:bg-[#F4F4F6] selection:text-[#0C0C0F]'
          : 'bg-[#F9F9F6] text-[#18181B] selection:bg-[#18181B] selection:text-[#F9F9F6]'
      }`}
    >
      {/* Top Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Atmospheric Ambient Floating Tech Particles */}
      {ambientAtmosphere && <AnimeParticles />}

      {/* Modern Floating Header Navigation with Responsive Menu & Theme Controls */}
      <Navigation
        activeSection={activeSection}
        ambientAtmosphere={ambientAtmosphere}
        onToggleAtmosphere={() => setAmbientAtmosphere((prev) => !prev)}
        onOpenCvModal={() => setCvModalOpen(true)}
      />

      {/* Main Continuous Storytelling Sections */}
      <main id="main-content" className="relative w-full">
        {/* 01. Hero & Identity */}
        <HeroSection onOpenCvModal={() => setCvModalOpen(true)} />

        {/* 02. About Me & Professional Attributes */}
        <AboutSection onOpenCvModal={() => setCvModalOpen(true)} />

        {/* 03. International Career & Global Remote Alignment */}
        <GlobalCareerSection onOpenCvModal={() => setCvModalOpen(true)} />

        {/* 04. Selected Projects & Interactive Case Studies */}
        <ProjectsSection />

        {/* 05. Standout Founder Story: Building Education Point Flagship */}
        <EducationPointShowcase />

        {/* 06. Founder & Builder Methodology & Experience */}
        <FounderSection />

        {/* 07. Core Skills & Verified Tooling */}
        <SkillsSection />

        {/* 08. Education, Certifications & Languages */}
        <EducationSection />

        {/* 09. Curriculum Vitae Section with ATS Preview & PDF/Pic Reader */}
        <CvSection onOpenCvModal={() => setCvModalOpen(true)} />

        {/* 10. Direct Contact Channels & Interactive Messenger */}
        <ContactSection />

        {/* 11. Final Call to Action */}
        <FinalCtaSection />
      </main>

      {/* Footer */}
      <Footer onOpenCvModal={() => setCvModalOpen(true)} />

      {/* Smooth Floating Scroll-to-Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className={`fixed bottom-22 right-6 z-40 p-3 rounded-full border shadow-xl backdrop-blur-md transition-colors ${
              isDark
                ? 'bg-[#15151C]/90 hover:bg-[#20202A] text-[#F4F4F6] border-[#353548] shadow-black/40'
                : 'bg-[#FFFFFF]/90 hover:bg-[#F4F4EE] text-[#18181B] border-[#D4D3C7] shadow-black/10'
            }`}
          >
            <ArrowUp className="w-4 h-4 text-emerald-500" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating Interactive Assistant Bot & Quick Controls Widget */}
      <FloatingBotWidget
        ambientAtmosphere={ambientAtmosphere}
        onToggleAtmosphere={() => setAmbientAtmosphere((prev) => !prev)}
        onOpenCvModal={() => setCvModalOpen(true)}
      />

      {/* Curriculum Vitae Full Screen Modal */}
      <CvModal
        isOpen={cvModalOpen}
        onClose={() => setCvModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioMain />
    </ThemeProvider>
  );
}
