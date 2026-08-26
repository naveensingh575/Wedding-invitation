import React, { useEffect, useRef, useState } from 'react';
import { useCelebration } from '../hooks/useCelebration';

/**
 * Commercial Pyrotechnic Skyshot Fireworks Engine & Floating Text System
 * - Fixed Overlay: fixed inset-0 pointer-events-none z-[9999]
 * - Rocket Ascent: Champagne gold spark trail soaring upward from bottom screen.
 * - Central Peony Shell: Pure white/silver 360° spherical pop burst with high velocity & crisp dissipation.
 * - Secondary Willow Shells: Warm gold & rose embers drifting downward with air resistance and shimmering flicker.
 * - Floating Text: Zero-box transparent overlay with gold-rose gradient serif font synced to burst peak.
 */
class PyrotechnicRocket {
  constructor(targetX, targetY, isPeony, isMobile) {
    this.x = targetX + (Math.random() - 0.5) * 40;
    this.y = window.innerHeight;
    this.targetX = targetX;
    this.targetY = targetY;
    this.isPeony = isPeony;
    this.trailColor = isPeony ? '#FFF3B0' : (Math.random() > 0.5 ? '#FFD700' : '#FF69B4');

    const angle = Math.atan2(targetY - this.y, targetX - this.x);
    const speed = isMobile ? 15 + Math.random() * 3 : 19 + Math.random() * 5;

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
    // Sparkling Rocket Ascent Streamer
    ctx.save();
    ctx.lineWidth = this.isPeony ? 2.2 : 1.8;
    ctx.strokeStyle = this.trailColor;
    ctx.shadowBlur = 12;
    ctx.shadowColor = this.trailColor;

    ctx.beginPath();
    for (let i = 0; i < this.trail.length; i++) {
      const p = this.trail[i];
      if (i === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    }
    ctx.stroke();
    ctx.restore();

    // Rocket Core Spark
    ctx.save();
    ctx.shadowBlur = 16;
    ctx.shadowColor = '#FFFFFF';
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

class PeonyWhiteParticle {
  constructor(x, y, isMobile) {
    this.x = x;
    this.y = y;
    this.color = Math.random() > 0.2 ? '#FFFFFF' : '#F0F8FF';

    // 360-Degree Spherical Expansion
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * (isMobile ? 8 : 14) + 3;

    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.alpha = 1.0;
    this.decay = Math.random() * 0.024 + 0.018;
    this.gravity = 0.05;
    this.size = Math.random() * 2.2 + 1.2;
    this.dead = false;
  }

  update() {
    this.vx *= 0.94;
    this.vy *= 0.94;
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
    ctx.globalAlpha = Math.min(1.0, Math.max(0, this.alpha));
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 14;
    ctx.shadowColor = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

class WillowGoldParticle {
  constructor(x, y, isMobile) {
    this.x = x;
    this.y = y;
    const colors = ['#FFD700', '#F7E7CE', '#FF69B4', '#FFF3B0'];
    this.color = colors[Math.floor(Math.random() * colors.length)];

    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * (isMobile ? 6 : 10) + 1.5;

    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.alpha = 1.0;
    this.decay = Math.random() * 0.018 + 0.012;
    this.gravity = 0.07;
    this.size = Math.random() * 2.0 + 1.0;
    this.trail = [];
    this.twinkle = Math.random() > 0.35;
    this.dead = false;
  }

  update() {
    this.trail.push({ x: this.x, y: this.y, alpha: this.alpha });
    if (this.trail.length > 5) this.trail.shift();

    this.vx *= 0.96; // Air resistance velocity decay
    this.vy *= 0.96;
    this.vy += this.gravity;

    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= this.decay;

    if (this.twinkle) {
      this.alpha += (Math.random() - 0.5) * 0.1;
    }

    if (this.alpha < 0.05) {
      this.dead = true;
    }
  }

  draw(ctx) {
    if (this.alpha < 0.05) return;

    // Willow Streamer Trail
    ctx.save();
    ctx.lineWidth = 1.0;
    ctx.strokeStyle = this.color;
    for (let i = 0; i < this.trail.length; i++) {
      const tp = this.trail[i];
      ctx.globalAlpha = Math.max(0, tp.alpha * (i / this.trail.length) * 0.5);
      ctx.beginPath();
      ctx.arc(tp.x, tp.y, 0.7, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();

    // Willow Ember Core
    ctx.save();
    ctx.globalAlpha = Math.min(1.0, Math.max(0, this.alpha));
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 10;
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

  // Synced Transparent Congratulatory Text Flash State
  const [showText, setShowText] = useState(false);
  const [textOpacity, setTextOpacity] = useState(0);

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

    // Synced Floating Text Overlay Sequence (Zero Box Background)
    setShowText(true);
    const fadeInTimer = setTimeout(() => setTextOpacity(1), 600); // Fades in as rockets hit apex
    const fadeOutTimer = setTimeout(() => setTextOpacity(0), 5200); // Fades out with embers
    const unmountTimer = setTimeout(() => setShowText(false), 6800);

    const isMobile = window.innerWidth < 640;
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Multi-Tier Commercial Pyrotechnic Launch Sequence
    const launchSequence = () => {
      // 1. High-Altitude Pure White Peony Shell
      setTimeout(() => {
        rocketsRef.current.push(new PyrotechnicRocket(width * 0.5, height * 0.18, true, isMobile));
      }, 0);

      // 2. Staggered Willow Shells in Warm Gold & Rose
      const waveCount = isMobile ? 3 : 4;
      for (let wave = 1; wave <= waveCount; wave++) {
        setTimeout(() => {
          const count = isMobile ? 1 : 2;
          for (let r = 0; r < count; r++) {
            const targetX = width * 0.18 + Math.random() * (width * 0.64);
            const targetY = height * 0.18 + Math.random() * (height * 0.28);
            const isPeonyShell = wave === 2 && r === 0;
            rocketsRef.current.push(new PyrotechnicRocket(targetX, targetY, isPeonyShell, isMobile));
          }
        }, wave * 350);
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
      const MAX_PARTICLES_CAP = isMobileDevice ? 60 : 120;

      // Update & Draw Rockets
      for (let i = rocketsRef.current.length - 1; i >= 0; i--) {
        const rocket = rocketsRef.current[i];
        rocket.update();
        rocket.draw(ctx);

        if (rocket.dead) {
          if (particlesRef.current.length < MAX_PARTICLES_CAP) {
            if (rocket.isPeony) {
              // High-density Pure White Spherical Pop
              const peonyCount = isMobileDevice ? 40 : 75;
              for (let p = 0; p < peonyCount; p++) {
                particlesRef.current.push(new PeonyWhiteParticle(rocket.x, rocket.y, isMobileDevice));
              }
            } else {
              // Willow Embers
              const willowCount = isMobileDevice ? 25 : 45;
              for (let p = 0; p < willowCount; p++) {
                particlesRef.current.push(new WillowGoldParticle(rocket.x, rocket.y, isMobileDevice));
              }
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
      {/* Fullscreen HTML5 Fixed Canvas Overlay */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9999] w-full h-full"
        style={{ pointerEvents: 'none' }}
      />

      {/* Pure Floating Congratulatory Text Overlay (Zero Box Background) */}
      {showText && (
        <div className="fixed inset-0 z-[9999] pointer-events-none flex flex-col items-center justify-center px-4 text-center">
          <div
            className="transition-all duration-1000 ease-out transform flex flex-col items-center pointer-events-none"
            style={{
              opacity: textOpacity,
              transform: `scale(${0.92 + textOpacity * 0.08})`,
            }}
          >
            <h2 className="font-serif italic text-3xl sm:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-amber-200 via-rose-100 to-amber-200 bg-clip-text text-transparent drop-shadow-[0_4px_24px_rgba(255,215,0,0.65)] tracking-wide leading-tight">
              Congratulations to the newlywed couple! 🥂
            </h2>
            <p className="font-hindi text-base sm:text-2xl font-bold text-amber-200/95 mt-3 drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
              नवीन एवं मनीषा के शुभ विवाह की हार्दिक शुभकामनाएँ! ✨
            </p>
          </div>
        </div>
      )}
    </>
  );
}
