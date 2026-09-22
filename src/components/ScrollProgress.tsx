import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const { isDark } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) return;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[2.5px] bg-transparent z-50 pointer-events-none"
    >
      <div
        className={`h-full transition-all duration-75 ease-out ${
          isDark
            ? 'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.7)]'
            : 'bg-[#18181B]'
        }`}
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
}
