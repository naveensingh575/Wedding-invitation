import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import MusicPlayer from './components/MusicPlayer';
import BalSandesh from './components/BalSandesh';
import VideoInvitationModal from './components/VideoInvitationModal';
import ProgramSchedule from './components/ProgramSchedule';
import LocationsSection from './components/LocationsSection';
import TravelGuide from './components/TravelGuide';
import GallerySection from './components/GallerySection';
import RSVPSection from './components/RSVPSection';
import WishesWall from './components/WishesWall';
import Footer from './components/Footer';
import ThemeSwitcher from './components/ThemeSwitcher';

import { WEDDING_PLAYLIST } from './data/playlist';
import { translations } from './data/translations';

export default function App() {
  const [currentLang, setCurrentLang] = useState('haryanvi');
  const [currentTheme, setCurrentTheme] = useState('theme-sage-ivory');

  // Music Player States - Unmuted by default with audible sound
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState('all'); // 'off' | 'all' | 'one'

  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [customCouplePhoto, setCustomCouplePhoto] = useState(null);
  const [customVideoUrl, setCustomVideoUrl] = useState(null);

  const audioRef = useRef(null);
  const t = translations[currentLang] || translations.en;

  // 1. Initialize and Manage HTML5 Audio Element
  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'auto';
    audio.volume = 0.85;
    audio.muted = false;
    audioRef.current = audio;

    // Load initial track
    audio.src = WEDDING_PLAYLIST[currentTrackIndex].url;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };

    const handleEnded = () => {
      handleTrackEnd();
    };

    const handleError = (e) => {
      console.warn("Audio load error, skipping to next:", e);
      handleTrackEnd();
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    // Attempt instant unmuted play on page load
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setIsMuted(false);
        })
        .catch(() => {
          // Browser requires user interaction before unmuted audio playback
        });
    }

    // Attach silent interaction listeners to start unmuted sound on first touch/click/scroll
    const startUnmutedAudio = () => {
      if (audioRef.current) {
        audioRef.current.muted = false;
        audioRef.current.volume = 0.85;
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          setIsMuted(false);
        }).catch((err) => {
          console.log("Interactive sound play:", err);
        });
      }
      window.removeEventListener('click', startUnmutedAudio);
      window.removeEventListener('touchstart', startUnmutedAudio);
      window.removeEventListener('keydown', startUnmutedAudio);
      window.removeEventListener('scroll', startUnmutedAudio);
    };

    window.addEventListener('click', startUnmutedAudio, { once: true });
    window.addEventListener('touchstart', startUnmutedAudio, { once: true });
    window.addEventListener('keydown', startUnmutedAudio, { once: true });
    window.addEventListener('scroll', startUnmutedAudio, { once: true });

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      window.removeEventListener('click', startUnmutedAudio);
      window.removeEventListener('touchstart', startUnmutedAudio);
      window.removeEventListener('keydown', startUnmutedAudio);
      window.removeEventListener('scroll', startUnmutedAudio);
      audio.pause();
      audio.src = '';
    };
  }, []);

  // 2. Track Change Handler (Switches source without reloading page)
  const changeTrack = (newIndex, shouldPlay = true) => {
    if (!audioRef.current) return;
    const boundedIndex = (newIndex + WEDDING_PLAYLIST.length) % WEDDING_PLAYLIST.length;
    setCurrentTrackIndex(boundedIndex);
    setCurrentTime(0);

    audioRef.current.src = WEDDING_PLAYLIST[boundedIndex].url;
    audioRef.current.load();
    audioRef.current.muted = false;
    audioRef.current.volume = volume;

    if (shouldPlay || isPlaying) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setIsMuted(false);
      }).catch((err) => {
        console.log("Track play error:", err);
      });
    }
  };

  // 3. Next Track Logic (Handles Shuffle and Repeat)
  const handleTrackEnd = () => {
    if (repeatMode === 'one') {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().then(() => setIsPlaying(true));
      }
      return;
    }

    if (isShuffle) {
      const randomIndex = Math.floor(Math.random() * WEDDING_PLAYLIST.length);
      changeTrack(randomIndex, true);
      return;
    }

    if (repeatMode === 'off' && currentTrackIndex === WEDDING_PLAYLIST.length - 1) {
      setIsPlaying(false);
      return;
    }

    changeTrack(currentTrackIndex + 1, true);
  };

  const handlePlayNext = () => {
    if (isShuffle) {
      const randomIndex = Math.floor(Math.random() * WEDDING_PLAYLIST.length);
      changeTrack(randomIndex, true);
    } else {
      changeTrack(currentTrackIndex + 1, true);
    }
  };

  const handlePlayPrev = () => {
    if (audioRef.current && audioRef.current.currentTime > 3) {
      audioRef.current.currentTime = 0;
    } else {
      changeTrack(currentTrackIndex - 1, true);
    }
  };

  // 4. Play / Pause Toggle
  const handleTogglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.muted = false;
      audioRef.current.volume = volume > 0 ? volume : 0.85;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setIsMuted(false);
      }).catch((err) => {
        console.log("Audio play policy error:", err);
      });
    }
  };

  // 5. Seek, Volume, Mute, Shuffle, Repeat Controls
  const handleSeek = (time) => {
    if (audioRef.current && !isNaN(time)) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (newVol) => {
    setVolume(newVol);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
      if (newVol > 0 && isMuted) {
        audioRef.current.muted = false;
        setIsMuted(false);
      }
    }
  };

  const handleToggleMute = () => {
    if (!audioRef.current) return;
    const nextMuted = !isMuted;
    audioRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const handleToggleShuffle = () => {
    setIsShuffle(!isShuffle);
  };

  const handleToggleRepeat = () => {
    if (repeatMode === 'off') setRepeatMode('all');
    else if (repeatMode === 'all') setRepeatMode('one');
    else setRepeatMode('off');
  };

  return (
    <div className={`${currentTheme} min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans theme-transition relative`}>
      {/* Navbar with Synchronized Audio Toggle & Language Switcher */}
      <Navbar
        isMuted={!isPlaying || isMuted}
        setIsMuted={handleTogglePlay}
        currentLang={currentLang}
        setCurrentLang={setCurrentLang}
        t={t}
      />

      {/* Hero Section */}
      <HeroSection
        customCouplePhoto={customCouplePhoto}
        setCustomCouplePhoto={setCustomCouplePhoto}
        openVideoModal={() => setIsVideoModalOpen(true)}
        t={t}
      />

      {/* Complete Music Library & Playlist Player */}
      <MusicPlayer
        playlist={WEDDING_PLAYLIST}
        currentTrackIndex={currentTrackIndex}
        isPlaying={isPlaying}
        currentTime={currentTime}
        duration={duration}
        volume={volume}
        isMuted={isMuted}
        isShuffle={isShuffle}
        repeatMode={repeatMode}
        onTogglePlay={handleTogglePlay}
        onPlayNext={handlePlayNext}
        onPlayPrev={handlePlayPrev}
        onSelectTrack={(index) => changeTrack(index, true)}
        onSeek={handleSeek}
        onVolumeChange={handleVolumeChange}
        onToggleMute={handleToggleMute}
        onToggleShuffle={handleToggleShuffle}
        onToggleRepeat={handleToggleRepeat}
      />

      {/* Bal Sandesh (Vedant & Shivansh's Special Invitation) */}
      <BalSandesh t={t} />

      {/* Program Schedule with 3D Cultural Heritage Flip Cards */}
      <ProgramSchedule t={t} />

      {/* Locations & Maps with Exact Pins */}
      <LocationsSection t={t} />

      {/* Travel Guide with Haryana Roadways Transit */}
      <TravelGuide t={t} />

      {/* AI Doodle & Photo Gallery */}
      <GallerySection customCouplePhoto={customCouplePhoto} t={t} />

      {/* RSVP Form */}
      <RSVPSection t={t} />

      {/* Wishes Wall Guestbook */}
      <WishesWall t={t} />

      {/* Footer */}
      <Footer t={t} />

      {/* Video Invitation Modal */}
      <VideoInvitationModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        customVideoUrl={customVideoUrl}
        setCustomVideoUrl={setCustomVideoUrl}
      />

      {/* Modern Aesthetic Theme Palette Switcher Floating Widget */}
      <ThemeSwitcher
        currentTheme={currentTheme}
        setCurrentTheme={setCurrentTheme}
      />
    </div>
  );
}
