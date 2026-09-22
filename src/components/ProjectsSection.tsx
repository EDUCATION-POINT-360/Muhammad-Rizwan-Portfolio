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
    setGlare({ x: glareX, y: glareY, opacity: 0.18 });
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

  // Specific visual preview themes for each project
  const getProjectPreview = (id: string) => {
    switch (id) {
      case 'education-point':
        return (
          <div className="w-full h-44 rounded-2xl bg-gradient-to-br from-[#F5F5ED] via-[#EDEDE3] to-[#E3E3D7] p-5 flex flex-col justify-between border border-[#E6E5DC] shadow-inner group/box relative overflow-hidden">
            <div className="flex items-center justify-between text-[10px] font-mono text-[#7E7E88] relative z-10">
              <span className="flex items-center gap-1.5 font-bold text-[#18181B] bg-[#FFFFFF]/80 backdrop-blur-sm px-2.5 py-1 rounded-full border border-[#D4D3C7]">
                <BookOpen className="w-3.5 h-3.5 text-[#18181B]" />
                EP PORTAL // LIVE
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#18181B] text-[#F9F9F6] font-mono font-medium">
                NETLIFY
              </span>
            </div>

            <div className="space-y-1 my-auto relative z-10">
              <div className="text-sm font-serif font-bold text-[#18181B]">Notes • Schemes • Model Papers</div>
              <div className="text-xs text-[#57575E]">Punjab Matric & Intermediate Resource Hub</div>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-[#18181B] relative z-10 pt-2 border-t border-[#D4D3C7]/60">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-semibold">educationpoint360.netlify.app</span>
              </div>
              <ArrowUpRight className="w-3 h-3 text-[#7E7E88] group-hover/box:translate-x-0.5 group-hover/box:-translate-y-0.5 transition-transform" />
            </div>
          </div>
        );
      case 'ep-ai':
        return (
          <div className="w-full h-44 rounded-2xl bg-gradient-to-br from-[#F2F2EC] via-[#ECECE2] to-[#DFDFD4] p-5 flex flex-col justify-between border border-[#E6E5DC] shadow-inner group/box relative overflow-hidden">
            <div className="flex items-center justify-between text-[10px] font-mono text-[#7E7E88] relative z-10">
              <span className="flex items-center gap-1.5 font-bold text-[#18181B] bg-[#FFFFFF]/80 backdrop-blur-sm px-2.5 py-1 rounded-full border border-[#D4D3C7]">
                <Sparkles className="w-3.5 h-3.5 text-[#18181B]" />
                EP AI TUTOR // ASSISTANT
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#18181B] text-[#F9F9F6] font-mono font-medium">
                AI ENGINE
              </span>
            </div>

            <div className="space-y-1 my-auto relative z-10">
              <div className="text-sm font-serif font-bold text-[#18181B]">Smart Academic Problem Solver</div>
              <div className="text-xs text-[#57575E]">Interactive instant student doubt assistance</div>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-[#18181B] relative z-10 pt-2 border-t border-[#D4D3C7]/60">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="font-semibold">edupointai.netlify.app</span>
              </div>
              <ArrowUpRight className="w-3 h-3 text-[#7E7E88] group-hover/box:translate-x-0.5 group-hover/box:-translate-y-0.5 transition-transform" />
            </div>
          </div>
        );
      case 'ep-courses':
        return (
          <div className="w-full h-44 rounded-2xl bg-gradient-to-br from-[#F7F7F0] via-[#EFEFE4] to-[#E2E2D6] p-5 flex flex-col justify-between border border-[#E6E5DC] shadow-inner group/box relative overflow-hidden">
            <div className="flex items-center justify-between text-[10px] font-mono text-[#7E7E88] relative z-10">
              <span className="flex items-center gap-1.5 font-bold text-[#18181B] bg-[#FFFFFF]/80 backdrop-blur-sm px-2.5 py-1 rounded-full border border-[#D4D3C7]">
                <Laptop className="w-3.5 h-3.5 text-[#18181B]" />
                EP COURSES PLATFORM
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#18181B] text-[#F9F9F6] font-mono font-medium">
                EDTECH
              </span>
            </div>

            <div className="space-y-1 my-auto relative z-10">
              <div className="text-sm font-serif font-bold text-[#18181B]">Technical & Practical Training</div>
              <div className="text-xs text-[#57575E]">Curriculum roadmap and self-paced modules</div>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-[#18181B] relative z-10 pt-2 border-t border-[#D4D3C7]/60">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="font-semibold">epcourse.netlify.app</span>
              </div>
              <ArrowUpRight className="w-3 h-3 text-[#7E7E88] group-hover/box:translate-x-0.5 group-hover/box:-translate-y-0.5 transition-transform" />
            </div>
          </div>
        );
      case 'soulbook':
        return (
          <div className="w-full h-44 rounded-2xl bg-gradient-to-br from-[#F5F5ED] via-[#ECECE2] to-[#DFDFD3] p-5 flex flex-col justify-between border border-[#E6E5DC] shadow-inner group/box relative overflow-hidden">
            <div className="flex items-center justify-between text-[10px] font-mono text-[#7E7E88] relative z-10">
              <span className="flex items-center gap-1.5 font-bold text-[#18181B] bg-[#FFFFFF]/80 backdrop-blur-sm px-2.5 py-1 rounded-full border border-[#D4D3C7]">
                <Users className="w-3.5 h-3.5 text-[#18181B]" />
                SOULBOOK COMMUNITY
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#18181B] text-[#F9F9F6] font-mono font-medium">
                SOCIAL
              </span>
            </div>

            <div className="space-y-1 my-auto relative z-10">
              <div className="text-sm font-serif font-bold text-[#18181B]">Real-Time Feeds & Interactions</div>
              <div className="text-xs text-[#57575E]">Profiles, comments, reactions, and messaging</div>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-[#18181B] relative z-10 pt-2 border-t border-[#D4D3C7]/60">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="font-semibold">soulbook.netlify.app</span>
              </div>
              <ArrowUpRight className="w-3 h-3 text-[#7E7E88] group-hover/box:translate-x-0.5 group-hover/box:-translate-y-0.5 transition-transform" />
            </div>
          </div>
        );
      case 'nur-islamic':
        return (
          <div className="w-full h-44 rounded-2xl bg-gradient-to-br from-[#F8F8F2] via-[#EFEFE6] to-[#E4E4D9] p-5 flex flex-col justify-between border border-[#E6E5DC] shadow-inner group/box relative overflow-hidden">
            <div className="flex items-center justify-between text-[10px] font-mono text-[#7E7E88] relative z-10">
              <span className="flex items-center gap-1.5 font-bold text-[#18181B] bg-[#FFFFFF]/80 backdrop-blur-sm px-2.5 py-1 rounded-full border border-[#D4D3C7]">
                <Heart className="w-3.5 h-3.5 text-[#18181B]" />
                NUR ISLAMIC WEB
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#18181B] text-[#F9F9F6] font-mono font-medium">
                SPIRITUAL TECH
              </span>
            </div>

            <div className="space-y-1 my-auto relative z-10">
              <div className="text-sm font-serif font-bold text-[#18181B]">Quran, Hadith & Prayer Times</div>
              <div className="text-xs text-[#57575E]">Digital Tasbeeh counter and spiritual library</div>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-[#18181B] relative z-10 pt-2 border-t border-[#D4D3C7]/60">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="font-semibold">nurislamic.netlify.app</span>
              </div>
              <ArrowUpRight className="w-3 h-3 text-[#7E7E88] group-hover/box:translate-x-0.5 group-hover/box:-translate-y-0.5 transition-transform" />
            </div>
          </div>
        );
      default:
        return (
          <div className="w-full h-44 rounded-2xl bg-gradient-to-br from-[#F5F5ED] via-[#EDEDE2] to-[#DFDFD4] p-5 flex flex-col justify-between border border-[#E6E5DC] shadow-inner group/box relative overflow-hidden">
            <div className="flex items-center justify-between text-[10px] font-mono text-[#7E7E88] relative z-10">
              <span className="flex items-center gap-1.5 font-bold text-[#18181B] bg-[#FFFFFF]/80 backdrop-blur-sm px-2.5 py-1 rounded-full border border-[#D4D3C7]">
                <Globe className="w-3.5 h-3.5 text-[#18181B]" />
                DIGITAL IDENTITY
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#18181B] text-[#F9F9F6] font-mono font-medium">
                PORTFOLIO
              </span>
            </div>

            <div className="space-y-1 my-auto relative z-10">
              <div className="text-sm font-serif font-bold text-[#18181B]">Muhammad Rizwan Portfolio</div>
              <div className="text-xs text-[#57575E]">Modern spatial architecture & full-stack showcase</div>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-[#18181B] relative z-10 pt-2 border-t border-[#D4D3C7]/60">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="font-semibold">rizwanep.netlify.app</span>
              </div>
              <ArrowUpRight className="w-3 h-3 text-[#7E7E88] group-hover/box:translate-x-0.5 group-hover/box:-translate-y-0.5 transition-transform" />
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
      className={`group relative rounded-3xl p-7 sm:p-8 bg-[#FFFFFF] border transition-all duration-300 flex flex-col justify-between shadow-[0_4px_24px_rgba(24,24,27,0.04)] hover:shadow-[0_20px_50px_rgba(24,24,27,0.1)] overflow-hidden preserve-3d ${
        isHovered ? 'border-[#18181B]' : 'border-[#E6E5DC]'
      }`}
    >
      {/* Dynamic Specular Light Glare (Simulates real glass reflection following mouse) */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 rounded-3xl"
        style={{
          background: `radial-gradient(circle 320px at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.9), transparent 80%)`,
          opacity: glare.opacity,
        }}
      />

      {/* Layer 1: Top Meta & Category (Z-depth: 18px) */}
      <div style={{ transform: 'translateZ(18px)' }}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold tracking-widest text-[#7E7E88]">
              PROJECT {project.number}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#18181B]" />
            <span className="text-[11px] font-mono text-[#7E7E88] uppercase">2026 RELEASE</span>
          </div>

          <span className="text-[11px] font-mono font-medium px-3 py-1 rounded-full bg-[#EFEFE8] text-[#18181B] border border-[#D4D3C7]">
            {project.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#18181B] tracking-tight mb-1 group-hover:text-[#333338] transition-colors">
          {project.title}
        </h3>

        {/* Theme/Subheading */}
        <div className="text-xs font-mono text-[#7E7E88] uppercase mb-4 tracking-wide">
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
        <p className="text-sm text-[#57575E] leading-relaxed mb-5">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-[#F4F4EE] text-[#57575E] border border-[#E6E5DC]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Layer 4: Prominent CTA Buttons With Lucide Icons (Z-depth: 36px) */}
      <div
        style={{ transform: 'translateZ(36px)' }}
        className="pt-5 border-t border-[#E6E5DC] flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5"
      >
        {/* Primary CTA Button: Launch Platform with Lucide Icons */}
        <a
          id={`project-cta-${project.id}`}
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => soundFX.playChime()}
          className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#18181B] text-[#F9F9F6] text-xs font-semibold tracking-wide hover:bg-[#333338] shadow-sm hover:shadow-md transition-all duration-200 active:scale-95 group/btn"
        >
          <ExternalLink className="w-3.5 h-3.5 text-[#F9F9F6]" />
          <span>{project.buttonLabel}</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-[#F9F9F6] transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
        </a>

        {/* Secondary CTA Button: Architecture & Details */}
        <button
          id={`project-preview-btn-${project.id}`}
          onClick={() => {
            soundFX.playTick();
            onPreview(project);
          }}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-[#F4F4EE] hover:bg-[#EFEFE8] border border-[#D4D3C7] text-[#18181B] text-xs font-medium tracking-wide transition-all duration-200 active:scale-95"
          title="Inspect Architecture & Tech Details"
        >
          <Eye className="w-3.5 h-3.5 text-[#57575E]" />
          <span>Architecture</span>
        </button>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const handleOpenPreview = (project: ProjectItem) => {
    soundFX.playChime();
    setSelectedProject(project);
  };

  const handleClosePreview = () => {
    soundFX.playTick();
    setSelectedProject(null);
  };

  return (
    <section id="projects" className="py-24 sm:py-36 relative border-b border-[#E6E5DC]/80 bg-[#F9F9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-mono tracking-widest text-[#7E7E88] uppercase">
                05 // DIGITAL ARCHIVES
              </span>
              <div className="w-12 h-[1px] bg-[#D4D3C7]" />
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif text-[#18181B] tracking-tight leading-[0.98]">
              Selected Projects
            </h2>
          </div>

          <div className="max-w-md space-y-2">
            <p className="text-sm font-mono text-[#57575E]">
              6 public production deployments engineered by Muhammad Rizwan across edtech, artificial intelligence, community ecosystems, and spiritual utilities.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-[#18181B]">
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
        <div className="mt-16 p-8 rounded-3xl bg-[#FFFFFF] border border-[#E6E5DC] flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#18181B] text-[#F9F9F6] flex items-center justify-center font-mono text-lg font-bold flex-shrink-0">
              <Code2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-serif font-bold text-[#18181B]">
                Looking for Custom Digital Architecture?
              </h4>
              <p className="text-xs text-[#57575E] mt-0.5">
                From academic LMS platforms to scalable modern web applications and AI tools.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <a
              href="#contact"
              onClick={() => soundFX.playTick()}
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#18181B] text-[#F9F9F6] text-xs font-semibold hover:bg-[#333338] transition-all duration-200 active:scale-95 shadow-sm"
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
