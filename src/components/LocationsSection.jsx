import React from 'react';
import { MapPin, Navigation, ExternalLink, Compass, Home } from 'lucide-react';

export default function LocationsSection({ t }) {
  // Exact Coordinates & Location Pins
  const groomExactGoogleMapsUrl = "https://maps.app.goo.gl/FjTdPRhqZYVkGC3H7";
  const groomExactAppleMapsUrl = "https://maps.apple.com/?q=Nandha+Ki+Dhani,+Badhra,+Haryana&ll=28.4552,75.8344";

  const brideExactGoogleMapsUrl = "https://www.google.com/maps?q=28.507679,75.865814";
  const brideExactAppleMapsUrl = "https://maps.apple.com/?q=28.507679,75.865814&ll=28.507679,75.865814";

  return (
    <section id="locations" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Section Title */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[var(--badge-bg)] border border-[var(--badge-border)] text-[var(--badge-text)] text-xs font-semibold uppercase tracking-widest mb-3">
          <Compass className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
          <span>{t.locations?.badge || "Venue Map & Navigation"}</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-[var(--text-primary)]">
          {t.locations?.heading || "Wedding Locations & Directions"}
        </h2>
        <p className="text-[var(--text-secondary)] text-sm sm:text-base max-w-2xl mx-auto mt-2 font-sans">
          {t.locations?.subheading || "Click below to launch 1-tap navigation on Google Maps or Apple Maps to reach our venue smoothly"}
        </p>
      </div>

      {/* Location Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Groom Home Location Card */}
        <div className="glass-wedding-card rounded-3xl p-6 sm:p-8 border border-[var(--border-gold)] shadow-xl flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--hero-glow)] rounded-full blur-2xl pointer-events-none" />

          <div>
            {/* Header Tag */}
            <div className="flex items-center justify-between mb-4">
              <span className="px-3.5 py-1 rounded-full bg-[var(--badge-bg)] text-[var(--badge-text)] border border-[var(--badge-border)] text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5">
                <Home className="w-3.5 h-3.5" />
                <span>{t.locations?.groomTag || "Groom Home & Main Functions"}</span>
              </span>
              <span className="text-xs text-[var(--text-muted)] font-sans">Badhra Tehsil</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
              Vill. Nandha Ki Dhani
            </h3>
            <p className="font-hindi text-[var(--accent-primary)] text-base font-semibold mt-1">
              नंधा की ढाणी, बाढड़ा (चरखी दादरी)
            </p>

            {/* Address Card */}
            <div className="mt-4 p-4 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-gold)] flex items-start space-x-3 shadow-sm">
              <MapPin className="w-5 h-5 text-[var(--accent-gold)] shrink-0 mt-0.5" />
              <p className="text-[var(--text-primary)] text-xs sm:text-sm font-sans leading-relaxed">
                Village Nandha Ki Dhani, Post & Tehsil Badhra, District Charkhi Dadri, Haryana — 127308
              </p>
            </div>

            {/* Program events held here */}
            <div className="mt-4 space-y-1.5">
              <p className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider">
                {t.locations?.functionsHosted || "Functions Hosted Here:"}
              </p>
              <div className="flex flex-wrap gap-2 text-xs text-[var(--text-secondary)]">
                <span className="px-2.5 py-1 rounded-lg bg-[var(--badge-bg)] border border-[var(--badge-border)]">16 Nov: Ban & Haldi</span>
                <span className="px-2.5 py-1 rounded-lg bg-[var(--badge-bg)] border border-[var(--badge-border)]">17 Nov: Sangeet</span>
                <span className="px-2.5 py-1 rounded-lg bg-[var(--badge-bg)] border border-[var(--badge-border)]">19 Nov: Bhaat & Lagan</span>
                <span className="px-2.5 py-1 rounded-lg bg-[var(--badge-bg)] border border-[var(--badge-border)]">20 Nov: Ghurchhari & Barat</span>
              </div>
            </div>

            {/* Landmarks info */}
            <div className="mt-4 text-xs text-[var(--text-muted)] space-y-1 border-t border-[var(--border-gold)] pt-3">
              <p>• <strong>Nearest Town:</strong> Badhra (~6 KM)</p>
              <p>• <strong>Nearest Railway Station:</strong> Satnali STNL (~10 KM)</p>
            </div>
          </div>

          {/* Navigation Action Buttons (Exact Pins) */}
          <div className="mt-6 pt-4 border-t border-[var(--border-gold)] flex flex-col sm:flex-row gap-3">
            <a
              href={groomExactGoogleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 px-4 rounded-xl bg-[var(--accent-primary)] hover:opacity-90 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-md transition-all"
            >
              <Navigation className="w-4 h-4" />
              <span>Google Maps Navigation</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href={groomExactAppleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 px-4 rounded-xl bg-[var(--bg-elevated)] hover:bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-gold)] font-bold text-xs flex items-center justify-center space-x-2 shadow-sm transition-all"
            >
              <span>Apple Maps Location</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Bride Venue Location Card */}
        <div className="glass-wedding-card rounded-3xl p-6 sm:p-8 border border-[var(--border-gold)] shadow-xl flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--hero-glow)] rounded-full blur-2xl pointer-events-none" />

          <div>
            {/* Header Tag */}
            <div className="flex items-center justify-between mb-4">
              <span className="px-3.5 py-1 rounded-full bg-[var(--badge-bg)] text-[var(--badge-text)] border border-[var(--badge-border)] text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5">
                <Home className="w-3.5 h-3.5" />
                <span>{t.locations?.brideTag || "Bride Venue (Barat Destination)"}</span>
              </span>
              <span className="text-xs text-[var(--text-muted)] font-sans">Arya Nagar, Charkhi Dadri</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
              Arya Nagar
            </h3>
            <p className="font-hindi text-[var(--accent-primary)] text-base font-semibold mt-1">
              आर्य नगर, चरखी दादरी (हरियाणा)
            </p>

            {/* Address Card */}
            <div className="mt-4 p-4 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-gold)] flex items-start space-x-3 shadow-sm">
              <MapPin className="w-5 h-5 text-[var(--accent-gold)] shrink-0 mt-0.5" />
              <p className="text-[var(--text-primary)] text-xs sm:text-sm font-sans leading-relaxed">
                Arya Nagar, Charkhi Dadri, Distt. Charkhi Dadri, Haryana — 127306
              </p>
            </div>

            {/* Program events held here */}
            <div className="mt-4 space-y-1.5">
              <p className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider">
                {t.locations?.functionsHosted || "Functions Hosted Here:"}
              </p>
              <div className="flex flex-wrap gap-2 text-xs text-[var(--text-secondary)]">
                <span className="px-2.5 py-1 rounded-lg bg-[var(--badge-bg)] border border-[var(--badge-border)]">20 Nov: Barat Swagat (06:00 PM)</span>
                <span className="px-2.5 py-1 rounded-lg bg-[var(--badge-bg)] border border-[var(--badge-border)]">20 Nov: Varmala & Dinner</span>
                <span className="px-2.5 py-1 rounded-lg bg-[var(--badge-bg)] border border-[var(--badge-border)]">20 Nov: Pheras & Vivah</span>
              </div>
            </div>

            {/* Landmarks info */}
            <div className="mt-4 text-xs text-[var(--text-muted)] space-y-1 border-t border-[var(--border-gold)] pt-3">
              <p>• <strong>Distance from Nandha ki Dhani:</strong> ~18 KM</p>
              <p>• <strong>Major Railway:</strong> Loharu Junction LHU (~15 KM)</p>
            </div>
          </div>

          {/* Navigation Action Buttons (Symmetrical Button Names) */}
          <div className="mt-6 pt-4 border-t border-[var(--border-gold)] flex flex-col sm:flex-row gap-3">
            <a
              href={brideExactGoogleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 px-4 rounded-xl bg-[var(--accent-primary)] hover:opacity-90 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-md transition-all"
            >
              <Navigation className="w-4 h-4" />
              <span>Google Maps Navigation</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href={brideExactAppleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 px-4 rounded-xl bg-[var(--bg-elevated)] hover:bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-gold)] font-bold text-xs flex items-center justify-center space-x-2 shadow-sm transition-all"
            >
              <span>Apple Maps Location</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
