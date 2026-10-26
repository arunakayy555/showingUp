import React from 'react';

export function FloralProps({ enabled = true }) {
  if (!enabled) return null;

  // Floating petals with different positions, sizes, and delays
  const petals = [
    { left: '8%', delay: '0s', duration: '14s', size: '1.4rem', emoji: '🌸' },
    { left: '22%', delay: '4s', duration: '18s', size: '1.1rem', emoji: '🪻' },
    { left: '38%', delay: '1s', duration: '16s', size: '1.3rem', emoji: '✨' },
    { left: '55%', delay: '7s', duration: '15s', size: '1.2rem', emoji: '🌸' },
    { left: '72%', delay: '2.5s', duration: '17s', size: '1.3rem', emoji: '🌼' },
    { left: '88%', delay: '5s', duration: '13s', size: '1.1rem', emoji: '🍃' },
  ];

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0" aria-hidden="true">
      {/* Delicate floating petals */}
      {petals.map((petal, i) => (
        <span
          key={i}
          className="absolute select-none opacity-60 animate-petal-drift"
          style={{
            left: petal.left,
            top: '-40px',
            animationDelay: petal.delay,
            animationDuration: petal.duration,
            fontSize: petal.size,
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.06))',
          }}
        >
          {petal.emoji}
        </span>
      ))}

      {/* Pretty floral corner sprigs */}
      <div 
        className="absolute -top-10 -left-10 w-48 h-48 opacity-25 blur-sm rounded-full"
        style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)' }}
      />
      <div 
        className="absolute top-1/3 -right-16 w-56 h-56 opacity-20 blur-sm rounded-full"
        style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)' }}
      />
    </div>
  );
}
