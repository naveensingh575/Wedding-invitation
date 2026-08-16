import React, { useState } from 'react';
import { Palette, Check, Sparkles, X, Moon } from 'lucide-react';

export const THEMES = [
  {
    id: 'theme-sage-ivory',
    name: 'Elegant Ivory & Sage',
    subtitle: 'Minimal • Romantic • Premium (Light)',
    badge: '⭐ Top Pick',
    colorHex: '#7A8B72',
    accentHex: '#C9A96E',
    bgHex: '#F8F5EF',
  },
  {
    id: 'theme-royal-dark',
    name: 'Midnight Obsidian & Gold',
    subtitle: 'Sleek Modern Luxury (Dark Theme)',
    badge: '🌙 Dark Mode',
    colorHex: '#1B202C',
    accentHex: '#E5C07B',
    bgHex: '#0B0D11',
  },
  {
    id: 'theme-royal-maroon',
    name: 'Royal Maroon & Gold',
    subtitle: 'Grand, Traditional, Luxurious',
    badge: '👑 Heritage',
    colorHex: '#5A1820',
    accentHex: '#D4AF6A',
    bgHex: '#360B10',
  },
  {
    id: 'theme-blush-champagne',
    name: 'Blush Pink & Champagne',
    subtitle: 'Soft, Romantic, Modern Aesthetic',
    badge: '🌷 Romantic',
    colorHex: '#C9A6A0',
    accentHex: '#C9A96E',
    bgHex: '#FAF2F0',
  },
  {
    id: 'theme-terracotta-beige',
    name: 'Terracotta & Beige',
    subtitle: 'Warm, Earthy, Modern Indian',
    badge: '🪔 Earthy',
    colorHex: '#B7654A',
    accentHex: '#C99E5C',
    bgHex: '#F8F3EB',
  },
];

export default function ThemeSwitcher({ currentTheme, setCurrentTheme }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-3 rounded-full bg-[var(--bg-elevated)] border-2 border-[var(--border-gold)] text-[var(--text-primary)] font-bold text-xs shadow-2xl backdrop-blur-md hover:scale-105 active:scale-95 transition-all flex items-center space-x-2"
          title="Change Aesthetic Color Theme (Light & Dark)"
        >
          <Palette className="w-4 h-4 text-[var(--accent-gold)]" />
          <span className="hidden sm:inline font-serif text-sm">Theme:</span>
          <span className="px-2 py-0.5 rounded-full bg-[var(--badge-bg)] text-[11px] text-[var(--badge-text)] font-semibold border border-[var(--badge-border)]">
            {THEMES.find(t => t.id === currentTheme)?.name.split(' ')[0] || 'Ivory'}
          </span>
        </button>
      )}

      {/* Theme Drawer Panel */}
      {isOpen && (
        <div className="glass-wedding-card rounded-3xl p-5 border-2 border-[var(--border-gold)] shadow-2xl w-80 sm:w-96 animate-fadeIn relative">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-[var(--border-gold)] mb-4">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-[var(--accent-gold)]" />
              <h4 className="font-serif text-base font-bold text-[var(--text-primary)]">
                Aesthetic Color Palettes
              </h4>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-[var(--text-secondary)] mb-3 font-sans">
            Choose your preferred light or dark wedding color palette:
          </p>

          {/* Theme Options Grid */}
          <div className="grid grid-cols-1 gap-2.5 max-h-[380px] overflow-y-auto pr-1">
            {THEMES.map((theme) => {
              const isSelected = currentTheme === theme.id;
              return (
                <button
                  key={theme.id}
                  onClick={() => setCurrentTheme(theme.id)}
                  className={`w-full p-3 rounded-2xl border text-left transition-all flex items-center justify-between group ${
                    isSelected
                      ? 'border-[var(--accent-gold)] bg-[var(--badge-bg)] shadow-md ring-1 ring-[var(--accent-gold)]'
                      : 'border-[var(--border-gold)] hover:border-[var(--accent-gold)] bg-[var(--bg-elevated)]/60'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {/* Theme Swatch */}
                    <div
                      className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center shadow-sm relative overflow-hidden ${
                        isSelected ? 'border-[var(--accent-gold)]' : 'border-gray-400/40'
                      }`}
                      style={{ backgroundColor: theme.bgHex }}
                    >
                      <div
                        className="w-5 h-5 rounded-full shadow"
                        style={{ backgroundColor: theme.colorHex }}
                      />
                      <div
                        className="w-2.5 h-2.5 rounded-full absolute bottom-1 right-1 shadow"
                        style={{ backgroundColor: theme.accentHex }}
                      />
                    </div>

                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-serif text-sm font-bold text-[var(--text-primary)]">
                          {theme.name}
                        </span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[var(--badge-bg)] text-[var(--badge-text)] font-semibold border border-[var(--badge-border)]">
                          {theme.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-[var(--text-muted)] font-sans">
                        {theme.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Check Indicator */}
                  <div className="shrink-0 ml-2">
                    {isSelected ? (
                      <div className="w-5 h-5 rounded-full bg-[var(--accent-gold)] text-white flex items-center justify-center shadow">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full border border-gray-400/40 group-hover:border-[var(--accent-gold)] transition-colors" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          <p className="text-[10px] text-[var(--text-muted)] text-center mt-3 font-sans">
            Minimal • Romantic • Premium • Traditional + Modern
          </p>
        </div>
      )}
    </div>
  );
}
