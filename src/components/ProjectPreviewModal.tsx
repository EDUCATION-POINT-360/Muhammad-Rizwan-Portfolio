import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ArrowUpRight,
  Globe,
  Layers,
  Sparkles,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  Target,
  Lightbulb,
  CheckCheck,
  Cpu,
  UserCheck,
  TrendingUp,
  Github,
} from 'lucide-react';
import { ProjectItem } from '../types';
import { useState } from 'react';
import { soundFX } from '../utils/audio';
import { useTheme } from '../context/ThemeContext';

interface ProjectPreviewModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export default function ProjectPreviewModal({ project, onClose }: ProjectPreviewModalProps) {
  const [copied, setCopied] = useState(false);
  const { isDark } = useTheme();

  if (!project) return null;

  const handleCopyLink = () => {
    soundFX.playTick();
    navigator.clipboard.writeText(project.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#000000]/75 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className={`relative w-full max-w-3xl rounded-3xl border shadow-2xl p-6 sm:p-9 z-10 max-h-[92vh] overflow-y-auto transition-colors duration-200 ${
            isDark
              ? 'bg-[#14141B] border-[#2A2A38] text-[#F4F4F6]'
              : 'bg-[#FFFFFF] border-[#E6E5DC] text-[#18181B]'
          }`}
        >
          {/* Top Bar */}
          <div className={`flex items-center justify-between pb-4 border-b ${
            isDark ? 'border-[#242432]' : 'border-[#E6E5DC]'
          }`}>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-mono font-bold tracking-widest ${
                isDark ? 'text-[#747482]' : 'text-[#7E7E88]'
              }`}>
                CASE STUDY {project.number}
              </span>
              <span className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full border ${
                isDark
                  ? 'bg-[#1D1D26] text-emerald-400 border-emerald-500/30'
                  : 'bg-[#EFEFE8] text-emerald-700 border-emerald-500/30'
              }`}>
                {project.category}
              </span>
            </div>

            <button
              onClick={onClose}
              className={`p-2 rounded-full transition-colors ${
                isDark
                  ? 'hover:bg-[#1D1D26] text-[#A6A6B4] hover:text-[#F4F4F6]'
                  : 'hover:bg-[#EFEFE8] text-[#57575E] hover:text-[#18181B]'
              }`}
              aria-label="Close Case Study"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="pt-6 space-y-7">
            {/* Title & Headline */}
            <div>
              <h3 className={`text-3xl sm:text-4xl font-serif font-bold tracking-tight ${
                isDark ? 'text-[#F4F4F6]' : 'text-[#18181B]'
              }`}>
                {project.title}
              </h3>
              <p className={`text-xs font-mono mt-1 uppercase text-emerald-500 font-semibold`}>
                {project.theme}
              </p>
              <p className={`text-sm sm:text-base leading-relaxed mt-3 ${
                isDark ? 'text-[#C8C8D4]' : 'text-[#44444C]'
              }`}>
                {project.description}
              </p>
            </div>

            {/* Case Study Grid: Problem & Concept */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.problem && (
                <div className={`p-4 rounded-2xl border space-y-1.5 ${
                  isDark ? 'bg-[#181822] border-[#2E2E3E]' : 'bg-[#FAFAF7] border-[#E8E7DF]'
                }`}>
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-500">
                    <Target className="w-3.5 h-3.5" />
                    <span>01. The Problem</span>
                  </div>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-[#D0D0DA]' : 'text-[#505058]'}`}>
                    {project.problem}
                  </p>
                </div>
              )}

              {project.concept && (
                <div className={`p-4 rounded-2xl border space-y-1.5 ${
                  isDark ? 'bg-[#181822] border-[#2E2E3E]' : 'bg-[#FAFAF7] border-[#E8E7DF]'
                }`}>
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-sky-500">
                    <Lightbulb className="w-3.5 h-3.5" />
                    <span>02. The Concept</span>
                  </div>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-[#D0D0DA]' : 'text-[#505058]'}`}>
                    {project.concept}
                  </p>
                </div>
              )}
            </div>

            {/* Solution & My Role */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.solution && (
                <div className={`p-4 rounded-2xl border space-y-1.5 ${
                  isDark ? 'bg-[#181822] border-[#2E2E3E]' : 'bg-[#FAFAF7] border-[#E8E7DF]'
                }`}>
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-500">
                    <CheckCheck className="w-3.5 h-3.5" />
                    <span>03. The Architecture & Solution</span>
                  </div>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-[#D0D0DA]' : 'text-[#505058]'}`}>
                    {project.solution}
                  </p>
                </div>
              )}

              {project.role && (
                <div className={`p-4 rounded-2xl border space-y-1.5 ${
                  isDark ? 'bg-[#181822] border-[#2E2E3E]' : 'bg-[#FAFAF7] border-[#E8E7DF]'
                }`}>
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-purple-400">
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>04. Role & Contributions</span>
                  </div>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-[#D0D0DA]' : 'text-[#505058]'}`}>
                    {project.role}
                  </p>
                </div>
              )}
            </div>

            {/* Key Features */}
            {project.keyFeatures && project.keyFeatures.length > 0 && (
              <div className={`p-5 rounded-2xl border space-y-3 ${
                isDark ? 'bg-[#181822] border-[#2E2E3E]' : 'bg-[#FAFAF7] border-[#E8E7DF]'
              }`}>
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-500 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Key Features & Functional Highlights</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {project.keyFeatures.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2 text-xs">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className={isDark ? 'text-[#D0D0DA]' : 'text-[#44444C]'}>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technology Stack */}
            <div className={`p-4 rounded-2xl border space-y-2.5 ${
              isDark ? 'bg-[#101016] border-[#242432]' : 'bg-[#F9F9F6] border-[#E6E5DC]'
            }`}>
              <div className="text-xs font-mono font-bold uppercase flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-emerald-500" />
                <span>Technologies & Implementation</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((t) => (
                  <span
                    key={t}
                    className={`text-xs font-mono px-3 py-1 rounded-lg border ${
                      isDark
                        ? 'bg-[#1D1D26] border-[#353548] text-[#F4F4F6]'
                        : 'bg-[#FFFFFF] border-[#D4D3C7] text-[#18181B]'
                    }`}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Factual Outcome */}
            {project.outcome && (
              <div className={`p-4 rounded-2xl border space-y-1.5 ${
                isDark ? 'bg-[#141F1A] border-emerald-500/30' : 'bg-[#EBF7F0] border-emerald-500/30'
              }`}>
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>FACTUAL OUTCOME & VALUE</span>
                </div>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-[#CDEFD9]' : 'text-[#1E4620]'}`}>
                  {project.outcome}
                </p>
              </div>
            )}

            {/* Live Deployment Card */}
            <div className={`p-4 rounded-2xl border flex flex-col justify-between ${
              isDark
                ? 'border-[#2A2A38] bg-gradient-to-br from-[#1C1C26] to-[#121218]'
                : 'border-[#D4D3C7] bg-gradient-to-br from-[#F5F5ED] to-[#EAEAE0]'
            }`}>
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className={`font-semibold ${isDark ? 'text-[#F4F4F6]' : 'text-[#18181B]'}`}>
                    PRODUCTION DEPLOYMENT URL
                  </span>
                </div>
                <button
                  onClick={handleCopyLink}
                  className={`flex items-center gap-1 text-[11px] transition-colors ${
                    isDark ? 'hover:text-[#F4F4F6]' : 'hover:text-[#18181B]'
                  }`}
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copied' : 'Copy URL'}</span>
                </button>
              </div>

              <div className={`text-xs font-mono font-bold px-3 py-2 rounded-xl border truncate ${
                isDark
                  ? 'bg-[#15151C] text-[#F4F4F6] border-[#2A2A38]'
                  : 'bg-[#FFFFFF] text-[#18181B] border-[#E6E5DC]'
              }`}>
                {project.url}
              </div>
            </div>

            {/* Bottom Action CTAs */}
            <div className={`pt-4 border-t flex flex-col sm:flex-row gap-3 ${
              isDark ? 'border-[#242432]' : 'border-[#E6E5DC]'
            }`}>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full text-xs font-mono font-bold bg-emerald-500 hover:bg-emerald-400 text-white shadow-md transition-all active:scale-95 group/btn"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Launch Live Platform</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-btn:translate-x-0.5 group-btn:-translate-y-0.5" />
              </a>

              <a
                href={`mailto:educationpoint0360@gmail.com?subject=Inquiry regarding ${encodeURIComponent(project.title)}`}
                className={`inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full border text-xs font-mono font-medium transition-colors ${
                  isDark
                    ? 'border-[#353548] text-[#F4F4F6] hover:bg-[#1D1D26]'
                    : 'border-[#D4D3C7] text-[#18181B] hover:bg-[#EFEFE8]'
                }`}
              >
                <span>Discuss Project</span>
              </a>

              <button
                onClick={onClose}
                className={`px-5 py-3 rounded-full border text-xs font-mono font-medium transition-colors ${
                  isDark
                    ? 'border-[#353548] text-[#A6A6B4] hover:bg-[#1D1D26]'
                    : 'border-[#D4D3C7] text-[#57575E] hover:bg-[#EFEFE8]'
                }`}
              >
                Close Case Study
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
