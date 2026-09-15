import React, { useState, useEffect, useRef } from 'react';
import { Clock, Sparkles } from 'lucide-react';
import { useCelebration } from '../hooks/useCelebration';

export default function Countdown({ targetDateStr = '2026-11-20T23:59:00+05:30', label }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isCompleted, setIsCompleted] = useState(false);
  const hasTriggeredRef = useRef(false);

  const { triggerSkyshots, triggerCelebration } = useCelebration();

  useEffect(() => {
    const targetDate = new Date(targetDateStr).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
        setIsCompleted(false);
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsCompleted(true);

        // Prevent infinite re-triggering using hasTriggeredRef
        if (!hasTriggeredRef.current) {
          hasTriggeredRef.current = true;
          const fireSkyshot = typeof triggerSkyshots === 'function' ? triggerSkyshots : triggerCelebration;
          if (typeof fireSkyshot === 'function') {
            fireSkyshot();                              // 1st burst immediately
            setTimeout(() => fireSkyshot(), 4000);      // 2nd burst after 4s
          }
        }
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [targetDateStr, triggerSkyshots, triggerCelebration]);

  const handleTestSkyshots = () => {
    if (typeof triggerSkyshots === 'function') {
      triggerSkyshots();
    } else if (typeof triggerCelebration === 'function') {
      triggerCelebration();
    }
  };

  return (
    <div className="w-full max-w-5xl glass-wedding-card rounded-3xl p-6 border border-[var(--border-gold)] shadow-xl my-6">
      {/* Header Row */}
      <div className="flex items-center justify-center space-x-2 text-[var(--text-primary)] mb-4">
        <Clock className="w-5 h-5 text-[var(--accent-gold)]" />
        <h3 className="font-serif text-base sm:text-lg font-bold tracking-wide">
          {label || "Countdown to Grand Vivah — 20 November 2026 (11:59 PM)"}
        </h3>
      </div>

      {/* Countdown Digits OR Celebration Banner */}
      {isCompleted ? (
        <div className="py-8 px-6 rounded-2xl bg-[var(--bg-elevated)] border-2 border-[var(--accent-gold)] shadow-2xl animate-bounce text-center">
          <div className="text-2xl sm:text-4xl font-serif font-extrabold text-[var(--accent-gold)] tracking-wide">
            🎉 The Auspicious Day is Here! Shubhaarambh! ✨
          </div>
          <p className="text-sm sm:text-lg font-hindi text-[var(--text-primary)] mt-3 font-bold">
            नवीन एवं मनीषा के शुभ विवाह का मंगलमयी समय आ गया है!
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-4 gap-3 sm:gap-6">
            <div className="bg-[var(--bg-elevated)] rounded-2xl p-3 sm:p-4 border border-[var(--border-gold)] flex flex-col items-center shadow-sm">
              <span className="font-serif text-2xl sm:text-4xl font-extrabold text-[var(--accent-primary)]">
                {timeLeft.days}
              </span>
              <span className="text-[10px] sm:text-xs text-[var(--text-muted)] uppercase tracking-widest mt-1">Days</span>
            </div>

            <div className="bg-[var(--bg-elevated)] rounded-2xl p-3 sm:p-4 border border-[var(--border-gold)] flex flex-col items-center shadow-sm">
              <span className="font-serif text-2xl sm:text-4xl font-extrabold text-[var(--accent-primary)]">
                {timeLeft.hours}
              </span>
              <span className="text-[10px] sm:text-xs text-[var(--text-muted)] uppercase tracking-widest mt-1">Hours</span>
            </div>

            <div className="bg-[var(--bg-elevated)] rounded-2xl p-3 sm:p-4 border border-[var(--border-gold)] flex flex-col items-center shadow-sm">
              <span className="font-serif text-2xl sm:text-4xl font-extrabold text-[var(--accent-primary)]">
                {timeLeft.minutes}
              </span>
              <span className="text-[10px] sm:text-xs text-[var(--text-muted)] uppercase tracking-widest mt-1">Mins</span>
            </div>

            <div className="bg-[var(--bg-elevated)] rounded-2xl p-3 sm:p-4 border border-[var(--border-gold)] flex flex-col items-center shadow-sm">
              <span className="font-serif text-2xl sm:text-4xl font-extrabold text-[var(--accent-gold)] animate-pulse">
                {timeLeft.seconds}
              </span>
              <span className="text-[10px] sm:text-xs text-[var(--text-muted)] uppercase tracking-widest mt-1">Secs</span>
            </div>
          </div>

          {/* Discreet Test Skyshots Button (Only beneath the timer numbers) */}
          <div className="mt-4 flex justify-center">
            <button
              onClick={handleTestSkyshots}
              className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/30 text-white text-xs font-semibold backdrop-blur-sm transition-all shadow-sm flex items-center space-x-1.5 cursor-pointer"
              title="Test Pure Bright White Commercial Skyshots Fireworks Animation"
            >
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>🎉 Test Skyshots</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
