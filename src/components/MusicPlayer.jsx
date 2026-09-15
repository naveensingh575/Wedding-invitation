import React from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Shuffle,
  Repeat,
  Repeat1,
  Music,
} from 'lucide-react';

function formatTime(seconds) {
  if (isNaN(seconds) || seconds === null || seconds === undefined) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

export default function MusicPlayer(props) {
  const {
    playlist = [],
    currentTrackIndex = 0,
    isPlaying = false,
    currentTime = 0,
    duration = 0,
    volume = 0.85,
    isMuted = false,
    isShuffle = false,
    repeatMode = 'all',
    // Support both prop naming conventions from App.jsx and legacy components
    togglePlayPause,
    onTogglePlay,
    handleNextTrack,
    onPlayNext,
    handlePrevTrack,
    onPlayPrev,
    handleSeek,
    onSeek,
    handleVolumeChange,
    onVolumeChange,
    toggleMute,
    onToggleMute,
    setIsShuffle,
    onToggleShuffle,
    setRepeatMode,
    onToggleRepeat,
  } = props;

  const currentTrack = playlist[currentTrackIndex] || playlist[0] || {
    title: 'Aaj Sajeya (Couple Special)',
    artist: 'Goldie Sohel',
    durationEst: '3:50',
  };

  const playPauseHandler = togglePlayPause || onTogglePlay;
  const nextTrackHandler = handleNextTrack || onPlayNext;
  const prevTrackHandler = handlePrevTrack || onPlayPrev;
  const seekHandler = handleSeek || onSeek;
  const volumeHandler = handleVolumeChange || onVolumeChange;
  const muteHandler = toggleMute || onToggleMute;

  const shuffleHandler = () => {
    if (onToggleShuffle) onToggleShuffle();
    else if (setIsShuffle) setIsShuffle((prev) => !prev);
  };

  const repeatHandler = () => {
    if (onToggleRepeat) onToggleRepeat();
    else if (setRepeatMode) {
      setRepeatMode((prev) => (prev === 'off' ? 'all' : prev === 'all' ? 'one' : 'off'));
    }
  };

  return (
    <section id="music-player" className="w-full mx-auto px-0 sm:px-2 my-6 relative">
      <div className="glass-wedding-card rounded-3xl p-4 sm:p-6 border-2 border-[var(--border-gold)] shadow-2xl bg-[var(--bg-elevated)]/95 relative overflow-hidden theme-transition">
        
        {/* Ambient Glows */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-[var(--hero-glow)] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-52 h-52 bg-[var(--badge-bg)] rounded-full blur-2xl pointer-events-none" />

        {/* Minimal Elegant Audio Control Bar */}
        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Song Cover Artwork & Details */}
            <div className="flex items-center space-x-4 w-full sm:w-auto">
              <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border-2 border-[var(--accent-gold)] overflow-hidden shadow-lg shrink-0 relative bg-black flex items-center justify-center ${isPlaying ? 'ring-2 ring-[var(--accent-gold)] ring-offset-2 ring-offset-[var(--bg-primary)]' : ''}`}>
                <img
                  src="/assets/doodles/couple.png"
                  alt="Naveen & Manisha Wedding Audio"
                  className={`w-full h-full object-cover object-top ${isPlaying ? 'scale-105' : 'scale-100'} transition-transform duration-500`}
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <Music className={`w-5 h-5 text-white ${isPlaying ? 'animate-bounce' : ''}`} />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-bold text-[var(--accent-gold)] uppercase tracking-wider font-mono">
                    🎵 Wedding Music
                  </span>
                  {isPlaying && (
                    <span className="flex items-center space-x-1 text-[10px] text-emerald-500 font-bold">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                      <span>Playing Live</span>
                    </span>
                  )}
                </div>

                <h4 className="font-serif text-base sm:text-lg font-extrabold text-[var(--text-primary)] truncate mt-0.5">
                  {currentTrack.title}
                </h4>
                <p className="text-xs text-[var(--text-secondary)] font-sans truncate">
                  {currentTrack.artist}
                </p>
              </div>
            </div>

            {/* Playback Controls (Shuffle, Previous, Play/Pause, Next, Repeat) */}
            <div className="flex items-center space-x-2.5 sm:space-x-3.5 shrink-0">
              
              {/* Shuffle / Re-shuffle Toggle */}
              <button
                onClick={shuffleHandler}
                className={`p-2.5 sm:p-3 rounded-full border transition-all shadow-sm cursor-pointer ${
                  isShuffle
                    ? 'bg-[var(--accent-gold)] text-white border-[var(--accent-gold)] shadow-md'
                    : 'bg-[var(--bg-surface)] text-[var(--text-muted)] border-[var(--border-gold)] hover:text-[var(--text-primary)]'
                }`}
                title={isShuffle ? "Shuffle On (Re-shuffling playlist)" : "Shuffle Off"}
              >
                <Shuffle className="w-4 h-4" />
              </button>

              {/* Previous Track */}
              <button
                onClick={prevTrackHandler}
                className="p-2.5 sm:p-3 rounded-full bg-[var(--bg-surface)] hover:bg-[var(--bg-card)] text-[var(--text-primary)] border border-[var(--border-gold)] hover:border-[var(--accent-gold)] transition-all shadow-md active:scale-95 cursor-pointer"
                title="Previous Track"
              >
                <SkipBack className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
              </button>

              {/* Play / Pause Main Button */}
              <button
                onClick={playPauseHandler}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-[var(--accent-gold)] to-[#AA7C11] text-white flex items-center justify-center font-bold shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
                title={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
                ) : (
                  <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current ml-0.5" />
                )}
              </button>

              {/* Next Track */}
              <button
                onClick={nextTrackHandler}
                className="p-2.5 sm:p-3 rounded-full bg-[var(--bg-surface)] hover:bg-[var(--bg-card)] text-[var(--text-primary)] border border-[var(--border-gold)] hover:border-[var(--accent-gold)] transition-all shadow-md active:scale-95 cursor-pointer"
                title="Next Track"
              >
                <SkipForward className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
              </button>

              {/* Repeat Toggle */}
              <button
                onClick={repeatHandler}
                className={`p-2.5 sm:p-3 rounded-full border transition-all shadow-sm cursor-pointer ${
                  repeatMode !== 'off'
                    ? 'bg-[var(--accent-gold)] text-white border-[var(--accent-gold)] shadow-md'
                    : 'bg-[var(--bg-surface)] text-[var(--text-muted)] border-[var(--border-gold)] hover:text-[var(--text-primary)]'
                }`}
                title={`Repeat Mode: ${repeatMode}`}
              >
                {repeatMode === 'one' ? <Repeat1 className="w-4 h-4" /> : <Repeat className="w-4 h-4" />}
              </button>

            </div>

          </div>

          {/* Progress Bar & Volume Toggle */}
          <div className="mt-4 pt-3 border-t border-[var(--border-gold)]/50">
            <div className="flex items-center space-x-3">
              <span className="text-[11px] text-[var(--text-muted)] font-mono w-10 text-right">
                {formatTime(currentTime)}
              </span>

              {/* Seek Slider */}
              <div className="flex-1 relative flex items-center group cursor-pointer">
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  value={currentTime || 0}
                  onChange={(e) => seekHandler && seekHandler(parseFloat(e.target.value))}
                  className="w-full h-2 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-gold)] appearance-none cursor-pointer accent-[var(--accent-gold)] focus:outline-none"
                />
              </div>

              <span className="text-[11px] text-[var(--text-muted)] font-mono w-10">
                {duration > 0 ? formatTime(duration) : currentTrack.durationEst}
              </span>

              {/* Volume Slider & Mute Toggle */}
              <div className="hidden sm:flex items-center space-x-2 pl-3 border-l border-[var(--border-gold)]">
                <button
                  onClick={muteHandler}
                  className="p-1 rounded-full text-[var(--text-muted)] hover:text-[var(--accent-gold)] transition-colors cursor-pointer"
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-4 h-4 text-rose-400" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-[var(--accent-gold)]" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => volumeHandler && volumeHandler(parseFloat(e.target.value))}
                  className="w-16 h-1.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-gold)] appearance-none cursor-pointer accent-[var(--accent-gold)]"
                />
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
