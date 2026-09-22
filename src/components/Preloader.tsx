import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [phase, setPhase] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    // Phase 0: "MR" Monogram (0ms - 400ms)
    // Phase 1: "MUHAMMAD RIZWAN" (400ms - 900ms)
    // Phase 2: "Founder • Educationist • Digital Architect" (900ms - 1500ms)
    const t1 = setTimeout(() => setPhase(1), 350);
    const t2 = setTimeout(() => setPhase(2), 750);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return Math.min(prev + 4, 100);
      });
    }, 45);

    const exitTimeout = setTimeout(() => {
      onComplete();
    }, 1500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(exitTimeout);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <motion.div
      id="preloader-overlay"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -16, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F9F9F6] text-[#18181B] px-6 select-none"
    >
      <div className="w-full max-w-md flex flex-col items-center text-center">
        {/* Monogram / Logo Mark */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="w-14 h-14 rounded-2xl bg-[#18181B] text-[#F9F9F6] flex items-center justify-center font-serif text-2xl font-semibold mb-6 shadow-sm"
        >
          MR
        </motion.div>

        {/* Dynamic Text Phases */}
        <div className="h-16 flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            {phase === 0 && (
              <motion.div
                key="phase-0"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="font-serif text-2xl tracking-widest text-[#18181B]"
              >
                M • R
              </motion.div>
            )}

            {phase === 1 && (
              <motion.div
                key="phase-1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="font-sans font-bold text-lg sm:text-xl tracking-[0.25em] text-[#18181B] uppercase"
              >
                Muhammad Rizwan
              </motion.div>
            )}

            {phase >= 2 && (
              <motion.div
                key="phase-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center space-y-1.5"
              >
                <span className="font-sans font-bold text-sm sm:text-base tracking-[0.2em] text-[#18181B] uppercase">
                  Muhammad Rizwan
                </span>
                <span className="text-xs sm:text-sm tracking-wider text-[#57575E] font-medium">
                  Founder • Educationist • Digital Architect
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Thin Minimal Progress Bar */}
        <div className="w-48 sm:w-64 h-[2px] bg-[#E6E5DC] rounded-full mt-8 overflow-hidden">
          <motion.div
            className="h-full bg-[#18181B]"
            style={{ width: `${progress}%` }}
            transition={{ ease: "easeOut" }}
          />
        </div>

        <div className="mt-3 flex items-center justify-between w-48 sm:w-64 text-[10px] tracking-widest text-[#7E7E88] font-mono">
          <span>PORTFOLIO // 2026</span>
          <span>{progress}%</span>
        </div>
      </div>
    </motion.div>
  );
}
