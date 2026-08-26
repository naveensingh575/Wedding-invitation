import React, { useEffect, useRef } from 'react';
import { useCelebration } from '../hooks/useCelebration';

/**
 * Custom Disney+ Hotstar Victory Style Skyshot Fireworks System
 * Royal Wedding Color Palette:
 * - Royal Gold (#FFD700)
 * - Deep Crimson (#E63946)
 * - Warm Rose (#FF69B4)
 * - Champagne (#F7E7CE)
 * - Emerald Green (#2A9D8F)
 */
const WEDDING_PALETTE = [
  '#FFD700', // Royal Gold
  '#E63946', // Deep Crimson
  '#FF69B4', // Warm Rose
  '#F7E7CE', // Champagne
  '#2A9D8F', // Emerald Green
  '#FFF8DC', // Creamy White Sparkle
  '#00BFFF', // Sky Blue Sparkle Accent
];

class Rocket {
  constructor(targetX, targetY, color, isMobile) {
    this.x = targetX + (Math.random() - 0.5) * 80;
    this.y = window.innerHeight;
    this.targetX = targetX;
    this.targetY = targetY;
    this.color = color;

    const angle = Math.atan2(targetY - this.y, targetX - this.x);
    const speed = isMobile ? 14 + Math.random() * 4 : 18 + Math.random() * 6;
    
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.trail = [];
    this.dead = false;
  }

  update() {
    this.trail.push({ x: this.x, y: this.y, alpha: 1 });
    if (this.trail.length > 8) this.trail.shift();

    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.15; // Slow down rocket near apex

    // Explode near or past target Y height
    if (this.vy >= -1 || this.y <= this.targetY) {
      this.dead = true;
    }
  }

  draw(ctx) {
    // Draw Glowing Spark Trail
    ctx.save();
    ctx.lineWidth = 2.5;
    for (let i = 0; i < this.trail.length; i++) {
      const p = this.trail[i];
      const progress = i / this.trail.length;
      ctx.beginPath();
      ctx.strokeStyle = this.color;
      ctx.globalAlpha = progress * 0.8;
      ctx.arc(p.x, p.y, 1.5 * progress, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();

    // Rocket Head
    ctx.save();
    ctx.shadowBlur = 12;
    ctx.shadowColor = this.color;
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

class BurstParticle {
  constructor(x, y, color, isMobile) {
    this.x = x;
    this.y = y;
    this.color = color;
    
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * (isMobile ? 7 : 11) + 2;
    
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.alpha = 1;
    this.decay = Math.random() * 0.015 + 0.01;
    this.gravity = 0.08;
    this.size = Math.random() * 2.5 + 1.5;
    this.twinkle = Math.random() > 0.4;
    this.dead = false;
  }

  update() {
    this.vx *= 0.96;
    this.vy *= 0.96;
    this.vy += this.gravity;

    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= this.decay;

    if (this.twinkle) {
      this.alpha += (Math.random() - 0.5) * 0.08;
    }

    if (this.alpha <= 0) {
      this.dead = true;
    }
  }

  draw(ctx) {
    if (this.alpha <= 0) return;
    ctx.save();
    ctx.globalAlpha = Math.max(0, this.alpha);
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 8;
    ctx.shadowColor = this.color;
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

  // Trigger burst sequence whenever celebrationId increments
  useEffect(() => {
    if (celebrationId === 0) return;

    const isMobile = window.innerWidth < 640;
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Launch a Disney+ Hotstar style multi-wave skyshot sequence
    const launchSequence = () => {
      const waveCount = isMobile ? 3 : 5;

      for (let wave = 0; wave < waveCount; wave++) {
        setTimeout(() => {
          const rocketCount = isMobile ? 2 : 3;

          for (let i = 0; i < rocketCount; i++) {
            const targetX = (width * 0.15) + Math.random() * (width * 0.7);
            const targetY = (height * 0.15) + Math.random() * (height * 0.35);
            const color = WEDDING_PALETTE[Math.floor(Math.random() * WEDDING_PALETTE.length)];

            rocketsRef.current.push(new Rocket(targetX, targetY, color, isMobile));
          }
        }, wave * 450);
      }
    };

    launchSequence();

    // Start 60 FPS Render Loop if not running
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const render = () => {
      // Clear with slight trail blur effect
      ctx.save();
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.restore();

      const isMobileDevice = window.innerWidth < 640;

      // Update & Draw Rockets
      for (let i = rocketsRef.current.length - 1; i >= 0; i--) {
        const rocket = rocketsRef.current[i];
        rocket.update();
        rocket.draw(ctx);

        if (rocket.dead) {
          // Detonate Rocket into Spherical Burst
          const particleCount = isMobileDevice ? 50 : 100;
          for (let p = 0; p < particleCount; p++) {
            particlesRef.current.push(
              new BurstParticle(
                rocket.x,
                rocket.y,
                WEDDING_PALETTE[Math.floor(Math.random() * WEDDING_PALETTE.length)],
                isMobileDevice
              )
            );
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

      // Continue animation loop as long as active elements exist
      if (rocketsRef.current.length > 0 || particlesRef.current.length > 0) {
        animFrameIdRef.current = requestAnimationFrame(render);
      } else {
        // Clear remaining canvas completely when done
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
      className="fixed inset-0 pointer-events-none z-[9999] w-full h-full"
    />
  );
}
