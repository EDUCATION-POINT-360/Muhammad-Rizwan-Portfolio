import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowUpRight, Globe, Layers, Sparkles, CheckCircle2, ShieldCheck, Copy, Check, ExternalLink } from 'lucide-react';
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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#000000]/60 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className={`relative w-full max-w-2xl rounded-3xl border shadow-2xl p-6 sm:p-8 z-10 max-h-[90vh] overflow-y-auto transition-colors duration-200 ${
            isDark
              ? 'bg-[#15151C] border-[#2A2A38] text-[#F4F4F6]'
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
                PROJECT {project.number}
              </span>
              <span className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full border ${
                isDark
                  ? 'bg-[#1D1D26] text-[#F4F4F6] border-[#353548]'
                  : 'bg-[#EFEFE8] text-[#18181B] border-[#D4D3C7]'
              }`}>
                {project.category}
              </span>
            </div>

            <button
              onClick={onClose}
              className={`p-1.5 rounded-full transition-colors ${
                isDark
                  ? 'hover:bg-[#1D1D26] text-[#A6A6B4] hover:text-[#F4F4F6]'
                  : 'hover:bg-[#EFEFE8] text-[#57575E] hover:text-[#18181B]'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="pt-6 space-y-6">
            <div>
              <h3 className={`text-3xl font-serif font-bold tracking-tight ${
                isDark ? 'text-[#F4F4F6]' : 'text-[#18181B]'
              }`}>
                {project.title}
              </h3>
              <p className={`text-xs font-mono mt-1 uppercase ${
                isDark ? 'text-[#747482]' : 'text-[#7E7E88]'
              }`}>
                {project.theme}
              </p>
            </div>

            <p className={`text-base leading-relaxed ${
              isDark ? 'text-[#A6A6B4]' : 'text-[#57575E]'
            }`}>
              {project.description}
            </p>

            {/* Architecture Highlights */}
            <div className={`p-4 rounded-2xl border space-y-3 ${
              isDark
                ? 'bg-[#101016] border-[#242432]'
                : 'bg-[#F9F9F6] border-[#E6E5DC]'
            }`}>
              <div className={`text-xs font-mono font-bold uppercase flex items-center gap-1.5 ${
                isDark ? 'text-[#F4F4F6]' : 'text-[#18181B]'
              }`}>
                <Layers className="w-3.5 h-3.5" />
                <span>Technical Specifications & Stack</span>
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

            {/* Simulated Live Viewport Card */}
            <div className={`p-5 rounded-2xl border flex flex-col justify-between ${
              isDark
                ? 'border-[#2A2A38] bg-gradient-to-br from-[#1C1C26] to-[#121218]'
                : 'border-[#D4D3C7] bg-gradient-to-br from-[#F5F5ED] to-[#EAEAE0]'
            }`}>
              <div className={`flex items-center justify-between text-xs font-mono mb-3 ${
                isDark ? 'text-[#A6A6B4]' : 'text-[#57575E]'
              }`}>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className={`font-semibold ${isDark ? 'text-[#F4F4F6]' : 'text-[#18181B]'}`}>
                    NETLIFY LIVE DEPLOYMENT
                  </span>
                </div>
                <button
                  onClick={handleCopyLink}
                  className={`flex items-center gap-1 text-[11px] transition-colors ${
                    isDark ? 'hover:text-[#F4F4F6]' : 'hover:text-[#18181B]'
                  }`}
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copied' : 'Copy Link'}</span>
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

            {/* Bottom Actions */}
            <div className={`pt-4 border-t flex flex-col sm:flex-row gap-3 ${
              isDark ? 'border-[#242432]' : 'border-[#E6E5DC]'
            }`}>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex-1 inline-flex items-center justify-center gap-2 py-3.5 rounded-full text-xs font-semibold transition-all shadow-sm active:scale-95 group/modal-btn ${
                  isDark
                    ? 'bg-[#F4F4F6] text-[#0C0C0F] hover:bg-[#E2E2E6]'
                    : 'bg-[#18181B] text-[#F9F9F6] hover:bg-[#333338]'
                }`}
              >
                <ExternalLink className="w-4 h-4" />
                <span>Launch Live Platform</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/modal-btn:translate-x-0.5 group-hover/modal-btn:-translate-y-0.5" />
              </a>

              <button
                onClick={onClose}
                className={`px-6 py-3 rounded-full border text-xs font-medium transition-colors ${
                  isDark
                    ? 'border-[#353548] text-[#F4F4F6] hover:bg-[#1D1D26]'
                    : 'border-[#D4D3C7] text-[#18181B] hover:bg-[#EFEFE8]'
                }`}
              >
                Close Preview
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
