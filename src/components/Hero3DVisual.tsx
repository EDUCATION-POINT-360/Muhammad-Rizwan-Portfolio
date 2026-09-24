import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useReducedMotion } from 'motion/react';
import { Sparkles, Compass, ShieldCheck, Layers, Cpu } from 'lucide-react';
import { soundFX } from '../utils/audio';
import { ASSETS } from '../assets/images';
import { useTheme } from '../context/ThemeContext';

// Safe WebGL detection helper
function isWebGLAvailable(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

export default function Hero3DVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const sheenRef = useRef<HTMLDivElement>(null);

  const [mode, setMode] = useState<'integrated' | 'portrait' | 'spatial'>('integrated');
  const [portraitSrc, setPortraitSrc] = useState<string>(ASSETS.portrait);
  const [hasTriedRemote, setHasTriedRemote] = useState(false);
  const [webglEnabled, setWebglEnabled] = useState<boolean>(true);
  const shouldReduceMotion = useReducedMotion();
  const { isDark } = useTheme();

  // Mouse interpolation references for 120 FPS lag-free physics
  const mouseTarget = useRef({ x: 0, y: 0 });
  const mouseCurrent = useRef({ x: 0, y: 0 });
  const isHovered = useRef(false);
  const rafId = useRef<number | null>(null);

  const handleImageError = () => {
    if (!hasTriedRemote && ASSETS.portraitRemote) {
      setHasTriedRemote(true);
      setPortraitSrc(ASSETS.portraitRemote);
    }
  };

  // Setup Three.js WebGL Scene with complete safety & context loss recovery
  useEffect(() => {
    if (!isWebGLAvailable()) {
      setWebglEnabled(false);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer: THREE.WebGLRenderer | null = null;
    let scene: THREE.Scene | null = null;
    let camera: THREE.PerspectiveCamera | null = null;
    let animationFrameId: number;
    let clock: THREE.Clock | null = null;

    let icosaMesh: THREE.Mesh | null = null;
    let coreMesh: THREE.Mesh | null = null;
    let ring1: THREE.Mesh | null = null;
    let ring2: THREE.Mesh | null = null;
    let particlePoints: THREE.Points | null = null;

    try {
      const width = 420;
      const height = 420;

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
      camera.position.z = 5.2;

      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

      // Outer Geodesic Icosahedron Wireframe
      const icosaGeometry = new THREE.IcosahedronGeometry(1.65, 1);
      const wireframeMaterial = new THREE.MeshBasicMaterial({
        color: isDark ? 0x10b981 : 0x059669,
        wireframe: true,
        transparent: true,
        opacity: isDark ? 0.4 : 0.28,
      });
      icosaMesh = new THREE.Mesh(icosaGeometry, wireframeMaterial);
      scene.add(icosaMesh);

      // Inner Glowing Core Polyhedron
      const coreGeometry = new THREE.OctahedronGeometry(0.9, 0);
      const coreMaterial = new THREE.MeshPhongMaterial({
        color: isDark ? 0x064e3b : 0x047857,
        emissive: isDark ? 0x047857 : 0x10b981,
        emissiveIntensity: isDark ? 0.45 : 0.25,
        shininess: 90,
        flatShading: true,
        transparent: true,
        opacity: isDark ? 0.85 : 0.7,
      });
      coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
      scene.add(coreMesh);

      // Orbital Ring 1
      const ring1Geometry = new THREE.TorusGeometry(2.1, 0.015, 16, 100);
      const ring1Material = new THREE.MeshBasicMaterial({
        color: isDark ? 0x34d399 : 0x10b981,
        transparent: true,
        opacity: isDark ? 0.45 : 0.35,
      });
      ring1 = new THREE.Mesh(ring1Geometry, ring1Material);
      ring1.rotation.x = Math.PI / 3;
      scene.add(ring1);

      // Orbital Ring 2
      const ring2Geometry = new THREE.TorusGeometry(2.35, 0.012, 16, 100);
      const ring2Material = new THREE.MeshBasicMaterial({
        color: isDark ? 0x6ee7b7 : 0x059669,
        transparent: true,
        opacity: isDark ? 0.35 : 0.25,
      });
      ring2 = new THREE.Mesh(ring2Geometry, ring2Material);
      ring2.rotation.y = Math.PI / 4;
      ring2.rotation.x = -Math.PI / 6;
      scene.add(ring2);

      // Floating Data Node Particles
      const particlesCount = 70;
      const posArray = new Float32Array(particlesCount * 3);
      for (let i = 0; i < particlesCount * 3; i += 3) {
        const radius = 1.9 + Math.random() * 0.9;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        posArray[i] = radius * Math.sin(phi) * Math.cos(theta);
        posArray[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
        posArray[i + 2] = radius * Math.cos(phi);
      }
      const particlesGeometry = new THREE.BufferGeometry();
      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
      const particlesMaterial = new THREE.PointsMaterial({
        size: 0.05,
        color: isDark ? 0xa7f3d0 : 0x047857,
        transparent: true,
        opacity: isDark ? 0.75 : 0.6,
      });
      particlePoints = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particlePoints);

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, isDark ? 0.7 : 0.9);
      scene.add(ambientLight);

      const pointLight = new THREE.PointLight(0x10b981, 2.5, 50);
      pointLight.position.set(3, 3, 4);
      scene.add(pointLight);

      const backLight = new THREE.PointLight(isDark ? 0x3b82f6 : 0x0284c7, 1.8, 50);
      backLight.position.set(-3, -2, -3);
      scene.add(backLight);

      clock = new THREE.Clock();

      const animate = () => {
        if (!clock || !scene || !camera || !renderer) return;
        const elapsedTime = clock.getElapsedTime();

        if (icosaMesh) {
          icosaMesh.rotation.x = elapsedTime * 0.18;
          icosaMesh.rotation.y = elapsedTime * 0.24;
        }

        if (coreMesh) {
          coreMesh.rotation.x = -elapsedTime * 0.28;
          coreMesh.rotation.y = -elapsedTime * 0.35;
        }

        if (ring1) ring1.rotation.z = elapsedTime * 0.12;
        if (ring2) ring2.rotation.z = -elapsedTime * 0.15;
        if (particlePoints) particlePoints.rotation.y = elapsedTime * 0.06;

        // Mouse Parallax Influence using Lerped coordinates
        const targetRotX = mouseCurrent.current.y * 0.7;
        const targetRotY = mouseCurrent.current.x * 0.7;

        scene.rotation.x += (targetRotX - scene.rotation.x) * 0.06;
        scene.rotation.y += (targetRotY - scene.rotation.y) * 0.06;

        try {
          renderer.render(scene, camera);
          animationFrameId = requestAnimationFrame(animate);
        } catch {
          // If GPU context fails or is lost, fallback gracefully without crashing
          setWebglEnabled(false);
        }
      };

      animate();
      setWebglEnabled(true);
    } catch (err) {
      console.warn('WebGL initialization failed, falling back to CSS 3D engine:', err);
      setWebglEnabled(false);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (renderer) {
        try {
          renderer.dispose();
        } catch {
          // ignore cleanup errors
        }
      }
    };
  }, [isDark]);

  // Smooth 3D Card Physics Loop (direct requestAnimationFrame, no React state lag)
  useEffect(() => {
    if (shouldReduceMotion) return;

    const updatePhysics = () => {
      const factor = isHovered.current ? 0.1 : 0.05;
      mouseCurrent.current.x += (mouseTarget.current.x - mouseCurrent.current.x) * factor;
      mouseCurrent.current.y += (mouseTarget.current.y - mouseCurrent.current.y) * factor;

      if (cardRef.current) {
        const rotX = -mouseCurrent.current.y * 14;
        const rotY = mouseCurrent.current.x * 14;
        const transZ = isHovered.current ? 20 : 0;

        cardRef.current.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(${transZ}px)`;
      }

      if (sheenRef.current && isHovered.current) {
        const sheenX = (mouseCurrent.current.x + 0.5) * 100;
        const sheenY = (mouseCurrent.current.y + 0.5) * 100;
        sheenRef.current.style.background = `radial-gradient(circle at ${sheenX}% ${sheenY}%, rgba(255,255,255,0.2) 0%, transparent 60%)`;
      }

      rafId.current = requestAnimationFrame(updatePhysics);
    };

    rafId.current = requestAnimationFrame(updatePhysics);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [shouldReduceMotion]);

  // Mouse & Touch Listeners with normalized coordinates
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseTarget.current = { x, y };
      isHovered.current = true;
    };

    const handleMouseLeave = () => {
      mouseTarget.current = { x: 0, y: 0 };
      isHovered.current = false;
      if (sheenRef.current) {
        sheenRef.current.style.background = 'transparent';
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!e.touches[0]) return;
      const rect = container.getBoundingClientRect();
      const x = (e.touches[0].clientX - rect.left) / rect.width - 0.5;
      const y = (e.touches[0].clientY - rect.top) / rect.height - 0.5;
      mouseTarget.current = {
        x: Math.max(-0.5, Math.min(0.5, x)),
        y: Math.max(-0.5, Math.min(0.5, y)),
      };
      isHovered.current = true;
    };

    const handleTouchEnd = () => {
      mouseTarget.current = { x: 0, y: 0 };
      isHovered.current = false;
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('touchmove', handleTouchMove, { passive: true });
    container.addEventListener('touchend', handleTouchEnd);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <div className="flex flex-col items-center w-full select-none">
      {/* 3D Visual Stage Container */}
      <div
        ref={containerRef}
        id="hero-3d-stage"
        className="relative w-full max-w-[290px] xs:max-w-[340px] sm:max-w-[420px] aspect-square mx-auto flex items-center justify-center cursor-grab active:cursor-grabbing"
      >
        {/* Animated Background Ambient Glow */}
        <div
          className={`absolute inset-0 rounded-full blur-[90px] pointer-events-none transition-all duration-700 animate-pulse ${
            isDark ? 'bg-emerald-500/20' : 'bg-emerald-500/15'
          }`}
        />

        {/* 1. Three.js WebGL Interactive 3D Canvas (If WebGL is available) */}
        {webglEnabled && (mode === 'integrated' || mode === 'spatial') && (
          <canvas
            ref={canvasRef}
            width={420}
            height={420}
            className={`absolute inset-0 w-full h-full pointer-events-none transition-all duration-500 ${
              mode === 'spatial' ? 'scale-105 opacity-100 z-10' : 'scale-100 opacity-70 -z-10'
            }`}
          />
        )}

        {/* 1B. CSS 3D Animated Gyroscope Rings Fallback (If WebGL is unavailable on PC) */}
        {!webglEnabled && (mode === 'integrated' || mode === 'spatial') && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center -z-10">
            {/* Animated Orbit 1 */}
            <div
              className={`w-[260px] sm:w-[360px] h-[260px] sm:h-[360px] rounded-full border border-dashed animate-spin ${
                isDark ? 'border-emerald-400/30' : 'border-emerald-600/25'
              }`}
              style={{ animationDuration: '24s' }}
            />
            {/* Animated Orbit 2 */}
            <div
              className={`absolute w-[220px] sm:w-[290px] h-[220px] sm:h-[290px] rounded-full border border-current/20 animate-spin ${
                isDark ? 'text-emerald-400' : 'text-emerald-600'
              }`}
              style={{ animationDuration: '18s', animationDirection: 'reverse' }}
            />
            {/* Ambient Core Pulse */}
            <div
              className={`absolute w-28 sm:w-32 h-28 sm:h-32 rounded-full blur-xl ${
                isDark ? 'bg-emerald-500/30' : 'bg-emerald-500/20'
              }`}
            />
          </div>
        )}

        {/* 2. Floating 3D Holographic Portrait Card (Visible in 'integrated' or 'portrait' modes) */}
        {(mode === 'integrated' || mode === 'portrait') && (
          <div
            ref={cardRef}
            style={{
              willChange: 'transform',
              transformStyle: 'preserve-3d',
            }}
            className={`relative w-[240px] xs:w-[270px] sm:w-[310px] max-w-[85vw] aspect-[4/5] rounded-3xl p-3 border shadow-[0_30px_70px_-15px_rgba(0,0,0,0.45)] transition-shadow duration-300 ${
              isDark
                ? 'bg-[#13131A]/92 backdrop-blur-xl border-[#2A2A3D]'
                : 'bg-[#FFFFFF]/92 backdrop-blur-xl border-[#E2E2D6]'
            }`}
          >
            {/* Dynamic Specular Glare Layer */}
            <div
              ref={sheenRef}
              className="absolute inset-0 rounded-3xl pointer-events-none transition-colors duration-200 z-20"
            />

            {/* Portrait Image Frame */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#18181B] group">
              <img
                src={portraitSrc}
                alt="Muhammad Rizwan — Founder & Digital Architect"
                className="w-full h-full object-cover object-top filter grayscale contrast-105 group-hover:filter-none transition-all duration-700"
                onError={handleImageError}
              />

              {/* Holographic Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

              {/* Bottom Hologram Card Info */}
              <div className="absolute bottom-3 left-3 right-3 text-white pointer-events-none">
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 font-semibold mb-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>FOUNDER & ARCHITECT</span>
                </div>
                <div className="text-base font-serif font-bold leading-tight">
                  Muhammad Rizwan
                </div>
                <div className="text-[11px] font-mono opacity-80 mt-0.5">
                  Education Point • Netlify
                </div>
              </div>

              {/* Top Verified Security Badge */}
              <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-[9px] font-mono text-emerald-300">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>VERIFIED</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3D Mode Selector Switcher */}
      <div className="mt-4 flex flex-wrap justify-center items-center gap-1 p-1 rounded-full border border-current/10 bg-black/5 dark:bg-white/5 max-w-full">
        <button
          onClick={() => {
            soundFX.playTick();
            setMode('integrated');
          }}
          className={`px-3 py-1 rounded-full text-xs font-mono transition-all ${
            mode === 'integrated'
              ? isDark
                ? 'bg-emerald-500 text-white font-bold'
                : 'bg-[#18181B] text-white font-bold'
              : 'opacity-65 hover:opacity-100'
          }`}
          title="Composite View (Portrait + 3D Mesh)"
        >
          Integrated 3D
        </button>

        <button
          onClick={() => {
            soundFX.playTick();
            setMode('portrait');
          }}
          className={`px-3 py-1 rounded-full text-xs font-mono transition-all ${
            mode === 'portrait'
              ? isDark
                ? 'bg-emerald-500 text-white font-bold'
                : 'bg-[#18181B] text-white font-bold'
              : 'opacity-65 hover:opacity-100'
          }`}
          title="3D Holographic Portrait Tilt"
        >
          Portrait
        </button>

        <button
          onClick={() => {
            soundFX.playTick();
            setMode('spatial');
          }}
          className={`px-3 py-1 rounded-full text-xs font-mono transition-all ${
            mode === 'spatial'
              ? isDark
                ? 'bg-emerald-500 text-white font-bold'
                : 'bg-[#18181B] text-white font-bold'
              : 'opacity-65 hover:opacity-100'
          }`}
          title="Interactive Spatial Geometric Mesh"
        >
          Spatial 3D
        </button>
      </div>

      <div className="mt-2 text-[10px] font-mono opacity-50 flex items-center gap-1.5">
        <Compass className="w-3 h-3 text-emerald-500" />
        <span>Hardware-Accelerated 3D • Mouse & Gyroscope Physics</span>
      </div>
    </div>
  );
}
