import React from 'react';
import { Sparkles } from 'lucide-react';
import { useCelebration } from '../hooks/useCelebration';

/**
 * Subtle Floating Celebrate Button ("🎉 Celebrate with Us")
 * Positioned in bottom-right/left corner so guests can manually trigger
 * the full-screen Disney+ Hotstar style Skyshot Fireworks animation anytime.
 */
export default function FloatingCelebrateButton() {
  const { triggerCelebration, isCelebrating } = useCelebration();

  return (
    <div className="fixed bottom-6 left-6 z-[9990] flex items-center">
      <button
        onClick={triggerCelebration}
        disabled={isCelebrating}
        className="group relative px-4 py-2.5 rounded-full bg-gradient-to-r from-[var(--accent-gold)] via-amber-500 to-rose-500 text-white font-serif font-extrabold text-xs shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center space-x-2 border border-amber-200/50 backdrop-blur-md cursor-pointer disabled:opacity-75"
        title="Trigger Disney+ Hotstar style Skyshot Celebration"
      >
        <Sparkles className="w-4 h-4 text-amber-100 group-hover:rotate-45 transition-transform duration-300" />
        <span className="tracking-wide">🎉 Celebrate with Us</span>

        {/* Ambient Ring Glow */}
        <span className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-amber-400 to-rose-400 opacity-40 blur-sm group-hover:opacity-80 transition duration-500 pointer-events-none -z-10" />
      </button>
    </div>
  );
}
