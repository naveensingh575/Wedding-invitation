import React from 'react';
import { Home, ArrowRight, Sparkles } from 'lucide-react';
import HeroSection from './HeroSection';
import MusicPlayer from './MusicPlayer';
import BalSandesh from './BalSandesh';
import ProgramSchedule from './ProgramSchedule';
import LocationsSection from './LocationsSection';
import TravelGuide from './TravelGuide';
import GallerySection from './GallerySection';
import RSVPSection from './RSVPSection';
import WishesWall from './WishesWall';
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
          className="px-4 py-2 rounded-full bg-[var(--bg-elevated)] hover:bg-[var(--bg-card)] border border-[var(--border-gold)] text-xs font-bold text-[var(--text-primary)] flex items-center space-x-2 shadow-sm transition-all active:scale-95"
        >
          <Home className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
          <span>← Back to Home</span>
        </button>

        <div className="flex items-center space-x-2">
          <span className="hidden sm:inline text-xs text-[var(--text-muted)] font-medium">Viewing Groom's Side</span>
          <button
            onClick={onSwitchToBride}
            className="px-4 py-2 rounded-full bg-gradient-to-r from-[var(--accent-gold)] to-[#AA7C11] text-white text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition-all flex items-center space-x-1.5"
          >
            <span>Switch to Bride's Side 👰</span>
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

      {/* Interactive Music Playlist directly below the Countdown Timer */}
      {musicPlayerProps && (
        <div className="max-w-7xl mx-auto my-4">
          <MusicPlayer {...musicPlayerProps} />
        </div>
      )}

      {/* Bal Sandesh */}
      <BalSandesh t={t} customData={sideData.balSandesh} />

      {/* Program Schedule with 3D Flip Cultural Lineage */}
      <ProgramSchedule t={t} sideData={sideData} />

      {/* Locations & Maps (Nandha ki Dhani First) */}
      <LocationsSection t={t} sideData={sideData} isBrideSide={false} />

      {/* Travel Guide (Satnali 10 KM, Loharu 17 KM, Charkhi Dadri 40 KM) */}
      <TravelGuide t={t} sideData={sideData} isBrideSide={false} />

      {/* AI Doodle & Photo Gallery */}
      <GallerySection customCouplePhoto={customCouplePhoto} t={t} />

      {/* RSVP Form */}
      <RSVPSection t={t} />

      {/* Wishes Wall */}
      <WishesWall t={t} />

      {/* Footer Customized for Groom Side */}
      <Footer t={t} isBrideSide={false} />
    </div>
  );
}
