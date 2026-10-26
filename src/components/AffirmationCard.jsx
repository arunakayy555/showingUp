import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { AFFIRMATIONS, getDailyAffirmationIndex } from '../data/affirmations';
import { getTodayKey } from '../utils/storage';

export function AffirmationCard() {
  const todayKey = getTodayKey();
  const dailyIdx = getDailyAffirmationIndex(todayKey);

  const [currentIndex, setCurrentIndex] = useState(dailyIdx);
  const [isRotating, setIsRotating] = useState(false);
  const [fadeState, setFadeState] = useState('opacity-100 scale-100');

  useEffect(() => {
    setCurrentIndex(dailyIdx);
  }, [todayKey, dailyIdx]);

  const handleNextAffirmation = () => {
    setIsRotating(true);
    setFadeState('opacity-0 scale-95');

    // Cute little gentle petal sparkle when clicking reminder
    confetti({
      particleCount: 15,
      spread: 45,
      origin: { y: 0.35, x: 0.8 },
      colors: ['#ffcad7', '#ffd8e2', '#e85577', '#f4e5bf'],
      scalar: 0.8,
      gravity: 0.6,
      disableForReducedMotion: true,
    });

    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % AFFIRMATIONS.length);
      setFadeState('opacity-100 scale-100');
      setIsRotating(false);
    }, 180);
  };

  const currentAffirmation = AFFIRMATIONS[currentIndex] || AFFIRMATIONS[0];
  const isDailyDefault = currentIndex === dailyIdx;

  return (
    <section 
      aria-label="A reminder to myself"
      className="relative overflow-hidden rounded-4xl p-7 sm:p-9 cute-card border-2 shadow-lg"
      style={{
        backgroundColor: 'var(--bg-card)',
        borderColor: 'var(--border-color)',
      }}
    >
      {/* Pretty floral stationery props in the background */}
      <div 
        className="pointer-events-none absolute -right-8 -top-8 h-44 w-44 rounded-full opacity-60 blur-2xl animate-glow"
        style={{ backgroundColor: 'var(--accent)' }}
        aria-hidden="true"
      />
      <div 
        className="pointer-events-none absolute -left-8 -bottom-8 h-40 w-40 rounded-full opacity-40 blur-2xl animate-glow"
        style={{ backgroundColor: 'var(--bg-badge)' }}
        aria-hidden="true"
      />

      {/* Decorative corner floral props */}
      <div className="pointer-events-none absolute top-3 right-4 text-2xl opacity-40 select-none">
        🌸
      </div>
      <div className="pointer-events-none absolute bottom-3 left-4 text-xl opacity-35 select-none">
        🌿
      </div>

      <div className="relative z-10 flex flex-col justify-between gap-5">
        {/* Header row with Romantic script styling */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span 
              className="flex h-9 w-9 items-center justify-center rounded-2xl text-base font-bold shadow-xs border"
              style={{
                backgroundColor: 'var(--bg-badge)',
                borderColor: 'var(--border-color)',
                color: 'var(--accent)',
              }}
            >
              🌸
            </span>
            <h2 
              className="font-romantic text-3xl sm:text-4xl tracking-wide font-normal"
              style={{ color: 'var(--accent)' }}
            >
              A reminder to myself
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {isDailyDefault && (
              <span 
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-macaron font-bold shadow-xs border"
                style={{
                  backgroundColor: 'var(--bg-subtle)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-main)',
                }}
              >
                <span>⭐ Daily Anchor</span>
              </span>
            )}
            <span 
              className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-macaron font-extrabold shadow-xs"
              style={{
                backgroundColor: 'var(--bg-badge)',
                color: 'var(--accent)',
              }}
            >
              <span>୨ৎ</span>
              <span>{currentAffirmation.category}</span>
            </span>
          </div>
        </div>

        {/* Affirmation Text in Large, Breathtaking Parisienne Script */}
        <div className={`transition-all duration-300 ease-out ${fadeState} min-h-[5.5rem] flex items-center py-2`}>
          <blockquote 
            className="font-romantic text-3xl sm:text-4xl md:text-[42px] leading-[1.35] sm:leading-[1.4] font-normal tracking-wide"
            style={{ color: 'var(--text-main)' }}
          >
            “{currentAffirmation.text}”
          </blockquote>
        </div>

        {/* Card Footer with Pretty Floral Divider */}
        <div 
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t-2"
          style={{ borderColor: 'var(--border-color)' }}
        >
          <p className="font-gelato text-xs sm:text-sm font-semibold flex items-center gap-1.5" style={{ color: 'var(--text-muted)' }}>
            <span>Grounded care</span>
            <span>•</span>
            <span>Consistency over perfection</span>
            <span>🎻</span>
          </p>

          <button
            onClick={handleNextAffirmation}
            className="group inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-macaron font-extrabold cute-btn border-2 shadow-xs"
            style={{
              backgroundColor: 'var(--bg-subtle)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-main)',
            }}
            title="Read another gentle reminder"
          >
            <Sparkles 
              className={`h-4 w-4 transition-transform duration-300 ${
                isRotating ? 'rotate-180 scale-125' : 'group-hover:rotate-12'
              }`}
              style={{ color: 'var(--accent)' }}
            />
            <span>A little reminder ✨</span>
          </button>
        </div>
      </div>
    </section>
  );
}
