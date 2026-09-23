import React, { useState } from 'react';
import {
  FileText,
  Download,
  ExternalLink,
  Printer,
  ZoomIn,
  ZoomOut,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Globe,
  Layers,
  Sparkles,
  Eye,
} from 'lucide-react';
import { downloadCvPdf } from '../utils/generatePdfCv';
import { soundFX } from '../utils/audio';
import { useTheme } from '../context/ThemeContext';
import { PERSONAL_INFO } from '../data/portfolioData';

interface CvDocumentViewerProps {
  onOpenModal?: () => void;
  isModalView?: boolean;
}

export default function CvDocumentViewer({ onOpenModal, isModalView = false }: CvDocumentViewerProps) {
  const [viewMode, setViewMode] = useState<'pic' | 'pdf'>('pic');
  const [activePage, setActivePage] = useState<1 | 2>(1);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const { isDark } = useTheme();

  const handleDownload = () => {
    soundFX.playChime();
    downloadCvPdf();
  };

  const handleOpenPdfNewTab = () => {
    soundFX.playTick();
    window.open('/cv/Muhammad-Rizwan-CV.pdf', '_blank');
  };

  const handlePrint = () => {
    soundFX.playTick();
    window.print();
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 15, 145));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 15, 80));
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Modern Document Control Bar */}
      <div
        className={`w-full max-w-4xl mb-6 p-3 sm:p-4 rounded-2xl border flex flex-wrap items-center justify-between gap-3 shadow-sm transition-colors ${
          isDark ? 'bg-[#15151E] border-[#262638]' : 'bg-[#FFFFFF] border-[#E2E2D6]'
        }`}
      >
        {/* Left: Format Switcher (Pic vs PDF) */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-black/5 dark:bg-white/5 border border-current/10">
          <button
            onClick={() => {
              soundFX.playTick();
              setViewMode('pic');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
              viewMode === 'pic'
                ? isDark
                  ? 'bg-emerald-500 text-white shadow-xs font-bold'
                  : 'bg-[#18181B] text-white shadow-xs font-bold'
                : isDark
                ? 'text-[#A6A6B4] hover:text-white'
                : 'text-[#57575E] hover:text-[#18181B]'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Document Pic View</span>
          </button>

          <button
            onClick={() => {
              soundFX.playTick();
              setViewMode('pdf');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
              viewMode === 'pdf'
                ? isDark
                  ? 'bg-emerald-500 text-white shadow-xs font-bold'
                  : 'bg-[#18181B] text-white shadow-xs font-bold'
                : isDark
                ? 'text-[#A6A6B4] hover:text-white'
                : 'text-[#57575E] hover:text-[#18181B]'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Interactive PDF</span>
          </button>
        </div>

        {/* Center: Page Switcher & Zoom (Only active in Pic mode) */}
        {viewMode === 'pic' && (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 border border-current/10 rounded-xl px-2 py-1 text-xs font-mono">
              <button
                disabled={activePage === 1}
                onClick={() => {
                  soundFX.playTick();
                  setActivePage(1);
                }}
                className={`p-1 rounded transition-opacity ${activePage === 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-current/10'}`}
                title="Page 1"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <span className="font-semibold px-1">
                Page {activePage} of 2
              </span>
              <button
                disabled={activePage === 2}
                onClick={() => {
                  soundFX.playTick();
                  setActivePage(2);
                }}
                className={`p-1 rounded transition-opacity ${activePage === 2 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-current/10'}`}
                title="Page 2"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-1 border border-current/10 rounded-xl px-2 py-1 text-xs font-mono">
              <button onClick={handleZoomOut} className="p-1 hover:bg-current/10 rounded" title="Zoom Out">
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="w-10 text-center">{zoomLevel}%</span>
              <button onClick={handleZoomIn} className="p-1 hover:bg-current/10 rounded" title="Zoom In">
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Right: Actions (Download PDF & Open PDF) */}
        <div className="flex items-center gap-2">
          {!isModalView && onOpenModal && (
            <button
              onClick={() => {
                soundFX.playTick();
                onOpenModal();
              }}
              className={`p-2 rounded-xl border text-xs transition-colors ${
                isDark ? 'border-[#353548] text-[#D0D0DA] hover:bg-[#1D1D28]' : 'border-[#D4D3C7] text-[#333338] hover:bg-[#F2F2EC]'
              }`}
              title="Expand Full Screen Document Reader"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={handleOpenPdfNewTab}
            className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-mono font-medium transition-colors ${
              isDark ? 'border-[#353548] text-[#D0D0DA] hover:bg-[#1D1D28]' : 'border-[#D4D3C7] text-[#333338] hover:bg-[#F2F2EC]'
            }`}
            title="Open Raw PDF in New Tab"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open PDF</span>
          </button>

          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold bg-emerald-500 hover:bg-emerald-400 text-white shadow-sm transition-all active:scale-95"
            title="Download Official PDF Document"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {/* Main Document Viewer Container */}
      <div className="w-full flex justify-center overflow-x-auto pb-6">
        {viewMode === 'pdf' ? (
          /* Native PDF Document Embed with Fallback */
          <div
            className={`w-full max-w-4xl h-[780px] rounded-2xl border overflow-hidden shadow-2xl transition-colors ${
              isDark ? 'bg-[#111116] border-[#2A2A3C]' : 'bg-[#EAEAE0] border-[#D4D3C7]'
            }`}
          >
            <object
              data="/cv/Muhammad-Rizwan-CV.pdf#toolbar=1&navpanes=0&scrollbar=1&view=FitH"
              type="application/pdf"
              className="w-full h-full"
            >
              <iframe
                src="/cv/Muhammad-Rizwan-CV.pdf#toolbar=1&navpanes=0&scrollbar=1&view=FitH"
                title="Muhammad Rizwan Official PDF CV"
                className="w-full h-full border-0"
              />
            </object>
          </div>
        ) : (
          /* High-Definition Physical Document Picture (Pic) View */
          <div
            style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
            className="transition-transform duration-200"
          >
            <div
              className={`w-[780px] min-h-[1100px] p-12 sm:p-14 rounded-xl border shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] relative select-text transition-colors ${
                isDark ? 'bg-[#181820] text-[#EAEAEF] border-[#2C2C3E]' : 'bg-[#FFFFFF] text-[#18181B] border-[#D4D3C7]'
              }`}
            >
              {/* Paper Watermark & Security Stamp */}
              <div className="absolute top-10 right-10 flex flex-col items-end opacity-85 select-none pointer-events-none">
                <div className="flex items-center gap-1.5 text-[10px] font-mono tracking-widest uppercase font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-md bg-emerald-500/5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>VERIFIED ATS CV • 2026</span>
                </div>
                <div className="text-[9px] font-mono opacity-50 mt-1">
                  OFFICIAL ARCHIVAL DOCUMENT
                </div>
              </div>

              {activePage === 1 ? (
                /* ================= PAGE 1 ================= */
                <div className="space-y-6">
                  {/* Document Header */}
                  <div className="pb-5 border-b-2 border-current/15">
                    <h1 className="text-3xl font-serif font-bold tracking-tight">
                      MUHAMMAD RIZWAN
                    </h1>
                    <div className="text-sm font-sans font-medium text-emerald-600 dark:text-emerald-400 mt-1">
                      Founder • Educationist • Digital Architect | Digital Product Builder
                    </div>
                    <div className="text-[11px] font-mono opacity-75 mt-2 flex flex-wrap gap-x-4 gap-y-1">
                      <span>Email: educationpoint0360@gmail.com</span>
                      <span>•</span>
                      <span>Phone: +92 331 4220506</span>
                      <span>•</span>
                      <span>Location: Mianwali, Pakistan</span>
                    </div>
                    <div className="text-[11px] font-mono opacity-75 mt-1 flex flex-wrap gap-x-4 gap-y-1">
                      <span>Portfolio: rizwanep.netlify.app</span>
                      <span>•</span>
                      <span>Platform: educationpoint360.netlify.app</span>
                    </div>
                  </div>

                  {/* Section: Professional Summary */}
                  <div>
                    <h2 className="text-xs font-mono font-bold tracking-[0.2em] uppercase pb-1.5 border-b border-current/10 mb-2.5 text-emerald-600 dark:text-emerald-400">
                      01. PROFESSIONAL SUMMARY
                    </h2>
                    <p className="text-xs leading-relaxed opacity-90 text-justify">
                      Founder, digital product builder, and educationist with practical expertise in designing and engineering student-focused web platforms, AI-assisted academic utilities, and modern web applications. Proven ability to take product concepts from initial architecture to live production deployment with responsive user experience, high reliability, and clean execution. Motivated to contribute to high-performing remote teams, international startups, and digital product organizations.
                    </p>
                  </div>

                  {/* Section: Core Technical Disciplines */}
                  <div>
                    <h2 className="text-xs font-mono font-bold tracking-[0.2em] uppercase pb-1.5 border-b border-current/10 mb-2.5 text-emerald-600 dark:text-emerald-400">
                      02. CORE SKILLS & TECHNICAL TOOLKIT
                    </h2>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="p-2.5 rounded-lg border border-current/10 bg-current/5">
                        <div className="font-mono font-bold text-[11px] mb-1">Digital Product Development</div>
                        <p className="text-[11px] opacity-80 leading-relaxed">
                          Concept ideation, web architecture, feature roadmapping, user experience planning, iterative delivery.
                        </p>
                      </div>
                      <div className="p-2.5 rounded-lg border border-current/10 bg-current/5">
                        <div className="font-mono font-bold text-[11px] mb-1">Web Technologies</div>
                        <p className="text-[11px] opacity-80 leading-relaxed">
                          HTML5, modern CSS3, JavaScript (ES6+), responsive design, Progressive Web Apps (PWA), REST APIs.
                        </p>
                      </div>
                      <div className="p-2.5 rounded-lg border border-current/10 bg-current/5">
                        <div className="font-mono font-bold text-[11px] mb-1">Platforms & Infrastructure</div>
                        <p className="text-[11px] opacity-80 leading-relaxed">
                          Supabase, GitHub, Netlify CI/CD, Google Drive integration, OpenRouter / AI API endpoints.
                        </p>
                      </div>
                      <div className="p-2.5 rounded-lg border border-current/10 bg-current/5">
                        <div className="font-mono font-bold text-[11px] mb-1">AI & Emerging Systems</div>
                        <p className="text-[11px] opacity-80 leading-relaxed">
                          AI-powered web applications, API integrations, prompt engineering, AI-assisted development workflows.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Section: Founder & Builder Experience */}
                  <div>
                    <h2 className="text-xs font-mono font-bold tracking-[0.2em] uppercase pb-1.5 border-b border-current/10 mb-2.5 text-emerald-600 dark:text-emerald-400">
                      03. FOUNDER EXPERIENCE & INDEPENDENT INITIATIVES
                    </h2>
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-baseline justify-between text-xs font-bold">
                          <span>Founder & Owner — Education Point</span>
                          <span className="font-mono text-[11px] opacity-75">2024 — Present | Mianwali, PK</span>
                        </div>
                        <div className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 mt-0.5">
                          Live Portal: https://educationpoint360.netlify.app/
                        </div>
                        <ul className="list-disc list-inside text-xs mt-1.5 space-y-1 opacity-85">
                          <li>Conceptualized, built, and launched Education Point to make structured academic resources accessible for matric, intermediate, and entry-test students.</li>
                          <li>Architected clean navigation directories organizing notes, past papers, pairing schemes, MCQs, and model exam series.</li>
                          <li>Maintained complete end-to-end operational lifecycle: web design, content structuring, hosting, and student community outreach.</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Section: Academic Foundation */}
                  <div>
                    <h2 className="text-xs font-mono font-bold tracking-[0.2em] uppercase pb-1.5 border-b border-current/10 mb-2.5 text-emerald-600 dark:text-emerald-400">
                      04. EDUCATION & ACADEMIC CREDENTIALS
                    </h2>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-baseline justify-between">
                        <span className="font-bold">Intermediate in Computer Science (ICS)</span>
                        <span className="font-mono text-[11px] opacity-75">2023 — 2025 | Completed • 70%</span>
                      </div>
                      <div className="flex items-baseline justify-between">
                        <span className="font-bold">Secondary School Certificate (Matric — Computer Science)</span>
                        <span className="font-mono text-[11px] opacity-75">2021 — 2023 | Distinction • 85%</span>
                      </div>
                    </div>
                  </div>

                  {/* Document Footer */}
                  <div className="pt-6 border-t border-current/10 flex items-center justify-between text-[10px] font-mono opacity-60">
                    <span>Muhammad Rizwan — Curriculum Vitae</span>
                    <span>Document Page 1 of 2</span>
                  </div>
                </div>
              ) : (
                /* ================= PAGE 2 ================= */
                <div className="space-y-6">
                  {/* Header Sub-bar */}
                  <div className="pb-4 border-b border-current/15 flex items-center justify-between">
                    <div>
                      <div className="text-lg font-serif font-bold">MUHAMMAD RIZWAN</div>
                      <div className="text-xs font-mono opacity-70">Curriculum Vitae — Verified Project Portfolio & Scope</div>
                    </div>
                    <div className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      DOCUMENT PAGE 2 / 2
                    </div>
                  </div>

                  {/* Section: Verified Production Projects */}
                  <div>
                    <h2 className="text-xs font-mono font-bold tracking-[0.2em] uppercase pb-1.5 border-b border-current/10 mb-2.5 text-emerald-600 dark:text-emerald-400">
                      05. VERIFIED PRODUCTION DEPLOYMENTS
                    </h2>
                    <div className="space-y-3.5 text-xs">
                      <div className="p-3 rounded-lg border border-current/10 bg-current/5">
                        <div className="flex items-baseline justify-between font-bold">
                          <span>Education Point AI (Academic Doubt Assistant)</span>
                          <span className="font-mono text-[11px] opacity-75">edupointai.netlify.app</span>
                        </div>
                        <p className="mt-1 opacity-85 leading-relaxed text-[11px]">
                          Interactive AI study companion providing structured explanations, doubt clarification, and conceptual breakdowns for secondary students using modern AI endpoint streaming.
                        </p>
                      </div>

                      <div className="p-3 rounded-lg border border-current/10 bg-current/5">
                        <div className="flex items-baseline justify-between font-bold">
                          <span>Education Point Courses (Modular Learning Platform)</span>
                          <span className="font-mono text-[11px] opacity-75">epcourse.netlify.app</span>
                        </div>
                        <p className="mt-1 opacity-85 leading-relaxed text-[11px]">
                          E-learning interface offering structured modular tutorials, knowledge paths, and self-paced technical learning tracks.
                        </p>
                      </div>

                      <div className="p-3 rounded-lg border border-current/10 bg-current/5">
                        <div className="flex items-baseline justify-between font-bold">
                          <span>SoulBook (Modern Social Architecture Concept)</span>
                          <span className="font-mono text-[11px] opacity-75">soulbook.netlify.app</span>
                        </div>
                        <p className="mt-1 opacity-85 leading-relaxed text-[11px]">
                          Social interaction prototype featuring user profiles, dynamic post creation, real-time reactive feedback, and modern web UI state architecture.
                        </p>
                      </div>

                      <div className="p-3 rounded-lg border border-current/10 bg-current/5">
                        <div className="flex items-baseline justify-between font-bold">
                          <span>NUR Islamic (Faith Utility Progressive Web App)</span>
                          <span className="font-mono text-[11px] opacity-75">nurislamic.netlify.app</span>
                        </div>
                        <p className="mt-1 opacity-85 leading-relaxed text-[11px]">
                          Offline-first spiritual utility offering Quran verses, authentic Hadith, customizable digital tasbeeh counter, and prayer times with zero advertisements.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Section: Languages & Global Communication */}
                  <div>
                    <h2 className="text-xs font-mono font-bold tracking-[0.2em] uppercase pb-1.5 border-b border-current/10 mb-2.5 text-emerald-600 dark:text-emerald-400">
                      06. LANGUAGES & GLOBAL COMMUNICATION
                    </h2>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="p-2.5 rounded-lg border border-current/10">
                        <span className="font-bold">English:</span> Professional Working Proficiency (Technical Documentation, Written & Spoken Collaboration)
                      </div>
                      <div className="p-2.5 rounded-lg border border-current/10">
                        <span className="font-bold">Urdu:</span> Native / Bilingual Proficiency
                      </div>
                    </div>
                  </div>

                  {/* Section: Target Roles & International Scope */}
                  <div>
                    <h2 className="text-xs font-mono font-bold tracking-[0.2em] uppercase pb-1.5 border-b border-current/10 mb-2.5 text-emerald-600 dark:text-emerald-400">
                      07. SUITABLE ROLES & AVAILABILITY
                    </h2>
                    <p className="text-xs leading-relaxed opacity-90">
                      Available for international remote positions, digital product development, frontend engineering internships, contract engagements, and EdTech initiatives. Adaptable to multiple global time zones with transparent asynchronous communication.
                    </p>
                  </div>

                  {/* Document Footer */}
                  <div className="pt-8 border-t border-current/10 flex items-center justify-between text-[10px] font-mono opacity-60">
                    <span>Muhammad Rizwan — Think Digital. Build Future.</span>
                    <span>Document Page 2 of 2 • End of Document</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Pagination controls for bottom */}
      {viewMode === 'pic' && (
        <div className="flex items-center gap-3 mt-4">
          <button
            onClick={() => {
              soundFX.playTick();
              setActivePage(1);
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all ${
              activePage === 1
                ? isDark ? 'bg-emerald-500 text-white font-bold' : 'bg-[#18181B] text-white font-bold'
                : 'border border-current/20 opacity-70 hover:opacity-100'
            }`}
          >
            Sheet 01 (Profile & Experience)
          </button>

          <button
            onClick={() => {
              soundFX.playTick();
              setActivePage(2);
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all ${
              activePage === 2
                ? isDark ? 'bg-emerald-500 text-white font-bold' : 'bg-[#18181B] text-white font-bold'
                : 'border border-current/20 opacity-70 hover:opacity-100'
            }`}
          >
            Sheet 02 (Deployments & Credentials)
          </button>
        </div>
      )}
    </div>
  );
}
