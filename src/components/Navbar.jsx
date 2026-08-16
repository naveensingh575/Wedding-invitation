import React from 'react';
import { Volume2, VolumeX, Palette, Home } from 'lucide-react';

export default function Navbar({
  isMuted,
  setIsMuted,
  currentLang,
  setCurrentLang,
  activePage,
  setActivePage,
  currentTheme,
  setCurrentTheme,
  t,
}) {
  const languages = [
    { code: 'haryanvi', label: 'हरियाणवी' },
    { code: 'hi', label: 'हिंदी' },
    { code: 'en', label: 'EN' },
  ];

  const themes = [
    { id: 'theme-sage-ivory', name: 'Elegant Ivory & Sage 🌿' },
    { id: 'theme-royal-maroon', name: 'Royal Maroon & Gold 👑' },
    { id: 'theme-royal-dark', name: 'Midnight Obsidian Dark 🌙' },
    { id: 'theme-blush-pink', name: 'Blush Pink & Champagne 🌸' },
    { id: 'theme-terracotta', name: 'Terracotta & Beige 🪔' },
  ];

  const cycleNextTheme = () => {
    const currentIndex = themes.findIndex((thm) => thm.id === currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setCurrentTheme(themes[nextIndex].id);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--bg-surface)]/90 backdrop-blur-md border-b border-[var(--border-gold)] shadow-sm theme-transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Title - Clicking smoothly takes user back to Home / Landing Page */}
          <div
            onClick={() => setActivePage('portal')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-2xl border-2 border-[var(--accent-gold)] overflow-hidden shadow-md shrink-0 bg-black flex items-center justify-center p-0.5 group-hover:scale-105 transition-transform">
              <img
                src="/assets/real_photos/couple_common.jpg"
                alt="Naveen & Manisha"
                className="w-full h-full object-cover object-top rounded-xl"
              />
            </div>
            <div>
              <span className="font-serif text-base sm:text-xl font-bold tracking-wide text-[var(--text-primary)] block leading-none group-hover:text-[var(--accent-primary)] transition-colors">
                {t.brandTitle || "Wedding Invitation"}
              </span>
              <span className="text-[11px] text-[var(--accent-gold)] font-sans font-semibold tracking-wider">
                Naveen ❤️ Manisha #Navisha
              </span>
            </div>
          </div>

          {/* Right Controls: 3-Pill Horizontal Language Toggle, Theme Button & Audio Toggle */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Horizontal 3-Button Language Toggle */}
            <div className="flex items-center bg-[var(--bg-elevated)] p-1 rounded-full border border-[var(--border-gold)] shadow-sm">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setCurrentLang(lang.code)}
                  className={`px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold transition-all ${
                    currentLang === lang.code
                      ? 'bg-[var(--accent-primary)] text-white shadow-sm'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            {/* Quick 1-Tap Theme Toggle */}
            <button
              onClick={cycleNextTheme}
              className="p-2 sm:px-3 sm:py-1.5 rounded-full bg-[var(--bg-elevated)] hover:bg-[var(--bg-card)] border border-[var(--border-gold)] text-xs font-bold text-[var(--text-primary)] flex items-center space-x-1.5 shadow-sm transition-all"
              title="Toggle Theme Palette"
            >
              <Palette className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
              <span className="hidden sm:inline text-[11px]">Theme</span>
            </button>

            {/* Audio Play/Mute Toggle */}
            <button
              onClick={setIsMuted}
              className={`p-2 sm:px-3 sm:py-1.5 rounded-full border text-xs font-bold flex items-center space-x-1.5 shadow-sm transition-all ${
                !isMuted
                  ? 'bg-[var(--badge-bg)] text-[var(--accent-gold)] border-[var(--border-gold)] ring-1 ring-[var(--accent-gold)]'
                  : 'bg-[var(--bg-elevated)] text-[var(--text-muted)] border-[var(--border-gold)] hover:text-[var(--text-primary)]'
              }`}
              title={isMuted ? "Unmute Music" : "Mute Music"}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 animate-bounce text-[var(--accent-gold)]" />}
              <span className="hidden md:inline text-[11px]">{isMuted ? "Muted" : "Music"}</span>
            </button>

          </div>

        </div>
      </div>
    </nav>
  );
}
