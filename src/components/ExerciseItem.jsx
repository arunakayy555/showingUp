import React from 'react';
import { RotateCcw, Timer, Sparkles } from 'lucide-react';
import { formatTime } from '../utils/storage';

export function ExerciseItem({
  exercise,
  itemState = { completedSets: 0, isFullyDone: false, completedAt: null, setTimes: [] },
  onToggleFull,
  onToggleSet,
  onOpenPacer,
}) {
  const { id, name, sets, reps, hasHold, instruction } = exercise;
  const isDone = itemState.isFullyDone;
  const completedSets = itemState.completedSets || 0;

  return (
    <article
      className={`group relative rounded-3xl p-5 sm:p-6 border-2 transition-all duration-200 cute-card ${
        isDone ? 'opacity-95' : ''
      }`}
      style={{
        backgroundColor: isDone ? 'var(--bg-subtle)' : 'var(--bg-card)',
        borderColor: isDone ? 'var(--accent)' : 'var(--border-color)',
      }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Left: Check control and exercise title */}
        <div className="flex items-start gap-4 flex-1 min-w-0">
          
          {/* Main completion button (Cute rounded bubble checkbox) */}
          <button
            type="button"
            onClick={() => onToggleFull(id)}
            aria-label={isDone ? `Mark ${name} as incomplete` : `Mark ${name} as complete`}
            className={`mt-0.5 relative flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-2xl border-2 transition-all duration-200 cute-btn shadow-xs ${
              isDone
                ? 'scale-105'
                : 'hover:scale-105'
            }`}
            style={{
              backgroundColor: isDone ? 'var(--accent)' : 'var(--bg-card)',
              borderColor: isDone ? 'var(--accent)' : 'var(--border-color)',
              color: 'var(--accent-text)',
            }}
          >
            {isDone ? (
              <span className="text-base select-none">🌸</span>
            ) : (
              <span className="text-sm select-none opacity-40">🌱</span>
            )}
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2.5">
              <h3
                className={`font-macaron text-lg sm:text-xl font-bold tracking-tight transition-colors ${
                  isDone ? 'line-through opacity-75' : ''
                }`}
                style={{ color: 'var(--text-main)' }}
              >
                {name}
              </h3>

              {/* Prescribed sets x reps badge */}
              <span
                className="font-gelato inline-flex items-center rounded-full px-3 py-0.5 text-xs sm:text-sm font-bold tracking-wider shadow-xs border"
                style={{
                  backgroundColor: 'var(--bg-badge)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--accent)',
                }}
              >
                {sets} × {reps}
              </span>

              {hasHold && (
                <span 
                  className="font-gelato inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold border"
                  style={{
                    backgroundColor: 'var(--bg-subtle)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-muted)',
                  }}
                >
                  ⏱️ Hold 1s
                </span>
              )}
            </div>

            {/* Instruction with typewriter romantic font */}
            {instruction && (
              <p 
                className="font-gelato mt-1.5 text-xs sm:text-sm leading-relaxed max-w-xl font-medium"
                style={{ color: 'var(--text-muted)' }}
              >
                {instruction}
              </p>
            )}

            {/* Completion timestamp if completed */}
            {isDone && itemState.completedAt && (
              <div 
                className="font-gelato mt-2 flex items-center gap-1.5 text-xs sm:text-sm font-bold tracking-wide"
                style={{ color: 'var(--accent)' }}
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>Bloomed at {formatTime(itemState.completedAt)} 🌸</span>
              </div>
            )}
          </div>
        </div>

        {/* Right side: Separate Sets tracking for 2-set exercises + Action buttons */}
        <div className="flex items-center flex-wrap sm:flex-nowrap gap-2.5 sm:self-center pl-13 sm:pl-0 font-macaron">
          
          {/* If exercise has 2 sets, allow tracking Set 1 and Set 2 individually */}
          {sets === 2 && (
            <div 
              className="flex items-center gap-1.5 p-1.5 rounded-2xl border-2"
              style={{
                backgroundColor: 'var(--bg-subtle)',
                borderColor: 'var(--border-color)',
              }}
            >
              {[1, 2].map((setNum) => {
                const isSetDone = completedSets >= setNum;
                return (
                  <button
                    key={setNum}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleSet(id, setNum);
                    }}
                    className="inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs sm:text-sm font-bold transition-all cute-btn"
                    style={{
                      backgroundColor: isSetDone ? 'var(--accent)' : 'var(--bg-card)',
                      color: isSetDone ? 'var(--accent-text)' : 'var(--text-main)',
                      boxShadow: isSetDone ? '0 2px 8px -1px var(--ring-color)' : 'none',
                    }}
                  >
                    <span>{isSetDone ? '🌸' : '🌱'}</span>
                    <span>Set {setNum}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Gentle pacer / timer button */}
          <button
            type="button"
            onClick={() => onOpenPacer(exercise)}
            className="inline-flex items-center gap-1.5 rounded-full border-2 px-3.5 py-1.5 text-xs sm:text-sm font-bold cute-btn shadow-xs"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-main)',
            }}
            title="Open gentle cadence & 1-second hold pacer"
          >
            <Timer className="h-4 w-4" style={{ color: 'var(--accent)' }} />
            <span className="hidden sm:inline">Pacer</span>
          </button>

          {/* Undo action button when completed */}
          {isDone && (
            <button
              type="button"
              onClick={() => onToggleFull(id)}
              className="inline-flex items-center gap-1 rounded-full p-2 text-xs font-bold cute-btn hover:opacity-80"
              style={{ color: 'var(--text-muted)' }}
              title="Undo completion"
            >
              <RotateCcw className="h-4 w-4" />
              <span className="sr-only sm:not-sr-only text-xs">Undo</span>
            </button>
          )}

        </div>
      </div>
    </article>
  );
}
