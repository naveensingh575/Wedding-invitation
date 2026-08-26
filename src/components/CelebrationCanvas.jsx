import React, { useEffect, useRef } from 'react';
import { useCelebration } from '../hooks/useCelebration';

/**
 * High-Contrast Pyrotechnic Skyshots Fireworks System
 * Tailored for high-visibility across ALL 5 themes (Ivory & Sage, Midnight Obsidian, Royal Maroon, Blush Pink, Terracotta)
 * Color Palette:
 * - Warm Amber & Radiant Gold (#FFD700, #FF9F1C)
 * - Deep Ruby / Maroon Accent Sparks (#D62828, #E63946)
 * - Champagne Silver-White Flash Core (#FFF3B0, #FFFFFF)
 * - Emerald Sparkle Accent (#2A9D8F)
 */
const HIGH_CONTRAST_PYRO_PALETTE = [
  '#FFD700', // Warm Radiant Gold
  '#FF9F1C', // Amber Firework Glow
  '#D62828', // Deep Ruby Accent Spark
  '#FFF3B0', // Champagne Flash Core
  '#FFFFFF', // Pure White Flash Center
  '#E63946', // Vibrant Crimson Spark
  '#2A9D8F', // Emerald Sparkle Accent
];

class HighContrastRocket {
  constructor(targetX, targetY, isMobile) {
    this.x = targetX + (Math.random() - 0.5) * 60;
    this.y = window.innerHeight;
    this.targetX = targetX;
    this.targetY = targetY;
    this.color = HIGH_CONTRAST_PYRO_PALETTE[Math.floor(Math.random() * HIGH_CONTRAST_PYRO_PALETTE.length)];

    const angle = Math.atan2(targetY - this.y, targetX - this.x);
    const speed = isMobile ? 15 + Math.random() * 4 : 20 + Math.random() * 6;

    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.trail = [];
    this.dead = false;
  }

  update() {
    this.trail.push({ x: this.x, y: this.y, alpha: 1.0 });
    if (this.trail.length > 10) this.trail.shift();

    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.16; // Deceleration towards apex

    if (this.vy >= -1 || this.y <= this.targetY) {
      this.dead = true;
    }
  }

  draw(ctx) {
    // High contrast glowing rocket trail
    ctx.save();
    ctx.lineWidth = 2.2;
    ctx.strokeStyle = this.color;
    ctx.shadowBlur = 12;
    ctx.shadowColor = this.color;

    ctx.beginPath();
    for (let i = 0; i < this.trail.length; i++) {
      const p = this.trail[i];
      const progress = i / this.trail.length;
      ctx.globalAlpha = progress * 0.95;
      if (i === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    }
    ctx.stroke();
    ctx.restore();

    // Intense Gold/White Core
    ctx.save();
    ctx.shadowBlur = 16;
    ctx.shadowColor = '#FFD700';
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

class HighContrastParticle {
  constructor(x, y, isMobile) {
    this.x = x;
    this.y = y;
    this.color = HIGH_CONTRAST_PYRO_PALETTE[Math.floor(Math.random() * HIGH_CONTRAST_PYRO_PALETTE.length)];

    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * (isMobile ? 8 : 13) + 2;

    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.alpha = 1.0;
    this.decay = Math.random() * 0.016 + 0.012;
    this.gravity = 0.07;
    this.size = Math.random() * 2.4 + 1.4;
    this.trail = [];
    this.twinkle = Math.random() > 0.3;
    this.dead = false;
  }

  update() {
    this.trail.push({ x: this.x, y: this.y, alpha: this.alpha });
    if (this.trail.length > 5) this.trail.shift();

    this.vx *= 0.95;
    this.vy *= 0.95;
    this.vy += this.gravity;

    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= this.decay;

    if (this.twinkle) {
      this.alpha += (Math.random() - 0.5) * 0.12;
    }

    if (this.alpha <= 0) {
      this.dead = true;
    }
  }

  draw(ctx) {
    if (this.alpha <= 0) return;

    // Vanishing spark trail with high contrast stroke
    ctx.save();
    ctx.lineWidth = 1.4;
    ctx.strokeStyle = this.color;
    for (let i = 0; i < this.trail.length; i++) {
      const tp = this.trail[i];
      ctx.globalAlpha = Math.max(0, tp.alpha * (i / this.trail.length) * 0.7);
      ctx.beginPath();
      ctx.arc(tp.x, tp.y, 0.9, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();

    // High-Contrast Starburst Core (Pops vividly on both light and dark themes)
    ctx.save();
    ctx.globalAlpha = Math.min(1.0, Math.max(0, this.alpha));
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 14;
    ctx.shadowColor = this.color;
    ctx.lineWidth = 0.8;
    ctx.strokeStyle = '#8B0000'; // Dark ruby contrast ring for light theme visibility
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }
}

export default function CelebrationCanvas() {
  const canvasRef = useRef(null);
  const { celebrationId } = useCelebration();
  const animFrameIdRef = useRef(null);
  const rocketsRef = useRef([]);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (celebrationId === 0) return;

    const isMobile = window.innerWidth < 640;
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Multi-wave high-contrast pyrotechnic skyshots
    const launchSequence = () => {
      const waveCount = isMobile ? 3 : 5;

      for (let wave = 0; wave < waveCount; wave++) {
        setTimeout(() => {
          const rocketCount = isMobile ? 2 : 4;
          for (let r = 0; r < rocketCount; r++) {
            const targetX = width * 0.15 + Math.random() * (width * 0.7);
            const targetY = height * 0.15 + Math.random() * (height * 0.3);
            rocketsRef.current.push(new HighContrastRocket(targetX, targetY, isMobile));
          }
        }, wave * 450);
      }
    };

    launchSequence();

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const render = () => {
      ctx.save();
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.28)';
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.restore();

      const isMobileDevice = window.innerWidth < 640;

      // Update & Draw Rockets
      for (let i = rocketsRef.current.length - 1; i >= 0; i--) {
        const rocket = rocketsRef.current[i];
        rocket.update();
        rocket.draw(ctx);

        if (rocket.dead) {
          const particleCount = isMobileDevice ? 55 : 110;
          for (let p = 0; p < particleCount; p++) {
            particlesRef.current.push(new HighContrastParticle(rocket.x, rocket.y, isMobileDevice));
          }
          rocketsRef.current.splice(i, 1);
        }
      }

      // Update & Draw Explosion Particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const particle = particlesRef.current[i];
        particle.update();
        particle.draw(ctx);

        if (particle.dead) {
          particlesRef.current.splice(i, 1);
        }
      }

      if (rocketsRef.current.length > 0 || particlesRef.current.length > 0) {
        animFrameIdRef.current = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        animFrameIdRef.current = null;
      }
    };

    if (!animFrameIdRef.current) {
      animFrameIdRef.current = requestAnimationFrame(render);
    }
  }, [celebrationId]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 w-full h-full"
    />
  );
}
