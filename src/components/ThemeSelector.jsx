import React from 'react';
import { X, Moon, Check, Flower2 } from 'lucide-react';

export const THEMES = [
  {
    id: 'rose',
    name: 'Rose & Peony Garden',
    emoji: '🌸',
    accentColor: '#e85577',
    bgPreview: '#ffe9ee',
    isDark: false,
    description: 'Lush blush petals & velvet peony pink',
  },
  {
    id: 'lavender',
    name: 'Wisteria & Provence Lavender',
    emoji: '🪻',
    accentColor: '#8b55df',
    bgPreview: '#f0e9fa',
    isDark: false,
    description: 'Dreamy botanical lilac & violet blossoms',
  },
  {
    id: 'wildflower',
    name: 'Wildflower Meadow',
    emoji: '🌼',
    accentColor: '#d98218',
    bgPreview: '#f9f2dd',
    isDark: false,
    description: 'Sunny buttercups, daisies & honey pollen',
  },
  {
    id: 'botanical',
    name: 'Jasmine & Botanical Leaves',
    emoji: '🍵',
    accentColor: '#4d9354',
    bgPreview: '#e9f4e6',
    isDark: false,
    description: 'Sweet jasmine blooms & tender tea leaves',
  },
  {
    id: 'midnight-rose',
    name: 'Midnight Enchanted Rose',
    emoji: '🥀',
    accentColor: '#e26d97',
    bgPreview: '#291c2e',
    isDark: true,
    description: 'Velvet dusky roses & starlight (Dark)',
  },
  {
    id: 'herbarium',
    name: 'Vintage Herbarium',
    emoji: '🪵',
    accentColor: '#de8c59',
    bgPreview: '#2d231d',
    isDark: true,
    description: 'Antique pressed wildflowers & linen (Dark)',
  },
];

export function ThemeSelector({ isOpen, onClose, currentTheme, onSelectTheme }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs animate-fade-in">
      <div 
        className="relative w-full max-w-lg rounded-4xl p-6 md:p-7 shadow-2xl cute-card border-2"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--border-color)',
          color: 'var(--text-main)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b" style={{ borderColor: 'var(--border-color)' }}>
          <div className="flex items-center gap-3">
            <span className="text-3xl animate-bounce-soft">💐</span>
            <div>
              <h2 className="text-2xl font-romantic tracking-wide font-normal" style={{ color: 'var(--text-main)' }}>
                Floral Color & Atmosphere
              </h2>
              <p className="font-gelato text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>
                Pick your botanical aesthetic or cozy midnight rose
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 hover:opacity-75 transition-opacity cute-btn"
            style={{ backgroundColor: 'var(--bg-subtle)' }}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Theme Grid */}
        <div className="grid grid-cols-2 gap-3 my-5">
          {THEMES.map((theme) => {
            const isSelected = currentTheme === theme.id;
            return (
              <button
                key={theme.id}
                onClick={() => {
                  onSelectTheme(theme.id);
                }}
                className={`group relative flex flex-col items-start p-3.5 rounded-3xl border-2 text-left transition-all cute-btn ${
                  isSelected
                    ? 'ring-2 scale-[1.02] shadow-md'
                    : 'hover:scale-[1.01]'
                }`}
                style={{
                  backgroundColor: theme.bgPreview,
                  borderColor: isSelected ? theme.accentColor : 'transparent',
                  ringColor: theme.accentColor,
                  color: theme.isDark ? '#fbf5fc' : '#3d252e',
                }}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="text-2xl filter drop-shadow-xs">{theme.emoji}</span>
                  {isSelected && (
                    <span 
                      className="flex h-5 w-5 items-center justify-center rounded-full text-white text-xs font-bold shadow-xs"
                      style={{ backgroundColor: theme.accentColor }}
                    >
                      <Check className="h-3 w-3 stroke-[3]" />
                    </span>
                  )}
                </div>

                <div className="font-macaron font-bold text-sm tracking-tight">
                  {theme.name}
                </div>

                <span 
                  className="font-gelato text-[11px] mt-0.5 opacity-85 font-medium line-clamp-1"
                >
                  {theme.description}
                </span>

                {/* Pill for Dark Mode badge */}
                {theme.isDark && (
                  <span className="font-gelato mt-1.5 inline-flex items-center gap-1 rounded-full px-2 py-0.5 bg-black/40 text-[10px] font-bold text-white/95">
                    <Moon className="h-2.5 w-2.5" /> Dark Garden
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="font-gelato pt-2 flex items-center justify-between text-xs" style={{ color: 'var(--text-muted)' }}>
          <span className="flex items-center gap-1.5 font-bold">
            <Flower2 className="h-4 w-4" style={{ color: 'var(--accent)' }} />
            Fresh botanical updates apply instantly ✨
          </span>
          <button
            onClick={onClose}
            className="font-macaron rounded-full px-6 py-2 text-xs font-bold text-white shadow-xs cute-btn"
            style={{ backgroundColor: 'var(--accent)' }}
          >
            Bloom 🌸
          </button>
        </div>
      </div>
    </div>
  );
}
