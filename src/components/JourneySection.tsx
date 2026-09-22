import { useState } from 'react';
import { motion } from 'motion/react';
import { Compass, Lightbulb, Code2, Globe2, Sparkles, Rocket } from 'lucide-react';
import { JOURNEY_STEPS } from '../data/portfolioData';

const STEP_ICONS = [
  Compass,
  Lightbulb,
  Code2,
  Globe2,
  Sparkles,
  Rocket
];

export default function JourneySection() {
  const [activeStep, setActiveStep] = useState<number>(3); // Default highlighting Education Point

  return (
    <section id="journey" className="py-24 sm:py-32 relative border-b border-[#E6E5DC]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-20 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-mono tracking-widest text-[#7E7E88] uppercase">
                03 // PROGRESSION & EVOLUTION
              </span>
              <div className="w-12 h-[1px] bg-[#D4D3C7]" />
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif text-[#18181B] tracking-tight">
              My Journey
            </h2>
          </div>
          <p className="text-sm font-mono text-[#57575E] max-w-md">
            From early inquisitiveness to founding educational ecosystems and architecting modern digital products.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Connecting Line */}
          <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-[2px] bg-[#E6E5DC] -translate-x-1/2" />

          <div className="space-y-12 sm:space-y-16">
            {JOURNEY_STEPS.map((item, idx) => {
              const Icon = STEP_ICONS[idx % STEP_ICONS.length];
              const isEven = idx % 2 === 0;
              const isCurrent = activeStep === idx;

              return (
                <div
                  key={item.step}
                  onClick={() => setActiveStep(idx)}
                  className={`relative flex flex-col sm:flex-row items-start cursor-pointer group ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Content Card (Half width on desktop) */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className={`w-full sm:w-[calc(50%-2.5rem)] ml-12 sm:ml-0 p-6 sm:p-7 rounded-2xl border transition-all duration-300 ${
                      isCurrent
                        ? 'bg-[#FFFFFF] border-[#18181B] shadow-[0_8px_30px_rgba(24,24,27,0.06)] scale-[1.02]'
                        : 'bg-[#FFFFFF]/70 border-[#E6E5DC] group-hover:border-[#D4D3C7] group-hover:bg-[#FFFFFF]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono font-bold tracking-widest text-[#7E7E88]">
                        PHASE {item.step}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#EFEFE8] text-[#57575E]">
                        {item.tagline}
                      </span>
                    </div>

                    <h3 className="text-xl font-serif font-bold text-[#18181B] tracking-tight mb-2">
                      {item.title}
                    </h3>

                    <p className="text-sm sm:text-base text-[#57575E] leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>

                  {/* Center Node on Timeline */}
                  <div className="absolute left-4 sm:left-1/2 top-6 -translate-x-1/2 flex items-center justify-center">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isCurrent
                          ? 'bg-[#18181B] text-[#F9F9F6] shadow-md ring-4 ring-[#EFEFE8]'
                          : 'bg-[#FFFFFF] text-[#57575E] border-2 border-[#D4D3C7] group-hover:border-[#18181B] group-hover:text-[#18181B]'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
