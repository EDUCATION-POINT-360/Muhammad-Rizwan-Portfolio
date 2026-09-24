import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download, ExternalLink, Printer } from 'lucide-react';
import { downloadCvPdf } from '../utils/generatePdfCv';
import { soundFX } from '../utils/audio';
import { useTheme } from '../context/ThemeContext';
import CvDocumentViewer from './CvDocumentViewer';
import { PERSONAL_INFO } from '../data/portfolioData';

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CvModal({ isOpen, onClose }: CvModalProps) {
  const { isDark } = useTheme();

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleDownload = () => {
    soundFX.playChime();
    downloadCvPdf();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-xl -z-10"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className={`relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-3xl border shadow-2xl overflow-hidden ${
              isDark
                ? 'bg-[#0E0E14] border-[#2A2A3C] text-[#F4F4F6]'
                : 'bg-[#F8F8F2] border-[#D4D3C7] text-[#18181B]'
            }`}
          >
            {/* Modal Header */}
            <div className={`p-4 sm:p-5 border-b flex items-center justify-between gap-4 ${
              isDark ? 'border-[#242436] bg-[#12121A]' : 'border-[#E2E2D6] bg-[#FFFFFF]'
            }`}>
              <div>
                <h3 className="text-base sm:text-lg font-serif font-bold tracking-tight">
                  Muhammad Rizwan — Official Curriculum Vitae
                </h3>
                <p className="text-xs font-mono opacity-70">
                  Document View (PDF & High-Resolution Sheet Format)
                </p>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href="/cv/Muhammad-Rizwan-CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFX.playTick()}
                  className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono font-medium transition-colors ${
                    isDark ? 'border-[#353548] text-[#D0D0DA] hover:bg-[#1D1D28]' : 'border-[#D4D3C7] text-[#333338] hover:bg-[#F2F2EC]'
                  }`}
                  title="Open Raw PDF File in Browser"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open PDF</span>
                </a>

                <button
                  onClick={handleDownload}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-mono font-bold bg-emerald-500 hover:bg-emerald-400 text-white shadow-xs transition-all"
                  title="Download PDF"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </button>

                <button
                  onClick={() => {
                    soundFX.playTick();
                    onClose();
                  }}
                  className={`p-2 rounded-xl border transition-colors ${
                    isDark ? 'border-[#353548] text-[#D0D0DA] hover:bg-[#1D1D28]' : 'border-[#D4D3C7] text-[#333338] hover:bg-[#F2F2EC]'
                  }`}
                  aria-label="Close CV Viewer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Body: The Document Viewer */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex justify-center">
              <CvDocumentViewer isModalView={true} />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
