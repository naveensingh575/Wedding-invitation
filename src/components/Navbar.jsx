import React from 'react';
import { Volume2, VolumeX, Palette } from 'lucide-react';

export default function Navbar({
  isPlaying,
  togglePlayPause,
  isMuted,
  toggleMute,
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

  // All 5 Predefined Wedding Themes prioritizing Blush Pink & Champagne at Index 0
  const themes = [
    { id: 'theme-blush-champagne', name: 'Blush Pink & Champagne 🌸' },
    { id: 'theme-terracotta-beige', name: 'Terracotta & Beige 🪔' },
    { id: 'theme-sage-ivory', name: 'Elegant Ivory & Sage 🌿' },
    { id: 'theme-royal-dark', name: 'Midnight Obsidian & Gold 🌙' },
    { id: 'theme-royal-maroon', name: 'Royal Maroon & Gold 👑' },
  ];

  // Single Click Theme Cycling
  const cycleNextTheme = () => {
    const currentIndex = themes.findIndex((thm) => thm.id === currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    const nextThemeId = themes[nextIndex].id;

    setCurrentTheme(nextThemeId);
    localStorage.setItem('navisha_theme', nextThemeId);
    document.documentElement.className = nextThemeId;
    document.documentElement.setAttribute('data-theme', nextThemeId);
  };

  // Direct Audio Play/Stop Toggle
  const handleMusicClick = (e) => {
    e.preventDefault();
    if (togglePlayPause) {
      togglePlayPause();
    } else if (toggleMute) {
      toggleMute();
    }
  };

  const isAudioActive = isPlaying && !isMuted;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--bg-surface)]/95 backdrop-blur-md border-b border-[var(--border-gold)] shadow-md theme-transition pointer-events-auto">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Title */}
          <div
            onClick={() => setActivePage('portal')}
            className="flex items-center space-x-2.5 sm:space-x-3 cursor-pointer group"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl border-2 border-[var(--accent-gold)] overflow-hidden shadow-md shrink-0 bg-black flex items-center justify-center p-0.5 group-hover:scale-105 transition-transform">
              <img
                src="/assets/real_photos/couple_common.jpg"
                alt="Naveen & Manisha"
                className="w-full h-full object-cover object-top rounded-xl"
              />
            </div>
            <div>
              <span className="font-serif text-sm sm:text-lg md:text-xl font-bold tracking-wide text-[var(--text-primary)] block leading-tight group-hover:text-[var(--accent-primary)] transition-colors">
                {t.brandTitle || "Wedding Invitation"}
              </span>
              <span className="hidden md:inline-block text-[11px] text-[var(--accent-gold)] font-sans font-semibold tracking-wider">
                Naveen ❤️ Manisha #Navisha
              </span>
            </div>
          </div>

          {/* Right Controls: 3-Pill Language Selector, 1-Tap Theme Cycle & Clean Music Button */}
          <div className="flex items-center space-x-1.5 sm:space-x-3">
            
            {/* Language Selector */}
            <div className="flex items-center bg-[var(--bg-elevated)] p-0.5 sm:p-1 rounded-full border border-[var(--border-gold)] shadow-sm">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setCurrentLang(lang.code)}
                  className={`px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold transition-all cursor-pointer ${
                    currentLang === lang.code
                      ? 'bg-[var(--accent-primary)] text-white shadow-sm'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            {/* Direct 1-Tap Theme Cycle Button */}
            <button
              onClick={cycleNextTheme}
              className="p-2 sm:px-3 sm:py-1.5 rounded-full bg-[var(--bg-elevated)] hover:bg-[var(--bg-card)] border border-[var(--border-gold)] text-xs font-bold text-[var(--text-primary)] flex items-center space-x-1.5 shadow-sm transition-all cursor-pointer"
              title="Cycle Aesthetic Color Theme (Default: Blush Pink & Champagne)"
            >
              <Palette className="w-4 h-4 text-[var(--accent-gold)]" />
              <span className="hidden sm:inline text-[11px]">Theme</span>
            </button>

            {/* Clean Music Play / Stop Button */}
            <button
              onClick={handleMusicClick}
              className={`p-2 sm:px-3 sm:py-1.5 rounded-full border text-xs font-bold flex items-center space-x-1.5 shadow-sm transition-all relative cursor-pointer ${
                isAudioActive
                  ? 'bg-[var(--badge-bg)] text-[var(--accent-gold)] border-[var(--border-gold)] ring-1 ring-[var(--accent-gold)]'
                  : 'bg-[var(--bg-elevated)] text-[var(--text-muted)] border-[var(--border-gold)] hover:text-[var(--text-primary)]'
              }`}
              title={isAudioActive ? "Pause Music" : "Play Music"}
            >
              {isAudioActive ? (
                <>
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[var(--accent-gold)] rounded-full animate-ping" />
                  <Volume2 className="w-4 h-4 text-[var(--accent-gold)] animate-bounce" />
                  <span className="hidden md:inline text-[11px]">Music</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4 text-rose-400" />
                  <span className="hidden md:inline text-[11px]">Muted</span>
                </>
              )}
            </button>

          </div>

        </div>
      </div>
    </nav>
  );
}
