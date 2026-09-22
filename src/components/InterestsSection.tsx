import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  Cpu,
  Code2,
  Sparkles,
  BookOpen,
  Gamepad2,
  Film,
  Palette,
  Camera,
  Wand2,
  Users,
  GraduationCap,
  Eye,
  ArrowUpRight,
  Layers,
  Compass,
} from 'lucide-react';
import { INTERESTS_DATA } from '../data/portfolioData';
import { soundFX } from '../utils/audio';
import { ASSETS } from '../assets/images';
import { useTheme } from '../context/ThemeContext';

const ICON_MAP: Record<string, React.ElementType> = {
  Cpu,
  Code2,
  Sparkles,
  BookOpen,
  Gamepad2,
  Film,
  Palette,
  Camera,
  Wand2,
  Users,
  GraduationCap,
};

export default function InterestsSection() {
  const shouldReduceMotion = useReducedMotion();
  const [bannerRotate, setBannerRotate] = useState({ x: 0, y: 0 });
  const [bannerGlare, setBannerGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [imageError, setImageError] = useState(false);
  const { isDark } = useTheme();

  const handleBannerMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    setBannerRotate({
      x: ((y - centerY) / centerY) * -3,
      y: ((x - centerX) / centerX) * 3,
    });
    setBannerGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: isDark ? 0.12 : 0.18,
    });
  };

  const handleBannerLeave = () => {
    setBannerRotate({ x: 0, y: 0 });
    setBannerGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <section
      id="interests"
      className={`py-24 sm:py-32 relative border-b transition-colors duration-300 ${
        isDark ? 'bg-[#0C0C0F] border-[#242432]' : 'bg-[#F9F9F6] border-[#E6E5DC]/80'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-xs font-mono tracking-widest uppercase ${isDark ? 'text-[#747482]' : 'text-[#7E7E88]'}`}>
                07 // CURIOSITIES & PURSUITS
              </span>
              <div className={`w-12 h-[1px] ${isDark ? 'bg-[#353548]' : 'bg-[#D4D3C7]'}`} />
            </div>
            <h2 className={`text-4xl sm:text-6xl font-serif tracking-tight ${isDark ? 'text-[#F4F4F6]' : 'text-[#18181B]'}`}>
              Interests & Inspirations
            </h2>
          </div>
          <p className={`text-sm font-mono max-w-md ${isDark ? 'text-[#A6A6B4]' : 'text-[#57575E]'}`}>
            The intellectual curiosities, visual explorations, and creative mediums that fuel my digital architecture.
          </p>
        </div>

        {/* Enhanced 3D Visual Showcase Banner with Photorealistic Studio Scene */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          onMouseMove={handleBannerMove}
          onMouseLeave={handleBannerLeave}
          style={{
            transform: `perspective(1200px) rotateX(${bannerRotate.x}deg) rotateY(${bannerRotate.y}deg)`,
          }}
          className={`relative mb-14 rounded-3xl border p-7 sm:p-10 overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center preserve-3d transition-all duration-200 ${
            isDark
              ? 'bg-[#15151C] border-[#242432]'
              : 'bg-[#FFFFFF] border-[#E6E5DC]'
          }`}
        >
          {/* Specular glare */}
          <div
            className="pointer-events-none absolute -inset-px transition-opacity duration-300 rounded-3xl"
            style={{
              background: `radial-gradient(circle 400px at ${bannerGlare.x}% ${bannerGlare.y}%, rgba(255, 255, 255, 0.4), transparent 80%)`,
              opacity: bannerGlare.opacity,
            }}
          />

          <div className="lg:col-span-7 space-y-5" style={{ transform: 'translateZ(25px)' }}>
            <div className={`flex items-center gap-2 text-xs font-mono ${isDark ? 'text-[#747482]' : 'text-[#7E7E88]'}`}>
              <span className={`w-2 h-2 rounded-full ${isDark ? 'bg-emerald-400' : 'bg-[#18181B]'}`} />
              <span>DIGITAL ARCHITECTURE WORKSPACE</span>
            </div>
            <h3 className={`text-2xl sm:text-4xl font-serif font-bold tracking-tight ${isDark ? 'text-[#F4F4F6]' : 'text-[#18181B]'}`}>
              Spatial Interfaces & Modern Digital Systems
            </h3>
            <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-[#A6A6B4]' : 'text-[#57575E]'}`}>
              Architecting web environments that merge responsive typography, fluid micro-interactions, and spatial depth. Exploring how clean structural design and tactile interactions turn utilitarian websites into memorable, high-performance digital platforms.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className={`px-3.5 py-1.5 rounded-full text-xs font-mono border ${
                isDark
                  ? 'bg-[#1D1D26] border-[#353548] text-[#F4F4F6]'
                  : 'bg-[#F4F4EE] border-[#D4D3C7] text-[#18181B]'
              }`}>
                Spatial UI Design
              </span>
              <span className={`px-3.5 py-1.5 rounded-full text-xs font-mono border ${
                isDark
                  ? 'bg-[#1D1D26] border-[#353548] text-[#F4F4F6]'
                  : 'bg-[#F4F4EE] border-[#D4D3C7] text-[#18181B]'
              }`}>
                Fluid Micro-Interactions
              </span>
              <span className={`px-3.5 py-1.5 rounded-full text-xs font-mono border ${
                isDark
                  ? 'bg-[#1D1D26] border-[#353548] text-[#F4F4F6]'
                  : 'bg-[#F4F4EE] border-[#D4D3C7] text-[#18181B]'
              }`}>
                Modern Digital Systems
              </span>
            </div>

            {/* CTA Button with Lucide Icons */}
            <div className="pt-2">
              <a
                href="#projects"
                onClick={() => soundFX.playTick()}
                className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-semibold shadow-sm transition-all active:scale-95 ${
                  isDark
                    ? 'bg-[#F4F4F6] text-[#0C0C0F] hover:bg-[#E2E2E6]'
                    : 'bg-[#18181B] text-[#F9F9F6] hover:bg-[#333338]'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Explore Built Systems</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div
            className={`lg:col-span-5 relative group overflow-hidden rounded-2xl border shadow-md aspect-video lg:aspect-[4/3] ${
              isDark ? 'border-[#353548] bg-[#101016]' : 'border-[#E6E5DC] bg-[#FFFFFF]'
            }`}
            style={{ transform: 'translateZ(30px)' }}
          >
            {!imageError ? (
              <img
                src={ASSETS.workspace}
                alt={ASSETS.workspaceAlt}
                referrerPolicy="no-referrer"
                onError={() => setImageError(true)}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#18181B] to-[#333338] text-white p-6 text-center">
                <Layers className="w-8 h-8 text-emerald-400 mb-2" />
                <span className="font-serif text-lg font-bold">Spatial Architecture Studio</span>
                <span className="text-xs font-mono text-gray-400 mt-1">Muhammad Rizwan // Mianwali</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-white">
              <span>WORKSTATION</span>
              <span>2026 ARCHITECTURE</span>
            </div>
          </div>
        </motion.div>

        {/* Interests Grid with Modern 3D Cards & CTA Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {INTERESTS_DATA.map((item, idx) => {
            const Icon = ICON_MAP[item.iconName] || Sparkles;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                onMouseEnter={() => soundFX.playTick()}
                className={`group p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                  isDark
                    ? 'bg-[#15151C] border-[#242432] hover:border-[#353548] hover:shadow-[0_12px_32px_rgba(0,0,0,0.4)]'
                    : 'bg-[#FFFFFF] border-[#E6E5DC] hover:border-[#18181B] hover:shadow-[0_12px_32px_rgba(24,24,27,0.06)]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-colors shadow-xs ${
                      isDark
                        ? 'bg-[#1D1D26] border-[#353548] text-[#F4F4F6] group-hover:bg-[#F4F4F6] group-hover:text-[#0C0C0F]'
                        : 'bg-[#F4F4EE] border-[#E6E5DC] text-[#18181B] group-hover:bg-[#18181B] group-hover:text-[#F9F9F6]'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className={`text-[10px] font-mono px-2.5 py-1 rounded-full border ${
                      isDark
                        ? 'bg-[#1D1D26] text-[#A6A6B4] border-[#353548]'
                        : 'bg-[#EFEFE8] text-[#57575E] border-[#D4D3C7]/60'
                    }`}>
                      {item.category}
                    </span>
                  </div>

                  <h3 className={`text-base font-serif font-bold tracking-tight mb-2 ${
                    isDark ? 'text-[#F4F4F6]' : 'text-[#18181B]'
                  }`}>
                    {item.title}
                  </h3>

                  <p className={`text-xs leading-relaxed ${isDark ? 'text-[#A6A6B4]' : 'text-[#57575E]'}`}>
                    {item.description}
                  </p>
                </div>

                <div className={`mt-6 pt-3 border-t flex items-center justify-between ${
                  isDark ? 'border-[#242432]' : 'border-[#E6E5DC]'
                }`}>
                  <span className={`text-[10px] font-mono ${isDark ? 'text-[#747482]' : 'text-[#7E7E88]'}`}>
                    PURSUIT // 0{idx + 1}
                  </span>
                  <a
                    href="#projects"
                    onClick={() => soundFX.playTick()}
                    className={`inline-flex items-center gap-1 text-[11px] font-mono font-semibold transition-colors ${
                      isDark
                        ? 'text-[#F4F4F6] hover:text-[#A6A6B4]'
                        : 'text-[#18181B] hover:text-[#57575E]'
                    }`}
                  >
                    <span>View In Action</span>
                    <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
