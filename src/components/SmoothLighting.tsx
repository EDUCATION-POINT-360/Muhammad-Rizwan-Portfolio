import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';

export default function SmoothLighting() {
  const glowRef = useRef<HTMLDivElement>(null);
  const posTarget = useRef({ x: -200, y: -200 });
  const posSmooth = useRef({ x: -200, y: -200 });
  const rafId = useRef<number | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const { isDark } = useTheme();

  useEffect(() => {
    if (shouldReduceMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      posTarget.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const animate = () => {
      // Smooth lerp (0.07 damping) for effortless, fluid drift
      posSmooth.current.x += (posTarget.current.x - posSmooth.current.x) * 0.07;
      posSmooth.current.y += (posTarget.current.y - posSmooth.current.y) * 0.07;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${posSmooth.current.x - 250}px, ${posSmooth.current.y - 250}px, 0)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [shouldReduceMotion]);

  if (shouldReduceMotion) return null;

  return (
    <div
      ref={glowRef}
      className={`fixed top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none z-10 blur-[130px] transition-opacity duration-700 will-change-transform ${
        isDark
          ? 'bg-emerald-500/10 opacity-70'
          : 'bg-emerald-500/6 opacity-50'
      }`}
      style={{
        transform: 'translate3d(-500px, -500px, 0)',
      }}
    />
  );
}
