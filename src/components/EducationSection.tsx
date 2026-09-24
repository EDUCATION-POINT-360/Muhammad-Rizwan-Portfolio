import { useState, useEffect, useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { GraduationCap, Award, BookOpen, CheckCircle2, ArrowUpRight, Code, Sparkles, Globe, ShieldCheck } from 'lucide-react';
import { EDUCATION_DATA, LANGUAGES_DATA, CERTIFICATIONS_NOTE } from '../data/portfolioData';
import { soundFX } from '../utils/audio';
import { useTheme } from '../context/ThemeContext';

function AnimatedCounter({ targetValue, duration = 1200 }: { targetValue: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const stepTime = 16;
    const steps = Math.floor(duration / stepTime);
    const increment = targetValue / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= targetValue) {
        setCount(targetValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, targetValue, duration]);

  return <span ref={ref}>{count}%</span>;
}

interface EducationCardProps {
  edu: typeof EDUCATION_DATA[0];
  idx: number;
}

function EducationCard({ edu, idx }: EducationCardProps) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const shouldReduceMotion = useReducedMotion();
  const { isDark } = useTheme();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    setRotate({
      x: ((y - centerY) / centerY) * -4,
      y: ((x - centerX) / centerX) * 4,
    });
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: isDark ? 0.12 : 0.16,
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: idx * 0.15 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => soundFX.playTick()}
      style={{
        transform: `perspective(1100px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
      }}
      className={`relative p-8 sm:p-10 rounded-3xl border transition-all duration-300 flex flex-col justify-between overflow-hidden preserve-3d shadow-sm hover:shadow-xl ${
        isDark
          ? 'bg-[#15151C] border-[#242432] hover:border-[#353548]'
          : 'bg-[#FFFFFF] border-[#E6E5DC] hover:border-[#18181B]'
      }`}
    >
      {/* Glare */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 rounded-3xl"
        style={{
          background: `radial-gradient(circle 350px at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, ${isDark ? '0.3' : '0.85'}), transparent 80%)`,
          opacity: glare.opacity,
        }}
      />

      {/* Card Header */}
      <div style={{ transform: 'translateZ(20px)' }}>
        <div className="flex items-center justify-between mb-6">
          <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-mono font-medium border ${
            isDark
              ? 'bg-[#1D1D26] text-[#F4F4F6] border-[#353548]'
              : 'bg-[#EFEFE8] text-[#18181B] border-[#D4D3C7]/60'
          }`}>
            <GraduationCap className="w-3.5 h-3.5 text-emerald-500" />
            <span>{edu.period}</span>
          </span>
          <div className={`text-xs font-mono ${isDark ? 'text-[#747482]' : 'text-[#7E7E88]'}`}>
            MIANWALI, PAKISTAN
          </div>
        </div>

        <div className="flex items-baseline justify-between gap-4 mb-2">
          <h3 className={`text-2xl sm:text-3xl font-serif font-semibold ${
            isDark ? 'text-[#F4F4F6]' : 'text-[#18181B]'
          }`}>
            {edu.degree}
          </h3>
          <div className={`text-3xl sm:text-4xl font-serif font-bold ${
            isDark ? 'text-emerald-400' : 'text-[#18181B]'
          }`}>
            <AnimatedCounter targetValue={edu.percentage} />
          </div>
        </div>

        <div className={`text-xs font-mono font-semibold tracking-wider uppercase mb-4 ${
          isDark ? 'text-[#A6A6B4]' : 'text-[#57575E]'
        }`}>
          {edu.field}
        </div>

        {/* Progress bar visual */}
        <div className={`w-full h-1.5 rounded-full overflow-hidden mb-6 ${
          isDark ? 'bg-[#242432]' : 'bg-[#EFEFE8]'
        }`}>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${edu.percentage}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
            className="h-full rounded-full bg-emerald-500"
          />
        </div>

        <p className={`text-sm sm:text-base leading-relaxed border-l-2 pl-4 py-1 ${
          isDark ? 'border-emerald-500/50 text-[#C8C8D4]' : 'border-[#18181B] text-[#44444C]'
        }`}>
          “{edu.description}”
        </p>
      </div>

      {/* Card Footer */}
      <div
        style={{ transform: 'translateZ(25px)' }}
        className={`mt-8 pt-6 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
          isDark ? 'border-[#242432]' : 'border-[#E6E5DC]'
        }`}
      >
        <div className="flex items-center gap-1.5 text-xs font-mono text-[#7E7E88]">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
          <span>Computer Science Focus</span>
        </div>

        <a
          href="#projects"
          onClick={() => soundFX.playTick()}
          className={`inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono font-semibold border transition-all active:scale-95 group/btn ${
            isDark
              ? 'bg-[#1D1D26] hover:bg-[#F4F4F6] text-[#F4F4F6] hover:text-[#0C0C0F] border-[#353548]'
              : 'bg-[#F4F4EE] hover:bg-[#18181B] text-[#18181B] hover:text-[#F9F9F6] border-[#D4D3C7]'
          }`}
        >
          <span>View Applied Projects</span>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
        </a>
      </div>
    </motion.div>
  );
}

