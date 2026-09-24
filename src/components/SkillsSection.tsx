import { motion } from 'motion/react';
import { Code, Layout, Cpu, Sparkles, Layers, CheckCircle2, Wrench, Terminal, Database, Globe } from 'lucide-react';
import { SKILLS_DATA } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';
import { soundFX } from '../utils/audio';

const CATEGORY_ICONS: Record<string, any> = {
  'Digital Product Development': Layers,
  'Web Technologies': Code,
  'Platforms & Tools': Wrench,
  'AI & Emerging Technology': Sparkles,
};

const TECH_MARQUEE = [
  'TypeScript',
  'React 19',
  'Next.js',
  'Three.js (3D WebGL)',
  'Tailwind CSS',
  'Node.js',
  'Python (AI Workflows)',
  'REST APIs',
  'Git & GitHub',
  'Vite',
  'Netlify Architecture',
  'Figma UI Design',
  'Education Technology',
  'Responsive Systems',
];

export default function SkillsSection() {
  const { isDark } = useTheme();

  return (
    <section
      id="skills"
      className={`py-24 sm:py-32 relative border-b transition-colors duration-300 overflow-hidden ${
        isDark ? 'bg-[#0C0C0F] border-[#242432]' : 'bg-[#FFFFFF] border-[#E6E5DC]/80'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-xs font-mono tracking-widest uppercase ${isDark ? 'text-[#747482]' : 'text-[#7E7E88]'}`}>
                06. Core Technical Capabilities
              </span>
              <div className={`w-12 h-[1px] ${isDark ? 'bg-[#353548]' : 'bg-[#D4D3C7]'}`} />
            </div>
            <h2 className={`text-4xl sm:text-6xl font-serif tracking-tight ${isDark ? 'text-[#F4F4F6]' : 'text-[#18181B]'}`}>
              Core Skills & Tools
            </h2>
          </div>
          <p className={`text-sm font-mono max-w-md ${isDark ? 'text-[#A6A6B4]' : 'text-[#57575E]'}`}>
            A verified technical toolkit focused on building practical, accessible digital platforms, web systems, and AI-assisted workflows.
          </p>
        </div>

        {/* 4 Skill Categories Grid with 3D Tilt & Micro-interactions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILLS_DATA.map((cat, idx) => {
            const Icon = CATEGORY_ICONS[cat.category] || Code;

            return (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ y: -6, scale: 1.02 }}
                onMouseEnter={() => soundFX.playTick()}
                className={`p-7 rounded-3xl border flex flex-col justify-between transition-all duration-300 shadow-sm relative overflow-hidden group ${
                  isDark
                    ? 'bg-[#15151C] border-[#242432] hover:border-emerald-500/50 hover:shadow-[0_16px_36px_rgba(0,0,0,0.6)]'
                    : 'bg-[#F9F9F6] border-[#E6E5DC] hover:border-emerald-500/50 hover:shadow-[0_16px_36px_rgba(24,24,27,0.08)]'
                }`}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/15 transition-all duration-300 pointer-events-none" />

                <div>
                  <div className={`w-11 h-11 rounded-2xl border flex items-center justify-center mb-5 shadow-xs transition-transform group-hover:rotate-6 ${
                    isDark
                      ? 'bg-[#1D1D26] border-[#353548] text-emerald-400'
                      : 'bg-[#FFFFFF] border-[#E6E5DC] text-[#18181B]'
                  }`}>
                    <Icon className="w-5 h-5 text-emerald-500" />
                  </div>

                  <h3 className={`text-xs font-mono font-bold tracking-wider uppercase mb-5 ${
                    isDark ? 'text-[#F4F4F6]' : 'text-[#18181B]'
                  }`}>
                    {cat.category}
                  </h3>

                  <ul className="space-y-3">
                    {cat.skills.map((skill) => (
                      <li key={skill} className={`flex items-start gap-2.5 text-sm font-medium ${
                        isDark ? 'text-[#D0D0DA]' : 'text-[#333338]'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 bg-emerald-500 group-hover:scale-125 transition-transform`} />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={`mt-8 pt-4 border-t text-[10px] font-mono flex items-center justify-between ${
                  isDark ? 'border-[#242432] text-[#747482]' : 'border-[#E6E5DC] text-[#7E7E88]'
                }`}>
                  <span>TRACK 0{idx + 1}</span>
                  <span className={`font-semibold text-emerald-500`}>
                    Verified Skill
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Animated Infinite Tech Marquee Strip */}
      <div className={`py-4 border-y overflow-hidden whitespace-nowrap relative ${
        isDark ? 'bg-[#101016] border-[#222230]' : 'bg-[#F4F4EE] border-[#E6E5DC]'
      }`}>
        <div className="flex animate-marquee gap-8 items-center">
          {[...TECH_MARQUEE, ...TECH_MARQUEE].map((tech, index) => (
            <div
              key={index}
              className="inline-flex items-center gap-2 font-mono text-xs text-[#8E8EA0] hover:text-emerald-400 transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="font-semibold">{tech}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
