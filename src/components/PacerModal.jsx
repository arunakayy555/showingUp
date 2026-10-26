import React, { useState, useEffect } from 'react';
import { X, Play, Pause, RotateCcw, Check } from 'lucide-react';
import { playSoftTick } from '../utils/audio';

export function PacerModal({ exercise, isOpen, onClose, onCompleteExercise, soundEnabled = true }) {
  if (!isOpen || !exercise) return null;

  const totalReps = exercise.reps || 10;
  const [currentRep, setCurrentRep] = useState(1);
  const [isRunning, setIsRunning] = useState(false);
  const [phase, setPhase] = useState('prepare'); // 'prepare', 'move', 'hold', 'return', 'done'
  const [holdCountdown, setHoldCountdown] = useState(exercise.holdDurationSeconds || 1);

  const hasHold = exercise.hasHold;
  const holdSeconds = exercise.holdDurationSeconds || 1;

  useEffect(() => {
    let timer;
    if (isRunning) {
      if (phase === 'prepare') {
        timer = setTimeout(() => {
          setPhase('move');
        }, 1000);
      } else if (phase === 'move') {
        timer = setTimeout(() => {
          if (hasHold) {
            setPhase('hold');
            setHoldCountdown(holdSeconds);
            if (soundEnabled) playSoftTick(true);
          } else {
            setPhase('return');
          }
        }, 1500);
      } else if (phase === 'hold') {
        timer = setTimeout(() => {
          setPhase('return');
        }, holdSeconds * 1000);
      } else if (phase === 'return') {
        timer = setTimeout(() => {
          if (currentRep < totalReps) {
            setCurrentRep((r) => r + 1);
            setPhase('move');
            if (soundEnabled) playSoftTick(true);
          } else {
            setIsRunning(false);
            setPhase('done');
          }
        }, 1500);
      }
    }
    return () => clearTimeout(timer);
  }, [isRunning, phase, currentRep, totalReps, hasHold, holdSeconds, soundEnabled]);

  const resetPacer = () => {
    setIsRunning(false);
    setCurrentRep(1);
    setPhase('prepare');
    setHoldCountdown(holdSeconds);
  };

  const handleFinish = () => {
    onCompleteExercise(exercise.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs animate-fade-in">
      <div 
        className="relative w-full max-w-sm rounded-4xl p-7 shadow-2xl text-center cute-card border-2"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--border-color)',
          color: 'var(--text-main)',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 cute-btn border"
          style={{ backgroundColor: 'var(--bg-subtle)', borderColor: 'var(--border-color)' }}
          aria-label="Close pacer"
        >
          <X className="h-4 w-4" />
        </button>

        <span 
          className="font-macaron inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-wider mb-2 border shadow-xs"
          style={{
            backgroundColor: 'var(--bg-badge)',
            borderColor: 'var(--border-color)',
            color: 'var(--accent)',
          }}
        >
          <span>🌸</span>
          <span>Gentle Cadence Pacer</span>
        </span>

        <h3 className="font-macaron text-xl sm:text-2xl font-bold mb-1" style={{ color: 'var(--text-main)' }}>
          {exercise.name}
        </h3>

        <p className="font-gelato text-xs sm:text-sm font-semibold mb-6 px-2" style={{ color: 'var(--text-muted)' }}>
          {exercise.instruction}
        </p>

        {/* Cute visual pulse circle */}
        <div className="relative mx-auto my-3 flex h-48 w-48 items-center justify-center">
          <div
            className={`absolute inset-0 rounded-full transition-all duration-700 ${
              phase === 'hold'
                ? 'scale-110 shadow-xl'
                : phase === 'move'
                ? 'scale-105 shadow-md'
                : 'scale-95 shadow-xs'
            }`}
            style={{
              backgroundColor: phase === 'hold' ? 'var(--bg-badge)' : 'var(--bg-subtle)',
              borderColor: 'var(--accent)',
              borderWidth: phase === 'hold' ? '3px' : '2px',
            }}
          />
          <div className="relative z-10 flex flex-col items-center font-macaron">
            {phase === 'done' ? (
              <div className="flex flex-col items-center">
                <span className="text-4xl mb-1">💐</span>
                <span className="text-base font-bold" style={{ color: 'var(--accent)' }}>
                  Set Complete!
                </span>
              </div>
            ) : (
              <>
                <span className="text-5xl font-extrabold" style={{ color: 'var(--text-main)' }}>
                  {currentRep} <span className="font-gelato text-lg font-bold opacity-40">/ {totalReps}</span>
                </span>
                <span 
                  className="font-gelato mt-2 text-xs sm:text-sm font-bold tracking-wide uppercase rounded-full px-3 py-0.5 border shadow-xs"
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--accent)',
                  }}
                >
                  {phase === 'prepare' && 'Get Ready ✨'}
                  {phase === 'move' && 'Smooth Movement 🍃'}
                  {phase === 'hold' && 'Hold 1s ⏱️'}
                  {phase === 'return' && 'Gentle Return 🌸'}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="mt-6 flex items-center justify-center gap-3 font-macaron">
          <button
            onClick={resetPacer}
            className="rounded-full p-3 cute-btn border-2"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-main)',
            }}
            title="Reset to rep 1"
          >
            <RotateCcw className="h-4 w-4" />
          </button>

          {phase === 'done' ? (
            <button
              onClick={handleFinish}
              className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-bold text-white shadow-md cute-btn"
              style={{ backgroundColor: 'var(--accent)' }}
            >
              <Check className="h-4 w-4 stroke-[3]" />
              <span>Mark as completed 🌸</span>
            </button>
          ) : (
            <button
              onClick={() => setIsRunning(!isRunning)}
              className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-bold text-white shadow-md cute-btn"
              style={{ backgroundColor: 'var(--accent)' }}
            >
              {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              <span>{isRunning ? 'Pause' : 'Start Cadence 🌸'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
