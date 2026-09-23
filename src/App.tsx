import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Preloader from './components/Preloader';
import Navigation from './components/Navigation';
import ScrollProgress from './components/ScrollProgress';
import AnimeParticles from './components/AnimeParticles';
import AnimeCompanion from './components/AnimeCompanion';
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

function PortfolioMain() {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [animeAtmosphere, setAnimeAtmosphere] = useState(false);
  const [cvModalOpen, setCvModalOpen] = useState(false);
  const { isDark } = useTheme();

  useEffect(() => {
    // Observer for tracking active section
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

  return (
    <div
      className={`min-h-screen relative overflow-x-hidden transition-colors duration-300 ${
        isDark
          ? 'bg-[#0C0C0F] text-[#F4F4F6] selection:bg-[#F4F4F6] selection:text-[#0C0C0F]'
          : 'bg-[#F9F9F6] text-[#18181B] selection:bg-[#18181B] selection:text-[#F9F9F6]'
      }`}
    >
      {/* Short, premium preloader */}
      <AnimatePresence>
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {/* Top Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Atmospheric Particles Canvas when toggled active */}
      {animeAtmosphere && <AnimeParticles />}

      {/* Modern Floating Header Navigation with Dark/Light Theme Switcher & CV Download */}
      <Navigation
        activeSection={activeSection}
        animeAtmosphere={animeAtmosphere}
        onToggleAnimeAtmosphere={() => setAnimeAtmosphere((prev) => !prev)}
        onOpenCvModal={() => setCvModalOpen(true)}
      />

      {/* Main Continuous Storytelling Content */}
      <main id="main-content" className="relative">
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

        {/* 09. Curriculum Vitae Section with ATS Preview & PDF Download */}
        <CvSection onOpenCvModal={() => setCvModalOpen(true)} />

        {/* 10. Direct Contact Channels & Interactive Messenger */}
        <ContactSection />

        {/* 11. Final Call to Action */}
        <FinalCtaSection />
      </main>

      {/* Interactive Concierge Widget */}
      <AnimeCompanion
        animeAtmosphere={animeAtmosphere}
        onToggleAnimeAtmosphere={() => setAnimeAtmosphere((prev) => !prev)}
      />

      {/* Footer */}
      <Footer onOpenCvModal={() => setCvModalOpen(true)} />

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
