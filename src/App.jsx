import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import LandingPortal from './components/LandingPortal';
import GroomPage from './components/GroomPage';
import BridePage from './components/BridePage';
import VideoInvitationModal from './components/VideoInvitationModal';
import ThemeSwitcher from './components/ThemeSwitcher';

import { WEDDING_PLAYLIST } from './data/playlist';
import { translations } from './data/translations';

export default function App() {
  // 1. Persisted Theme and Language via localStorage
  const [currentLang, setCurrentLang] = useState(() => {
    return localStorage.getItem('navisha_lang') || 'haryanvi';
  });

  const [currentTheme, setCurrentTheme] = useState(() => {
    return localStorage.getItem('navisha_theme') || 'theme-sage-ivory';
  });

  // 2. Active 3-Page Route State ('portal' | 'groom' | 'bride') with Clean URL Routing
  const [activePage, setActivePage] = useState(() => {
    const hash = window.location.hash.toLowerCase();
    if (hash.includes('groom')) return 'groom';
    if (hash.includes('bride')) return 'bride';
    return 'portal';
  });

  // Clean URL Routing & Hash Synchronization (No '#portal' in URL bar)
  useEffect(() => {
    if (activePage === 'groom') {
      if (window.location.hash !== '#groom') {
        window.history.replaceState(null, '', '#groom');
      }
    } else if (activePage === 'bride') {
      if (window.location.hash !== '#bride') {
        window.history.replaceState(null, '', '#bride');
      }
    } else {
      // Clean URL: Remove any hash when on portal/home
      if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  // Browser Back/Forward navigation listener
  useEffect(() => {
    const handleLocationChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('groom')) setActivePage('groom');
      else if (hash.includes('bride')) setActivePage('bride');
      else setActivePage('portal');
    };

    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  // Persist language and theme changes to localStorage & DOM
  useEffect(() => {
    localStorage.setItem('navisha_lang', currentLang);
  }, [currentLang]);

  useEffect(() => {
    localStorage.setItem('navisha_theme', currentTheme);
    document.documentElement.className = currentTheme;
    document.documentElement.setAttribute('data-theme', currentTheme);
  }, [currentTheme]);

  // 3. Audio & Music Player States
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

  // Initialize HTML5 Audio Element & Mobile Auto-Play Unlock
  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'auto';
    audio.volume = 0.85;
    audio.muted = false;
    audioRef.current = audio;

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
      console.warn("Audio load notice, advancing:", e);
      handleTrackEnd();
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    // One-time global interaction listener for Mobile Safari & Chrome auto-play unlock
    const unlockAndPlayAudio = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.muted = false;
        audioRef.current.volume = 0.85;
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          setIsMuted(false);
        }).catch((err) => {
          console.log("Audio unlock gesture handled:", err);
        });
      }
      removeUnlockListeners();
    };

    const removeUnlockListeners = () => {
      window.removeEventListener('click', unlockAndPlayAudio);
      window.removeEventListener('touchstart', unlockAndPlayAudio);
      window.removeEventListener('pointerdown', unlockAndPlayAudio);
      window.removeEventListener('keydown', unlockAndPlayAudio);
      window.removeEventListener('scroll', unlockAndPlayAudio);
      document.removeEventListener('click', unlockAndPlayAudio);
      document.removeEventListener('touchstart', unlockAndPlayAudio);
    };

    window.addEventListener('click', unlockAndPlayAudio, { once: true, passive: true });
    window.addEventListener('touchstart', unlockAndPlayAudio, { once: true, passive: true });
    window.addEventListener('pointerdown', unlockAndPlayAudio, { once: true, passive: true });
    window.addEventListener('keydown', unlockAndPlayAudio, { once: true, passive: true });
    window.addEventListener('scroll', unlockAndPlayAudio, { once: true, passive: true });
    document.addEventListener('click', unlockAndPlayAudio, { once: true, passive: true });
    document.addEventListener('touchstart', unlockAndPlayAudio, { once: true, passive: true });

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      removeUnlockListeners();
      audio.pause();
      audio.src = '';
    };
  }, []);

  // Track Change Handler
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

  // Next Track Logic
  const handleTrackEnd = () => {
    if (repeatMode === 'one') {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().then(() => setIsPlaying(true));
      }
    } else if (repeatMode === 'all') {
      handlePlayNext();
    } else {
      if (currentTrackIndex < WEDDING_PLAYLIST.length - 1) {
        handlePlayNext();
      } else {
        setIsPlaying(false);
      }
    }
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

  // Play / Pause Toggle
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

  // Seek, Volume, Mute, Shuffle, Repeat Controls
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

  const musicPlayerProps = {
    playlist: WEDDING_PLAYLIST,
    currentTrackIndex,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    isShuffle,
    repeatMode,
    onTogglePlay: handleTogglePlay,
    onPlayNext: handlePlayNext,
    onPlayPrev: handlePlayPrev,
    onSelectTrack: (index) => changeTrack(index, true),
    onSeek: handleSeek,
    onVolumeChange: handleVolumeChange,
    onToggleMute: handleToggleMute,
    onToggleShuffle: handleToggleShuffle,
    onToggleRepeat: handleToggleRepeat,
  };

  return (
    <div className={`${currentTheme} min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans theme-transition relative selection:bg-wedding-gold selection:text-wedding-deepMaroon`}>
      
      {/* Top Navbar with Clean 3-Pill Language Toggle, Theme Switcher & Audio Sync */}
      <Navbar
        isMuted={!isPlaying || isMuted}
        setIsMuted={handleTogglePlay}
        currentLang={currentLang}
        setCurrentLang={setCurrentLang}
        activePage={activePage}
        setActivePage={setActivePage}
        currentTheme={currentTheme}
        setCurrentTheme={setCurrentTheme}
        t={t}
      />

      {/* ============================================================
          PAGE ROUTING: PORTAL HOME / GROOM PAGE / BRIDE PAGE
      ============================================================ */}
      <main>
        {activePage === 'portal' && (
          <LandingPortal
            onSelectSide={(side) => setActivePage(side)}
            currentLang={currentLang}
            setCurrentLang={setCurrentLang}
            t={t}
            musicPlayerProps={musicPlayerProps}
          />
        )}

        {activePage === 'groom' && (
          <GroomPage
            customCouplePhoto={customCouplePhoto}
            setCustomCouplePhoto={setCustomCouplePhoto}
            openVideoModal={() => setIsVideoModalOpen(true)}
            t={t}
            onBackToPortal={() => setActivePage('portal')}
            onSwitchToBride={() => setActivePage('bride')}
            musicPlayerProps={musicPlayerProps}
          />
        )}

        {activePage === 'bride' && (
          <BridePage
            customCouplePhoto={customCouplePhoto}
            setCustomCouplePhoto={setCustomCouplePhoto}
            openVideoModal={() => setIsVideoModalOpen(true)}
            t={t}
            onBackToPortal={() => setActivePage('portal')}
            onSwitchToGroom={() => setActivePage('groom')}
            musicPlayerProps={musicPlayerProps}
          />
        )}
      </main>

      {/* Video Invitation Modal */}
      <VideoInvitationModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        customVideoUrl={customVideoUrl}
        setCustomVideoUrl={setCustomVideoUrl}
      />

      {/* Floating Theme Switcher Widget */}
      <ThemeSwitcher
        currentTheme={currentTheme}
        setCurrentTheme={setCurrentTheme}
      />
    </div>
  );
}
