import React, { useEffect, useRef, useState } from 'react';
import { useCelebration } from '../hooks/useCelebration';

/**
 * High-Performance "Skyshot" Fireworks & Congratulatory Overlay Engine
 * Visuals:
 * - Rocket Ascent Trails: Warm Champagne Gold (#FFD700, #F3C06B) and Rose Shimmer.
 * - Rocket Density: 4-6 staggered rockets per cycle.
 * - Congratulatory Overlay: Centered pointer-events-none floating text banner synced to burst peak.
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
    this.x = targetX + (Math.random() - 0.5) * 50;
    this.y = window.innerHeight;
    this.targetX = targetX;
    this.targetY = targetY;
    // Theme-matching warm champagne gold & rose shimmer trails
    this.trailColor = Math.random() > 0.4 ? '#FFD700' : (Math.random() > 0.5 ? '#F3C06B' : '#FF69B4');

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
    if (this.trail.length > 8) this.trail.shift();

    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.16; // Apex deceleration

    if (this.vy >= -1 || this.y <= this.targetY || this.age > 75) {
      this.dead = true;
    }
  }

  draw(ctx) {
    // Warm Champagne Gold / Rose Shimmer Rocket Trail
    ctx.save();
    ctx.lineWidth = 1.8;
    ctx.strokeStyle = this.trailColor;
    ctx.shadowBlur = 10;
    ctx.shadowColor = this.trailColor;

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
    ctx.shadowBlur = 14;
    ctx.shadowColor = '#FFD700';
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2.2, 0, Math.PI * 2);
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

    if (this.alpha < 0.05) {
      this.dead = true;
    }
  }

  draw(ctx) {
    if (this.alpha < 0.05) return;

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

  // Synced Congratulatory Flash Overlay State
  const [showBanner, setShowBanner] = useState(false);
  const [bannerOpacity, setBannerOpacity] = useState(0);

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
      ctx.setTransform(1, 0, 0, 1, 0, 0);
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

    // Trigger synced Congratulatory Text Flash Overlay
    setShowBanner(true);
    const fadeInTimer = setTimeout(() => setBannerOpacity(1), 300);
    const fadeOutTimer = setTimeout(() => setBannerOpacity(0), 5200);
    const unmountTimer = setTimeout(() => setShowBanner(false), 6500);

    const isMobile = window.innerWidth < 640;
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Launch 4–6 staggered rockets per celebration cycle
    const launchSequence = () => {
      const waveCount = isMobile ? 3 : 4;

      for (let wave = 0; wave < waveCount; wave++) {
        setTimeout(() => {
          const rocketCount = isMobile ? 2 : 3;
          for (let r = 0; r < rocketCount; r++) {
            const targetX = width * 0.15 + Math.random() * (width * 0.7);
            const targetY = height * 0.15 + Math.random() * (height * 0.25);
            rocketsRef.current.push(new SkyshotRocket(targetX, targetY, isMobile));
          }
        }, wave * 380);
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
      const MAX_PARTICLES_CAP = isMobileDevice ? 50 : 90;

      for (let i = rocketsRef.current.length - 1; i >= 0; i--) {
        const rocket = rocketsRef.current[i];
        rocket.update();
        rocket.draw(ctx);

        if (rocket.dead) {
          if (particlesRef.current.length < MAX_PARTICLES_CAP) {
            const particleCount = isMobileDevice ? 25 : 40;
            for (let p = 0; p < particleCount; p++) {
              particlesRef.current.push(new SkyshotParticle(rocket.x, rocket.y, isMobileDevice));
            }
          }
          rocketsRef.current.splice(i, 1);
        }
      }

      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const particle = particlesRef.current[i];
        particle.update();
        particle.draw(ctx);

        if (particle.dead || particle.alpha < 0.05) {
          particlesRef.current.splice(i, 1);
        }
      }

      if (rocketsRef.current.length > 0 || particlesRef.current.length > 0) {
        animFrameIdRef.current = requestAnimationFrame(render);
      } else {
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

    return () => {
      clearTimeout(fadeInTimer);
      clearTimeout(fadeOutTimer);
      clearTimeout(unmountTimer);
    };
  }, [celebrationId]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-50 w-full h-full"
        style={{ pointerEvents: 'none' }}
      />

      {/* Floating Animated Congratulatory Flash Overlay (Synced to Burst Peak) */}
      {showBanner && (
        <div
          className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[60] pointer-events-none transition-opacity duration-1000 ease-in-out px-4 w-full max-w-2xl text-center"
          style={{ opacity: bannerOpacity }}
        >
          <div className="py-5 px-6 sm:px-8 rounded-3xl bg-black/60 border-2 border-amber-300/40 backdrop-blur-md shadow-2xl inline-block">
            <h2 className="font-serif text-xl sm:text-3xl md:text-4xl font-extrabold text-white/95 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] tracking-wide leading-snug">
              Congratulations to the newlywed couple! 🥂
            </h2>
            <p className="font-hindi text-amber-200 text-xs sm:text-base font-semibold mt-2 drop-shadow-sm">
              नवीन एवं मनीषा के शुभ विवाह की हार्दिक शुभकामनाएँ! ✨
            </p>
          </div>
        </div>
      )}
    </>
  );
}
