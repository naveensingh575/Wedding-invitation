import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, MapPin, ArrowRight } from 'lucide-react';
import Countdown from './Countdown';
import BalSandesh from './BalSandesh';
import LocationsSection from './LocationsSection';
import TravelGuide from './TravelGuide';
import RSVPSection from './RSVPSection';
import Footer from './Footer';

export default function LandingPortal({ onSelectSide, currentLang, setCurrentLang, t, musicPlayerProps }) {
  const p = t.portal || t;

  return (
    <div className="animate-fadeIn relative">
      {/* Hero Welcome Banner */}
      <section className="relative pt-28 pb-12 px-4 sm:px-6 lg:px-8 text-center royal-pattern overflow-hidden theme-transition">
        
        {/* Top Lord Ganesha auspicious header */}
        <div className="inline-flex items-center space-x-2.5 px-5 py-2 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-gold)] shadow-md mb-6 backdrop-blur-md animate-bounce">
          <div className="w-7 h-7 rounded-full overflow-hidden border border-[var(--accent-gold)] bg-black p-0.5 shrink-0 shadow-sm">
            <img src="/assets/doodles/ganesha_attached.jpg" alt="Lord Ganesha" className="w-full h-full object-cover object-top" />
          </div>
          <span className="font-hindi text-[var(--accent-primary)] text-sm sm:text-base font-extrabold tracking-wider">
            ॥ श्री गणेशाय नमः ॥
          </span>
        </div>

        {/* Wedding Tag */}
        <div className="mb-3">
          <span className="text-xs uppercase tracking-widest text-[var(--badge-text)] font-semibold bg-[var(--badge-bg)] px-4 py-1.5 rounded-full border border-[var(--badge-border)]">
            {p.subheading || "Shubh Vivah Invitation • शुभ विवाह निमंत्रण"}
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-extrabold text-[var(--text-primary)] tracking-tight max-w-4xl mx-auto my-2 leading-tight">
          {p.heading || "Naveen Luhach & Manisha Sheoran"}
        </h1>

        {/* Subtitle */}
        <p className="font-hindi text-base sm:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mt-3 font-semibold">
          "दो परिवारों का अटूट स्नेह बंधन एवं परिणय सूत्र"
        </p>

        {/* Unified Countdown Timer Section */}
        <div className="max-w-5xl mx-auto mt-6 flex justify-center">
          <Countdown targetDateStr="2026-11-20T23:59:00+05:30" />
        </div>
      </section>

      {/* 2-Column Side Selection Cards (Groom Side vs Bride Side) */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--accent-gold)] font-mono">
            ✨ Choose Invitation Perspective ✨
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-[var(--text-primary)] mt-1">
            {p.chooseSideTitle || "Select Celebration Side / पक्ष चुनें"}
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1.5 max-w-md mx-auto">
            Experience the complete schedule, routes, and hosts from either Groom or Bride side
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* 1. GROOM SIDE CARD (वर पक्ष - नंधा की ढाणी) */}
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
                    src="/assets/real_photos/groom_portal.jpg"
                    alt="Groom Side"
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
                    {p.groomCard?.side || "Groom Side - Nandha ki Dhani"}
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
                  🌾 {p.groomCard?.desc || "1st Ban & Haldi, Mahila Sangeet, Bhaat & Lagan, Ghurchhari & Barat"}
                </p>
              </div>
            </div>

            {/* Theme Adaptive Enter Button */}
            <div className="mt-6">
              <button className="w-full py-3.5 px-6 rounded-2xl bg-[var(--accent-primary)] hover:opacity-90 text-white font-bold text-sm shadow-lg group-hover:opacity-95 flex items-center justify-center space-x-2 transition-all cursor-pointer">
                <span>{p.groomCard?.btn || "Enter Groom's Side (वर पक्ष) 🤵"}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* 2. BRIDE SIDE CARD (वधू पक्ष - आर्य नगर) */}
          <div
            onClick={() => onSelectSide('bride')}
            className="group relative rounded-3xl p-6 sm:p-8 glass-wedding-card border-2 border-[var(--border-gold)] hover:border-[var(--accent-gold)] shadow-2xl hover:shadow-[0_20px_50px_rgba(201,169,110,0.3)] cursor-pointer transition-all duration-500 flex flex-col justify-between overflow-hidden transform hover:-translate-y-2 text-left"
          >
            <div className="absolute top-0 right-0 w-36 h-36 bg-[var(--hero-glow)] rounded-full blur-2xl pointer-events-none" />

            <div>
              {/* Top Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="px-3.5 py-1 rounded-full bg-[var(--badge-bg)] text-[var(--accent-primary)] border border-[var(--badge-border)] text-xs font-bold uppercase tracking-wider">
                  👰 {p.brideCard?.badge || "Bride's Family"}
                </span>
                <span className="text-[11px] text-[var(--text-muted)] font-mono">17, 18, 19, 20 Nov</span>
              </div>

              {/* Bride Image Frame & Title */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-[var(--accent-gold)] shadow-md bg-black shrink-0">
                  <img
                    src="/assets/real_photos/bride_portal.jpg"
                    alt="Bride Side"
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
                    {p.brideCard?.side || "Bride Side - Aryanagar"}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] font-sans mt-0.5">
                    Sou. Manisha Sheoran
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
                  <span>{p.brideCard?.venue || "Arya Nagar, Badhra, Charkhi Dadri"}</span>
                </p>
                <p className="text-[11px] text-[var(--text-muted)] border-t border-[var(--border-gold)]/60 pt-2">
                  🌸 {p.brideCard?.desc || "Ban & Haldi, Mehendi Utsav, Bhaat & Mandap Pujan, Barat Swagat & Shubh Vivah"}
                </p>
              </div>
            </div>

            {/* Theme Adaptive Enter Button */}
            <div className="mt-6">
              <button className="w-full py-3.5 px-6 rounded-2xl bg-[var(--accent-primary)] hover:opacity-90 text-white font-bold text-sm shadow-lg group-hover:opacity-95 flex items-center justify-center space-x-2 transition-all cursor-pointer">
                <span>{p.brideCard?.btn || "Enter Bride's Side (वधू पक्ष) 👰"}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Bal Sandesh */}
      <BalSandesh t={t} />

      {/* Locations & Maps Section */}
      <LocationsSection t={t} />

      {/* Travel Guide */}
      <TravelGuide t={t} />

      {/* RSVP Section */}
      <RSVPSection t={t} />

      {/* Footer */}
      <Footer t={t} />
    </div>
  );
}
