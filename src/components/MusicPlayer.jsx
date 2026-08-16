import React, { useState } from 'react';
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
  ListMusic,
  Music,
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { MUSIC_CATEGORIES } from '../data/playlist';

function formatTime(seconds) {
  if (isNaN(seconds) || seconds === null || seconds === undefined) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

export default function MusicPlayer({
  playlist,
  currentTrackIndex,
  isPlaying,
  currentTime,
  duration,
  volume,
  isMuted,
  isShuffle,
  repeatMode, // 'off' | 'all' | 'one'
  onTogglePlay,
  onPlayNext,
  onPlayPrev,
  onSelectTrack,
  onSeek,
  onVolumeChange,
  onToggleMute,
  onToggleShuffle,
  onToggleRepeat,
}) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isPlaylistExpanded, setIsPlaylistExpanded] = useState(true);

  const currentTrack = playlist[currentTrackIndex] || playlist[0];

  const filteredPlaylist = selectedCategory === 'all'
    ? playlist
    : playlist.filter((track) => track.categoryKey === selectedCategory);

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <section id="music-player" className="max-w-5xl mx-auto px-4 my-8 relative">
      <div className="glass-wedding-card rounded-3xl p-5 sm:p-7 border-2 border-[var(--border-gold)] shadow-2xl bg-[var(--bg-elevated)]/95 relative overflow-hidden theme-transition">
        
        {/* Ambient Glows */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[var(--hero-glow)] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-[var(--badge-bg)] rounded-full blur-2xl pointer-events-none" />

        {/* ============================================================
            1. HEADER & CATEGORY TABS
        ============================================================ */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-gold)] mb-5 relative z-10">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-[var(--badge-bg)] border border-[var(--badge-border)] flex items-center justify-center text-[var(--accent-gold)] shadow-sm">
              <Music className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[var(--text-primary)] leading-tight">
                Wedding Music Library & Playlist
              </h3>
              <p className="text-xs text-[var(--text-secondary)] font-sans">
                Bridal Entry, Hindi & Haryanvi Wedding Melodies for Naveen & Manisha (#Navisha)
              </p>
            </div>
          </div>

          {/* Expand / Collapse Button */}
          <button
            onClick={() => setIsPlaylistExpanded(!isPlaylistExpanded)}
            className="px-3.5 py-1.5 rounded-full bg-[var(--bg-surface)] hover:bg-[var(--bg-card)] border border-[var(--border-gold)] text-xs font-bold text-[var(--text-primary)] flex items-center space-x-1.5 shadow-sm transition-all self-end sm:self-center"
          >
            <ListMusic className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
            <span>{isPlaylistExpanded ? "Hide Library" : "Show Library"}</span>
            {isPlaylistExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Category Pills Navigation */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-3 mb-5 scrollbar-none relative z-10">
          {MUSIC_CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-1 shrink-0 ${
                selectedCategory === cat.key
                  ? 'bg-[var(--accent-primary)] text-white shadow-md'
                  : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border border-[var(--border-gold)]/60 hover:border-[var(--accent-gold)]'
              }`}
            >
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* ============================================================
            2. MAIN PLAYING DECK
        ============================================================ */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-gold)] shadow-md relative z-10 mb-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-5">
            
            {/* Current Song Details & Animated Equalizer */}
            <div className="flex items-center space-x-4 w-full md:w-auto">
              <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 border-[var(--accent-gold)] overflow-hidden shadow-lg shrink-0 relative bg-black flex items-center justify-center ${isPlaying ? 'ring-2 ring-[var(--accent-gold)] ring-offset-2 ring-offset-[var(--bg-primary)]' : ''}`}>
                <img
                  src="/assets/real_photos/couple_common.jpg"
                  alt="Song Cover"
                  className={`w-full h-full object-cover object-top ${isPlaying ? 'scale-105' : 'scale-100'} transition-transform duration-500`}
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <Music className={`w-6 h-6 text-white ${isPlaying ? 'animate-bounce' : ''}`} />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[var(--badge-bg)] text-[10px] font-bold text-[var(--accent-primary)] border border-[var(--badge-border)]">
                    {currentTrack.category}
                  </span>
                  {isPlaying && (
                    <span className="flex items-center space-x-1 text-[10px] text-emerald-500 font-bold">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                      <span>Playing Live</span>
                    </span>
                  )}
                </div>

                <h4 className="font-serif text-lg sm:text-xl font-extrabold text-[var(--text-primary)] truncate mt-1">
                  {currentTrack.title}
                </h4>
                <p className="text-xs text-[var(--text-secondary)] font-sans truncate">
                  {currentTrack.artist} • <span className="text-[var(--accent-gold)] font-medium">{currentTrack.tag}</span>
                </p>
              </div>
            </div>

            {/* Playback Controls & Shuffle / Repeat */}
            <div className="flex items-center space-x-3 sm:space-x-4 shrink-0">
              
              {/* Shuffle Toggle */}
              <button
                onClick={onToggleShuffle}
                className={`p-2.5 rounded-full border transition-all shadow-sm ${
                  isShuffle
                    ? 'bg-[var(--accent-gold)] text-white border-[var(--accent-gold)]'
                    : 'bg-[var(--bg-elevated)] text-[var(--text-muted)] border-[var(--border-gold)] hover:text-[var(--text-primary)]'
                }`}
                title={isShuffle ? "Shuffle On" : "Shuffle Off"}
              >
                <Shuffle className="w-4 h-4" />
              </button>

              {/* Previous Track */}
              <button
                onClick={onPlayPrev}
                className="p-3 rounded-full bg-[var(--bg-elevated)] hover:bg-[var(--bg-card)] text-[var(--text-primary)] border border-[var(--border-gold)] hover:border-[var(--accent-gold)] transition-all shadow-md active:scale-95"
                title="Previous Track"
              >
                <SkipBack className="w-5 h-5 fill-current" />
              </button>

              {/* Play / Pause Main Button */}
              <button
                onClick={onTogglePlay}
                className="w-14 h-14 rounded-full bg-gradient-to-r from-[var(--accent-gold)] to-[#AA7C11] text-white flex items-center justify-center font-bold shadow-xl hover:scale-105 active:scale-95 transition-all"
                title={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 fill-current" />
                ) : (
                  <Play className="w-6 h-6 fill-current ml-0.5" />
                )}
              </button>

              {/* Next Track */}
              <button
                onClick={onPlayNext}
                className="p-3 rounded-full bg-[var(--bg-elevated)] hover:bg-[var(--bg-card)] text-[var(--text-primary)] border border-[var(--border-gold)] hover:border-[var(--accent-gold)] transition-all shadow-md active:scale-95"
                title="Next Track"
              >
                <SkipForward className="w-5 h-5 fill-current" />
              </button>

              {/* Repeat Toggle */}
              <button
                onClick={onToggleRepeat}
                className={`p-2.5 rounded-full border transition-all shadow-sm ${
                  repeatMode !== 'off'
                    ? 'bg-[var(--accent-gold)] text-white border-[var(--accent-gold)]'
                    : 'bg-[var(--bg-elevated)] text-[var(--text-muted)] border-[var(--border-gold)] hover:text-[var(--text-primary)]'
                }`}
                title={`Repeat: ${repeatMode}`}
              >
                {repeatMode === 'one' ? <Repeat1 className="w-4 h-4" /> : <Repeat className="w-4 h-4" />}
              </button>

            </div>

          </div>

          {/* Progress Bar with Seek Capability */}
          <div className="mt-5 pt-3 border-t border-[var(--border-gold)]/50">
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
                  onChange={(e) => onSeek(parseFloat(e.target.value))}
                  className="w-full h-2 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-gold)] appearance-none cursor-pointer accent-[var(--accent-gold)] focus:outline-none"
                />
              </div>

              <span className="text-[11px] text-[var(--text-muted)] font-mono w-10">
                {duration > 0 ? formatTime(duration) : currentTrack.durationEst}
              </span>

              {/* Volume Slider & Mute Toggle */}
              <div className="hidden sm:flex items-center space-x-2 pl-3 border-l border-[var(--border-gold)]">
                <button
                  onClick={onToggleMute}
                  className="p-1 rounded-full text-[var(--text-muted)] hover:text-[var(--accent-gold)] transition-colors"
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
                  onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                  className="w-20 h-1.5 rounded-lg bg-[var(--bg-elevated)] appearance-none cursor-pointer accent-[var(--accent-gold)]"
                />
              </div>
            </div>
          </div>

        </div>

        {/* ============================================================
            3. EXPANDABLE 5-SONG PLAYLIST LIBRARY
        ============================================================ */}
        {isPlaylistExpanded && (
          <div className="space-y-2.5 animate-fadeIn relative z-10">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider">
                Select from {filteredPlaylist.length} Songs:
              </span>
              <span className="text-[11px] text-[var(--text-muted)]">
                Auto-plays continuously • 100% Real Audio
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {filteredPlaylist.map((track) => {
                const originalIndex = playlist.findIndex((p) => p.id === track.id);
                const isSelected = originalIndex === currentTrackIndex;

                return (
                  <button
                    key={track.id}
                    onClick={() => onSelectTrack(originalIndex)}
                    className={`p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between group ${
                      isSelected
                        ? 'border-[var(--accent-gold)] bg-[var(--badge-bg)] ring-1 ring-[var(--accent-gold)] shadow-md'
                        : 'border-[var(--border-gold)] bg-[var(--bg-surface)] hover:border-[var(--accent-gold)] hover:bg-[var(--bg-elevated)]'
                    }`}
                  >
                    <div className="flex items-center space-x-3 min-w-0">
                      {/* Track Number / Play Icon */}
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 shadow-sm ${
                        isSelected
                          ? 'bg-[var(--accent-gold)] text-white'
                          : 'bg-[var(--bg-elevated)] text-[var(--text-primary)] border border-[var(--border-gold)]'
                      }`}>
                        {isSelected && isPlaying ? (
                          <span className="animate-pulse text-base">🎵</span>
                        ) : (
                          <span>{originalIndex + 1}</span>
                        )}
                      </div>

                      {/* Info */}
                      <div className="min-w-0">
                        <div className="flex items-center space-x-2">
                          <h5 className="font-serif text-sm font-bold text-[var(--text-primary)] truncate">
                            {track.title}
                          </h5>
                        </div>
                        <p className="text-[11px] text-[var(--text-muted)] font-sans truncate">
                          {track.artist}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 shrink-0 ml-2">
                      <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-gold)] text-[var(--accent-primary)] font-semibold">
                        {track.category.split(' ')[0]}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
