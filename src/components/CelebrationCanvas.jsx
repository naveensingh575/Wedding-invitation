import React, { useEffect, useRef } from 'react';
import { useCelebration } from '../hooks/useCelebration';

/**
 * Lightweight, Ultra-High Performance "Skyshot" Fireworks System
 * Performance: Capped at max 80-100 total active particles, RAF auto-cancel on finish, alpha < 0.05 auto-cleanup.
 * Visuals: Thin crisp white rocket trail soaring upward, exploding into a dense starburst with vibrant wedding tip accents:
 * - Warm Gold (#FFD700)
 * - Crimson (#E63946)
 * - Champagne (#FFF3B0)
 * - Rose (#FF69B4)
 */
const TIP_ACCENT_COLORS = [
  '#FFD700', // Warm Gold
  '#E63946', // Crimson
  '#FFF3B0', // Champagne Flash
  '#FF69B4', // Rose Accent
  '#FFFFFF', // Pure White Core
];

class SkyshotRocket {
  constructor(targetX, targetY, isMobile) {
    this.x = targetX + (Math.random() - 0.5) * 40;
    this.y = window.innerHeight;
    this.targetX = targetX;
    this.targetY = targetY;

    const angle = Math.atan2(targetY - this.y, targetX - this.x);
    const speed = isMobile ? 14 + Math.random() * 3 : 18 + Math.random() * 5;

    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.trail = [];
    this.dead = false;
    this.age = 0;
  }

  update() {
    this.age++;
    this.trail.push({ x: this.x, y: this.y });
    if (this.trail.length > 7) this.trail.shift();

    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.16; // Apex deceleration

    if (this.vy >= -1 || this.y <= this.targetY || this.age > 75) {
      this.dead = true;
    }
  }

  draw(ctx) {
    // Thin, crisp bright white rocket beam
    ctx.save();
    ctx.lineWidth = 1.6;
    ctx.strokeStyle = '#FFFFFF';
    ctx.shadowBlur = 8;
    ctx.shadowColor = '#FFFFFF';

    ctx.beginPath();
    for (let i = 0; i < this.trail.length; i++) {
      const p = this.trail[i];
      if (i === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    }
    ctx.stroke();
    ctx.restore();

    // Rocket Core Point
    ctx.save();
    ctx.shadowBlur = 12;
    ctx.shadowColor = '#FFFFFF';
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

class SkyshotParticle {
  constructor(x, y, isMobile) {
    this.x = x;
    this.y = y;
    this.tipColor = TIP_ACCENT_COLORS[Math.floor(Math.random() * TIP_ACCENT_COLORS.length)];

    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * (isMobile ? 6 : 10) + 2;

    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.alpha = 1.0;
    this.decay = Math.random() * 0.022 + 0.018;
    this.gravity = 0.08;
    this.size = Math.random() * 1.8 + 1.2;
    this.trail = [];
    this.dead = false;
  }

  update() {
    this.trail.push({ x: this.x, y: this.y, alpha: this.alpha });
    if (this.trail.length > 4) this.trail.shift();

    this.vx *= 0.95;
    this.vy *= 0.95;
    this.vy += this.gravity;

    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= this.decay;

    // Auto-cleanup threshold at alpha < 0.05
    if (this.alpha < 0.05) {
      this.dead = true;
    }
  }

  draw(ctx) {
    if (this.alpha < 0.05) return;

    // Faint sparkling white trail leading to tip
    ctx.save();
    ctx.lineWidth = 1.0;
    ctx.strokeStyle = '#FFFFFF';
    for (let i = 0; i < this.trail.length; i++) {
      const tp = this.trail[i];
      ctx.globalAlpha = Math.max(0, tp.alpha * (i / this.trail.length) * 0.5);
      ctx.beginPath();
      ctx.arc(tp.x, tp.y, 0.7, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();

    // Vibrant Wedding Color Burst Tip Core
    ctx.save();
    ctx.globalAlpha = Math.min(1.0, Math.max(0, this.alpha));
    ctx.fillStyle = this.tipColor;
    ctx.shadowBlur = 10;
    ctx.shadowColor = this.tipColor;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
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
      ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset scale matrix to prevent GPU memory leak
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

    // Launch capped lightweight skyshot bursts
    const launchSequence = () => {
      const waveCount = isMobile ? 2 : 3;

      for (let wave = 0; wave < waveCount; wave++) {
        setTimeout(() => {
          const rocketCount = isMobile ? 2 : 3;
          for (let r = 0; r < rocketCount; r++) {
            const targetX = width * 0.2 + Math.random() * (width * 0.6);
            const targetY = height * 0.18 + Math.random() * (height * 0.25);
            rocketsRef.current.push(new SkyshotRocket(targetX, targetY, isMobile));
          }
        }, wave * 400);
      }
    };

    launchSequence();

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const render = () => {
      ctx.save();
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.32)';
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.restore();

      const isMobileDevice = window.innerWidth < 640;
      const MAX_PARTICLES_CAP = isMobileDevice ? 40 : 80;

      // Update & Draw Rockets
      for (let i = rocketsRef.current.length - 1; i >= 0; i--) {
        const rocket = rocketsRef.current[i];
        rocket.update();
        rocket.draw(ctx);

        if (rocket.dead) {
          // Add burst particles only if under max particle cap
          if (particlesRef.current.length < MAX_PARTICLES_CAP) {
            const particleCount = isMobileDevice ? 25 : 45;
            for (let p = 0; p < particleCount; p++) {
              particlesRef.current.push(new SkyshotParticle(rocket.x, rocket.y, isMobileDevice));
            }
          }
          rocketsRef.current.splice(i, 1);
        }
      }

      // Update & Draw Particles with strict alpha < 0.05 cleanup
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const particle = particlesRef.current[i];
        particle.update();
        particle.draw(ctx);

        if (particle.dead || particle.alpha < 0.05) {
          particlesRef.current.splice(i, 1);
        }
      }

      // Continue animation loop as long as rockets or particles remain
      if (rocketsRef.current.length > 0 || particlesRef.current.length > 0) {
        animFrameIdRef.current = requestAnimationFrame(render);
      } else {
        // Complete cleanup and cancel RAF loop
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        if (animFrameIdRef.current) {
          cancelAnimationFrame(animFrameIdRef.current);
          animFrameIdRef.current = null;
        }
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
      style={{ pointerEvents: 'none' }}
    />
  );
}
