import React, { useState } from 'react';
import { Volume2, VolumeX, Globe, Menu, X, Home, Palette } from 'lucide-react';

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const languages = [
    { code: 'haryanvi', label: 'हरियाणवी' },
    { code: 'hi', label: 'हिंदी' },
    { code: 'en', label: 'English' },
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
          
          {/* Logo & Brand Header - Clicking takes user back to Home/Landing page */}
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

          {/* Center Navigation Tabs: Home, Groom Side (वर पक्ष), Bride Side (वधू पक्ष) */}
          <div className="hidden md:flex items-center space-x-2 bg-[var(--bg-elevated)] p-1.5 rounded-full border border-[var(--border-gold)] shadow-sm">
            <button
              onClick={() => setActivePage('portal')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activePage === 'portal'
                  ? 'bg-[var(--accent-primary)] text-white shadow-sm'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>{t.nav?.home || "Home"}</span>
            </button>

            <button
              onClick={() => setActivePage('groom')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activePage === 'groom'
                  ? 'bg-[var(--accent-primary)] text-white shadow-sm'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <span>{t.nav?.groomSide || "Groom Side (वर पक्ष)"}</span>
            </button>

            <button
              onClick={() => setActivePage('bride')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activePage === 'bride'
                  ? 'bg-[var(--accent-primary)] text-white shadow-sm'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <span>{t.nav?.brideSide || "Bride Side (वधू पक्ष)"}</span>
            </button>
          </div>

          {/* Right Controls: Theme Toggle, Audio Button & Language Selector */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Quick Theme Toggle Button in Navbar */}
            <button
              onClick={cycleNextTheme}
              className="p-2 sm:px-3 sm:py-2 rounded-full bg-[var(--bg-elevated)] hover:bg-[var(--bg-card)] border border-[var(--border-gold)] text-xs font-bold text-[var(--text-primary)] flex items-center space-x-1.5 shadow-sm transition-all"
              title="Toggle Theme Palette"
            >
              <Palette className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
              <span className="hidden lg:inline text-[11px]">Theme</span>
            </button>

            {/* Audio Play/Mute Button */}
            <button
              onClick={setIsMuted}
              className={`p-2 sm:px-3 sm:py-2 rounded-full border text-xs font-bold flex items-center space-x-1.5 shadow-sm transition-all ${
                !isMuted
                  ? 'bg-[var(--badge-bg)] text-[var(--accent-gold)] border-[var(--border-gold)] ring-1 ring-[var(--accent-gold)]'
                  : 'bg-[var(--bg-elevated)] text-[var(--text-muted)] border-[var(--border-gold)] hover:text-[var(--text-primary)]'
              }`}
              title={isMuted ? "Unmute Music" : "Mute Music"}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 animate-bounce text-[var(--accent-gold)]" />}
              <span className="hidden sm:inline">{isMuted ? "Muted" : "Music"}</span>
            </button>

            {/* Language Selector Dropdown with LocalStorage persistence */}
            <div className="relative group">
              <button className="flex items-center space-x-1.5 px-3 py-2 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-gold)] text-xs font-bold text-[var(--text-primary)] shadow-sm hover:border-[var(--accent-gold)] transition-all">
                <Globe className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                <span>{languages.find((l) => l.code === currentLang)?.label || 'Language'}</span>
              </button>

              <div className="absolute right-0 mt-2 w-32 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-gold)] shadow-xl p-1.5 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 z-50">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setCurrentLang(lang.code)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      currentLang === lang.code
                        ? 'bg-[var(--accent-primary)] text-white font-bold'
                        : 'text-[var(--text-primary)] hover:bg-[var(--badge-bg)]'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-full md:hidden bg-[var(--bg-elevated)] border border-[var(--border-gold)] text-[var(--text-primary)] shadow-sm"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[var(--bg-elevated)] border-b border-[var(--border-gold)] px-4 py-4 space-y-2 animate-fadeIn shadow-lg">
          <div className="grid grid-cols-3 gap-2 pb-3 border-b border-[var(--border-gold)]/60">
            <button
              onClick={() => { setActivePage('portal'); setIsMobileMenuOpen(false); }}
              className={`py-2 rounded-xl text-xs font-bold flex flex-col items-center justify-center space-y-1 ${
                activePage === 'portal' ? 'bg-[var(--accent-primary)] text-white' : 'bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-gold)]'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </button>

            <button
              onClick={() => { setActivePage('groom'); setIsMobileMenuOpen(false); }}
              className={`py-2 rounded-xl text-xs font-bold flex flex-col items-center justify-center space-y-1 ${
                activePage === 'groom' ? 'bg-[var(--accent-primary)] text-white' : 'bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-gold)]'
              }`}
            >
              <span>🤵</span>
              <span>Groom Side</span>
            </button>

            <button
              onClick={() => { setActivePage('bride'); setIsMobileMenuOpen(false); }}
              className={`py-2 rounded-xl text-xs font-bold flex flex-col items-center justify-center space-y-1 ${
                activePage === 'bride' ? 'bg-[var(--accent-primary)] text-white' : 'bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-gold)]'
              }`}
            >
              <span>👰</span>
              <span>Bride Side</span>
            </button>
          </div>

          <div className="flex items-center justify-around pt-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => { setCurrentLang(lang.code); setIsMobileMenuOpen(false); }}
                className={`px-3 py-1.5 rounded-full text-xs font-bold ${
                  currentLang === lang.code ? 'bg-[var(--accent-gold)] text-white' : 'text-[var(--text-secondary)] border border-[var(--border-gold)]'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
