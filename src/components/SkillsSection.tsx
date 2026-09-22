import { motion } from 'motion/react';
import { Code, Layout, Cpu, Share2, Check } from 'lucide-react';
import { SKILLS_DATA } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';

const CATEGORY_ICONS = {
  'WEB DEVELOPMENT': Code,
  'UI/UX & DESIGN': Layout,
  'TECHNOLOGY': Cpu,
  'DIGITAL': Share2,
};

export default function SkillsSection() {
  const { isDark } = useTheme();

  return (
    <section
      id="skills"
      className={`py-24 sm:py-32 relative border-b transition-colors duration-300 ${
        isDark ? 'bg-[#0C0C0F] border-[#242432]' : 'bg-[#FFFFFF] border-[#E6E5DC]/80'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-xs font-mono tracking-widest uppercase ${isDark ? 'text-[#747482]' : 'text-[#7E7E88]'}`}>
                06 // TECHNICAL CAPABILITY
              </span>
              <div className={`w-12 h-[1px] ${isDark ? 'bg-[#353548]' : 'bg-[#D4D3C7]'}`} />
            </div>
            <h2 className={`text-4xl sm:text-6xl font-serif tracking-tight ${isDark ? 'text-[#F4F4F6]' : 'text-[#18181B]'}`}>
              Skills & Expertise
            </h2>
          </div>
          <p className={`text-sm font-mono max-w-md ${isDark ? 'text-[#A6A6B4]' : 'text-[#57575E]'}`}>
            Integrated technical skill set combining modern web programming, aesthetic user interface design, AI exploration, and digital growth.
          </p>
        </div>

        {/* 4 Skill Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILLS_DATA.map((cat, idx) => {
            const Icon = CATEGORY_ICONS[cat.category as keyof typeof CATEGORY_ICONS] || Code;

            return (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`p-7 rounded-3xl border flex flex-col justify-between transition-all duration-300 shadow-sm ${
                  isDark
                    ? 'bg-[#15151C] border-[#242432] hover:border-[#353548]'
                    : 'bg-[#F9F9F6] border-[#E6E5DC] hover:border-[#18181B]'
                }`}
              >
                <div>
                  <div className={`w-10 h-10 rounded-2xl border flex items-center justify-center mb-5 shadow-xs ${
                    isDark
                      ? 'bg-[#1D1D26] border-[#353548] text-emerald-400'
                      : 'bg-[#FFFFFF] border-[#E6E5DC] text-[#18181B]'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className={`text-xs font-mono font-bold tracking-wider uppercase mb-5 ${
                    isDark ? 'text-[#F4F4F6]' : 'text-[#18181B]'
                  }`}>
                    {cat.category}
                  </h3>

                  <ul className="space-y-3">
                    {cat.skills.map((skill) => (
                      <li key={skill} className={`flex items-center gap-2.5 text-sm font-medium ${
                        isDark ? 'text-[#D0D0DA]' : 'text-[#333338]'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-emerald-400' : 'bg-[#18181B]'}`} />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={`mt-8 pt-4 border-t text-[10px] font-mono flex items-center justify-between ${
                  isDark ? 'border-[#242432] text-[#747482]' : 'border-[#E6E5DC] text-[#7E7E88]'
                }`}>
                  <span>DISCIPLINE 0{idx + 1}</span>
                  <span className={`font-semibold ${isDark ? 'text-emerald-400' : 'text-[#18181B]'}`}>
                    Active Practice
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
