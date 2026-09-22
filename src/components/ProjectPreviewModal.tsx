import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowUpRight, Globe, Layers, Sparkles, CheckCircle2, ShieldCheck, Copy, Check, ExternalLink } from 'lucide-react';
import { ProjectItem } from '../types';
import { useState } from 'react';
import { soundFX } from '../utils/audio';

interface ProjectPreviewModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export default function ProjectPreviewModal({ project, onClose }: ProjectPreviewModalProps) {
  const [copied, setCopied] = useState(false);

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
          className="fixed inset-0 bg-[#18181B]/40 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-2xl bg-[#FFFFFF] rounded-3xl border border-[#E6E5DC] shadow-[0_24px_64px_rgba(24,24,27,0.18)] p-6 sm:p-8 z-10 max-h-[90vh] overflow-y-auto"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-[#E6E5DC]">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold tracking-widest text-[#7E7E88]">
                PROJECT {project.number}
              </span>
              <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[#EFEFE8] text-[#18181B]">
                {project.category}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-[#EFEFE8] text-[#57575E] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="pt-6 space-y-6">
            <div>
              <h3 className="text-3xl font-serif font-bold text-[#18181B] tracking-tight">
                {project.title}
              </h3>
              <p className="text-xs font-mono text-[#7E7E88] mt-1 uppercase">
                {project.theme}
              </p>
            </div>

            <p className="text-base text-[#57575E] leading-relaxed">
              {project.description}
            </p>

            {/* Architecture Highlights */}
            <div className="p-4 rounded-2xl bg-[#F9F9F6] border border-[#E6E5DC] space-y-3">
              <div className="text-xs font-mono font-bold text-[#18181B] uppercase flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                <span>Technical Specifications & Stack</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs font-mono px-3 py-1 rounded-lg bg-[#FFFFFF] border border-[#D4D3C7] text-[#18181B]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Simulated Live Viewport Card */}
            <div className="p-5 rounded-2xl border border-[#D4D3C7] bg-gradient-to-br from-[#F5F5ED] to-[#EAEAE0] flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs font-mono text-[#57575E] mb-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-semibold text-[#18181B]">NETLIFY LIVE DEPLOYMENT</span>
                </div>
                <button
                  onClick={handleCopyLink}
                  className="flex items-center gap-1 text-[11px] hover:text-[#18181B] transition-colors"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copied' : 'Copy Link'}</span>
                </button>
              </div>

              <div className="text-xs font-mono text-[#18181B] font-bold bg-[#FFFFFF] px-3 py-2 rounded-xl border border-[#E6E5DC] truncate">
                {project.url}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-[#E6E5DC] flex flex-col sm:flex-row gap-3">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 rounded-full bg-[#18181B] text-[#F9F9F6] text-xs font-semibold hover:bg-[#333338] transition-all shadow-sm active:scale-95 group/modal-btn"
              >
                <ExternalLink className="w-4 h-4 text-[#F9F9F6]" />
                <span>Launch Live Platform</span>
                <ArrowUpRight className="w-4 h-4 text-[#F9F9F6] transition-transform duration-300 group-hover/modal-btn:translate-x-0.5 group-hover/modal-btn:-translate-y-0.5" />
              </a>

              <button
                onClick={onClose}
                className="px-6 py-3 rounded-full border border-[#D4D3C7] text-xs font-medium text-[#18181B] hover:bg-[#EFEFE8] transition-colors"
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
