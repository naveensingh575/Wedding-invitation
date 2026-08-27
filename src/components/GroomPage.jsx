import React from 'react';
import { Home, ArrowRight } from 'lucide-react';
import HeroSection from './HeroSection';
import MusicPlayer from './MusicPlayer';
import BalSandesh from './BalSandesh';
import ProgramSchedule from './ProgramSchedule';
import LocationsSection from './LocationsSection';
import TravelGuide from './TravelGuide';
import GallerySection from './GallerySection';
import RSVPSection from './RSVPSection';
import Footer from './Footer';

export default function GroomPage({
  customCouplePhoto,
  setCustomCouplePhoto,
  openVideoModal,
  t,
  onBackToPortal,
  onSwitchToBride,
  musicPlayerProps,
}) {
  const sideData = t.groom || t;

  return (
    <div className="animate-fadeIn relative">
      {/* Top Breadcrumb Navigation Bar */}
      <div className="pt-24 pb-2 px-4 max-w-7xl mx-auto flex items-center justify-between gap-3">
        <button
          onClick={onBackToPortal}
          className="px-4 py-2 rounded-full bg-[var(--bg-elevated)] hover:bg-[var(--bg-card)] border border-[var(--border-gold)] text-xs font-bold text-[var(--text-primary)] flex items-center space-x-2 shadow-sm transition-all active:scale-95 cursor-pointer"
        >
          <Home className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
          <span>← Back to Home</span>
        </button>

        <div className="flex items-center space-x-2">
          <span className="hidden sm:inline text-xs text-[var(--text-muted)] font-medium">Viewing Groom's Side</span>
          <button
            onClick={onSwitchToBride}
            className="px-4 py-2 rounded-full bg-[var(--accent-primary)] hover:opacity-90 text-white text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition-all flex items-center space-x-1.5 cursor-pointer"
          >
            <span>Switch to Bride's Side</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Hero Section with Groom Perspective & Countdown Timer */}
      <HeroSection
        customCouplePhoto={customCouplePhoto}
        setCustomCouplePhoto={setCustomCouplePhoto}
        openVideoModal={openVideoModal}
        t={t}
        sideData={sideData}
      />

      {/* Audio Control Bar */}
      {musicPlayerProps && (
        <div className="max-w-4xl mx-auto px-4 my-4">
          <MusicPlayer {...musicPlayerProps} />
        </div>
      )}

      {/* Bal Sandesh */}
      <BalSandesh t={t} customData={sideData.balSandesh} />

      {/* Program Schedule */}
      <ProgramSchedule t={t} sideData={sideData} />

      {/* Locations & Maps */}
      <LocationsSection t={t} sideData={sideData} isBrideSide={false} />

      {/* Travel Guide */}
      <TravelGuide t={t} sideData={sideData} isBrideSide={false} />

      {/* AI Doodle & Photo Gallery */}
      <GallerySection customCouplePhoto={customCouplePhoto} t={t} />

      {/* RSVP Form */}
      <RSVPSection t={t} />

      {/* Footer Customized for Groom Side */}
      <Footer t={t} isBrideSide={false} />
    </div>
  );
}