export default function EducationSection() {
  const { isDark } = useTheme();

  return (
    <section
      id="education"
      className={`py-24 sm:py-32 relative border-b transition-colors duration-300 ${
        isDark ? 'bg-[#101016] border-[#242432]' : 'bg-[#F4F4EE]/40 border-[#E6E5DC]/80'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-xs font-mono tracking-widest uppercase ${isDark ? 'text-[#747482]' : 'text-[#7E7E88]'}`}>
                07. Education & Credentials
              </span>
              <div className={`w-12 h-[1px] ${isDark ? 'bg-[#353548]' : 'bg-[#D4D3C7]'}`} />
            </div>
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight ${
              isDark ? 'text-[#F4F4F6]' : 'text-[#18181B]'
            }`}>
              Education & Academic Path
            </h2>
          </div>
          <p className={`text-sm font-mono max-w-sm ${isDark ? 'text-[#A6A6B4]' : 'text-[#57575E]'}`}>
            Factual grounding in Computer Science, mathematics, and technological problem solving in Mianwali, Pakistan.
          </p>
        </div>

        {/* 3D Education Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 relative mb-14">
          {EDUCATION_DATA.map((edu, idx) => (
            <EducationCard key={edu.degree} edu={edu} idx={idx} />
          ))}
        </div>

        {/* Certifications & Languages Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Certifications Card */}
          <div
            className={`p-7 rounded-3xl border transition-colors ${
              isDark ? 'bg-[#15151C] border-[#242432]' : 'bg-[#FFFFFF] border-[#E6E5DC]'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                <h3 className={`text-base font-serif font-bold tracking-tight ${
                  isDark ? 'text-[#F4F4F6]' : 'text-[#18181B]'
                }`}>
                  Professional Certifications
                </h3>
              </div>
              <span className={`text-[10px] font-mono uppercase px-2.5 py-1 rounded-full border ${
                isDark ? 'bg-[#1E1E2A] text-[#A6A6B4] border-[#303042]' : 'bg-[#EFEFE8] text-[#57575E] border-[#D4D3C7]'
              }`}>
                VERIFICATION STATUS
              </span>
            </div>
            <p className={`text-sm leading-relaxed ${isDark ? 'text-[#A6A6B4]' : 'text-[#57575E]'}`}>
              {CERTIFICATIONS_NOTE}
            </p>
            <div className={`mt-4 pt-4 border-t text-xs font-mono flex items-center gap-1.5 ${
              isDark ? 'border-[#242432] text-[#747482]' : 'border-[#E6E5DC] text-[#7E7E88]'
            }`}>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Strict compliance with authentic credentials policy</span>
            </div>
          </div>

          {/* Languages Card */}
          <div
            className={`p-7 rounded-3xl border transition-colors ${
              isDark ? 'bg-[#15151C] border-[#242432]' : 'bg-[#FFFFFF] border-[#E6E5DC]'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-emerald-500" />
                <h3 className={`text-base font-serif font-bold tracking-tight ${
                  isDark ? 'text-[#F4F4F6]' : 'text-[#18181B]'
                }`}>
                  Languages
                </h3>
              </div>
              <span className={`text-[10px] font-mono uppercase px-2.5 py-1 rounded-full border ${
                isDark ? 'bg-[#1E1E2A] text-emerald-400 border-emerald-500/30' : 'bg-[#EBF7F0] text-emerald-700 border-emerald-500/30'
              }`}>
                INTERNATIONAL COMMUNICATION
              </span>
            </div>
            <div className="space-y-3">
              {LANGUAGES_DATA.map((lang) => (
                <div key={lang.language} className="flex items-center justify-between py-1.5 border-b border-current/10">
                  <span className={`text-sm font-semibold ${isDark ? 'text-[#F4F4F6]' : 'text-[#18181B]'}`}>
                    {lang.language}
                  </span>
                  <span className={`text-xs font-mono ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
                    {lang.level}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
