import React, { useState } from 'react';
import { X, Upload, Film } from 'lucide-react';

export default function VideoInvitationModal({ isOpen, onClose, customVideoUrl, setCustomVideoUrl }) {
  const [inputUrl, setInputUrl] = useState('');
  const [activeTab, setActiveTab] = useState('card');

  if (!isOpen) return null;

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomVideoUrl(url);
      setActiveTab('card');
    }
  };

  const handleUrlSubmit = (e) => {
    e.preventDefault();
    if (inputUrl.trim()) {
      setCustomVideoUrl(inputUrl.trim());
      setActiveTab('card');
    }
  };

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
          
          {/* Mode Tabs */}
          <div className="flex space-x-2 mb-6 bg-[var(--bg-surface)] p-1 rounded-full border border-[var(--border-gold)]">
            <button
              onClick={() => setActiveTab('card')}
              className={`px-5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeTab === 'card'
                  ? 'bg-[var(--accent-primary)] text-white shadow-md'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              Watch Video Invitation
            </button>
            <button
              onClick={() => setActiveTab('upload')}
              className={`px-5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeTab === 'upload'
                  ? 'bg-[var(--accent-primary)] text-white shadow-md'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              Upload Custom Video
            </button>
          </div>

          {activeTab === 'card' ? (
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
                      Hon. Capt. Satyavir Singh & Luhach Family
                    </h4>
                    <p className="text-[11px] text-[var(--text-secondary)] font-sans">
                      Vill. Nandha ki Dhani, Badhra (Charkhi Dadri)
                    </p>
                  </div>

                  {/* Single Common Couple Portrait Circle */}
                  <div className="my-1.5 flex items-center justify-center">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-[var(--accent-gold)] overflow-hidden shadow-xl bg-black">
                      <img src="/assets/real_photos/couple_common.jpg" alt="Naveen & Manisha" className="w-full h-full object-cover object-top" />
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
                Digital Wedding Invitation Card for Naveen & Manisha (#Navisha). Click 'Upload Custom Video' to add your custom MP4 invitation video file.
              </p>
            </div>
          ) : (
            /* Upload / URL Input Form */
            <div className="w-full max-w-lg space-y-6">
              <div className="border-2 border-dashed border-[var(--border-gold)] rounded-2xl p-6 text-center hover:border-[var(--accent-gold)] transition-colors bg-[var(--bg-elevated)]/50">
                <Upload className="w-10 h-10 text-[var(--accent-gold)] mx-auto mb-2" />
                <h4 className="font-serif text-base font-bold text-[var(--text-primary)]">
                  Upload MP4 Video File
                </h4>
                <p className="text-xs text-[var(--text-muted)] mt-1 mb-4">
                  Select a video file from your phone or computer
                </p>
                <label className="px-5 py-2 rounded-full bg-gradient-to-r from-[var(--accent-gold)] to-[#AA7C11] text-white text-xs font-bold cursor-pointer hover:opacity-95 transition-colors inline-block shadow-md">
                  Choose Video File
                  <input
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </label>
              </div>

              <form onSubmit={handleUrlSubmit} className="space-y-3">
                <label className="block text-xs font-medium text-[var(--text-secondary)]">
                  Or Paste Direct Video URL:
                </label>
                <div className="flex space-x-2">
                  <input
                    type="url"
                    placeholder="https://example.com/invitation.mp4"
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                    className="flex-1 px-4 py-2 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-gold)] text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)]/50 focus:outline-none focus:border-[var(--accent-gold)] shadow-sm"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[var(--accent-primary)] text-white font-bold text-xs hover:opacity-95 transition-colors shadow-sm"
                  >
                    Save URL
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
