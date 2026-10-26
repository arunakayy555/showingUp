import React from 'react';
import { Clock, Settings, Volume2, VolumeX, History, Moon, Sun, Palette, Flower2 } from 'lucide-react';
import { THEMES } from './ThemeSelector';

export function Header({
  todayReliefCount = 0,
  currentTheme = 'rose',
  onOpenThemeModal,
  onToggleDarkMode,
  onOpenReliefModal,
  onOpenHistoryModal,
  onOpenSettingsModal,
  soundEnabled,
  onToggleSound,
}) {
  const now = new Date();
  const dateFormatted = now.toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  const activeThemeObj = THEMES.find((t) => t.id === currentTheme) || THEMES[0];
  const isDark = activeThemeObj.isDark;

  return (
    <header className="mb-8 pt-4 pb-3 border-b-2" style={{ borderColor: 'var(--border-color)' }}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
        
        {/* Brand with Large Luscious Romantic Calligraphy Parisienne */}
        <div>
          <div className="flex items-center gap-3.5">
            <span 
              className="flex h-12 w-12 items-center justify-center rounded-3xl text-3xl shadow-sm cute-btn border"
              style={{
                backgroundColor: 'var(--bg-subtle)',
                borderColor: 'var(--border-color)',
              }}
            >
              {activeThemeObj.emoji}
            </span>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h1 
                  className="font-romantic text-4xl sm:text-5xl md:text-6xl tracking-normal font-normal leading-tight"
                  style={{ color: 'var(--text-main)' }}
                >
                  Showing Up Club
                </h1>
              </div>
              <p className="font-gelato text-xs sm:text-sm font-semibold -mt-1 tracking-wider flex items-center gap-1.5" style={{ color: 'var(--text-muted)' }}>
                <span>{dateFormatted}</span>
                <span>•</span>
                <span className="italic">5 gentle minutes for your future self</span>
                <span>🎻🌸</span>
              </p>
            </div>
          </div>
        </div>

        {/* Quick action controls */}
        <div className="flex items-center flex-wrap gap-2.5 font-macaron">
          
          {/* Floral Theme Switcher */}
          <button
            type="button"
            onClick={onOpenThemeModal}
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold tracking-wide cute-btn border-2 shadow-xs"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-main)',
            }}
            title="Choose a floral theme"
          >
            <Flower2 className="h-4 w-4" style={{ color: 'var(--accent)' }} />
            <span>{activeThemeObj.name.split(' ')[0]}</span>
            <span className="text-sm">{activeThemeObj.emoji}</span>
          </button>

          {/* 1-Click Dark/Light Mode toggle */}
          <button
            type="button"
            onClick={onToggleDarkMode}
            className="inline-flex items-center justify-center h-9 w-9 rounded-full cute-btn border-2 shadow-xs"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-main)',
            }}
            title={isDark ? 'Switch to Sunny Garden Mode' : 'Switch to Midnight Rose Dark Mode'}
            aria-label="Toggle dark mode"
          >
            {isDark ? (
              <Sun className="h-4 w-4 text-amber-300 transition-transform" />
            ) : (
              <Moon className="h-4 w-4 text-indigo-400 transition-transform" />
            )}
          </button>

          {/* 4-Hour Relief Log trigger */}
          <button
            type="button"
            onClick={onOpenReliefModal}
            className="inline-flex items-center gap-1.5 rounded-full border-2 px-3.5 py-2 text-xs font-bold tracking-wide cute-btn shadow-xs"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-main)',
            }}
            title="Open 4-hour relief session log"
          >
            <Clock className="h-3.5 w-3.5" style={{ color: 'var(--accent)' }} />
            <span>4-Hr Log</span>
            {todayReliefCount > 0 && (
              <span 
                className="inline-flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold text-white shadow-xs"
                style={{ backgroundColor: 'var(--accent)' }}
              >
                {todayReliefCount}
              </span>
            )}
          </button>

          {/* Records & History */}
          <button
            type="button"
            onClick={onOpenHistoryModal}
            className="inline-flex items-center justify-center h-9 w-9 rounded-full cute-btn border-2 shadow-xs"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-main)',
            }}
            title="View completion history & consistency"
            aria-label="View history"
          >
            <History className="h-4 w-4" style={{ color: 'var(--text-muted)' }} />
          </button>

          {/* Sound Toggle */}
          <button
            type="button"
            onClick={onToggleSound}
            className="inline-flex items-center justify-center h-9 w-9 rounded-full cute-btn border-2 shadow-xs"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-main)',
            }}
            title={soundEnabled ? 'Mute soothing sounds' : 'Unmute sounds'}
            aria-label="Toggle sound feedback"
          >
            {soundEnabled ? (
              <Volume2 className="h-4 w-4" style={{ color: 'var(--accent)' }} />
            ) : (
              <VolumeX className="h-4 w-4" style={{ color: 'var(--text-muted)' }} />
            )}
          </button>

          {/* Settings */}
          <button
            type="button"
            onClick={onOpenSettingsModal}
            className="inline-flex items-center justify-center h-9 w-9 rounded-full cute-btn border-2 shadow-xs"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-main)',
            }}
            title="Adjust routine in settings"
            aria-label="Routine Settings"
          >
            <Settings className="h-4 w-4" style={{ color: 'var(--text-muted)' }} />
          </button>

        </div>
      </div>
    </header>
  );
}
