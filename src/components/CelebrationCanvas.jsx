import React, { useEffect, useRef } from 'react';
import { useCelebration } from '../hooks/useCelebration';

/**
 * Pure Bright White Realistic Commercial "Skyshot" Fireworks System
 * Overlay: fixed inset-0 pointer-events-none z-50
 * Visuals: Pure bright white (#FFFFFF), brilliant shimmer, thin glowing trails,
 * dense white starburst apex, and faint vanishing crackling trails.
 */
class WhiteRocket {
  constructor(targetX, targetY, isMobile) {
    this.x = targetX + (Math.random() - 0.5) * 60;
    this.y = window.innerHeight;
    this.targetX = targetX;
    this.targetY = targetY;

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
    // Very thin, bright white trail
    ctx.save();
    ctx.lineWidth = 1.8;
    ctx.strokeStyle = '#FFFFFF';
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#FFFFFF';

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

    // Intense White Rocket Core
    ctx.save();
    ctx.shadowBlur = 16;
    ctx.shadowColor = '#FFFFFF';
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

class WhiteStarburstParticle {
  constructor(x, y, isMobile) {
    this.x = x;
    this.y = y;

    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * (isMobile ? 8 : 13) + 2;

    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.alpha = 1.0;
    this.decay = Math.random() * 0.016 + 0.012;
    this.gravity = 0.07;
    this.size = Math.random() * 2.2 + 1.2;
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

    // Faint vanishing crackling trail
    ctx.save();
    ctx.lineWidth = 1.2;
    ctx.strokeStyle = '#FFFFFF';
    for (let i = 0; i < this.trail.length; i++) {
      const tp = this.trail[i];
      ctx.globalAlpha = Math.max(0, tp.alpha * (i / this.trail.length) * 0.6);
      ctx.beginPath();
      ctx.arc(tp.x, tp.y, 0.8, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();

    // Pure White Starburst Core
    ctx.save();
    ctx.globalAlpha = Math.min(1.0, Math.max(0, this.alpha));
    ctx.fillStyle = '#FFFFFF';
    ctx.shadowBlur = 12;
    ctx.shadowColor = '#FFFFFF';
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

  useEffect(() => {
    if (celebrationId === 0) return;

    const isMobile = window.innerWidth < 640;
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Launch multi-wave pure white commercial skyshots for 5-7 seconds
    const launchSequence = () => {
      const waveCount = isMobile ? 3 : 5;

      for (let wave = 0; wave < waveCount; wave++) {
        setTimeout(() => {
          const rocketCount = isMobile ? 2 : 4;
          for (let r = 0; r < rocketCount; r++) {
            const targetX = width * 0.15 + Math.random() * (width * 0.7);
            const targetY = height * 0.15 + Math.random() * (height * 0.3);
            rocketsRef.current.push(new WhiteRocket(targetX, targetY, isMobile));
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
            particlesRef.current.push(new WhiteStarburstParticle(rocket.x, rocket.y, isMobileDevice));
          }
          rocketsRef.current.splice(i, 1);
        }
      }

      // Update & Draw Pure White Starburst Particles
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
