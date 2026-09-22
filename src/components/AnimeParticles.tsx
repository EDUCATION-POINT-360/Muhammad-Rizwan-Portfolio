import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';

export default function AnimeParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || shouldReduceMotion) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Generate lightweight subtle anime geometric & petal-like particles
    const particleCount = Math.min(30, Math.floor(width / 40));
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 3 + 1.5,
      speedX: (Math.random() - 0.5) * 0.4 + 0.2,
      speedY: Math.random() * 0.6 + 0.3,
      opacity: Math.random() * 0.3 + 0.1,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 1.5,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotSpeed;

        if (p.y > height) {
          p.y = -10;
          p.x = Math.random() * width;
        }
        if (p.x > width) {
          p.x = -10;
        } else if (p.x < -10) {
          p.x = width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = `rgba(24, 24, 27, ${p.opacity * 0.5})`;

        // Draw diamond / stylized tech petal
        ctx.beginPath();
        ctx.moveTo(0, -p.size * 1.5);
        ctx.lineTo(p.size, 0);
        ctx.moveTo(0, -p.size * 1.5);
        ctx.lineTo(p.size, 0);
        ctx.lineTo(0, p.size * 1.5);
        ctx.lineTo(-p.size, 0);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [shouldReduceMotion]);

  if (shouldReduceMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-30 opacity-60"
    />
  );
}
