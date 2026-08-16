import React from 'react';
import { MapPin, Navigation, ExternalLink, Compass, Home, Calendar } from 'lucide-react';

export default function LocationsSection({ t, sideData, isBrideSide }) {
  // Exact GPS Coordinates & Location Pins
  const groomExactGoogleMapsUrl = "https://maps.app.goo.gl/FjTdPRhqZYVkGC3H7";
  const groomExactAppleMapsUrl = "https://maps.apple.com/?q=Nandha+Ki+Dhani,+Badhra,+Haryana&ll=28.4552,75.8344";

  const brideExactGoogleMapsUrl = "https://www.google.com/maps?q=28.507679,75.865814";
  const brideExactAppleMapsUrl = "https://maps.apple.com/?q=28.507679,75.865814&ll=28.507679,75.865814";

  // Card 1: Bride's Perspective Aryanagar Card
  const BrideSideAryanagarCard = (
    <div className="glass-wedding-card rounded-3xl p-6 sm:p-8 border-2 border-[var(--accent-gold)] ring-2 ring-[var(--accent-gold)]/20 shadow-xl flex flex-col justify-between relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--hero-glow)] rounded-full blur-2xl pointer-events-none" />

      <div>
        {/* Header Tag */}
        <div className="flex items-center justify-between mb-4">
          <span className="px-3.5 py-1 rounded-full bg-[var(--badge-bg)] text-[var(--accent-primary)] border border-[var(--badge-border)] text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5">
            <Home className="w-3.5 h-3.5" />
            <span>Bride Home & Main Vivah Venue</span>
          </span>
          <span className="text-xs text-[var(--accent-gold)] font-bold">16 November: Nimantran & Griha Aagaman</span>
        </div>

        <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
          Aryanagar (आर्यनगर)
        </h3>
        <p className="font-hindi text-[var(--accent-primary)] text-base font-semibold mt-1">
          आर्य नगर, चरखी दादरी (हरियाणा)
        </p>

        {/* Address Card */}
        <div className="mt-4 p-4 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-gold)] flex items-start space-x-3 shadow-sm">
          <MapPin className="w-5 h-5 text-[var(--accent-gold)] shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm font-sans leading-relaxed">
            <p className="text-[var(--text-primary)] font-medium">
              Arya Nagar, Charkhi Dadri, Distt. Charkhi Dadri, Haryana — 127306
            </p>
            <div className="mt-2 inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-[var(--badge-bg)] border border-[var(--badge-border)] text-[var(--accent-primary)] font-bold text-xs">
              <Calendar className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
              <span>19 November: Bhaat & Lagan (भात एवं लगन)</span>
            </div>
          </div>
        </div>

        {/* Program events held here */}
        <div className="mt-4 space-y-1.5">
          <p className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider">
            Functions Hosted Here:
          </p>
          <div className="flex flex-wrap gap-2 text-xs text-[var(--text-secondary)]">
            <span className="px-2.5 py-1 rounded-lg bg-[var(--badge-bg)] border border-[var(--badge-border)] font-medium">17 Nov: Ban & Haldi</span>
            <span className="px-2.5 py-1 rounded-lg bg-[var(--badge-bg)] border border-[var(--badge-border)] font-medium">18 Nov: Mehndi Utsav</span>
            <span className="px-2.5 py-1 rounded-lg bg-[var(--badge-bg)] border border-[var(--badge-border)] font-medium">19 Nov: Bhaat & Lagan</span>
            <span className="px-2.5 py-1 rounded-lg bg-[var(--badge-bg)] border border-[var(--badge-border)] font-medium">20 Nov: Barat Swagat & Vivah</span>
          </div>
        </div>

        {/* Distances info */}
        <div className="mt-4 text-xs text-[var(--text-muted)] space-y-1 border-t border-[var(--border-gold)] pt-3">
          <p>• <strong>Key Distances:</strong> Badhra (10 KM) | Loharu (19 KM) | Satnali (26 KM)</p>
          <p>• <strong>Railway Stations:</strong> Loharu Junction (~19 KM) | Satnali (~26 KM) | Charkhi Dadri (~40 KM)</p>
        </div>
      </div>

      {/* Navigation Action Buttons */}
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
  );

  // Card 2: Groom's Perspective of Bride Venue (Barat Destination)
  const GroomSideBaratDestinationCard = (
    <div className="glass-wedding-card rounded-3xl p-6 sm:p-8 border border-[var(--border-gold)] shadow-xl flex flex-col justify-between relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--hero-glow)] rounded-full blur-2xl pointer-events-none" />

      <div>
        {/* Header Tag */}
        <div className="flex items-center justify-between mb-4">
          <span className="px-3.5 py-1 rounded-full bg-[var(--badge-bg)] text-[var(--badge-text)] border border-[var(--badge-border)] text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5">
            <Home className="w-3.5 h-3.5" />
            <span>Bride Venue (Barat Destination)</span>
          </span>
          <span className="text-xs text-[var(--accent-gold)] font-bold">20 Nov: Barat Destination</span>
        </div>

        <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
          Arya Nagar, Charkhi Dadri
        </h3>
        <p className="font-hindi text-[var(--accent-primary)] text-base font-semibold mt-1">
          आर्य नगर, चरखी दादरी (हरियाणा)
        </p>

        {/* Address Card */}
        <div className="mt-4 p-4 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-gold)] flex items-start space-x-3 shadow-sm">
          <MapPin className="w-5 h-5 text-[var(--accent-gold)] shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm font-sans leading-relaxed">
            <p className="text-[var(--text-primary)] font-medium">
              Arya Nagar, Charkhi Dadri City, Distt. Charkhi Dadri, Haryana — 127306
            </p>
          </div>
        </div>

        {/* Program events held here for Groom Side */}
        <div className="mt-4 space-y-1.5">
          <p className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider">
            Functions Hosted Here:
          </p>
          <div className="flex flex-wrap gap-2 text-xs text-[var(--text-secondary)]">
            <span className="px-2.5 py-1 rounded-lg bg-[var(--badge-bg)] border border-[var(--badge-border)] font-medium">20 Nov: Barat Swagat (06:00 PM)</span>
            <span className="px-2.5 py-1 rounded-lg bg-[var(--badge-bg)] border border-[var(--badge-border)] font-medium">20 Nov: Varmala & Dinner</span>
            <span className="px-2.5 py-1 rounded-lg bg-[var(--badge-bg)] border border-[var(--badge-border)] font-medium">20 Nov: Pheras & Vivah</span>
          </div>
        </div>

        {/* Distances info */}
        <div className="mt-4 text-xs text-[var(--text-muted)] space-y-1 border-t border-[var(--border-gold)] pt-3">
          <p>• <strong>Distance from Nandha:</strong> ~18 KM via Badhra-Dadri Road</p>
          <p>• <strong>Nearby Stations:</strong> Loharu Junction (~19 KM) | Satnali (~26 KM) | Charkhi Dadri CKD (~40 KM)</p>
        </div>
      </div>

      {/* Navigation Action Buttons */}
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
  );

  // Card 3: Groom Home Card (Nandha ki Dhani)
  const NandhaCard = (
    <div className={`glass-wedding-card rounded-3xl p-6 sm:p-8 border shadow-xl flex flex-col justify-between relative overflow-hidden group ${
      !isBrideSide ? 'border-2 border-[var(--accent-gold)] ring-2 ring-[var(--accent-gold)]/20' : 'border-[var(--border-gold)]'
    }`}>
      <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--hero-glow)] rounded-full blur-2xl pointer-events-none" />

      <div>
        {/* Header Tag */}
        <div className="flex items-center justify-between mb-4">
          <span className="px-3.5 py-1 rounded-full bg-[var(--badge-bg)] text-[var(--badge-text)] border border-[var(--badge-border)] text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5">
            <Home className="w-3.5 h-3.5" />
            <span>{!isBrideSide ? "Groom Home & Main Functions" : "Groom Home (Nandha ki Dhani)"}</span>
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
            Functions Hosted Here:
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
          <p>• <strong>Nearest Railway:</strong> Satnali STNL (~10 KM) | Loharu LHU (~17 KM)</p>
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
  );

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

      {/* Location Cards Grid - Ordered based on Bride or Groom Perspective */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {isBrideSide ? (
          <>
            {BrideSideAryanagarCard}
            {NandhaCard}
          </>
        ) : (
          <>
            {NandhaCard}
            {GroomSideBaratDestinationCard}
          </>
        )}
      </div>
    </section>
  );
}
