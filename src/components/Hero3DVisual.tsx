import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { motion, useReducedMotion } from 'motion/react';
import { Box, User, Sparkles, Compass, ShieldCheck } from 'lucide-react';
import { soundFX } from '../utils/audio';
import { ASSETS } from '../assets/images';
import { useTheme } from '../context/ThemeContext';

export default function Hero3DVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const sheenRef = useRef<HTMLDivElement>(null);

  const [mode, setMode] = useState<'integrated' | 'portrait' | 'spatial'>('integrated');
  const [portraitSrc, setPortraitSrc] = useState<string>(ASSETS.portrait);
  const [hasTriedRemote, setHasTriedRemote] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const { isDark } = useTheme();

  // Mouse interpolation references for 120 FPS lag-free physics (NO React re-renders on move!)
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

  // Setup Three.js WebGL Scene
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = 420;
    const height = 420;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.z = 5.2;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Outer Geodesic Icosahedron Wireframe
    const icosaGeometry = new THREE.IcosahedronGeometry(1.65, 1);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: isDark ? 0x10B981 : 0x059669,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.35 : 0.25,
    });
    const icosaMesh = new THREE.Mesh(icosaGeometry, wireframeMaterial);
    scene.add(icosaMesh);

    // Inner Glowing Core Polyhedron
    const coreGeometry = new THREE.OctahedronGeometry(0.9, 0);
    const coreMaterial = new THREE.MeshPhongMaterial({
      color: isDark ? 0x064E3B : 0x047857,
      emissive: isDark ? 0x047857 : 0x10B981,
      emissiveIntensity: isDark ? 0.4 : 0.2,
      shininess: 90,
      flatShading: true,
      transparent: true,
      opacity: isDark ? 0.85 : 0.7,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    scene.add(coreMesh);

    // Orbital Ring 1
    const ring1Geometry = new THREE.TorusGeometry(2.1, 0.015, 16, 100);
    const ring1Material = new THREE.MeshBasicMaterial({
      color: isDark ? 0x34D399 : 0x10B981,
      transparent: true,
      opacity: isDark ? 0.4 : 0.3,
    });
    const ring1 = new THREE.Mesh(ring1Geometry, ring1Material);
    ring1.rotation.x = Math.PI / 3;
    scene.add(ring1);

    // Orbital Ring 2
    const ring2Geometry = new THREE.TorusGeometry(2.35, 0.012, 16, 100);
    const ring2Material = new THREE.MeshBasicMaterial({
      color: isDark ? 0x6EE7B7 : 0x059669,
      transparent: true,
      opacity: isDark ? 0.3 : 0.2,
    });
    const ring2 = new THREE.Mesh(ring2Geometry, ring2Material);
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
      color: isDark ? 0xA7F3D0 : 0x047857,
      transparent: true,
      opacity: isDark ? 0.75 : 0.6,
    });
    const particlePoints = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlePoints);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, isDark ? 0.7 : 0.9);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x10B981, 2.5, 50);
    pointLight.position.set(3, 3, 4);
    scene.add(pointLight);

    const backLight = new THREE.PointLight(isDark ? 0x3B82F6 : 0x0284C7, 1.8, 50);
    backLight.position.set(-3, -2, -3);
    scene.add(backLight);

    // High performance animation loop (60 / 120 FPS lag free)
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Smooth rotation with constant gentle spin
      icosaMesh.rotation.x = elapsedTime * 0.18;
      icosaMesh.rotation.y = elapsedTime * 0.24;

      coreMesh.rotation.x = -elapsedTime * 0.28;
      coreMesh.rotation.y = -elapsedTime * 0.35;

      ring1.rotation.z = elapsedTime * 0.12;
      ring2.rotation.z = -elapsedTime * 0.15;

      particlePoints.rotation.y = elapsedTime * 0.06;

      // Mouse Parallax Influence using Lerped coordinates
      const targetRotX = mouseCurrent.current.y * 0.8;
      const targetRotY = mouseCurrent.current.x * 0.8;

      scene.rotation.x += (targetRotX - scene.rotation.x) * 0.06;
      scene.rotation.y += (targetRotY - scene.rotation.y) * 0.06;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      icosaGeometry.dispose();
      wireframeMaterial.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      ring1Geometry.dispose();
      ring1Material.dispose();
      ring2Geometry.dispose();
      ring2Material.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
    };
  }, [isDark]);

  // Smooth 3D Card Physics Loop (runs in requestAnimationFrame with ZERO React re-renders)
  useEffect(() => {
    if (shouldReduceMotion) return;

    const updatePhysics = () => {
      // Lerp mouse coordinates
      const factor = isHovered.current ? 0.1 : 0.05;
      mouseCurrent.current.x += (mouseTarget.current.x - mouseCurrent.current.x) * factor;
      mouseCurrent.current.y += (mouseTarget.current.y - mouseCurrent.current.y) * factor;

      // Apply transform directly to card DOM node
      if (cardRef.current) {
        const rotX = -mouseCurrent.current.y * 14;
        const rotY = mouseCurrent.current.x * 14;
        const transZ = isHovered.current ? 18 : 0;

        cardRef.current.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(${transZ}px)`;
      }

      // Dynamic sheen reflection
      if (sheenRef.current && isHovered.current) {
        const sheenX = (mouseCurrent.current.x + 0.5) * 100;
        const sheenY = (mouseCurrent.current.y + 0.5) * 100;
        sheenRef.current.style.background = `radial-gradient(circle at ${sheenX}% ${sheenY}%, rgba(255,255,255,0.18) 0%, transparent 60%)`;
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
        className="relative w-full max-w-[340px] sm:max-w-[420px] aspect-square mx-auto flex items-center justify-center cursor-grab active:cursor-grabbing"
      >
        {/* Background Ambient Depth Glow */}
        <div
          className={`absolute inset-0 rounded-full blur-[80px] pointer-events-none transition-opacity duration-700 ${
            isDark
              ? 'bg-emerald-500/20 opacity-80'
              : 'bg-emerald-500/10 opacity-60'
          }`}
        />

        {/* 1. Three.js WebGL Interactive 3D Canvas (Visible in 'integrated' or 'spatial' modes) */}
        {(mode === 'integrated' || mode === 'spatial') && (
          <canvas
            ref={canvasRef}
            width={420}
            height={420}
            className={`absolute inset-0 w-full h-full pointer-events-none transition-all duration-500 ${
              mode === 'spatial' ? 'scale-105 opacity-100 z-10' : 'scale-100 opacity-65 -z-10'
            }`}
          />
        )}

        {/* 2. Floating 3D Holographic Portrait Card (Visible in 'integrated' or 'portrait' modes) */}
        {(mode === 'integrated' || mode === 'portrait') && (
          <div
            ref={cardRef}
            style={{
              willChange: 'transform',
              transformStyle: 'preserve-3d',
            }}
            className={`relative w-[270px] sm:w-[310px] aspect-[4/5] rounded-3xl p-3 border shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] transition-shadow duration-300 ${
              isDark
                ? 'bg-[#13131A]/90 backdrop-blur-xl border-[#2A2A3D]'
                : 'bg-[#FFFFFF]/90 backdrop-blur-xl border-[#E2E2D6]'
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
                className="w-full h-full object-cover object-top filter grayscale contrast-110 group-hover:filter-none transition-all duration-700"
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

              {/* Top Security Stamp */}
              <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-[9px] font-mono text-emerald-300">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>VERIFIED</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3D Mode Selector Switcher */}
      <div className="mt-4 flex items-center gap-1 p-1 rounded-full border border-current/10 bg-black/5 dark:bg-white/5">
        <button
          onClick={() => {
            soundFX.playTick();
            setMode('integrated');
          }}
          className={`px-3 py-1 rounded-full text-xs font-mono transition-all ${
            mode === 'integrated'
              ? isDark ? 'bg-emerald-500 text-white font-bold' : 'bg-[#18181B] text-white font-bold'
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
              ? isDark ? 'bg-emerald-500 text-white font-bold' : 'bg-[#18181B] text-white font-bold'
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
              ? isDark ? 'bg-emerald-500 text-white font-bold' : 'bg-[#18181B] text-white font-bold'
              : 'opacity-65 hover:opacity-100'
          }`}
          title="Interactive Three.js Geometric Mesh"
        >
          Spatial 3D
        </button>
      </div>

      <div className="mt-2 text-[10px] font-mono opacity-50 flex items-center gap-1.5">
        <Compass className="w-3 h-3 text-emerald-500" />
        <span>Hardware-Accelerated WebGL • Gyroscope Interactive</span>
      </div>
    </div>
  );
}
