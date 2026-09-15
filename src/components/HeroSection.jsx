import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, MapPin, Film } from 'lucide-react';
import { useCelebration } from '../hooks/useCelebration';

export default function HeroSection({ customCouplePhoto, openVideoModal, t, sideData }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const { triggerCelebration } = useCelebration();

  const activeData = sideData || t.groom || t;

  useEffect(() => {
    const targetDate = new Date('2026-11-20T23:59:00+05:30').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen pt-28 pb-16 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center text-center royal-pattern overflow-hidden theme-transition">
      {/* Subtle Ambient Floral Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[var(--hero-glow)] rounded-full blur-3xl pointer-events-none" />

      {/* Top Auspicious Lord Ganesha Header Badge */}
      <div className="inline-flex items-center space-x-2.5 px-5 py-2 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-gold)] shadow-md mb-6 backdrop-blur-md animate-bounce">
        <div className="w-7 h-7 rounded-full overflow-hidden border border-[var(--accent-gold)] bg-black p-0.5 shrink-0 shadow-sm">
          <img src="/assets/doodles/ganesha_attached.jpg" alt="Lord Ganesha" className="w-full h-full object-cover object-top" />
        </div>
        <span className="font-hindi text-[var(--accent-primary)] text-sm sm:text-base font-extrabold tracking-wider">
          ॥ श्री गणेशाय नमः ॥
        </span>
      </div>

      {/* Inviter Honor Tag */}
      <div className="mb-3 max-w-3xl">
        <span className="text-xs uppercase tracking-widest text-[var(--badge-text)] font-semibold bg-[var(--badge-bg)] px-4 py-1.5 rounded-full border border-[var(--badge-border)]">
          {activeData.invitationTag}
        </span>
        
        <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] mt-3">
          {activeData.inviter}
        </h2>
        <p className="text-xs text-[var(--text-secondary)] font-sans mt-1">
          {activeData.inviterSub}
        </p>
      </div>

      {/* Main Headline */}
      <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-extrabold text-[var(--text-primary)] tracking-tight max-w-4xl my-2 pt-2 pb-1 px-2 leading-normal sm:leading-snug">
        {activeData.heroHeading}
      </h1>

      {/* Lineage Detail Card - Positioned BELOW the Main Headline */}
      <div className="my-3 max-w-2xl px-5 py-2.5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-gold)] text-[11px] sm:text-xs text-[var(--text-secondary)] leading-relaxed font-sans shadow-sm">
        {activeData.lineage}
      </div>

      {/* Subheading Quote */}
      <p className="font-hindi text-base sm:text-xl text-[var(--text-secondary)] max-w-2xl mb-8 leading-relaxed italic">
        "{activeData.heroSubheading}"
      </p>

      {/* Single Common Couple Photo Showcase Card (Clean Official Frame) */}
      <div className="relative group max-w-md w-full mb-6">
        <div className="absolute -inset-1.5 bg-gradient-to-r from-[var(--accent-gold)] via-[var(--accent-secondary)] to-[var(--accent-gold)] rounded-3xl blur-md opacity-40 group-hover:opacity-75 transition duration-700"></div>
        <div className="relative glass-wedding-card rounded-3xl p-5 border border-[var(--border-gold)] shadow-2xl flex flex-col items-center">
          
          {/* Common Couple Photo Frame */}
          <div className="relative w-full aspect-[1/2] sm:aspect-[9/16] max-h-[500px] rounded-2xl overflow-hidden border-2 border-[var(--border-gold)] shadow-lg bg-black/5 group">
            <img
              src={
                customCouplePhoto ||
                (isBrideSide
                  ? '/assets/doodles/bride.png'
                  : isGroomSide
                  ? '/assets/doodles/groom.png'
                  : '/assets/doodles/couple.png')
              }
              alt="Naveen Luhach & Manisha Sheoran"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

            {/* Artwork Badge Tag */}
            <div className="absolute top-3 left-3 bg-[var(--bg-elevated)]/90 border border-[var(--border-gold)] backdrop-blur-md px-3 py-1 rounded-full text-[11px] text-[var(--accent-primary)] font-semibold flex items-center space-x-1 z-10 shadow-sm">
              <Sparkles className="w-3 h-3 text-[var(--accent-gold)]" />
              <span>{portraitBadgeText}</span>
            </div>
          </div>

          {/* Couple Name Tag & Styled Location Badge */}
          <div className="mt-5 text-center w-full">
            <div className="flex items-center justify-center space-x-2 text-2xl sm:text-3xl font-serif font-extrabold text-[var(--text-primary)] flex-wrap">
              <span>Naveen Luhach</span>
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500 animate-pulse" />
              <span>Manisha Sheoran</span>
            </div>
            
            <div className="mt-2 flex items-center justify-center space-x-2 text-xs">
              <span className="px-3 py-0.5 rounded-full bg-[var(--badge-bg)] text-[var(--badge-text)] border border-[var(--badge-border)] font-bold">
                #Navisha
              </span>
            </div>

            {/* Styled Location Badge */}
            <div className="mt-3 inline-flex items-center justify-center px-4 py-2 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-gold)] text-xs text-[var(--text-secondary)] font-sans shadow-sm">
              <MapPin className="w-4 h-4 text-[var(--accent-gold)] shrink-0 mr-1.5" />
              <span className="font-semibold text-[var(--text-primary)]">
                {activeData.isBrideSide
                  ? "Arya Nagar, Post & Tehsil Badhra, Distt. Charkhi Dadri (Haryana) — 127306"
                  : "Vill. Nandha Ki Dhani, Post & Tehsil Badhra, Distt. Charkhi Dadri (Haryana) — 127308"}
              </span>
            </div>

          </div>
        </div>
      </div>

      {/* Theme-Adaptive Action Buttons Deck */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md my-3 z-10">
        {/* Watch Video Invitation Button (Theme Adaptive bg-[var(--accent-primary)]) */}
        <button
          onClick={openVideoModal}
          className="w-full sm:w-1/2 py-3.5 px-6 rounded-2xl bg-[var(--accent-primary)] hover:opacity-90 text-white font-serif font-bold text-sm shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center space-x-2 border border-amber-300/40 group cursor-pointer"
        >
          <Film className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
          <span className="tracking-wide">Watch Video Invitation</span>
        </button>

        {/* Get Location & Maps Button */}
        <a
          href="#locations"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('locations')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="w-full sm:w-1/2 py-3.5 px-6 rounded-2xl bg-[var(--bg-elevated)] hover:bg-[var(--bg-card)] border-2 border-[var(--border-gold)] text-[var(--text-primary)] hover:text-[var(--accent-primary)] font-serif font-bold text-sm shadow-xl hover:border-[var(--accent-gold)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center space-x-2 group cursor-pointer"
        >
          <MapPin className="w-4 h-4 text-[var(--accent-gold)] group-hover:scale-110 transition-transform" />
          <span className="tracking-wide">Get Location & Maps</span>
        </a>
      </div>
    </section>
  );
}
