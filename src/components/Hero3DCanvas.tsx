import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from '../context/ThemeContext';

export default function Hero3DCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 320;
    const height = container.clientHeight || 320;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 5.2;

    // Renderer with antialias and alpha
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group to hold all 3D objects
    const group = new THREE.Group();
    scene.add(group);

    // 1. Geodesic Wireframe Core
    const coreGeometry = new THREE.IcosahedronGeometry(1.6, 2);
    const wireframeMaterial = new THREE.MeshStandardMaterial({
      color: isDark ? 0x10b981 : 0x18181b,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.35 : 0.25,
      roughness: 0.2,
      metalness: 0.8,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, wireframeMaterial);
    group.add(coreMesh);

    // 2. Inner Glowing Nucleus
    const nucleusGeometry = new THREE.IcosahedronGeometry(0.85, 1);
    const nucleusMaterial = new THREE.MeshStandardMaterial({
      color: isDark ? 0x059669 : 0x27272a,
      roughness: 0.1,
      metalness: 0.9,
      emissive: isDark ? 0x10b981 : 0x3f3f46,
      emissiveIntensity: isDark ? 0.4 : 0.15,
      wireframe: false,
    });
    const nucleusMesh = new THREE.Mesh(nucleusGeometry, nucleusMaterial);
    group.add(nucleusMesh);

    // 3. Orbital Ring 1
    const ring1Geo = new THREE.TorusGeometry(2.3, 0.015, 16, 100);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: isDark ? 0x34d399 : 0x18181b,
      transparent: true,
      opacity: isDark ? 0.6 : 0.4,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    ring1.rotation.y = Math.PI / 6;
    group.add(ring1);

    // 4. Orbital Ring 2 (Perpendicular)
    const ring2Geo = new THREE.TorusGeometry(2.0, 0.012, 16, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: isDark ? 0x38bdf8 : 0x71717a,
      transparent: true,
      opacity: isDark ? 0.5 : 0.35,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.y = Math.PI / 3;
    group.add(ring2);

    // 5. Cloud of Floating Data Points (Nodes)
    const particlesCount = 140;
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i += 3) {
      const radius = 1.9 + Math.random() * 0.9;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      posArray[i] = radius * Math.sin(phi) * Math.cos(theta);
      posArray[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      posArray[i + 2] = radius * Math.cos(phi);
    }
    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMat = new THREE.PointsMaterial({
      size: 0.045,
      color: isDark ? 0x6ee7b7 : 0x18181b,
      transparent: true,
      opacity: isDark ? 0.8 : 0.6,
    });
    const particleSystem = new THREE.Points(particlesGeo, particlesMat);
    group.add(particleSystem);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, isDark ? 0.7 : 0.9);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(isDark ? 0x10b981 : 0xffffff, 2, 50);
    pointLight.position.set(3, 4, 4);
    scene.add(pointLight);

    // Smooth Mouse Tracking with Lerping (Lag-Free)
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 1.5;
      targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 1.5;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!e.touches[0]) return;
      const rect = container.getBoundingClientRect();
      targetX = ((e.touches[0].clientX - rect.left) / rect.width - 0.5) * 1.5;
      targetY = ((e.touches[0].clientY - rect.top) / rect.height - 0.5) * 1.5;
    };

    const handleMouseLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: true });
    container.addEventListener('mouseleave', handleMouseLeave);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth lerp mouse tracking
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;

      // Rotations
      group.rotation.y = elapsedTime * 0.2 + currentX;
      group.rotation.x = Math.sin(elapsedTime * 0.15) * 0.2 + currentY;

      ring1.rotation.z = elapsedTime * 0.35;
      ring2.rotation.z = -elapsedTime * 0.25;

      coreMesh.rotation.y = -elapsedTime * 0.1;
      nucleusMesh.rotation.x = elapsedTime * 0.15;
      nucleusMesh.rotation.y = elapsedTime * 0.2;

      renderer.render(scene, camera);
    };

    animate();

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      coreGeometry.dispose();
      wireframeMaterial.dispose();
      nucleusGeometry.dispose();
      nucleusMaterial.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      particlesGeo.dispose();
      particlesMat.dispose();
    };
  }, [isDark]);

  return (
    <div
      ref={mountRef}
      className="w-full h-full cursor-grab active:cursor-grabbing relative flex items-center justify-center select-none"
      title="Interactive 3D Digital Architecture Core (Three.js GPU accelerated)"
    />
  );
}
