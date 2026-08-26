import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Palette, ChevronDown } from 'lucide-react';

export default function Navbar({
  isMuted,
  toggleMute,
  isPlaying,
  togglePlayPause,
  currentLang,
  setCurrentLang,
  activePage,
  setActivePage,
  currentTheme,
  setCurrentTheme,
  t,
}) {
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languages = [
    { code: 'haryanvi', label: 'हरियाणवी' },
    { code: 'hi', label: 'हिंदी' },
    { code: 'en', label: 'EN' },
  ];

  // All 5 Predefined Wedding Themes matching index.css exactly
  const themes = [
    { id: 'theme-sage-ivory', name: 'Elegant Ivory & Sage 🌿', desc: 'Minimal • Romantic • Premium Light' },
    { id: 'theme-royal-dark', name: 'Midnight Obsidian & Gold 🌙', desc: 'Sleek Modern Luxury Dark' },
    { id: 'theme-royal-maroon', name: 'Royal Maroon & Gold 👑', desc: 'Grand, Traditional, Luxurious' },
    { id: 'theme-blush-champagne', name: 'Blush Pink & Champagne 🌸', desc: 'Soft, Romantic, Modern' },
    { id: 'theme-terracotta-beige', name: 'Terracotta & Beige 🪔', desc: 'Earthy & Warm' },
  ];

  const cycleNextTheme = () => {
    const currentIndex = themes.findIndex((thm) => thm.id === currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    handleSelectTheme(themes[nextIndex].id);
  };

  const handleSelectTheme = (themeId) => {
    setCurrentTheme(themeId);
    localStorage.setItem('navisha_theme', themeId);
    document.documentElement.className = themeId;
    document.documentElement.setAttribute('data-theme', themeId);
    setIsThemeDropdownOpen(false);
  };

  const handleAudioToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (toggleMute) {
      toggleMute();
    } else if (togglePlayPause) {
      togglePlayPause();
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsThemeDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const activeAudioState = !isMuted && isPlaying;

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-[var(--bg-surface)]/95 backdrop-blur-md border-b border-[var(--border-gold)] shadow-md theme-transition pointer-events-auto">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Title - Navigation to Landing Portal */}
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

          {/* Right Controls: Language Selector, Theme Switcher Dropdown & Audio Toggle */}
          <div className="flex items-center space-x-1.5 sm:space-x-3 relative z-[110]">
            
            {/* Horizontal 3-Button Language Selector */}
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

            {/* Theme Switcher Dropdown / 1-Tap Toggle */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsThemeDropdownOpen((prev) => !prev)}
                className="px-2.5 sm:px-3 py-1.5 rounded-full bg-[var(--bg-elevated)] hover:bg-[var(--bg-card)] border border-[var(--border-gold)] text-xs font-bold text-[var(--text-primary)] flex items-center space-x-1.5 shadow-sm transition-all cursor-pointer"
                title="Select Theme (5 Predefined Wedding Themes)"
              >
                <Palette className="w-4 h-4 text-[var(--accent-gold)]" />
                <span className="hidden sm:inline text-[11px]">Theme</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${isThemeDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Theme Dropdown Menu */}
              {isThemeDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-[var(--bg-elevated)] border-2 border-[var(--border-gold)] shadow-2xl p-2 z-[120] animate-fadeIn backdrop-blur-xl">
                  <div className="text-[10px] uppercase font-bold text-[var(--text-muted)] tracking-wider px-3 py-1 border-b border-[var(--border-gold)]/50 mb-1">
                    Select Wedding Theme
                  </div>
                  {themes.map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => handleSelectTheme(theme.id)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-all flex flex-col cursor-pointer ${
                        currentTheme === theme.id
                          ? 'bg-[var(--accent-primary)] text-white font-bold shadow-md'
                          : 'text-[var(--text-primary)] hover:bg-[var(--bg-card)]'
                      }`}
                    >
                      <span className="font-semibold">{theme.name}</span>
                      <span className={`text-[10px] ${currentTheme === theme.id ? 'text-white/80' : 'text-[var(--text-muted)]'}`}>
                        {theme.desc}
                      </span>
                    </button>
                  ))}
                  <button
                    onClick={cycleNextTheme}
                    className="w-full text-center mt-1 pt-1.5 border-t border-[var(--border-gold)]/50 text-[11px] font-bold text-[var(--accent-gold)] hover:underline cursor-pointer"
                  >
                    🔄 Cycle Next Theme
                  </button>
                </div>
              )}
            </div>

            {/* Music Audio Toggle (Speaker Wave 🔊 when playing, Mute 🔇 when muted) */}
            <button
              onClick={handleAudioToggle}
              className={`p-2 sm:px-3 sm:py-1.5 rounded-full border text-xs font-bold flex items-center space-x-1.5 shadow-sm transition-all relative cursor-pointer ${
                activeAudioState
                  ? 'bg-[var(--badge-bg)] text-[var(--accent-gold)] border-[var(--border-gold)] ring-1 ring-[var(--accent-gold)]'
                  : 'bg-[var(--bg-elevated)] text-[var(--text-muted)] border-[var(--border-gold)] hover:text-[var(--text-primary)]'
              }`}
              title={activeAudioState ? "Mute Background Music" : "Play / Unmute Background Music"}
            >
              {activeAudioState ? (
                <>
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[var(--accent-gold)] rounded-full animate-ping" />
                  <Volume2 className="w-4 h-4 text-[var(--accent-gold)] animate-bounce" />
                </>
              ) : (
                <VolumeX className="w-4 h-4 text-rose-400" />
              )}
              <span className="hidden md:inline text-[11px]">
                {activeAudioState ? "Music" : "Muted"}
              </span>
            </button>

          </div>

        </div>
      </div>
    </nav>
  );
}
