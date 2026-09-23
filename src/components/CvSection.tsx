import { motion } from 'motion/react';
import { Download, Eye, FileText, CheckCircle2, ShieldCheck, Printer, ArrowUpRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { downloadCvPdf } from '../utils/generatePdfCv';
import { soundFX } from '../utils/audio';
import { useTheme } from '../context/ThemeContext';
import CvDocumentViewer from './CvDocumentViewer';

interface CvSectionProps {
  onOpenCvModal: () => void;
}

export default function CvSection({ onOpenCvModal }: CvSectionProps) {
  const { isDark } = useTheme();

  return (
    <section
      id="cv"
      className={`py-24 sm:py-32 relative border-b transition-colors duration-300 ${
        isDark ? 'bg-[#0E0E12] border-[#242432]' : 'bg-[#F4F4EE] border-[#E6E5DC]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Human Editorial Numbering Header (anti-slop) */}
        <div className="flex items-center gap-2 mb-4">
          <span className={`text-xs font-mono tracking-widest uppercase ${isDark ? 'text-[#747482]' : 'text-[#7E7E88]'}`}>
            08. Credentials & Curriculum Vitae
          </span>
          <div className={`w-12 h-[1px] ${isDark ? 'bg-[#353548]' : 'bg-[#D4D3C7]'}`} />
        </div>

        {/* Section Heading Block */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className={`text-xs font-bold tracking-[0.25em] uppercase mb-3 ${isDark ? 'text-[#747482]' : 'text-[#7E7E88]'}`}>
              OFFICIAL CURRICULUM VITAE
            </h2>
            <h3 className={`text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight ${
              isDark ? 'text-[#F4F4F6]' : 'text-[#18181B]'
            }`}>
              Professional Profile & Credentials
            </h3>
            <p className={`mt-3 text-sm sm:text-base max-w-2xl font-sans ${isDark ? 'text-[#A6A6B4]' : 'text-[#57575E]'}`}>
              Presented in official document formats (Interactive PDF & High-Definition Document Picture). Engineered for international employers, foreign founders, remote engineering teams, and EdTech product startups.
            </p>
          </div>

          {/* Quick verification highlights (unboxed metadata, zero-pill discipline) */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-xs font-mono opacity-80">
            <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>ATS Compliant Format</span>
            </div>
            <span className="hidden sm:inline opacity-30">·</span>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Verified Qualifications</span>
            </div>
            <span className="hidden sm:inline opacity-30">·</span>
            <span>2 Pages (A4 Standard)</span>
          </div>
        </div>

        {/* Embedded Authentic Document Viewer (PDF or Pic View) */}
        <div className="mt-8">
          <CvDocumentViewer onOpenModal={onOpenCvModal} />
        </div>
      </div>
    </section>
  );
}
