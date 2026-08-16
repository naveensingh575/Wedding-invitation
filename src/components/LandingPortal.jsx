import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Clock, MapPin, ArrowRight, UserCheck, Music, Compass, ShieldCheck } from 'lucide-react';

export default function LandingPortal({ onSelectSide, currentLang, setCurrentLang, t, playlist, currentTrackIndex, isPlaying, onTogglePlay }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date('2026-11-20T19:00:00+05:30').getTime();

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

  const p = t.portal || {};
  const currentTrack = playlist[currentTrackIndex] || playlist[0];

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center text-center royal-pattern overflow-hidden relative theme-transition">
      {/* Subtle Ambient Glowing Backdrops */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[var(--hero-glow)] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[var(--badge-bg)] rounded-full blur-3xl pointer-events-none" />

      {/* Top Auspicious Lord Ganesha Header Badge */}
      <div className="inline-flex items-center space-x-2.5 px-6 py-2.5 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-gold)] shadow-lg mb-6 backdrop-blur-md animate-bounce">
        <div className="w-8 h-8 rounded-full overflow-hidden border border-[var(--accent-gold)] bg-black p-0.5 shrink-0 shadow-sm">
          <img src="/assets/doodles/ganesha_attached.jpg" alt="Lord Ganesha" className="w-full h-full object-cover object-top" />
        </div>
        <span className="font-hindi text-[var(--accent-primary)] text-sm sm:text-base font-extrabold tracking-wider">
          ॥ श्री गणेशाय नमः ॥
        </span>
      </div>

      {/* Portal Top Header */}
      <div className="max-w-4xl mx-auto mb-6">
        <span className="text-xs uppercase tracking-widest text-[var(--badge-text)] font-semibold bg-[var(--badge-bg)] px-5 py-2 rounded-full border border-[var(--badge-border)] shadow-sm inline-block mb-4">
          ✨ {p.tagline || "Vedic & Haryanvi Royal Vivah Utsav"}
        </span>

        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-extrabold text-[var(--text-primary)] tracking-tight leading-tight">
          Naveen <span className="text-rose-500 font-sans inline-block animate-pulse">❤️</span> Manisha
        </h1>

        <div className="mt-3 flex items-center justify-center space-x-3">
          <span className="px-4 py-1 rounded-full bg-[var(--badge-bg)] text-[var(--badge-text)] border border-[var(--badge-border)] text-xs font-bold font-mono">
            #Navisha
          </span>
          <span className="text-xs sm:text-sm text-[var(--text-secondary)] font-sans">
            20 November 2026 • Haryana
          </span>
        </div>

        <p className="font-hindi text-base sm:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mt-4 leading-relaxed italic">
          "{p.subheading || "दो परिवारों एवं हृदयों के पावन मिलन समारोह में आपका सहर्ष स्वागत है"}"
        </p>
      </div>

      {/* Side Selection Prompt */}
      <div className="my-6 max-w-xl mx-auto">
        <p className="text-sm sm:text-base font-bold text-[var(--text-primary)] font-serif bg-[var(--bg-elevated)] border border-[var(--border-gold)] px-6 py-2.5 rounded-full shadow-sm">
          {p.selectPrompt || "Please choose your invitation side to view personalized programs & details:"}
        </p>
      </div>

      {/* ============================================================
          TWO INTERACTIVE ROYAL SELECTION CARDS (GROOM SIDE & BRIDE SIDE)
      ============================================================ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full my-6 z-10">
        
        {/* 1. GROOM SIDE CARD (वर पक्ष) */}
        <div
          onClick={() => onSelectSide('groom')}
          className="group relative rounded-3xl p-6 sm:p-8 glass-wedding-card border-2 border-[var(--border-gold)] hover:border-[var(--accent-gold)] shadow-2xl hover:shadow-[0_20px_50px_rgba(201,169,110,0.3)] cursor-pointer transition-all duration-500 flex flex-col justify-between overflow-hidden transform hover:-translate-y-2 text-left"
        >
          <div className="absolute top-0 right-0 w-36 h-36 bg-[var(--hero-glow)] rounded-full blur-2xl pointer-events-none" />

          <div>
            {/* Top Badge */}
            <div className="flex items-center justify-between mb-4">
              <span className="px-3.5 py-1 rounded-full bg-[var(--badge-bg)] text-[var(--accent-primary)] border border-[var(--badge-border)] text-xs font-bold uppercase tracking-wider">
                🤵 {p.groomCard?.badge || "Groom's Family"}
              </span>
              <span className="text-[11px] text-[var(--text-muted)] font-mono">16, 17, 19, 20 Nov</span>
            </div>

            {/* Groom Image Frame & Title */}
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-[var(--accent-gold)] shadow-md bg-black shrink-0">
                <img
                  src="/assets/doodles/groom_haldi.jpg"
                  alt="Groom Side"
                  className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
                  {p.groomCard?.side || "Groom's Side (वर पक्ष)"}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] font-sans mt-0.5">
                  Chi. Naveen Luhach
                </p>
              </div>
            </div>

            {/* Inviter & Venue Details */}
            <div className="p-4 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-gold)] text-xs font-sans space-y-2 shadow-sm">
              <p className="text-[var(--text-primary)] font-bold">
                👨‍👩‍👧‍👦 {p.groomCard?.hosts || "Hon. Capt. Satyavir Singh & Luhach Family"}
              </p>
              <p className="text-[var(--text-secondary)] flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-[var(--accent-gold)] shrink-0" />
                <span>{p.groomCard?.venue || "Vill. Nandha ki Dhani, Badhra"}</span>
              </p>
              <p className="text-[11px] text-[var(--text-muted)] border-t border-[var(--border-gold)]/60 pt-2">
                🌾 {p.groomCard?.desc || "Haldi, Bhaat, Ghurchhari Horse Ceremony & Barat Departure"}
              </p>
            </div>
          </div>

          {/* Enter Button */}
          <div className="mt-6">
            <button className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[var(--accent-gold)] to-[#AA7C11] text-white font-bold text-sm shadow-lg group-hover:opacity-95 flex items-center justify-center space-x-2 transition-all">
              <span>{p.groomCard?.btn || "Enter Groom's Invitation 🤵"}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* 2. BRIDE SIDE CARD (वधू पक्ष) */}
        <div
          onClick={() => onSelectSide('bride')}
          className="group relative rounded-3xl p-6 sm:p-8 glass-wedding-card border-2 border-[var(--border-gold)] hover:border-[var(--accent-gold)] shadow-2xl hover:shadow-[0_20px_50px_rgba(201,166,160,0.3)] cursor-pointer transition-all duration-500 flex flex-col justify-between overflow-hidden transform hover:-translate-y-2 text-left"
        >
          <div className="absolute top-0 right-0 w-36 h-36 bg-[var(--badge-bg)] rounded-full blur-2xl pointer-events-none" />

          <div>
            {/* Top Badge */}
            <div className="flex items-center justify-between mb-4">
              <span className="px-3.5 py-1 rounded-full bg-[var(--badge-bg)] text-[var(--accent-primary)] border border-[var(--badge-border)] text-xs font-bold uppercase tracking-wider">
                👰 {p.brideCard?.badge || "Bride's Family"}
              </span>
              <span className="text-[11px] text-[var(--text-muted)] font-mono">16, 17, 19, 20 Nov</span>
            </div>

            {/* Bride Image Frame & Title */}
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-[var(--accent-gold)] shadow-md bg-black shrink-0">
                <img
                  src="/assets/doodles/haldi.jpg"
                  alt="Bride Side"
                  className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
                  {p.brideCard?.side || "Bride's Side (वधू पक्ष)"}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] font-sans mt-0.5">
                  Ku. Manisha Sheoran
                </p>
              </div>
            </div>

            {/* Inviter & Venue Details */}
            <div className="p-4 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-gold)] text-xs font-sans space-y-2 shadow-sm">
              <p className="text-[var(--text-primary)] font-bold">
                👨‍👩‍👧‍👦 {p.brideCard?.hosts || "Shri Jagvir Singh Sheoran & Sheoran Family"}
              </p>
              <p className="text-[var(--text-secondary)] flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-[var(--accent-gold)] shrink-0" />
                <span>{p.brideCard?.venue || "Arya Nagar, Charkhi Dadri"}</span>
              </p>
              <p className="text-[11px] text-[var(--text-muted)] border-t border-[var(--border-gold)]/60 pt-2">
                🌸 {p.brideCard?.desc || "Mehendi, Bhaat, Barat Welcome, Varmala & Sacred Pheras"}
              </p>
            </div>
          </div>

          {/* Enter Button */}
          <div className="mt-6">
            <button className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[var(--accent-gold)] to-[#AA7C11] text-white font-bold text-sm shadow-lg group-hover:opacity-95 flex items-center justify-center space-x-2 transition-all">
              <span>{p.brideCard?.btn || "Enter Bride's Invitation 👰"}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

      </div>

      {/* Live Wedding Countdown Timer Card */}
      <div className="w-full max-w-3xl glass-wedding-card rounded-3xl p-6 border border-[var(--border-gold)] shadow-xl my-8">
        <div className="flex items-center justify-center space-x-2 text-[var(--text-primary)] mb-4">
          <Clock className="w-5 h-5 text-[var(--accent-gold)]" />
          <h3 className="font-serif text-base sm:text-lg font-bold tracking-wide">
            {p.countdownLabel || "Countdown to Grand Vivah — 20 November 2026"}
          </h3>
        </div>

        <div className="grid grid-cols-4 gap-3 sm:gap-6">
          <div className="bg-[var(--bg-elevated)] rounded-2xl p-3 sm:p-4 border border-[var(--border-gold)] flex flex-col items-center shadow-sm">
            <span className="font-serif text-2xl sm:text-4xl font-extrabold text-[var(--accent-primary)]">
              {timeLeft.days}
            </span>
            <span className="text-[10px] sm:text-xs text-[var(--text-muted)] uppercase tracking-widest mt-1">Days</span>
          </div>

          <div className="bg-[var(--bg-elevated)] rounded-2xl p-3 sm:p-4 border border-[var(--border-gold)] flex flex-col items-center shadow-sm">
            <span className="font-serif text-2xl sm:text-4xl font-extrabold text-[var(--accent-primary)]">
              {timeLeft.hours}
            </span>
            <span className="text-[10px] sm:text-xs text-[var(--text-muted)] uppercase tracking-widest mt-1">Hours</span>
          </div>

          <div className="bg-[var(--bg-elevated)] rounded-2xl p-3 sm:p-4 border border-[var(--border-gold)] flex flex-col items-center shadow-sm">
            <span className="font-serif text-2xl sm:text-4xl font-extrabold text-[var(--accent-primary)]">
              {timeLeft.minutes}
            </span>
            <span className="text-[10px] sm:text-xs text-[var(--text-muted)] uppercase tracking-widest mt-1">Mins</span>
          </div>

          <div className="bg-[var(--bg-elevated)] rounded-2xl p-3 sm:p-4 border border-[var(--border-gold)] flex flex-col items-center shadow-sm">
            <span className="font-serif text-2xl sm:text-4xl font-extrabold text-[var(--accent-gold)] animate-pulse">
              {timeLeft.seconds}
            </span>
            <span className="text-[10px] sm:text-xs text-[var(--text-muted)] uppercase tracking-widest mt-1">Secs</span>
          </div>
        </div>
      </div>
    </div>
  );
}
