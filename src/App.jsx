import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { AffirmationCard } from './components/AffirmationCard';
import { ExerciseList } from './components/ExerciseList';
import { CompletionCelebration } from './components/CompletionCelebration';
import { ReliefLogModal } from './components/ReliefLogModal';
import { HistoryModal } from './components/HistoryModal';
import { SettingsModal } from './components/SettingsModal';
import { PacerModal } from './components/PacerModal';
import { ThemeSelector, THEMES } from './components/ThemeSelector';
import { FloralProps } from './components/FloralProps';

import {
  getSavedExercises,
  getTodayRecord,
  saveTodayRecord,
  getTodayKey,
  getReliefLogs,
  getSettings,
  saveSettings,
} from './utils/storage';
import { playSoftTick, playChime, playCompletionChime } from './utils/audio';

export default function App() {
  const [exercises, setExercises] = useState(() => getSavedExercises());
  const [todayRecord, setTodayRecord] = useState(() => getTodayRecord(getSavedExercises()));
  const [reliefLogs, setReliefLogs] = useState(() => getReliefLogs());
  const [settings, setSettings] = useState(() => getSettings());

  // Current floral theme (rose, lavender, wildflower, botanical, midnight-rose, herbarium)
  const [currentTheme, setCurrentTheme] = useState(() => {
    const s = getSettings();
    // Default to 'rose' if previous was 'sakura' or unset
    if (!s.theme || s.theme === 'sakura') return 'rose';
    return s.theme;
  });

  // Modal visibility states
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const [isReliefModalOpen, setIsReliefModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [activePacerExercise, setActivePacerExercise] = useState(null);

  // Sync theme attribute to <html> element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
  }, [currentTheme]);

  // Sound preference state
  const soundEnabled = settings.soundEnabled ?? true;

  // Check if all exercises are completed
  const totalExercisesCount = exercises.length;
  const completedExercisesCount = exercises.filter(
    (ex) => todayRecord.items?.[ex.id]?.isFullyDone
  ).length;
  const isAllCompleted =
    totalExercisesCount > 0 && completedExercisesCount === totalExercisesCount;

  // Daily rollover monitor: resets checklist if a new day begins while tab is open
  useEffect(() => {
    const checkDayRollover = () => {
      const currentDay = getTodayKey();
      if (todayRecord.date !== currentDay) {
        const fresh = getTodayRecord(exercises);
        setTodayRecord(fresh);
      }
    };
    const interval = setInterval(checkDayRollover, 60000);
    return () => clearInterval(interval);
  }, [todayRecord.date, exercises]);

  // Change theme
  const handleSelectTheme = (themeId) => {
    setCurrentTheme(themeId);
    const updated = { ...settings, theme: themeId };
    setSettings(updated);
    saveSettings(updated);
    playSoftTick(soundEnabled);
  };

  // Toggle Dark Mode
  const handleToggleDarkMode = () => {
    const isDark = currentTheme === 'midnight-rose' || currentTheme === 'herbarium';
    const nextTheme = isDark ? (settings.lastLightTheme || 'rose') : 'midnight-rose';
    
    const updated = { 
      ...settings, 
      theme: nextTheme,
      lastLightTheme: !isDark ? currentTheme : (settings.lastLightTheme || 'rose')
    };
    setCurrentTheme(nextTheme);
    setSettings(updated);
    saveSettings(updated);
    playSoftTick(soundEnabled);
  };

  // Toggle Sound Setting
  const handleToggleSound = () => {
    const updated = { ...settings, soundEnabled: !soundEnabled };
    setSettings(updated);
    saveSettings(updated);
  };

  // Toggle full exercise completion
  const handleToggleFull = (exerciseId) => {
    const targetEx = exercises.find((e) => e.id === exerciseId);
    if (!targetEx) return;

    const currentItem = todayRecord.items?.[exerciseId] || {
      completedSets: 0,
      isFullyDone: false,
      completedAt: null,
      setTimes: [],
    };

    const willBeDone = !currentItem.isFullyDone;
    const nowIso = new Date().toISOString();

    const updatedItem = {
      ...currentItem,
      isFullyDone: willBeDone,
      completedSets: willBeDone ? targetEx.sets : 0,
      completedAt: willBeDone ? nowIso : null,
      setTimes: willBeDone
        ? Array(targetEx.sets).fill(nowIso)
        : Array(targetEx.sets).fill(null),
    };

    const newItems = {
      ...todayRecord.items,
      [exerciseId]: updatedItem,
    };

    // Check if this action completes all exercises
    const newCompletedCount = exercises.filter((ex) =>
      ex.id === exerciseId ? willBeDone : newItems[ex.id]?.isFullyDone
    ).length;

    const isNowAllDone =
      totalExercisesCount > 0 && newCompletedCount === totalExercisesCount;

    const newRecord = {
      ...todayRecord,
      completedAllAt: isNowAllDone ? nowIso : willBeDone ? todayRecord.completedAllAt : null,
      items: newItems,
    };

    setTodayRecord(newRecord);
    saveTodayRecord(newRecord);

    // Audio feedback
    if (willBeDone) {
      if (isNowAllDone) {
        playCompletionChime(soundEnabled);
      } else {
        playChime(soundEnabled);
      }
    } else {
      playSoftTick(soundEnabled);
    }
  };

  // Toggle individual set (for 2-set exercises)
  const handleToggleSet = (exerciseId, setNum) => {
    const targetEx = exercises.find((e) => e.id === exerciseId);
    if (!targetEx) return;

    const currentItem = todayRecord.items?.[exerciseId] || {
      completedSets: 0,
      isFullyDone: false,
      completedAt: null,
      setTimes: [],
    };

    let newCompletedSets = currentItem.completedSets || 0;
    if (newCompletedSets >= setNum) {
      newCompletedSets = setNum - 1;
    } else {
      newCompletedSets = setNum;
    }

    const willBeDone = newCompletedSets >= targetEx.sets;
    const nowIso = new Date().toISOString();

    const updatedItem = {
      ...currentItem,
      completedSets: newCompletedSets,
      isFullyDone: willBeDone,
      completedAt: willBeDone ? (currentItem.completedAt || nowIso) : null,
    };

    const newItems = {
      ...todayRecord.items,
      [exerciseId]: updatedItem,
    };

    const newCompletedCount = exercises.filter((ex) =>
      ex.id === exerciseId ? willBeDone : newItems[ex.id]?.isFullyDone
    ).length;

    const isNowAllDone =
      totalExercisesCount > 0 && newCompletedCount === totalExercisesCount;

    const newRecord = {
      ...todayRecord,
      completedAllAt: isNowAllDone ? nowIso : willBeDone ? todayRecord.completedAllAt : null,
      items: newItems,
    };

    setTodayRecord(newRecord);
    saveTodayRecord(newRecord);

    if (willBeDone) {
      if (isNowAllDone) {
        playCompletionChime(soundEnabled);
      } else {
        playChime(soundEnabled);
      }
    } else {
      playSoftTick(soundEnabled);
    }
  };

  // Reset today's checklist without deleting past records
  const handleResetToday = () => {
    if (window.confirm("Reset today's checklist? Your historical records from previous days remain untouched! 🌸")) {
      const freshItems = {};
      exercises.forEach((ex) => {
        freshItems[ex.id] = {
          completedSets: 0,
          isFullyDone: false,
          completedAt: null,
          setTimes: [],
        };
      });
      const resetRecord = {
        date: getTodayKey(),
        completedAllAt: null,
        items: freshItems,
      };
      setTodayRecord(resetRecord);
      saveTodayRecord(resetRecord);
    }
  };

  // Undo full completion
  const handleUndoAll = () => {
    handleResetToday();
  };

  // Pacer completion callback
  const handleCompleteFromPacer = (exerciseId) => {
    handleToggleFull(exerciseId);
  };

  const todayKey = getTodayKey();
  const todayReliefLogs = reliefLogs.filter((l) => l.date === todayKey);

  return (
    <div 
      className="relative min-h-screen pb-20 transition-colors duration-300 font-sans"
      style={{
        backgroundColor: 'var(--bg-main)',
        color: 'var(--text-main)',
      }}
    >
      {/* Pretty Floating Botanical Petals Prop */}
      <FloralProps enabled={true} />

      <div className="relative z-10 mx-auto max-w-2xl px-4 sm:px-6 pt-5 sm:pt-7">
        
        {/* Top Header */}
        <Header
          todayReliefCount={todayReliefLogs.length}
          currentTheme={currentTheme}
          onOpenThemeModal={() => setIsThemeModalOpen(true)}
          onToggleDarkMode={handleToggleDarkMode}
          onOpenReliefModal={() => setIsReliefModalOpen(true)}
          onOpenHistoryModal={() => setIsHistoryModalOpen(true)}
          onOpenSettingsModal={() => setIsSettingsModalOpen(true)}
          soundEnabled={soundEnabled}
          onToggleSound={handleToggleSound}
        />

        <main className="space-y-7">
          
          {/* Section 2: Daily Affirmations ("A reminder to myself") */}
          <AffirmationCard />

          {/* Completion Celebration banner shown when all exercises are complete */}
          {isAllCompleted && (
            <CompletionCelebration
              completedAt={todayRecord.completedAllAt}
              onUndoAll={handleUndoAll}
            />
          )}

          {/* Section 1: Prescribed strengthening checklist ("My Exercises") */}
          <ExerciseList
            exercises={exercises}
            todayRecord={todayRecord}
            onToggleFull={handleToggleFull}
            onToggleSet={handleToggleSet}
            onResetToday={handleResetToday}
            onOpenPacer={(ex) => setActivePacerExercise(ex)}
          />

        </main>

        {/* Pretty floral quiet footer */}
        <footer className="font-gelato mt-14 pt-6 border-t-2 text-center text-xs sm:text-sm font-semibold tracking-wide" style={{ borderColor: 'var(--border-color)', color: 'var(--text-muted)' }}>
          <p>Showing Up Club • 5 gentle minutes of self-care for your future self 🎻🌸✨</p>
        </footer>

      </div>

      {/* Modals */}
      <ThemeSelector
        isOpen={isThemeModalOpen}
        onClose={() => setIsThemeModalOpen(false)}
        currentTheme={currentTheme}
        onSelectTheme={handleSelectTheme}
      />

      <ReliefLogModal
        isOpen={isReliefModalOpen}
        onClose={() => setIsReliefModalOpen(false)}
        reliefLogs={reliefLogs}
        onUpdateLogs={(newLogs) => setReliefLogs(newLogs)}
      />

      <HistoryModal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        exercises={exercises}
      />

      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        exercises={exercises}
        onUpdateExercises={(updated) => {
          setExercises(updated);
          setTodayRecord(getTodayRecord(updated));
        }}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
      />

      <PacerModal
        exercise={activePacerExercise}
        isOpen={Boolean(activePacerExercise)}
        onClose={() => setActivePacerExercise(null)}
        onCompleteExercise={handleCompleteFromPacer}
        soundEnabled={soundEnabled}
      />
    </div>
  );
}
