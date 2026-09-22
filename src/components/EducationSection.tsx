import { useState, useEffect, useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { GraduationCap, Award, BookOpen, CheckCircle2, ArrowUpRight, Code, Sparkles } from 'lucide-react';
import { EDUCATION_DATA } from '../data/portfolioData';
import { soundFX } from '../utils/audio';

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
      opacity: 0.15,
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
      className="relative p-8 sm:p-10 rounded-3xl bg-[#FFFFFF] border border-[#E6E5DC] hover:border-[#18181B] shadow-[0_8px_30px_rgba(24,24,27,0.03)] hover:shadow-[0_16px_40px_rgba(24,24,27,0.08)] transition-all duration-300 flex flex-col justify-between overflow-hidden preserve-3d"
    >
      {/* Dynamic Specular Light Glare */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 rounded-3xl"
        style={{
          background: `radial-gradient(circle 350px at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.85), transparent 80%)`,
          opacity: glare.opacity,
        }}
      />

      {/* Card Header */}
      <div style={{ transform: 'translateZ(20px)' }}>
        <div className="flex items-center justify-between mb-6">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EFEFE8] text-[11px] font-mono font-medium text-[#18181B] border border-[#D4D3C7]/60">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>{edu.period}</span>
          </span>
          <div className="text-xs font-mono text-[#7E7E88]">MIANWALI, PAKISTAN</div>
        </div>

        <div className="flex items-baseline justify-between gap-4 mb-2">
          <h3 className="text-2xl sm:text-3xl font-serif font-semibold text-[#18181B]">
            {edu.degree}
          </h3>
          <div className="text-3xl sm:text-4xl font-serif font-bold text-[#18181B]">
            <AnimatedCounter targetValue={edu.percentage} />
          </div>
        </div>

        <div className="text-xs font-mono font-semibold tracking-wider text-[#57575E] uppercase mb-4">
          {edu.field}
        </div>

        {/* Progress bar visual */}
        <div className="w-full h-1.5 bg-[#EFEFE8] rounded-full overflow-hidden mb-6">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${edu.percentage}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
            className="h-full bg-[#18181B] rounded-full"
          />
        </div>

        <p className="text-base text-[#57575E] leading-relaxed italic border-l-2 border-[#18181B] pl-4 py-1">
          «{edu.description}»
        </p>
      </div>

      {/* Card Footer with CTA Button & Lucide Icons */}
      <div
        style={{ transform: 'translateZ(25px)' }}
        className="mt-8 pt-6 border-t border-[#E6E5DC] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div className="flex items-center gap-1.5 text-xs font-mono text-[#7E7E88]">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>Computer Science Focus</span>
        </div>

        <a
          href="#projects"
          onClick={() => soundFX.playTick()}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#F4F4EE] hover:bg-[#18181B] text-[#18181B] hover:text-[#F9F9F6] text-xs font-mono font-semibold border border-[#D4D3C7] transition-all duration-200 active:scale-95 group/btn"
        >
          <span>View Applied Projects</span>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
        </a>
      </div>
    </motion.div>
  );
}

export default function EducationSection() {
  return (
    <section id="education" className="py-24 sm:py-32 relative border-b border-[#E6E5DC]/80 bg-[#F4F4EE]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-mono tracking-widest text-[#7E7E88] uppercase">
                02 // ACADEMIC FOUNDATION
              </span>
              <div className="w-12 h-[1px] bg-[#D4D3C7]" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#18181B] tracking-tight">
              Education & Academic Path
            </h2>
          </div>
          <p className="text-sm font-mono text-[#57575E] max-w-sm">
            Rigorous grounding in Computer Science, mathematics, and technological problem solving in Mianwali.
          </p>
        </div>

        {/* Enhanced 3D Education Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 relative">
          {EDUCATION_DATA.map((edu, idx) => (
            <EducationCard key={edu.degree} edu={edu} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
