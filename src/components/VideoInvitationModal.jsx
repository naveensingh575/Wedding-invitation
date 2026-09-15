import React from 'react';
import { X, Film } from 'lucide-react';

export default function VideoInvitationModal({ isOpen, onClose, customVideoUrl }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl glass-wedding-card rounded-3xl border-2 border-[var(--border-gold)] shadow-2xl overflow-hidden flex flex-col">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[var(--bg-elevated)] border-b border-[var(--border-gold)] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Film className="w-5 h-5 text-[var(--accent-gold)]" />
            <h3 className="font-serif text-lg font-bold text-[var(--text-primary)]">
              Digital Video Invitation • Naveen & Manisha (#Navisha)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-[var(--bg-surface)] hover:bg-[var(--accent-gold)] text-[var(--text-primary)] hover:text-white transition-all shadow-sm"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 flex flex-col items-center">
          <div className="w-full flex flex-col items-center">
            {customVideoUrl ? (
              <div className="w-full aspect-video rounded-2xl overflow-hidden border border-[var(--border-gold)] shadow-2xl bg-black">
                <video
                  src={customVideoUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              </div>
            ) : (
              /* Animated Premium Digital Video Card Player Frame */
              <div className="w-full aspect-video rounded-2xl overflow-hidden border-2 border-[var(--border-gold)] shadow-2xl bg-gradient-to-br from-[var(--bg-surface)] to-[var(--bg-primary)] p-6 flex flex-col items-center justify-between text-center relative group">
                
                {/* Ornaments & Glowing Halo */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[var(--hero-glow)] rounded-full blur-3xl pointer-events-none" />
                
                <div className="absolute top-3 left-4 text-xl">🪔</div>
                <div className="absolute top-3 right-4 text-xl">🌺</div>
                <div className="absolute bottom-3 left-4 text-xl">✨</div>
                <div className="absolute bottom-3 right-4 text-xl">🚩</div>

                <div className="pt-1">
                  <span className="px-3 py-1 rounded-full bg-[var(--badge-bg)] border border-[var(--badge-border)] text-[11px] text-[var(--badge-text)] font-bold uppercase tracking-wider">
                    ॥ शुभ विवाह आमंत्रण ॥
                  </span>
                  <h4 className="font-serif text-xl sm:text-2xl font-extrabold text-[var(--text-primary)] mt-1.5">
                    Capt. Satyavir Singh & Luhach Family
                  </h4>
                  <p className="text-[11px] text-[var(--text-secondary)] font-sans">
                    Vill. Nandha ki Dhani, Badhra (Charkhi Dadri)
                  </p>
                </div>

                {/* Single Common Couple Portrait Circle */}
                <div className="my-1.5 flex items-center justify-center">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-[var(--accent-gold)] overflow-hidden shadow-xl bg-black">
                    <img src="/assets/doodles/couple.png" alt="Naveen & Manisha" className="w-full h-full object-cover object-top" />
                  </div>
                </div>

                <div className="py-1.5 px-5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-gold)] shadow-sm">
                  <div className="font-serif text-base sm:text-lg font-bold text-[var(--text-primary)]">
                    Naveen Luhach  ❤️  Manisha Sheoran (#Navisha)
                  </div>
                  <p className="text-[11px] text-[var(--text-secondary)] font-sans">
                    20th November 2026 • Shubh Vivah
                  </p>
                </div>

                {/* Video Player Control Bar */}
                <div className="w-full flex items-center justify-between text-[11px] text-[var(--text-muted)] border-t border-[var(--border-gold)] pt-2">
                  <span>16 Nov: Ban & Haldi</span>
                  <span className="text-[var(--accent-primary)] font-bold">19 Nov: Bhaat & Lagan</span>
                  <span>20 Nov: Barat & Pheras</span>
                </div>
              </div>
            )}

            <p className="text-xs text-[var(--text-muted)] mt-4 text-center">
              Digital Video Invitation for Naveen Luhach & Manisha Sheoran (#Navisha)
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
