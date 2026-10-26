import React from 'react';
import { RotateCcw, ShieldCheck } from 'lucide-react';
import { ExerciseItem } from './ExerciseItem';

export function ExerciseList({
  exercises,
  todayRecord,
  onToggleFull,
  onToggleSet,
  onResetToday,
  onOpenPacer,
}) {
  const items = todayRecord.items || {};
  const totalCount = exercises.length;
  const completedCount = exercises.filter((ex) => items[ex.id]?.isFullyDone).length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const isAllComplete = completedCount === totalCount && totalCount > 0;

  // Pretty floral encouragement based on progress
  const getCuteProgressStatus = () => {
    if (isAllComplete) return 'Full garden in bloom! So proud of you 🌸💐';
    if (completedCount === 0) return 'Ready whenever you are 🌱';
    if (completedCount === 1) return 'The first sprout has bloomed 🌿';
    if (completedCount === 2) return 'Budding beautifully 🌷';
    if (completedCount === 3) return 'Petals opening wide 🌸';
    if (completedCount === 4) return 'Almost in full blossom 💖';
    return `${totalCount - completedCount} remaining`;
  };

  return (
    <section aria-label="My Exercises" className="space-y-5">
      {/* Section Header & Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-3">
        <div>
          <div className="flex items-center gap-3">
            <span 
              className="flex h-8 w-8 items-center justify-center rounded-2xl text-lg font-bold border"
              style={{
                backgroundColor: 'var(--bg-badge)',
                borderColor: 'var(--border-color)',
                color: 'var(--accent)',
              }}
            >
              🌿
            </span>
            <h2 
              className="font-romantic text-3xl sm:text-4xl md:text-5xl tracking-normal font-normal leading-tight" 
              style={{ color: 'var(--text-main)' }}
            >
              My Exercises
            </h2>
          </div>
          <p className="font-gelato mt-1 text-xs sm:text-sm font-semibold tracking-wide" style={{ color: 'var(--text-muted)' }}>
            Prescribed strengthening routine • Take your sweet time ✨
          </p>
        </div>

        {/* Progress indicator with Bodoni Macaron & Gelato font */}
        <div className="flex items-center gap-3.5">
          <div className="flex flex-col items-end">
            <span className="font-macaron text-sm sm:text-base font-bold tracking-tight" style={{ color: 'var(--text-main)' }}>
              {completedCount} of {totalCount} completed
            </span>
            <span className="font-gelato text-xs font-bold" style={{ color: 'var(--accent)' }}>
              {getCuteProgressStatus()}
            </span>
          </div>

          {/* Calming circular progress mini ring */}
          <div className="relative flex h-12 w-12 items-center justify-center">
            <svg className="h-12 w-12 -rotate-90 transform" viewBox="0 0 36 36">
              <path
                strokeWidth="3.5"
                stroke="var(--border-color)"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="transition-all duration-500 ease-out"
                strokeDasharray={`${progressPercent}, 100`}
                strokeWidth="4"
                strokeLinecap="round"
                stroke="var(--accent)"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="font-macaron absolute text-xs sm:text-sm font-extrabold" style={{ color: 'var(--text-main)' }}>
              {progressPercent}%
            </span>
          </div>
        </div>
      </div>

      {/* Pretty Floral Progress Bar with Bloom checkpoints */}
      <div className="space-y-1.5">
        <div 
          className="relative h-3 w-full overflow-hidden rounded-full p-0.5 border-2 shadow-xs"
          style={{
            backgroundColor: 'var(--bg-subtle)',
            borderColor: 'var(--border-color)',
          }}
        >
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${progressPercent}%`,
              backgroundColor: 'var(--accent)',
              boxShadow: '0 0 12px var(--ring-color)',
            }}
          />
        </div>
        <div className="font-gelato flex justify-between text-[11px] font-bold px-1" style={{ color: 'var(--text-muted)' }}>
          <span>🌱 Sprout</span>
          <span>🌷 Bloom</span>
          <span>💐 Garden</span>
        </div>
      </div>

      {/* Exercises Checklist */}
      <div className="space-y-3">
        {exercises.map((exercise) => {
          const itemState = items[exercise.id] || {
            completedSets: 0,
            isFullyDone: false,
            completedAt: null,
            setTimes: [],
          };

          return (
            <ExerciseItem
              key={exercise.id}
              exercise={exercise}
              itemState={itemState}
              onToggleFull={onToggleFull}
              onToggleSet={onToggleSet}
              onOpenPacer={onOpenPacer}
            />
          );
        })}
      </div>

      {/* Section Footer: Quiet Reset & Prescription note */}
      <div 
        className="font-gelato pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs sm:text-sm"
        style={{ color: 'var(--text-muted)' }}
      >
        <div className="flex items-center gap-2 font-semibold">
          <ShieldCheck className="h-4 w-4" style={{ color: 'var(--accent)' }} />
          <span>Strictly follows your physiotherapist's routine.</span>
        </div>

        {completedCount > 0 && (
          <button
            type="button"
            onClick={onResetToday}
            className="font-macaron self-start sm:self-auto inline-flex items-center gap-1.5 font-bold cute-btn hover:opacity-80"
            title="Reset today's checklist without deleting history"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset today's checklist</span>
          </button>
        )}
      </div>
    </section>
  );
}
