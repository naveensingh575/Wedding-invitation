import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X } from 'lucide-react';

export default function Navbar({ isMuted, setIsMuted, currentLang, setCurrentLang, t }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.schedule, href: '#program' },
    { name: t.nav.locations, href: '#locations' },
    { name: t.nav.video, href: '#video-invite' },
    { name: t.nav.travel, href: '#travel' },
    { name: t.nav.gallery, href: '#gallery' },
    { name: t.nav.rsvp, href: '#rsvp' },
    { name: t.nav.wishes, href: '#wishes' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[var(--nav-bg)] backdrop-blur-md py-2.5 border-b border-[var(--border-gold)] shadow-sm'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand with Small Couple Photo Avatar */}
        <a href="#" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-full border-2 border-[var(--accent-gold)] p-0.5 shadow-sm group-hover:scale-105 transition-transform overflow-hidden bg-black shrink-0">
            <img
              src="/assets/real_photos/couple_common.jpg"
              alt="Navisha Couple Photo"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div>
            <h1 className="font-serif text-sm sm:text-base font-extrabold text-[var(--text-primary)] tracking-wide leading-tight group-hover:text-[var(--accent-primary)] transition-colors">
              {t.brandTitle}
            </h1>
            <p className="text-[11px] text-[var(--text-secondary)] font-medium font-sans">
              Naveen ❤️ Manisha #Navisha
            </p>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[var(--accent-gold)] hover:after:w-full after:transition-all"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Action Controls */}
        <div className="flex items-center space-x-2.5">
          
          {/* 3-Way Language Switcher */}
          <div className="flex items-center bg-[var(--bg-elevated)] p-1 rounded-full border border-[var(--border-gold)] text-xs shadow-sm">
            <button
              onClick={() => setCurrentLang('en')}
              className={`px-2.5 py-1 rounded-full font-semibold transition-all ${
                currentLang === 'en'
                  ? 'bg-[var(--accent-primary)] text-white shadow-sm'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setCurrentLang('hi')}
              className={`px-2.5 py-1 rounded-full font-semibold transition-all ${
                currentLang === 'hi'
                  ? 'bg-[var(--accent-primary)] text-white shadow-sm'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              हिंदी
            </button>
            <button
              onClick={() => setCurrentLang('haryanvi')}
              className={`px-2.5 py-1 rounded-full font-semibold transition-all ${
                currentLang === 'haryanvi'
                  ? 'bg-[var(--accent-primary)] text-white shadow-sm'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              हरियाणवी
            </button>
          </div>

          {/* Audio Toggle Button */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-2 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-gold)] text-[var(--text-primary)] hover:bg-[var(--accent-gold)] hover:text-white transition-all shadow-sm"
            title={isMuted ? 'Play Music' : 'Mute Music'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 animate-pulse text-[var(--accent-gold)]" />}
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-gold)] text-[var(--text-primary)]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[var(--nav-bg)] border-b border-[var(--border-gold)] px-4 py-4 space-y-3 animate-fadeIn">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold text-[var(--text-primary)] hover:text-[var(--accent-primary)] py-1.5 border-b border-[var(--border-gold)]/20"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
