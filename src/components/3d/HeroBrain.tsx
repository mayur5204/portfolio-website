'use client';

import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { getParticleCount, isLowPowerDevice } from '@/utils/performance';

const HeroBrain = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Store container reference for cleanup
    const container = containerRef.current;

    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Renderer setup - adjust quality based on device capability
    const isLowPower = isLowPowerDevice();
    const renderer = new THREE.WebGLRenderer({ 
      antialias: !isLowPower, // Disable antialiasing on low power devices
      alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;

    // Particles - use performance optimization
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = getParticleCount(); // Dynamically set based on device capability
    
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    
    // Brain shape approximation with clustering particles in a brain-like shape
    for (let i = 0; i < particlesCount; i++) {
      // Create brain shape - a distorted sphere with more particles at the top
      const i3 = i * 3;
      const phi = Math.random() * Math.PI * 2;
      const theta = Math.random() * Math.PI;
      
      // Base sphere
      let r = 2 + (Math.random() - 0.5) * 0.5;
      
      // Distort to make brain shape
      if (theta < Math.PI * 0.5) {
        // Top part - frontal lobe
        r *= 1.2; 
      }
      
      positions[i3] = r * Math.sin(theta) * Math.cos(phi);  // x
      positions[i3 + 1] = r * Math.cos(theta) + (Math.random() - 0.5) * 0.5;  // y
      positions[i3 + 2] = r * Math.sin(theta) * Math.sin(phi);  // z
      
      // Colors - purple to cyan gradient
      colors[i3] = Math.random() > 0.5 ? 0.5 : 0.1;  // R - purple/blue component
      colors[i3 + 1] = Math.random() * 0.5;  // G - less green
      colors[i3 + 2] = Math.random() > 0.7 ? 1.0 : 0.7;  // B - high blue component
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    // Material
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      opacity: 0.8
    });
    
    // Particles system
    const particlesSystem = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesSystem);

    // Connecting lines to simulate neural networks
    const connectionsMaterial = new THREE.LineBasicMaterial({
      color: 0x7000FF,
      transparent: true,
      opacity: 0.2
    });

    // Create connections between random close particles 
    const connectionsCount = 200;
    for (let i = 0; i < connectionsCount; i++) {
      const index1 = Math.floor(Math.random() * particlesCount);
      const index2 = Math.floor(Math.random() * particlesCount);
      
      // Only connect if distance is not too large
      const pos1 = new THREE.Vector3(
        positions[index1 * 3],
        positions[index1 * 3 + 1],
        positions[index1 * 3 + 2]
      );
      
      const pos2 = new THREE.Vector3(
        positions[index2 * 3],
        positions[index2 * 3 + 1],
        positions[index2 * 3 + 2]
      );
      
      if (pos1.distanceTo(pos2) < 1) {
        const lineGeometry = new THREE.BufferGeometry().setFromPoints([pos1, pos2]);
        const line = new THREE.Line(lineGeometry, connectionsMaterial);
        scene.add(line);
      }
    }

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Directional light
    const directionalLight = new THREE.DirectionalLight(0x00ffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      particlesSystem.rotation.y += 0.001;
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 -z-10 opacity-70" />
  );
};

export default HeroBrain;
