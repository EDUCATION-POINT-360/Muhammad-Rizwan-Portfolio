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
import EducationSection from './components/EducationSection';
import JourneySection from './components/JourneySection';
import EducationPointShowcase from './components/EducationPointShowcase';
import ProjectsSection from './components/ProjectsSection';
import SkillsSection from './components/SkillsSection';
import InterestsSection from './components/InterestsSection';
import PersonalitySection from './components/PersonalitySection';
import PhilosophySection from './components/PhilosophySection';
import ContactSection from './components/ContactSection';
import FinalCtaSection from './components/FinalCtaSection';
import Footer from './components/Footer';

function PortfolioMain() {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [animeAtmosphere, setAnimeAtmosphere] = useState(true);
  const { isDark } = useTheme();

  useEffect(() => {
    // Observer for tracking active section
    const sections = [
      'home',
      'about',
      'education',
      'journey',
      'education-point',
      'projects',
      'skills',
      'interests',
      'personality',
      'philosophy',
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

      {/* Subtle Atmospheric Cyber Particles Canvas when active */}
      {animeAtmosphere && <AnimeParticles />}

      {/* Modern Floating Header Navigation with Dark/Light Theme Switcher */}
      <Navigation
        activeSection={activeSection}
        animeAtmosphere={animeAtmosphere}
        onToggleAnimeAtmosphere={() => setAnimeAtmosphere((prev) => !prev)}
      />

      {/* Main Single Continuous Storytelling Content */}
      <main id="main-content" className="relative">
        {/* 01. Identity & Hero */}
        <HeroSection />

        {/* 02. About Me & Quick Profile with Real Portrait */}
        <AboutSection />

        {/* 03. Cinematic Education Timeline */}
        <EducationSection />

        {/* 04. Vertical Interactive Journey */}
        <JourneySection />

        {/* 05. Standout Founder Story: Education Point Flagship */}
        <EducationPointShowcase />

        {/* 06. Interactive 3D Projects Archive */}
        <ProjectsSection />

        {/* 07. Modern Skills Grid */}
        <SkillsSection />

        {/* 08. Curated Interests & Inspirations with Real Architecture Scene */}
        <InterestsSection />

        {/* 09. Personality: Behind The Screen */}
        <PersonalitySection />

        {/* 10. Digital Philosophy & Motto */}
        <PhilosophySection />

        {/* 11. Real Public Contact & Interactive Messenger */}
        <ContactSection />

        {/* 12. Final Dramatic Call to Action */}
        <FinalCtaSection />
      </main>

      {/* Interactive 3D Concierge Widget */}
      <AnimeCompanion
        animeAtmosphere={animeAtmosphere}
        onToggleAnimeAtmosphere={() => setAnimeAtmosphere((prev) => !prev)}
      />

      {/* Footer & Final Brand Statement */}
      <Footer />
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
