import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  ArrowUpRight,
  ExternalLink,
  BookOpen,
  Sparkles,
  Layers,
  GraduationCap,
  Users,
  Compass,
  CheckCircle2,
  Eye,
  Target,
  Lightbulb,
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

    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

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
                <BookOpen className="w-3.5 h-3.5 text-emerald-500" />
                FLAGSHIP PORTAL
              </span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-medium ${badgeBg}`}>
                NETLIFY LIVE
              </span>
            </div>

            <div className="space-y-1 my-auto relative z-10">
              <div className={`text-base font-serif font-bold ${titleColor}`}>Notes • MCQs • Schemes • Tests</div>
              <div className={`text-xs ${subColor}`}>Class 9th to 12th Complete Academic Directory</div>
            </div>

            <div className={`flex items-center justify-between text-[10px] font-mono relative z-10 pt-2 border-t ${borderColor} ${titleColor}`}>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-semibold truncate">educationpoint360.netlify.app</span>
              </div>
              <ArrowUpRight className="w-3 h-3 transition-transform group-hover/box:translate-x-0.5 group-hover/box:-translate-y-0.5 flex-shrink-0" />
            </div>
          </div>
        );

      case 'ep-ai':
        return (
          <div className={`w-full h-44 rounded-2xl p-5 flex flex-col justify-between border shadow-inner group/box relative overflow-hidden ${bgClass}`}>
            <div className={`flex items-center justify-between text-[10px] font-mono relative z-10 ${subColor}`}>
              <span className={`flex items-center gap-1.5 font-bold backdrop-blur-sm px-2.5 py-1 rounded-full border ${pillBg}`}>
                <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                AI STUDY COMPANION
              </span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-medium ${badgeBg}`}>
                AI / EDTECH
              </span>
            </div>

            <div className="space-y-1 my-auto relative z-10">
              <div className={`text-base font-serif font-bold ${titleColor}`}>Intelligent Academic Clarification</div>
              <div className={`text-xs ${subColor}`}>Targeted student concept breakdown & tutoring</div>
            </div>

            <div className={`flex items-center justify-between text-[10px] font-mono relative z-10 pt-2 border-t ${borderColor} ${titleColor}`}>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="font-semibold truncate">edupointai.netlify.app</span>
              </div>
              <ArrowUpRight className="w-3 h-3 transition-transform group-hover/box:translate-x-0.5 group-hover/box:-translate-y-0.5 flex-shrink-0" />
            </div>
          </div>
        );

      case 'ep-courses':
        return (
          <div className={`w-full h-44 rounded-2xl p-5 flex flex-col justify-between border shadow-inner group/box relative overflow-hidden ${bgClass}`}>
            <div className={`flex items-center justify-between text-[10px] font-mono relative z-10 ${subColor}`}>
              <span className={`flex items-center gap-1.5 font-bold backdrop-blur-sm px-2.5 py-1 rounded-full border ${pillBg}`}>
                <GraduationCap className="w-3.5 h-3.5 text-amber-500" />
                STRUCTURED COURSES
              </span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-medium ${badgeBg}`}>
                E-LEARNING
              </span>
            </div>

            <div className="space-y-1 my-auto relative z-10">
              <div className={`text-base font-serif font-bold ${titleColor}`}>Modular Knowledge Tracks</div>
              <div className={`text-xs ${subColor}`}>Self-paced skill acquisition & practical tutorials</div>
            </div>

            <div className={`flex items-center justify-between text-[10px] font-mono relative z-10 pt-2 border-t ${borderColor} ${titleColor}`}>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="font-semibold truncate">epcourse.netlify.app</span>
              </div>
              <ArrowUpRight className="w-3 h-3 transition-transform group-hover/box:translate-x-0.5 group-hover/box:-translate-y-0.5 flex-shrink-0" />
            </div>
          </div>
        );

      case 'soulbook':
        return (
          <div className={`w-full h-44 rounded-2xl p-5 flex flex-col justify-between border shadow-inner group/box relative overflow-hidden ${bgClass}`}>
            <div className={`flex items-center justify-between text-[10px] font-mono relative z-10 ${subColor}`}>
              <span className={`flex items-center gap-1.5 font-bold backdrop-blur-sm px-2.5 py-1 rounded-full border ${pillBg}`}>
                <Users className="w-3.5 h-3.5 text-indigo-400" />
                SOCIAL ARCHITECTURE
              </span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-medium ${badgeBg}`}>
                SOCIAL PLATFORM
              </span>
            </div>

            <div className="space-y-1 my-auto relative z-10">
              <div className={`text-base font-serif font-bold ${titleColor}`}>User Profiles • Feeds • Reactions</div>
              <div className={`text-xs ${subColor}`}>Dynamic post authoring & interactive community state</div>
            </div>

            <div className={`flex items-center justify-between text-[10px] font-mono relative z-10 pt-2 border-t ${borderColor} ${titleColor}`}>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="font-semibold truncate">soulbook.netlify.app</span>
              </div>
              <ArrowUpRight className="w-3 h-3 transition-transform group-hover/box:translate-x-0.5 group-hover/box:-translate-y-0.5 flex-shrink-0" />
            </div>
          </div>
        );

      case 'nur-islamic':
        return (
          <div className={`w-full h-44 rounded-2xl p-5 flex flex-col justify-between border shadow-inner group/box relative overflow-hidden ${bgClass}`}>
            <div className={`flex items-center justify-between text-[10px] font-mono relative z-10 ${subColor}`}>
              <span className={`flex items-center gap-1.5 font-bold backdrop-blur-sm px-2.5 py-1 rounded-full border ${pillBg}`}>
                <Compass className="w-3.5 h-3.5 text-emerald-500" />
                FAITH TECH PWA
              </span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-medium ${badgeBg}`}>
                OFFLINE PWA
              </span>
            </div>

            <div className="space-y-1 my-auto relative z-10">
              <div className={`text-base font-serif font-bold ${titleColor}`}>Quran • Hadith • Adhkar • Tasbeeh</div>
              <div className={`text-xs ${subColor}`}>Ad-free spiritual utility & accurate prayer timings</div>
            </div>

            <div className={`flex items-center justify-between text-[10px] font-mono relative z-10 pt-2 border-t ${borderColor} ${titleColor}`}>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="font-semibold truncate">nurislamic.netlify.app</span>
              </div>
              <ArrowUpRight className="w-3 h-3 transition-transform group-hover/box:translate-x-0.5 group-hover/box:-translate-y-0.5 flex-shrink-0" />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) translateY(${isHovered ? '-6px' : '0px'})`,
      }}
      className={`group relative rounded-3xl p-6 sm:p-7 border flex flex-col justify-between transition-all duration-300 shadow-sm ${
        isDark
          ? 'bg-[#14141B] border-[#222230] hover:border-[#353548] hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)]'
          : 'bg-[#FAFAF7] border-[#E8E7DF] hover:border-[#18181B]/20 hover:shadow-[0_20px_40px_rgba(24,24,27,0.08)]'
      }`}
    >
      {/* Glare overlay */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.4) 0%, transparent 60%)`,
          opacity: glare.opacity,
        }}
      />

      {/* Layer 1: Visual Viewport Preview */}
      <div className="mb-6 overflow-hidden rounded-2xl transition-transform duration-300 group-hover:scale-[1.01]">
        {getProjectPreview(project.id)}
      </div>

      {/* Layer 2: Metadata & Title */}
      <div className="flex-1">
        <div className="flex items-center justify-between text-xs font-mono mb-2">
          <span className="text-emerald-500 font-bold uppercase tracking-wider">
            {project.category}
          </span>
          <span className="opacity-50">PROJ {project.number}</span>
        </div>

        <h3 className={`text-xl sm:text-2xl font-serif font-bold tracking-tight mb-2 ${
          isDark ? 'text-[#F4F4F6]' : 'text-[#18181B]'
        }`}>
          {project.title}
        </h3>

        <p className={`text-xs sm:text-sm leading-relaxed mb-4 ${
          isDark ? 'text-[#A6A6B4]' : 'text-[#57575E]'
        }`}>
          {project.description}
        </p>

        {/* Key Features Preview */}
        {project.keyFeatures && (
          <div className="space-y-1 mb-5">
            {project.keyFeatures.slice(0, 2).map((feat, fIdx) => (
              <div key={fIdx} className="flex items-start gap-1.5 text-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span className={`line-clamp-1 ${isDark ? 'text-[#C8C8D4]' : 'text-[#44444C]'}`}>
                  {feat}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className={`text-[10px] font-mono px-2 py-0.5 rounded-md border ${
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

      {/* Layer 3: Prominent CTA Buttons */}
      <div
        className={`pt-4 border-t flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 ${
          isDark ? 'border-[#242432]' : 'border-[#E6E5DC]'
        }`}
      >
        {/* Live Demo CTA */}
        <a
          id={`project-cta-${project.id}`}
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => soundFX.playChime()}
          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-xs font-mono font-bold bg-emerald-500 hover:bg-emerald-400 text-white shadow-sm transition-all active:scale-95 group/btn"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>Live Demo</span>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-btn:translate-x-0.5 group-btn:-translate-y-0.5" />
        </a>

        {/* Detailed Case Study Trigger */}
        <button
          id={`project-preview-btn-${project.id}`}
          onClick={() => {
            soundFX.playTick();
            onPreview(project);
          }}
          className={`inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full border text-xs font-mono font-semibold transition-all active:scale-95 ${
            isDark
              ? 'bg-[#1D1D26] hover:bg-[#252532] border-[#353548] text-[#F4F4F6]'
              : 'bg-[#F4F4EE] hover:bg-[#EFEFE8] border-[#D4D3C7] text-[#18181B]'
          }`}
          title="Open Case Study (Problem, Solution, Role, Outcome)"
        >
          <Eye className="w-3.5 h-3.5 text-emerald-500" />
          <span>Case Study</span>
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
                03. Featured Work & Case Studies
              </span>
              <div className={`w-12 h-[1px] ${isDark ? 'bg-[#353548]' : 'bg-[#D4D3C7]'}`} />
            </div>
            <h2 className={`text-4xl sm:text-6xl md:text-7xl font-serif tracking-tight leading-[0.98] ${
              isDark ? 'text-[#F4F4F6]' : 'text-[#18181B]'
            }`}>
              Featured Projects
            </h2>
          </div>

          <div className="max-w-md space-y-2">
            <p className={`text-sm font-mono ${isDark ? 'text-[#A6A6B4]' : 'text-[#57575E]'}`}>
              5 verified public production platforms engineered by Muhammad Rizwan across educational technology, AI assistance, social platform architecture, and faith utilities.
            </p>
            <div className={`flex items-center gap-2 text-xs font-mono ${isDark ? 'text-[#F4F4F6]' : 'text-[#18181B]'}`}>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>All 5 projects actively deployed and verified</span>
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
          <div>
            <h3 className={`text-xl sm:text-2xl font-serif font-bold ${
              isDark ? 'text-[#F4F4F6]' : 'text-[#18181B]'
            }`}>
              Looking for a custom digital platform or web application?
            </h3>
            <p className={`text-xs sm:text-sm font-mono mt-1 ${isDark ? 'text-[#A6A6B4]' : 'text-[#57575E]'}`}>
              Open to collaborating with remote startups, international product teams, and educational organizations.
            </p>
          </div>

          <a
            href="#contact"
            onClick={() => soundFX.playTick()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-mono font-bold bg-[#18181B] dark:bg-[#F4F4F6] text-[#F9F9F6] dark:text-[#0C0C0F] hover:opacity-90 transition-all flex-shrink-0"
          >
            <span>Let's Discuss Opportunities</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Case Study Modal */}
      <ProjectPreviewModal
        project={selectedProject}
        onClose={handleClosePreview}
      />
    </section>
  );
}
