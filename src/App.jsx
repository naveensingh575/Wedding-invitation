import React, { useState, useEffect, useRef } from 'react';
import ComingSoon from './components/ComingSoon';

export default function App() {
  return <ComingSoon />;
}

function DisabledApp() {
  // 1. Persisted Theme and Language via localStorage
  const [currentLang, setCurrentLang] = useState(() => {
    return localStorage.getItem('navisha_lang') || 'haryanvi';
  });

  const [currentTheme, setCurrentTheme] = useState(() => {
    return localStorage.getItem('navisha_theme') || 'theme-blush-champagne';
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
    };
  }, []);

  // Update track source when currentTrackIndex changes
  useEffect(() => {
    if (!audioRef.current) return;
    const audio = audioRef.current;
    audio.src = WEDDING_PLAYLIST[currentTrackIndex].url;
    audio.currentTime = 0;

    if (isPlaying) {
      audio.play().catch((err) => console.log("Track change auto-play:", err));
    }
  }, [currentTrackIndex]);

  // Audio Playback Controls
  const togglePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.muted = false;
      setIsMuted(false);
      if (audioRef.current.volume === 0) {
        audioRef.current.volume = 0.85;
        setVolume(0.85);
      }
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => console.log("Play error:", err));
    }
  };

  const handleNextTrack = () => {
    if (isShuffle) {
      let nextIdx;
      do {
        nextIdx = Math.floor(Math.random() * WEDDING_PLAYLIST.length);
      } while (nextIdx === currentTrackIndex && WEDDING_PLAYLIST.length > 1);
      setCurrentTrackIndex(nextIdx);
    } else {
      setCurrentTrackIndex((prev) => (prev + 1) % WEDDING_PLAYLIST.length);
    }
  };

  const handlePrevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + WEDDING_PLAYLIST.length) % WEDDING_PLAYLIST.length);
  };

  const handleTrackEnd = () => {
    if (repeatMode === 'one') {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
      }
    } else {
      handleNextTrack();
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    const nextMute = !isMuted;
    audioRef.current.muted = nextMute;
    setIsMuted(nextMute);

    if (!nextMute) {
      if (audioRef.current.volume === 0) {
        audioRef.current.volume = 0.85;
        setVolume(0.85);
      }
      if (audioRef.current.paused) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch((err) => console.log("Unmute play:", err));
      }
    }
  };

  const handleVolumeChange = (newVol) => {
    if (!audioRef.current) return;
    setVolume(newVol);
    audioRef.current.volume = newVol;
    if (newVol === 0) {
      setIsMuted(true);
      audioRef.current.muted = true;
    } else if (isMuted) {
      setIsMuted(false);
      audioRef.current.muted = false;
    }
  };

  const handleSeek = (newTime) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Common Props Bundle for MusicPlayer Component
  const musicPlayerProps = {
    playlist: WEDDING_PLAYLIST,
    currentTrackIndex,
    setCurrentTrackIndex,
    isPlaying,
    togglePlayPause,
    handleNextTrack,
    handlePrevTrack,
    currentTime,
    duration,
    handleSeek,
    volume,
    handleVolumeChange,
    isMuted,
    toggleMute,
    isShuffle,
    setIsShuffle,
    repeatMode,
    setRepeatMode,
    t,
  };

  return (
    <CelebrationProvider>
      <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] relative theme-transition selection:bg-[var(--accent-gold)] selection:text-white font-sans">
        {/* Fullscreen Hotstar Style Skyshot Fireworks Canvas Overlay */}
        <CelebrationCanvas />

        {/* Sticky Luxury Navbar */}
        <Navbar
          activePage={activePage}
          setActivePage={setActivePage}
          currentLang={currentLang}
          setCurrentLang={setCurrentLang}
          currentTheme={currentTheme}
          setCurrentTheme={setCurrentTheme}
          isMuted={isMuted}
          toggleMute={toggleMute}
          isPlaying={isPlaying}
          togglePlayPause={togglePlayPause}
          t={t}
        />

        {/* Dynamic 3-Page View Container */}
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
    </CelebrationProvider>
  );
}
