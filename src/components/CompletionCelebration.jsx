import React, { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { RotateCcw } from 'lucide-react';
import { formatTime } from '../utils/storage';

export function CompletionCelebration({ completedAt, onUndoAll }) {
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    if (!hasTriggeredRef.current) {
      hasTriggeredRef.current = true;

      // Soft floral confetti petals: blush rose, lavender, peach, buttercup, jasmine white
      const petalColors = ['#ffcad7', '#ffd8e2', '#e85577', '#f4e5bf', '#d4c2f2', '#c1e2ba'];

      // Left petal bloom
      confetti({
        particleCount: 65,
        spread: 80,
        origin: { x: 0.25, y: 0.6 },
        colors: petalColors,
        ticks: 240,
        gravity: 0.6,
        scalar: 1.2,
        disableForReducedMotion: true,
      });

      // Right petal bloom
      confetti({
        particleCount: 65,
        spread: 80,
        origin: { x: 0.75, y: 0.6 },
        colors: petalColors,
        ticks: 240,
        gravity: 0.6,
        scalar: 1.2,
        disableForReducedMotion: true,
      });
    }
  }, []);

  return (
    <div 
      className="relative overflow-hidden rounded-4xl p-8 sm:p-10 text-center cute-card border-2 animate-fade-in shadow-xl"
      style={{
        backgroundColor: 'var(--bg-card)',
        borderColor: 'var(--accent)',
      }}
    >
      {/* Decorative floral background glow & petals */}
      <div 
        className="pointer-events-none absolute -right-6 -top-6 h-48 w-48 rounded-full opacity-50 blur-2xl animate-glow"
        style={{ backgroundColor: 'var(--accent)' }}
        aria-hidden="true"
      />
      <div 
        className="pointer-events-none absolute -left-6 -bottom-6 h-48 w-48 rounded-full opacity-40 blur-2xl animate-glow"
        style={{ backgroundColor: 'var(--bg-badge)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center max-w-xl mx-auto">
        <div 
          className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-3xl text-3xl shadow-md cute-btn animate-bounce-soft border-2"
          style={{
            backgroundColor: 'var(--bg-badge)',
            borderColor: 'var(--border-color)',
            color: 'var(--accent)',
          }}
        >
          💐
        </div>

        <span 
          className="font-macaron inline-flex items-center gap-1.5 rounded-full px-4 py-1 text-xs sm:text-sm font-bold uppercase tracking-wide mb-3 shadow-xs border"
          style={{
            backgroundColor: 'var(--bg-subtle)',
            borderColor: 'var(--border-color)',
            color: 'var(--accent)',
          }}
        >
          <span>🌸 Routine in full blossom! 🌸</span>
        </span>

        {/* The warm completion message in large, breathtaking Parisienne script */}
        <h3 
          className="font-romantic text-3xl sm:text-4xl md:text-5xl leading-tight sm:leading-snug mb-3 font-normal"
          style={{ color: 'var(--text-main)' }}
        >
          “That was five minutes you chose for yourself. Keep showing up, one day at a time.”
        </h3>

        <p className="font-gelato text-sm sm:text-base font-semibold leading-relaxed max-w-lg mb-5" style={{ color: 'var(--text-muted)' }}>
          All 5 exercises finished for today! You took loving care of your body and made space for your future self. 🎻✨
        </p>

        {completedAt && (
          <p className="font-gelato text-xs sm:text-sm font-bold mb-5" style={{ color: 'var(--accent)' }}>
            Completed at {formatTime(completedAt)} 🌸
          </p>
        )}

        <div className="flex items-center gap-2">
          {onUndoAll && (
            <button
              onClick={onUndoAll}
              className="font-macaron inline-flex items-center gap-2 rounded-full border-2 px-5 py-2.5 text-xs sm:text-sm font-bold cute-btn shadow-xs"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-main)',
              }}
            >
              <RotateCcw className="h-4 w-4" />
              <span>Undo accidental tap</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
