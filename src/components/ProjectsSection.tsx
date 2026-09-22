import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  ArrowUpRight,
  ExternalLink,
  Globe,
  Sparkles,
  BookOpen,
  Heart,
  Users,
  Laptop,
  Eye,
  Layers,
  Code2,
  CheckCircle2,
} from 'lucide-react';
import { PROJECTS_DATA } from '../data/portfolioData';
import { ProjectItem } from '../types';
import ProjectPreviewModal from './ProjectPreviewModal';
import { soundFX } from '../utils/audio';
import { useTheme } from '../context/ThemeContext';

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
  onPreview: (p: ProjectItem) => void;
}

function ProjectCard({ project, index, onPreview }: ProjectCardProps) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const { isDark } = useTheme();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Smooth, calibrated 3D tilt
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    // Glare position calculation
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setRotate({ x: rotateX, y: rotateY });
    setGlare({ x: glareX, y: glareY, opacity: isDark ? 0.14 : 0.18 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    soundFX.playTick();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  // Specific visual preview themes for each project adapting to dark/light
  const getProjectPreview = (id: string) => {
    const bgClass = isDark
      ? 'bg-gradient-to-br from-[#1C1C26] via-[#161620] to-[#111117] border-[#2A2A38]'
      : 'bg-gradient-to-br from-[#F5F5ED] via-[#EDEDE3] to-[#E3E3D7] border-[#E6E5DC]';

    const pillBg = isDark
      ? 'bg-[#15151C]/90 text-[#F4F4F6] border-[#353548]'
      : 'bg-[#FFFFFF]/80 text-[#18181B] border-[#D4D3C7]';

    const badgeBg = isDark
      ? 'bg-[#F4F4F6] text-[#0C0C0F]'
      : 'bg-[#18181B] text-[#F9F9F6]';

    const titleColor = isDark ? 'text-[#F4F4F6]' : 'text-[#18181B]';
    const subColor = isDark ? 'text-[#A6A6B4]' : 'text-[#57575E]';
    const borderColor = isDark ? 'border-[#2A2A38]' : 'border-[#D4D3C7]/60';

    switch (id) {
      case 'education-point':
        return (
          <div className={`w-full h-44 rounded-2xl p-5 flex flex-col justify-between border shadow-inner group/box relative overflow-hidden ${bgClass}`}>
            <div className={`flex items-center justify-between text-[10px] font-mono relative z-10 ${subColor}`}>
              <span className={`flex items-center gap-1.5 font-bold backdrop-blur-sm px-2.5 py-1 rounded-full border ${pillBg}`}>
                <BookOpen className="w-3.5 h-3.5" />
                EP PORTAL // LIVE
              </span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-medium ${badgeBg}`}>
                NETLIFY
              </span>
            </div>

            <div className="space-y-1 my-auto relative z-10">
              <div className={`text-sm font-serif font-bold ${titleColor}`}>Notes • Schemes • Model Papers</div>
              <div className={`text-xs ${subColor}`}>Punjab Matric & Intermediate Resource Hub</div>
            </div>

            <div className={`flex items-center justify-between text-[10px] font-mono relative z-10 pt-2 border-t ${borderColor} ${titleColor}`}>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-semibold">educationpoint360.netlify.app</span>
              </div>
              <ArrowUpRight className="w-3 h-3 transition-transform group-hover/box:translate-x-0.5 group-hover/box:-translate-y-0.5" />
            </div>
          </div>
        );
      case 'ep-ai':
        return (
          <div className={`w-full h-44 rounded-2xl p-5 flex flex-col justify-between border shadow-inner group/box relative overflow-hidden ${bgClass}`}>
            <div className={`flex items-center justify-between text-[10px] font-mono relative z-10 ${subColor}`}>
              <span className={`flex items-center gap-1.5 font-bold backdrop-blur-sm px-2.5 py-1 rounded-full border ${pillBg}`}>
                <Sparkles className="w-3.5 h-3.5" />
                EP AI TUTOR // ASSISTANT
              </span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-medium ${badgeBg}`}>
                AI ENGINE
              </span>
            </div>

            <div className="space-y-1 my-auto relative z-10">
              <div className={`text-sm font-serif font-bold ${titleColor}`}>Smart Academic Problem Solver</div>
              <div className={`text-xs ${subColor}`}>Interactive instant student doubt assistance</div>
            </div>

            <div className={`flex items-center justify-between text-[10px] font-mono relative z-10 pt-2 border-t ${borderColor} ${titleColor}`}>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="font-semibold">edupointai.netlify.app</span>
              </div>
              <ArrowUpRight className="w-3 h-3 transition-transform group-hover/box:translate-x-0.5 group-hover/box:-translate-y-0.5" />
            </div>
          </div>
        );
      default:
        return (
          <div className={`w-full h-44 rounded-2xl p-5 flex flex-col justify-between border shadow-inner group/box relative overflow-hidden ${bgClass}`}>
            <div className={`flex items-center justify-between text-[10px] font-mono relative z-10 ${subColor}`}>
              <span className={`flex items-center gap-1.5 font-bold backdrop-blur-sm px-2.5 py-1 rounded-full border ${pillBg}`}>
                <Globe className="w-3.5 h-3.5" />
                DIGITAL IDENTITY
              </span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-medium ${badgeBg}`}>
                NETLIFY
              </span>
            </div>

            <div className="space-y-1 my-auto relative z-10">
              <div className={`text-sm font-serif font-bold ${titleColor}`}>{project.title}</div>
              <div className={`text-xs ${subColor}`}>{project.theme}</div>
            </div>

            <div className={`flex items-center justify-between text-[10px] font-mono relative z-10 pt-2 border-t ${borderColor} ${titleColor}`}>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="font-semibold truncate max-w-[200px]">{project.url.replace('https://', '')}</span>
              </div>
              <ArrowUpRight className="w-3 h-3 transition-transform group-hover/box:translate-x-0.5 group-hover/box:-translate-y-0.5" />
            </div>
          </div>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1100px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
      }}
      className={`group relative rounded-3xl p-7 sm:p-8 border transition-all duration-300 flex flex-col justify-between overflow-hidden preserve-3d shadow-sm hover:shadow-xl ${
        isDark
          ? isHovered
            ? 'bg-[#15151C] border-[#353548]'
            : 'bg-[#14141A] border-[#242432]'
          : isHovered
          ? 'bg-[#FFFFFF] border-[#18181B]'
          : 'bg-[#FFFFFF] border-[#E6E5DC]'
      }`}
    >
      {/* Dynamic Specular Light Glare (Simulates real glass reflection following mouse) */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 rounded-3xl"
        style={{
          background: `radial-gradient(circle 320px at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, ${isDark ? '0.3' : '0.9'}), transparent 80%)`,
          opacity: glare.opacity,
        }}
      />

      {/* Layer 1: Top Meta & Category (Z-depth: 18px) */}
      <div style={{ transform: 'translateZ(18px)' }}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className={`text-xs font-mono font-bold tracking-widest ${isDark ? 'text-[#747482]' : 'text-[#7E7E88]'}`}>
              PROJECT {project.number}
            </span>
            <span className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-emerald-400' : 'bg-[#18181B]'}`} />
            <span className={`text-[11px] font-mono uppercase ${isDark ? 'text-[#747482]' : 'text-[#7E7E88]'}`}>2026 RELEASE</span>
          </div>

          <span className={`text-[11px] font-mono font-medium px-3 py-1 rounded-full border ${
            isDark
              ? 'bg-[#1D1D26] text-[#F4F4F6] border-[#353548]'
              : 'bg-[#EFEFE8] text-[#18181B] border-[#D4D3C7]'
          }`}>
            {project.category}
          </span>
        </div>

        {/* Title */}
        <h3 className={`text-2xl sm:text-3xl font-serif font-bold tracking-tight mb-1 transition-colors ${
          isDark ? 'text-[#F4F4F6] group-hover:text-white' : 'text-[#18181B] group-hover:text-[#333338]'
        }`}>
          {project.title}
        </h3>

        {/* Theme/Subheading */}
        <div className={`text-xs font-mono uppercase mb-4 tracking-wide ${isDark ? 'text-[#747482]' : 'text-[#7E7E88]'}`}>
          {project.theme}
        </div>
      </div>

      {/* Layer 2: Interactive 3D Preview Frame (Z-depth: 30px) */}
      <div
        style={{ transform: 'translateZ(30px)' }}
        onClick={() => onPreview(project)}
        className="my-5 cursor-pointer transition-transform duration-300 group-hover:scale-[1.01]"
        title="Click to view full architecture & live demo preview"
      >
        {getProjectPreview(project.id)}
      </div>

      {/* Layer 3: Description & Tech Stack (Z-depth: 22px) */}
      <div style={{ transform: 'translateZ(22px)' }}>
        <p className={`text-sm leading-relaxed mb-5 ${isDark ? 'text-[#A6A6B4]' : 'text-[#57575E]'}`}>
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className={`text-[10px] font-mono px-2.5 py-1 rounded-md border ${
                isDark
                  ? 'bg-[#1D1D26] text-[#A6A6B4] border-[#353548]'
                  : 'bg-[#F4F4EE] text-[#57575E] border-[#E6E5DC]'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Layer 4: Prominent CTA Buttons With Lucide Icons (Z-depth: 36px) */}
      <div
        style={{ transform: 'translateZ(36px)' }}
        className={`pt-5 border-t flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 ${
          isDark ? 'border-[#242432]' : 'border-[#E6E5DC]'
        }`}
      >
        {/* Primary CTA Button: Launch Platform with Lucide Icons */}
        <a
          id={`project-cta-${project.id}`}
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => soundFX.playChime()}
          className={`flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-semibold tracking-wide shadow-sm transition-all duration-200 active:scale-95 group/btn ${
            isDark
              ? 'bg-[#F4F4F6] text-[#0C0C0F] hover:bg-[#E2E2E6]'
              : 'bg-[#18181B] text-[#F9F9F6] hover:bg-[#333338]'
          }`}
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>{project.buttonLabel}</span>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
        </a>

        {/* Secondary CTA Button: Architecture & Details */}
        <button
          id={`project-preview-btn-${project.id}`}
          onClick={() => {
            soundFX.playTick();
            onPreview(project);
          }}
          className={`inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl border text-xs font-medium tracking-wide transition-all duration-200 active:scale-95 ${
            isDark
              ? 'bg-[#1D1D26] hover:bg-[#252532] border-[#353548] text-[#F4F4F6]'
              : 'bg-[#F4F4EE] hover:bg-[#EFEFE8] border-[#D4D3C7] text-[#18181B]'
          }`}
          title="Inspect Architecture & Tech Details"
        >
          <Eye className={`w-3.5 h-3.5 ${isDark ? 'text-[#A6A6B4]' : 'text-[#57575E]'}`} />
          <span>Architecture</span>
        </button>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const { isDark } = useTheme();

  const handleOpenPreview = (project: ProjectItem) => {
    soundFX.playChime();
    setSelectedProject(project);
  };

  const handleClosePreview = () => {
    soundFX.playTick();
    setSelectedProject(null);
  };

  return (
    <section
      id="projects"
      className={`py-24 sm:py-36 relative border-b transition-colors duration-300 ${
        isDark ? 'bg-[#0C0C0F] border-[#242432]' : 'bg-[#F9F9F6] border-[#E6E5DC]/80'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-xs font-mono tracking-widest uppercase ${isDark ? 'text-[#747482]' : 'text-[#7E7E88]'}`}>
                05 // DIGITAL ARCHIVES
              </span>
              <div className={`w-12 h-[1px] ${isDark ? 'bg-[#353548]' : 'bg-[#D4D3C7]'}`} />
            </div>
            <h2 className={`text-4xl sm:text-6xl md:text-7xl font-serif tracking-tight leading-[0.98] ${
              isDark ? 'text-[#F4F4F6]' : 'text-[#18181B]'
            }`}>
              Selected Projects
            </h2>
          </div>

          <div className="max-w-md space-y-2">
            <p className={`text-sm font-mono ${isDark ? 'text-[#A6A6B4]' : 'text-[#57575E]'}`}>
              6 public production deployments engineered by Muhammad Rizwan across edtech, artificial intelligence, community ecosystems, and spiritual utilities.
            </p>
            <div className={`flex items-center gap-2 text-xs font-mono ${isDark ? 'text-[#F4F4F6]' : 'text-[#18181B]'}`}>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>All 6 platforms actively hosted on Netlify</span>
            </div>
          </div>
        </div>

        {/* 3D Interactive Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {PROJECTS_DATA.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onPreview={handleOpenPreview}
            />
          ))}
        </div>

        {/* Global Action Banner */}
        <div className={`mt-16 p-8 rounded-3xl border flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm ${
          isDark
            ? 'bg-[#15151C] border-[#242432]'
            : 'bg-[#FFFFFF] border-[#E6E5DC]'
        }`}>
          <div className="flex items-start gap-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-mono text-lg font-bold flex-shrink-0 ${
              isDark ? 'bg-[#F4F4F6] text-[#0C0C0F]' : 'bg-[#18181B] text-[#F9F9F6]'
            }`}>
              <Code2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className={`text-lg font-serif font-bold ${isDark ? 'text-[#F4F4F6]' : 'text-[#18181B]'}`}>
                Looking for Custom Digital Architecture?
              </h4>
              <p className={`text-xs mt-0.5 ${isDark ? 'text-[#A6A6B4]' : 'text-[#57575E]'}`}>
                From academic LMS platforms to scalable modern web applications and AI tools.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <a
              href="#contact"
              onClick={() => soundFX.playTick()}
              className={`w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-xs font-semibold transition-all duration-200 active:scale-95 shadow-sm ${
                isDark
                  ? 'bg-[#F4F4F6] text-[#0C0C0F] hover:bg-[#E2E2E6]'
                  : 'bg-[#18181B] text-[#F9F9F6] hover:bg-[#333338]'
              }`}
            >
              <span>Discuss a Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Full Architectural Inspection Modal */}
      <ProjectPreviewModal
        project={selectedProject}
        onClose={handleClosePreview}
      />
    </section>
  );
}
