'use client';

/**
 * Utility functions for optimizing performance of 3D elements and animations
 */

// Check if device is low-powered
export function isLowPowerDevice(): boolean {
  if (typeof window === 'undefined') return false;
  
  // Check for device memory API
  if ('deviceMemory' in navigator) {
    // @ts-expect-error - deviceMemory is not in TypeScript's lib dom
    return navigator.deviceMemory < 4;
  }
  
  // Simple mobile detection fallback
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  return isMobile;
};

// Calculate appropriate particle count based on device capability
export const getParticleCount = (): number => {
  if (typeof window === 'undefined') return 1500; // Default for SSR
  
  // Reduce particle count for low power devices
  if (isLowPowerDevice()) {
    return 1000;
  }
  
  // Higher particle count for powerful devices
  return window.innerWidth > 1024 ? 3000 : 2000;
};

// Calculate frame throttle amount
export const getFrameThrottle = (): number => {
  if (isLowPowerDevice()) {
    return 2; // Only update every 2 frames on low-power devices
  }
  return 1; // Update every frame on powerful devices
};

// Dynamically adjust graphics quality
export const getQualitySettings = () => {
  const isLowPower = isLowPowerDevice();
  
  return {
    antialias: !isLowPower,
    shadowMapEnabled: !isLowPower,
    shadowMapType: isLowPower ? 'basic' : 'pcfsoft',
    pixelRatio: isLowPower ? Math.min(window.devicePixelRatio, 1.5) : window.devicePixelRatio
  };
};

// Throttle function for performance optimization
// eslint-disable-next-line
export function throttle(func: Function, limit: number): Function {
  let inThrottle = false;
  
  // eslint-disable-next-line
  return function(this: any, ...args: any[]): void {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Monitor FPS and adjust quality if needed
export class FPSMonitor {
  private fps = 60;
  private frames = 0;
  private startTime: number | null = null;
  private lowFPSCallback: (() => void) | null = null;
  private normalFPSCallback: (() => void) | null = null;
  
  constructor() {
    this.measure = this.measure.bind(this);
  }
  
  start() {
    this.startTime = performance.now();
    requestAnimationFrame(this.measure);
  }
  
  onLowFPS(callback: () => void) {
    this.lowFPSCallback = callback;
    return this;
  }
  
  onNormalFPS(callback: () => void) {
    this.normalFPSCallback = callback;
    return this;
  }
  
  private measure() {
    if (!this.startTime) return;
    
    this.frames++;
    const currentTime = performance.now();
    const elapsed = currentTime - this.startTime;
    
    if (elapsed >= 1000) {
      this.fps = Math.round(this.frames * 1000 / elapsed);
      this.frames = 0;
      this.startTime = currentTime;
      
      // Call appropriate callback based on FPS
      if (this.fps < 30 && this.lowFPSCallback) {
        this.lowFPSCallback();
      } else if (this.fps >= 50 && this.normalFPSCallback) {
        this.normalFPSCallback();
      }
    }
    
    requestAnimationFrame(this.measure);
  }
  
  getFPS() {
    return this.fps;
  }
}
